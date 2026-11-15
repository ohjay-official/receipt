import type { Metadata } from "next";
import ReceiptSlip from "../components/receipt-slip";
import { EARLIER, KANE_STEPS_RED, PR1, PR3, PR4, PR5, PRODUCTION_URL } from "@/lib/site";

export const metadata: Metadata = { title: "Proof" };

export default function ProofPage() {
  return (
    <main>
      <div className="wrap">
        <header className="m-page-hero">
          <p className="label">Proof</p>
          <h1>What Kane actually ran</h1>
          <p className="lede">
            These are live pull requests, Actions runs, and LambdaTest evidence
            packs. Production on main still shows the seeded bugs. None of these
            pull requests should be merged.
          </p>
        </header>

        <div className="split">
          <ReceiptSlip />
          <ReceiptSlip
            title="Pull request #4"
            verdict="failed"
            attempts="0 / 3"
            steps={KANE_STEPS_RED}
            href={PR4.url}
            footnote={PR4.note}
          />
        </div>

        <ol className="proof-list">
          <li>
            <p className="run-id">Production</p>
            <div>
              <h3>The seeded shop is still on main</h3>
              <p>
                /pricing lists Pro at $19. /checkout totals $29. LAUNCH10 does not
                take 10% off. Pay is covered in Phone layout and at 900px and below.
              </p>
              <p className="links">
                <a href={PRODUCTION_URL}>Live site</a>
                <a href={`${PRODUCTION_URL}/pricing`}>Plans</a>
                <a href={`${PRODUCTION_URL}/checkout`}>Checkout</a>
              </p>
            </div>
          </li>
          <li>
            <p className="run-id">PR #3 · 43698574333</p>
            <div>
              <h3>Red catch, three-bug contract</h3>
              <p>
                Kane failed “Checkout must show $19 for Pro.” Coupon and Pay were
                skipped after that first required failure.
              </p>
              <p className="links">
                <a href={PR3.url}>Pull request</a>
                <a href={PR3.redRun}>Actions run</a>
                <a href={PR3.redEvidence}>Evidence pack</a>
              </p>
            </div>
          </li>
          <li>
            <p className="run-id">PR #3 · {PR3.fixSha}</p>
            <div>
              <h3>receipt-fix: 1, shop files only</h3>
              <p>
                shop/lib/prices.ts and shop/lib/checkout.ts. Checkout $19, LAUNCH10
                yields $17.10, Pay overlay off. Attempts 1 / 3.
              </p>
              <p className="links">
                <a href={PR3.fixUrl}>Commit</a>
                <a href={PR3.preview}>Fixed preview</a>
              </p>
            </div>
          </li>
          <li>
            <p className="run-id">PR #3 · 43699955024</p>
            <div>
              <h3>Green re-verify, all five steps</h3>
              <p>
                Kane exit 0. The receipt card lists every step as passed, including
                “Pay works in the phone layout.”
              </p>
              <p className="links">
                <a href={PR3.greenRun}>Actions run</a>
                <a href={PR3.greenEvidence}>Evidence pack</a>
              </p>
            </div>
          </li>
          <li>
            <p className="run-id">PR #4 · 43700368892</p>
            <div>
              <h3>Fix refused</h3>
              <p>
                RECEIPT_DEMO_CHEAT=1 made the fixer propose a cheating test-file
                diff. Nothing was pushed. The card reads “{PR4.note}”.
              </p>
              <p className="links">
                <a href={PR4.url}>Pull request</a>
                <a href={PR4.run}>Actions run</a>
                <a href={PR4.evidence}>Evidence pack</a>
              </p>
            </div>
          </li>
          <li>
            <p className="run-id">PR #5 · 43701888824</p>
            <div>
              <h3>Same loop after the site rebuild</h3>
              <p>
                Red catch, then receipt-fix: 1 ({PR5.fixSha}) on shop/lib/prices.ts
                and shop/lib/checkout.ts only. Green re-verify passed all five
                steps. Attempts {PR5.attempts}.
              </p>
              <p className="links">
                <a href={PR5.url}>Pull request</a>
                <a href={PR5.redRun}>Red run</a>
                <a href={PR5.redEvidence}>Red evidence</a>
                <a href={PR5.fixUrl}>{PR5.fixSha}</a>
                <a href={PR5.greenRun}>Green run</a>
                <a href={PR5.greenEvidence}>Green evidence</a>
                <a href={PR5.preview}>Fixed preview</a>
              </p>
            </div>
          </li>
          <li>
            <p className="run-id">Earlier</p>
            <div>
              <h3>First loops, still open</h3>
              <p>
                Pull request #1 was the first live Kane catch, with receipt-fix: 1
                ({PR1.fixSha}). Pull request #2 closed the autonomous loop with
                receipt-fix: 1 (e7542b0). They stay as earlier evidence.
              </p>
              <p className="links">
                <a href={PR1.url}>Pull request #1</a>
                <a href={PR1.fixUrl}>{PR1.fixSha}</a>
                <a href={PR1.redRun}>Red run</a>
                <a href={PR1.greenRun}>Green run</a>
                <a href={EARLIER.pr2}>Pull request #2</a>
                <a href={EARLIER.pr2Fix}>e7542b0</a>
              </p>
            </div>
          </li>
        </ol>
      </div>
    </main>
  );
}
