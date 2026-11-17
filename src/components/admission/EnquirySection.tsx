import { Clock, PhoneCall } from "lucide-react";
import type { Institution } from "@/types/institution";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ENQUIRY_ANCHOR } from "@/components/common/EnquiryContext";
import { PhoneLink, WhatsAppButton } from "@/components/common/Cta";
import { Reveal } from "@/components/common/Reveal";
import { btn } from "@/components/common/buttons";
import { toFormProps } from "@/lib/form-props";

/**
 * Section 02 – Enquiry form.
 * Visual treatment varies per institution:
 *  - editorial: light paper section, white card
 *  - geometric: brand band continuing from the hero, white floating card
 *  - heritage:  cream section, card with brand top rule
 *  - poster:    dark section, dark form
 */
export function EnquirySection({ inst, index }: { inst: Institution; index: string }) {
  const variant = inst.layout.hero;
  const dark = variant === "poster";
  const onColour = dark || variant === "geometric";
  const phone = inst.contact.phones[0];

  return (
    <section
      id={ENQUIRY_ANCHOR}
      aria-labelledby="enquire-title"
      className={`relative scroll-mt-20 ${onColour ? "on-dark " : ""}${dark ? "bg-brand-ink text-white" : variant === "geometric" ? "bg-brand-ink text-white" : "bg-surface-alt"} section-y`}
    >
      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-4 flex items-center gap-3 text-accent-ink">
            <span className={`font-mono ${onColour ? "text-white/60" : "text-muted"}`}>{index}</span>
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            Enquire
          </p>
          <h2
            id="enquire-title"
            className={`font-display text-[2rem] leading-[1.08] tracking-tight md:text-5xl ${
              onColour ? "text-white" : "text-ink"
            }`}
          >
            {inst.enquiry.heading}
          </h2>
          <p className={`mt-5 text-lg leading-relaxed ${onColour ? "text-white/80" : "text-muted"}`}>
            {inst.enquiry.body}
          </p>

          <ol className="mt-10 space-y-5">
            {inst.enquiry.nextSteps.map((s, i) => (
              <li key={s} className="flex gap-4">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold ${
                    onColour ? "bg-white/10 text-white" : "bg-brand text-on-brand"
                  }`}
                >
                  {i + 1}
                </span>
                <span className={`pt-1.5 ${onColour ? "text-white/85" : "text-ink"}`}>{s}</span>
              </li>
            ))}
          </ol>

          <div className={`mt-10 flex flex-col gap-3 border-t pt-8 sm:flex-row sm:flex-wrap ${onColour ? "border-white/15" : "border-line"}`}>
            {phone && (
              <PhoneLink tel={phone.tel} location="enquiry_section" className={onColour ? btn.ghostLight : btn.outline} icon>
                {phone.label}: {phone.display}
              </PhoneLink>
            )}
            <WhatsAppButton
              number={inst.contact.whatsapp}
              message={`Hi, I'd like to know about admissions 2027–28 at ${inst.name}.`}
              location="enquiry_section"
              className={onColour ? btn.ghostLight : btn.outline}
            />
          </div>
          <p className={`mt-4 flex items-center gap-2 text-sm ${onColour ? "text-white/65" : "text-muted"}`}>
            <Clock aria-hidden="true" className="h-4 w-4" />
            Counsellors respond during office hours. For urgent help, call the helpline.
          </p>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <div
            className={`relative rounded-[var(--radius-card)] p-6 sm:p-8 lg:p-10 ${
              dark
                ? "border border-white/15 bg-white/[0.04]"
                : `bg-white shadow-[0_30px_80px_-40px_rgba(10,20,50,0.45)] ${variant === "heritage" ? "border-t-4 border-brand" : ""}`
            }`}
          >
            <div className="mb-6 flex items-center gap-3">
              <PhoneCall aria-hidden="true" className={`h-5 w-5 ${dark ? "text-accent-ink" : "text-brand"}`} />
              <p className={`font-semibold ${dark ? "text-white" : "text-ink"}`}>Admission enquiry · 2027–28</p>
            </div>
            <EnquiryForm {...toFormProps(inst)} tone={dark ? "dark" : "light"} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
