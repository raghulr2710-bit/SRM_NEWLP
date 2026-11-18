import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { LiveLanding } from "@/components/live/LiveLanding";
import { easwari } from "@/data/institutions";
import { easwariSite } from "@/data/live/sites";
import { institutionMetadata } from "@/lib/site";

// Live design: live-site content with this institution's own identity (palette, display font, hero visual).
const display = Outfit({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-eec2-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-eec2-body", display: "swap" });

const title = "Easwari Engineering College Admissions 2027 | B.E., B.Tech, M.E. & Placements";
const description = "SRM Easwari Engineering College, Chennai – autonomous, NBA & NAAC accredited. Undergraduate and postgraduate programmes, placements and campus life – admissions open for 2027.";
const base = institutionMetadata(easwari);
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
      site={easwariSite}
      fonts={{
        className: `${display.variable} ${body.variable}`,
        display: "var(--font-eec2-display), system-ui, sans-serif",
        body: "var(--font-eec2-body), system-ui, sans-serif",
      }}
    />
  );
}
