import { MapPin, Navigation, Phone } from "lucide-react";
import type { Institution } from "@/types/institution";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { EmailLink, EnquireButton, PhoneLink, WhatsAppButton } from "@/components/common/Cta";
import { PendingTag } from "@/components/common/Media";
import { btn } from "@/components/common/buttons";

/** Section 14 – Contact information with lazy-loaded map. */
export function Contact({ inst, index }: { inst: Institution; index: string }) {
  const c = inst.contact;
  const q = encodeURIComponent(c.mapQuery);
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y bg-surface-alt">
      <div className="container-x">
        <SectionHeading
          id="contact-title"
          index={index}
          eyebrow="Contact"
          title="Visit, call or write to us"
          intro="The admissions office is happy to help with programme choice, eligibility and campus visits."
        />
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="space-y-8 lg:col-span-5">
            <div>
              <h3 className="eyebrow mb-3 text-muted">Address</h3>
              <address className="flex gap-3 not-italic text-lg leading-relaxed text-ink">
                <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-accent-ink" />
                <span>
                  <strong className="block font-semibold">{inst.name}</strong>
                  {c.address}
                  {!c.addressVerified && (
                    <span className="mt-2 block">
                      <PendingTag className="text-accent-ink">Address to be confirmed</PendingTag>
                    </span>
                  )}
                </span>
              </address>
            </div>
            <div>
              <h3 className="eyebrow mb-3 text-muted">Admission helpline</h3>
              <ul className="space-y-2">
                {c.phones.map((p) => (
                  <li key={p.tel}>
                    <PhoneLink tel={p.tel} location="contact" className="inline-flex min-h-11 items-center gap-3 text-lg font-semibold text-ink hover:text-brand">
                      <Phone aria-hidden="true" className="h-5 w-5 text-accent-ink" />
                      <span>
                        {p.display} <span className="text-sm font-normal text-muted">({p.label})</span>
                      </span>
                    </PhoneLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow mb-3 text-muted">Email</h3>
              <ul className="space-y-2">
                {c.emails.map((e) => (
                  <li key={e}>
                    <EmailLink email={e} location="contact" className="inline-flex min-h-11 items-center gap-3 break-all text-lg font-semibold text-ink hover:text-brand" />
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3 border-t border-line pt-8">
              <EnquireButton intent="campus_visit" location="contact" className={btn.brand}>
                Plan a campus visit
              </EnquireButton>
              <WhatsAppButton
                number={c.whatsapp}
                message={`Hi, I'd like to know about admissions 2027–28 at ${inst.name}.`}
                location="contact"
                className={btn.outline}
                label={c.whatsapp ? "WhatsApp us" : "Request a WhatsApp callback"}
              />
            </div>
            {!c.whatsapp && (
              <p className="text-xs text-muted">
                A verified WhatsApp number has not been provided yet, so this button requests a WhatsApp callback through the enquiry form.
              </p>
            )}
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-line bg-white lg:aspect-auto lg:h-full lg:min-h-[28rem]">
              <iframe
                title={`Map showing ${inst.name}`}
                src={`https://www.google.com/maps?q=${q}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}
              target="_blank"
              rel="noopener"
              className={`${btn.link} mt-4 min-h-11`}
            >
              <Navigation aria-hidden="true" className="h-4 w-4" /> Get directions on Google Maps
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
