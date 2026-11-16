import type { Metadata } from "next";
import { PLAN_NAME, SHOP_NAME } from "@/lib/prices";
import DemoBanner from "../../components/demo-banner";
import CheckoutForm from "../../components/checkout-form";
import { pageMeta } from "@/lib/meta";

const CHECKOUT_DESCRIPTION = "The seeded checkout total on main is $29. LAUNCH10 does not change it. Pay is covered in Phone layout (390px). No real payment is taken.";

export const metadata: Metadata = {
  ...pageMeta(`Checkout — ${SHOP_NAME}`, CHECKOUT_DESCRIPTION, "/checkout"),
  title: { absolute: `Checkout — ${SHOP_NAME}` },
};

export default function CheckoutPage() {
  return (
    <main>
      <div className="shop-wrap shop-page shop-checkout">
        <div className="shop-identity"><p>Field &amp; Ledger</p><span>Demo store guarded by Receipt</span></div>
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
