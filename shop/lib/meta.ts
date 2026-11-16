import type { Metadata } from "next";

/** Shared Open Graph, Twitter, and canonical tags. `path` is relative to metadataBase. */
export function pageMeta(title: string, description: string, path: string, ogTitle = title): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Receipt. Previewed. Verified." }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
