"use client";

import type { ReactNode } from "react";
import { ArrowUpRight, Phone, Mail } from "lucide-react";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import type { Intent } from "@/lib/enquiry";
import { useEnquiry } from "./EnquiryContext";

const INTENT_EVENT: Partial<Record<Intent, AnalyticsEvent>> = {
  counselling: "counselling_request",
  campus_visit: "campus_visit_request",
  brochure: "brochure_request",
  scholarship: "scholarship_explore",
  whatsapp_callback: "whatsapp_click",
  programme: "programme_enquire",
};

export function ApplyButton({
  href,
  className,
  location,
  children = "Apply Now",
  icon = true,
}: {
  href: string;
  className: string;
  location: string;
  children?: ReactNode;
  icon?: boolean;
}) {
  const { institution } = useEnquiry();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={className}
      onClick={() => track("apply_now_click", institution, { location })}
    >
      {children}
      {icon && <ArrowUpRight aria-hidden="true" className="h-4 w-4" />}
      <span className="sr-only"> (opens the official application portal in a new tab)</span>
    </a>
  );
}

export function EnquireButton({
  intent = "enquiry",
  programme,
  level,
  className,
  location,
  children,
}: {
  intent?: Intent;
  programme?: string;
  level?: string;
  className: string;
  location: string;
  children: ReactNode;
}) {
  const { institution, openEnquiry } = useEnquiry();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const ev = INTENT_EVENT[intent];
        if (ev) track(ev, institution, { location, ...(programme ? { programme_name: programme } : {}) });
        openEnquiry({ intent, programme, level });
      }}
    >
      {children}
    </button>
  );
}

/** Official WhatsApp glyph (inherits currentColor). */
export function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.91.99 6.7 2.78a9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.47-9.47 9.47zm8.06-17.53A11.33 11.33 0 0 0 12.04.63C5.76.63.65 5.74.65 12.02c0 2.01.52 3.97 1.52 5.69L.55 23.6l6.04-1.58a11.37 11.37 0 0 0 5.44 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.19-5.9-3.33-8.05z" />
    </svg>
  );
}

/**
 * WhatsApp CTA. Uses wa.me when a verified number is configured; otherwise it
 * falls back to the enquiry form with "Reach me on WhatsApp" pre-selected, so
 * the link never points to an unverified number.
 */
export function WhatsAppButton({
  number,
  message,
  className,
  location,
  label = "WhatsApp Enquiry",
  showIcon = true,
  onAfter,
}: {
  number: string | null;
  message: string;
  className: string;
  location: string;
  label?: ReactNode;
  showIcon?: boolean;
  onAfter?: () => void;
}) {
  const { institution, openEnquiry } = useEnquiry();
  const icon = showIcon ? <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> : null;
  if (number) {
    return (
      <a
        href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener"
        className={className}
        onClick={() => track("whatsapp_click", institution, { location, method: "wa_me" })}
      >
        {icon}
        {label}
        <span className="sr-only"> (opens WhatsApp)</span>
      </a>
    );
  }
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        track("whatsapp_click", institution, { location, method: "callback_form" });
        onAfter?.();
        openEnquiry({ intent: "whatsapp_callback" });
      }}
    >
      {icon}
      {label}
    </button>
  );
}

export function PhoneLink({
  tel,
  children,
  className,
  location,
  icon = false,
}: {
  tel: string;
  children: ReactNode;
  className?: string;
  location: string;
  icon?: boolean;
}) {
  const { institution } = useEnquiry();
  return (
    <a href={`tel:${tel}`} className={className} onClick={() => track("phone_click", institution, { location })}>
      {icon && <Phone aria-hidden="true" className="h-4 w-4" />}
      {children}
    </a>
  );
}

export function EmailLink({ email, className, location }: { email: string; className?: string; location: string }) {
  const { institution } = useEnquiry();
  return (
    <a href={`mailto:${email}`} className={className} onClick={() => track("email_click", institution, { location })}>
      <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
      {email}
    </a>
  );
}
