import assert from "node:assert/strict";
import test from "node:test";
import {
  assertAllowlisted,
  isAllowlisted,
  normalizeRepoPath,
} from "../../src/lib/path-guard.mjs";

test("allows files under shop/**", () => {
  assert.equal(isAllowlisted("shop/lib/prices.ts"), true);
  assert.equal(isAllowlisted("shop/app/checkout/page.tsx"), true);
  assert.equal(isAllowlisted("./shop/app/pricing/page.tsx"), true);
});

test("rejects the README contract, workflows, tests, and the action", () => {
  assert.equal(isAllowlisted("README.md"), false);
  assert.equal(isAllowlisted(".github/workflows/receipt.yml"), false);
  assert.equal(isAllowlisted(".github/workflows/ci.yml"), false);
  assert.equal(isAllowlisted("tests/checkout_test.md"), false);
  assert.equal(isAllowlisted("tests/output-checkout/Result.md"), false);
  assert.equal(isAllowlisted("action.yml"), false);
  assert.equal(isAllowlisted("src/lib/path-guard.mjs"), false);
  assert.equal(isAllowlisted("docs/spec.md"), false);
});

test("rejects path traversal that would escape shop/**", () => {
  assert.throws(() => normalizeRepoPath("shop/../../README.md"), /escapes/);
  assert.throws(
    () => assertAllowlisted(["shop/../README.md"]),
    /rejected/,
  );
  assert.throws(() => assertAllowlisted(["/etc/passwd"]), /rejected/);
});

test("rejects a mixed patch if any path is outside the allowlist", () => {
  assert.throws(
    () =>
      assertAllowlisted([
        "shop/lib/prices.ts",
        "README.md",
        ".github/workflows/receipt.yml",
      ]),
    (err) => {
      assert.match(err.message, /README\.md/);
      assert.match(err.message, /\.github\/workflows\/receipt\.yml/);
      return true;
    },
  );
});

test("assertAllowlisted accepts a clean shop-only patch", () => {
  assert.doesNotThrow(() =>
    assertAllowlisted(["shop/lib/prices.ts", "shop/app/checkout/page.tsx"]),
  );
});

test("rejects shop unit tests even though they sit under shop/**", () => {
  assert.equal(isAllowlisted("shop/lib/prices.test.ts"), false);
  assert.equal(isAllowlisted("shop/lib/checkout.test.ts"), false);
  assert.throws(() => assertAllowlisted(["shop/lib/prices.test.ts"]), /rejected/);
});
