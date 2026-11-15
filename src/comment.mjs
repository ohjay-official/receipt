#!/usr/bin/env node
import fs from "node:fs";
import { readKaneInbox, parseResultMd } from "./lib/inbox.mjs";
import { findPullRequest, buildCommentBody, upsertComment } from "./lib/github-api.mjs";
import { redact } from "./lib/github-output.mjs";
import { resolveDeploymentSha } from "./lib/preview.mjs";

const workspace = process.env.GITHUB_WORKSPACE || process.cwd();
const testFile = process.env.TEST_FILE || "tests/checkout_test.md";
const inbox = readKaneInbox(workspace, testFile);

function excerpt(resultMd) {
  if (!resultMd) return "";
  const parsed = parseResultMd(resultMd);
  if (parsed?.failedSteps?.length) {
    return parsed.failedSteps
      .map((s) => `## ${s.heading} ✗ failed\n${s.detail}`.trim())
      .join("\n\n")
      .slice(0, 1200);
  }
  return resultMd.slice(0, 1200);
}


function hostedEvidenceUrl() {
  const artifactId = process.env.EVIDENCE_ARTIFACT_ID;
  const repo = process.env.GITHUB_REPOSITORY;
  if (!artifactId || !repo) return "";
  const pack = `gh-artifact:${repo}/${artifactId}`.replaceAll(":", "%3A").replaceAll("/", "%2F");
  return `https://evidence.lambdatest.com/?pack=${pack}`;
}

async function main() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  let event = {};
  if (eventPath && fs.existsSync(eventPath)) {
    event = JSON.parse(fs.readFileSync(eventPath, "utf8"));
  }
  const sha = resolveDeploymentSha(event, process.env.GITHUB_SHA);
  const pr = await findPullRequest({ sha, token: process.env.GITHUB_TOKEN }).catch((err) => {
    console.log(redact(err.message));
    return null;
  });
  if (!pr) {
    console.log("No pull request found for this SHA; skipping comment. Verdict is in the job log.");
    return;
  }
  const body = buildCommentBody({
    status: process.env.STATUS,
    exitClass: process.env.EXIT_CLASS,
    previewUrl: process.env.PREVIEW_URL,
    kaneExit: process.env.KANE_EXIT,
    attempts: process.env.ATTEMPTS,
    maxFixes: process.env.MAX_FIXES,
    usedFallback: process.env.USED_FALLBACK === "true",
    evidenceUrl: hostedEvidenceUrl(),
    evidenceArtifactName: process.env.EVIDENCE_ARTIFACT_NAME,
    evidenceHint: inbox.resultPath || "kane-out/ + .testmuai/evidence/",
    excerpt: excerpt(inbox.resultMd),
    summary:
      inbox.oneLiner ||
      (inbox.parsed?.status ? `Kane ${inbox.parsed.status}` : `Kane ${process.env.EXIT_CLASS || "finished"}`),
    fixerNote: process.env.FIXER_NOTE || "",
  });
  const action = await upsertComment({
    issueNumber: pr.number,
    body,
    token: process.env.GITHUB_TOKEN,
  });
  console.log(`PR comment ${action} on #${pr.number}.`);
}

await main();
