import type { Metadata } from "next";
import Link from "next/link";

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
        <header className="page-hero">
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
      </div>
    </main>
  );
}
