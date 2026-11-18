import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { LandingPage } from "@/components/LandingPage";
import { tiruchirappalli } from "@/data/institutions";
import { institutionMetadata } from "@/lib/site";

// Previous design, kept as an alternative at this URL (not indexed; canonical points to the live page).
// Identity: geometric display (Space Grotesk) + open humanist body (Manrope).
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-trichy-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-trichy-body", display: "swap" });

export const metadata: Metadata = {
  ...institutionMetadata(tiruchirappalli),
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <LandingPage
      inst={tiruchirappalli}
      fonts={{
        className: `${display.variable} ${body.variable}`,
        display: "var(--font-trichy-display), system-ui, sans-serif",
        body: "var(--font-trichy-body), system-ui, sans-serif",
      }}
    />
  );
}
