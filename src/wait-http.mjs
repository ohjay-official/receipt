#!/usr/bin/env node
import { waitForHttpOk } from "./lib/preview.mjs";
import { setOutput, redact } from "./lib/github-output.mjs";

const preview = process.env.PREVIEW_URL || "";
const production = process.env.PRODUCTION_URL || process.env.RECEIPT_PRODUCTION_URL || "";
const timeoutMs = Number(process.env.RECEIPT_HTTP_TIMEOUT_MS || 180000);
const intervalMs = Number(process.env.RECEIPT_HTTP_INTERVAL_MS || 5000);

async function main() {
  let startUrl = preview;
  let usedFallback = false;
  if (preview) {
    const result = await waitForHttpOk(preview, { timeoutMs, intervalMs });
    if (result !== "ok") {
      console.log("Preview did not return HTTP 200 before timeout.");
      if (production && production !== preview) {
        const fallback = await waitForHttpOk(production, { timeoutMs: 60_000, intervalMs: 5_000 });
        if (fallback === "ok") {
          startUrl = production;
          usedFallback = true;
          console.log("Using production URL fallback.");
        } else {
          startUrl = "";
          console.log("Production fallback was also unreachable.");
        }
      } else {
        startUrl = "";
      }
    }
  } else if (production) {
    const fallback = await waitForHttpOk(production, { timeoutMs: 60_000, intervalMs: 5_000 });
    startUrl = fallback === "ok" ? production : "";
    usedFallback = Boolean(startUrl);
  } else {
    startUrl = "";
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
