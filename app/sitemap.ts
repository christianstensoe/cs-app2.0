import type { MetadataRoute } from "next";
import { site } from "@/lib/cv";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/resume", "/running", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));
}
