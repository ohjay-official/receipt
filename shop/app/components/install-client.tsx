"use client";

import { useState } from "react";
import Link from "next/link";

const WORKFLOW = `# .github/workflows/receipt.yml
name: Receipt
on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]
  repository_dispatch:
    types: [vercel.deployment.ready]
  deployment_status:
  workflow_dispatch:
permissions:
  contents: read
  pull-requests: write
jobs:
  receipt:
    runs-on: ubuntu-latest
    timeout-minutes: 45
    steps:
      - uses: actions/checkout@v4
        with:
          token: \${{ secrets.RECEIPT_GIT_TOKEN || github.token }}
      - uses: ohjay-official/receipt@main
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
          RECEIPT_WAIT_FOR_VERCEL_STATUS: \${{ github.event_name == 'pull_request' && 'true' || 'false' }}
`;

const LINES = [
  ["LT_USERNAME", "repo secret"],
  ["LT_ACCESS_KEY", "repo secret"],
  ["GEMINI_API_KEY", "repo secret"],
  ["RECEIPT_GIT_TOKEN", "repo secret"],
  ["RECEIPT_PRODUCTION_URL", "repo variable"],
] as const;

export default function InstallClient() {
  const [torn, setTorn] = useState(false);
  const [copied, setCopied] = useState(false);
  return (
    <div className="rx-install-grid">
      <div className="rx-install-steps">
        <p className="rx-kicker">Install</p>
        <h2 id="install-title">Print the setup</h2>
        <p className="rx-lead">
          Public repo, Vercel, Deployment Protection off so Kane sees the app. Copy the test file and the How-to-test block, then the workflow. The secrets stay in GitHub.
        </p>
        <ol>
          <li><Link href="/docs/install">Secrets stay in GitHub</Link></li>
          <li><Link href="/docs/contract">The How-to-test file</Link></li>
          <li><Link href="/docs/configuration">The workflow on the preview</Link></li>
        </ol>
      </div>
      <div className="rx-printer">
        <div className="rx-printer-head" aria-hidden="true" />
        <div className={torn ? "rx-slip is-torn is-printing" : "rx-slip is-printing"}>
        <button type="button" className="rx-tear" aria-pressed={torn} onClick={() => setTorn((v) => !v)}>
          {torn ? "Torn" : "Tear off"}
        </button>
        <div className="rx-slip-body">
          <p className="rx-kicker">Receipt</p>
          <h3>Install</h3>
          <ul className="rx-slip-lines">
            {LINES.map(([name, kind]) => (
              <li key={name}><span>{name}</span><span>{kind}</span></li>
            ))}
          </ul>
          <pre className="rx-yaml">{WORKFLOW}</pre>
          <div className="rx-pills" style={{ justifyContent: "flex-start", marginTop: 16 }}>
            <button
              type="button"
              className="rx-pill rx-pill-ink"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(WORKFLOW);
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}
            >
              {copied ? "Copied" : "Copy workflow"}
            </button>
          </div>
          <div className="rx-total"><span>Total</span><span>$0</span></div>
          <p className="rx-lead">
            Public repo, Vercel Hobby, Kane&apos;s free grant, Gemini free Flash. @main is not pinned to a release tag. This install has not been verified on a second repo.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
