import type { Metadata } from "next";
import Link from "next/link";
import { REPO_URL } from "@/lib/site";

export const metadata: Metadata = { title: "Install" };

export default function InstallPage() {
  return (
    <article className="prose rx-doc">
      <p className="label">Docs</p>
      <h1>Install</h1>
      <p>
        This repository already runs Receipt on itself. To use the same action on
        another public repo deployed to Vercel (Deployment Protection off so Kane
        sees the app, not a login wall):
      </p>
      <ol>
        <li>
          Add repository secrets <code>LT_USERNAME</code>, <code>LT_ACCESS_KEY</code>,{" "}
          <code>GEMINI_API_KEY</code>, and <code>RECEIPT_GIT_TOKEN</code> (a
          fine-grained PAT that can push fixer commits). Never print their values.
        </li>
        <li>
          Set <code>RECEIPT_PRODUCTION_URL</code> as a repository variable if you
          want a fallback start URL.
        </li>
        <li>
          Copy <code>tests/receipt_checkout_test.md</code> and the{" "}
          <code>&lt;!-- kane:how-to-test --&gt;</code> block, then wire{" "}
          <code>.github/workflows/receipt.yml</code> to <code>uses: ./</code> or to
          this repository.
        </li>
        <li>
          Keep the fixer allowlist at <code>shop/**</code> or the application path
          you actually want patched.
        </li>
      </ol>
      <p>
        The workflow in this repo listens on <code>pull_request</code>, waits for
        the Vercel commit status, and uses the git-branch preview alias. That is
        the $0 path when GitHub Deployments events do not arrive.
      </p>
      <p>
        Source: <a href={REPO_URL}>{REPO_URL.replace("https://", "")}</a>
        {" · "}
        <Link href="/docs/configuration">Configuration</Link>
      </p>
    </article>
  );
}
