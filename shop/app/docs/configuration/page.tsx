import type { Metadata } from "next";
import { Crumb } from "../../components/rebuild/bits";
import DocsFrame from "../../components/rebuild/docs-frame";

export const metadata: Metadata = { title: "Configuration" };

export default function ConfigurationPage() {
  return (
    <DocsFrame>
      <header className="rb-dochead">
        <Crumb items={[{ href: "/docs", label: "Docs" }, { href: "/docs/configuration", label: "Configuration" }]} />
        <p className="rb-pill">Configuration</p>
        <h1 className="rb-h1">Inputs that matter here.</h1>
        <p className="rb-lead">The action reads a test file, an allowlist, and a cap. The workflow finds the preview without a Vercel token.</p>
        <div className="rb-doc-visual rb-terminal">
          <pre>{`test-file: tests/receipt_checkout_test.md
allowlist: shop/**
max-fixes: "3"
production-url: \${{ vars.RECEIPT_PRODUCTION_URL }}
RECEIPT_WAIT_FOR_VERCEL_STATUS: true`}</pre>
        </div>
      </header>
      <article className="prose rx-doc">
        <ul>
          <li><code>test-file</code>, default <code>tests/receipt_checkout_test.md</code></li>
          <li><code>allowlist</code>, default <code>shop/**</code></li>
          <li><code>max-fixes</code>, default 3</li>
          <li><code>production-url</code>, fallback if the preview never returns HTTP 200</li>
          <li><code>RECEIPT_VERCEL_PROJECT</code> / <code>RECEIPT_VERCEL_SCOPE</code>, used to build the git-branch preview alias, no Vercel token</li>
          <li><code>RECEIPT_WAIT_FOR_VERCEL_STATUS</code>, true on <code>pull_request</code></li>
          <li><code>RECEIPT_DEMO_CHEAT</code>, <code>1</code> on the <code>demo/cheat-refusal</code> branch, so the fixer proposes a cheating test-file diff for the refusal demo</li>
        </ul>
        <p>Kane is invoked with <code>--agent --headless --on-lock-conflict fail</code>, a unique session name per run, and a short retry if Test Manager still holds a write lock. A leftover lock is classified as setup, not as a contract failure, so the fixer stays off.</p>
      </article>
    </DocsFrame>
  );
}
