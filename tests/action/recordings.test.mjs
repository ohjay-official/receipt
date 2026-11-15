import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  discardStaleResultMd,
  outputDirFromTestFile,
  parseOrigin,
  recordedStartUrl,
  remapRecordedStartUrl,
  rewriteOrigin,
} from "../../src/lib/recordings.mjs";

test("outputDirFromTestFile maps checkout_test.md", () => {
  assert.equal(outputDirFromTestFile("tests/checkout_test.md"), "tests/output-checkout");
});

test("rewriteOrigin swaps origin and bare host", () => {
  const from = "https://receipt-git-old.vercel.app";
  const to = "https://receipt-git-new.vercel.app";
  const text = JSON.stringify({
    url: from,
    action_instruction: `Navigate to ${from}`,
    host: "receipt-git-old.vercel.app",
  });
  const out = rewriteOrigin(text, from, to);
  assert.equal(out.includes("receipt-git-old.vercel.app"), false);
  assert.equal(out.includes("https://receipt-git-new.vercel.app"), true);
  assert.equal(parseOrigin(to).host, "receipt-git-new.vercel.app");
});

function writeFixture(root, recordedUrl) {
  const internal = path.join(root, ".internal");
  const stepDir = path.join(internal, "steps", "1-aaaa", "flows", "0");
  fs.mkdirSync(stepDir, { recursive: true });
  fs.writeFileSync(
    path.join(internal, "execution.json"),
    JSON.stringify({ url: recordedUrl, status: "success" }),
  );
  fs.writeFileSync(
    path.join(stepDir, "actions.ndjson"),
    JSON.stringify({
      action_type: "navigate",
      action_instruction: `Navigate to ${recordedUrl}`,
      action_params: { url: recordedUrl },
    }) + "\n",
  );
  fs.writeFileSync(path.join(root, "Result.md"), "---\nstatus: passed\n---\n");
  return { internal, stepDir };
}

test("remapRecordedStartUrl rewrites execution.json and navigate actions", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "receipt-recordings-"));
  const oldUrl = "https://receipt-git-demo-t6-first-kane-run-oh-jay-s-projects.vercel.app";
  const newUrl = "https://receipt-git-demo-t8-auto-trigger-proof-oh-jay-s-projects.vercel.app";
  const { internal, stepDir } = writeFixture(dir, oldUrl);
  const result = remapRecordedStartUrl(dir, newUrl);
  assert.equal(result.remapped, true);
  assert.equal(result.files, 2);
  const execution = JSON.parse(fs.readFileSync(path.join(internal, "execution.json"), "utf8"));
  assert.equal(execution.url, newUrl);
  const action = JSON.parse(fs.readFileSync(path.join(stepDir, "actions.ndjson"), "utf8").trim());
  assert.equal(action.action_params.url, newUrl);
  assert.equal(recordedStartUrl(internal), newUrl);
});

test("remapRecordedStartUrl is a no-op when the preview already matches", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "receipt-recordings-"));
  const url = "https://receipt-git-demo-t8-auto-trigger-proof-oh-jay-s-projects.vercel.app";
  writeFixture(dir, url);
  const result = remapRecordedStartUrl(dir, url);
  assert.equal(result.remapped, false);
  assert.equal(result.reason, "already-current");
});

test("discardStaleResultMd removes Result.md but leaves recordings", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "receipt-recordings-"));
  writeFixture(dir, "https://example.vercel.app");
  assert.ok(fs.existsSync(path.join(dir, "Result.md")));
  assert.equal(discardStaleResultMd(dir), path.join(dir, "Result.md"));
  assert.equal(fs.existsSync(path.join(dir, "Result.md")), false);
  assert.ok(fs.existsSync(path.join(dir, ".internal", "execution.json")));
});
