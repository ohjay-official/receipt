/**
 * Propose a patch from Kane's inbox. Deterministic path guard applies last.
 */

import fs from "node:fs";
import path from "node:path";
import { callGeminiFlash, parseFixerFiles } from "./gemini.mjs";
import { assertAllowlisted, DEFAULT_ALLOWLIST, DEFAULT_DENYLIST } from "./path-guard.mjs";

export function collectAllowlistedSource(workspace, allowlist = DEFAULT_ALLOWLIST, denylist = DEFAULT_DENYLIST) {
  const files = {};
  const shop = path.join(workspace, "shop");
  if (!fs.existsSync(shop)) return files;
  const stack = [shop];
  while (stack.length) {
    const dir = stack.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".next") continue;
        stack.push(full);
        continue;
      }
      const rel = path.relative(workspace, full).replace(/\\/g, "/");
      try {
        assertAllowlisted([rel], allowlist, denylist);
      } catch {
        continue;
      }
      if (/\.(png|jpe?g|gif|webp|ico|pdf|woff2?)$/i.test(entry.name)) continue;
      if (/\.test\.[cm]?[jt]sx?$/i.test(entry.name) || /_test\.md$/i.test(entry.name)) continue;
      if (fs.statSync(full).size > 80_000) continue;
      files[rel] = fs.readFileSync(full, "utf8");
    }
  }
  return files;
}

export function buildFixerPrompt({ claim, resultMd, oneLiner, sources }) {
  const sourceBlock = Object.entries(sources)
    .map(([file, body]) => `--- ${file}\n${body}`)
    .join("\n\n");
  return [
    "You are fixing a Next.js fixture shop so that a Kane CLI test will pass.",
    "The README How-to-test contract is the source of truth. You must NOT change the contract, the Kane test, unit tests, or any workflow.",
    "Fix every seeded shop bug that violates the contract, even if Kane only failed the first check:",
    "1) Checkout Pro price must match /pricing ($19), not $29.",
    "2) Coupon LAUNCH10 must take 10% off that $19 Pro price so the total becomes $17.10 — not apply to the wrong line, yield NaN, or leave the total unchanged.",
    "3) The Pay button must be clickable at a 390px mobile viewport and show a Payment accepted confirmation. Remove any overlay that covers Pay at that width. Do not change the advertised Pro price (PRO_PLAN_USD stays 19).",
    "",
    "How-to-test claim:",
    claim || "(missing)",
    "",
    "Kane Result.md:",
    resultMd || "(missing — if this is missing, refuse to invent a fix and return no files)",
    "",
    "Kane one-liner:",
    oneLiner || "(none)",
    "",
    "Current allowlisted source (shop/**):",
    sourceBlock || "(no source found)",
    "",
    "Return ONLY JSON of the form {\"files\": {\"shop/path/file.ext\": \"full new file contents\"}}.",
    "Every key must be under shop/. Include complete file contents, not a diff.",
    "Do not mention or include any API keys or secrets.",
  ].join("\n");
}

export async function proposeFix(input) {
  const allowlist = input.allowlist || DEFAULT_ALLOWLIST;
  const denylist = input.denylist || DEFAULT_DENYLIST;
  const workspace = input.workspace || process.cwd();
  if (!input.resultMd || !String(input.resultMd).trim()) {
    throw new Error("refusing to fix: Result.md is empty. The fixer must read Kane's result.");
  }
  if (input.demoCheat) {
    const { proposeCheatFix } = await import("./guardrail.mjs");
    return { ...proposeCheatFix(), demoCheat: true };
  }
  const sources = input.sources || collectAllowlistedSource(workspace, allowlist, denylist);
  const prompt = buildFixerPrompt({
    claim: input.claim,
    resultMd: input.resultMd,
    oneLiner: input.oneLiner,
    sources,
  });
  const { text, model } = await callGeminiFlash(prompt, { apiKey: input.apiKey, fetchImpl: input.fetchImpl, sleeper: input.sleeper });
  const files = parseFixerFiles(text);
  assertAllowlisted(Object.keys(files), allowlist, denylist);
  return { files, model };
}

export function applyFiles(workspace, files, allowlist = DEFAULT_ALLOWLIST, denylist = DEFAULT_DENYLIST) {
  assertAllowlisted(Object.keys(files), allowlist, denylist);
  const written = [];
  for (const [rel, contents] of Object.entries(files)) {
    const dest = path.join(workspace, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, contents);
    written.push(rel);
  }
  return written;
}
