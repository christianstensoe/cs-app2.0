import type { MetadataRoute } from "next";
import { site } from "@/lib/cv";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/resume", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));
}
