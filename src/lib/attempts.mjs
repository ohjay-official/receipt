/**
 * Track the 3-try cap from commit subjects: "receipt-fix: N"
 */

export function countFixAttempts(gitLog) {
  let max = 0;
  if (!gitLog) return 0;
  for (const raw of String(gitLog).split(/\r?\n/)) {
    const line = raw.trim();
    const match = line.match(/^receipt-fix:\s*(\d+)\s*$/);
    if (match) {
      const n = Number(match[1]);
      if (Number.isFinite(n) && n > max) max = n;
    }
  }
  return max;
}

export function capReached(attempts, maxFixes = 3) {
  const max = Number(maxFixes);
  const cap = Number.isFinite(max) && max > 0 ? max : 3;
  return Number(attempts) >= cap;
}
