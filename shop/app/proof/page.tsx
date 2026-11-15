import type { Metadata } from "next";
import ReceiptSlip from "../components/receipt-slip";
import PageHero from "../components/page-hero";
import { BELT, EARLIER, KANE_STEPS_RED, PR1, PR4, PRODUCTION_URL } from "@/lib/site";

export const metadata: Metadata = { title: "Proof" };

const PHOTOS = [
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0e201fcd-ffc0-46a0-bd06-faa07bf0e84b.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e80ba08d-d7b6-4b27-b0cd-8d0ad09c788c.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2bebad68-8177-446a-9550-d64074166364.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/62b0d7c1-3eb7-44bd-9b19-57b975fb250f.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/156ff74d-ee37-4443-8f3a-11ae2095ed4c.webp",
];

export default function ProofPage() {
  return (
    <main>
      <PageHero
        kicker="Proof"
        title="What Kane actually ran"
        lede="These are live pull requests, Actions runs, and LambdaTest evidence packs. Production on main still shows the seeded bugs. None of these pull requests should be merged."
      />
      <section className="rx-inner-section">
        <div className="rx-slip-grid">
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
      </section>
      <section className="rx-inner-section">
        <div className="rx-run-grid">
          <article className="rx-run-card">
            <img src={PHOTOS[0]} alt="" />
            <div>
              <h2>The seeded shop is still on main</h2>
              <p>/pricing lists Pro at $19. /checkout totals $29. LAUNCH10 does not take 10% off. Pay is covered in Phone layout and at 900px and below.</p>
              <p className="rx-run-links">
                <a href={PRODUCTION_URL}>Live site</a>
                <a href={`${PRODUCTION_URL}/pricing`}>Plans</a>
                <a href={`${PRODUCTION_URL}/checkout`}>Checkout</a>
              </p>
            </div>
          </article>
          {BELT.map((card, index) => (
            <article key={card.id} className="rx-run-card">
              <img src={PHOTOS[index % PHOTOS.length]} alt="" />
              <div>
                <h2>{card.title}</h2>
                <p>{card.lines.join(". ")}. Attempts {card.attempts}. {card.commit}. {card.note}.</p>
                <p className="rx-run-links">
                  {card.links.map((link) => (
                    <a key={link.href + link.label} href={link.href}>{link.label}</a>
                  ))}
                </p>
              </div>
            </article>
          ))}
          <article className="rx-run-card">
            <img src={PHOTOS[4]} alt="" />
            <div>
              <h2>Earlier loops, still open</h2>
              <p>
                Pull request #1 was the first live Kane run, with receipt-fix: 1 ({PR1.fixSha}), red run 43683895636 and green run 43684482513. Pull request #2 auto-starts on pull_request, with receipt-fix: 1 (e7542b0).
              </p>
              <p className="rx-run-links">
                <a href={PR1.url}>Pull request #1</a>
                <a href={PR1.fixUrl}>{PR1.fixSha}</a>
                <a href={PR1.redRun}>Red run</a>
                <a href={PR1.greenRun}>Green run</a>
                <a href={EARLIER.pr2}>Pull request #2</a>
                <a href={EARLIER.pr2Fix}>e7542b0</a>
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
