import Link from "next/link";

export default function DemoBanner() {
  return (
    <p className="demo-banner" role="note">
      This is the demo shop Receipt guards. Kane reads these prices on the preview.{" "}
      <Link href="/proof">See what it caught</Link>
    </p>
  );
}
