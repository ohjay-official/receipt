/**
 * Replay recordings from Kane 0.10 bake the authoring origin into the
 * first navigate action. --url is only the start URL for a fresh author
 * run; on replay it is ignored. Remap every recorded start/navigate
 * origin to the preview under test so a committed output-* bundle can
 * be reused on any new PR alias, not just the branch that authored it.
 */

import fs from "node:fs";
import path from "node:path";

export function outputDirFromTestFile(testFile) {
  const rel = String(testFile || "").replace(/\\/g, "/");
  const base = path.posix.basename(rel);
  if (!base.endsWith("_test.md")) {
    return path.posix.join(path.posix.dirname(rel) || ".", "output-unknown");
  }
  const name = base.slice(0, -"_test.md".length);
  return path.posix.join(path.posix.dirname(rel) || ".", `output-${name}`);
}

export function parseOrigin(url) {
  if (!url) return null;
  try {
    const parsed = new URL(String(url).includes("://") ? url : `https://${url}`);
    if (!parsed.hostname) return null;
    return { origin: parsed.origin, host: parsed.host };
  } catch {
    return null;
  }
}

export function rewriteOrigin(text, fromUrl, toUrl) {
  const from = parseOrigin(fromUrl);
  const to = parseOrigin(toUrl);
  if (!from || !to || from.origin === to.origin) return String(text);
  let out = String(text).split(from.origin).join(to.origin);
  if (from.host !== to.host) out = out.split(from.host).join(to.host);
  return out;
}

function actionFiles(internalDir) {
  const stepsDir = path.join(internalDir, "steps");
  const files = [];
  if (!fs.existsSync(stepsDir)) return files;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const next = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(next);
      else if (entry.name === "actions.ndjson") files.push(next);
    }
  };
  walk(stepsDir);
  files.sort();
  return files;
}

function addOrigin(set, url) {
  const parsed = parseOrigin(url);
  if (parsed) set.add(parsed.origin);
}

/**
 * Origins Kane baked into the recording: execution.json url plus every
 * navigate action. Third-party hosts are ignored at remap time when they
 * are not vercel.app (or otherwise not collected here).
 */
export function collectRecordedOrigins(internalDir) {
  const found = new Set();
  const executionPath = path.join(internalDir, "execution.json");
  if (fs.existsSync(executionPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(executionPath, "utf8"));
      addOrigin(found, data?.url);
    } catch {
      // ignore malformed execution.json
    }
  }
  for (const file of actionFiles(internalDir)) {
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      if (!line.trim()) continue;
      try {
        const ev = JSON.parse(line);
        const url = ev?.action_params?.url || ev?.action_params?.href;
        if (ev?.action_type === "navigate" && url) addOrigin(found, url);
      } catch {
        // skip
      }
    }
  }
  return [...found];
}

export function recordedStartUrl(internalDir) {
  const origins = collectRecordedOrigins(internalDir);
  return origins[0] || null;
}

export function shouldRemapOrigin(recordedOrigin, previewOrigin) {
  const from = parseOrigin(recordedOrigin);
  const to = parseOrigin(previewOrigin);
  if (!from || !to) return false;
  if (from.origin === to.origin) return false;
  if (/\.vercel\.app$/i.test(from.host)) return true;
  return from.host !== to.host;
}

function listFiles(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  const walk = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const next = path.join(current, entry.name);
      if (entry.isDirectory()) walk(next);
      else out.push(next);
    }
  };
  walk(dir);
  return out;
}

export function discardStaleResultMd(outputDir) {
  const resultPath = path.join(outputDir, "Result.md");
  if (fs.existsSync(resultPath)) {
    fs.unlinkSync(resultPath);
    return resultPath;
  }
  return null;
}

export function remapRecordedStartUrl(outputDir, previewUrl) {
  const internalDir = path.join(outputDir, ".internal");
  const preview = parseOrigin(previewUrl);
  if (!preview) {
    return { remapped: false, reason: "invalid-preview-url", files: 0 };
  }
  if (!fs.existsSync(internalDir)) {
    return { remapped: false, reason: "no-recordings", files: 0 };
  }
  const recordedOrigins = collectRecordedOrigins(internalDir).filter((origin) =>
    shouldRemapOrigin(origin, preview.origin),
  );
  if (recordedOrigins.length === 0) {
    const already = collectRecordedOrigins(internalDir);
    if (already.length === 0) {
      return { remapped: false, reason: "no-recorded-origin", files: 0 };
    }
    return {
      remapped: false,
      reason: "already-current",
      files: 0,
      from: already[0],
      to: preview.origin,
    };
  }
  let files = 0;
  for (const file of listFiles(internalDir)) {
    const original = fs.readFileSync(file, "utf8");
    let next = original;
    for (const origin of recordedOrigins) {
      next = rewriteOrigin(next, origin, preview.origin);
    }
    if (next !== original) {
      fs.writeFileSync(file, next);
      files += 1;
    }
  }
  return {
    remapped: files > 0,
    reason: files > 0 ? "rewrote-origin" : "no-matches",
    files,
    from: recordedOrigins.join(", "),
    to: preview.origin,
  };
}
