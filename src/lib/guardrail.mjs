/**
 * Last check before a fixer push. The model does not get a vote.
 * Rejects paths outside shop/**, shop unit tests, and any patch that
 * weakens the Kane test or the advertised Pro price.
 */

import { isAllowlisted, matchGlob, normalizeRepoPath } from "./path-guard.mjs";

export const GUARD_DENYLIST = [
  "README.md",
  "action.yml",
  "src/**",
  "tests/**",
  ".github/**",
  "docs/**",
  "shop/**/*.test.ts",
  "shop/**/*.test.tsx",
  "shop/**/*.test.js",
  "shop/**/*.test.mjs",
  "**/*_test.md",
  ".env",
  ".env.*",
  ".testmuai/**",
  "kane-out/**",
];

export function refusalMessage(rejectedPaths, reason) {
  const first = (rejectedPaths && rejectedPaths[0]) || "a forbidden path";
  if (reason) return `Receipt refused fix: ${reason}`;
  return `Receipt refused fix: touched ${first}`;
}

export function isForbiddenPath(repoPath, allowlist = ["shop/**"]) {
  let normalized;
  try {
    normalized = normalizeRepoPath(repoPath);
  } catch {
    return true;
  }
  if (!isAllowlisted(normalized, allowlist, GUARD_DENYLIST)) return true;
  if (/\.test\.[cm]?[jt]sx?$/i.test(normalized)) return true;
  if (/_test\.md$/i.test(normalized)) return true;
  return false;
}

function countH2Steps(text) {
  return (String(text || "").match(/^##\s+/gm) || []).length;
}

export function detectWeakening({ path: repoPath, before = "", after = "" }) {
  const reasons = [];
  const name = normalizeRepoPath(repoPath);
  if (isForbiddenPath(name)) {
    reasons.push(`touched ${name}`);
  }
  if (name.endsWith("_test.md") || name === "README.md" || name.includes("how-to-test")) {
    const lost = countH2Steps(before) - countH2Steps(after);
    if (lost > 0) reasons.push(`deleted test steps in ${name}`);
  }
  if (/(^|\/)prices\.ts$/.test(name) || /(^|\/)checkout\.ts$/.test(name)) {
    if (/PRO_PLAN_USD\s*=\s*19\b/.test(before) && !/PRO_PLAN_USD\s*=\s*19\b/.test(after)) {
      reasons.push("changed the advertised Pro price instead of fixing checkout");
    }
  }
  return reasons;
}

export function validateFixProposal({
  files = {},
  existing = {},
  allowlist = ["shop/**"],
} = {}) {
  const rejected = [];
  const reasons = [];
  for (const rawPath of Object.keys(files)) {
    let name;
    try {
      name = normalizeRepoPath(rawPath);
    } catch (err) {
      rejected.push(rawPath);
      reasons.push(err.message);
      continue;
    }
    if (isForbiddenPath(name, allowlist)) {
      rejected.push(name);
      reasons.push(`touched ${name}`);
    }
    const weaken = detectWeakening({
      path: name,
      before: existing[name] ?? existing[rawPath] ?? "",
      after: files[rawPath],
    });
    for (const reason of weaken) {
      if (!reasons.includes(reason)) reasons.push(reason);
    }
  }
  if (rejected.length === 0 && reasons.length === 0) {
    return { ok: true, rejected: [], reasons: [] };
  }
  // Deduplicate path-only reasons that already produced rejected[]
  const uniqueReasons = [...new Set(reasons)];
  const err = new Error(refusalMessage(rejected, uniqueReasons[0]));
  err.rejected = rejected;
  err.reasons = uniqueReasons;
  throw err;
}

/** Deterministic cheating patch for the RECEIPT_DEMO_CHEAT=1 demo. */
export function proposeCheatFix() {
  return {
    model: "demo-cheat",
    files: {
      "tests/checkout_test.md": `---
url: https://example.vercel.app
timeout: 300
max_steps: 40
---

# Weakened by the demo cheat — should be refused

## Open the pricing page and confirm Pro is $19

Go to the start URL's \`/pricing\` page. Verify that the Pro plan is listed at $19 (nineteen dollars). The amount 19 must be visible on the pricing page.

## Choose Pro and continue to checkout

Choose the Pro plan and continue to checkout (\`/checkout\`).

## Checkout may show $29 for Pro

Verify that checkout shows $19 or $29 for Pro. Do not fail if checkout shows $29.
`,
    },
  };
}

export function isDemoCheatEnabled(env = process.env) {
  const flag = String(env.RECEIPT_DEMO_CHEAT || "").trim().toLowerCase();
  return flag === "1" || flag === "true" || flag === "yes";
}

// Keep matchGlob imported for tests that may re-export later.
void matchGlob;
