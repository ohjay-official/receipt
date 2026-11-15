import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Inter, Newsreader } from "next/font/google";
import SiteFrame from "./components/site-frame";
import { SITE_NAME, TAGLINE } from "@/lib/site";
import "./globals.css";
import "./marketing.css";
import "./strict.css";
import "./pages.css";
import "./balance.css";

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

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: TAGLINE,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable} ${inter.variable}`}>
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
