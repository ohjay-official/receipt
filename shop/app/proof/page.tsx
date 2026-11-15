import type { Metadata } from "next";
import PageHero from "../components/page-hero";
import ProofConveyor from "../components/proof-conveyor";
import ReceiptSlip from "../components/receipt-slip";
import { BELT, KANE_STEPS_RED, PR4, PRODUCTION_URL } from "@/lib/site";

export const metadata: Metadata = { title: "Proof" };

const PHOTOS = [
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0e201fcd-ffc0-46a0-bd06-faa07bf0e84b.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e80ba08d-d7b6-4b27-b0cd-8d0ad09c788c.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2bebad68-8177-446a-9550-d64074166364.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/62b0d7c1-3eb7-44bd-9b19-57b975fb250f.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/156ff74d-ee37-4443-8f3a-11ae2095ed4c.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/7b6ad638-89ec-4dec-be74-d36fbff3ea53.webp",
];

const STORIES = [
  "First live Kane run. The seeded checkout was $29, then the fix went green.",
  "Receipt auto-starts on pull_request. The fix is receipt-fix: 1.",
  "Checkout showed $29. Coupon and Pay were skipped after that required failure.",
  "The fixer proposed a test-file edit. Receipt refused it and pushed nothing.",
  "The same loop after the site rebuild. Red, then a shop-only fix, then green.",
];

export default function ProofPage() {
  return (
    <main>
      <PageHero
        kicker="Proof"
        title="What Kane actually ran"
        lede="These are live pull requests, Actions runs, and LambdaTest evidence packs. Production on main still shows the seeded bugs. None of these pull requests should be merged."
        crumb={[{ href: "/proof", label: "Proof" }]}
        primary={{ href: PRODUCTION_URL, label: "Live site" }}
        secondary={{ href: "/shop/pricing", label: "Demo plans" }}
      />
      <ProofConveyor bare />
      <section className="rx-band">
        <div className="rx-container">
          <div className="rx-slip-grid">
            <ReceiptSlip />
            <ReceiptSlip title="Pull request #4" verdict="failed" attempts="0 / 3" steps={KANE_STEPS_RED} href={PR4.url} footnote={PR4.note} />
          </div>
        </div>
      </section>
      <section className="rx-band">
        <div className="rx-container rx-run-grid">
          <article className="rx-run-card">
            <img src={PHOTOS[5]} alt="" />
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
              <img src={PHOTOS[index]} alt="" />
              <div>
                <h2>{card.title}</h2>
                <p>{STORIES[index]}</p>
                <ul className="rx-mini-ledger">
                  {card.lines.map((line) => <li key={line}>{line}</li>)}
                  <li>{card.note}</li>
                </ul>
                <p className="rx-run-links">
                  {card.links.map((link) => <a key={link.href + link.label} href={link.href}>{link.label}</a>)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
