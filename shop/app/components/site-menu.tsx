"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOC_NAV, NAV, REPO_URL } from "@/lib/site";

type Item = { label: string; href: string; children?: Item[] };

const TREE: Item[] = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Proof", href: "/proof" },
  {
    label: "Demo shop",
    href: "/shop",
    children: [
      { label: "Pricing", href: "/shop/pricing" },
      { label: "Cart", href: "/shop/cart" },
      { label: "Checkout", href: "/shop/checkout" },
    ],
  },
  {
    label: "Docs",
    href: "/docs",
    children: DOC_NAV.map((item) => ({ label: item.label, href: item.href })),
  },
  { label: "Install", href: "/docs/install" },
  { label: "GitHub", href: REPO_URL },
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
        <p id={titleId}>Menu</p>
        <button type="button" data-menu-close className="rx-menu-close" onClick={() => setOpen(false)}>
          Close
        </button>
      </div>
      <nav aria-label="All pages">
        {TREE.map((item) => (
          <div key={item.href + item.label} className="rx-menu-group">
            <ItemLink item={item} pathname={pathname} onNavigate={() => setOpen(false)} />
            {item.children ? (
              <div className="rx-menu-sub">
                {item.children.map((child) => (
                  <ItemLink key={child.href} item={child} pathname={pathname} onNavigate={() => setOpen(false)} />
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </nav>
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
