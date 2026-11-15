import type { Metadata } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import Link from "next/link";
import { SHOP_NAME } from "@/lib/prices";
import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SHOP_NAME,
    template: `%s — ${SHOP_NAME}`,
  },
  description: "A small press-supply shop. Monthly Pro membership is advertised at $19.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <div className="shell">
          <header className="site-header">
            <Link className="wordmark" href="/">
              {SHOP_NAME}
            </Link>
            <nav className="nav" aria-label="Primary">
              <Link href="/pricing">Plans</Link>
              <Link href="/checkout">Checkout</Link>
            </nav>
          </header>
          {children}
          <footer className="site-footer">
            <span>{SHOP_NAME}</span>
            <span>Invoice, not a subscription wall.</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
