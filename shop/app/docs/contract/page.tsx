import type { Metadata } from "next";
import Link from "next/link";
import { Crumb } from "../../components/rebuild/bits";
import DocsFrame from "../../components/rebuild/docs-frame";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta(
  "The contract",
  "The README How-to-test block has five required steps: Pro at $19, checkout at $19, LAUNCH10 to $17.10, and Pay after Phone layout (390px).",
);

export default function ContractPage() {
  return (
    <DocsFrame>
      <header className="rb-dochead">
        <Crumb items={[{ href: "/docs", label: "Docs" }, { href: "/docs/contract", label: "Contract" }]} />
        <p className="rb-pill">Contract</p>
        <h1 className="rb-h1">The How-to-test contract.</h1>
        <p className="rb-lead">The tagged block in the README is what Kane must prove. The committed test uses the same five required steps.</p>
        <div className="rb-doc-visual rb-readme">
          <pre>
            <mark>{"<!-- kane:how-to-test -->"}</mark>
            {"\n"}1. /pricing shows Pro at $19
            {"\n"}2. Choose Pro, open /checkout
            {"\n"}3. Checkout shows $19
            {"\n"}4. LAUNCH10 totals $17.10
            {"\n"}5. Phone layout (390px), then Pay
          </pre>
        </div>
      </header>
      <article className="prose rx-doc">
        <p>Kane 0.10 treats a file with no H2 steps as a pass, which Receipt classifies as setup, not green. The test file uses <code>##</code> headings.</p>
        <ol>
          <li>Open the preview (or live) site’s <code>/pricing</code> page and confirm the Pro plan is $19.</li>
          <li>Choose Pro and continue to checkout (<code>/checkout</code>).</li>
          <li>Checkout must show $19 for Pro, not any other amount.</li>
          <li>Enter coupon code LAUNCH10 and apply it. The Pro total must become $17.10 (10% off $19).</li>
          <li>Click Phone layout (390px), then click Pay. A confirmation such as “Payment accepted” must appear.</li>
        </ol>
        <p><code>/pricing</code> and <code>/checkout</code> stay as aliases of the demo shop routes so this contract does not depend on a rename.</p>
        <p>
          <Link href="/shop/pricing">Open the demo plans page</Link>
          {" · "}
          <Link href="/docs/limitations">Limitations</Link>
        </p>
      </article>
    </DocsFrame>
  );
}
