/**
 * Preview URL and deployment SHA detection for Vercel GitHub events.
 * Supports deployment_status (legacy), repository_dispatch (current
 * Vercel-for-GitHub path), and workflow_dispatch.
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
  );
  if (url) return url;
  const fallback = firstAppUrl(fallbackProductionUrl);
  return fallback || "";
}

export function resolveDeploymentSha(event, fallbackSha) {
  const payload = event?.client_payload ?? event?.clientPayload ?? {};
  const sha =
    payload.git?.sha ||
    event?.deployment?.sha ||
    event?.deployment_status?.deployment?.sha ||
    event?.deploymentStatus?.deployment?.sha ||
    fallbackSha ||
    "";
  return String(sha).trim();
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
