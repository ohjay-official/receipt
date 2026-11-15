import type { Metadata } from "next";
import Link from "next/link";
import { formatUsd, PLAN_NAME, PLAN_PERIOD, PRO_PLAN_USD } from "@/lib/prices";

export const metadata: Metadata = {
  title: "Plans",
};

export default function PricingPage() {
  return (
    <main>
      <section className="hero">
        <p className="kicker">Membership</p>
        <h1>Plans</h1>
        <p className="lede">
          One published price. Pro is {formatUsd(PRO_PLAN_USD)} per {PLAN_PERIOD}.
        </p>
      </section>
      <article className="panel" aria-labelledby="pro-plan">
        <p className="kicker">Most shops choose this</p>
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
    </main>
  );
}
