import Link from "next/link";
import { BELT, KANE_STEPS_GREEN, PR3 } from "@/lib/site";
import InstallClient from "./install-client";
import ReceiptSlip from "./receipt-slip";

export function FeatureBands() {
  const timeline = [
    "Vercel preview ready",
    "Kane run failed: checkout showed $29",
    "receipt-fix: 1 (186ecdc)",
    "Kane run passed",
  ];
  return (
    <section className="rx-band" aria-labelledby="band-catch">
      <div className="rx-container">
        <p className="rx-kicker">The loop</p>
        <h2 id="band-catch">Catch a failing preview without the ceremony</h2>
        <p className="rx-lead">Connect the pull request. Receipt waits for Vercel, runs Kane, and leaves the card. <Link href="/how-it-works">Learn more</Link></p>
        <div className="rx-frame">
          <div className="rx-frame-bar"><i /><i /><i /><span>github.com/ohjay-official/receipt/pull/3</span></div>
          <div className="rx-frame-body">
            <ol className="rx-timeline">
              {timeline.map((line) => <li key={line}>{line}</li>)}
            </ol>
            <ReceiptSlip
              title="Pull request #3"
              attempts={PR3.attempts}
              steps={KANE_STEPS_GREEN}
              href={PR3.url}
              footnote="Red run 43698574333 · green run 43699955024"
            />
          </div>
        </div>
        <div className="rx-icon-row">
          <article><h3>Waits for the preview</h3><p>The Vercel commit status, then the preview URL.</p></article>
          <article><h3>Runs your README contract</h3><p>The tagged How-to-test block, five required steps.</p></article>
          <article><h3>Leaves a receipt on the PR</h3><p>Verdict, attempts, and the evidence pack.</p></article>
        </div>
      </div>
    </section>
  );
}

export function ShortBands() {
  const log = [
    "vercel ▸ commit status: success",
    "receipt ▸ preview https://receipt-git-…vercel.app",
    "receipt ▸ remap origin → preview",
    "kane ▸ reading <!-- kane:how-to-test -->",
    "kane ▸ step 3 failed: checkout showed $29",
  ];
  return (
    <>
      <section className="rx-band" aria-labelledby="band-wait">
        <div className="rx-container rx-pair">
          <div>
            <p className="rx-kicker">Preview</p>
            <h2 id="band-wait">Wait for the preview. Zero new tools.</h2>
            <p className="rx-lead">The action listens for the Vercel commit status, then remaps the recorded origin onto that preview.</p>
          </div>
          <div className="rx-frame rx-frame-ink">
            <div className="rx-frame-bar"><i /><i /><i /><span>receipt.log</span></div>
            <pre className="rx-log">{log.map((line) => <span key={line} className={line.includes("failed") ? "is-fail" : undefined}>{line}{"\n"}</span>)}</pre>
          </div>
        </div>
      </section>
      <section className="rx-band" aria-labelledby="band-cap">
        <div className="rx-container rx-pair rx-pair-flip">
          <div className="rx-meter" aria-label="Attempt slots">
            <div className="is-used"><b>186ecdc</b><span>used</span></div>
            <div><b>unused</b><span>attempt 2</span></div>
            <div><b>cap</b><span>attempt 3</span></div>
            <p>PR #4 → 0 / 3, refused (touched tests/checkout_test.md)</p>
          </div>
          <div>
            <p className="rx-kicker">Cap</p>
            <h2 id="band-cap">Three attempts, then the loop stops.</h2>
            <p className="rx-lead">A fixer may edit shop source only. The cap is three receipt-fix commits, then Kane&apos;s last result stands.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export function WorkflowBand() {
  return (
    <section className="rx-band" aria-labelledby="band-flow">
      <div className="rx-container">
        <p className="rx-kicker">Record</p>
        <h2 id="band-flow">Finally, a preview check that leaves a record.</h2>
        <p className="rx-lead">Kane runs the contract. A fenced patch may follow. The same test runs again. The pull request keeps the receipt.</p>
        <div className="rx-pipeline">
          <article><p className="rx-kicker">Catch</p><strong>$29</strong><p>Red run 43698574333 failed the $19 checkout step.</p></article>
          <article><p className="rx-kicker">Fix</p><strong>1/3</strong><p>186ecdc touched shop/lib/prices.ts and shop/lib/checkout.ts only.</p></article>
          <article><p className="rx-kicker">Re-verify</p><strong>5</strong><p>Green run 43699955024 passed all five steps.</p></article>
        </div>
        <div className="rx-ledger">
          {BELT.map((card) => (
            <a key={card.id} href={card.href}>
              <span>{card.title}</span>
              <span>{card.attempts}</span>
              <span>{card.commit}</span>
              <em className={card.verdict}>{card.verdict}</em>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsBand() {
  return (
    <section className="rx-band" aria-labelledby="band-stats">
      <div className="rx-container rx-stats-block">
        <p className="rx-kicker">Counts</p>
        <h2 id="band-stats">Counts from this repo, not a ticker</h2>
        <p className="rx-statline">49 tests <span>·</span> 3 seeded bugs <span>·</span> 3 attempts <span>·</span> 5 proof PRs</p>
        <div className="rx-bars" aria-label="Published price against checkout">
          <div className="is-plan"><b>$19</b><span>Plans</span></div>
          <div className="is-check"><b>$29</b><span>Checkout</span></div>
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
