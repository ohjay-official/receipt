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
    inputs:
      preview_url:
        required: false
        type: string
permissions:
  contents: read
  pull-requests: write
jobs:
  receipt:
    if: >
      github.event_name == 'pull_request' ||
      github.event_name == 'workflow_dispatch' ||
      (github.event_name == 'repository_dispatch' && github.event.action == 'vercel.deployment.ready') ||
      (github.event_name == 'deployment_status' && github.event.deployment_status.state == 'success')
    runs-on: ubuntu-latest
    timeout-minutes: 30
    env:
      RECEIPT_GIT_TOKEN: \${{ secrets.RECEIPT_GIT_TOKEN }}
    steps:
      - uses: actions/checkout@v4
        with:
          ref: \${{ github.event.client_payload.git.sha || github.event.pull_request.head.sha || github.event.deployment.sha || github.sha }}
          fetch-depth: 0
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

export default function InstallReceipt() {
  const [torn, setTorn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyNote, setCopyNote] = useState("");

  async function copyWorkflow() {
    try {
      await navigator.clipboard.writeText(WORKFLOW);
      setCopied(true);
      setCopyNote("Workflow copied");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyNote("Clipboard blocked. Select the workflow and copy it.");
    }
  }

  return (
    <div className="m-install">
      <div>
        <p className="label">Install</p>
        <h2 id="install-title">Tear off the setup</h2>
        <p className="lede">
          On a public repo that deploys to Vercel, with Deployment Protection off
          so Kane sees the app. Copy the test file and the How-to-test block,
          then add the workflow. The four secrets stay in GitHub. This slip
          never prints their values.
        </p>
        <p className="m-install-note">
          <Link href="/docs/install">Full install notes</Link>
          {" · "}
          <Link href="/docs/configuration">Configuration</Link>
        </p>
      </div>
      <div className={`m-slip-wrap ${torn ? "is-torn" : ""}`}>
        <button
          type="button"
          className="m-slip-tear"
          aria-pressed={torn}
          onClick={() => setTorn((value) => !value)}
        >
          {torn ? "Torn" : "Tear off"}
        </button>
        <div className="m-slip-sheet">
          <div className="perforation" aria-hidden="true" />
          <div className="m-slip-body">
            <p className="m-slip-kicker">Receipt</p>
            <h3>Install</h3>
            <ul className="m-slip-lines">
              {LINES.map(([name, kind]) => (
                <li key={name}>
                  <span>{name}</span>
                  <span>{kind}</span>
                </li>
              ))}
            </ul>
            <pre className="m-slip-yaml">{WORKFLOW}</pre>
            <div className="m-slip-actions">
              <button type="button" className="btn btn-secondary" onClick={copyWorkflow}>
                {copied ? "Copied" : "Copy workflow"}
              </button>
              {copyNote ? <p className="m-slip-copy-note">{copyNote}</p> : null}
            </div>
            <div className="m-slip-total">
              <span>Total</span>
              <span className="tabular">$0</span>
            </div>
            <p className="m-slip-foot">
              Public repo, Vercel Hobby, Kane&apos;s free 10,000-credit grant, Gemini
              free Flash. @main is not pinned to a release tag yet. This install
              has not been verified on a second repo.
            </p>
          </div>
          <div className="perforation perforation-bottom" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
