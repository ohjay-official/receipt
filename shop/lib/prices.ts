/** Pro is advertised at $19. Checkout is seeded at $29 — that mismatch is the demo bug. */
export const PRO_PLAN_USD = 19;
export const CHECKOUT_PRO_USD = 29;

export const SHOP_NAME = "Field & Ledger";
export const PLAN_NAME = "Pro";
export const PLAN_PERIOD = "month";

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}
