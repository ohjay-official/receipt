import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif, Inter, Newsreader } from "next/font/google";
import SiteFrame from "./components/site-frame";
import { PRODUCTION_URL, SITE_NAME } from "@/lib/site";
import "./globals.css";
import "./marketing.css";
import "./strict.css";
import "./pages.css";
import "./balance.css";
import "./canvas.css";
import "./rebuild.css";

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

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const plex = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#202A36",
};

export const metadata: Metadata = {
  metadataBase: new URL(PRODUCTION_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: "Receipt is a GitHub Action. It waits for the Vercel preview, runs Kane on the README contract, and leaves a receipt on the pull request.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable} ${inter.variable} ${plex.variable}`}>
      <body>
        <SiteFrame>{children}</SiteFrame>
        <Analytics />
      </body>
    </html>
  );
}
