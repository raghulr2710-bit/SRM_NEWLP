"use client";

import type { ReactNode } from "react";
import { ArrowUpRight, MessageCircle, Phone, Mail } from "lucide-react";
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
  const icon = showIcon ? <MessageCircle aria-hidden="true" className="h-4 w-4" /> : null;
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
