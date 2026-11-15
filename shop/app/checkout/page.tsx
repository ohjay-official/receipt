import type { Metadata } from "next";
import { PLAN_NAME } from "@/lib/prices";
import CheckoutForm from "./checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
};

/** Proof PR #3: trivial shop-only change so Vercel builds a preview that still has all three seeded bugs. Do not merge. */
export default function CheckoutPage() {
  return (
    <main>
      <section className="hero">
        <p className="kicker">Checkout</p>
        <h1>Review your order</h1>
        <p className="lede">
          You chose {PLAN_NAME}. Confirm the amount, apply a coupon if you have
          one, and pay.
        </p>
      </section>
      <article className="panel" aria-labelledby="order-summary">
        <h2 id="order-summary">Order summary</h2>
        <CheckoutForm />
      </article>
    </main>
  );
}
