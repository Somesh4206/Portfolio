import type { MetadataRoute } from "next";
import { PROJECTS, SITE } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date("2026-09-16"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}projects`,
      lastModified: new Date("2026-09-16"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...PROJECTS.map((p) => ({
      url: `${SITE.url}projects/${p.id}`,
      lastModified: new Date("2026-09-16"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
