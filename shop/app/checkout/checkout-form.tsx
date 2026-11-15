"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  applyCoupon,
  COUPON_CODE,
  COUPON_PERCENT,
  normalizeCoupon,
  NARROW_VIEWPORT_MAX_PX,
  SEED_BLOCK_PAY_ON_MOBILE,
} from "@/lib/checkout";
import { CHECKOUT_PRO_USD, formatUsd, PLAN_NAME, PLAN_PERIOD } from "@/lib/prices";

function formatTotal(amount: number): string {
  if (Number.isNaN(amount)) return "NaN";
  const digits = Number.isInteger(amount) ? 0 : 2;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function CheckoutForm() {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState("");
  const [paid, setPaid] = useState(false);
  const [payError, setPayError] = useState("");

  const total = useMemo(() => {
    if (!applied) return CHECKOUT_PRO_USD;
    return applyCoupon(applied, CHECKOUT_PRO_USD);
  }, [applied]);

  const discount = CHECKOUT_PRO_USD - total;

  function onApply(event: React.FormEvent) {
    event.preventDefault();
    const next = normalizeCoupon(code);
    setPaid(false);
    setPayError("");
    setApplied(next);
  }

  function onPay() {
    setPayError("");
    if (SEED_BLOCK_PAY_ON_MOBILE && typeof window !== "undefined" && window.innerWidth <= NARROW_VIEWPORT_MAX_PX) {
      // Overlay should already intercept the click; this is a safety net
      // if the button still receives it at 390px.
      setPayError("Pay could not be reached.");
      return;
    }
    setPaid(true);
  }

  return (
    <>
      <table className="lines">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {PLAN_NAME} membership
              <div className="note">Billed every {PLAN_PERIOD}</div>
            </td>
            <td>{formatUsd(CHECKOUT_PRO_USD)}</td>
          </tr>
          <tr>
            <td>
              Handling fee
              <div className="note">No extra charge</div>
            </td>
            <td>{formatUsd(0)}</td>
          </tr>
          {applied ? (
            <tr>
              <td>
                Discount ({applied || COUPON_CODE})
                <div className="note">{COUPON_PERCENT}% off</div>
              </td>
              <td data-testid="coupon-discount">{discount === 0 ? formatUsd(0) : `−${formatTotal(discount)}`}</td>
            </tr>
          ) : null}
          <tr className="total-row">
            <th scope="row">Total due today</th>
            <td>
              <strong className="price wrong" style={{ fontSize: "2rem" }} data-testid="checkout-total">
                {formatTotal(total)}
              </strong>
            </td>
          </tr>
        </tbody>
      </table>

      <form className="coupon" onSubmit={onApply}>
        <label htmlFor="coupon-code">Coupon code</label>
        <div className="coupon-row">
          <input
            id="coupon-code"
            name="coupon"
            aria-label="Coupon code"
            placeholder={COUPON_CODE}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            autoComplete="off"
          />
          <button className="btn btn-secondary" type="submit">
            Apply
          </button>
        </div>
        <p className="note">
          {COUPON_CODE} should take {COUPON_PERCENT}% off the Pro price.
        </p>
      </form>

      <p className="note">
        No card is charged in this demo. The totals and the Pay button are what
        Kane will read.
      </p>

      <div className="actions checkout-actions">
        <button className="btn" type="button" onClick={onPay} data-testid="pay-button">
          Pay
        </button>
        <Link className="btn btn-secondary" href="/pricing">
          Back to plans
        </Link>
      </div>

      {paid ? (
        <p className="confirmation" role="status" data-testid="pay-confirmation">
          Payment accepted.
        </p>
      ) : null}
      {payError ? (
        <p className="note" role="status">
          {payError}
        </p>
      ) : null}

      {SEED_BLOCK_PAY_ON_MOBILE ? (
        <div className="pay-blocker" data-testid="pay-blocker">
          <p className="kicker">Chat</p>
          <p>Need help? Chat with us — we typically reply in a few minutes.</p>
        </div>
      ) : null}
    </>
  );
}
