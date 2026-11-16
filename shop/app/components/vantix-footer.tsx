import Link from "next/link";
import { HACKATHON_URL, REPO_URL } from "@/lib/site";

const WORKFLOW = "https://github.com/ohjay-official/receipt/blob/main/.github/workflows/receipt.yml";

export default function VantixFooter() {
  return (
    <footer className="rb-foot">
      <div className="rb-scene">
        <div className="rb-arc" aria-hidden="true" />
        <p className="rb-wordmark">Receipt</p>
        <Link className="rb-ring" href="/docs/install" aria-label="Install">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4 14 L14 4 M8 4 H14 V10" />
          </svg>
        </Link>
        <p className="rb-vert">RECEIPT</p>
      </div>
      <div className="rb-foot-cards">
        <Link href="/proof">
          Five pull requests ran the loop
          <span>See the proof ↗</span>
        </Link>
        <Link href="/shop">
          The seeded bugs still live on main
          <span>Open the shop ↗</span>
        </Link>
      </div>
      <div className="rb-foot-cols">
        <div>
          <p className="rb-colhead">Receipt</p>
          <p>Don&apos;t merge a preview without a Receipt.</p>
        </div>
        <nav aria-label="Product">
          <p className="rb-colhead">Product</p>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/proof">Proof</Link>
          <Link href="/shop">Demo shop</Link>
        </nav>
        <nav aria-label="Docs">
          <p className="rb-colhead">Docs</p>
          <Link href="/docs/install">Install</Link>
          <Link href="/docs/contract">Contract</Link>
          <Link href="/docs/guardrails">Guardrails</Link>
          <Link href="/docs/limitations">Limitations</Link>
        </nav>
        <nav aria-label="Source">
          <p className="rb-colhead">Source</p>
          <a href={REPO_URL}>GitHub repo</a>
          <a href={WORKFLOW}>Workflow file</a>
          <a href={HACKATHON_URL}>Kane CLI hackathon</a>
        </nav>
      </div>
      <div className="rb-foot-bottom">
        <p className="rb-foot-meta">
          <a href={REPO_URL}>GitHub</a>
          <a href={HACKATHON_URL}>Kane CLI hackathon</a>
        </p>
        <p className="rb-status"><i />Seeded bugs live on main</p>
        <p>© 2026 Receipt · Built for the Kane CLI hackathon</p>
      </div>
    </footer>
  );
}
