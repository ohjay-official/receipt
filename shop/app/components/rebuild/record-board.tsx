"use client";

import { useEffect, useRef } from "react";
import { Node, ProofLedger, SectionHead } from "./bits";

const FLAPS = [
  { label: "Pull requests", value: "5", note: "All five still open" },
  { label: "Fixes pushed", value: "4", note: "9492501, e7542b0, 186ecdc, 55b2815" },
  { label: "Refused", value: "1", note: "PR #4, run 43700368892" },
  { label: "Seeded bugs", value: "3", note: "$29, LAUNCH10, Pay at 390px" },
];

export default function RecordBoard() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) node.classList.add("is-on");
    }, { threshold: 0.3 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="rb-sec" id="record" ref={ref} aria-labelledby="record-title">
      <div className="rb-wrap">
        <Node />
        <SectionHead
          id="record-title"
          pill="Record"
          title={<>A preview check<br />that leaves a record.</>}
          lead="Counts from this repo’s five proof pull requests, not a ticker. 49 action tests live in tests/action. Commit 186ecdc touched shop/lib/prices.ts and shop/lib/checkout.ts only."
        />
        <div className="rb-flaps">
          {FLAPS.map((flap) => (
            <article key={flap.label}>
              <span>{flap.label}</span>
              <b>{flap.value}</b>
              <p>{flap.note}</p>
            </article>
          ))}
        </div>
        <ProofLedger />
      </div>
    </section>
  );
}
