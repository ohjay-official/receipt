import assert from "node:assert/strict";
import test from "node:test";
import { buildCommentBody, rootCauseFromSteps } from "../../src/lib/github-api.mjs";

test("rootCauseFromSteps names the first failed Kane step", () => {
  const cause = rootCauseFromSteps([
    { heading: "Open the pricing page and confirm Pro is $19", status: "passed" },
    { heading: "Checkout must show $19 for Pro", status: "failed", detail: "checkout rendered $29" },
    { heading: "LAUNCH10 takes 10% off Pro", status: "failed", detail: "total stayed $19" },
  ]);
  assert.match(cause, /Checkout must show \$19 for Pro/);
  assert.match(cause, /\+1 more failed step/);
  assert.match(cause, /checkout rendered \$29/);
});

test("receipt card lists Kane steps, evidence, and a refusal note", () => {
  const body = buildCommentBody({
    status: "failed",
    exitClass: "fail",
    kaneExit: "1",
    previewUrl: "https://example.vercel.app",
    attempts: 0,
    maxFixes: 3,
    evidenceUrl: "https://evidence.lambdatest.com/?pack=demo",
    evidenceArtifactName: "receipt-evidence-1",
    fixerNote: "Receipt refused fix: touched tests/checkout_test.md",
    summary: "Kane failed the How-to-test contract.",
    steps: [
      { heading: "Open the pricing page and confirm Pro is $19", status: "passed" },
      { heading: "Checkout must show $19 for Pro", status: "failed", detail: "checkout rendered $29" },
    ],
  });
  assert.match(body, /<!-- receipt-comment -->/);
  assert.match(body, /## Receipt: failed/);
  assert.match(body, /### What Kane saw/);
  assert.match(body, /\*\*passed\*\* — Open the pricing page/);
  assert.match(body, /\*\*failed\*\* — Checkout must show \$19 for Pro/);
  assert.match(body, /### Root cause/);
  assert.match(body, /### Fix refused/);
  assert.match(body, /Receipt refused fix: touched tests\/checkout_test\.md/);
  assert.match(body, /Open the evidence pack/);
  assert.match(body, /Screenshots, if Kane captured any, live in the evidence pack/);
});

test("green receipt card summarizes a successful fix", () => {
  const body = buildCommentBody({
    status: "passed",
    exitClass: "pass",
    kaneExit: "0",
    previewUrl: "https://example.vercel.app",
    attempts: 1,
    maxFixes: 3,
    evidenceUrl: "https://evidence.lambdatest.com/?pack=demo",
    fixerNote: "pushed receipt-fix: 1 (shop/lib/prices.ts)",
    fixerFiles: "shop/lib/prices.ts",
    summary: "Kane passed.",
    steps: [{ heading: "Checkout must show $19 for Pro", status: "passed" }],
  });
  assert.match(body, /## Receipt: passed/);
  assert.doesNotMatch(body, /### Root cause/);
  assert.match(body, /### Fix/);
  assert.match(body, /Files changed: `shop\/lib\/prices\.ts`/);
  assert.match(body, /1 \/ 3/);
});
