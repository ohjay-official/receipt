import assert from "node:assert/strict";
import test from "node:test";
import {
  CHECKOUT_PRO_USD,
  formatUsd,
  PRO_PLAN_USD,
} from "./prices.ts";

test("pricing page contract is $19", () => {
  assert.equal(PRO_PLAN_USD, 19);
  assert.equal(formatUsd(PRO_PLAN_USD), "$19");
});

test("checkout total must match the published Pro price", () => {
  assert.equal(
    CHECKOUT_PRO_USD,
    PRO_PLAN_USD,
    `Checkout is $${CHECKOUT_PRO_USD} but /pricing publishes $${PRO_PLAN_USD}. That mismatch is the seeded demo bug Receipt/Kane exist to catch.`,
  );
  assert.equal(formatUsd(CHECKOUT_PRO_USD), formatUsd(PRO_PLAN_USD));
});
