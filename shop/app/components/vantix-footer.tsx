import Link from "next/link";
import { HACKATHON_URL, REPO_URL } from "@/lib/site";
import StableVideo from "./stable-video";

const GLOW = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4a917d4c-123f-4b68-8125-b201961b7791.jpg";
const LOOP = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/a8f60da5-538f-403a-a812-6be0f098e319.mp4";

function Mark({ d }: { d: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function VantixFooter() {
  return (
    <footer className="vx">
      <img className="vx-glow" src={GLOW} alt="" />
      <StableVideo className="vx-video" src={LOOP} poster={GLOW} />
      <div className="vx-video-fade" aria-hidden="true" />
      <div className="vx-ui" aria-hidden={false}>
        <svg className="vx-svg" viewBox="0 0 1326 1186" role="img" aria-label="Receipt">
          <defs>
            <linearGradient id="vx-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.35" stopColor="#fff" stopOpacity="0.45" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="vx-arc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#d1d5db" />
              <stop offset="1" stopColor="#ffffff" />
            </linearGradient>
            <filter id="vx-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
          <path d="M0 143 C 280 210, 520 470, 816 386 C 1040 330, 1180 348, 1326 334" fill="none" stroke="url(#vx-arc)" strokeWidth="1.6" />
          <circle cx="780.7" cy="351.5" r="78" fill="rgba(32,42,54,.55)" stroke="#fff" strokeWidth="2.4" filter="url(#vx-soft)" opacity="0.55" />
          <circle cx="780.7" cy="351.5" r="78" fill="rgba(255,255,255,.06)" stroke="#fff" strokeWidth="2.4" />
          <line x1="473" y1="80" x2="473" y2="980" stroke="url(#vx-fade)" strokeWidth="1" />
          <line x1="762" y1="80" x2="762" y2="980" stroke="url(#vx-fade)" strokeWidth="1" />
          <text x="667.5" y="901.7" transform="rotate(-90 667.5 901.7)" fill="#fff" fontSize="88.5" fontWeight="700" fontFamily="Inter, Helvetica, sans-serif">Receipt</text>
          <line x1="0" y1="964" x2="1326" y2="964" stroke="rgba(255,255,255,.4)" strokeDasharray="2 7" />
        </svg>
        <p className="vx-copy">Don&apos;t merge a preview without a Receipt.</p>
        <Link className="vx-cta" href="/docs/install">
          <i><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 14 L14 4 M8 4 H14 V10" /></svg></i>
          Install
        </Link>
        <nav className="vx-col a" aria-label="Product">
          <h2>Product</h2>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/proof">Proof</Link>
          <Link href="/shop">Demo shop</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/docs/install">Install</Link>
        </nav>
        <nav className="vx-col b" aria-label="Docs">
          <h2>Docs</h2>
          <Link href="/docs/contract">Contract</Link>
          <Link href="/docs/guardrails">Guardrails</Link>
          <Link href="/docs/limitations">Limitations</Link>
        </nav>
        <p className="vx-follow">Project</p>
        <div className="vx-social">
          <a href={REPO_URL} aria-label="GitHub"><Mark d="M3 8h10M8 3v10" /></a>
          <a href={HACKATHON_URL} aria-label="Kane CLI hackathon"><Mark d="M3 13 L8 3 L13 13" /></a>
          <a href="/proof" aria-label="Proof"><Mark d="M3 8h10M3 4h10M3 12h6" /></a>
          <a href="/shop" aria-label="Demo shop"><Mark d="M3 5h10v8H3z" /></a>
          <a href="/docs/install" aria-label="Install"><Mark d="M8 3v8M4 8h8" /></a>
        </div>
        <p className="vx-copyline">Receipt, 2026</p>
      </div>
      <div className="vx-phone">
        <p className="rx-word">Receipt</p>
        <p>Don&apos;t merge a preview without a Receipt.</p>
        <Link href="/docs/install">Install</Link>
        <nav aria-label="Footer">
          <Link href="/how-it-works">How it works</Link>
          <Link href="/proof">Proof</Link>
          <Link href="/shop">Demo shop</Link>
          <Link href="/docs/install">Install</Link>
          <Link href="/docs/contract">Contract</Link>
          <a href={REPO_URL}>GitHub repo</a>
          <a href={HACKATHON_URL}>Kane CLI hackathon</a>
        </nav>
      </div>
    </footer>
  );
}
