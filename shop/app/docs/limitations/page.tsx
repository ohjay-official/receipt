import type { Metadata } from "next";
import Link from "next/link";
import { Crumb } from "../../components/rebuild/bits";
import DocsFrame from "../../components/rebuild/docs-frame";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta(
  "Limitations",
  "Kane 0.10.4 replay ignores --url. Kane cannot open a 390px window. This project uses pull_request because GitHub Deployments events do not arrive.",
  "/docs/limitations",
);

export default function LimitationsPage() {
  return (
    <DocsFrame>
      <header className="rb-dochead">
        <Crumb items={[{ href: "/docs", label: "Docs" }, { href: "/docs/limitations", label: "Limitations" }]} />
        <p className="rb-pill">Limitations</p>
        <h1 className="rb-h1">What this version cannot do.</h1>
        <p className="rb-lead">Two Kane 0.10.4 limits, and one missing GitHub Deployments signal, are already worked around in the action.</p>
        <div className="rb-doc-visual rb-terminal">
          <pre>{`kane-cli testmd run --url
replay ignores --url
set-window rejects < 800px
CI Chrome is 1920px
workaround: remap origin
workaround: Phone layout (390px)`}</pre>
        </div>
      </header>
      <article className="prose rx-doc">
        <h3>Kane 0.10.4 replay ignores --url</h3>
        <p><code>kane-cli testmd run --url</code> sets the start URL for a fresh author run. On replay, Kane 0.10.4 ignores <code>--url</code> and navigates to the origin baked into the committed recordings. Receipt remaps every recorded Vercel start and navigate origin to the preview under test, and discards a stale <code>Result.md</code>, on every run.</p>
        <h3>Kane cannot open a 390px window</h3>
        <p>Official testmd frontmatter has no viewport key. <code>kane-cli config set-window</code> rejects widths under 800px. Kane “mobile” targets are native apps, not a Chrome phone viewport, and <code>--remote</code> is out of scope on a $0 budget. In CI, Chrome is 1920px and exposes no window-resize action. A “resize to 800px” step failed as an environment issue and never clicked Pay.</p>
        <p>The contract therefore uses an in-page control, Phone layout (390px), that applies the same overlay a 390px phone (and any window at <code>max-width: 900px</code>) hits. Kane must not try to resize the browser.</p>
        <h3>This Vercel project has no GitHub Deployments</h3>
        <p><code>deployment_status</code> never fires here, and <code>repository_dispatch</code> has not arrived. The working $0 path is <code>pull_request</code>, plus the Vercel commit status and the git-branch alias.</p>
        <p><Link href="/docs/contract">Back to the contract</Link></p>
      </article>
    </DocsFrame>
  );
}
