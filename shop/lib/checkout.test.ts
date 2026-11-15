import assert from "node:assert/strict";
import test from "node:test";
import { PRO_PLAN_USD } from "./prices.ts";
import {
  applyCoupon,
  COUPON_CODE,
  launch10TotalUsd,
  MOBILE_VIEWPORT_PX,
  NARROW_VIEWPORT_MAX_PX,
  payButtonBlocked,
  SEED_BLOCK_PAY_ON_MOBILE,
} from "./checkout.ts";

test("LAUNCH10 takes 10% off the advertised Pro price ($17.10)", () => {
  assert.equal(launch10TotalUsd(PRO_PLAN_USD), 17.1);
  assert.equal(
    applyCoupon(COUPON_CODE, PRO_PLAN_USD),
    launch10TotalUsd(PRO_PLAN_USD),
    `LAUNCH10 should turn $${PRO_PLAN_USD} into $17.10. A wrong-line or no-op discount is the seeded coupon bug.`,
  );
});

test("Pay must be clickable at a 390px mobile viewport", () => {
  assert.equal(
    payButtonBlocked(MOBILE_VIEWPORT_PX),
    false,
    `Pay is blocked at ${MOBILE_VIEWPORT_PX}px (SEED_BLOCK_PAY_ON_MOBILE=${SEED_BLOCK_PAY_ON_MOBILE}). That overlay is the seeded mobile bug.`,
  );
  assert.equal(
    payButtonBlocked(800),
    false,
    `Pay must also be clickable at Kane's 800px minimum window (overlay uses max-width: ${NARROW_VIEWPORT_MAX_PX}px).`,
  );
  assert.equal(payButtonBlocked(1280), false);
  assert.equal(
    payButtonBlocked(1280, true),
    false,
    "Phone-layout preview must not cover Pay after the seeded overlay is removed.",
  );
});
