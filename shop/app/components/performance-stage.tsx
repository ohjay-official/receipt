"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const WIDE = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_125226_45cb4f38-aa7e-47e1-885d-ae0b69745369.mp4";
const WIDE_POSTER = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/5c3ec08f-2dbf-4c0a-8588-f6106a789443.webp";
const NARROW = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_125242_daae1570-386d-4bd5-8896-80499e2371e0.mp4";
const NARROW_POSTER = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0f4926a4-e660-4df2-9195-2bfb3e341bdd.webp";
const CARDS = [
  {
    href: "/proof",
    title: "Catch\nthe $29 total",
    metric: "$29",
    caption: "Failed checkout\non pull request #3",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_130045_1a612b69-4854-4b34-8043-ccb91f2c60af.mp4",
    poster: "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/167977c6-8539-46b1-9a15-8dba566f50b8.png",
  },
  {
    href: "https://github.com/ohjay-official/receipt/commit/186ecdc",
    title: "Fix\nattempt 1 of 3",
    metric: "1/3",
    caption: "shop files only\ncommit 186ecdc",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_130054_dd005674-d693-4d81-80a5-357f7f10b3a3.mp4",
    poster: "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0446d1d5-e65e-4db5-8090-3e30d09afc43.png",
  },
  {
    href: "https://github.com/ohjay-official/receipt/actions/runs/43699955024",
    title: "Re-verify\nall five steps",
    metric: "5",
    caption: "Green run\n43699955024",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_130103_7550f407-f14b-40a6-9616-7a26d7a8bd9f.mp4",
    poster: "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/da8d0242-4dee-4f6d-813f-a5887e86ad77.png",
  },
];

const GLYPHS: Record<string, string[]> = {
  V: ["10001", "10001", "10001", "10001", "01010", "01010", "00100"],
  e: ["00000", "00000", "01110", "10001", "11111", "10000", "01110"],
  r: ["00000", "00000", "10110", "11001", "10000", "10000", "10000"],
  i: ["010", "000", "110", "010", "010", "010", "111"],
  f: ["00111", "01000", "11110", "01000", "01000", "01000", "01000"],
  d: ["00001", "00001", "01111", "10001", "10001", "10001", "01111"],
};

function DotWord({ word }: { word: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const pitchX = 4;
    const pitchY = 4;
    let width = 0;
    const rows = word.split("").map((ch) => GLYPHS[ch] || GLYPHS.e);
    rows.forEach((g) => { width += g[0].length * pitchX + 2; });
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${width} 28`);
    svg.setAttribute("class", "rx-dot-svg");
    svg.setAttribute("width", String(width));
    svg.setAttribute("height", "28");
    let x0 = 0;
    rows.forEach((g) => {
      g.forEach((row, y) => {
        [...row].forEach((bit, x) => {
          if (bit !== "1") return;
          const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          c.setAttribute("cx", String(x0 + x * pitchX + 1.6));
          c.setAttribute("cy", String(y * pitchY + 1.6));
          c.setAttribute("r", "1.5");
          c.setAttribute("fill", "currentColor");
          svg.appendChild(c);
        });
      });
      x0 += g[0].length * pitchX + 2;
    });
    host.replaceChildren(svg);
  }, [word]);
  return <span className="rx-dot-word" ref={ref} aria-label={word} />;
}

export default function PerformanceStage() {
  return (
    <section className="rx-stage" aria-label="How it works">
      <video className="rx-stage-video stage-motion stage-motion--wide" autoPlay muted loop playsInline preload="auto" poster={WIDE_POSTER} src={WIDE} />
      <video className="rx-stage-video stage-motion stage-motion--narrow" autoPlay muted loop playsInline preload="none" poster={NARROW_POSTER} src={NARROW} />
      <div className="rx-stage-still" style={{ background: `linear-gradient(rgba(236,236,234,.10), rgba(236,236,234,.10)), url(${WIDE_POSTER}) center / cover no-repeat` }} />
      <div className="rx-masthead">
        <h2 className="rx-headline">
          <span className="rx-headline-line">Built for <DotWord word="Verified" /></span>
          <span className="rx-headline-line">Previews</span>
        </h2>
        <p className="rx-intro">
          Kane opens the Vercel preview, checks the contract in the README, and leaves a receipt on the pull request when the preview is lying.
        </p>
      </div>
      <div className="rx-cards">
        {CARDS.map((card) => (
          <Link key={card.metric} className="rx-card" href={card.href}>
            <video className="rx-card-media" autoPlay muted loop playsInline preload="auto" poster={card.poster} src={card.video} />
            <h3 className="rx-card-title">{card.title.split("\n").map((line) => <span key={line} style={{ display: "block" }}>{line}</span>)}</h3>
            <p className="rx-card-metric">{card.metric}</p>
            <p className="rx-card-caption">{card.caption.split("\n").map((line) => <span key={line} style={{ display: "block" }}>{line}</span>)}</p>
            <span className="rx-card-more">Learn more</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
