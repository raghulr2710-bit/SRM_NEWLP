import { Fraunces, Inter } from "next/font/google";
import { LandingPage } from "@/components/LandingPage";
import { ramapuram } from "@/data/institutions";
import { institutionMetadata } from "@/lib/site";

// Identity: editorial serif display (Fraunces) + neutral grotesque body (Inter).
// Static weights (not the full variable font): the variable file carries optical-size axes
// that tripled style & layout time on throttled mobile (QA: TBT 500 ms → ~40–170 ms).
const display = Fraunces({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-rmp-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-rmp-body", display: "swap" });

export const metadata = institutionMetadata(ramapuram);

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
