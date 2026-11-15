import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/page-hero";
import { BELT, PR4 } from "@/lib/site";

export const metadata: Metadata = { title: "How it works" };

const STEPS = [
  {
    title: "Kane checks the preview",
    body: "On a pull request, Receipt waits for the Vercel preview, remaps any recorded start URL onto that preview, and runs the committed Kane test against the How-to-test contract in the README.",
  },
  {
    title: "A bug verdict, with evidence",
    body: "If a required step fails, Kane exits 1. Receipt uploads Result.md, recordings, and the evidence pack, and starts a receipt card on the pull request.",
  },
  {
    title: "An allowlisted fixer",
    body: "Gemini reads Kane’s result and may edit shop/** application source only. Shop unit tests, the Kane test, the contract, workflows, and the action are out of bounds.",
  },
  {
    title: "Redeploy, then re-verify",
    body: "A receipt-fix: N commit is pushed with the git token. Vercel builds a new preview. The same Kane test runs again, cap 3.",
  },
  {
    title: "A receipt card",
    body: "The pull request comment lists what Kane saw, the root cause, the fix or a refusal, attempt counts, and a link to the evidence pack.",
  },
];

const PHOTOS = [
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0e201fcd-ffc0-46a0-bd06-faa07bf0e84b.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e80ba08d-d7b6-4b27-b0cd-8d0ad09c788c.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2bebad68-8177-446a-9550-d64074166364.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/62b0d7c1-3eb7-44bd-9b19-57b975fb250f.webp",
];

export default function HowItWorksPage() {
  const shown = BELT.filter((card) => card.id !== "pr2");
  return (
    <main>
      <PageHero
        kicker="The loop"
        title="From a lying preview to a receipt"
        lede="Receipt is a composite GitHub Action in this repository. It does not replace Kane. It starts Kane, pins what Kane saw, and, when the contract fails, offers one tightly fenced patch."
      />
      <section className="rx-inner-section">
        <ol className="rx-step-cards">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <span className="rx-step-n">0{index + 1}</span>
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="rx-inner-section">
        <h2>Guardrails in the loop</h2>
        <div className="rx-glass">
          <p>
            Before a fixer push, Receipt validates the diff. A patch that leaves shop/**, including shop unit tests, or that weakens the Kane steps or the advertised $19 Pro price, is refused and never pushed. The receipt card says why, as on the refused-cheat pull request.
          </p>
          <p style={{ marginTop: 16 }}>
            Production on main keeps the seeded bugs on purpose. Demo pull requests stay open as evidence. They are not merged.
          </p>
          <p className="rx-run-links">
            <Link href="/docs/guardrails">Read the guardrails in full</Link>
            <Link href="/docs/limitations">Honest limitations</Link>
            <a href={PR4.url}>Pull request #4</a>
          </p>
        </div>
      </section>
      <section className="rx-inner-section">
        <h2>Runs still open</h2>
        <p className="lede" style={{ fontSize: 18, color: "#4b5563", marginTop: 0 }}>
          None of these pull requests should be merged. Production on main keeps the seeded bugs.
        </p>
        <div className="rx-run-grid">
          {shown.map((card, index) => (
            <article key={card.id} className="rx-run-card">
              <img src={PHOTOS[index % PHOTOS.length]} alt="" />
              <div>
                <h3>{card.title}</h3>
                <p>{card.lines.join(". ")}. Attempts {card.attempts}. {card.note}.</p>
                <p className="rx-run-links">
                  {card.links.map((link) => (
                    <a key={link.href} href={link.href}>{link.label}</a>
                  ))}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
