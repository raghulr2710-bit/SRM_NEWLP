/**
 * CRM integration adapter (server-only — imported by src/app/api/enquiry/route.ts).
 *
 * All credentials come from environment variables and never reach the browser.
 * See docs/CRM-INTEGRATION.md for the full contract.
 *
 *   CRM_MODE            "live" | "mock"  (defaults to "mock" when no endpoint is set)
 *   CRM_ADAPTER         "generic" | "meritto"   (default "generic")
 *   CRM_ENDPOINT        default endpoint for all institutions
 *   CRM_API_KEY         default API key / access key
 *   CRM_SECRET_KEY      default secret key (Meritto)
 *   CRM_ENDPOINT_<KEY>, CRM_API_KEY_<KEY>, CRM_SECRET_KEY_<KEY>
 *                       per-institution overrides, KEY = RMP | TRICHY | EEC | TRP
 */
import type { InstitutionKey } from "@/types/institution";
import type { EnquiryInput } from "./enquiry";

export interface CrmLead {
  institution: InstitutionKey;
  institutionName: string;
  name: string;
  countryCode: string;
  mobile: string;
  email: string;
  level: string;
  programme: string;
  faculty?: string;
  intent: string;
  consent: boolean;
  source: string;
  campaign: Record<string, string>;
  landingPage?: string;
  referrer?: string;
  submittedAt: string;
}

export interface CrmConfig {
  mode: "live" | "mock";
  adapter: "generic" | "meritto";
  endpoint?: string;
  apiKey?: string;
  secretKey?: string;
}

export function getCrmConfig(key: InstitutionKey): CrmConfig {
  const K = key.toUpperCase();
  const env = process.env;
  const endpoint = env[`CRM_ENDPOINT_${K}`] || env.CRM_ENDPOINT;
  const apiKey = env[`CRM_API_KEY_${K}`] || env.CRM_API_KEY;
  const secretKey = env[`CRM_SECRET_KEY_${K}`] || env.CRM_SECRET_KEY;
  const requested = env.CRM_MODE === "live" ? "live" : env.CRM_MODE === "mock" ? "mock" : undefined;
  const mode = requested ?? (endpoint ? "live" : "mock");
  return {
    mode,
    adapter: env.CRM_ADAPTER === "meritto" ? "meritto" : "generic",
    endpoint,
    apiKey,
    secretKey,
  };
}

export function toLead(input: EnquiryInput, institutionName: string): CrmLead {
  const campaign: Record<string, string> = {};
  for (const [k, v] of Object.entries(input.utm ?? {})) if (v) campaign[k] = v;
  return {
    institution: input.institution,
    institutionName,
    name: input.name.trim(),
    countryCode: input.countryCode,
    mobile: input.mobile.replace(/\D/g, ""),
    email: input.email.trim().toLowerCase(),
    level: input.level,
    programme: input.programme,
    faculty: input.faculty || undefined,
    intent: input.intent,
    consent: input.consent,
    source: process.env.CRM_SOURCE || "admissions-lp-2027",
    campaign,
    landingPage: input.landingPage?.slice(0, 500),
    referrer: input.referrer?.slice(0, 500),
    submittedAt: new Date().toISOString(),
  };
}

/** Field mapping for Meritto (NoPaperForms). VERIFY with the Meritto account team before go-live. */
function merittoBody(lead: CrmLead) {
  return {
    name: lead.name,
    email: lead.email,
    mobile: lead.mobile,
    country_dial_code: lead.countryCode === "other" ? "" : lead.countryCode,
    course: lead.programme,
    program: lead.level,
    faculty: lead.faculty ?? "",
    source: lead.campaign.utm_source || lead.source,
    medium: lead.campaign.utm_medium ?? "",
    campaign: lead.campaign.utm_campaign ?? "",
    utm_term: lead.campaign.utm_term ?? "",
    utm_content: lead.campaign.utm_content ?? "",
    gclid: lead.campaign.gclid ?? "",
    fbclid: lead.campaign.fbclid ?? "",
    enquiry_type: lead.intent,
    consent: lead.consent ? "Yes" : "No",
    landing_page: lead.landingPage ?? "",
    submitted_at: lead.submittedAt,
  };
}

export class CrmError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
  }
}

export async function sendToCrm(lead: CrmLead, cfg: CrmConfig): Promise<{ reference?: string }> {
  if (!cfg.endpoint) throw new CrmError("CRM endpoint is not configured.");
  const headers: Record<string, string> = { "Content-Type": "application/json", Accept: "application/json" };
  let body: unknown;
  if (cfg.adapter === "meritto") {
    if (cfg.apiKey) headers["access-key"] = cfg.apiKey;
    if (cfg.secretKey) headers["secret-key"] = cfg.secretKey;
    body = merittoBody(lead);
  } else {
    if (cfg.apiKey) headers.Authorization = `Bearer ${cfg.apiKey}`;
    body = lead;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch(cfg.endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) throw new CrmError(`CRM responded with ${res.status}`, res.status);
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    const ref = data.id ?? data.lead_id ?? data.reference ?? data.data;
    return { reference: typeof ref === "string" || typeof ref === "number" ? String(ref) : undefined };
  } catch (err) {
    if (err instanceof CrmError) throw err;
    throw new CrmError(err instanceof Error && err.name === "AbortError" ? "CRM request timed out." : "CRM request failed.");
  } finally {
    clearTimeout(timer);
  }
}

/** Optional Cloudflare Turnstile verification. Enabled when TURNSTILE_SECRET_KEY is set. */
export async function verifyTurnstile(token: string | undefined, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const form = new URLSearchParams({ secret, response: token });
  if (ip) form.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
      cache: "no-store",
    });
    const data = (await res.json()) as { success?: boolean };
    return !!data.success;
  } catch {
    return false;
  }
}
