"use client";

import { usePathname } from "next/navigation";
import SiteMenu from "./site-menu";
import VantixFooter from "./vantix-footer";

function isShopPath(pathname: string) {
  return pathname === "/shop" || pathname.startsWith("/shop/") || pathname === "/pricing" || pathname === "/checkout";
}

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const shop = isShopPath(pathname);
  const home = pathname === "/";
  if (shop) {
    return (
      <div className="page rx shop-site">
        <a className="rb-skip" href="#main">Skip to content</a>
        <SiteMenu />
        <div id="main" tabIndex={-1}>{children}</div>
        <VantixFooter />
      </div>
    );
  }
  return (
    <div className="page rx">
      <a className="rb-skip" href="#main">Skip to content</a>
      {home ? null : <SiteMenu />}
      <div id="main" tabIndex={-1}>{children}</div>
      <VantixFooter />
    </div>
  );
}
