import Link from "next/link";
import { HACKATHON_URL, REPO_URL, TAGLINE } from "@/lib/site";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/proof", label: "Proof" },
      { href: "/shop", label: "Demo shop" },
    ],
  },
  {
    title: "Docs",
    links: [
      { href: "/docs/install", label: "Install" },
      { href: "/docs/contract", label: "Contract" },
      { href: "/docs/configuration", label: "Configuration" },
      { href: "/docs/guardrails", label: "Guardrails" },
      { href: "/docs/limitations", label: "Limitations" },
    ],
  },
] as const;

export default function MarketingFooter() {
  return (
    <footer className="m-footer">
      <div className="wrap">
        <Link className="m-footer-mark" href="/">
          Receipt
        </Link>
        <div className="m-footer-grid">
          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav aria-label="Project">
            <h2>Project</h2>
            <ul>
              <li>
                <a href={REPO_URL}>GitHub repo</a>
              </li>
              <li>
                <a href={HACKATHON_URL}>Kane CLI hackathon</a>
              </li>
            </ul>
          </nav>
        </div>
        <p className="m-footer-note">{TAGLINE}</p>
      </div>
    </footer>
  );
}
