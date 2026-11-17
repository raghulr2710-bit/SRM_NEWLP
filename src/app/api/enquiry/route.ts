import { institutions, isInstitutionKey } from "@/data/institutions";
import { CrmError, getCrmConfig, sendToCrm, toLead, verifyTurnstile } from "@/lib/crm";
import { INTENTS, validateEnquiry, type EnquiryInput, type EnquiryResult } from "@/lib/enquiry";

/**
 * POST /api/enquiry
 * Validates the enquiry, applies spam protection, and forwards it to the CRM
 * through the adapter in src/lib/crm.ts. In mock mode nothing is sent and the
 * response says so explicitly (`mode: "mock"`), so the UI never shows a fake
 * "submitted to admissions" success.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 2500;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function json(body: EnquiryResult, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";

  let input: EnquiryInput;
  try {
    input = (await request.json()) as EnquiryInput;
  } catch {
    return json({ ok: false, mode: "mock", error: "Invalid request." }, 400);
  }

  if (!isInstitutionKey(input.institution)) {
    return json({ ok: false, mode: "mock", error: "Unknown institution." }, 400);
  }
  const institution = institutions[input.institution];
  const cfg = getCrmConfig(institution.key);

  // Spam protection: honeypot + minimum fill time + rate limit + optional Turnstile.
  const tooFast = typeof input.startedAt === "number" && Date.now() - input.startedAt < MIN_FILL_MS;
  if (input.website || tooFast) {
    // Respond like a normal failure without revealing the reason.
    return json({ ok: false, mode: cfg.mode, error: "We couldn't submit your enquiry. Please try again." }, 400);
  }
  if (rateLimited(ip)) {
    return json({ ok: false, mode: cfg.mode, error: "Too many attempts. Please wait a few minutes and try again." }, 429);
  }
  if (!(await verifyTurnstile(input.turnstileToken, ip))) {
    return json({ ok: false, mode: cfg.mode, error: "Verification failed. Please refresh and try again." }, 400);
  }

  if (!INTENTS.includes(input.intent)) input.intent = "enquiry";
  const fieldErrors = validateEnquiry(input, { requireFaculty: !!institution.enquiry.faculties });
  if (Object.keys(fieldErrors).length > 0) {
    return json({ ok: false, mode: cfg.mode, error: "Please correct the highlighted fields.", fieldErrors }, 422);
  }
  const knownProgramme =
    institution.programmes.items.some((p) => `${p.degree} ${p.name}` === input.programme) ||
    input.programme === "Not sure yet";
  if (!knownProgramme) {
    return json({ ok: false, mode: cfg.mode, error: "Please choose a programme from the list.", fieldErrors: { programme: "Choose a programme from the list." } }, 422);
  }

  const lead = toLead(input, institution.name);

  if (cfg.mode === "mock") {
    // Deliberately no PII in logs.
    console.info(`[enquiry:mock] ${lead.institution} ${lead.level} "${lead.programme}" intent=${lead.intent} at ${lead.submittedAt}`);
    return json({ ok: true, mode: "mock" });
  }

  try {
    const { reference } = await sendToCrm(lead, cfg);
    return json({ ok: true, mode: "live", reference });
  } catch (err) {
    const status = err instanceof CrmError ? err.status : undefined;
    console.error(`[enquiry:crm-error] ${lead.institution} status=${status ?? "n/a"} ${err instanceof Error ? err.message : ""}`);
    return json(
      { ok: false, mode: "live", error: "Our enquiry system is temporarily unavailable. Please call the admissions helpline or try again shortly." },
      502,
    );
  }
}
