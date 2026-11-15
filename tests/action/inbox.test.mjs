import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  classifyKaneExit,
  extractHowToTest,
  parseResultMd,
  resultMdPathFromTestFile,
  readKaneInbox,
} from "../../src/lib/inbox.mjs";

const fixtures = fileURLToPath(new URL("./fixtures", import.meta.url));
const failed = fs.readFileSync(path.join(fixtures, "Result.failed.md"), "utf8");
const passed = fs.readFileSync(path.join(fixtures, "Result.passed.md"), "utf8");

test("resultMdPathFromTestFile uses output-<name>/Result.md", () => {
  assert.equal(
    resultMdPathFromTestFile("tests/checkout_test.md"),
    "tests/output-checkout/Result.md",
  );
});

test("parseResultMd reads frontmatter and the failed step", () => {
  const parsed = parseResultMd(failed);
  assert.equal(parsed.status, "failed");
  assert.equal(parsed.session_id, "test-session-failed");
  assert.equal(parsed.failedSteps.length, 1);
  assert.equal(parsed.failedSteps[0].heading, "Checkout must show $19 for Pro");
  assert.equal(parsed.passedSteps.length, 2);
  assert.match(parsed.failedSteps[0].detail || failed, /\$29/);
});

test("classifyKaneExit maps numeric process exits first", () => {
  assert.equal(classifyKaneExit({ processExit: 0 }), "pass");
  assert.equal(classifyKaneExit({ processExit: 1, resultMd: failed }), "fail");
  assert.equal(classifyKaneExit({ processExit: 2 }), "setup");
  assert.equal(classifyKaneExit({ processExit: "3" }), "timeout");
});

test("classifyKaneExit uses Result.md when the official action hides the numeric code", () => {
  assert.equal(classifyKaneExit({ officialStatus: "failed", resultMd: failed }), "fail");
  assert.equal(classifyKaneExit({ officialStatus: "passed", resultMd: passed }), "pass");
  assert.equal(classifyKaneExit({ resultMd: failed }), "fail");
  assert.equal(classifyKaneExit({ resultMd: passed }), "pass");
});

test("classifyKaneExit treats a missing Result.md and no terminal event as setup", () => {
  assert.equal(classifyKaneExit({ officialStatus: "failed" }), "setup");
  assert.equal(classifyKaneExit({ stderrLog: "Chrome failed to launch" }), "setup");
  assert.equal(
    classifyKaneExit({ stderrLog: "run timed out after 300s" }),
    "timeout",
  );
});

test("extractHowToTest returns only the tagged block", () => {
  const readme = [
    "# Receipt",
    "intro",
    "<!-- kane:how-to-test -->",
    "Choose Pro at $19, and checkout must show $19.",
    "<!-- /kane:how-to-test -->",
    "footer",
  ].join("\n");
  assert.equal(
    extractHowToTest(readme),
    "Choose Pro at $19, and checkout must show $19.",
  );
  assert.equal(extractHowToTest("no markers"), "");
});

test("readKaneInbox loads Result.md from a workspace fixture tree", () => {
  const tmp = fs.mkdtempSync("/tmp/receipt-inbox-");
  const destDir = path.join(tmp, "tests", "output-checkout");
  fs.mkdirSync(destDir, { recursive: true });
  fs.writeFileSync(path.join(destDir, "Result.md"), failed);
  fs.mkdirSync(path.join(tmp, "kane-out"));
  fs.writeFileSync(
    path.join(tmp, "kane-out", "stream.ndjson"),
    JSON.stringify({
      type: "run_end",
      status: "failed",
      one_liner: "Checkout showed $29 instead of $19",
    }) + "\n",
  );
  const inbox = readKaneInbox(tmp, "tests/checkout_test.md");
  assert.match(inbox.resultMd, /status: failed/);
  assert.equal(inbox.oneLiner, "Checkout showed $29 instead of $19");
  assert.equal(inbox.parsed.failedSteps.length, 1);
  fs.rmSync(tmp, { recursive: true, force: true });
});
