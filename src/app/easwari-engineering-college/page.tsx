import { DM_Serif_Display, Source_Sans_3 } from "next/font/google";
import { LandingPage } from "@/components/LandingPage";
import { easwari } from "@/data/institutions";
import { institutionMetadata } from "@/lib/site";

// Identity: elegant high-contrast serif (DM Serif Display) + classic sans body (Source Sans 3).
const display = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-eec-display", display: "swap" });
const body = Source_Sans_3({ subsets: ["latin"], variable: "--font-eec-body", display: "swap" });

export const metadata = institutionMetadata(easwari);

export default function Page() {
  return (
    <LandingPage
      inst={easwari}
      fonts={{
        className: `${display.variable} ${body.variable}`,
        display: "var(--font-eec-display), Georgia, serif",
        body: "var(--font-eec-body), system-ui, sans-serif",
      }}
    />
  );
}
