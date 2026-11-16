"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Subnav({ items }: { items: { href: string; label: string }[] }) {
  const path = usePathname() || "/";
  const [hash, setHash] = useState(items.find((item) => item.href.startsWith("#"))?.href ?? "");

  useEffect(() => {
    const ids = items.map((item) => (item.href.startsWith("#") ? item.href.slice(1) : "")).filter(Boolean);
    const nodes = ids.map((id) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
    if (nodes.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setHash(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="rb-subnav" aria-label="On this page">
      <div className="rb-wrap rb-subnav-row">
        {items.map((item) => {
          const on = item.href.startsWith("#") ? hash === item.href : path === item.href;
          return (
            <a key={item.href} href={item.href} aria-current={on ? "true" : undefined}>
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
