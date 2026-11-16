"use client";

import { useEffect, useRef } from "react";
import { I, Node, Rows, SectionHead } from "./bits";

export default function CapSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-on");
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) node.classList.add("is-on");
    }, { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="rb-sec rb-cap" id="cap" ref={ref} aria-labelledby="cap-title">
      <div className="rb-wrap rb-split">
        <Node label="Fix" />
        <div className="rb-split-main">
          <SectionHead
            id="cap-title"
            pill="Cap"
            title={<>Three attempts,<br />then the loop stops.</>}
            lead="A fixer may edit shop source only. The cap is three receipt-fix commits, then Kane’s last result stands."
          />
          <Rows
            items={[
              { icon: I.file, title: "shop/** only", body: "Application source under shop. Unit tests under that tree are still refused." },
              { icon: I.stamp, title: "Max 3 receipt-fix commits", body: "PR #3 used one. The subject is receipt-fix: N, and the count stops at 3." },
              { icon: I.lock, title: "Tests and the contract are refused", body: "tests/, the README contract, .github, the action, and src stay untouched." },
            ]}
          />
        </div>
        <div className="rb-panel rb-cap-panel">
          <article className="rb-svc">
            <i data-tone="ok" />
            <div>
              <strong>Gemini fixer</strong>
              <span>fenced to shop/**</span>
            </div>
          </article>
          <div className="rb-stubs">
            <article className="rb-stub">
              <b>receipt-fix: 1 · 186ecdc · PR #3</b>
              <span className="rb-mini ok">USED, PASSED</span>
            </article>
            <article className="rb-stub is-blank">
              <b>receipt-fix: 2 · unused</b>
            </article>
            <article className="rb-stub is-blank">
              <b>receipt-fix: 3 · unused</b>
            </article>
          </div>
          <p className="rb-cap-note">a different pull request</p>
          <p className="rb-rubber">PR #4 · 0/3 · REFUSED · touched tests/checkout_test.md · run 43700368892</p>
        </div>
      </div>
    </section>
  );
}
