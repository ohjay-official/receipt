import assert from "node:assert/strict";
import test from "node:test";
import { resolvePreviewUrl, resolveDeploymentSha, waitForHttpOk } from "../../src/lib/preview.mjs";

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

test("resolvePreviewUrl reads Vercel repository_dispatch and workflow_dispatch payloads", () => {
  assert.equal(
    resolvePreviewUrl({
      client_payload: { url: "receipt-preview.vercel.app", git: { sha: "abc" } },
      deployment_status: { environment_url: "https://ignored.example.app" },
    }),
    "https://receipt-preview.vercel.app",
  );
  assert.equal(
    resolvePreviewUrl({
      inputs: { preview_url: "https://manual.example.app" },
    }),
    "https://manual.example.app",
  );
  // Dashboard inspector URLs are not a Kane start URL; fall back.
  assert.equal(
    resolvePreviewUrl(
      { deployment_status: { target_url: "https://vercel.com/team/receipt/dpl_123" } },
      "https://prod.example.app",
    ),
    "https://prod.example.app",
  );
});

test("resolveDeploymentSha prefers repository_dispatch git.sha", () => {
  assert.equal(
    resolveDeploymentSha(
      { client_payload: { git: { sha: "deadbeef" } }, deployment: { sha: "ignored" } },
      "fallback",
    ),
    "deadbeef",
  );
  assert.equal(
    resolveDeploymentSha({ deployment: { sha: "from-deploy" } }, "fallback"),
    "from-deploy",
  );
  assert.equal(resolveDeploymentSha({}, "fallback"), "fallback");
});
