import Link from "next/link";
import { BELT } from "@/lib/site";
import InstallClient from "./install-client";

export function FeatureBands() {
  return (
    <>
      <section className="rx-band rx-band-tall" aria-labelledby="band-catch">
        <div className="rx-band-inner">
          <h2 id="band-catch">Catch a failing preview without the ceremony</h2>
          <p className="rx-lead">
            Connect the pull request. Receipt waits for Vercel, runs Kane, and leaves the card.{" "}
            <Link className="rx-more" href="/how-it-works">Learn more</Link>
          </p>
          <div className="rx-visual">
            <p className="rx-kicker">Pull request #3</p>
            <h3 style={{ margin: "8px 0 0", fontSize: 36 }}>Checkout showed $29</h3>
            <p className="rx-lead">Plans said $19. Kane failed that step. Coupon and Pay were skipped after it. The fix landed on attempt 1 of 3.</p>
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
        <div className="rx-band-inner">
          <h2 id="band-wait">Wait for the preview. Zero new tools.</h2>
          <p className="rx-lead">The action listens for the Vercel commit status, then remaps the recorded origin onto that preview.</p>
        </div>
      </section>
      <section className="rx-band rx-band-short" aria-labelledby="band-cap">
        <div className="rx-band-inner">
          <h2 id="band-cap">Three attempts, then the loop stops.</h2>
          <p className="rx-lead">A fixer may edit shop source only. The cap is three receipt-fix commits, then Kane&apos;s last result stands.</p>
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
        <div className="rx-steps">
          <article><h3>Catch</h3><p>Red run 43698574333 failed the $19 checkout step.</p></article>
          <article><h3>Fix</h3><p>186ecdc touched shop/lib/prices.ts and shop/lib/checkout.ts only.</p></article>
          <article><h3>Re-verify</h3><p>Green run 43699955024 passed all five steps.</p></article>
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
        <p className="rx-lead">Plans publish Pro at $19. Checkout on main charges $29.</p>
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
