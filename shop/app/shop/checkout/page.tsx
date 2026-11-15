import type { Metadata } from "next";
import { PLAN_NAME, SHOP_NAME } from "@/lib/prices";
import DemoBanner from "../../components/demo-banner";
import CheckoutForm from "../../components/checkout-form";

export const metadata: Metadata = {
  title: { absolute: `Checkout — ${SHOP_NAME}` },
};

export default function CheckoutPage() {
  return (
    <main>
      <div className="shop-wrap shop-page shop-checkout">
        <div className="shop-band shop-band-short" style={{ backgroundImage: "url(https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/156ff74d-ee37-4443-8f3a-11ae2095ed4c.webp)" }} aria-hidden="true" />
        <DemoBanner />
        <p className="label">Checkout</p>
        <h1>Review your order</h1>
        <p className="lede">
          You chose {PLAN_NAME}. Confirm the amount, apply a coupon if you have
          one, and pay.
        </p>
        <article className="panel" aria-labelledby="order-summary">
          <h2 id="order-summary">Order summary</h2>
          <CheckoutForm />
        </article>
      </div>
    </main>
  );
}
