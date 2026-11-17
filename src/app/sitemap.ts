import type { MetadataRoute } from "next";
import { institutionList } from "@/data/institutions";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 0.5 },
    ...institutionList.map((i) => ({
      url: `${base}${i.route}`,
      changeFrequency: "weekly" as const,
      priority: 1,
    })),
  ];
}
