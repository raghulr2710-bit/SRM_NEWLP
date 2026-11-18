import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { LiveLanding } from "@/components/live/LiveLanding";
import { trp } from "@/data/institutions";
import { trpSite } from "@/data/live/sites";
import { institutionMetadata } from "@/lib/site";

// Live design: live-site content with this institution's own identity (palette, display font, hero visual).
const display = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-trp2-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-trp2-body", display: "swap" });

const title = "SRM TRP Engineering College Admissions 2027 | Courses & Placements";
const description = "Start your journey to success at SRM TRP Engineering College, Tiruchirappalli. UG and PG engineering programmes, placements and campus life – admissions open for 2027.";
const base = institutionMetadata(trp);
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
      site={trpSite}
      fonts={{
        className: `${display.variable} ${body.variable}`,
        display: "var(--font-trp2-display), system-ui, sans-serif",
        body: "var(--font-trp2-body), system-ui, sans-serif",
      }}
    />
  );
}
