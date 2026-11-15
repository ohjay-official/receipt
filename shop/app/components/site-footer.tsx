import Link from "next/link";
import { NAV, REPO_URL, SITE_NAME, TAGLINE } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <p className="wordmark">{SITE_NAME}</p>
          <p className="footer-tag">{TAGLINE}</p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <a href={REPO_URL}>GitHub</a>
        </nav>
      </div>
    </footer>
  );
}
