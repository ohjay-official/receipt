import type { Metadata } from "next";
import Link from "next/link";
import { formatUsd, PLAN_NAME, PLAN_PERIOD, PRO_PLAN_USD, SHOP_NAME } from "@/lib/prices";
import DemoBanner from "../../components/demo-banner";

export const metadata: Metadata = {
  title: { absolute: `Plans — ${SHOP_NAME}` },
};

export default function PricingPage() {
  return (
    <main>
      <div className="shop-wrap shop-page">
        <div className="shop-identity"><p>Field &amp; Ledger</p><span>Demo store guarded by Receipt</span></div>
        <DemoBanner />
        <p className="label">Membership</p>
        <h1>Plans</h1>
        <p className="lede">
          One published price. Pro is {formatUsd(PRO_PLAN_USD)} per {PLAN_PERIOD}.
        </p>
        <article className="panel" aria-labelledby="pro-plan">
          <h2 id="pro-plan">{PLAN_NAME}</h2>
          <p className="price">
            {formatUsd(PRO_PLAN_USD)}
            <span>/{PLAN_PERIOD}</span>
          </p>
          <ul className="list">
            <li>Priority restock on bookcloth, type, and ink</li>
            <li>Trade pricing on folio cartons once a month</li>
            <li>A named contact for press-day shortages</li>
          </ul>
          <Link className="btn" href="/checkout">
            Choose {PLAN_NAME}
          </Link>
        </article>
        <p className="note plan-note">
          The published price on this page is {formatUsd(PRO_PLAN_USD)}. Checkout
          is a separate page, and the total there can disagree.
        </p>
      </div>
    </main>
  );
}
