"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV, REPO_URL } from "@/lib/site";

function Icon({ open }: { open: boolean }) {
  return open ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export default function RxNav({ solid = false }: { solid?: boolean }) {
  const [open, setOpen] = useState(false);
  const links = [...NAV.map((item) => ({ href: item.href, label: item.label })), { href: REPO_URL, label: "GitHub" }];
  return (
    <header className={solid ? "rx-nav rx-nav-solid" : "rx-nav"}>
      <div className="rx-nav-inner">
        <Link className="rx-brand" href="/" onClick={() => setOpen(false)}>
          Receipt
        </Link>
        <nav className="rx-links" aria-label="Primary">
          {links.map((item) =>
            item.href.startsWith("http") ? (
              <a key={item.href} href={item.href}>{item.label}</a>
            ) : (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ),
          )}
        </nav>
        <button type="button" className="rx-menu" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
          <Icon open={open} />
        </button>
      </div>
      <nav className={open ? "rx-drop is-open" : "rx-drop"} aria-label="Mobile">
        {links.map((item) =>
          item.href.startsWith("http") ? (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ) : (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
          ),
        )}
      </nav>
    </header>
  );
}
