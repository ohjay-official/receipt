import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Docs" };

export default function DocsIndexPage() {
  return (
    <article className="prose">
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
      <h2>In these pages</h2>
      <p>
        <Link href="/docs/install">Install</Link> covers the secrets, the
        production URL variable, and the workflow that waits for the Vercel
        commit status.
      </p>
      <p>
        <Link href="/docs/contract">The contract</Link> is the How-to-test
        block Kane is required to follow, including the three seeded bugs on
        main.
      </p>
      <p>
        <Link href="/docs/configuration">Configuration</Link> lists action
        inputs, retries, and how Receipt finds the preview URL.
      </p>
      <p>
        <Link href="/docs/guardrails">Guardrails</Link> is the allowlist: shop
        application source only, no test or contract edits, no weakening of
        advertised prices.
      </p>
      <p>
        <Link href="/docs/limitations">Limitations</Link> records that Kane
        0.10.4 replay ignores <code>--url</code>, that CI Chrome cannot resize
        to a phone, and how the in-page Phone layout control covers that gap.
      </p>
    </article>
  );
}
