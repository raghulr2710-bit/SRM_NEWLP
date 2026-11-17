import type { Metadata } from "next";
import type { Institution } from "@/types/institution";

/** Public base URL (no trailing slash). Set NEXT_PUBLIC_SITE_URL in each environment. */
export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

export function institutionMetadata(inst: Institution): Metadata {
  return {
    title: inst.seo.title,
    description: inst.seo.description,
    keywords: inst.seo.keywords,
    alternates: { canonical: inst.route },
    openGraph: {
      type: "website",
      url: inst.route,
      siteName: inst.name,
      title: inst.seo.title,
      description: inst.seo.description,
      locale: "en_IN",
    },
    twitter: { card: "summary_large_image", title: inst.seo.title, description: inst.seo.description },
    robots: { index: true, follow: true },
  };
}
