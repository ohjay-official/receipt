import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta(
  "Page not on the slip",
  "This path is not on the site. The seeded shop is still at /pricing and /checkout.",
);

export default function NotFound() {
  return (
    <main className="rb">
      <div className="rb-wrap rb-sec">
        <p className="rb-pill">404</p>
        <h1 className="rb-h1">This page is not on the slip</h1>
        <p className="rb-lead">
          No such path in this site. The contract Kane reads still lives at /pricing and /checkout.
        </p>
        <div className="rb-actions">
          <Link className="rb-btn rb-btn-paper" href="/">
            Back to Receipt
          </Link>
          <Link className="rb-btn rb-btn-ghost" href="/shop">
            Open the demo shop
          </Link>
        </div>
      </div>
    </main>
  );
}
