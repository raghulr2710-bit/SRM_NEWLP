import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { LandingPage } from "@/components/LandingPage";
import { trp } from "@/data/institutions";
import { institutionMetadata } from "@/lib/site";

// Previous design, kept as an alternative at this URL (not indexed; canonical points to the live page).
// Identity: one muscular grotesque (Archivo) for poster headlines and body.
const archivo = Archivo({ subsets: ["latin"], variable: "--font-trp", display: "swap" });

export const metadata: Metadata = {
  ...institutionMetadata(trp),
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <LandingPage
      inst={trp}
      fonts={{
        className: archivo.variable,
        display: "var(--font-trp), system-ui, sans-serif",
        body: "var(--font-trp), system-ui, sans-serif",
      }}
    />
  );
}
