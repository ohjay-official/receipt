#!/usr/bin/env node
import { waitForHttpOk, waitForVercelCommitStatus } from "./lib/preview.mjs";
import { setOutput, redact } from "./lib/github-output.mjs";

const preview = process.env.PREVIEW_URL || "";
const production = process.env.PRODUCTION_URL || process.env.RECEIPT_PRODUCTION_URL || "";
const timeoutMs = Number(process.env.RECEIPT_HTTP_TIMEOUT_MS || 180000);
const intervalMs = Number(process.env.RECEIPT_HTTP_INTERVAL_MS || 5000);
const sha = process.env.RECEIPT_PREVIEW_SHA || "";
const waitForStatus = process.env.RECEIPT_WAIT_FOR_VERCEL_STATUS !== "false";

async function maybeWaitForStatus() {
  if (!waitForStatus || !sha) return "skipped";
  const repo = process.env.GITHUB_REPOSITORY || "";
  const token = process.env.GITHUB_TOKEN || "";
  if (!repo || !token) return "skipped";
  console.log(`Waiting for the Vercel commit status on ${sha.slice(0, 7)}…`);
  const result = await waitForVercelCommitStatus({
    sha,
    repo,
    token,
    timeoutMs,
    intervalMs,
  });
  if (result === "ok") {
    console.log("Vercel commit status is success; polling the preview URL.");
  } else if (result === "failed") {
    console.log("Vercel commit status reported failure for this SHA.");
  } else if (result === "timeout") {
    console.log("Timed out waiting for a Vercel commit status; will still poll the preview URL.");
  }
  return result;
}

async function main() {
  let startUrl = preview;
  let usedFallback = false;
  const status = await maybeWaitForStatus();
  if (status === "failed") {
    console.log("Not using the preview alias for a failed Vercel deploy.");
    startUrl = "";
  }
  if (startUrl) {
    const result = await waitForHttpOk(startUrl, { timeoutMs, intervalMs });
    if (result !== "ok") {
      console.log("Preview did not return HTTP 200 before timeout.");
      startUrl = "";
    }
  }
  if (!startUrl && production && production !== preview) {
    const fallback = await waitForHttpOk(production, { timeoutMs: 60_000, intervalMs: 5_000 });
    if (fallback === "ok") {
      startUrl = production;
      usedFallback = true;
      console.log("Using production URL fallback.");
    } else {
      console.log("Production fallback was also unreachable.");
    }
  }
  setOutput("start_url", startUrl);
  setOutput("used_fallback", usedFallback ? "true" : "false");
  if (!startUrl) {
    console.log("No reachable start URL.");
  } else {
    try {
      console.log(`Kane will start at host ${new URL(startUrl).host}${usedFallback ? " (fallback)" : ""}`);
    } catch (err) {
      console.log(redact(err.message));
    }
  }
}

await main();
