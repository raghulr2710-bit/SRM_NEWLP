"use client";

import type { InstitutionKey } from "@/types/institution";

/**
 * GA4 event helper.
 *
 * - Events are always tagged with the institution key so one GA4 property can
 *   report per campus (or each campus can use its own property, see
 *   src/lib/ga.ts).
 * - Never pass personal data (name, phone, email) into params.
 */
export type AnalyticsEvent =
  | "apply_now_click"
  | "enquiry_form_start"
  | "enquiry_form_submit"
  | "enquiry_form_error"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "programme_view"
  | "programme_enquire"
  | "brochure_request"
  | "counselling_request"
  | "campus_visit_request"
  | "scholarship_explore";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const PII_KEYS = /name|email|phone|mobile|tel/i;

export function track(event: AnalyticsEvent, institution: InstitutionKey, params: Params = {}) {
  if (typeof window === "undefined") return;
  const safe: Params = { institution };
  for (const [k, v] of Object.entries(params)) {
    if (PII_KEYS.test(k) && k !== "programme_name") continue;
    safe[k] = v;
  }
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, safe);
  }
  window.gtag?.("event", event, safe);
}
