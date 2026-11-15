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

  useEffect(() => {
    const fit = () => {
      const narrow = window.matchMedia("(max-width: 699.98px)").matches;
      setMobile(narrow);
      const width = window.innerWidth;
      setScale(narrow ? 1 : Math.min(1, Math.max(width >= 1100 ? 0.8 : width / 1690, (width - 32) / 1690)));
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
        <p className="rx-vela-nav">Why it exists</p>
        <div className="rx-vela-intro">
          <h2 id="why-title">A preview can lie. The receipt says so.</h2>
          <p>Kane is the verdict. The fixer may patch shop source only. The same test runs again, at most three times.</p>
        </div>
        <div className="rx-vela-cards">
          <article className="rx-vcard" tabIndex={0} aria-label="The catch">
            <div className="v-limb" />
            <svg className="rx-vicon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M4 12h16M12 4c2.5 2.4 3.8 5 3.8 8s-1.3 5.6-3.8 8c-2.5-2.4-3.8-5-3.8-8s1.3-5.6 3.8-8z" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
            <span className="rx-vpill" style={{ left: 32, top: 80 }}>run 43698574333</span>
            <span className="rx-vpill" style={{ right: 32, top: 82 }}>pull request #3</span>
            <h3>The catch is a real browser on the preview.</h3>
          </article>
          <article className="rx-vcard v-mid" tabIndex={0} aria-label="The numbers" onMouseEnter={() => setHoverMid(true)} onMouseLeave={() => setHoverMid(false)} onFocus={() => setHoverMid(true)} onBlur={() => setHoverMid(false)}>
            <svg className="rx-vicon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="2.4" fill="currentColor" /></svg>
            <div className="v-orbit" />
            <div className="v-sphere" />
            <span className="rx-vpill" style={{ right: 36, top: 98 }}>{row[0]} checkout</span>
            <span className="rx-vpill" style={{ left: 28, top: 430 }}>{row[1]} on #4</span>
            <span className="rx-vpill" style={{ right: 24, top: 78 }}>{row[2]} attempts</span>
            <h3>Hover reads the real runs, not a sample chart.</h3>
          </article>
          <article className="rx-vcard" tabIndex={0} aria-label="The fence">
            <svg className="rx-vicon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14c2-6 4-8 8-8s6 2 8 8" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M8 14h8M12 14v5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
            <div className="v-band" />
            <div className="rx-vstatus"><span>Guardrail holds</span><em>working</em></div>
            <div className="rx-vstatus is-done"><span>shop/** only</span><em>done</em></div>
            <h3 style={{ fontSize: 48, top: 460 }}>Fenced.</h3>
          </article>
        </div>
      </div>
    </section>
  );
}
