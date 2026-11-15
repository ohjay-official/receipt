"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "./site-header";
import RxNav from "./rx-nav";
import VantixFooter from "./vantix-footer";
import Link from "next/link";
import { NAV, REPO_URL, SITE_NAME, TAGLINE } from "@/lib/site";

function isShopPath(pathname: string) {
  return pathname === "/shop" || pathname.startsWith("/shop/") || pathname === "/pricing" || pathname === "/checkout";
}

function ShopFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <p className="wordmark">{SITE_NAME}</p>
          <p className="footer-tag">{TAGLINE}</p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
          <a href={REPO_URL}>GitHub</a>
        </nav>
      </div>
    </footer>
  );
}

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const shop = isShopPath(pathname);
  const home = pathname === "/";
  if (shop) {
    return (
      <div className="page">
        <SiteHeader />
        {children}
        <ShopFooter />
      </div>
    );
  }
  return (
    <div className="page rx">
      {home ? null : <RxNav solid />}
      {children}
      <VantixFooter />
    </div>
  );
}
