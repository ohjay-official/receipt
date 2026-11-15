import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Docs" };

export default function DocsIndexPage() {
  return (
    <article className="prose rx-doc">
      <p className="label">Docs</p>
      <h1>Set the contract, then let Kane read it</h1>
      <p>
        Receipt is a composite GitHub Action. You point it at a public repository
        that deploys to Vercel, and at a How-to-test block in the README. Kane
        runs that contract on the preview. If a required step fails, a fixer may
        edit application source under <code>shop/**</code> only, then Kane runs
        again.
      </p>
      <p>
        Start with the one-file install if you want to wire the action. Read the
        contract if you want to see exactly what Kane checks on this shop. The
        limitations page is honest about Kane replay and the phone-layout control.
      </p>
      <div className="rx-doc-cards">
        <Link href="/docs/install"><strong>Install</strong><span>Secrets, the production URL variable, and the workflow that waits for the Vercel commit status.</span></Link>
        <Link href="/docs/contract"><strong>The contract</strong><span>The How-to-test block Kane follows, including the three seeded bugs on main.</span></Link>
        <Link href="/docs/configuration"><strong>Configuration</strong><span>Action inputs, retries, and how Receipt finds the preview URL.</span></Link>
        <Link href="/docs/guardrails"><strong>Guardrails</strong><span>Shop application source only. No test or contract edits. No weakening of advertised prices.</span></Link>
        <Link href="/docs/limitations"><strong>Limitations</strong><span>Kane 0.10.4 replay ignores --url. CI Chrome cannot resize to a phone. The in-page Phone layout control covers that gap.</span></Link>
      </div>
    </article>
  );
}
