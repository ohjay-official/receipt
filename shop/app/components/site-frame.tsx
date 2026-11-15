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
        <SiteMenu />
        {children}
        <VantixFooter />
      </div>
    );
  }
  return (
    <div className="page rx">
      {home ? null : <SiteMenu />}
      {children}
      <VantixFooter />
    </div>
  );
}
