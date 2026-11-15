/**
 * Deterministic fixer path guard. The model does not get a vote.
 */

import path from "node:path";

export const DEFAULT_ALLOWLIST = ["shop/**"];

export const DEFAULT_DENYLIST = [
  "README.md",
  "action.yml",
  "src/**",
  "tests/**",
  ".github/**",
  "docs/**",
  ".env",
  ".env.*",
  ".testmuai/**",
  "kane-out/**",
];

export function normalizeRepoPath(input) {
  if (input == null || String(input).trim() === "") {
    throw new Error("empty path is not allowed");
  }
  let raw = String(input).trim();
  if (path.isAbsolute(raw) || raw.startsWith("~")) {
    throw new Error(`absolute path is not allowed: ${raw}`);
  }
  const posix = raw.replace(/\\/g, "/");
  const normalized = path.posix.normalize(posix).replace(/^\.\//, "");
  if (normalized === ".." || normalized.startsWith("../") || normalized.includes("/../")) {
    throw new Error(`path escapes the repository: ${raw}`);
  }
  if (normalized.startsWith(".git/") || normalized === ".git") {
    throw new Error("git metadata is not allowed");
  }
  return normalized;
}

export function matchGlob(repoPath, glob) {
  const pathNorm = normalizeRepoPath(repoPath);
  const globNorm = String(glob).replace(/\\/g, "/").replace(/^\.\//, "");
  const regex = globToRegExp(globNorm);
  return regex.test(pathNorm);
}

function globToRegExp(glob) {
  let out = "";
  for (let i = 0; i < glob.length; i += 1) {
    const c = glob[i];
    if (c === "*" && glob[i + 1] === "*") {
      const next = glob[i + 2];
      if (next === "/") {
        out += "(?:.*\\/)?";
        i += 2;
      } else {
        out += ".*";
        i += 1;
      }
    } else if (c === "*") {
      out += "[^/]*";
    } else if (c === "?") {
      out += "[^/]";
    } else {
      out += c.replace(/[.+^${}()|[\]\\]/g, "\\$&");
    }
  }
  return new RegExp(`^${out}$`);
}

export function isAllowlisted(repoPath, allowlist = DEFAULT_ALLOWLIST, denylist = DEFAULT_DENYLIST) {
  const normalized = normalizeRepoPath(repoPath);
  for (const deny of denylist) {
    if (matchGlob(normalized, deny)) return false;
  }
  return allowlist.some((glob) => matchGlob(normalized, glob));
}

export function assertAllowlisted(
  changedPaths,
  allowlist = DEFAULT_ALLOWLIST,
  denylist = DEFAULT_DENYLIST,
) {
  const paths = Array.isArray(changedPaths) ? changedPaths : [changedPaths];
  const rejected = [];
  for (const p of paths) {
    let ok = false;
    try {
      ok = isAllowlisted(p, allowlist, denylist);
    } catch (err) {
      rejected.push(`${p} (${err.message})`);
      continue;
    }
    if (!ok) rejected.push(p);
  }
  if (rejected.length > 0) {
    const err = new Error(
      `path guard rejected ${rejected.length} path(s): ${rejected.join(", ")}. Fixer may only write ${allowlist.join(", ")}.`,
    );
    err.rejected = rejected;
    throw err;
  }
}
