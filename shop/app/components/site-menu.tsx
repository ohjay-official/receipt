"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOC_NAV, HACKATHON_URL, NAV, REPO_URL } from "@/lib/site";

type Item = { label: string; href: string; blurb?: string; children?: Item[] };

const TREE: Item[] = [
  { label: "Home", href: "/", blurb: "The jet, the loop, the receipt" },
  { label: "How it works", href: "/how-it-works", blurb: "Catch, fix, re-verify" },
  { label: "Proof", href: "/proof", blurb: "Five real pull requests" },
  {
    label: "Demo shop",
    href: "/shop",
    blurb: "The seeded store Kane reads",
    children: [
      { label: "Pricing", href: "/shop/pricing" },
      { label: "Cart", href: "/shop/cart" },
      { label: "Checkout", href: "/shop/checkout" },
    ],
  },
  {
    label: "Docs",
    href: "/docs",
    blurb: "Install, contract, guardrails",
    children: DOC_NAV.map((item) => ({ label: item.label, href: item.href })),
  },
];

function isCurrent(pathname: string, href: string, exact = false) {
  if (href.startsWith("http") || href === "/") return pathname === "/" && href === "/";
  if (href === "/shop/pricing") return pathname === "/shop/pricing" || pathname === "/pricing";
  if (href === "/shop/checkout") return pathname === "/shop/checkout" || pathname === "/checkout";
  if (exact) return pathname === href;
  if (href === "/shop") {
    return pathname === "/shop" || pathname.startsWith("/shop/") || pathname === "/pricing" || pathname === "/checkout";
  }
  if (href === "/docs") return pathname === "/docs" || pathname.startsWith("/docs/");
  return pathname === href || pathname.startsWith(`${href}/`);
}

function ItemLink({ item, pathname, onNavigate }: { item: Item; pathname: string; onNavigate: () => void }) {
  const current = isCurrent(pathname, item.href, Boolean(item.children));
  const className = current ? "is-current" : undefined;
  if (item.href.startsWith("http")) {
    return (
      <a href={item.href} onClick={onNavigate}>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} aria-current={current ? "page" : undefined} className={className} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

export default function SiteMenu({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.classList.add("rx-menu-lock");
    const panel = panelRef.current;
    const close = panel?.querySelector<HTMLElement>("[data-menu-close]");
    close?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusable = [...panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("rx-menu-lock");
      previouslyFocused?.focus?.();
    };
  }, [open]);

  const panel = open ? (
    <div
      ref={panelRef}
      id="site-menu"
      className="rx-menu-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="rx-menu-panel-bar">
        <Link href="/" id={titleId} onClick={() => setOpen(false)}>Receipt</Link>
        <div>
          <Link className="rx-pill rx-pill-ink" href="/docs/install" onClick={() => setOpen(false)}>Install</Link>
          <button type="button" data-menu-close className="rx-menu-close" onClick={() => setOpen(false)} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M4 4l10 10M14 4L4 14" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
          </button>
        </div>
      </div>
      <div className="rx-menu-grid">
        <nav aria-label="All pages">
          {TREE.map((item, index) => (
            <div key={item.href} className="rx-menu-group" style={{ animationDelay: `${index * 40}ms` }}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <ItemLink item={item} pathname={pathname} onNavigate={() => setOpen(false)} />
                <p>{item.blurb}</p>
                {item.children ? (
                  <div className="rx-menu-sub">
                    {item.children.map((child) => (
                      <ItemLink key={child.href} item={child} pathname={pathname} onNavigate={() => setOpen(false)} />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </nav>
        <aside>
          <img src="/hero/jet-poster.jpg" alt="" />
          <p>Don&apos;t merge a preview without a Receipt.</p>
          <div className="rx-menu-slip">
            <b>Pull request #3</b>
            <strong>passed</strong>
            <span>186ecdc · 1 / 3 · green run 43699955024</span>
          </div>
          <p className="rx-menu-out">
            <a href={REPO_URL}>GitHub</a>
            <a href={HACKATHON_URL}>Kane CLI hackathon</a>
          </p>
        </aside>
      </div>
      <p className="rx-menu-foot">© 2026 Receipt</p>
    </div>
  ) : null;

  return (
    <header className={overlay ? "rx-nav rx-nav-overlay" : "rx-nav rx-nav-solid"}>
      <div className="rx-nav-inner">
        <Link className="rx-brand" href="/">
          Receipt
        </Link>
        <nav className="rx-links" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
          <a href={REPO_URL}>GitHub</a>
        </nav>
        <button
          ref={buttonRef}
          type="button"
          className="rx-menu-btn"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-haspopup="dialog"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
      </div>
      {mounted && panel ? createPortal(panel, document.body) : null}
    </header>
  );
}
