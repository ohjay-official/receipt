import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/page-hero";
import PerformanceStage from "../components/performance-stage";
import ReceiptSlip from "../components/receipt-slip";
import { BELT, KANE_STEPS_RED, PR4 } from "@/lib/site";

export const metadata: Metadata = { title: "How it works" };

const STEPS = [
  ["Kane checks the preview", "On a pull request, Receipt waits for the Vercel preview, remaps any recorded start URL onto that preview, and runs the committed Kane test against the How-to-test contract in the README.", "vercel status: success"],
  ["A bug verdict, with evidence", "If a required step fails, Kane exits 1. Receipt uploads Result.md, recordings, and the evidence pack, and starts a receipt card on the pull request.", "kane exit 1 · checkout $29"],
  ["An allowlisted fixer", "Gemini reads Kane’s result and may edit shop/** application source only. Shop unit tests, the Kane test, the contract, workflows, and the action are out of bounds.", "diff limited to shop/**"],
  ["Redeploy, then re-verify", "A receipt-fix: N commit is pushed with the git token. Vercel builds a new preview. The same Kane test runs again, cap 3.", "receipt-fix: 1"],
  ["A receipt card", "The pull request comment lists what Kane saw, the root cause, the fix or a refusal, attempt counts, and a link to the evidence pack.", "comment on the pull request"],
];

export default function HowItWorksPage() {
  return (
    <main>
      <PageHero
        kicker="The loop"
        title="From a lying preview to a receipt"
        lede="Receipt is a composite GitHub Action in this repository. It does not replace Kane. It starts Kane, pins what Kane saw, and, when the contract fails, offers one tightly fenced patch."
        crumb={[{ href: "/how-it-works", label: "How it works" }]}
        primary={{ href: "/docs/guardrails", label: "Read the guardrails" }}
        secondary={{ href: "/proof", label: "See the proof" }}
      />
      <PerformanceStage />
      <section className="rx-band">
        <div className="rx-container">
          <p className="rx-kicker">Steps</p>
          <h2>Five moves, then a card</h2>
          <ol className="rx-timeline-list">
            {STEPS.map(([title, body, mock], index) => (
              <li key={title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <div className="rx-frame rx-frame-ink"><pre className="rx-log">{mock}</pre></div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="rx-band">
        <div className="rx-container">
          <h2>Allowed, and refused</h2>
          <div className="rx-allow">
            <div>
              <h3>Allowed</h3>
              <p>shop/** application source</p>
            </div>
            <div>
              <h3>Refused</h3>
              <p>tests/, the README contract, .github, action.yml, and src/</p>
            </div>
          </div>
          <ReceiptSlip title="Pull request #4" verdict="failed" attempts="0 / 3" steps={KANE_STEPS_RED} href={PR4.url} footnote={PR4.note} />
          <p className="rx-lead"><Link href="/docs/guardrails">Read the guardrails in full</Link> · <Link href="/docs/limitations">Honest limitations</Link></p>
        </div>
      </section>
      <section className="rx-band">
        <div className="rx-container">
          <h2>Runs still open</h2>
          <p className="rx-lead">None of these pull requests should be merged. Production on main keeps the seeded bugs.</p>
          <div className="rx-ledger">
            {BELT.map((card) => (
              <a key={card.id} href={card.href}>
                <span>{card.title}</span>
                <span>{card.lines[0]}</span>
                <span>{card.commit}</span>
                <em className={card.verdict}>{card.verdict}</em>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
