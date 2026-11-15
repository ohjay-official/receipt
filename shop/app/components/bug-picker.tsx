"use client";

import { useState } from "react";
import Link from "next/link";
import { PR3 } from "@/lib/site";

const BUGS = [
  {
    id: "price",
    name: "Price",
    mark: "$29",
    title: "Pricing says $19. Checkout charges $29.",
    onMain: "The plans page lists Pro at $19. Checkout totals $29.",
    caught:
      "On pull request #3, red run 43698574333 failed the step “Checkout must show $19 for Pro.”",
    changed: `Commit ${PR3.fixSha}, tagged receipt-fix: 1, edited shop/lib/prices.ts and shop/lib/checkout.ts only.`,
    outcome: `Green run 43699955024 passed that step. Attempts ${PR3.attempts}. Production on main still charges $29.`,
    shop: "/shop/pricing",
    shopLabel: "Open plans",
  },
  {
    id: "coupon",
    name: "Coupon",
    mark: "$17.10",
    title: "LAUNCH10 does nothing.",
    onMain:
      "The contract says LAUNCH10 takes 10% off $19, so the total should become $17.10. On main the total does not move.",
    caught:
      "On the red run, Kane skipped this step after the price failure. It was not recorded as its own failure.",
    changed: `The same commit ${PR3.fixSha} made LAUNCH10 yield $17.10.`,
    outcome:
      "The green re-verify passed “LAUNCH10 takes 10% off Pro.” On main the coupon still does nothing.",
    shop: "/shop/checkout",
    shopLabel: "Open checkout",
  },
  {
    id: "pay",
    name: "Pay",
    mark: "390px",
    title: "Pay is covered in Phone layout.",
    onMain:
      "At 900px wide and below, and when Phone layout (390px) is on, a panel covers the Pay button.",
    caught:
      "The red run skipped this step after the price failure. CI Chrome is 1920px and cannot resize, so the contract uses the in-page Phone layout control.",
    changed: `The same commit ${PR3.fixSha} turned that overlay off.`,
    outcome:
      "The green re-verify passed “Pay works in the phone layout.” On main the button is still covered.",
    shop: "/shop/checkout",
    shopLabel: "Open checkout",
  },
] as const;

export default function BugPicker() {
  const [current, setCurrent] = useState<(typeof BUGS)[number]["id"]>("price");
  const bug = BUGS.find((item) => item.id === current) ?? BUGS[0];

  return (
    <div className="m-bugs">
      <div className="m-bug-menu" role="tablist" aria-label="Seeded bugs">
        {BUGS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`bug-tab-${item.id}`}
            className="m-bug-tab"
            aria-selected={item.id === bug.id}
            aria-controls="bug-panel"
            onClick={() => setCurrent(item.id)}
          >
            <span>{item.name}</span>
            <span className="tabular">{item.mark}</span>
          </button>
        ))}
      </div>
      <div
        className="m-bug-panel"
        role="tabpanel"
        id="bug-panel"
        aria-labelledby={`bug-tab-${bug.id}`}
      >
        <h3>{bug.title}</h3>
        <dl>
          <div>
            <dt>On main</dt>
            <dd>{bug.onMain}</dd>
          </div>
          <div>
            <dt>What Kane caught</dt>
            <dd>{bug.caught}</dd>
          </div>
          <div>
            <dt>What the fixer changed</dt>
            <dd>{bug.changed}</dd>
          </div>
          <div>
            <dt>Outcome</dt>
            <dd>{bug.outcome}</dd>
          </div>
        </dl>
        <div className="actions">
          <Link className="btn" href={bug.shop}>
            {bug.shopLabel}
          </Link>
          <Link className="btn btn-secondary" href="/shop">
            Demo shop
          </Link>
        </div>
      </div>
    </div>
  );
}
