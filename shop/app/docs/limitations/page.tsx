import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Limitations" };

export default function LimitationsPage() {
  return (
    <article className="prose">
      <p className="label">Docs</p>
      <h1>Limitations</h1>
      <h2>Kane 0.10.4 replay ignores --url</h2>
      <p>
        <code>kane-cli testmd run --url</code> sets the start URL for a fresh
        author run. On replay, Kane 0.10.4 ignores <code>--url</code> and
        navigates to the origin baked into the committed recordings. Receipt
        remaps every recorded Vercel start and navigate origin to the preview
        under test, and discards a stale <code>Result.md</code>, on every run.
      </p>
      <h2>Kane cannot open a 390px window</h2>
      <p>
        Official testmd frontmatter has no viewport key.{" "}
        <code>kane-cli config set-window</code> rejects widths under 800px. Kane
        “mobile” targets are native apps, not a Chrome phone viewport, and{" "}
        <code>--remote</code> is out of scope on a $0 budget. In CI, Chrome is
        1920px and exposes no window-resize action — a “resize to 800px” step
        failed as an environment issue and never clicked Pay.
      </p>
      <p>
        The contract therefore uses an in-page control, Phone layout (390px),
        that applies the same overlay a 390px phone (and any window at{" "}
        <code>max-width: 900px</code>) hits. Kane must not try to resize the
        browser.
      </p>
      <h2>This Vercel project has no GitHub Deployments</h2>
      <p>
        <code>deployment_status</code> never fires here, and{" "}
        <code>repository_dispatch</code> has not arrived. The working $0 path is{" "}
        <code>pull_request</code>, plus the Vercel commit status and the
        git-branch alias.
      </p>
      <p>
        <Link href="/docs/contract">Back to the contract</Link>
      </p>
    </article>
  );
}
