"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { applyCoupon, COUPON_CODE, launch10TotalUsd, MOBILE_VIEWPORT_PX, NARROW_VIEWPORT_MAX_PX } from "@/lib/checkout";
import { CHECKOUT_PRO_USD, formatUsd, PRO_PLAN_USD } from "@/lib/prices";
import { Node, SectionHead } from "./rebuild/bits";

const SURFACES = [
  { id: "plans", label: "Plans page" },
  { id: "checkout", label: "Checkout" },
  { id: "coupon", label: "Coupon LAUNCH10" },
] as const;

export default function ShopCalculator() {
  const [surface, setSurface] = useState<(typeof SURFACES)[number]["id"]>("checkout");
  const [attempt, setAttempt] = useState(1);
  const [phone, setPhone] = useState(true);
  const [coupon, setCoupon] = useState(true);

  const expectedCoupon = launch10TotalUsd(PRO_PLAN_USD);
  const checkoutAfterCoupon = applyCoupon(COUPON_CODE, CHECKOUT_PRO_USD);
  const plans = formatUsd(PRO_PLAN_USD);
  const checkout = formatUsd(CHECKOUT_PRO_USD);
  const bar = Math.round((PRO_PLAN_USD / CHECKOUT_PRO_USD) * 100);

  const note = useMemo(() => {
    if (surface === "plans") return "The plans page is the contract number.";
    if (surface === "coupon") {
      return coupon
        ? `LAUNCH10 leaves the total at ${formatUsd(checkoutAfterCoupon)}. The contract wants $${expectedCoupon.toFixed(2)}.`
        : `The contract wants $${expectedCoupon.toFixed(2)}, 10% off ${plans}.`;
    }
    return phone
      ? `Pay is covered at ${MOBILE_VIEWPORT_PX}px and at ${NARROW_VIEWPORT_MAX_PX}px and below.`
      : "Wide desktop misses the overlay. Phone layout still hits it.";
  }, [surface, coupon, phone, checkoutAfterCoupon, expectedCoupon, plans]);

  return (
    <section className="rb-sec" id="calculator-section" aria-labelledby="calc-title">
      <div className="rb-wrap">
        <Node />
        <SectionHead
          id="calc-title"
          pill="Seeded shop"
          title={<>Read the real prices.<br />Then open the shop.</>}
          lead="Figures come from shop/lib. Production on main still has the bugs. Commit 186ecdc fixed them only on the pull request."
        />
        <div className="rb-calc-grid">
          <form className="rb-form" onSubmit={(event) => event.preventDefault()}>
            <section>
              <h3>Which page are you reading?</h3>
              {SURFACES.map((item) => (
                <button key={item.id} type="button" className="rb-choice" aria-pressed={surface === item.id} onClick={() => setSurface(item.id)}>
                  {item.label}
                </button>
              ))}
            </section>
            <section>
              <h3>Fix attempt {attempt} of 3</h3>
              <input className="rb-slider" type="range" min={1} max={3} step={1} value={attempt} aria-label="Fix attempt" onChange={(event) => setAttempt(Number(event.target.value))} />
              <p className="rb-hint">Attempt {attempt} of 3 reads the cap. The real fix on PR #3 was attempt 1, commit 186ecdc.</p>
            </section>
            <section>
              <h3>What else is seeded?</h3>
              <button type="button" className="rb-check" aria-pressed={phone} onClick={() => setPhone((value) => !value)}>
                Phone layout ({MOBILE_VIEWPORT_PX}px)
              </button>
              <button type="button" className="rb-check" aria-pressed={coupon} onClick={() => setCoupon((value) => !value)}>
                Apply {COUPON_CODE}
              </button>
            </section>
            <p className="rb-lead">{note} Pull request #3 fixed on attempt 1 of 3. This slider does not change main.</p>
          </form>
          <div className="rb-paper rb-receipt" aria-label="What the shop shows">
            <p className="rb-slip-k">What the shop shows</p>
            <h3>Seeded prices</h3>
            <ul className="rb-kv">
              <li className={surface === "plans" ? "is-hot" : undefined}><span>Plans page</span><span>{plans}</span></li>
              <li className={`is-bad${surface === "checkout" ? " is-hot" : ""}`}><span>Checkout</span><span>{checkout} · expected {plans}</span></li>
              <li className={`is-bad${surface === "coupon" ? " is-hot" : ""}`}>
                <span>{COUPON_CODE}</span>
                <span>{coupon ? "no-op" : "off"} · expected ${expectedCoupon.toFixed(2)}</span>
              </li>
              <li className="is-bad"><span>Pay @ {MOBILE_VIEWPORT_PX}px</span><span>{phone ? "blocked" : "overlay still seeded"}</span></li>
            </ul>
            <p className="rb-total"><span>Total due today</span><span>{coupon ? formatUsd(checkoutAfterCoupon) : checkout}</span></p>
            <p className="rb-stamp is-bad">BUGS LIVE ON MAIN</p>
            <div className="rb-bars" aria-hidden="true">
              <div><span>Plans {plans}</span><i style={{ width: `${bar}%` }} /></div>
              <div><span>Checkout {checkout}</span><i className="is-hot" style={{ width: "100%" }} /></div>
            </div>
            <div className="rb-actions">
              <Link className="rb-btn rb-btn-paper" href="/shop">Open the demo shop</Link>
              <Link className="rb-btn rb-btn-ink" href="/shop/checkout">Open checkout</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
