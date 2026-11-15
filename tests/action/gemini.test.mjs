import assert from "node:assert/strict";
import test from "node:test";
import { callGeminiFlash, parseFixerFiles } from "../../src/lib/gemini.mjs";
import { proposeFix } from "../../src/lib/fixer.mjs";

test("parseFixerFiles reads a fenced files object", () => {
  const files = parseFixerFiles(
    "```json\n{\"files\": {\"shop/lib/prices.ts\": \"export const CHECKOUT_PRO_USD = 19;\\n\"}}\n```",
  );
  assert.equal(files["shop/lib/prices.ts"].includes("19"), true);
});

test("callGeminiFlash backs off on 429 then succeeds", async () => {
  const sleeps = [];
  let calls = 0;
  const { text, model } = await callGeminiFlash("fix it", {
    apiKey: "fake",
    sleeper: async (ms) => {
      sleeps.push(ms);
    },
    fetchImpl: async () => {
      calls += 1;
      if (calls === 1) {
        return { status: 429, text: async () => "{\"error\":{\"message\":\"busy\"}}" };
      }
      return {
        status: 200,
        text: async () =>
          JSON.stringify({
            candidates: [{ content: { parts: [{ text: "ok-from-flash" }] } }],
          }),
      };
    },
  });
  assert.equal(text, "ok-from-flash");
  assert.equal(model, "gemini-3.8-flash");
  assert.deepEqual(sleeps, [5000]);
});

test("proposeFix rejects a patch that touches README.md", async () => {
  await assert.rejects(
    () =>
      proposeFix({
        claim: "checkout must show $19",
        resultMd: "status: failed\nCheckout showed $29",
        sources: { "shop/lib/prices.ts": "export const CHECKOUT_PRO_USD = 29;\n" },
        apiKey: "fake",
        fetchImpl: async () => ({
          status: 200,
          text: async () =>
            JSON.stringify({
              candidates: [
                {
                  content: {
                    parts: [
                      {
                        text: JSON.stringify({
                          files: {
                            "shop/lib/prices.ts": "ok",
                            "README.md": "weaken the contract",
                          },
                        }),
                      },
                    ],
                  },
                },
              ],
            }),
        }),
      }),
    /README\.md/,
  );
});

test("proposeFix refuses to run without Result.md", async () => {
  await assert.rejects(
    () => proposeFix({ claim: "checkout must show $19", resultMd: "  ", apiKey: "fake" }),
    /Result\.md/,
  );
});

function okResponse(text) {
  return {
    status: 200,
    text: async () =>
      JSON.stringify({
        candidates: [{ content: { parts: [{ text }] } }],
      }),
  };
}

test("callGeminiFlash retries fetch failed then succeeds", async () => {
  const sleeps = [];
  const logs = [];
  let calls = 0;
  const { text, model } = await callGeminiFlash("fix it", {
    apiKey: "fake-secret-key",
    sleeper: async (ms) => {
      sleeps.push(ms);
    },
    logger: (line) => logs.push(line),
    fetchImpl: async () => {
      calls += 1;
      if (calls === 1) {
        throw new Error("fetch failed");
      }
      return okResponse("ok-after-network");
    },
  });
  assert.equal(text, "ok-after-network");
  assert.equal(model, "gemini-3.8-flash");
  assert.deepEqual(sleeps, [5000]);
  assert.equal(logs.some((l) => /fetch failed \(network\)\. Retrying in 5s/.test(l)), true);
  assert.equal(logs.join("\n").includes("fake-secret-key"), false);
});

test("callGeminiFlash retries HTTP 500 and 502, then falls back to flash-lite", async () => {
  const sleeps = [];
  const logs = [];
  let calls = 0;
  const { text, model } = await callGeminiFlash("fix it", {
    apiKey: "fake",
    sleeper: async (ms) => {
      sleeps.push(ms);
    },
    logger: (line) => logs.push(line),
    backoffMs: [5_000, 15_000],
    fallbackBackoffMs: [10_000],
    fetchImpl: async (url) => {
      calls += 1;
      if (String(url).includes("gemini-3.8-flash")) {
        return { status: calls === 1 ? 500 : 502, text: async () => "{\"error\":{\"message\":\"upstream\"}}" };
      }
      return okResponse("ok-from-lite");
    },
  });
  assert.equal(text, "ok-from-lite");
  assert.equal(model, "gemini-3.5-flash-lite");
  assert.deepEqual(sleeps, [5000, 15000]);
  assert.equal(logs.some((l) => /HTTP 500\. Retrying in 5s/.test(l)), true);
  assert.equal(logs.some((l) => /Falling back to gemini-3.5-flash-lite/.test(l)), true);
  assert.equal(logs.some((l) => /succeeded on attempt 1/.test(l)), true);
});

test("callGeminiFlash does not retry HTTP 400", async () => {
  let calls = 0;
  await assert.rejects(
    () =>
      callGeminiFlash("fix it", {
        apiKey: "fake",
        sleeper: async () => {
          throw new Error("should not sleep on 400");
        },
        fetchImpl: async () => {
          calls += 1;
          return { status: 400, text: async () => "{\"error\":{\"message\":\"bad request\"}}" };
        },
      }),
    /bad request/,
  );
  assert.equal(calls, 1);
});
