#!/usr/bin/env node
import fs from "node:fs";
import { resolvePreviewUrl } from "./lib/preview.mjs";
import { setOutput } from "./lib/github-output.mjs";

const eventPath = process.env.GITHUB_EVENT_PATH;
let event = {};
if (eventPath && fs.existsSync(eventPath)) {
  event = JSON.parse(fs.readFileSync(eventPath, "utf8"));
} else if (process.env.RECEIPT_EVENT_JSON) {
  event = JSON.parse(process.env.RECEIPT_EVENT_JSON);
}

const fallback = process.env.RECEIPT_PRODUCTION_URL || process.env.PRODUCTION_URL || "";
const previewUrl = resolvePreviewUrl(event, fallback);
setOutput("preview_url", previewUrl);
if (!previewUrl) {
  console.log("No preview URL on the deployment_status event and no production fallback.");
} else {
  console.log(`Resolved start URL host: ${safeHost(previewUrl)}`);
}

function safeHost(url) {
  try {
    return new URL(url).host;
  } catch {
    return "(unparseable url)";
  }
}
