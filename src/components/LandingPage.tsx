import { MessageCircleQuestion } from "lucide-react";
import type { Institution, SectionKey } from "@/types/institution";
import { ThemeScope } from "@/components/common/ThemeScope";
import { EnquiryProvider } from "@/components/common/EnquiryContext";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { FloatingControls } from "@/components/common/FloatingControls";
import { GoogleAnalytics } from "@/components/common/Analytics";
import { JsonLd } from "@/components/common/JsonLd";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EnquireButton, PhoneLink } from "@/components/common/Cta";
import { btn } from "@/components/common/buttons";
import { Hero } from "@/components/admission/heroes";
import { EnquirySection } from "@/components/admission/EnquirySection";
import { WhyChooseUs } from "@/components/admission/WhyChooseUs";
import { AcademicExcellence } from "@/components/admission/AcademicExcellence";
import { Scholarships } from "@/components/admission/Scholarships";
import { AdmissionProcess } from "@/components/admission/AdmissionProcess";
import { FaqAccordion } from "@/components/admission/Faq";
import { Contact } from "@/components/admission/Contact";
import { FinalCta } from "@/components/admission/FinalCta";
import { ProgrammeExplorer } from "@/components/programmes/ProgrammeExplorer";
import { Placements } from "@/components/placements/Placements";
import { IndustryConnect } from "@/components/placements/IndustryConnect";
import { Infrastructure, CampusLife } from "@/components/campus/Infrastructure";
import { TestimonialCarousel } from "@/components/campus/Testimonials";

type SectionProps = { inst: Institution; index: string };

function ProgrammesSection({ inst, index }: SectionProps) {
  return (
    <section id="programmes" aria-labelledby="programmes-title" className="section-y bg-surface">
      <div className="container-x">
        <SectionHeading id="programmes-title" index={index} eyebrow="Programmes 2027–28" title={inst.programmes.heading} intro={inst.programmes.intro} />
        <ProgrammeExplorer institution={inst.key} programmes={inst.programmes.items} layout={inst.layout.programmes} />
        {inst.programmes.footnote && <p className="mt-10 max-w-3xl text-sm text-muted">{inst.programmes.footnote}</p>}
      </div>
    </section>
  );
}

function TestimonialsSection({ inst, index }: SectionProps) {
  const t = inst.testimonials;
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="section-y overflow-hidden bg-surface-alt">
      <div className="container-x">
        <SectionHeading id="testimonials-title" index={index} eyebrow="Student stories" title={t.heading} intro={t.intro} />
        <TestimonialCarousel items={t.items} pendingSlots={t.pendingSlots} note={t.note} />
      </div>
    </section>
  );
}

function FaqSection({ inst, index }: SectionProps) {
  const phone = inst.contact.phones[0];
  return (
    <section id="faqs" aria-labelledby="faqs-title" className="section-y bg-surface">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="faqs-title" index={index} eyebrow="FAQs" title="Questions, answered" />
            <div className="rounded-[var(--radius-card)] bg-brand-soft p-6">
              <MessageCircleQuestion aria-hidden="true" className="h-6 w-6 text-brand" />
              <p className="mt-3 font-display text-xl text-ink">Still have a question?</p>
              <p className="mt-1 text-sm text-muted">A counsellor can answer questions specific to your marks, board and programme.</p>
              <div className="mt-5 flex flex-col gap-2">
                <EnquireButton intent="counselling" location="faq" className={btn.brand}>
                  Ask a counsellor
                </EnquireButton>
                {phone && (
                  <PhoneLink tel={phone.tel} location="faq" className={`${btn.outline}`} icon>
                    {phone.display}
                  </PhoneLink>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          <FaqAccordion items={inst.faqs} />
        </div>
      </div>
    </section>
  );
}

const SECTIONS: Record<SectionKey, (p: SectionProps) => React.ReactNode> = {
  enquiry: EnquirySection,
  why: WhyChooseUs,
  programmes: ProgrammesSection,
  placements: Placements,
  industry: IndustryConnect,
  infrastructure: Infrastructure,
  academics: AcademicExcellence,
  scholarships: Scholarships,
  testimonials: TestimonialsSection,
  campusLife: CampusLife,
  process: AdmissionProcess,
  faqs: FaqSection,
  contact: Contact,
};

/**
 * Composes an institution's landing page: Hero (01) → configured section
 * order (02–14) → Final CTA (15) → Footer. Layout variants, section order,
 * theme and content all come from the institution's data file.
 */
export function LandingPage({
  inst,
  fonts,
}: {
  inst: Institution;
  fonts: { className: string; display: string; body: string };
}) {
  return (
    <ThemeScope theme={inst.theme} displayFont={fonts.display} bodyFont={fonts.body} fontClassName={fonts.className}>
      <EnquiryProvider institution={inst.key}>
        <JsonLd inst={inst} />
        <Header
          institution={{ name: inst.name, shortName: inst.shortName, logo: inst.logo, logoOnDark: inst.logoOnDark, applyUrl: inst.applyUrl, contact: inst.contact }}
        />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero inst={inst} />
          {inst.layout.order.map((key, i) => {
            const Section = SECTIONS[key];
            return <Section key={key} inst={inst} index={String(i + 2).padStart(2, "0")} />;
          })}
          <FinalCta inst={inst} />
        </main>
        <Footer inst={inst} />
        <FloatingControls
          institution={inst.key}
          applyUrl={inst.applyUrl}
          whatsapp={inst.contact.whatsapp}
          institutionName={inst.name}
        />
        <GoogleAnalytics institution={inst.key} />
      </EnquiryProvider>
    </ThemeScope>
  );
}
