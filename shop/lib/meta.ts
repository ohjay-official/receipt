import type { Metadata } from "next";

/** Title and description for a page, including the Open Graph and Twitter titles. */
export function pageMeta(title: string, description: string, ogTitle = title): Metadata {
  return {
    title,
    description,
    openGraph: { title: ogTitle, description },
    twitter: { title: ogTitle, description },
  };
}
