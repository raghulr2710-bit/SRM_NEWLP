/**
 * Enquiry payload + validation. Shared by the client form and the API route so
 * the same rules run on both sides.
 */
import type { InstitutionKey, Level } from "@/types/institution";

export const INTENTS = [
  "enquiry",
  "counselling",
  "campus_visit",
  "brochure",
  "whatsapp_callback",
  "scholarship",
  "programme",
] as const;
export type Intent = (typeof INTENTS)[number];

export const INTENT_LABELS: Record<Intent, string> = {
  enquiry: "General enquiry",
  counselling: "Talk to an admission counsellor",
  campus_visit: "Plan a campus visit",
  brochure: "Request the brochure",
  whatsapp_callback: "Reach me on WhatsApp",
  scholarship: "Scholarship information",
  programme: "Programme information",
};

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;
export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

export const COUNTRY_CODES: { code: string; label: string; min: number; max: number }[] = [
  { code: "+91", label: "India (+91)", min: 10, max: 10 },
  { code: "+971", label: "UAE (+971)", min: 8, max: 9 },
  { code: "+966", label: "Saudi Arabia (+966)", min: 9, max: 9 },
  { code: "+974", label: "Qatar (+974)", min: 8, max: 8 },
  { code: "+968", label: "Oman (+968)", min: 8, max: 8 },
  { code: "+965", label: "Kuwait (+965)", min: 8, max: 8 },
  { code: "+973", label: "Bahrain (+973)", min: 8, max: 8 },
  { code: "+65", label: "Singapore (+65)", min: 8, max: 8 },
  { code: "+60", label: "Malaysia (+60)", min: 9, max: 10 },
  { code: "+94", label: "Sri Lanka (+94)", min: 9, max: 9 },
  { code: "+977", label: "Nepal (+977)", min: 10, max: 10 },
  { code: "+880", label: "Bangladesh (+880)", min: 10, max: 10 },
  { code: "+1", label: "USA / Canada (+1)", min: 10, max: 10 },
  { code: "+44", label: "United Kingdom (+44)", min: 10, max: 10 },
  { code: "+61", label: "Australia (+61)", min: 9, max: 9 },
  { code: "other", label: "Other country", min: 6, max: 14 },
];

export interface EnquiryInput {
  institution: InstitutionKey;
  name: string;
  countryCode: string;
  mobile: string;
  email: string;
  level: Level | "";
  programme: string;
  faculty?: string;
  intent: Intent;
  consent: boolean;
  utm?: UtmParams;
  landingPage?: string;
  referrer?: string;
  /** Honeypot – must stay empty. */
  website?: string;
  /** Epoch ms when the user first interacted with the form. */
  startedAt?: number;
  turnstileToken?: string;
}

export type FieldErrors = Partial<Record<"name" | "mobile" | "email" | "level" | "programme" | "faculty" | "consent" | "countryCode", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_RE = /^[\p{L}][\p{L} .'-]{1,79}$/u;

export function validateMobile(countryCode: string, raw: string): string | undefined {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "Enter your mobile number.";
  const cc = COUNTRY_CODES.find((c) => c.code === countryCode);
  if (!cc) return "Choose a country code.";
  if (countryCode === "+91") {
    if (!/^[6-9]\d{9}$/.test(digits)) return "Enter a valid 10-digit Indian mobile number.";
    return undefined;
  }
  if (digits.length < cc.min || digits.length > cc.max)
    return cc.min === cc.max
      ? `Enter a ${cc.min}-digit mobile number.`
      : `Enter a mobile number of ${cc.min}–${cc.max} digits.`;
  return undefined;
}

export function validateEnquiry(
  input: Partial<EnquiryInput>,
  opts: { requireFaculty?: boolean } = {},
): FieldErrors {
  const e: FieldErrors = {};
  const name = (input.name ?? "").trim();
  if (!name) e.name = "Enter the student's name.";
  else if (!NAME_RE.test(name)) e.name = "Use letters only (2–80 characters).";

  const mobileErr = validateMobile(input.countryCode ?? "", input.mobile ?? "");
  if (mobileErr) e.mobile = mobileErr;

  const email = (input.email ?? "").trim();
  if (!email) e.email = "Enter your email address.";
  else if (!EMAIL_RE.test(email) || email.length > 120) e.email = "Enter a valid email address, like name@example.com.";

  if (!input.level) e.level = "Choose UG or PG.";
  if (!input.programme) e.programme = "Choose a programme.";
  if (opts.requireFaculty && !input.faculty) e.faculty = "Choose a faculty / college.";
  if (!input.consent) e.consent = "Please agree so our counsellors can contact you.";
  return e;
}

export interface EnquiryResult {
  ok: boolean;
  mode: "live" | "mock";
  reference?: string;
  error?: string;
  fieldErrors?: FieldErrors;
}
