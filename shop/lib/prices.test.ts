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

test("checkout is seeded at $29 — the demo bug Kane must catch", () => {
  assert.equal(CHECKOUT_PRO_USD, 29);
  assert.equal(formatUsd(CHECKOUT_PRO_USD), "$29");
  assert.notEqual(CHECKOUT_PRO_USD, PRO_PLAN_USD);
});
