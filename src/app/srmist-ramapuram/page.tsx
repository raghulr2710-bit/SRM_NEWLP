import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { LiveLanding } from "@/components/live/LiveLanding";
import { ramapuramSite } from "@/data/live/sites";
import { ramapuram } from "@/data/institutions";
import { institutionMetadata } from "@/lib/site";

// Live design (formerly option 2): clean geometric sans (Poppins) for headings, Inter for body text.
const display = Poppins({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-rmp2-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-rmp2-body", display: "swap" });

const title = "SRMIST Ramapuram Admissions 2027 | Courses, Eligibility & Placements";
const description =
  "Shape your future at SRM Institute of Science and Technology, Ramapuram. Courses and eligibility, rankings, placements and campus life – registrations open for 2027.";

const base = institutionMetadata(ramapuram);
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
      site={ramapuramSite}
      fonts={{
        className: `${display.variable} ${body.variable}`,
        display: "var(--font-rmp2-display), system-ui, sans-serif",
        body: "var(--font-rmp2-body), system-ui, sans-serif",
      }}
    />
  );
}
