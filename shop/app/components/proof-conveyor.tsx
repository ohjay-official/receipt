"use client";

import { useEffect, useRef } from "react";
import { BELT } from "@/lib/site";

const PHOTOS = [
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0e201fcd-ffc0-46a0-bd06-faa07bf0e84b.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e80ba08d-d7b6-4b27-b0cd-8d0ad09c788c.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2bebad68-8177-446a-9550-d64074166364.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/62b0d7c1-3eb7-44bd-9b19-57b975fb250f.webp",
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/156ff74d-ee37-4443-8f3a-11ae2095ed4c.webp",
];

function hash(a: number, b: number, c: number) {
  let h = Math.imul(a, 374761393) + Math.imul(b, 668265263) + Math.imul(c | 0, 2147483647);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export default function ProofConveyor() {
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
      const period = span * BELT.length;
      if (!state.lt) {
        state.off = belt.clientWidth / 2 - cw * 0.62;
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
      const Lx = belt.clientWidth / 2;
      const top = belt.getBoundingClientRect().top;
      let cross = -1;
      const placed: { x: number; cut: number }[] = [];
      for (let i = 0; i < BELT.length; i += 1) {
        const x = ((state.off + i * span) % period + period) % period - span;
        const cut = Math.max(0, Math.min(cw, Lx - x));
        placed.push({ x, cut });
        const card = cards.current[i];
        const code = codes.current[i];
        if (card) {
          card.style.transform = `translate3d(${x}px,0,0)`;
          card.style.clipPath = cut > 0 ? `inset(0 0 0 ${cut}px)` : "none";
        }
        if (code) {
          code.style.transform = `translate3d(${x}px,0,0)`;
          code.style.visibility = cut > 0 ? "visible" : "hidden";
          code.style.clipPath = `inset(0 ${Math.max(0, cw - cut)}px 0 0)`;
        }
        if (cut > 0 && cut < cw) cross = i;
      }
      if (countRef.current && pctRef.current) {
        const label = cross >= 0 ? BELT[cross].attempts : "Kane";
        const side = cross >= 0 ? BELT[cross].verdict : "waiting";
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
        if (cut <= 0) continue;
        for (let gx = 0; gx < cw; gx += 4) {
          const sx = x + gx;
          const d = sx - Lx;
          if (d < 0 || d > cw * 0.3) continue;
          const p = (1 - d / (cw * 0.3)) ** 1.7;
          for (let gy = 0; gy < ch; gy += 4) {
            if (hash(gx, gy, i) > p * 0.85) continue;
            ctx.fillStyle = d < 10 ? "#f9fafb" : "#202A36";
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
    <section className="rx-proof" aria-labelledby="proof-conveyor-title">
      <div className="rx-proof-hero">
        <div>
          <p className="rx-kicker">Proof</p>
          <h2 id="proof-conveyor-title">Built for reviewers.<br />Read from the runs.</h2>
        </div>
        <div>
          <p>Five open pull requests pass the line. Right of it is the preview. Left of it is the receipt Kane left behind, in the words of the run.</p>
          <a className="rx-pill rx-pill-ink" href="/proof" style={{ marginTop: 20 }}>See the proof</a>
        </div>
      </div>
      <div className="rx-badge">
        <span>Fix attempt</span>
        <b><em ref={countRef}>Kane</em><i ref={pctRef}>waiting</i></b>
      </div>
      <div className="rx-scan" aria-hidden="true" />
      <div className="rx-belt" ref={beltRef}>
        <canvas className="rx-fx" ref={canvasRef} />
        {BELT.map((card, index) => (
          <article key={card.id} className="rx-card-abs" ref={(node) => { cards.current[index] = node; }} aria-hidden="true">
            <div className="rx-card-face" style={{ backgroundImage: `linear-gradient(180deg, rgba(32,42,54,.15), rgba(32,42,54,.62)), url(${PHOTOS[index]})` }}>
              <h3>{card.title}</h3>
              <p>{card.lines[0]}</p>
            </div>
          </article>
        ))}
        {BELT.map((card, index) => (
          <pre key={`${card.id}-code`} className="rx-code-abs" ref={(node) => { codes.current[index] = node; }}>
{`<h1>${card.title}</h1>
<p>${card.lines.join("\n")}</p>
<p>${card.attempts}</p>
<p>${card.commit}</p>
<p>${card.note}</p>`}
          </pre>
        ))}
      </div>
    </section>
  );
}
