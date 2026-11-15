import type { Metadata } from "next";
import Link from "next/link";
import { PR1, PR3, PR4, PR5 } from "@/lib/site";

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

export default function HowItWorksPage() {
  return (
    <main>
      <div className="wrap">
        <header className="m-page-hero">
          <p className="label">The loop</p>
          <h1>From a lying preview to a receipt</h1>
          <p className="lede">
            Receipt is a composite GitHub Action in this repository. It does not
            replace Kane. It starts Kane, pins what Kane saw, and, when the contract
            fails, offers one tightly fenced patch.
          </p>
        </header>
        <ol className="loop">
          {STEPS.map((step) => (
            <li key={step.title}>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <section className="section prose">
          <h2>Guardrails in the loop</h2>
          <p>
            Before a fixer push, Receipt validates the diff. A patch that leaves{" "}
            <code>shop/**</code>, including shop unit tests, or that weakens the Kane
            steps or the advertised $19 Pro price, is refused and never pushed. The
            receipt card says why, as on{" "}
            <Link href="/proof">the refused-cheat pull request</Link>.
          </p>
          <p>
            Production on <code>main</code> keeps the seeded bugs on purpose. Demo
            pull requests stay open as evidence. They are not merged.
          </p>
          <p>
            <Link href="/docs/guardrails">Read the guardrails in full</Link>
            {" · "}
            <Link href="/docs/limitations">Honest limitations</Link>
          </p>
        </section>
        <section className="m-record">
          <h2>Runs still open</h2>
          <p className="lede">
            None of these pull requests should be merged. Production on main
            keeps the seeded bugs.
          </p>
          <ol className="proof-list">
            <li>
              <p className="run-id">PR #1</p>
              <div>
                <h3>First live loop</h3>
                <p>Red run, then receipt-fix: 1 at {PR1.fixSha}, then a green re-verify.</p>
                <p className="links">
                  <a href={PR1.url}>Pull request</a>
                  <a href={PR1.fixUrl}>{PR1.fixSha}</a>
                  <a href={PR1.greenRun}>Green run</a>
                </p>
              </div>
            </li>
            <li>
              <p className="run-id">PR #3</p>
              <div>
                <h3>Three bugs, attempt 1 of 3</h3>
                <p>Fix {PR3.fixSha} touched shop/lib/prices.ts and shop/lib/checkout.ts only.</p>
                <p className="links">
                  <a href={PR3.url}>Pull request</a>
                  <a href={PR3.fixUrl}>{PR3.fixSha}</a>
                  <a href={PR3.greenRun}>Green run</a>
                </p>
              </div>
            </li>
            <li>
              <p className="run-id">PR #4</p>
              <div>
                <h3>Guardrail refused the cheat</h3>
                <p>{PR4.note}. Nothing was pushed. Run 43700368892.</p>
                <p className="links">
                  <a href={PR4.url}>Pull request</a>
                  <a href={PR4.run}>Actions run</a>
                </p>
              </div>
            </li>
            <li>
              <p className="run-id">PR #5</p>
              <div>
                <h3>Same loop after the site rebuild</h3>
                <p>Red run 43701888824, fix {PR5.fixSha}, green run 43702361655. Attempts {PR5.attempts}.</p>
                <p className="links">
                  <a href={PR5.url}>Pull request</a>
                  <a href={PR5.fixUrl}>{PR5.fixSha}</a>
                  <a href={PR5.greenRun}>Green run</a>
                </p>
              </div>
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}
