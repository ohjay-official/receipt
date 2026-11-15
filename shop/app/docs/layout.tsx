import DocsNav from "../components/docs-nav";

const STILL = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/5c3ec08f-2dbf-4c0a-8588-f6106a789443.webp";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <header className="rx-page-hero rx-page-hero-compact">
        <div className="rx-page-still" style={{ backgroundImage: `url(${STILL})` }} aria-hidden="true" />
        <div className="rx-page-copy">
          <p className="rx-kicker">Docs</p>
          <p className="rx-page-title">Set the contract, then let Kane read it</p>
          <p>Install, the How-to-test block, the guardrails, and the limits that are already true.</p>
        </div>
      </header>
      <div className="rx-doc-layout">
        <DocsNav />
        <div>{children}</div>
      </div>
    </main>
  );
}
