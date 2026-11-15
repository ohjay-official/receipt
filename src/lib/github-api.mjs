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

export function rootCauseFromSteps(steps = [], excerpt = "") {
  const failed = (steps || []).filter((s) => s.status === "failed");
  if (failed.length) {
    const first = failed[0];
    const detail = String(first.detail || "").split(/\n/).filter(Boolean)[0] || "";
    const extra =
      failed.length > 1
        ? ` (+${failed.length - 1} more failed step${failed.length > 2 ? "s" : ""})`
        : "";
    return [`${first.heading}${extra}`, detail].filter(Boolean).join(" — ").slice(0, 400);
  }
  const line = String(excerpt || "")
    .split(/\n/)
    .map((s) => s.trim())
    .find(Boolean);
  return line ? line.slice(0, 400) : "";
}

export function buildCommentBody(fields) {
  const status = fields.status === "passed" || fields.exitClass === "pass" ? "passed" : "failed";
  const icon = status === "passed" ? "passed" : "failed";
  const fixerNote = String(fields.fixerNote || "").trim();
  const refused = /receipt refused fix/i.test(fixerNote);
  const lines = [
    MARKER,
    `## Receipt: ${icon}`,
    "",
    fields.summary ? `> ${fields.summary}` : "> Kane ran on the preview against the How-to-test contract.",
    "",
    "| | |",
    "| --- | --- |",
    `| Start URL | ${fields.previewUrl || "(unknown)"} |`,
    `| Kane | \`${fields.exitClass || "unknown"}\`${fields.kaneExit != null && fields.kaneExit !== "" ? ` (code ${fields.kaneExit})` : ""} |`,
    `| Attempts | ${fields.attempts ?? 0} / ${fields.maxFixes ?? 3} |`,
  ];
  if (fields.evidenceUrl) {
    lines.push(
      `| Evidence | [Open the evidence pack](${fields.evidenceUrl}) (artifact \`${fields.evidenceArtifactName || "receipt-evidence"}\`, 30 days) |`,
    );
  } else if (fields.evidenceHint) {
    lines.push(`| Evidence | artifact \`${fields.evidenceHint}\` on this Actions run, kept 30 days |`);
  }
  if (fields.usedFallback) {
    lines.push("| Note | The preview was not ready; Kane used the production fallback URL. |");
  }
  const steps = Array.isArray(fields.steps) ? fields.steps : [];
  if (steps.length) {
    lines.push("", "### What Kane saw");
    for (const step of steps) {
      const mark =
        step.status === "passed" ? "passed" : step.status === "skipped" ? "skipped" : "failed";
      lines.push(`- **${mark}** — ${step.heading}`);
    }
  }
  const cause = fields.rootCause || rootCauseFromSteps(steps, fields.excerpt);
  if (cause && status !== "passed") {
    lines.push("", "### Root cause", "", cause);
  }
  if (fixerNote) {
    lines.push("", refused ? "### Fix refused" : "### Fix", "", fixerNote);
    if (fields.fixerFiles) {
      lines.push("", `Files changed: \`${fields.fixerFiles}\``);
    }
  } else if (fields.fixerFiles) {
    lines.push("", "### Fix", "", `Files changed: \`${fields.fixerFiles}\``);
  }
  if (fields.evidenceUrl) {
    lines.push(
      "",
      "Screenshots, if Kane captured any, live in the evidence pack. Kane does not publish stable per-image URLs.",
    );
  }
  if (!steps.length && fields.excerpt) {
    lines.push("", "### Result.md excerpt", "", "```markdown", fields.excerpt.trim(), "```");
  }
  lines.push(
    "",
    "The README How-to-test block is the contract. A fixer may only edit `shop/**` application source — not tests, the contract, or workflows.",
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
