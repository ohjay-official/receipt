"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOC_NAV } from "@/lib/site";

export default function DocsNav() {
  const pathname = usePathname() || "/docs";
  return (
    <nav className="docs-nav" aria-label="Docs">
      {DOC_NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={pathname === item.href ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
