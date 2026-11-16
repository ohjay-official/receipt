import type { Metadata } from "next";
import Link from "next/link";
import { formatUsd, PLAN_NAME, PLAN_PERIOD, PRO_PLAN_USD, SHOP_NAME } from "@/lib/prices";
import DemoBanner from "../../components/demo-banner";

export const metadata: Metadata = {
  title: { absolute: `Cart — ${SHOP_NAME}` },
  description: "The demo cart. Choosing Pro continues to checkout. Nothing on this page is a real charge.",
};

export default function CartPage() {
  return (
    <main>
      <div className="shop-wrap shop-page">
        <div className="shop-identity"><p>Field &amp; Ledger</p><span>Demo store guarded by Receipt</span></div>
        <DemoBanner />
        <p className="label">Cart</p>
        <h1>Ready for checkout</h1>
        <p className="lede">
          The listed price is {formatUsd(PRO_PLAN_USD)}. Confirm the amount on the
          next page — that is the step Kane reads.
        </p>
        <article className="panel">
          <h2>In the cart</h2>
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
                <td>{formatUsd(PRO_PLAN_USD)}</td>
              </tr>
              <tr className="total-row">
                <th scope="row">Listed total</th>
                <td>
                  <strong className="price figure">{formatUsd(PRO_PLAN_USD)}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="actions">
            <Link className="btn" href="/checkout">
              Continue to checkout
            </Link>
            <Link className="btn btn-secondary" href="/shop/pricing">
              Back to plans
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
