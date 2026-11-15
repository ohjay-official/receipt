import DocsNav from "../components/docs-nav";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="rx-doc-layout">
        <DocsNav />
        <div>{children}</div>
      </div>
    </main>
  );
}
