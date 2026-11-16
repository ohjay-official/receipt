import type { Metadata } from "next";
import Link from "next/link";
import { REPO_URL } from "@/lib/site";
import { Crumb } from "../../components/rebuild/bits";
import DocsFrame from "../../components/rebuild/docs-frame";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta(
  "Install",
  "Add the repository secrets, set RECEIPT_PRODUCTION_URL, and copy the workflow that waits for the Vercel commit status.",
  "/docs/install",
);

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
          <li>Set <code>RECEIPT_PRODUCTION_URL</code> as a repository variable. The action uses it when the preview never returns HTTP 200.</li>
          <li>Copy <code>tests/receipt_checkout_test.md</code> and the <code>&lt;!-- kane:how-to-test --&gt;</code> block, then add a workflow whose Receipt step passes <code>production-url</code>, <code>allowlist</code>, and the three Vercel env values below.</li>
        </ol>
        <pre className="rb-install-sample">{`uses: ohjay-official/receipt@main
with:
  test-file: tests/receipt_checkout_test.md
  production-url: \${{ vars.RECEIPT_PRODUCTION_URL }}
  allowlist: "<your app path>/**"
  username: \${{ secrets.LT_USERNAME }}
  access-key: \${{ secrets.LT_ACCESS_KEY }}
  gemini-api-key: \${{ secrets.GEMINI_API_KEY }}
  git-token: \${{ secrets.RECEIPT_GIT_TOKEN }}
env:
  RECEIPT_VERCEL_PROJECT: <your-vercel-project>
  RECEIPT_VERCEL_SCOPE: <your-vercel-team-slug>
  RECEIPT_WAIT_FOR_VERCEL_STATUS: \${{ github.event_name == 'pull_request' && 'true' || 'false' }}`}</pre>
        <p>Pin to a commit SHA for stability: <code>ohjay-official/receipt@&lt;sha&gt;</code>. This install has not been verified on a second repo. This repository’s own workflow listens on <code>pull_request</code> and waits for the Vercel commit status.</p>
        <p>
          Source: <a href={REPO_URL}>{REPO_URL.replace("https://", "")}</a>
          {" · "}
          <Link href="/docs/configuration">Configuration</Link>
        </p>
      </article>
    </DocsFrame>
  );
}
