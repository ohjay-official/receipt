"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { BELT } from "@/lib/site";

const PALETTE = ["#9b2c2c", "#7a2424", "#1f1b16", "#5e554a", "#c4b8a8", "#efe9df", "#f7f4ee"];

function hash(a: number, b: number, c: number) {
  let h = Math.imul(a, 374761393) + Math.imul(b, 668265263) + Math.imul(c, 2147483647);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function mod(value: number, span: number) {
  return ((value % span) + span) % span;
}

export default function ProofBelt() {
  const beltRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const previewRefs = useRef<Array<HTMLElement | null>>([]);
  const receiptRefs = useRef<Array<HTMLElement | null>>([]);
  const nudge = useRef(0);

  useEffect(() => {
    const belt = beltRef.current;
    const canvas = canvasRef.current;
    if (!belt || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const state = {
      off: 0,
      vel: 0,
      hover: 0,
      hovering: false,
      dragging: false,
      pointer: -1,
      locked: false,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastT: 0,
      ready: false,
      placed: false,
      hidden: document.hidden,
      label: "",
    };

    const measure = () => {
      const card = cardRefs.current[0];
      const style = getComputedStyle(belt);
      const cw = card?.offsetWidth || 320;
      const ch = card?.offsetHeight || 260;
      const gap = parseFloat(style.getPropertyValue("--gap")) || 24;
      if (!state.ready) {
        const line = belt.clientWidth / 2;
        const desiredCut = Math.min(cw * 0.7, Math.max(cw * 0.45, line - 24));
        state.off = line - desiredCut;
        state.ready = true;
        belt.classList.add("is-live");
      }
      return { cw, ch, gap, span: cw + gap, period: (cw + gap) * BELT.length };
    };

    let frame = 0;
    const loop = (now: number) => {
      const paused = document.hidden && !state.dragging && !nudge.current;
      const { cw, ch, span, period } = measure();
      if (cw < 40 || period <= 0) {
        frame = requestAnimationFrame(loop);
        return;
      }
      if (!(paused && state.placed)) {
      const dt = state.lastT ? Math.min(0.05, (now - state.lastT) / 1000) : 0.016;
      state.lastT = now;
      const auto = reduced.matches || paused ? 0 : -0.05 * belt.clientWidth;
      if (!state.dragging && !paused) {
        const targetHover = state.hovering ? 1 : 0;
        state.hover += (targetHover - state.hover) * (1 - Math.exp(-4 * dt));
        const target = auto * (1 - 0.65 * state.hover);
        state.vel += (target - state.vel) * (1 - Math.exp(-2.2 * dt));
        if (nudge.current) {
          state.off += nudge.current;
          nudge.current = 0;
        }
        state.off += state.vel * dt;
      }

      const Lx = belt.clientWidth / 2;
      const top = 56;
      let crossing = -1;
      const placed: { x: number; cut: number }[] = [];

      for (let i = 0; i < BELT.length; i += 1) {
        const card = cardRefs.current[i];
        const preview = previewRefs.current[i];
        const receipt = receiptRefs.current[i];
        const x = mod(state.off + i * span + span, period) - span;
        const cut = Math.min(cw, Math.max(0, Lx - x));
        placed.push({ x, cut });
        if (card) card.style.transform = `translate3d(${x}px,0,0)`;
        if (preview) {
          const mask = cut > 0 ? `linear-gradient(90deg, transparent ${cut}px, #000 ${cut + 22}px)` : "none";
          preview.style.clipPath = cut > 0 ? `inset(0 0 0 ${cut}px)` : "none";
          preview.style.maskImage = mask;
          preview.style.webkitMaskImage = mask;
        }
        if (receipt) {
          receipt.style.visibility = cut > 0 ? "visible" : "hidden";
          receipt.style.clipPath = cut > 0 ? `inset(0 ${Math.max(0, cw - cut)}px 0 0)` : "inset(0 100% 0 0)";
        }
        if (cut > 0 && cut < cw) crossing = i;
      }

      if (labelRef.current) {
        const next =
          crossing >= 0 ? `${BELT[crossing].title}  ${BELT[crossing].verdict}` : "Kane";
        if (next !== state.label) {
          state.label = next;
          labelRef.current.textContent = next;
        }
      }

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const width = belt.clientWidth;
      const height = belt.clientHeight;
      if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const step = 4;
      const tick = reduced.matches ? 0 : Math.floor(now / 110);
      for (let i = 0; i < placed.length; i += 1) {
        const { x, cut } = placed[i];
        if (cut <= 0 || x + cw < Lx) continue;
        const reach = cw * 0.28;
        const cols = Math.ceil(cw / step);
        const rows = Math.ceil(ch / step);
        for (let gx = 0; gx <= cols; gx += 1) {
          const sx = x + gx * step;
          const d = sx - Lx;
          if (d < -2 || d > reach) continue;
          const p = Math.pow(1 - d / reach, 1.7);
          for (let gy = -1; gy <= rows; gy += 1) {
            const inside = gy >= 0 && gy <= rows;
            const chance = inside ? p * 0.9 : p * 0.14;
            if (hash(gx, gy, i + 3) > chance) continue;
            if (!reduced.matches && hash(gx, gy, tick + 97) < 0.2) continue;
            const h2 = hash(gy, gx, i + 31);
            const color =
              d < 8 ? PALETTE[4 + Math.floor(h2 * 3)] : PALETTE[Math.floor(h2 * h2 * PALETTE.length)];
            const size = 1.2 + h2 * 1.6;
            const jx = reduced.matches ? 0 : (hash(gx, i, gy) - 0.5) * 1.4;
            const jy = reduced.matches ? 0 : (hash(gy, i, gx) - 0.5) * 1.4;
            ctx.fillStyle = color;
            ctx.fillRect(sx + jx, top + gy * step + jy, size, size);
          }
        }
      }
      state.placed = true;
      }
      if (!paused || state.dragging || nudge.current) {
        frame = requestAnimationFrame(loop);
      }
    };

    loop(performance.now());
    const onEnter = () => {
      state.hovering = true;
    };
    const onLeave = () => {
      state.hovering = false;
    };
    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      state.pointer = event.pointerId;
      state.startX = event.clientX;
      state.startY = event.clientY;
      state.lastX = event.clientX;
      state.locked = false;
      state.dragging = false;
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerId !== state.pointer) return;
      const dx = event.clientX - state.startX;
      const dy = event.clientY - state.startY;
      if (!state.locked) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          state.pointer = -1;
          return;
        }
        state.locked = true;
        state.dragging = true;
        belt.classList.add("is-dragging");
        belt.setPointerCapture(event.pointerId);
      }
      const delta = event.clientX - state.lastX;
      const now = performance.now();
      const slice = Math.max(8, now - state.lastT);
      state.vel = (delta / slice) * 1000 * 0.8 + state.vel * 0.2;
      state.off += delta;
      state.lastX = event.clientX;
    };
    const onUp = (event: PointerEvent) => {
      if (event.pointerId !== state.pointer) return;
      state.pointer = -1;
      state.dragging = false;
      state.locked = false;
      belt.classList.remove("is-dragging");
    };
    const onVisibility = () => {
      state.hidden = document.hidden;
      state.lastT = 0;
      if (!document.hidden) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(loop);
      }
    };

    belt.addEventListener("pointerenter", onEnter);
    belt.addEventListener("pointerleave", onLeave);
    belt.addEventListener("pointerdown", onDown);
    belt.addEventListener("pointermove", onMove);
    belt.addEventListener("pointerup", onUp);
    belt.addEventListener("pointercancel", onUp);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      belt.removeEventListener("pointerenter", onEnter);
      belt.removeEventListener("pointerleave", onLeave);
      belt.removeEventListener("pointerdown", onDown);
      belt.removeEventListener("pointermove", onMove);
      belt.removeEventListener("pointerup", onUp);
      belt.removeEventListener("pointercancel", onUp);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="m-belt-block">
      <div className="m-belt" ref={beltRef}>
        <div className="m-scan" aria-hidden="true">
          <span className="m-scan-label" ref={labelRef}>
            Kane
          </span>
          <i className="m-scan-line" />
        </div>
        <canvas className="m-belt-fx" ref={canvasRef} />
        <div className="m-belt-stage">
          {BELT.map((card, index) => (
            <article
              key={card.id}
              className="m-belt-card"
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              aria-hidden="true"
            >
              <div
                className={`m-belt-receipt ${card.verdict}`}
                ref={(node) => {
                  receiptRefs.current[index] = node;
                }}
              >
                <p className="m-belt-kicker">Receipt</p>
                <h3>{card.title}</h3>
                <p className={`m-belt-verdict ${card.verdict}`}>{card.verdict}</p>
                <p className="m-belt-meta tabular">{card.attempts}</p>
                <p className="m-belt-commit">{card.commit}</p>
                <p className="m-belt-note">{card.note}</p>
              </div>
              <div
                className="m-belt-preview"
                ref={(node) => {
                  previewRefs.current[index] = node;
                }}
              >
                <p className="m-belt-kicker">Preview</p>
                <h3>{card.title}</h3>
                <ul>
                  {card.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="wrap m-belt-controls">
        <p className="m-belt-help">Drag the belt to scrub. It slows while the pointer is over it.</p>
        <div className="m-belt-buttons">
          <button type="button" className="btn btn-secondary" onClick={() => { nudge.current += 220; }}>
            Back
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => { nudge.current -= 220; }}>
            Forward
          </button>
        </div>
      </div>
      <div className="wrap">
        <ul className="m-belt-sources">
          {BELT.map((card) => (
            <li key={card.id}>
              <span className="m-belt-source-title">{card.title}</span>
              <span className={`m-belt-source-verdict ${card.verdict}`}>{card.verdict}</span>
              <span className="m-belt-source-links">
                {card.links.map((link) => (
                  <a key={link.href} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </span>
            </li>
          ))}
        </ul>
        <p className="m-belt-more">
          <Link href="/proof">Evidence packs and the full record</Link>
        </p>
      </div>
    </div>
  );
}
