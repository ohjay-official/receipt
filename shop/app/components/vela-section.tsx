"use client";

import { useEffect, useRef, useState } from "react";

const FRAMES = [
  ["$29", "skipped", "1"],
  ["$19", "passed", "1"],
  ["$29", "refused", "0"],
  ["$19", "passed", "1"],
];

export default function VelaSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [mobile, setMobile] = useState(false);
  const [frame, setFrame] = useState(0);
  const [hoverMid, setHoverMid] = useState(false);
  const [leftOn, setLeftOn] = useState(false);
  const [rightOn, setRightOn] = useState(false);

  useEffect(() => {
    const fit = () => {
      const narrow = window.matchMedia("(max-width: 699.98px)").matches;
      setMobile(narrow);
      setScale(narrow ? 1 : window.innerWidth / 1690);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    if (!hoverMid || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setFrame((n) => (n + 1) % FRAMES.length), 105);
    return () => window.clearInterval(id);
  }, [hoverMid]);

  const row = hoverMid ? FRAMES[frame] : ["$29", "0 / 3", "1 / 3"];

  return (
    <section className="rx-vela" aria-labelledby="why-title" style={{ height: mobile ? "auto" : 950 * scale }}>
      <div className="rx-vela-canvas" ref={wrapRef} style={mobile ? undefined : { transform: `scale(${scale})` }}>
        <div className="rx-vela-nav"><span>Receipt</span><span>Why it exists</span></div>
        <div className="rx-vela-intro">
          <h2 id="why-title">A preview can lie. The receipt says so.</h2>
          <p>Kane is the verdict. The fixer may patch shop source only. The same test runs again, at most three times.</p>
        </div>
        <div className="rx-vela-cards">
          <article className="rx-vcard" tabIndex={0} aria-label="The catch" onMouseEnter={() => setLeftOn(true)} onMouseLeave={() => setLeftOn(false)} onFocus={() => setLeftOn(true)} onBlur={() => setLeftOn(false)}>
            <div style={{ position: "absolute", inset: 0, background: "#202A36", transform: leftOn ? "scaleY(1.06)" : "none", transformOrigin: "50% 100%", transition: "transform 720ms cubic-bezier(.22,1,.36,1), filter 720ms cubic-bezier(.22,1,.36,1)", filter: leftOn ? "saturate(1.2)" : "none" }} />
            <span className="rx-vpill" style={{ left: 32, top: 80 }}>run 43698574333</span>
            <span className="rx-vpill" style={{ right: 32, top: 82 }}>pull request #3</span>
            <h3>The catch is a real browser on the preview.</h3>
          </article>
          <article className="rx-vcard" tabIndex={0} aria-label="The numbers" onMouseEnter={() => setHoverMid(true)} onMouseLeave={() => setHoverMid(false)} onFocus={() => setHoverMid(true)} onBlur={() => setHoverMid(false)}>
            <span className="rx-vpill" style={{ right: 36, top: 98 }}>{row[0]} checkout</span>
            <span className="rx-vpill" style={{ left: 40, top: 270 }}>{row[1]} on #4</span>
            <span className="rx-vpill" style={{ left: 60, top: 420 }}>{row[2]} attempts</span>
            <h3>Hover reads the real runs, not a sample chart.</h3>
          </article>
          <article className="rx-vcard" tabIndex={0} aria-label="The fence" onMouseEnter={() => setRightOn(true)} onMouseLeave={() => setRightOn(false)} onFocus={() => setRightOn(true)} onBlur={() => setRightOn(false)}>
            <div style={{ position: "absolute", left: 0, right: 0, top: rightOn ? 0 : 180, bottom: rightOn ? 0 : 280, background: rightOn ? "#3a4654" : "#2a3340", transition: "top 390ms cubic-bezier(.22,1,.36,1), bottom 390ms cubic-bezier(.22,1,.36,1), background 390ms linear" }} />
            <div className="rx-vpill" style={{ position: "absolute", left: 34, right: 34, top: 242, height: 37, borderRadius: 11 }}>Guardrail holds</div>
            <div className="rx-vpill" style={{ position: "absolute", left: 34, right: 34, top: 287, height: 37, borderRadius: 11 }}>shop/** only</div>
            <h3 style={{ fontSize: 48, top: 460 }}>Fenced.</h3>
          </article>
        </div>
      </div>
    </section>
  );
}
