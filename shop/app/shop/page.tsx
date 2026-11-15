import type { Metadata } from "next";
import Link from "next/link";
import { formatUsd, PLAN_NAME, PLAN_PERIOD, PRO_PLAN_USD, SHOP_NAME } from "@/lib/prices";
import DemoBanner from "../components/demo-banner";

export const metadata: Metadata = {
  title: { absolute: `${SHOP_NAME} — Demo shop` },
};

export default function ShopCatalogPage() {
  return (
    <main>
      <div className="shop-wrap shop-page">
        <DemoBanner />
        <p className="label">{SHOP_NAME}</p>
        <h1>A small press shop</h1>
        <p className="lede">
          Field &amp; Ledger supplies cloth, type, and membership to small presses. The Pro membership is listed at{" "}
          {formatUsd(PRO_PLAN_USD)} a month. That published number is the contract.
          Checkout is where the seeded bugs live.
        </p>
        <div className="catalog">
          <article className="featured">
            <h2>{PLAN_NAME} membership</h2>
            <p className="price">
              {formatUsd(PRO_PLAN_USD)}
              <span>/{PLAN_PERIOD}</span>
            </p>
            <p>Priority restock, trade pricing on folio cartons, and a named contact for press-day shortages.</p>
            <Link className="btn" href="/shop/pricing">
              View the plan
            </Link>
          </article>
          <article>
            <h2>Bookcloth restock</h2>
            <p>Cloth and type reserved for members. This demo charges through the Pro plan, not a separate line.</p>
            <Link className="btn btn-secondary" href="/shop/pricing">
              See membership
            </Link>
          </article>
          <article>
            <h2>Folio cartons</h2>
            <p>Monthly trade pricing is part of Pro. Open plans, then checkout, and read the amounts yourself.</p>
            <Link className="btn btn-secondary" href="/shop/cart">
              Open the cart
            </Link>
          </article>
        </div>
      </div>
    </main>
  );
}
