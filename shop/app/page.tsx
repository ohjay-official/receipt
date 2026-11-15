import type { Metadata } from "next";
import Link from "next/link";
import BugPicker from "./components/bug-picker";
import HeroMedia from "./components/hero-media";
import InstallReceipt from "./components/install-receipt";
import ProofBelt from "./components/proof-belt";
import { PR3, SITE_NAME, TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME}. ${TAGLINE}` },
};

export default function HomePage() {
  return (
    <main>
      <section className="m-hero" aria-labelledby="hero-title">
        <HeroMedia />
        <div className="m-hero-shade" />
        <div className="wrap m-hero-copy">
          <h1 id="hero-title">Don&apos;t merge a preview without a Receipt</h1>
          <p className="lede">
            On a pull request, Receipt waits for the Vercel preview. Kane opens
            it in a real browser and checks the How-to-test contract in the
            README. If a step fails, a fixer may patch shop files only, then
            Kane runs again.
          </p>
          <div className="actions">
            <Link className="btn" href="/docs/install">
              Install
            </Link>
            <Link className="btn btn-secondary" href="#proof">
              See the proof
            </Link>
          </div>
        </div>
      </section>

      <section className="m-with" aria-label="Works with">
        <div className="wrap m-with-inner">
          <p className="m-with-label">Works with</p>
          <ul className="m-with-list">
            <li>GitHub Actions</li>
            <li>Vercel previews</li>
            <li>Kane CLI by TestMu AI</li>
            <li>Gemini</li>
          </ul>
        </div>
      </section>

      <section className="m-section" aria-labelledby="loop-title">
        <div className="wrap">
          <div className="m-section-head">
            <p className="label">How it works</p>
            <h2 id="loop-title">Catch, fix, re-verify</h2>
            <p className="lede">
              Three moves, and a cap of three fixer commits. The figures below
              are from pull request #3, still open.
            </p>
          </div>
          <div className="m-metrics">
            <Link className="m-metric" href="/proof">
              <p className="m-metric-figure stamp">$29</p>
              <h3>Catch</h3>
              <p>
                Kane failed “Checkout must show $19 for Pro.” The preview
                charged $29. Coupon and Pay were skipped after that first
                required failure.
              </p>
              <p className="m-metric-meta">Red run 43698574333</p>
            </Link>
            <Link className="m-metric" href={PR3.fixUrl}>
              <p className="m-metric-figure">1 / 3</p>
              <h3>Fix</h3>
              <p>
                Gemini patched shop/lib/prices.ts and shop/lib/checkout.ts
                only. Commit {PR3.fixSha}, tagged receipt-fix: 1.
              </p>
              <p className="m-metric-meta">shop files only</p>
            </Link>
            <Link className="m-metric" href={PR3.greenRun}>
              <p className="m-metric-figure pass">5</p>
              <h3>Re-verify</h3>
              <p>
                The same Kane test passed all five steps, including Pay in the
                phone layout.
              </p>
              <p className="m-metric-meta">Green run 43699955024</p>
            </Link>
          </div>
          <p className="m-quiet">
            Action unit tests: 49 passed. Shop contract tests stay red on main,
            on purpose, because the three seeded bugs are still there.
          </p>
        </div>
      </section>

      <section className="m-section m-proof" id="proof" aria-labelledby="proof-title">
        <div className="wrap">
          <div className="m-section-head">
            <p className="label">Proof</p>
            <h2 id="proof-title">The preview goes in. A receipt comes out.</h2>
            <p className="lede">
              Four open pull requests. Right of the line is the preview Kane
              saw. Left of the line is the receipt: verdict, attempts, commit.
            </p>
          </div>
        </div>
        <ProofBelt />
      </section>

      <section className="m-section" aria-labelledby="bugs-title">
        <div className="wrap">
          <div className="m-section-head">
            <p className="label">Demo shop</p>
            <h2 id="bugs-title">Three bugs, still on main</h2>
            <p className="lede">
              Field &amp; Ledger is the fixture. Production keeps the bugs so
              the contract still fails there. Pick one and read the run that
              touched it.
            </p>
          </div>
          <BugPicker />
        </div>
      </section>

      <section className="m-section" aria-labelledby="install-title">
        <div className="wrap">
          <InstallReceipt />
        </div>
      </section>

      <section className="m-limits">
        <div className="wrap">
          <p>
            Kane 0.10.4 replay ignores --url, so Receipt remaps recorded origins
            onto the preview. CI Chrome stays at 1920px, so the Pay check uses
            the in-page Phone layout control. The one-file install has not been
            verified on a second repo.{" "}
            <Link href="/docs/limitations">Read the limitations</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
