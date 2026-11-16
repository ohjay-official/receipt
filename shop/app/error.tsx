"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="rb">
      <div className="rb-wrap rb-sec">
        <p className="rb-pill">Error</p>
        <h1 className="rb-h1">This page did not print.</h1>
        <p className="rb-lead">The view failed before a receipt could be drawn. Try again, or go back to the home page.</p>
        <div className="rb-actions">
          <button className="rb-btn rb-btn-paper" type="button" onClick={() => reset()}>Try again</button>
          <Link className="rb-btn rb-btn-ghost" href="/">Back to Receipt</Link>
        </div>
      </div>
    </main>
  );
}
