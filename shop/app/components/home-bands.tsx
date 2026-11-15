import Link from "next/link";
import { BELT } from "@/lib/site";
import InstallClient from "./install-client";

export function FeatureBands() {
  return (
    <>
      <section className="rx-band rx-band-tall" aria-labelledby="band-catch">
        <div className="rx-split">
          <div>
            <h2 id="band-catch">Catch a failing preview without the ceremony</h2>
            <p className="rx-lead">
              Connect the pull request. Receipt waits for Vercel, runs Kane, and leaves the card.{" "}
              <Link className="rx-more" href="/how-it-works">Learn more</Link>
            </p>
          </div>
          <div className="rx-panel">
            <p className="rx-kicker">Pull request #3</p>
            <h3 style={{ margin: "12px 0", fontSize: 48, fontWeight: 400 }}>Checkout showed $29</h3>
            <p className="rx-lead">Plans said $19. Kane failed that step on run 43698574333. Coupon and Pay were skipped after it.</p>
            <p className="rx-lead">receipt-fix: 1 landed in 186ecdc. The green run is 43699955024, attempt 1 of 3.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export function ShortBands() {
  return (
    <>
      <section className="rx-band rx-band-short" aria-labelledby="band-wait">
        <div className="rx-split">
          <div>
            <h2 id="band-wait">Wait for the preview. Zero new tools.</h2>
            <p className="rx-lead">The action listens for the Vercel commit status, then remaps the recorded origin onto that preview.</p>
          </div>
          <div className="rx-panel">
            <p className="rx-kicker">What it waits on</p>
            <p>Vercel commit status, not a deployment event.</p>
            <p>Recorded origins are rewritten onto that preview.</p>
            <p>Kane then reads the How-to-test contract.</p>
          </div>
        </div>
      </section>
      <section className="rx-band rx-band-short" aria-labelledby="band-cap">
        <div className="rx-split">
          <div>
            <h2 id="band-cap">Three attempts, then the loop stops.</h2>
            <p className="rx-lead">A fixer may edit shop source only. The cap is three receipt-fix commits, then Kane&apos;s last result stands.</p>
          </div>
          <div className="rx-panel">
            <p className="rx-kicker">Attempt cap</p>
            <p>1. Pull request #3 and #5 each fixed on attempt 1.</p>
            <p>2. Unused on those runs.</p>
            <p>3. The loop stops. Pull request #4 pushed nothing.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export function WorkflowBand() {
  return (
    <section className="rx-band rx-band-flow" aria-labelledby="band-flow">
      <div className="rx-band-inner">
        <h2 id="band-flow">Finally, a preview check that leaves a record.</h2>
        <p className="rx-lead">Kane runs the contract. A fenced patch may follow. The same test runs again. The pull request keeps the receipt.</p>
        <div className="rx-flow">
          <article><p className="rx-kicker">Catch</p><strong>$29</strong><p>Red run 43698574333 failed the $19 checkout step.</p></article>
          <article><p className="rx-kicker">Fix</p><strong>1/3</strong><p>186ecdc touched shop/lib/prices.ts and shop/lib/checkout.ts only.</p></article>
          <article><p className="rx-kicker">Re-verify</p><strong>5</strong><p>Green run 43699955024 passed all five steps.</p></article>
        </div>
        <ol className="rx-steps" style={{ marginTop: 16, listStyle: "none", padding: 0 }}>
          {BELT.map((card) => (
            <li key={card.id}><article><h3>{card.title}</h3><p>{card.verdict}. {card.attempts}. {card.commit}.</p></article></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function StatsBand() {
  return (
    <section className="rx-band rx-band-stats" aria-labelledby="band-stats">
      <div className="rx-band-inner">
        <h2 id="band-stats">Counts from this repo, not a ticker</h2>
        <p className="rx-lead">Action tests, the seeded shop, the attempt cap, and the proof pull requests that are still open.</p>
        <div className="rx-stats">
          <div><strong>49</strong><span>Action unit tests passing</span></div>
          <div><strong>3</strong><span>Seeded bugs kept on main</span></div>
          <div><strong>3</strong><span>Fix attempts, then stop</span></div>
          <div><strong>5</strong><span>Proof pull requests, unmerged</span></div>
        </div>
        <div className="rx-compare" aria-label="Published price against checkout">
          <div><span>Plans</span><i className="short" /><b>$19</b></div>
          <div><span>Checkout</span><i /><b>$29</b></div>
        </div>
        <p className="rx-lead">The bar lengths are those two amounts. Checkout on main is the longer one.</p>
      </div>
    </section>
  );
}

export function InstallBand() {
  return (
    <section className="rx-install" aria-labelledby="install-title">
      <InstallClient />
    </section>
  );
}
