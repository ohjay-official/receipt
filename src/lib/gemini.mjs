/**
 * Free-tier Gemini Flash only. Retry 429, 5xx, timeouts, and transient
 * `fetch failed` with backoff, then one fallback model. Never a paid API.
 * Never log the key.
 */

export const BACKOFF_MS = [5_000, 15_000, 45_000, 90_000];
export const FALLBACK_BACKOFF_MS = [10_000];
export const REQUEST_TIMEOUT_MS = 30_000;
export const DEFAULT_MODEL = "gemini-3.8-flash";
export const FALLBACK_MODEL = "gemini-3.5-flash-lite";

export function buildEndpoint(model) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
}

export function isRetryableStatus(status) {
  const code = Number(status);
  return code === 408 || code === 429 || (code >= 500 && code <= 599);
}

export function isRetryableNetworkError(err) {
  if (!err) return false;
  const name = err.name || "";
  const code = err.code || err.cause?.code || "";
  const msg = String(err.message || err);
  if (name === "AbortError" || name === "TimeoutError") return true;
  if (err.code === "GEMINI_TIMEOUT" || err.code === "GEMINI_NETWORK") return true;
  return /fetch failed|ECONNRESET|ECONNREFUSED|ETIMEDOUT|ENOTFOUND|EAI_AGAIN|UND_ERR|socket|network|timed out|AbortError|timeout/i.test(
    `${name} ${code} ${msg}`,
  );
}

export function redactGeminiText(value, apiKey) {
  let text = String(value ?? "");
  if (apiKey) text = text.split(apiKey).join("[redacted]");
  return text
    .replace(/x-goog-api-key["'\s:=]+[^\s"']+/gi, "x-goog-api-key=[redacted]")
    .replace(/[?&]key=[^&\s"']+/gi, "[redacted-key]")
    .replace(/\s+/g, " ")
    .trim();
}

async function sleep(ms, sleeper) {
  const fn = sleeper || ((t) => new Promise((r) => setTimeout(r, t)));
  await fn(ms);
}

async function postOnce(model, prompt, apiKey, fetchImpl, timeoutMs) {
  const limit = timeoutMs ?? REQUEST_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), limit);
  try {
    const res = await fetchImpl(buildEndpoint(model), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2 },
      }),
      signal: controller.signal,
    });
    const text = await res.text();
    let json = null;
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }
    return { status: res.status, text, json };
  } catch (err) {
    if (err?.name === "AbortError" || err?.name === "TimeoutError") {
      const wrapped = new Error(`Gemini request timed out after ${limit}ms`);
      wrapped.code = "GEMINI_TIMEOUT";
      throw wrapped;
    }
    const wrapped = new Error(redactGeminiText(err?.message || "fetch failed", apiKey) || "fetch failed");
    wrapped.code = "GEMINI_NETWORK";
    wrapped.cause = err;
    throw wrapped;
  } finally {
    clearTimeout(timer);
  }
}

function extractText(json) {
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  return parts.map((p) => p.text || "").join("").trim();
}

function logLine(logger, line) {
  const fn = logger || console.log;
  fn(line);
}

export async function callGeminiFlash(prompt, opts = {}) {
  const apiKey = opts.apiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Add it as a GitHub Actions secret. Do not add a billing account.");
  }
  const fetchImpl = opts.fetchImpl ?? fetch;
  const sleeper = opts.sleeper;
  const logger = opts.logger;
  const timeoutMs = opts.timeoutMs ?? REQUEST_TIMEOUT_MS;
  const primary = opts.model || DEFAULT_MODEL;
  const plan = [{ model: primary, backoff: opts.backoffMs || BACKOFF_MS }];
  if (!opts.model) {
    plan.push({ model: FALLBACK_MODEL, backoff: opts.fallbackBackoffMs || FALLBACK_BACKOFF_MS });
  }

  let lastError = "Gemini request failed";
  let lastStatus;

  for (let modelIndex = 0; modelIndex < plan.length; modelIndex += 1) {
    const { model, backoff } = plan[modelIndex];
    const maxAttempts = backoff.length + 1;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      let status;
      let json;
      try {
        const result = await postOnce(model, prompt, apiKey, fetchImpl, timeoutMs);
        status = result.status;
        json = result.json;
      } catch (err) {
        lastError = redactGeminiText(err.message || "fetch failed", apiKey);
        lastStatus = undefined;
        const wait = attempt < maxAttempts ? backoff[attempt - 1] : null;
        const retryable = isRetryableNetworkError(err);
        if (retryable && wait != null) {
          logLine(
            logger,
            `Gemini ${model} attempt ${attempt}/${maxAttempts} failed: ${lastError} (network). Retrying in ${wait / 1000}s.`,
          );
          await sleep(wait, sleeper);
          continue;
        }
        if (retryable && modelIndex < plan.length - 1) {
          const next = plan[modelIndex + 1].model;
          logLine(
            logger,
            `Gemini ${model} exhausted after ${attempt} attempt(s) (last: ${lastError}, network). Falling back to ${next}.`,
          );
          break;
        }
        const thrown = new Error(lastError);
        thrown.code = err.code || "GEMINI_NETWORK";
        throw thrown;
      }

      if (status >= 200 && status < 300) {
        const out = extractText(json);
        if (!out) throw new Error("Gemini returned an empty candidate");
        if (attempt > 1 || modelIndex > 0) {
          logLine(logger, `Gemini ${model} succeeded on attempt ${attempt}/${maxAttempts}.`);
        }
        return { text: out, model, status };
      }

      lastStatus = status;
      lastError = redactGeminiText(
        json?.error?.message || `Gemini ${model} HTTP ${status}`,
        apiKey,
      );
      const wait = attempt < maxAttempts ? backoff[attempt - 1] : null;
      if (isRetryableStatus(status) && wait != null) {
        logLine(
          logger,
          `Gemini ${model} attempt ${attempt}/${maxAttempts} failed: HTTP ${status}. Retrying in ${wait / 1000}s.`,
        );
        await sleep(wait, sleeper);
        continue;
      }
      if (isRetryableStatus(status) && modelIndex < plan.length - 1) {
        const next = plan[modelIndex + 1].model;
        logLine(
          logger,
          `Gemini ${model} exhausted after ${attempt} attempt(s) (last: HTTP ${status}). Falling back to ${next}.`,
        );
        break;
      }
      const suffix = status === 403 ? " (free tier may be unavailable — do not add billing)" : "";
      const err = new Error(`${lastError}${suffix}`);
      err.status = status;
      throw err;
    }
  }
  const err = new Error(`${lastError}. Free-tier Gemini exhausted — not billed.`);
  err.status = lastStatus || 429;
  throw err;
}

export function parseFixerFiles(modelText) {
  if (!modelText) throw new Error("fixer model returned no text");
  const fenced = modelText.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = (fenced ? fenced[1] : modelText).trim();
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("fixer model did not return JSON of the form { files: { path: contents } }");
  }
  const files = parsed.files || parsed;
  if (!files || typeof files !== "object" || Array.isArray(files)) {
    throw new Error("fixer JSON is missing a files object");
  }
  const out = {};
  for (const [key, value] of Object.entries(files)) {
    if (typeof value !== "string") {
      throw new Error(`fixer file value for ${key} must be a string (full file contents)`);
    }
    out[key] = value;
  }
  if (Object.keys(out).length === 0) throw new Error("fixer proposed no files");
  return out;
}
