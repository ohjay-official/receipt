import type { Metadata } from "next";
import Link from "next/link";
import { REPO_URL } from "@/lib/site";
import { Crumb } from "../../components/rebuild/bits";
import DocsFrame from "../../components/rebuild/docs-frame";

export const metadata: Metadata = { title: "Install" };

export default function InstallPage() {
  return (
    <DocsFrame>
      <header className="rb-dochead">
        <Crumb items={[{ href: "/docs", label: "Docs" }, { href: "/docs/install", label: "Install" }]} />
        <p className="rb-pill">Install</p>
        <h1 className="rb-h1">Wire the workflow.</h1>
        <p className="rb-lead">This repository already runs Receipt on itself. Another public Vercel repo can use the same action.</p>
        <div className="rb-doc-visual rb-terminal">
          <pre>{`secrets:
  LT_USERNAME
  LT_ACCESS_KEY
  GEMINI_API_KEY
  RECEIPT_GIT_TOKEN
vars:
  RECEIPT_PRODUCTION_URL`}</pre>
        </div>
      </header>
      <article className="prose rx-doc">
        <ol>
          <li>Add repository secrets <code>LT_USERNAME</code>, <code>LT_ACCESS_KEY</code>, <code>GEMINI_API_KEY</code>, and <code>RECEIPT_GIT_TOKEN</code> (a fine-grained PAT that can push fixer commits). Never print their values.</li>
          <li>Set <code>RECEIPT_PRODUCTION_URL</code> as a repository variable if you want a fallback start URL.</li>
          <li>Copy <code>tests/receipt_checkout_test.md</code> and the <code>&lt;!-- kane:how-to-test --&gt;</code> block, then wire <code>.github/workflows/receipt.yml</code> to <code>uses: ./</code> or to this repository.</li>
          <li>Keep the fixer allowlist at <code>shop/**</code> or the application path you actually want patched.</li>
        </ol>
        <p>The workflow in this repo listens on <code>pull_request</code>, waits for the Vercel commit status, and uses the git-branch preview alias. That is the $0 path when GitHub Deployments events do not arrive.</p>
        <p>
          Source: <a href={REPO_URL}>{REPO_URL.replace("https://", "")}</a>
          {" · "}
          <Link href="/docs/configuration">Configuration</Link>
        </p>
      </article>
    </DocsFrame>
  );
}
