/**
 * Read Kane Result.md, classify the exit, extract the How-to-test contract.
 */

import fs from "node:fs";
import path from "node:path";

export function resultMdPathFromTestFile(testFile) {
  const rel = testFile.replace(/\\/g, "/");
  const base = path.posix.basename(rel);
  if (!base.endsWith("_test.md")) {
    return path.posix.join(path.posix.dirname(rel), "output-unknown", "Result.md");
  }
  const name = base.slice(0, -"_test.md".length);
  return path.posix.join(path.posix.dirname(rel), `output-${name}`, "Result.md");
}

export function parseResultMd(text) {
  if (!text) return null;
  const result = {
    raw: text,
    status: null,
    test: null,
    session_id: null,
    duration_s: null,
    failedSteps: [],
    passedSteps: [],
  };
  const fm = text.match(/^---\n([\s\S]*?)\n---/);
  if (fm) {
    for (const line of fm[1].split(/\r?\n/)) {
      const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
      if (!m) continue;
      const key = m[1];
      const val = m[2].trim();
      if (key === "status") result.status = val;
      if (key === "test") result.test = val;
      if (key === "session_id") result.session_id = val;
      if (key === "duration_s") result.duration_s = Number(val);
    }
  }
  // Split on H2 headings so a failed step's body (including a "Reason:"
  // line after an md5 line) is not truncated by a multiline `$` match.
  const parts = text.split(/^##\s+/m).slice(1);
  for (const part of parts) {
    const match = part.match(/^(.+?)\s+(✓|✗|⏭)\s+(passed|failed|skipped)\b([^\n]*)\n?([\s\S]*)$/);
    if (!match) continue;
    const meta = match[4].trim();
    const body = (match[5] || "").trim();
    const step = {
      heading: match[1].trim(),
      icon: match[2],
      status: match[3],
      detail: [meta, body].filter(Boolean).join("\n"),
    };
    if (step.status === "failed") result.failedSteps.push(step);
    if (step.status === "passed") result.passedSteps.push(step);
  }
  return result;
}

export function extractHowToTest(readme) {
  if (!readme) return "";
  const start = "<!-- kane:how-to-test -->";
  const end = "<!-- /kane:how-to-test -->";
  const a = readme.indexOf(start);
  const b = readme.indexOf(end);
  if (a === -1 || b === -1 || b <= a) return "";
  return readme.slice(a + start.length, b).trim();
}

export function parseNdjsonOneLiner(ndjson) {
  if (!ndjson) return null;
  let oneLiner = null;
  let sawTerminal = false;
  for (const line of String(ndjson).split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("{")) continue;
    try {
      const ev = JSON.parse(trimmed);
      if (ev?.type === "run_end") {
        oneLiner = ev.one_liner || ev.summary || ev.reason || oneLiner;
        sawTerminal = true;
      }
      if (ev?.type === "test_md_done") {
        oneLiner = ev.one_liner || ev.summary || ev.overall_status || oneLiner;
        sawTerminal = true;
      }
    } catch {
      // skip non-JSON chatter
    }
  }
  return { oneLiner, sawTerminal };
}

export function classifyKaneExit(args = {}) {
  const processExit =
    args.processExit === undefined || args.processExit === null || args.processExit === ""
      ? undefined
      : Number(args.processExit);
  const resultMd = args.resultMd ?? null;
  const stderrLog = args.stderrLog ?? "";
  const ndjson = args.ndjson ?? "";
  const officialStatus = args.officialStatus;

  // Kane 0.10+ exits 0 when a _test.md has no H2 steps. That is not a verified pass.
  if (/no steps/i.test(stderrLog)) return "setup";

  const parsed = resultMd ? parseResultMd(resultMd) : null;
  const terminal = parseNdjsonOneLiner(ndjson);
  const hasPassedEvidence =
    (parsed?.status === "passed" && parsed.failedSteps.length === 0) ||
    (terminal?.sawTerminal && /\bpassed\b/i.test(terminal.oneLiner || "") && parsed?.failedSteps.length === 0);

  if (processExit === 2) return "setup";
  if (processExit === 3) return "timeout";
  if (processExit === 1) return "fail";
  if (parsed?.status === "failed" || (parsed && parsed.failedSteps.length > 0)) return "fail";
  if (processExit === 0) return hasPassedEvidence ? "pass" : "setup";
  if (officialStatus === "passed") return hasPassedEvidence ? "pass" : "setup";
  if (hasPassedEvidence) return "pass";

  if (/timed?\s*out|timeout|cancelled/i.test(stderrLog) && !parsed) return "timeout";
  if (officialStatus === "failed" && parsed?.failedSteps.length) return "fail";
  if (!parsed && !terminal?.sawTerminal) return "setup";
  if (officialStatus === "failed") return "fail";
  return "unknown";
}

export function readKaneInbox(workspace, testFile = "tests/checkout_test.md") {
  const resultRel = resultMdPathFromTestFile(testFile);
  const resultPath = path.join(workspace, resultRel);
  const streamPath = path.join(workspace, "kane-out", "stream.ndjson");
  const stderrPath = path.join(workspace, "kane-out", "stderr.log");
  const resultMd = fs.existsSync(resultPath) ? fs.readFileSync(resultPath, "utf8") : null;
  const ndjson = fs.existsSync(streamPath) ? fs.readFileSync(streamPath, "utf8") : null;
  const stderrLog = fs.existsSync(stderrPath) ? fs.readFileSync(stderrPath, "utf8") : null;
  const oneLiner = parseNdjsonOneLiner(ndjson || "")?.oneLiner || null;
  return {
    resultMd,
    resultPath: resultMd ? resultRel : null,
    oneLiner,
    stderrLog,
    ndjson,
    evidencePathGlobs: [".testmuai/evidence/", resultRel, "kane-out/"],
    parsed: resultMd ? parseResultMd(resultMd) : null,
  };
}
