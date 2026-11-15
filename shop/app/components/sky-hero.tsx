import Link from "next/link";
import RxNav from "./rx-nav";

const JET = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4";

export default function SkyHero() {
  return (
    <section className="rx-hero" aria-labelledby="rx-hero-title">
      <video className="rx-hero-video" autoPlay muted loop playsInline src={JET} />
      <div className="rx-hero-shade" />
      <div className="rx-hero-wrap">
        <RxNav />
        <div className="rx-hero-main">
          <div className="rx-hero-copy">
            <p className="rx-kicker">GitHub Action</p>
            <h1 id="rx-hero-title">
              <span className="l1">Previewed.</span>
              <span className="l2">Verified.</span>
            </h1>
            <p className="rx-sub">Don&apos;t merge a preview without a Receipt.</p>
            <div className="rx-pills">
              <Link className="rx-pill rx-pill-ghost" href="/proof">See the proof</Link>
              <Link className="rx-pill rx-pill-ink" href="/docs/install">Install</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
