import type { Metadata } from "next";
import Link from "next/link";
import { PR4 } from "@/lib/site";
import { Crumb } from "../../components/rebuild/bits";
import DocsFrame from "../../components/rebuild/docs-frame";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta(
  "Guardrails",
  "The fixer may edit shop source only. Tests, the README contract, workflows, and the action are refused. Pull request #4 was refused for tests/checkout_test.md.",
);

export default function GuardrailsPage() {
  return (
    <DocsFrame>
      <header className="rb-dochead">
        <Crumb items={[{ href: "/docs", label: "Docs" }, { href: "/docs/guardrails", label: "Guardrails" }]} />
        <p className="rb-pill">Guardrails</p>
        <h1 className="rb-h1">The fixer does not choose the fence.</h1>
        <p className="rb-lead">Before any push, Receipt validates the proposal. A test-file edit is a refusal, not a commit.</p>
        <div className="rb-doc-visual rb-paper" style={{ padding: 16 }}>
          <p className="rb-slip-k">Pull request #4</p>
          <p className="rb-stamp is-bad" style={{ position: "static" }}>REFUSED</p>
          <p style={{ margin: "12px 0 0", fontFamily: "var(--font-mono), monospace", fontSize: 13 }}>tests/checkout_test.md<br />run 43700368892<br />0 / 3 fixes pushed</p>
        </div>
      </header>
      <article className="prose rx-doc">
        <ul>
          <li>Only paths under <code>shop/**</code> may change.</li>
          <li>Shop unit tests, Kane tests, the README contract, <code>.github</code>, <code>action.yml</code>, and <code>src</code> are refused.</li>
          <li>Deleting <code>##</code> steps or changing <code>PRO_PLAN_USD</code> away from 19 is refused as weakening.</li>
        </ul>
        <p>
          On <a href={PR4.url}>pull request #4</a>, <code>RECEIPT_DEMO_CHEAT=1</code> made the fixer propose a weakening patch to <code>tests/checkout_test.md</code>. Receipt did not push. The card said “{PR4.note}”.
        </p>
        <p><Link href="/proof">The refused run</Link></p>
      </article>
    </DocsFrame>
  );
}
