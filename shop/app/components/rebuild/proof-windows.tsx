"use client";

import { useEffect, useState } from "react";
import { PROOF_ROWS } from "@/lib/site";
import { MiniSlip, Node, SectionHead } from "./bits";

export default function ProofWindows({ bare = false }: { bare?: boolean }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((n) => (n + 1) % PROOF_ROWS.length), 3500);
    return () => window.clearInterval(id);
  }, [paused]);

  const frame = (
    <div
      className="rb-frame rb-proof-frame"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="rb-chrome">
        <span>ohjay-official / receipt / pulls</span>
        <div className="rb-chrome-tabs rb-pr-tabs" role="tablist">
          {PROOF_ROWS.map((row, index) => (
            <button key={row.n} type="button" aria-selected={active === index} onClick={() => setActive(index)}>
              #{row.n}
            </button>
          ))}
        </div>
      </div>
      <div className="rb-slips">
        {PROOF_ROWS.map((row, index) => (
          <MiniSlip key={row.n} row={row} active={active === index} />
        ))}
      </div>
      <div className="rb-dots" role="tablist" aria-label="Pull requests">
        {PROOF_ROWS.map((row, index) => (
          <button key={row.n} type="button" aria-label={row.title} aria-current={active === index ? "true" : undefined} onClick={() => setActive(index)} />
        ))}
      </div>
    </div>
  );

  if (bare) return frame;

  return (
    <section className="rb-sec" id="proof-home" aria-labelledby="proof-home-title">
      <div className="rb-wrap">
        <Node label="Re-verify" />
        <SectionHead
          id="proof-home-title"
          pill="Proof"
          title={<>Five pull requests.<br />Still open.</>}
          lead="Five real pull requests ran the loop. Every receipt links its red run, its fix, and its green run."
          href="/proof"
          link="See the proof →"
        />
        {frame}
      </div>
    </section>
  );
}
