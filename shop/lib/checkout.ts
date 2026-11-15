/**
 * Checkout helpers. Two more seeded bugs live here, on top of the $29
 * checkout price in prices.ts:
 *
 * 1. LAUNCH10 should take 10% off the Pro price ($19 → $17.10) but is
 *    applied to a $0 handling fee, so the total does not move.
 * 2. At a 390px mobile viewport the Pay button is covered by an overlay.
 */
export const COUPON_CODE = "LAUNCH10";
export const COUPON_PERCENT = 10;
export const MOBILE_VIEWPORT_PX = 390;
/** Overlay also applies up to this width so Kane's 800px minimum window still hits the bug. */
export const NARROW_VIEWPORT_MAX_PX = 900;

/** Correct discounted total for the advertised Pro price. */
export function launch10TotalUsd(proPrice: number): number {
  return Math.round(proPrice * (100 - COUPON_PERCENT)) / 100;
}

export function normalizeCoupon(code: string): string {
  return String(code || "")
    .trim()
    .replace(/\s+/g, "")
    .toUpperCase();
}

/**
 * Apply a checkout coupon. The seeded bug takes 10% off `handlingFeeUsd`
 * (default $0) instead of the Pro line, so a valid LAUNCH10 code leaves
 * the total unchanged.
 */
export function applyCoupon(
  code: string,
  proPrice: number,
  handlingFeeUsd = 0,
): number {
  if (normalizeCoupon(code) !== COUPON_CODE) return proPrice;
  return proPrice - proPrice * (COUPON_PERCENT / 100);
}

/**
 * Seeded mobile bug flag. When true, checkout renders a fixed overlay
 * that covers Pay at max-width: 900px (a 390px phone and Kane's 800px
 * minimum window). Wide desktop viewports are unaffected.
 */
export const SEED_BLOCK_PAY_ON_MOBILE = false;

export function payButtonBlocked(viewportWidth: number, phoneLayout = false): boolean {
  return SEED_BLOCK_PAY_ON_MOBILE && (phoneLayout || viewportWidth <= NARROW_VIEWPORT_MAX_PX);
}
