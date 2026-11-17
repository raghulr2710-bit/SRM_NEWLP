import { Headphones } from "lucide-react";
import { isPending, type Institution } from "@/types/institution";
import { ApplyButton, EnquireButton, WhatsAppButton } from "@/components/common/Cta";
import { Reveal } from "@/components/common/Reveal";
import { MediaFill } from "@/components/common/Media";
import { btn } from "@/components/common/buttons";

/** Section 15 – Final call to action: full-bleed closing photograph with a single clear next step. */
export function FinalCta({ inst }: { inst: Institution }) {
  const img = inst.finalCta.image && !isPending(inst.finalCta.image) ? inst.finalCta.image : inst.hero.image;
  return (
    <section aria-labelledby="final-cta-title" className="on-dark relative isolate overflow-hidden bg-brand-ink py-24 text-on-brand lg:py-32">
      <Reveal mask y={0} className="absolute inset-0 -z-20">
        <MediaFill media={img} sizes="100vw" tagClassName="right-4 bottom-4" />
      </Reveal>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/40" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1.5 bg-accent" />
      <Reveal className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5 text-accent-ink">Admissions 2027–28 · {inst.shortName}</p>
          <h2 id="final-cta-title" className="font-display text-[2rem] leading-[1.08] tracking-tight text-balance sm:text-[2.5rem] lg:text-[3rem]">
            {inst.finalCta.headline}
          </h2>
          <p className="type-lead mt-5 max-w-xl text-white/80">{inst.finalCta.body}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ApplyButton href={inst.applyUrl} location="final_cta" className={`${btn.accent} w-full !min-h-14 !px-8 text-base sm:w-auto`} />
            <EnquireButton intent="counselling" location="final_cta" className={`${btn.white} w-full sm:w-auto`}>
              <Headphones aria-hidden="true" className="h-4 w-4" />
              Talk to an Admission Counsellor
            </EnquireButton>
            <WhatsAppButton
              number={inst.contact.whatsapp}
              message={`Hi, I'd like to know about admissions 2027–28 at ${inst.name}.`}
              location="final_cta"
              className={`${btn.outlineLight} w-full sm:w-auto`}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
