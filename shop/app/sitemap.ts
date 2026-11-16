import type { MetadataRoute } from "next";
import { PRODUCTION_URL } from "@/lib/site";

const PATHS = [
  "/",
  "/how-it-works",
  "/proof",
  "/docs",
  "/docs/install",
  "/docs/contract",
  "/docs/configuration",
  "/docs/guardrails",
  "/docs/limitations",
  "/privacy",
  "/pricing",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: path === "/" ? `${PRODUCTION_URL}/` : `${PRODUCTION_URL}${path}`,
  }));
}
