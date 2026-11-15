"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import StableVideo from "./stable-video";

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

function Gauge() {
  const ticks = Array.from({ length: 23 }, (_, i) => {
    const angle = ((190 + i * 5) * Math.PI) / 180;
    const outer = 142;
    const inner = i % 5 === 0 ? 129 : 133;
    return { i, x1: 163 + Math.cos(angle) * inner, y1: 163 + Math.sin(angle) * inner, x2: 163 + Math.cos(angle) * outer, y2: 163 + Math.sin(angle) * outer, w: i % 5 === 0 ? 1.5 : 1 };
  });
  return (
    <svg className="rx-gauge" viewBox="0 0 326 326" aria-hidden="true">
      <path d="M11.34 136.26A154 154 0 0 1 307.71 110.33" fill="none" stroke="rgba(32,42,54,.55)" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M6.91 135.48A158.5 158.5 0 0 1 311.94 108.79" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M19.22 137.65A146 146 0 0 1 236 36.56" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.15" />
      {ticks.map((tick) => <line key={tick.i} x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2} stroke="rgba(255,255,255,.5)" strokeWidth={tick.w} />)}
    </svg>
  );
}

function TileWall() {
  return (
    <>
      <svg className="rx-tiles" viewBox="0 0 429 554" preserveAspectRatio="none" aria-hidden="true">
        <rect x="-24" y="22" width="106" height="149" rx="15" fill="rgba(255,255,255,.16)" />
        <rect x="88" y="22" width="247" height="150" rx="15" fill="rgba(249,250,251,.28)" />
        <rect x="346" y="22" width="111" height="147" rx="15" fill="rgba(255,255,255,.12)" />
        <rect x="-24" y="177" width="108" height="174" rx="15" fill="rgba(32,42,54,.28)" />
        <rect x="88" y="177" width="247" height="174" rx="15" fill="rgba(255,255,255,.18)" />
        <rect x="344" y="175" width="113" height="176" rx="15" fill="rgba(209,213,219,.22)" />
        <rect x="-24" y="384" width="480" height="170" fill="rgba(32,42,54,.4)" />
        <rect x="81" y="30" width="8" height="150" fill="rgba(32,42,54,.45)" />
        <rect x="338" y="30" width="8" height="322" fill="rgba(32,42,54,.45)" />
        <rect x="0" y="167" width="429" height="12" fill="rgba(32,42,54,.35)" />
      </svg>
      <div className="rx-window" />
    </>
  );
}

function ConnectionMap() {
  const strokes = [
    "M0 5H128c27 0 36 7 39 26 2 16 9 22 24 22h106c16 0 23-8 25-25 2-16 10-23 31-23h76",
    "M0 117h46c15 0 22 8 26 25 5 23 12 31 31 31h174c18 0 25-8 30-31 4-17 11-25 26-25h96",
    "M0 173h87c15 0 22 7 27 25 4 15 11 22 28 22h140c17 0 25-7 29-22 5-18 12-25 28-25h90",
    "M0 61h95c14 0 22-6 27-20 4-13 12-20 27-20h115c15 0 23 6 27 20 5 14 13 20 28 20h110",
  ];
  return (
    <svg className="rx-map" viewBox="0 0 429 238" preserveAspectRatio="none" aria-hidden="true">
      {strokes.map((d) => <path key={d} d={d} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.15" />)}
      <circle cx="45" cy="117" r="6.5" fill="#fff" />
      <circle cx="133" cy="61" r="6.5" fill="#f9fafb" />
      <circle cx="189" cy="61" r="6.5" fill="#e5e7eb" />
      <circle cx="319" cy="61" r="6.5" fill="#fff" />
      <circle cx="319" cy="117" r="6.5" fill="#d1d5db" />
    </svg>
  );
}

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

function StageFilm() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const apply = () => setNarrow(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);
  return (
    <StableVideo
      className="rx-stage-video"
      src={narrow ? NARROW : WIDE}
      poster={narrow ? NARROW_POSTER : WIDE_POSTER}
    />
  );
}

export default function PerformanceStage() {
  return (
    <section className="rx-stage" aria-label="How it works">
      <StageFilm />
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
        {CARDS.map((card, index) => (
          <Link key={card.metric} className="rx-card" href={card.href}>
            <StableVideo className="rx-card-media" poster={card.poster} src={card.video} />
            {index === 0 ? <Gauge /> : null}
            {index === 1 ? <TileWall /> : null}
            {index === 2 ? <ConnectionMap /> : null}
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
