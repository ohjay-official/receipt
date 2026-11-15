import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "The contract" };

export default function ContractPage() {
  return (
    <article className="prose">
      <p className="label">Docs</p>
      <h1>The How-to-test contract</h1>
      <p>
        The tagged block in the README is what Kane must prove. The committed test
        at <code>tests/receipt_checkout_test.md</code> uses the same five required
        steps, as <code>##</code> headings (Kane 0.10 treats a file with no H2
        steps as a pass, which Receipt classifies as setup, not green).
      </p>
      <ol>
        <li>Open the preview (or live) site’s <code>/pricing</code> page and confirm the Pro plan is $19.</li>
        <li>Choose Pro and continue to checkout (<code>/checkout</code>).</li>
        <li>Checkout must show $19 for Pro, not any other amount.</li>
        <li>Enter coupon code LAUNCH10 and apply it. The Pro total must become $17.10 (10% off $19).</li>
        <li>Click Phone layout (390px), then click Pay. A confirmation such as “Payment accepted” must appear.</li>
      </ol>
      <p>
        <code>/pricing</code> and <code>/checkout</code> stay as aliases of the
        demo shop routes so this contract does not depend on a rename.
      </p>
      <p>
        <Link href="/shop/pricing">Open the demo plans page</Link>
        {" · "}
        <Link href="/docs/limitations">Limitations</Link>
      </p>
    </article>
  );
}
