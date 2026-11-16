import Rail from "../components/rebuild/rail";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="rb">
      <Rail />
      {children}
    </main>
  );
}
