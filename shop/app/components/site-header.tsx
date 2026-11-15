"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, REPO_URL, SITE_NAME } from "@/lib/site";

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const shopSection = pathname === "/shop" || pathname.startsWith("/shop/") || pathname === "/pricing" || pathname === "/checkout";

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="wordmark" href="/" onClick={() => setOpen(false)}>
          {SITE_NAME}
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="site-nav" className={open ? "nav nav-open" : "nav"} aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(pathname, item.href) || (item.href === "/shop" && shopSection) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a className="nav-external" href={REPO_URL} onClick={() => setOpen(false)}>
            GitHub
          </a>
          <Link className="btn btn-nav" href="/docs/install" onClick={() => setOpen(false)}>
            Install
          </Link>
        </nav>
      </div>
    </header>
  );
}
