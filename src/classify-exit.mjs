#!/usr/bin/env node
import { classifyKaneExit, readKaneInbox } from "./lib/inbox.mjs";
import { setOutput } from "./lib/github-output.mjs";

const workspace = process.env.GITHUB_WORKSPACE || process.cwd();
const testFile = process.env.TEST_FILE || "tests/receipt_checkout_test.md";
const inbox = readKaneInbox(workspace, testFile);
const exitClass = classifyKaneExit({
  processExit: process.env.KANE_EXIT,
  resultMd: inbox.resultMd,
  stderrLog: inbox.stderrLog,
  ndjson: inbox.ndjson,
});
const status = exitClass === "pass" ? "passed" : "failed";
setOutput("exit_class", exitClass);
setOutput("status", status);
setOutput("one_liner", inbox.oneLiner || "");
console.log(`Kane exit class: ${exitClass} (status ${status})`);
if (inbox.parsed?.failedSteps?.length) {
  for (const step of inbox.parsed.failedSteps) {
    console.log(`Failed step: ${step.heading}`);
  }
}
