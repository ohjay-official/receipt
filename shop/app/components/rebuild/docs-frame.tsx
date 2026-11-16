import DocsNav from "../docs-nav";

export default function DocsFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rb-wrap rb-docs-grid">
      <DocsNav />
      <div>{children}</div>
    </div>
  );
}
