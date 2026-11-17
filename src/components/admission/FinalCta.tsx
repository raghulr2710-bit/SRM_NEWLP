import Image from "next/image";
import { Headphones } from "lucide-react";
import { isPending, type Institution } from "@/types/institution";
import { ApplyButton, EnquireButton, WhatsAppButton } from "@/components/common/Cta";
import { Reveal } from "@/components/common/Reveal";
import { btn } from "@/components/common/buttons";

/** Section 15 – Final call to action. */
export function FinalCta({ inst }: { inst: Institution }) {
  const img = inst.finalCta.image;
  return (
    <section aria-labelledby="final-cta-title" className="on-dark relative isolate overflow-hidden bg-brand py-24 text-on-brand lg:py-36">
      {img && !isPending(img) && (
        <Image src={img.src} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-25 mix-blend-luminosity" />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-brand via-brand/90 to-brand-ink" />
      <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full border-[3rem] border-accent/30" />
      <Reveal className="container-x text-center">
        <p className="eyebrow mb-6 text-white/70">Admissions 2027–28 · {inst.shortName}</p>
        <h2 id="final-cta-title" className="mx-auto max-w-4xl font-display text-[2.6rem] leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl">
          {inst.finalCta.headline}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">{inst.finalCta.body}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <ApplyButton href={inst.applyUrl} location="final_cta" className={`${btn.accent} w-full sm:w-auto`} />
          <EnquireButton intent="counselling" location="final_cta" className={`${btn.white} w-full sm:w-auto`}>
            <Headphones aria-hidden="true" className="h-4 w-4" />
            Talk to Admission Counsellor
          </EnquireButton>
          <WhatsAppButton
            number={inst.contact.whatsapp}
            message={`Hi, I'd like to know about admissions 2027–28 at ${inst.name}.`}
            location="final_cta"
            className={`${btn.outlineLight} w-full sm:w-auto`}
          />
        </div>
      </Reveal>
    </section>
  );
}
