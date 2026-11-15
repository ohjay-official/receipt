"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { applyCoupon, COUPON_CODE, launch10TotalUsd, MOBILE_VIEWPORT_PX, NARROW_VIEWPORT_MAX_PX } from "@/lib/checkout";
import { CHECKOUT_PRO_USD, formatUsd, PRO_PLAN_USD } from "@/lib/prices";

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

  const contractCoupon = launch10TotalUsd(PRO_PLAN_USD);
  const checkoutAfterCoupon = applyCoupon(COUPON_CODE, CHECKOUT_PRO_USD);

  const focus = useMemo(() => {
    if (surface === "plans") return { title: "Published Pro price", amount: formatUsd(PRO_PLAN_USD), note: "This is the number on /pricing." };
    if (surface === "coupon") {
      return {
        title: coupon ? "LAUNCH10 on checkout" : "Contract target for LAUNCH10",
        amount: coupon ? formatUsd(checkoutAfterCoupon) : `$${contractCoupon.toFixed(2)}`,
        note: coupon
          ? "The seeded coupon discounts a $0 handling fee, so the total does not move."
          : "The contract says 10% off $19, which is $17.10.",
      };
    }
    return {
      title: "Checkout total",
      amount: formatUsd(CHECKOUT_PRO_USD),
      note: phone
        ? `Pay is covered at ${MOBILE_VIEWPORT_PX}px and at ${NARROW_VIEWPORT_MAX_PX}px and below.`
        : "Wide desktop does not hit the pay overlay. Phone layout still does.",
    };
  }, [surface, coupon, phone, checkoutAfterCoupon, contractCoupon]);

  return (
    <section className="rx-calc" id="calculator-section" aria-labelledby="calc-title">
      <div className="rx-calc-head">
        <p>Try the seeded shop</p>
        <h2 id="calc-title">Read the real prices, then open the shop</h2>
      </div>
      <div className="rx-calc-grid">
        <form className="rx-calc-form" onSubmit={(event) => event.preventDefault()}>
          <section>
            <h3>Which page are you reading?</h3>
            {SURFACES.map((item) => (
              <button key={item.id} type="button" className="rx-choice" aria-pressed={surface === item.id} onClick={() => setSurface(item.id)}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                  <span className="rx-radio"><i /></span>
                  {item.label}
                </span>
              </button>
            ))}
          </section>
          <section>
            <h3>Fix attempt <span style={{ color: "white" }}>{attempt}</span> of 3</h3>
            <input className="rx-slider" type="range" min={1} max={3} step={1} value={attempt} aria-label="Fix attempt" onChange={(event) => setAttempt(Number(event.target.value))} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, opacity: 0.7 }}>
              <span>1</span><span>3</span>
            </div>
          </section>
          <section>
            <h3>What else is seeded?</h3>
            <button type="button" className="rx-check" aria-pressed={phone} onClick={() => setPhone((v) => !v)}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                <span className="rx-box"><i /></span>
                Phone layout ({MOBILE_VIEWPORT_PX}px)
              </span>
            </button>
            <button type="button" className="rx-check" aria-pressed={coupon} onClick={() => setCoupon((v) => !v)}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                <span className="rx-box"><i /></span>
                Apply {COUPON_CODE}
              </span>
            </button>
          </section>
          <section>
            <h3>Pull request #3 fixed on attempt {attempt === 1 ? "1" : attempt} of 3</h3>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.72)", fontSize: 14, lineHeight: "22px" }}>
              Commit 186ecdc changed shop/lib/prices.ts and shop/lib/checkout.ts only. Production on main still has the bugs.
            </p>
          </section>
        </form>
        <div className="rx-calc-side">
          <h3 style={{ marginTop: 0, fontWeight: 500 }}>What the shop shows</h3>
          <p style={{ color: "rgba(255,255,255,0.72)" }}>Figures come from shop/lib. Nothing here is estimated.</p>
          <article className="rx-price-card">
            <div>Plans page</div>
            <strong>{formatUsd(PRO_PLAN_USD)}</strong>
            <div>Pro, per month. The contract number.</div>
          </article>
          <article className="rx-price-card">
            <div>Checkout</div>
            <strong>{formatUsd(CHECKOUT_PRO_USD)}</strong>
            <div>The seeded total. It does not match the plans page.</div>
          </article>
          <article className="rx-price-card hot">
            <div>{focus.title}</div>
            <strong>{focus.amount}</strong>
            <div>{focus.note}</div>
          </article>
          <div className="rx-pills" style={{ justifyContent: "flex-start", marginTop: 20 }}>
            <Link className="rx-pill rx-pill-ink" href="/shop" style={{ background: "white", color: "#202A36" }}>Open the demo shop</Link>
            <Link className="rx-pill rx-pill-ghost" href="/shop/checkout">Open checkout</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
