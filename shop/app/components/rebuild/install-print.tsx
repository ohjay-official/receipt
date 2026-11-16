"use client";

import { useState } from "react";
import Link from "next/link";
import { Node } from "./bits";

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
          max-fixes: "3"
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

const STEPS = [
  ["1", "Secrets stay in GitHub", "/docs/install"],
  ["2", "The How-to-test file", "/docs/contract"],
  ["3", "The workflow on the preview", "/docs/configuration"],
];

export default function InstallPrint() {
  const [copied, setCopied] = useState(false);

  return (
    <section className="rb-sec rb-install" id="install" aria-labelledby="install-title">
      <div className="rb-wrap rb-install-grid">
        <Node label="Receipt" />
        <div className="rb-copy">
          <p className="rb-pill">Install</p>
          <h2 className="rb-h2" id="install-title">Print the setup.<br />One workflow, then the loop.</h2>
          <p className="rb-lead">Public repo, Vercel, Deployment Protection off so Kane sees the app. The secrets stay in GitHub.</p>
          <ol className="rb-steps">
            {STEPS.map(([n, label, href]) => (
              <li key={n}>
                <span>{n}</span>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ol>
        </div>
        <div className="rb-printer">
          <div className="rb-slot" aria-hidden="true" />
          <div className="rb-paper rb-print">
            <p className="rb-slip-k">Receipt</p>
            <h3>Install</h3>
            <ul className="rb-kv">
              {LINES.map(([name, kind]) => (
                <li key={name}><span>{name}</span><span>{kind}</span></li>
              ))}
            </ul>
            <pre>{WORKFLOW}</pre>
            <button
              type="button"
              className="rb-btn rb-btn-stamp"
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
            <p className="rb-total"><span>Total</span><span>$0</span></p>
            <p className="rb-fine">
              Public repo, Vercel Hobby, Kane’s free grant, Gemini free Flash. Pin to a commit SHA for stability: ohjay-official/receipt@&lt;sha&gt;. This install has not been verified on a second repo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
