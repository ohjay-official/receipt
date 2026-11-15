#!/usr/bin/env node
import { Buffer } from "node:buffer";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { countFixAttempts, capReached } from "./lib/attempts.mjs";
import { readKaneInbox, extractHowToTest } from "./lib/inbox.mjs";
import { proposeFix, applyFiles } from "./lib/fixer.mjs";
import { findPullRequest } from "./lib/github-api.mjs";
import { isDemoCheatEnabled, validateFixProposal } from "./lib/guardrail.mjs";
import { DEFAULT_DENYLIST, assertAllowlisted } from "./lib/path-guard.mjs";
import { redact, setOutput } from "./lib/github-output.mjs";
import { resolveDeploymentSha } from "./lib/preview.mjs";

const workspace = process.env.GITHUB_WORKSPACE || process.cwd();
const testFile = process.env.TEST_FILE || "tests/receipt_checkout_test.md";
const maxFixes = Number(process.env.MAX_FIXES || 3);
const allowlist = (process.env.ALLOWLIST || "shop/**")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function refusalNote(err) {
  const raw = redact(err && err.message ? err.message : "Receipt refused fix");
  if (raw.startsWith("Receipt refused fix:")) return raw;
  return `Receipt refused fix: ${raw}`;
}

function git(args, opts = {}) {
  try {
    return execFileSync("git", args, {
      cwd: workspace,
      encoding: "utf8",
      stdio: opts.stdio || ["ignore", "pipe", "pipe"],
      env: opts.env || process.env,
    });
  } catch (err) {
    const msg = redact(err.stderr || err.message || String(err));
    const wrapped = new Error(msg);
    throw wrapped;
  }
}

async function main() {
  const exitClass = process.env.EXIT_CLASS || "fail";
  if (exitClass !== "fail") {
    console.log(`Skipping fixer (exit class ${exitClass}).`);
    setOutput("fixer_status", "skipped");
    return;
  }

  const log = git(["log", "--pretty=%s"]);
  const attempts = Number(process.env.ATTEMPTS || countFixAttempts(log));
  if (capReached(attempts, maxFixes)) {
    console.log(`Fixer cap reached (${attempts} >= ${maxFixes}). No further patches.`);
    setOutput("fixer_status", "capped");
    return;
  }

  const token = process.env.RECEIPT_GIT_TOKEN;
  if (!token) {
    console.log(
      "RECEIPT_GIT_TOKEN is missing. Add a fine-grained PAT for ohjay-official with Contents: write so Vercel Hobby will deploy the fixer commit. Do not upgrade Vercel to Pro.",
    );
    setOutput("fixer_status", "missing-token");
    process.exitCode = 0;
    return;
  }

  const inbox = readKaneInbox(workspace, testFile);
  if (!inbox.resultMd) {
    console.log("Skipping fixer: Result.md was not found. The fixer must read Kane's result.");
    setOutput("fixer_status", "no-result");
    return;
  }

  const readme = fs.existsSync(path.join(workspace, "README.md"))
    ? fs.readFileSync(path.join(workspace, "README.md"), "utf8")
    : "";
  const claim = extractHowToTest(readme);

  let proposal;
  try {
    proposal = await proposeFix({
      claim,
      resultMd: inbox.resultMd,
      oneLiner: inbox.oneLiner,
      workspace,
      allowlist,
      apiKey: process.env.GEMINI_API_KEY,
      demoCheat: isDemoCheatEnabled(process.env),
    });
    if (proposal.demoCheat) {
      console.log("RECEIPT_DEMO_CHEAT is on: proposing a cheating diff for the refusal demo.");
    }
  } catch (err) {
    console.log(`Fixer Gemini failed after retries: ${redact(err.message || String(err))}`);
    setOutput("fixer_status", "gemini-failed");
    return;
  }

  const existing = {};
  for (const rel of Object.keys(proposal.files)) {
    const full = path.join(workspace, rel);
    if (fs.existsSync(full)) existing[rel] = fs.readFileSync(full, "utf8");
  }
  try {
    validateFixProposal({ files: proposal.files, existing, allowlist });
    assertAllowlisted(Object.keys(proposal.files), allowlist, DEFAULT_DENYLIST);
  } catch (err) {
    const note = refusalNote(err);
    console.log(note);
    setOutput("fixer_status", "refused");
    setOutput("fixer_note", note);
    return;
  }

  applyFiles(workspace, proposal.files, allowlist, DEFAULT_DENYLIST);

  const next = attempts + 1;
  git(["add", "--", ...Object.keys(proposal.files)]);
  const staged = git(["diff", "--cached", "--name-only"]).trim().split(/\n/).filter(Boolean);
  try {
    const stagedFiles = {};
    const stagedExisting = {};
    for (const rel of staged) {
      stagedFiles[rel] = fs.existsSync(path.join(workspace, rel))
        ? fs.readFileSync(path.join(workspace, rel), "utf8")
        : "";
    }
    validateFixProposal({ files: stagedFiles, existing: stagedExisting, allowlist });
    assertAllowlisted(staged, allowlist, DEFAULT_DENYLIST);
  } catch (err) {
    git(["reset", "--hard", "HEAD"]);
    const note = refusalNote(err);
    console.log(note);
    setOutput("fixer_status", "refused");
    setOutput("fixer_note", note);
    return;
  }
  if (staged.length === 0) {
    console.log("Fixer produced no staged changes.");
    setOutput("fixer_status", "no-changes");
    return;
  }

  git(["config", "user.name", "ohjay-official"]);
  git(["config", "user.email", "ohjay-official@users.noreply.github.com"]);
  git(["commit", "-m", `receipt-fix: ${next}`]);

  const eventPath = process.env.GITHUB_EVENT_PATH;
  let event = {};
  if (eventPath && fs.existsSync(eventPath)) {
    event = JSON.parse(fs.readFileSync(eventPath, "utf8"));
  }
  const sha = resolveDeploymentSha(event, process.env.GITHUB_SHA);
  const pr = await findPullRequest({ sha, token: process.env.GITHUB_TOKEN }).catch(() => null);
  const branch = pr?.head?.ref;
  if (!branch) {
    console.log("Could not resolve the PR branch; fixer commit is local only.");
    setOutput("fixer_status", "no-branch");
    return;
  }

  // actions/checkout persists AUTHORIZATION: basic … on the repo. Adding a
  // second Authorization header makes GitHub return 400 "Duplicate header".
  try {
    git(["config", "--unset-all", "http.https://github.com/.extraheader"]);
  } catch {
    // already unset
  }
  const basic = Buffer.from(`x-access-token:${token}`, "utf8").toString("base64");
  const extraHeader = `AUTHORIZATION: basic ${basic}`;
  try {
    execFileSync(
      "git",
      ["-c", `http.https://github.com/.extraheader=${extraHeader}`, "push", "origin", `HEAD:refs/heads/${branch}`],
      {
        cwd: workspace,
        encoding: "utf8",
        env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
        stdio: ["ignore", "pipe", "pipe"],
      },
    );
  } catch (err) {
    console.log(redact(err.stderr || err.message || "git push failed"));
    setOutput("fixer_status", "push-failed");
    return;
  }
  const filesList = staged.join(", ");
  console.log(`Pushed receipt-fix: ${next} to ${branch} (allowlisted paths only).`);
  setOutput("fixer_status", "pushed");
  setOutput("fixer_commit", `receipt-fix: ${next}`);
  setOutput("fixer_files", filesList);
  setOutput("fixer_note", `pushed receipt-fix: ${next} (${filesList})`);
}

await main();
