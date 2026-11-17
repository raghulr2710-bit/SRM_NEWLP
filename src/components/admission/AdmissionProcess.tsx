import type { CSSProperties } from "react";
import { CreditCard, FileImage } from "lucide-react";
import type { Institution } from "@/types/institution";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { PendingTag } from "@/components/common/Media";
import { ApplyButton, EnquireButton } from "@/components/common/Cta";
import { btn } from "@/components/common/buttons";

/** Section 12 – Admission process. Steps are configured per institution in its data file. */
export function AdmissionProcess({ inst, index }: { inst: Institution; index: string }) {
  const pr = inst.process;
  return (
    <section id="admission-process" aria-labelledby="process-title" className="on-dark section-y bg-brand text-on-brand">
      <div className="container-x">
        <SectionHeading id="process-title" index={index} eyebrow="Admission process" title={pr.heading} intro={pr.intro} tone="dark" />
        {pr.indicative && (
          <p className="-mt-6 mb-10">
            <PendingTag className="text-white">Indicative – confirm with official admission policy</PendingTag>
          </p>
        )}

        {/* Vertical timeline on mobile/tablet, horizontal on desktop; the rule draws in as it scrolls into view. */}
        <div className="relative">
          <Reveal
            y={0}
            className="pointer-events-none absolute bottom-6 left-[19px] top-6 w-0.5 bg-white/15 lg:bottom-auto lg:left-[1.25rem] lg:right-[1.25rem] lg:top-[19px] lg:h-0.5 lg:w-auto"
          >
            <span
              aria-hidden="true"
              className="block h-full w-full origin-top scale-y-0 bg-accent transition-transform delay-150 duration-[1600ms] ease-out [[data-revealed]>&]:scale-y-100 lg:origin-left lg:scale-x-0 lg:scale-y-100 lg:[[data-revealed]>&]:scale-x-100"
            />
          </Reveal>
          <ol className="relative grid gap-7 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))] lg:gap-5" style={{ "--n": pr.steps.length } as CSSProperties}>
            {pr.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={0.1 + 0.08 * i} className="group relative pl-14 lg:pl-0 lg:pt-14">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/30 bg-brand font-mono text-sm font-bold transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="type-h3 font-display leading-tight">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-white/75">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        {(pr.documents || pr.payment) && (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {pr.documents && (
              <div className="flex gap-4 rounded-[var(--radius-card)] border border-white/20 p-6">
                <FileImage aria-hidden="true" className="h-6 w-6 shrink-0 text-accent-ink" />
                <div>
                  <p className="font-semibold">Keep documents ready</p>
                  <ul className="mt-2 space-y-1 text-sm text-white/75">
                    {pr.documents.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {pr.payment && (
              <div className="flex gap-4 rounded-[var(--radius-card)] border border-white/20 p-6">
                <CreditCard aria-hidden="true" className="h-6 w-6 shrink-0 text-accent-ink" />
                <div>
                  <p className="font-semibold">Payment options</p>
                  <p className="mt-2 text-sm text-white/75">{pr.payment}</p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-3">
          <ApplyButton href={inst.applyUrl} location="process" className={btn.accent}>
            Start your application
          </ApplyButton>
          <EnquireButton intent="counselling" location="process" className={btn.outlineLight}>
            Get help from a counsellor
          </EnquireButton>
        </div>
      </div>
    </section>
  );
}
