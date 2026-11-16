import Link from "next/link";

export default function NotFound() {
  return (
    <main className="rb">
      <div className="rb-wrap rb-sec">
        <p className="label">404</p>
        <h1>This page is not on the slip</h1>
        <p className="lede">
          No such path in this site. The contract Kane reads still lives at
          /pricing and /checkout.
        </p>
        <div className="actions">
          <Link className="rx-pill rx-pill-ink" href="/">
            Back to Receipt
          </Link>
          <Link className="rx-pill rx-pill-ghost" href="/shop">
            Open the demo shop
          </Link>
        </div>
      </div>
    </main>
  );
}
