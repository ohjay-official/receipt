import assert from "node:assert/strict";
import test from "node:test";
import { capReached, countFixAttempts } from "../../src/lib/attempts.mjs";

test("countFixAttempts returns 0 for empty or unrelated history", () => {
  assert.equal(countFixAttempts(""), 0);
  assert.equal(countFixAttempts("Initial commit\nAdd shop fixture\n"), 0);
  assert.equal(countFixAttempts("receipt fixer notes\nfix: typo"), 0);
});

test("countFixAttempts returns the highest receipt-fix N", () => {
  const log = [
    "receipt-fix: 1",
    "docs: tweak readme",
    "receipt-fix: 2",
    "receipt-fix: 2",
  ].join("\n");
  assert.equal(countFixAttempts(log), 2);
});

test("countFixAttempts ignores N that is not the whole subject", () => {
  assert.equal(countFixAttempts("wip receipt-fix: 9 extra"), 0);
  assert.equal(countFixAttempts("receipt-fix: 3"), 3);
});

test("capReached is true at 3 by default", () => {
  assert.equal(capReached(0), false);
  assert.equal(capReached(2), false);
  assert.equal(capReached(3), true);
  assert.equal(capReached(4), true);
  assert.equal(capReached(3, 3), true);
  assert.equal(capReached(1, 1), true);
});
