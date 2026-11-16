"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#202A36", color: "#EEF0F5", fontFamily: "Georgia, serif" }}>
        <main style={{ maxWidth: 640, margin: "0 auto", padding: "96px 24px" }}>
          <p style={{ color: "#E36B74" }}>Error</p>
          <h1 style={{ fontSize: 40, fontWeight: 500, lineHeight: 1.1 }}>This page did not print.</h1>
          <p style={{ color: "#A3A9B8", fontSize: 18, lineHeight: 1.5 }}>The view failed before a receipt could be drawn.</p>
          <p style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button type="button" onClick={() => reset()} style={{ background: "#F4F1EA", color: "#202A36", border: 0, borderRadius: 8, padding: "12px 22px", fontSize: 16 }}>Try again</button>
            <a href="/" style={{ color: "#EEF0F5", padding: "12px 22px" }}>Back to Receipt</a>
          </p>
        </main>
      </body>
    </html>
  );
}
