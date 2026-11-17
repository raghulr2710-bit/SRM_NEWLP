"use client";

import Script from "next/script";
import { useId, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ArrowUpRight, CheckCircle2, FlaskConical, Loader2, ShieldCheck } from "lucide-react";
import type { InstitutionKey, Level } from "@/types/institution";
import {
  COUNTRY_CODES,
  INTENT_LABELS,
  validateEnquiry,
  validateMobile,
  type EnquiryInput,
  type EnquiryResult,
  type FieldErrors,
  type Intent,
} from "@/lib/enquiry";
import { captureUtm } from "@/lib/utm";
import { track } from "@/lib/analytics";
import { useEnquiry } from "@/components/common/EnquiryContext";
import { btn } from "@/components/common/buttons";

export interface ProgrammeOption {
  value: string;
  level: Level;
  department: string;
}

export interface EnquiryFormProps {
  institution: InstitutionKey;
  institutionName: string;
  applyUrl: string;
  programmes: ProgrammeOption[];
  levels: Level[];
  faculties?: { label: string; options: string[] };
  consent: string;
  helpline?: { display: string; tel: string };
  tone?: "light" | "dark";
  compact?: boolean;
}

const FORM_INTENTS: Intent[] = ["enquiry", "programme", "counselling", "campus_visit", "whatsapp_callback", "brochure", "scholarship"];
const LEVEL_LABEL: Record<string, string> = { UG: "Undergraduate (UG)", PG: "Postgraduate (PG)" };
const levelMatches = (selected: string, l: Level) =>
  selected === "UG" ? l === "UG" || l === "Diploma" : selected === "PG" ? l === "PG" || l === "Research" : false;

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; mode: "live" | "mock"; reference?: string; firstName: string }
  | { kind: "error"; message: string };

const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function EnquiryForm(props: EnquiryFormProps) {
  const { institution, programmes, levels, faculties, consent, tone = "light", compact = false } = props;
  const dark = tone === "dark";
  const uid = useId();
  const { prefill } = useEnquiry();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef<number | null>(null);

  const [values, setValues] = useState({
    name: "",
    countryCode: "+91",
    mobile: "",
    email: "",
    level: levels.length === 1 ? levels[0] : ("" as Level | ""),
    programme: "",
    faculty: "",
    intent: "enquiry" as Intent,
    consent: false,
    website: "",
  });
  const [touched, setTouched] = useState<Partial<Record<keyof FieldErrors, boolean>>>({});
  const [serverErrors, setServerErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // Apply prefill requests from CTAs elsewhere on the page. Done during render
  // (React's "adjust state on prop change" pattern) rather than in an effect.
  const [seenNonce, setSeenNonce] = useState(0);
  if (prefill.nonce !== seenNonce) {
    setSeenNonce(prefill.nonce);
    if (status.kind === "success") setStatus({ kind: "idle" });
    const next = { ...values, intent: prefill.intent ?? values.intent };
    const match = prefill.programme ? programmes.find((p) => p.value === prefill.programme) : undefined;
    if (match) {
      next.programme = match.value;
      next.level = match.level === "Research" ? "PG" : match.level === "Diploma" ? "UG" : match.level;
    } else if (prefill.level) {
      next.level = prefill.level as Level;
    }
    setValues(next);
  }

  const clientErrors = useMemo(
    () => validateEnquiry(values, { requireFaculty: !!faculties }),
    [values, faculties],
  );
  const errors: FieldErrors = { ...clientErrors, ...serverErrors };
  const show = (k: keyof FieldErrors) => (touched[k] ? errors[k] : undefined);

  const options = useMemo(() => {
    const filtered = programmes.filter((p) => levelMatches(values.level, p.level));
    const groups = new Map<string, ProgrammeOption[]>();
    for (const p of filtered) groups.set(p.department, [...(groups.get(p.department) ?? []), p]);
    return [...groups.entries()];
  }, [programmes, values.level]);

  function set<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((v) => {
      const next = { ...v, [key]: value };
      if (key === "level" && v.programme && !programmes.some((p) => p.value === v.programme && levelMatches(String(value), p.level)))
        next.programme = "";
      return next;
    });
    if (key in serverErrors) setServerErrors((e) => ({ ...e, [key]: undefined }));
  }

  function onFirstInteraction() {
    if (startedAt.current) return;
    startedAt.current = Date.now();
    track("enquiry_form_start", institution);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    onFirstInteraction();
    const all = { name: true, mobile: true, email: true, level: true, programme: true, faculty: true, consent: true };
    setTouched(all);
    if (Object.keys(clientErrors).length > 0) {
      const first = (["name", "mobile", "email", "level", "programme", "faculty", "consent"] as const).find((k) => clientErrors[k]);
      if (first) document.getElementById(`enq-${first}`)?.focus();
      track("enquiry_form_error", institution, { reason: "validation", fields: Object.keys(clientErrors).join(",") });
      return;
    }

    setStatus({ kind: "submitting" });
    const turnstileToken =
      (formRef.current?.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement | null)?.value || undefined;
    const payload: EnquiryInput = {
      institution,
      name: values.name.trim(),
      countryCode: values.countryCode,
      mobile: values.mobile,
      email: values.email.trim(),
      level: values.level,
      programme: values.programme,
      faculty: values.faculty || undefined,
      intent: values.intent,
      consent: values.consent,
      website: values.website,
      startedAt: startedAt.current ?? undefined,
      utm: captureUtm(),
      landingPage: window.location.href.split("#")[0],
      referrer: document.referrer || undefined,
      turnstileToken,
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as EnquiryResult;
      if (data.ok) {
        setStatus({ kind: "success", mode: data.mode, reference: data.reference, firstName: payload.name.split(" ")[0] });
        // The success panel is shorter than the form; keep it in view.
        window.requestAnimationFrame(() =>
          document.getElementById("enquire")?.scrollIntoView({ block: "start", behavior: "smooth" }),
        );
        track("enquiry_form_submit", institution, {
          level: payload.level,
          programme_name: payload.programme,
          intent: payload.intent,
          crm_mode: data.mode,
          utm_source: payload.utm?.utm_source,
          utm_campaign: payload.utm?.utm_campaign,
        });
      } else {
        if (data.fieldErrors) setServerErrors(data.fieldErrors);
        setStatus({ kind: "error", message: data.error ?? "Something went wrong. Please try again." });
        track("enquiry_form_error", institution, { reason: `http_${res.status}` });
      }
    } catch {
      setStatus({ kind: "error", message: "You seem to be offline. Check your connection and try again." });
      track("enquiry_form_error", institution, { reason: "network" });
    }
  }

  // ----- styles -----
  const label = `mb-1.5 block text-sm font-semibold ${dark ? "text-white" : "text-ink"}`;
  const field = (invalid: boolean) =>
    `block w-full min-h-12 rounded-[var(--radius-card)] border px-3.5 text-base transition-colors outline-none focus-visible:outline-none focus:ring-2 ${
      dark
        ? "bg-white/[0.07] text-white placeholder:text-white/50 focus:ring-accent [&>option]:text-ink [&>optgroup]:text-ink"
        : "bg-white text-ink placeholder:text-muted/70 focus:ring-brand/40"
    } ${invalid ? "border-red-500 focus:ring-red-400/50" : dark ? "border-white/25 focus:border-accent" : "border-line focus:border-brand"}`;
  const errText = `mt-1.5 flex items-start gap-1.5 text-sm font-medium ${dark ? "text-red-200" : "text-red-700"}`;

  const errorMsg = (k: keyof FieldErrors) =>
    show(k) ? (
      <p id={`${uid}-${k}-err`} className={errText}>
        <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
        {show(k)}
      </p>
    ) : null;
  const describe = (k: keyof FieldErrors, hint?: string) =>
    [show(k) ? `${uid}-${k}-err` : null, hint].filter(Boolean).join(" ") || undefined;

  if (status.kind === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        aria-live="polite"
        className={`${dark ? "on-dark " : ""}flex flex-col gap-4 ${dark ? "text-white" : "text-ink"}`}
      >
        {status.mode === "live" ? (
          <>
            <CheckCircle2 aria-hidden="true" className="h-10 w-10 text-accent-ink" />
            <h3 className="font-display text-2xl">Thank you, {status.firstName}.</h3>
            <p className={dark ? "text-white/80" : "text-muted"}>
              Your enquiry has reached the {props.institutionName} admissions team. A counsellor will contact you soon.
              {status.reference && (
                <>
                  {" "}
                  Reference: <strong>{status.reference}</strong>
                </>
              )}
            </p>
          </>
        ) : (
          <>
            <FlaskConical aria-hidden="true" className="h-10 w-10 text-accent-ink" />
            <h3 className="font-display text-2xl">Test mode: enquiry not sent</h3>
            <p className={dark ? "text-white/80" : "text-muted"}>
              Your details passed validation, but this site is running in <strong>CRM mock mode</strong>, so nothing was sent
              to the admissions team. Set <code>CRM_ENDPOINT</code> and <code>CRM_MODE=live</code> to go live (see
              docs/CRM-INTEGRATION.md).
            </p>
            {props.helpline && (
              <p className={dark ? "text-white/80" : "text-muted"}>
                To reach admissions now, call{" "}
                <a className="font-semibold underline" href={`tel:${props.helpline.tel}`}>
                  {props.helpline.display}
                </a>
                .
              </p>
            )}
          </>
        )}
        <div className="flex flex-wrap gap-3 pt-2">
          <a href={props.applyUrl} target="_blank" rel="noopener" className={btn.accent} onClick={() => track("apply_now_click", institution, { location: "form_success" })}>
            Continue to application <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <button type="button" className={dark ? btn.outlineLight : btn.outline} onClick={() => setStatus({ kind: "idle" })}>
            Send another enquiry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} noValidate className={dark ? "on-dark" : undefined} onSubmit={onSubmit} onFocus={onFirstInteraction} aria-describedby={`${uid}-privacy`}>
      {TURNSTILE_KEY && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />}
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label htmlFor="enq-name" className={label}>
            Student name <span aria-hidden="true" className="text-accent-ink">*</span>
          </label>
          <input
            id="enq-name"
            name="name"
            autoComplete="name"
            required
            maxLength={80}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            aria-invalid={!!show("name")}
            aria-describedby={describe("name")}
            className={field(!!show("name"))}
            placeholder="As on your mark sheet"
          />
          {errorMsg("name")}
        </div>

        <div className={compact ? "" : "sm:col-span-2"}>
          <label htmlFor="enq-mobile" className={label}>
            Mobile number <span aria-hidden="true" className="text-accent-ink">*</span>
          </label>
          <div className="flex gap-2">
            <label htmlFor="enq-cc" className="sr-only">
              Country code
            </label>
            <select
              id="enq-cc"
              name="countryCode"
              autoComplete="tel-country-code"
              value={values.countryCode}
              onChange={(e) => set("countryCode", e.target.value)}
              className={`${field(false).replace("w-full", "")} w-[7.5rem] shrink-0 pr-2`}
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code === "other" ? "Other" : c.code} {c.code !== "other" && `· ${c.label.split(" (")[0]}`}
                </option>
              ))}
            </select>
            <input
              id="enq-mobile"
              name="mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              required
              maxLength={16}
              value={values.mobile}
              onChange={(e) => set("mobile", e.target.value.replace(/[^\d\s-]/g, ""))}
              onBlur={() => setTouched((t) => ({ ...t, mobile: true }))}
              aria-invalid={!!show("mobile")}
              aria-describedby={describe("mobile", `${uid}-mobile-hint`)}
              className={`${field(!!show("mobile"))} min-w-0 flex-1`}
              placeholder={values.countryCode === "+91" ? "10-digit mobile" : "Mobile number"}
            />
          </div>
          <p id={`${uid}-mobile-hint`} className={`mt-1.5 text-xs ${dark ? "text-white/60" : "text-muted"}`}>
            {values.countryCode === "+91" && !validateMobile("+91", values.mobile)
              ? "Looks good."
              : "We'll call or WhatsApp you on this number."}
          </p>
          {errorMsg("mobile")}
        </div>

        <div className={compact ? "" : "sm:col-span-2"}>
          <label htmlFor="enq-email" className={label}>
            Email address <span aria-hidden="true" className="text-accent-ink">*</span>
          </label>
          <input
            id="enq-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={120}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            aria-invalid={!!show("email")}
            aria-describedby={describe("email")}
            className={field(!!show("email"))}
            placeholder="name@example.com"
          />
          {errorMsg("email")}
        </div>

        {faculties && (
          <div className={compact ? "" : "sm:col-span-2"}>
            <label htmlFor="enq-faculty" className={label}>
              {faculties.label} <span aria-hidden="true" className="text-accent-ink">*</span>
            </label>
            <select
              id="enq-faculty"
              name="faculty"
              value={values.faculty}
              onChange={(e) => set("faculty", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, faculty: true }))}
              aria-invalid={!!show("faculty")}
              aria-describedby={describe("faculty")}
              className={field(!!show("faculty"))}
            >
              <option value="">Select {faculties.label.toLowerCase()}</option>
              {faculties.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            {errorMsg("faculty")}
          </div>
        )}

        <fieldset>
          <legend className={label}>
            Preferred level <span aria-hidden="true" className="text-accent-ink">*</span>
          </legend>
          <div
            className="grid grid-cols-2 gap-2"
            role="radiogroup"
            aria-invalid={!!show("level")}
            aria-describedby={describe("level")}
          >
            {levels.map((l) => (
              <label
                key={l}
                className={`flex min-h-12 cursor-pointer items-center justify-center rounded-[var(--radius-card)] border text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent ${
                  values.level === l
                    ? dark
                      ? "border-accent bg-accent text-on-accent"
                      : "border-brand bg-brand text-on-brand"
                    : dark
                      ? "border-white/25 text-white hover:border-white/60"
                      : "border-line text-ink hover:border-brand"
                }`}
              >
                <input
                  id={l === levels[0] ? "enq-level" : undefined}
                  type="radio"
                  name="level"
                  value={l}
                  checked={values.level === l}
                  onChange={() => {
                    set("level", l);
                    setTouched((t) => ({ ...t, level: true }));
                  }}
                  className="sr-only"
                />
                <span aria-hidden="true">{l}</span>
                <span className="sr-only">{LEVEL_LABEL[l] ?? l}</span>
              </label>
            ))}
          </div>
          {errorMsg("level")}
        </fieldset>

        <div>
          <label htmlFor="enq-intent" className={label}>
            How can we help?
          </label>
          <select
            id="enq-intent"
            name="intent"
            value={values.intent}
            onChange={(e) => set("intent", e.target.value as Intent)}
            className={field(false)}
          >
            {FORM_INTENTS.map((i) => (
              <option key={i} value={i}>
                {INTENT_LABELS[i]}
              </option>
            ))}
          </select>
        </div>

        <div className={compact ? "" : "sm:col-span-2"}>
          <label htmlFor="enq-programme" className={label}>
            Preferred programme <span aria-hidden="true" className="text-accent-ink">*</span>
          </label>
          <select
            id="enq-programme"
            name="programme"
            value={values.programme}
            disabled={!values.level}
            onChange={(e) => set("programme", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, programme: true }))}
            aria-invalid={!!show("programme")}
            aria-describedby={describe("programme")}
            className={field(!!show("programme"))}
          >
            <option value="">{values.level ? "Select a programme" : "Choose UG or PG first"}</option>
            <option value="Not sure yet">Not sure yet – help me choose</option>
            {options.map(([dept, list]) => (
              <optgroup key={dept} label={dept}>
                {list.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.value}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {errorMsg("programme")}
        </div>

        {/* Honeypot: hidden from people and assistive tech, catches simple bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${uid}-website`}>Website</label>
          <input
            id={`${uid}-website`}
            tabIndex={-1}
            autoComplete="off"
            name="website"
            value={values.website}
            onChange={(e) => set("website", e.target.value)}
          />
        </div>

        <div className={compact ? "" : "sm:col-span-2"}>
          <label className={`flex cursor-pointer items-start gap-3 text-sm leading-relaxed ${dark ? "text-white/80" : "text-muted"}`}>
            <input
              id="enq-consent"
              type="checkbox"
              name="consent"
              checked={values.consent}
              onChange={(e) => {
                set("consent", e.target.checked);
                setTouched((t) => ({ ...t, consent: true }));
              }}
              aria-invalid={!!show("consent")}
              aria-describedby={describe("consent")}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[var(--accent)]"
            />
            <span>
              {consent} <span aria-hidden="true" className="text-accent-ink">*</span>
            </span>
          </label>
          {errorMsg("consent")}
        </div>

        {TURNSTILE_KEY && (
          <div className={compact ? "" : "sm:col-span-2"}>
            <div className="cf-turnstile" data-sitekey={TURNSTILE_KEY} data-theme={dark ? "dark" : "light"} />
          </div>
        )}
      </div>

      <AnimatePresence>
        {status.kind === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="overflow-hidden"
          >
            <div className="mt-5 flex gap-3 rounded-[var(--radius-card)] border border-red-300 bg-red-50 p-4 text-sm text-red-800">
              <AlertCircle aria-hidden="true" className="h-5 w-5 shrink-0" />
              <p>
                {status.message}
                {props.helpline && (
                  <>
                    {" "}
                    Or call{" "}
                    <a className="font-semibold underline" href={`tel:${props.helpline.tel}`}>
                      {props.helpline.display}
                    </a>
                    .
                  </>
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button type="submit" disabled={status.kind === "submitting"} className={`${btn.accent} mt-6 w-full !min-h-14 text-base`}>
        {status.kind === "submitting" ? (
          <>
            <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
            Submitting…
          </>
        ) : (
          "Submit Enquiry"
        )}
      </button>
      <p id={`${uid}-privacy`} className={`mt-4 flex items-start gap-2 text-xs leading-relaxed ${dark ? "text-white/60" : "text-muted"}`}>
        <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
        Your details are used only to respond to your admission enquiry and are shared only with the {props.institutionName} admissions
        team. We never share them with advertisers.
      </p>
    </form>
  );
}
