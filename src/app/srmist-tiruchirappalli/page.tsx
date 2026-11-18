import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { LiveLanding } from "@/components/live/LiveLanding";
import { tiruchirappalli } from "@/data/institutions";
import { tiruchirappalliSite } from "@/data/live/sites";
import { institutionMetadata } from "@/lib/site";

// Live design: live-site content with this institution's own identity (palette, display font, hero visual).
const display = Sora({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-trichy2-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-trichy2-body", display: "swap" });

const title = "SRMIST Tiruchirappalli Admissions 2027 | Courses, Eligibility & Placements";
const description = "Achieve career success at SRM Institute of Science and Technology, Tiruchirappalli. Courses and eligibility, rankings, placements and campus life – admissions open for 2027.";
const base = institutionMetadata(tiruchirappalli);
export const metadata: Metadata = {
  ...base,
  title,
  description,
  openGraph: { ...base.openGraph, title, description },
  twitter: { ...base.twitter, title, description },
};

export default function Page() {
  return (
    <LiveLanding
      site={tiruchirappalliSite}
      fonts={{
        className: `${display.variable} ${body.variable}`,
        display: "var(--font-trichy2-display), system-ui, sans-serif",
        body: "var(--font-trichy2-body), system-ui, sans-serif",
      }}
    />
  );
}
