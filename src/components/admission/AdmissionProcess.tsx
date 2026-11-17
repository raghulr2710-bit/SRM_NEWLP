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

        <ol className="grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
          {pr.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={0.05 * i} className="group relative bg-brand p-6 transition-colors hover:bg-brand-ink sm:p-7 lg:p-9">
              <span className="font-display text-4xl leading-none text-white/25 sm:text-6xl sm:text-white/15 transition-colors group-hover:text-accent-ink" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl leading-tight sm:mt-6 sm:text-2xl">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-2 leading-relaxed text-white/75">{s.body}</p>
            </Reveal>
          ))}
        </ol>

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
