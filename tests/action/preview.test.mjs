import assert from "node:assert/strict";
import test from "node:test";
import { resolvePreviewUrl, waitForHttpOk } from "../../src/lib/preview.mjs";

test("resolvePreviewUrl prefers environment_url then target_url then fallback", () => {
  assert.equal(
    resolvePreviewUrl({
      deployment_status: {
        environment_url: "https://preview.example.app",
        target_url: "https://ignored.example.app",
      },
    }),
    "https://preview.example.app",
  );
  assert.equal(
    resolvePreviewUrl({
      deployment_status: { target_url: "https://target.example.app" },
    }),
    "https://target.example.app",
  );
  assert.equal(
    resolvePreviewUrl({ deployment_status: {} }, "https://prod.example.app"),
    "https://prod.example.app",
  );
  assert.equal(resolvePreviewUrl({}), "");
});

test("waitForHttpOk returns ok on 200 and timeout when every response is a wall", async () => {
  const ok = await waitForHttpOk("https://preview.example.app", {
    timeoutMs: 20,
    intervalMs: 5,
    fetchImpl: async () => ({ status: 200, headers: { get: () => null } }),
  });
  assert.equal(ok, "ok");

  const wall = await waitForHttpOk("https://preview.example.app", {
    timeoutMs: 20,
    intervalMs: 5,
    fetchImpl: async () => ({
      status: 302,
      headers: { get: () => "https://vercel.com/login" },
    }),
  });
  assert.equal(wall, "timeout");
});
