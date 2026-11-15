import type { Metadata } from "next";
import Link from "next/link";
import { PR4 } from "@/lib/site";

export const metadata: Metadata = { title: "Guardrails" };

export default function GuardrailsPage() {
  return (
    <article className="prose">
      <p className="label">Docs</p>
      <h1>Guardrails</h1>
      <p>
        The fixer does not get a vote on what it may touch. Before any push,
        Receipt validates the proposal.
      </p>
      <ul>
        <li>Only paths under <code>shop/**</code> may change.</li>
        <li>
          Shop unit tests, Kane tests, the README contract, <code>.github</code>,
          <code>action.yml</code>, and <code>src</code> are refused.
        </li>
        <li>Deleting <code>##</code> steps or changing <code>PRO_PLAN_USD</code> away from 19 is refused as weakening.</li>
      </ul>
      <p>
        On <a href={PR4.url}>pull request #4</a>,{" "}
        <code>RECEIPT_DEMO_CHEAT=1</code> made the fixer propose a weakening
        patch to <code>tests/checkout_test.md</code>. Receipt did not push. The
        card said “{PR4.note}”.
      </p>
      <p>
        <Link href="/proof">The refused run, with evidence</Link>
      </p>
    </article>
  );
}
