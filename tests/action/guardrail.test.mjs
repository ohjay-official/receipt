import assert from "node:assert/strict";
import test from "node:test";
import {
  detectWeakening,
  isDemoCheatEnabled,
  isForbiddenPath,
  proposeCheatFix,
  refusalMessage,
  validateFixProposal,
} from "../../src/lib/guardrail.mjs";

test("isForbiddenPath allows shop source and rejects tests, README, and the action", () => {
  assert.equal(isForbiddenPath("shop/lib/prices.ts"), false);
  assert.equal(isForbiddenPath("shop/app/checkout/page.tsx"), false);
  assert.equal(isForbiddenPath("shop/lib/prices.test.ts"), true);
  assert.equal(isForbiddenPath("tests/checkout_test.md"), true);
  assert.equal(isForbiddenPath("README.md"), true);
  assert.equal(isForbiddenPath(".github/workflows/receipt.yml"), true);
  assert.equal(isForbiddenPath("src/fixer.mjs"), true);
  assert.equal(isForbiddenPath("action.yml"), true);
});

test("validateFixProposal accepts a shop-only price fix", () => {
  const result = validateFixProposal({
    files: { "shop/lib/prices.ts": "export const CHECKOUT_PRO_USD = 19;\nexport const PRO_PLAN_USD = 19;\n" },
    existing: { "shop/lib/prices.ts": "export const CHECKOUT_PRO_USD = 29;\nexport const PRO_PLAN_USD = 19;\n" },
  });
  assert.equal(result.ok, true);
});

test("validateFixProposal refuses a patch that touches the Kane test", () => {
  assert.throws(
    () =>
      validateFixProposal({
        files: {
          "shop/lib/prices.ts": "export const CHECKOUT_PRO_USD = 19;\n",
          "tests/checkout_test.md": "## Checkout may show $29\n",
        },
      }),
    (err) => {
      assert.match(err.message, /Receipt refused fix: touched tests\/checkout_test\.md/);
      assert.ok(err.rejected.includes("tests/checkout_test.md"));
      return true;
    },
  );
});

test("validateFixProposal refuses deleting test steps or changing the advertised price", () => {
  assert.throws(
    () =>
      validateFixProposal({
        files: {
          "tests/checkout_test.md": "## Only one step left\nDo not fail.\n",
        },
        existing: {
          "tests/checkout_test.md": "## One\n\n## Two\n\n## Three\n",
        },
      }),
    /refused fix/,
  );
  assert.throws(
    () =>
      validateFixProposal({
        files: {
          "shop/lib/prices.ts": "export const PRO_PLAN_USD = 29;\nexport const CHECKOUT_PRO_USD = 29;\n",
        },
        existing: {
          "shop/lib/prices.ts": "export const PRO_PLAN_USD = 19;\nexport const CHECKOUT_PRO_USD = 29;\n",
        },
      }),
    /advertised Pro price/,
  );
});

test("proposeCheatFix is a weakening patch the guardrail refuses", () => {
  const cheat = proposeCheatFix();
  assert.equal(Boolean(cheat.files["tests/checkout_test.md"]), true);
  assert.throws(
    () => validateFixProposal({ files: cheat.files }),
    /Receipt refused fix: touched tests\/checkout_test\.md/,
  );
  assert.equal(isDemoCheatEnabled({ RECEIPT_DEMO_CHEAT: "1" }), true);
  assert.equal(isDemoCheatEnabled({ RECEIPT_DEMO_CHEAT: "0", GITHUB_HEAD_REF: "demo/cheat-refusal" }), false);
  assert.equal(isDemoCheatEnabled({ GITHUB_HEAD_REF: "demo/cheat-refusal" }), false);
  assert.equal(isDemoCheatEnabled({ RECEIPT_DEMO_CHEAT: "0", GITHUB_HEAD_REF: "demo/t3-three-bugs" }), false);
  assert.equal(refusalMessage(["tests/checkout_test.md"]), "Receipt refused fix: touched tests/checkout_test.md");
});

test("detectWeakening is quiet for a clean shop coupon fix", () => {
  const reasons = detectWeakening({
    path: "shop/lib/checkout.ts",
    before: "export function applyCoupon(code, price, fee = 0) { return price - fee * 0.1; }",
    after: "export function applyCoupon(code, price) { return Math.round(price * 90) / 100; }",
  });
  assert.deepEqual(reasons, []);
});
