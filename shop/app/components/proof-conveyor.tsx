"use client";

import { useEffect, useRef } from "react";
import { BELT } from "@/lib/site";

const PHOTOS = [
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0e201fcd-ffc0-46a0-bd06-faa07bf0e84b.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e80ba08d-d7b6-4b27-b0cd-8d0ad09c788c.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2bebad68-8177-446a-9550-d64074166364.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/62b0d7c1-3eb7-44bd-9b19-57b975fb250f.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/156ff74d-ee37-4443-8f3a-11ae2095ed4c.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/7b6ad638-89ec-4dec-be74-d36fbff3ea53.webp",
];

const NEXT = {
  id: "next",
  title: "Your next pull request",
  lines: ["No run yet", "Install Receipt on the repo", "Open a pull request"],
  attempts: "not run",
  verdict: "install",
  commit: "none yet",
  note: "No result until Kane runs",
};

const CARDS = [...BELT, NEXT];

function hash(a: number, b: number, c: number) {
  let h = Math.imul(a, 374761393) + Math.imul(b, 668265263) + Math.imul(c | 0, 2147483647);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export default function ProofConveyor({ bare = false }: { bare?: boolean }) {
  const beltRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const countRef = useRef<HTMLElement>(null);
  const pctRef = useRef<HTMLElement>(null);
  const cards = useRef<Array<HTMLElement | null>>([]);
  const codes = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const belt = beltRef.current;
    const canvas = canvasRef.current;
    if (!belt || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { off: 0, vel: 0, hover: 0, hovering: false, dragging: false, pointer: -1, locked: false, sx: 0, sy: 0, lx: 0, lt: 0, shown: "" };
    let frame = 0;
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      const first = cards.current[0];
      if (!first) return;
      const cw = first.offsetWidth;
      const ch = first.offsetHeight;
      const gap = Math.max(24, belt.clientWidth * 0.0475);
      const span = cw + gap;
      const period = span * CARDS.length;
      const narrow = belt.clientWidth < 768;
      if (!state.lt) {
        state.off = narrow ? 0 : belt.clientWidth / 2 - cw * 0.62;
        state.lt = now;
      }
      const dt = Math.min(0.05, (now - state.lt) / 1000 || 0.016);
      state.lt = now;
      const auto = reduced ? 0 : -0.075 * belt.clientWidth;
      if (!state.dragging) {
        state.hover += ((state.hovering ? 1 : 0) - state.hover) * (1 - Math.exp(-4 * dt));
        const target = auto * (1 - 0.65 * state.hover);
        state.vel += (target - state.vel) * (1 - Math.exp(-2.2 * dt));
        state.off += state.vel * dt;
      }
      const scan = belt.querySelector<HTMLElement>(".rx-scan");
      const Lx = narrow ? 0 : belt.clientWidth / 2;
      const top = belt.getBoundingClientRect().top;
      let cross = -1;
      let leadX = 0;
      const placed: { x: number; cut: number }[] = [];
      for (let i = 0; i < CARDS.length; i += 1) {
        let raw = ((state.off + i * span) % period + period) % period;
        if (narrow && raw > period / 2) raw -= period;
        const x = narrow ? raw : raw - span;
        const cut = narrow ? 0 : Math.max(0, Math.min(cw, Lx - x));
        placed.push({ x, cut });
        const card = cards.current[i];
        const code = codes.current[i];
        if (card) {
          card.style.transform = `translate3d(${x}px,0,0)`;
          card.style.clipPath = narrow || cut <= 0 ? "none" : `inset(0 0 0 ${cut}px)`;
        }
        if (code) {
          code.style.transform = `translate3d(${x}px,0,0)`;
          code.style.visibility = !narrow && cut > 0 ? "visible" : "hidden";
          code.style.clipPath = `inset(0 ${Math.max(0, cw - cut)}px 0 0)`;
        }
        if (narrow && (cross < 0 || Math.abs(x - 12) < Math.abs(leadX - 12))) {
          cross = i;
          leadX = x;
        } else if (!narrow && cut > 0 && cut < cw) cross = i;
      }
      if (narrow && scan) {
        scan.style.left = `${Math.max(0, leadX)}px`;
        scan.style.marginLeft = "0";
        scan.style.height = `${ch}px`;
      }
      if (countRef.current && pctRef.current) {
        const label = cross >= 0 ? CARDS[cross].attempts : "Kane";
        const side = cross >= 0 ? CARDS[cross].verdict : "waiting";
        if (label !== state.shown) {
          state.shown = label;
          countRef.current.textContent = label;
          pctRef.current.textContent = side;
        }
      }
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (canvas.width !== Math.floor(belt.clientWidth * dpr)) {
        canvas.width = Math.floor(belt.clientWidth * dpr);
        canvas.height = Math.floor(belt.clientHeight * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, belt.clientWidth, belt.clientHeight);
      for (let i = 0; i < placed.length; i += 1) {
        const { x, cut } = placed[i];
        if (!narrow && cut <= 0) continue;
        if (narrow && Math.abs(x - leadX) > 2) continue;
        for (let gx = 0; gx < (narrow ? 36 : cw); gx += 4) {
          const sx = x + gx;
          const d = narrow ? gx : sx - Lx;
          if (d < 0 || d > (narrow ? 36 : cw * 0.3)) continue;
          const p = (1 - d / (cw * 0.3)) ** 1.7;
          for (let gy = 0; gy < ch; gy += 4) {
            if (hash(gx, gy, i) > p * 0.85) continue;
            const hot = ["#fff1f2", "#fbd0d5", "#f08a96", "#d9485a", "#b4232f", "#9b2c2c", "#7f1d1d"];
            ctx.fillStyle = d < 10 ? hot[Math.floor(hash(gx, gy, i) * 3)] : hot[3 + Math.floor(hash(gy, gx, i) * 4)];
            ctx.fillRect(sx, gy, 1.6, 1.6);
          }
        }
      }
      void top;
    };
    frame = requestAnimationFrame(loop);
    const down = (event: PointerEvent) => {
      state.pointer = event.pointerId;
      state.sx = event.clientX;
      state.sy = event.clientY;
      state.lx = event.clientX;
      state.locked = false;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerId !== state.pointer) return;
      const dx = event.clientX - state.sx;
      const dy = event.clientY - state.sy;
      if (!state.locked) {
        if (Math.hypot(dx, dy) < 8) return;
        if (Math.abs(dy) > Math.abs(dx)) { state.pointer = -1; return; }
        state.locked = true;
        state.dragging = true;
        belt.classList.add("is-drag");
        belt.setPointerCapture(event.pointerId);
      }
      const delta = event.clientX - state.lx;
      state.vel = delta / 16 * 1000 * 0.45;
      state.off += delta;
      state.lx = event.clientX;
    };
    const up = (event: PointerEvent) => {
      if (event.pointerId !== state.pointer) return;
      state.pointer = -1;
      state.dragging = false;
      belt.classList.remove("is-drag");
    };
    belt.addEventListener("pointerenter", () => { state.hovering = true; });
    belt.addEventListener("pointerleave", () => { state.hovering = false; });
    belt.addEventListener("pointerdown", down);
    belt.addEventListener("pointermove", move);
    belt.addEventListener("pointerup", up);
    belt.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(frame);
      belt.removeEventListener("pointerdown", down);
      belt.removeEventListener("pointermove", move);
      belt.removeEventListener("pointerup", up);
      belt.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <section className="rx-proof" aria-labelledby={bare ? undefined : "proof-conveyor-title"} aria-label={bare ? "Proof runs" : undefined}>
      {bare ? null : (
        <div className="rx-proof-hero">
          <div>
            <p className="rx-kicker">Proof</p>
            <h2 id="proof-conveyor-title">Built for reviewers.<br />Read from the runs.</h2>
          </div>
          <div>
            <p>Five real pull requests cross the line. Right of it, the run. Left of it, the receipt Kane left.</p>
            <a className="rx-pill rx-pill-ink" href="/proof">See the proof</a>
          </div>
        </div>
      )}
      <div className="rx-belt-wrap">
        <div className="rx-badge">
          <span>Kane</span>
          <b><em ref={countRef}>{CARDS[0].attempts}</em><i ref={pctRef}>{CARDS[0].verdict}</i></b>
        </div>
        <div className="rx-belt" ref={beltRef}>
          <div className="rx-scan" aria-hidden="true" />
          <canvas className="rx-fx" ref={canvasRef} />
          {CARDS.map((card, index) => {
            const photo = index % 2 === 0 && card.id !== "next" ? PHOTOS[index] : "";
            const figure = card.id === "pr3" ? "$29" : card.id === "pr4" ? "0 / 3" : card.id === "next" ? "Install" : card.attempts;
            return (
              <article key={card.id} className={`rx-card-abs ${card.id === "next" ? "is-next" : ""} ${photo ? "has-photo" : ""}`} ref={(node) => { cards.current[index] = node; }} aria-hidden="true">
                <div className="rx-mini" style={photo ? { backgroundImage: `linear-gradient(180deg, rgba(32,42,54,.55), rgba(32,42,54,.82)), url(${photo})` } : undefined}>
                  <header><b>Receipt</b><span>Runs</span><span className="on">Proof</span><span>Shop</span></header>
                  <p className="rx-mini-fig">{figure}</p>
                  <p className="rx-mini-kick">{card.title}</p>
                  <ul>
                    {card.lines.slice(0, 3).map((line) => <li key={line}>{line}</li>)}
                  </ul>
                  <em>{card.verdict}</em>
                </div>
              </article>
            );
          })}
          <div className="rx-codes">
            {CARDS.map((card, index) => (
              <pre key={`${card.id}-code`} className="rx-code-abs" ref={(node) => { codes.current[index] = node; }}>
{`${card.title}
${card.lines[0]}
${card.attempts}
verdict: ${card.verdict}
github.com/ohjay-official/receipt`}
              </pre>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
