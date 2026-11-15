import Link from "next/link";
import { HACKATHON_URL, REPO_URL } from "@/lib/site";

const GLOW = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4a917d4c-123f-4b68-8125-b201961b7791.jpg";
const LOOP = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/a8f60da5-538f-403a-a812-6be0f098e319.mp4";

export default function VantixFooter() {
  return (
    <footer className="rx-foot">
      <img className="rx-foot-glow" src={GLOW} alt="" />
      <video className="rx-foot-video" autoPlay muted loop playsInline src={LOOP} />
      <div className="rx-foot-mask" />
      <div className="rx-foot-inner">
        <p className="rx-word">Receipt</p>
        <div className="rx-foot-grid">
          <div>
            <p style={{ margin: "0 0 16px", maxWidth: "18rem", fontSize: 20, lineHeight: 1.4 }}>
              Don&apos;t merge a preview without a Receipt.
            </p>
            <Link className="rx-pill rx-pill-ink" href="/docs/install" style={{ background: "white", color: "#202A36" }}>
              Install
            </Link>
          </div>
          <nav aria-label="Product">
            <h2>Product</h2>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/proof">Proof</Link>
            <Link href="/shop">Demo shop</Link>
          </nav>
          <nav aria-label="Docs">
            <h2>Docs</h2>
            <Link href="/docs/install">Install</Link>
            <Link href="/docs/contract">Contract</Link>
            <Link href="/docs/configuration">Configuration</Link>
            <Link href="/docs/guardrails">Guardrails</Link>
            <Link href="/docs/limitations">Limitations</Link>
          </nav>
          <nav aria-label="Project">
            <h2>Project</h2>
            <a href={REPO_URL}>GitHub repo</a>
            <a href={HACKATHON_URL}>Kane CLI hackathon</a>
          </nav>
        </div>
        <div className="rx-social" aria-label="Project links">
          <a href={REPO_URL} aria-label="GitHub">Gh</a>
          <a href={HACKATHON_URL} aria-label="Hackathon">Hk</a>
        </div>
      </div>
    </footer>
  );
}
