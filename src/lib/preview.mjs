/**
 * Preview URL detection for a deployment_status event.
 */

export function resolvePreviewUrl(event, fallbackProductionUrl) {
  const status = event?.deployment_status ?? event?.deploymentStatus ?? {};
  const url = status.environment_url || status.target_url || "";
  const trimmed = String(url).trim();
  if (trimmed) return trimmed;
  const fallback = String(fallbackProductionUrl || "").trim();
  return fallback || "";
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
