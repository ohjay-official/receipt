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
    timeout-minutes: 30
    env:
      RECEIPT_GIT_TOKEN: \${{ secrets.RECEIPT_GIT_TOKEN }}
    steps:
      - uses: actions/checkout@v4
        with:
          token: \${{ secrets.RECEIPT_GIT_TOKEN || github.token }}
      - uses: ohjay-official/receipt@main
        with:
          test-file: tests/receipt_checkout_test.md
          username: \${{ secrets.LT_USERNAME }}
          access-key: \${{ secrets.LT_ACCESS_KEY }}
          gemini-api-key: \${{ secrets.GEMINI_API_KEY }}
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
      <div>
        <p className="rx-kicker">Install</p>
        <h2 id="install-title">Tear off the setup</h2>
        <p className="rx-lead">
          Public repo, Vercel, Deployment Protection off so Kane sees the app. Copy the test file and the How-to-test block, then the workflow. The secrets stay in GitHub.
        </p>
        <p className="rx-lead"><Link href="/docs/install">Full install notes</Link></p>
      </div>
      <div className={torn ? "rx-slip is-torn" : "rx-slip"}>
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
          <p className="rx-lead" style={{ fontSize: 13 }}>
            Public repo, Vercel Hobby, Kane&apos;s free grant, Gemini free Flash. @main is not pinned to a release tag. This install has not been verified on a second repo.
          </p>
        </div>
      </div>
    </div>
  );
}
