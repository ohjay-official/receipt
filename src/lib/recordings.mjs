/**
 * Replay recordings from Kane 0.10 bake the authoring origin into the
 * first navigate action. --url is only the start URL for a fresh author
 * run; on replay it is ignored. Remap that origin to the preview under
 * test so a committed output-* bundle can be reused across PR aliases.
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

export function recordedStartUrl(internalDir) {
  const executionPath = path.join(internalDir, "execution.json");
  if (fs.existsSync(executionPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(executionPath, "utf8"));
      if (data?.url) return String(data.url);
    } catch {
      // fall through to navigate actions
    }
  }
  const stepsDir = path.join(internalDir, "steps");
  if (!fs.existsSync(stepsDir)) return null;
  const files = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const next = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(next);
      else if (entry.name === "actions.ndjson") files.push(next);
    }
  };
  walk(stepsDir);
  files.sort();
  for (const file of files) {
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      if (!line.trim()) continue;
      try {
        const ev = JSON.parse(line);
        const url = ev?.action_params?.url || ev?.action_params?.href;
        if (ev?.action_type === "navigate" && url) return String(url);
      } catch {
        // skip
      }
    }
  }
  return null;
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
  const recorded = recordedStartUrl(internalDir);
  const from = parseOrigin(recorded);
  if (!from) {
    return { remapped: false, reason: "no-recorded-origin", files: 0 };
  }
  if (from.origin === preview.origin) {
    return { remapped: false, reason: "already-current", files: 0, from: from.origin, to: preview.origin };
  }
  let files = 0;
  for (const file of listFiles(internalDir)) {
    const original = fs.readFileSync(file, "utf8");
    const next = rewriteOrigin(original, from.origin, preview.origin);
    if (next !== original) {
      fs.writeFileSync(file, next);
      files += 1;
    }
  }
  return {
    remapped: files > 0,
    reason: files > 0 ? "rewrote-origin" : "no-matches",
    files,
    from: from.origin,
    to: preview.origin,
  };
}
