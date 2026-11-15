/**
 * Minimal GitHub REST helpers. Tokens are never logged.
 */

import { redact, repoFromEnv } from "./github-output.mjs";

export async function githubJson(pathname, opts = {}) {
  const token = opts.token || process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is missing");
  const url = pathname.startsWith("http") ? pathname : `https://api.github.com${pathname}`;
  const res = await fetch(url, {
    method: opts.method || "GET",
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${token}`,
      "x-github-api-version": "2022-11-28",
      "user-agent": "receipt-kane-gate",
      ...(opts.body ? { "content-type": "application/json" } : {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  if (!res.ok) {
    throw new Error(redact(`GitHub API ${res.status} ${pathname}: ${(json && json.message) || text}`));
  }
  return json;
}

export async function findPullRequest({ sha, token } = {}) {
  const { owner, repo } = repoFromEnv();
  if (!owner || !repo) return null;
  const commitSha = sha || process.env.GITHUB_SHA;
  if (!commitSha) return null;
  const pulls = await githubJson(
    `/repos/${owner}/${repo}/commits/${commitSha}/pulls`,
    { token },
  );
  if (Array.isArray(pulls) && pulls.length > 0) return pulls[0];
  return null;
}

const MARKER = "<!-- receipt-comment -->";

export function buildCommentBody(fields) {
  const status = fields.status === "passed" || fields.exitClass === "pass" ? "passed" : "failed";
  const icon = status === "passed" ? "passed" : "failed";
  const lines = [
    MARKER,
    `## Receipt: ${icon}`,
    "",
    fields.summary ? `> ${fields.summary}` : "> Kane ran on the preview against the How-to-test contract.",
    "",
    `- Start URL: ${fields.previewUrl || "(unknown)"}`,
    `- Kane exit class: \`${fields.exitClass || "unknown"}\`${fields.kaneExit != null && fields.kaneExit !== "" ? ` (code ${fields.kaneExit})` : ""}`,
    `- Fixer attempts already on this branch: ${fields.attempts ?? 0} / ${fields.maxFixes ?? 3}`,
  ];
  if (fields.usedFallback) {
    lines.push("- Note: the preview was not ready; Kane used the production fallback URL.");
  }
  if (fields.evidenceUrl) {
    lines.push(`- Evidence: [Open the evidence pack](${fields.evidenceUrl}) (artifact \`${fields.evidenceArtifactName || "receipt-evidence"}\`, kept 30 days).`);
  } else if (fields.evidenceHint) {
    lines.push(`- Evidence artifact: \`${fields.evidenceHint}\` (and \`tests/output-*/Result.md\`) on this Actions run, kept 30 days.`);
  }
  if (fields.fixerNote) {
    lines.push(`- Fixer: ${fields.fixerNote}`);
  }
  if (fields.excerpt) {
    lines.push("", "### Result.md excerpt", "", "```markdown", fields.excerpt.trim(), "```");
  }
  lines.push(
    "",
    "The README How-to-test block is the contract. A fixer may only edit `shop/**`.",
    "",
    "_Verified in a real browser by Kane CLI. Do not merge a preview without a Receipt._",
  );
  return lines.join("\n");
}

export async function upsertComment({ issueNumber, body, token }) {
  const { owner, repo } = repoFromEnv();
  const comments = await githubJson(
    `/repos/${owner}/${repo}/issues/${issueNumber}/comments?per_page=100`,
    { token },
  );
  const existing = Array.isArray(comments)
    ? comments.find((c) => typeof c.body === "string" && c.body.startsWith(MARKER))
    : null;
  if (existing) {
    await githubJson(`/repos/${owner}/${repo}/issues/comments/${existing.id}`, {
      method: "PATCH",
      body: { body },
      token,
    });
    return "updated";
  }
  await githubJson(`/repos/${owner}/${repo}/issues/${issueNumber}/comments`, {
    method: "POST",
    body: { body },
    token,
  });
  return "created";
}
