import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { LandingPage } from "@/components/LandingPage";
import { ramapuram } from "@/data/institutions";
import { institutionMetadata } from "@/lib/site";

// Previous Ramapuram design, kept as an alternative at this URL (not indexed; canonical points to the live page).
// Identity: editorial serif display (Fraunces) + neutral grotesque body (Inter).
const display = Fraunces({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-rmp-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-rmp-body", display: "swap" });

export const metadata: Metadata = {
  ...institutionMetadata(ramapuram),
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <LandingPage
      inst={ramapuram}
      fonts={{
        className: `${display.variable} ${body.variable}`,
        display: "var(--font-rmp-display), Georgia, serif",
        body: "var(--font-rmp-body), system-ui, sans-serif",
      }}
    />
  );
}
