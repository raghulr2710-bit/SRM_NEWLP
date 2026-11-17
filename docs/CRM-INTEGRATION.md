# CRM integration – enquiry form

The four landing pages share one enquiry API: `POST /api/enquiry`
([src/app/api/enquiry/route.ts](../src/app/api/enquiry/route.ts)).
The adapter that talks to the CRM lives in [src/lib/crm.ts](../src/lib/crm.ts).
Credentials are read from environment variables on the server and are never sent to the browser.

## Current status: **mock mode**

No CRM endpoint or credentials were provided, so the site runs with `CRM_MODE=mock`:

- Submissions are fully validated (client and server).
- **Nothing is sent to the admissions team.**
- The form shows a clearly labelled *"Test mode: enquiry not sent"* message, plus the helpline number. It never shows a fake "submitted" success.
- The server logs one line per mock submission with institution, level, programme and intent. No personal data is logged.

## Going live

1. Get the CRM API details from the admissions team (see *Information required* below).
2. Set the environment variables (see [.env.example](../.env.example)):
   ```
   CRM_MODE=live
   CRM_ADAPTER=meritto          # or "generic"
   CRM_ENDPOINT=https://…
   CRM_API_KEY=…
   CRM_SECRET_KEY=…             # Meritto only
   ```
   If each campus uses a different CRM form or key, use the per-institution variables (`CRM_ENDPOINT_RMP`, `CRM_API_KEY_TRICHY`, etc.).
3. Submit a test enquiry on each page and confirm the lead appears in the right CRM pipeline.

> **Note:** all four existing registration sites are hosted on **Meritto (NoPaperForms)**. The `meritto` adapter field mapping in `src/lib/crm.ts` (`merittoBody`) is a starting point. **Verify the exact field keys, header names and endpoint with the Meritto account team before go-live.**

## Request contract (browser → `/api/enquiry`)

```jsonc
{
  "institution": "rmp | trichy | eec | trp",
  "name": "Student name",
  "countryCode": "+91",          // or "other"
  "mobile": "9876543210",
  "email": "student@example.com",
  "level": "UG | PG",
  "programme": "B.Tech Computer Science and Engineering", // must exist in the institution data file, or "Not sure yet"
  "faculty": "Engineering and Technology",                // SRMIST pages only
  "intent": "enquiry | programme | counselling | campus_visit | brochure | whatsapp_callback | scholarship",
  "consent": true,
  "utm": { "utm_source": "", "utm_medium": "", "utm_campaign": "", "utm_term": "", "utm_content": "", "gclid": "", "fbclid": "" },
  "landingPage": "https://…/srmist-ramapuram?utm_source=…",
  "referrer": "https://www.google.com/",
  "website": "",                 // honeypot – must be empty
  "startedAt": 1763372950000,    // first interaction (ms)
  "turnstileToken": "…"          // only when Turnstile is enabled
}
```

## Lead forwarded to the CRM (generic adapter)

`POST CRM_ENDPOINT` with `Authorization: Bearer CRM_API_KEY` and this JSON body:

```jsonc
{
  "institution": "trp",
  "institutionName": "SRM TRP Engineering College",
  "name": "…", "countryCode": "+91", "mobile": "9876543210", "email": "…",
  "level": "UG", "programme": "B.E Mechanical Engineering", "faculty": null,
  "intent": "counselling", "consent": true,
  "source": "admissions-lp-2027",
  "campaign": { "utm_source": "google", "utm_medium": "cpc", "utm_campaign": "adm2027" },
  "landingPage": "…", "referrer": "…",
  "submittedAt": "2026-11-17T10:09:10.274Z"
}
```

The adapter accepts any 2xx response. If the response JSON contains `id`, `lead_id` or `reference`, it is shown to the student as their reference.

## Responses (`/api/enquiry` → browser)

| Status | Body | Meaning |
|---|---|---|
| 200 | `{ ok: true, mode: "live", reference? }` | Lead accepted by the CRM |
| 200 | `{ ok: true, mode: "mock" }` | Validated only. **Not sent.** UI shows test-mode message |
| 400 | `{ ok: false, error }` | Bad JSON, unknown institution, spam check failed |
| 422 | `{ ok: false, error, fieldErrors }` | Validation failed (shown next to fields) |
| 429 | `{ ok: false, error }` | Rate limited (5 per IP per 10 minutes) |
| 502 | `{ ok: false, mode: "live", error }` | CRM unavailable / timed out (10 s) |

## Validation and spam protection

- Name: letters, spaces, `.` `'` `-`, 2–80 characters.
- Mobile: India `+91` must be 10 digits starting 6–9. Other country codes have length rules in `COUNTRY_CODES` ([src/lib/enquiry.ts](../src/lib/enquiry.ts)).
- Email: format and length checks.
- Programme must be one of the institution's listed programmes.
- Consent is required.
- Honeypot field, a 2.5 s minimum fill time, and an in-memory per-IP rate limit.
  - The rate limit is per server instance. On serverless or multi-instance hosting, replace it with a shared store (e.g. Redis / Upstash) or rely on Turnstile and WAF rules.
- Optional **Cloudflare Turnstile**: set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`.

## UTM / campaign tracking

[src/lib/utm.ts](../src/lib/utm.ts) captures `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid` and `fbclid` on first landing (first-touch, kept for the browser session). It attaches them to every enquiry.

## Information required from the client

- [ ] CRM vendor confirmation (Meritto?) and API documentation
- [ ] Endpoint URL(s): one shared, or one per institution
- [ ] Access key / secret key per institution (delivered securely, not by email)
- [ ] Required lead fields and exact field keys (e.g. are State / City mandatory as on the current forms?)
- [ ] Programme / course codes, if the CRM expects IDs rather than names
- [ ] Lead source / campaign values to use
- [ ] Whether OTP verification of the mobile number (used on the current forms) is required on the new pages
- [ ] Success response format (to show the lead reference to students)
