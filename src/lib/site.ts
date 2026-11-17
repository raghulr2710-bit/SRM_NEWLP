import type { Metadata } from "next";
import type { Institution } from "@/types/institution";

/**
 * Public base URL (no trailing slash).
 * Order: NEXT_PUBLIC_SITE_URL (set this for a custom domain) → Vercel production
 * domain → Vercel deployment URL (previews) → localhost.
 */
export function siteUrl(): string {
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const vercelDeploy = process.env.VERCEL_URL;
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_ENV === "production" && vercelProd ? `https://${vercelProd}` : "") ||
    (vercelDeploy ? `https://${vercelDeploy}` : "") ||
    "http://localhost:3000";
  return url.replace(/\/$/, "");
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
