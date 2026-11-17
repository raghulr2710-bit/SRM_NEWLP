import { ArrowUpRight, BookOpen, CalendarCheck, Clock, Headphones, MessageCircle, Award } from "lucide-react";
import type { Institution } from "@/types/institution";
import type { Intent } from "@/lib/enquiry";
import { EnquireButton, PhoneLink, WhatsAppButton } from "@/components/common/Cta";
import { Reveal } from "@/components/common/Reveal";
import { btn } from "@/components/common/buttons";

const ACTIONS: { intent: Intent; title: string; body: string; Icon: typeof Headphones }[] = [
  { intent: "counselling", title: "Talk to a counsellor", body: "Programme choice, eligibility and fees, answered for your marks and board.", Icon: Headphones },
  { intent: "campus_visit", title: "Plan a campus visit", body: "See the labs, library and hostels before you decide.", Icon: CalendarCheck },
  { intent: "brochure", title: "Request the brochure", body: "Programmes, facilities and admission details in one place.", Icon: BookOpen },
  { intent: "scholarship", title: "Ask about scholarships", body: "Find out which scholarship categories apply to you.", Icon: Award },
];

/**
 * Section 02 – Enquiry.
 * The form itself lives in the hero (visible in the first desktop viewport).
 * This section is the accessible standalone entry point: each action pre-sets
 * the request type and moves focus to the form; phone and WhatsApp stay one tap away.
 */
export function EnquirySection({ inst, index }: { inst: Institution; index: string }) {
  const phone = inst.contact.phones[0];
  const dark = inst.layout.hero === "geometric" || inst.layout.hero === "poster";

  return (
    <section
      id="connect"
      aria-labelledby="connect-title"
      className={`relative section-y ${dark ? "on-dark bg-brand-ink text-white" : "bg-surface-alt"}`}
    >
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-4 flex items-center gap-3 text-accent-ink">
            <span className={`font-mono ${dark ? "text-white/60" : "text-muted"}`}>{index}</span>
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            Enquire
          </p>
          <h2 id="connect-title" className={`type-h2 font-display text-balance ${dark ? "text-white" : "text-ink"}`}>
            {inst.enquiry.heading}
          </h2>
          <p className={`type-lead mt-4 ${dark ? "text-white/75" : "text-muted"}`}>{inst.enquiry.body}</p>

          <ol className="mt-8 space-y-4">
            {inst.enquiry.nextSteps.map((s, i) => (
              <li key={s} className="flex gap-4">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold ${
                    dark ? "bg-white/10 text-white" : "bg-brand text-on-brand"
                  }`}
                >
                  {i + 1}
                </span>
                <span className={`pt-1 ${dark ? "text-white/85" : "text-ink"}`}>{s}</span>
              </li>
            ))}
          </ol>

          <div className={`mt-8 flex flex-col gap-3 border-t pt-7 sm:flex-row sm:flex-wrap ${dark ? "border-white/15" : "border-line"}`}>
            {phone && (
              <PhoneLink tel={phone.tel} location="enquiry_section" className={dark ? btn.ghostLight : btn.outline} icon>
                {phone.label}: {phone.display}
              </PhoneLink>
            )}
            <WhatsAppButton
              number={inst.contact.whatsapp}
              message={`Hi, I'd like to know about admissions 2027–28 at ${inst.name}.`}
              location="enquiry_section"
              className={dark ? btn.ghostLight : btn.outline}
            />
          </div>
          <p className={`mt-4 flex items-center gap-2 text-sm ${dark ? "text-white/65" : "text-muted"}`}>
            <Clock aria-hidden="true" className="h-4 w-4" />
            Counsellors respond during office hours.
          </p>
        </Reveal>

        <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7 lg:self-center">
          {ACTIONS.map(({ intent, title, body, Icon }, i) => (
            <Reveal as="li" key={intent} delay={0.06 * i}>
              <EnquireButton
                intent={intent}
                location="enquiry_section"
                className={`group flex h-full w-full flex-col items-start gap-4 rounded-[var(--radius-card)] border p-6 text-left transition-[background-color,border-color,transform,box-shadow] duration-300 hover:-translate-y-1 ${
                  dark
                    ? "border-white/15 bg-white/[0.04] hover:border-white/40 hover:bg-white/[0.08]"
                    : "border-line bg-white hover:border-brand/40 hover:shadow-[0_24px_50px_-30px_rgba(10,20,50,0.4)]"
                }`}
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-full ${dark ? "bg-white/10 text-accent-ink" : "bg-brand-soft text-brand"}`}>
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="flex w-full items-start justify-between gap-3">
                  <span>
                    <span className={`type-h3 block font-display ${dark ? "text-white" : "text-ink"}`}>{title}</span>
                    <span className={`mt-1.5 block text-sm leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{body}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className={`mt-1 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${dark ? "text-white/60" : "text-muted"}`}
                  />
                </span>
              </EnquireButton>
            </Reveal>
          ))}
          <Reveal as="li" delay={0.24} className="sm:col-span-2">
            <p className={`flex items-center gap-2 text-sm ${dark ? "text-white/65" : "text-muted"}`}>
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              Each option opens the enquiry form at the top of the page with your request selected.
            </p>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
