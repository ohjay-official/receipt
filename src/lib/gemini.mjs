/**
 * Free-tier Gemini Flash only. 429 → exponential backoff, then one
 * gemini-3.5-flash-lite try. Never a paid API. Never log the key.
 */

const BACKOFF_MS = [5_000, 15_000, 45_000, 90_000];
const DEFAULT_MODEL = "gemini-3.8-flash";
const FALLBACK_MODEL = "gemini-3.5-flash-lite";

export function buildEndpoint(model) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
}

export function isRetryableStatus(status) {
  return status === 429 || status === 408 || status === 503;
}

async function sleep(ms, sleeper) {
  const fn = sleeper || ((t) => new Promise((r) => setTimeout(r, t)));
  await fn(ms);
}

async function postOnce(model, prompt, apiKey, fetchImpl) {
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
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  return { status: res.status, text, json };
}

function extractText(json) {
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  return parts.map((p) => p.text || "").join("").trim();
}

export async function callGeminiFlash(prompt, opts = {}) {
  const apiKey = opts.apiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Add it as a GitHub Actions secret. Do not add a billing account.");
  }
  const fetchImpl = opts.fetchImpl ?? fetch;
  const sleeper = opts.sleeper;
  const models = [opts.model || DEFAULT_MODEL];
  let lastError = "Gemini request failed";

  for (let modelIndex = 0; modelIndex < models.length; modelIndex += 1) {
    const model = models[modelIndex];
    const retries = modelIndex === 0 ? BACKOFF_MS : [];
    for (let attempt = 0; attempt <= retries.length; attempt += 1) {
      const { status, json, text } = await postOnce(model, prompt, apiKey, fetchImpl);
      if (status >= 200 && status < 300) {
        const out = extractText(json);
        if (!out) throw new Error("Gemini returned an empty candidate");
        return { text: out, model, status };
      }
      if (isRetryableStatus(status) && attempt < retries.length) {
        await sleep(retries[attempt], sleeper);
        lastError = `Gemini ${model} HTTP ${status}`;
        continue;
      }
      if (isRetryableStatus(status) && model === DEFAULT_MODEL && !opts.model) {
        lastError = `Gemini ${model} HTTP ${status}`;
        models.push(FALLBACK_MODEL);
        break;
      }
      const errMsg =
        json?.error?.message ||
        `Gemini ${model} HTTP ${status}${status === 403 ? " (free tier may be unavailable — do not add billing)" : ""}`;
      const err = new Error(errMsg);
      err.status = status;
      throw err;
    }
  }
  const err = new Error(`${lastError}. Free-tier Gemini exhausted — not billed.`);
  err.status = 429;
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
