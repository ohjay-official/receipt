import type { Metadata } from "next";
import Link from "next/link";
import { formatUsd, PRO_PLAN_USD, SHOP_NAME } from "@/lib/prices";

export const metadata: Metadata = {
  title: `${SHOP_NAME} — Press supplies`,
};

// Auto-trigger proof branch: leave the seeded $29 checkout unchanged.
export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <h1>Paper, ink, and a shop that should charge what it posted.</h1>
        <p className="lede">
          Field &amp; Ledger outfits small presses. The Pro plan is listed at{" "}
          {formatUsd(PRO_PLAN_USD)} a month. Open the plans page, then checkout,
          and read the amounts yourself.
        </p>
        <div className="actions">
          <Link className="btn" href="/pricing">
            See the Pro plan
          </Link>
          <Link className="btn btn-secondary" href="/checkout">
            Go to checkout
          </Link>
        </div>
      </section>
    </main>
  );
}
