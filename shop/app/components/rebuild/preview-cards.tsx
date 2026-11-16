"use client";

import { useRef, useState } from "react";
import { Node, SectionHead } from "./bits";

const CARDS = [
  {
    kicker: "Catch",
    title: "$29, failed checkout on PR #3",
    body: "Kane stopped on the required price step. Coupon and Pay never ran.",
    rows: ["Red run 43698574333", "Step 3 of 5", "Pull request #3"],
  },
  {
    kicker: "Fix",
    title: "1/3, shop files only, commit 186ecdc",
    body: "The fixer edited shop/lib/prices.ts and shop/lib/checkout.ts only.",
    rows: ["shop/lib/prices.ts", "shop/lib/checkout.ts", "receipt-fix: 1"],
  },
  {
    kicker: "Prove",
    title: "Re-verify all five steps, green run 43699955024",
    body: "The same contract ran again on the new preview and passed.",
    rows: ["5 steps passed", "Attempt 1 of 3", "Green run 43699955024"],
  },
];

export default function PreviewCards() {
  const scroller = useRef<HTMLDivElement>(null);
  const [dot, setDot] = useState(0);

  return (
    <section className="rb-sec" id="previews" aria-labelledby="preview-cards-title">
      <div className="rb-wrap">
        <Node />
        <SectionHead
          id="preview-cards-title"
          pill="Built for previews"
          title={<>Catch it. Fix it once.<br />Prove it again.</>}
          lead="One pull request, three states of the same card. The numbers are the runs, not a mock."
        />
        <div
          className="rb-cards"
          ref={scroller}
          onScroll={(event) => {
            const el = event.currentTarget;
            const width = el.clientWidth || 1;
            setDot(Math.round(el.scrollLeft / (width * 0.86)));
          }}
        >
          {CARDS.map((card) => (
            <article key={card.kicker}>
              <p>{card.kicker}</p>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <ul>
                {card.rows.map((row) => <li key={row}>{row}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <div className="rb-dots" aria-label="Cards">
          {CARDS.map((card, index) => (
            <button
              key={card.kicker}
              type="button"
              aria-label={card.kicker}
              aria-pressed={dot === index}
              onClick={() => {
                const el = scroller.current;
                if (!el) return;
                el.scrollTo({ left: index * el.clientWidth * 0.86, behavior: "smooth" });
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
