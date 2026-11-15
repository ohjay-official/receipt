/**
 * Helpers for GitHub Actions composite steps.
 * Never write secrets to stdout or to GITHUB_OUTPUT values.
 */

import { appendFileSync } from "node:fs";

const SECRET_ENV = [
  "LT_USERNAME",
  "LT_ACCESS_KEY",
  "GEMINI_API_KEY",
  "RECEIPT_GIT_TOKEN",
  "GITHUB_TOKEN",
];

export function redact(text) {
  if (text == null) return "";
  let out = String(text);
  for (const name of SECRET_ENV) {
    const val = process.env[name];
    if (val && val.length > 0) {
      out = out.split(val).join("[redacted]");
    }
  }
  out = out.replace(/(--access-key|--username)(\s+)(\S+)/g, "$1$2[redacted]");
  out = out.replace(/x-access-token:[^@\s]+/g, "x-access-token:[redacted]");
  out = out.replace(/Bearer\s+[A-Za-z0-9._\-\/=]+/gi, "Bearer [redacted]");
  return out;
}

export function setOutput(name, value) {
  const dest = process.env.GITHUB_OUTPUT;
  const line = `${name}=${String(value ?? "")}\n`;
  if (dest) appendFileSync(dest, line);
  else process.stdout.write(`output ${line}`);
}

export function repoFromEnv() {
  const slug = process.env.GITHUB_REPOSITORY || "";
  const [owner, repo] = slug.split("/");
  return { owner, repo, slug };
}
