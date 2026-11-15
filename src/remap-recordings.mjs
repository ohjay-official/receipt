#!/usr/bin/env node
import { discardStaleResultMd, outputDirFromTestFile, remapRecordedStartUrl } from "./lib/recordings.mjs";

const workspace = process.env.GITHUB_WORKSPACE || process.cwd();
const testFile = process.env.TEST_FILE || "tests/checkout_test.md";
const previewUrl = process.env.PREVIEW_URL || "";
const outputDir = `${workspace.replace(/\/$/, "")}/${outputDirFromTestFile(testFile)}`;

const discarded = discardStaleResultMd(outputDir);
if (discarded) {
  console.log("Discarded committed Result.md so this run cannot be classified from a stale pass.");
}

const result = remapRecordedStartUrl(outputDir, previewUrl);
if (result.remapped) {
  console.log(
    `Remapped Kane recordings from ${result.from} to ${result.to} (${result.files} files). --url does not rewrite replay navigations in Kane 0.10.`,
  );
} else {
  console.log(`Recording remap skipped (${result.reason || "unknown"}).`);
}
