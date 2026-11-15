import type { Metadata } from "next";
import Link from "next/link";
import ReceiptSlip from "./components/receipt-slip";
import { PR3, SITE_NAME, TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} — ${TAGLINE}` },
};

export default function HomePage() {
  return (
    <main>
      <div className="wrap">
        <section className="home-hero">
          <div>
            <h1 className="hero-title">Don&apos;t merge a preview without a Receipt</h1>
            <p className="lede">
              Kane opens the Vercel preview in a real browser, checks the How-to-test
              contract in the README, and leaves a receipt on the pull request. If the
              preview is lying, a fixer may patch the shop only.
            </p>
            <div className="actions">
              <Link className="btn" href="/proof">
                See the proof
              </Link>
              <Link className="btn btn-secondary" href="/shop">
                Open the demo shop
              </Link>
            </div>
          </div>
          <ReceiptSlip footnote={`receipt-fix: 1 · ${PR3.fixSha} · shop files only`} />
        </section>

        <section className="section" aria-labelledby="branches">
          <p className="label">The site</p>
          <h2 id="branches">Four places to start</h2>
          <div className="path-grid">
            <Link className="path-card" href="/how-it-works">
              <h2>How it works</h2>
              <p>Kane on the preview, a bug verdict, an allowlisted fixer, a redeploy, then a receipt card.</p>
            </Link>
            <Link className="path-card" href="/docs">
              <h2>Docs</h2>
              <p>Install, the How-to-test contract, configuration, guardrails, and the honest limits.</p>
            </Link>
            <Link className="path-card" href="/proof">
              <h2>Proof</h2>
              <p>Live runs from pull requests #3 and #4, with evidence packs and the refused cheat.</p>
            </Link>
            <Link className="path-card" href="/shop">
              <h2>Demo shop</h2>
              <p>Field &amp; Ledger, the fixture app Receipt guards. Production still carries the seeded bugs.</p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
