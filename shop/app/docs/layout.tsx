import DocsNav from "../components/docs-nav";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="docs-shell">
        <DocsNav />
        <div>{children}</div>
      </div>
    </main>
  );
}
