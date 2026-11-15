import type { Metadata } from "next";
import Link from "next/link";
import {
  CHECKOUT_PRO_USD,
  formatUsd,
  PLAN_NAME,
  PLAN_PERIOD,
} from "@/lib/prices";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  const total = formatUsd(CHECKOUT_PRO_USD);

  return (
    <main>
      <section className="hero">
        <p className="kicker">Checkout</p>
        <h1>Review your order</h1>
        <p className="lede">
          You chose {PLAN_NAME}. Confirm the amount before placing the order.
        </p>
      </section>
      <article className="panel" aria-labelledby="order-summary">
        <h2 id="order-summary">Order summary</h2>
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
              <td>{total}</td>
            </tr>
            <tr className="total-row">
              <th scope="row">Total due today</th>
              <td>
                <strong className="price wrong" style={{ fontSize: "2rem" }}>
                  {total}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="note">
          No payment is collected in this demo. The amount on this page is what
          Kane will read.
        </p>
        <div className="actions">
          <button className="btn" type="button" disabled>
            Place order
          </button>
          <Link className="btn btn-secondary" href="/pricing">
            Back to plans
          </Link>
        </div>
      </article>
    </main>
  );
}
