import Link from "next/link";
import SiteMenu from "./site-menu";
import StableVideo from "./stable-video";

export default function SkyHero() {
  return (
    <section className="rx-hero" aria-labelledby="rx-hero-title">
      <StableVideo
        className="rx-hero-video"
        poster="/hero/jet-poster.jpg"
        preload="metadata"
        sources={[
          { src: "/hero/jet-480.mp4", media: "(max-width: 600px)" },
          { src: "/hero/jet-720.mp4" },
        ]}
      />
      <div className="rx-hero-shade" />
      <div className="rx-hero-fade" aria-hidden="true" />
      <div className="rx-hero-wrap">
        <SiteMenu overlay />
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
