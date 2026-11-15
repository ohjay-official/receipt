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
