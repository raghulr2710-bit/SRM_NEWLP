"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import type { InstitutionKey } from "@/types/institution";
import type { Intent } from "@/lib/enquiry";

interface Prefill {
  intent?: Intent;
  programme?: string;
  level?: string;
  /** Increments on every request so the form can react even to identical prefills. */
  nonce: number;
}

interface Ctx {
  institution: InstitutionKey;
  prefill: Prefill;
  openEnquiry: (p?: Omit<Prefill, "nonce">) => void;
}

const EnquiryCtx = createContext<Ctx | null>(null);

export const ENQUIRY_ANCHOR = "enquire";

/**
 * Lets any CTA on the page (programme cards, counsellor buttons, WhatsApp
 * fallback, campus visit…) pre-fill the enquiry form and move focus to it.
 * Also provides the global MotionConfig for the page.
 */
export function EnquiryProvider({ institution, children }: { institution: InstitutionKey; children: ReactNode }) {
  const [prefill, setPrefill] = useState<Prefill>({ nonce: 0 });

  const openEnquiry = useCallback((p: Omit<Prefill, "nonce"> = {}) => {
    setPrefill((prev) => ({ ...p, nonce: prev.nonce + 1 }));
    // Deferred so overlays (e.g. the mobile menu) can close and release scroll first.
    window.setTimeout(() => {
      const el = document.getElementById(ENQUIRY_ANCHOR);
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      window.setTimeout(() => {
        document.getElementById("enq-name")?.focus({ preventScroll: true });
      }, reduce ? 0 : 700);
    }, 80);
  }, []);

  const value = useMemo(() => ({ institution, prefill, openEnquiry }), [institution, prefill, openEnquiry]);

  return (
    <EnquiryCtx.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </EnquiryCtx.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryCtx);
  if (!ctx) throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  return ctx;
}
