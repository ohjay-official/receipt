import { createHash } from "node:crypto";

/**
 * Preview URL and deployment SHA detection for Vercel GitHub events.
 * Supports deployment_status (legacy), repository_dispatch (current
 * Vercel-for-GitHub path), workflow_dispatch, and pull_request
 * (git-branch alias after the Vercel commit status is success).
 */

export function normalizeUrl(url) {
  const trimmed = String(url || "").trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^[a-z0-9.-]+\.[a-z]{2,}(:\d+)?(\/|$)/i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return "";
}

export function isAppUrl(url) {
  const normalized = normalizeUrl(url);
  if (!normalized) return false;
  try {
    const host = new URL(normalized).hostname.toLowerCase();
    // Inspector / dashboard / login URLs are not a start URL for Kane.
    if (host === "vercel.com" || host === "www.vercel.com") return false;
    return true;
  } catch {
    return false;
  }
}

function firstAppUrl(...candidates) {
  for (const candidate of candidates) {
    if (isAppUrl(candidate)) return normalizeUrl(candidate);
  }
  return "";
}

export function resolvePreviewUrl(event, fallbackProductionUrl) {
  const status = event?.deployment_status ?? event?.deploymentStatus ?? {};
  const payload = event?.client_payload ?? event?.clientPayload ?? {};
  const inputs = event?.inputs ?? {};
  const url = firstAppUrl(
    payload.url,
    status.environment_url,
    status.target_url,
    inputs.preview_url,
    inputs.previewUrl,
    event?.preview_url,
    event?.preview_alias,
  );
  if (url) return url;
  const branch =
    payload.git?.ref ||
    event?.pull_request?.head?.ref ||
    event?.pullRequest?.head?.ref ||
    "";
  const alias = vercelGitBranchUrl({
    project: event?.vercelProject || process.env.RECEIPT_VERCEL_PROJECT,
    scope: event?.vercelScope || process.env.RECEIPT_VERCEL_SCOPE,
    branch,
  });
  if (alias) return alias;
  const fallback = firstAppUrl(fallbackProductionUrl);
  return fallback || "";
}

export function resolveDeploymentSha(event, fallbackSha) {
  const payload = event?.client_payload ?? event?.clientPayload ?? {};
  const sha =
    payload.git?.sha ||
    event?.pull_request?.head?.sha ||
    event?.pullRequest?.head?.sha ||
    event?.deployment?.sha ||
    event?.deployment_status?.deployment?.sha ||
    event?.deploymentStatus?.deployment?.sha ||
    fallbackSha ||
    "";
  return String(sha).trim();
}

export function slugifyVercelBranch(branch) {
  return String(branch || "")
    .replace(/^refs\/heads\//, "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Git branch alias: <project>-git-<branch>-<scope>.vercel.app
 * Truncation follows the public Vercel community algorithm (DNS label <= 63).
 */
export function vercelGitBranchUrl({ project, scope, branch } = {}) {
  const projectName = String(project || "").trim();
  const org = String(scope || "").trim();
  const rawBranch = String(branch || "").replace(/^refs\/heads\//, "").trim();
  if (!projectName || !org || !rawBranch) return "";
  const branchSlug = slugifyVercelBranch(rawBranch);
  if (!branchSlug) return "";
  const label = `${projectName}-git-${branchSlug}-${org}`;
  if (label.length <= 63) return `https://${label}.vercel.app`;
  const hash = createHash("sha256")
    .update(`git-${rawBranch}${projectName}`)
    .digest("hex")
    .slice(0, 6);
  const suffix = `${hash}-${org}`;
  const truncated = label.slice(0, 63 - suffix.length - 1);
  return `https://${truncated}-${suffix}.vercel.app`;
}

export async function waitForVercelCommitStatus({
  sha,
  repo,
  token,
  timeoutMs = 180_000,
  intervalMs = 5_000,
  fetchImpl = fetch,
} = {}) {
  if (!sha || !repo || !token) return "skipped";
  const start = Date.now();
  const url = `https://api.github.com/repos/${repo}/commits/${encodeURIComponent(sha)}/status`;
  let last = "pending";
  while (Date.now() - start <= timeoutMs) {
    try {
      const res = await fetchImpl(url, {
        headers: {
          authorization: `Bearer ${token}`,
          accept: "application/vnd.github+json",
          "user-agent": "receipt-kane-gate/1.0",
          "x-github-api-version": "2022-11-28",
        },
      });
      if (res.ok) {
        const data = await res.json();
        const statuses = Array.isArray(data.statuses) ? data.statuses : [];
        const vercel = statuses.filter((s) => /^vercel\b/i.test(s.context || ""));
        if (vercel.some((s) => s.state === "success")) return "ok";
        if (vercel.some((s) => s.state === "failure" || s.state === "error")) {
          return "failed";
        }
        last = vercel[0]?.state || data.state || "pending";
      }
    } catch (err) {
      last = err?.message || String(err);
    }
    const remaining = timeoutMs - (Date.now() - start);
    if (remaining <= 0) break;
    await new Promise((r) => setTimeout(r, Math.min(intervalMs, remaining)));
  }
  return last === "failed" ? "failed" : "timeout";
}

export async function waitForHttpOk(url, opts = {}) {
  const timeoutMs = opts.timeoutMs ?? 180_000;
  const intervalMs = opts.intervalMs ?? 5_000;
  const fetchImpl = opts.fetchImpl ?? fetch;
  if (!url) return "timeout";
  const start = Date.now();
  let lastError = "";
  while (Date.now() - start <= timeoutMs) {
    try {
      const res = await fetchImpl(url, {
        method: "GET",
        redirect: "manual",
        headers: { "user-agent": "receipt-kane-gate/1.0" },
      });
      // 2xx is ready. 3xx follow once if it's the app, but a Vercel SSO
      // login wall is typically 401/403 or a vercel.com login redirect.
      if (res.status >= 200 && res.status < 300) return "ok";
      const location = res.headers?.get?.("location") || "";
      if (res.status >= 300 && res.status < 400 && location) {
        if (/vercel\.com\/login|sso|protection/i.test(location)) {
          lastError = `deployment protection wall (${res.status})`;
        } else {
          const followed = await fetchImpl(location, {
            method: "GET",
            redirect: "follow",
            headers: { "user-agent": "receipt-kane-gate/1.0" },
          });
          if (followed.status >= 200 && followed.status < 300) return "ok";
          lastError = `HTTP ${followed.status} after redirect`;
        }
      } else {
        lastError = `HTTP ${res.status}`;
      }
    } catch (err) {
      lastError = err?.message || String(err);
    }
    const remaining = timeoutMs - (Date.now() - start);
    if (remaining <= 0) break;
    await new Promise((r) => setTimeout(r, Math.min(intervalMs, remaining)));
  }
  return "timeout";
}
