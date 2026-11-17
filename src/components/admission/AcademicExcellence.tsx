import Image from "next/image";
import { BadgeCheck, Info } from "lucide-react";
import type { Institution } from "@/types/institution";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Counter } from "@/components/common/Counter";
import { MediaFill, PendingTag } from "@/components/common/Media";

/** Section 08 – Academic excellence: accreditations, rankings and verified facts. */
export function AcademicExcellence({ inst, index }: { inst: Institution; index: string }) {
  const a = inst.academics;
  return (
    <section id="academics" aria-labelledby="academics-title" className="section-y bg-surface-alt">
      <div className="container-x">
        <div className="mb-10 grid gap-8 lg:mb-12 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <SectionHeading id="academics-title" index={index} eyebrow="Academic excellence" title={a.heading} intro={a.intro} />
          </div>
          {a.image && (
            <Reveal mask className="group relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] lg:col-span-5 lg:aspect-[4/3]">
              <MediaFill media={a.image} sizes="40vw" zoom />
            </Reveal>
          )}
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {a.accreditations.map((acc, i) => (
            <Reveal
              as="li"
              key={acc.title}
              delay={0.05 * i}
              className="flex gap-5 rounded-[var(--radius-card)] border border-line bg-white p-6"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center">
                {acc.badge ? (
                  <Image src={acc.badge.src} alt={acc.badge.alt} width={acc.badge.width} height={acc.badge.height} className="max-h-16 w-auto object-contain" sizes="64px" />
                ) : (
                  <BadgeCheck aria-hidden="true" className="h-10 w-10 text-brand" />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-xl leading-tight text-ink">{acc.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{acc.body}</p>
                <p className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
                  {acc.verified ? (
                    <span className="inline-flex min-w-0 items-start gap-1 text-brand" title={acc.source}>
                      <BadgeCheck aria-hidden="true" className="mt-px h-3.5 w-3.5 shrink-0" /> <span>Stated on {/.(edu|ac).in$/.test(acc.source) ? "the official admissions page" : acc.source}</span>
                    </span>
                  ) : (
                    <PendingTag className="text-accent-ink">Details to be confirmed</PendingTag>
                  )}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        {a.facts && (
          <div className="mt-14">
            <dl className="grid grid-cols-2 gap-y-10 border-t border-line pt-10 sm:grid-cols-3 lg:grid-cols-5">
              {a.facts.map((f) => (
                <div key={f.label} className="flex min-w-0 flex-col-reverse [&:last-child:nth-child(odd)]:col-span-2 sm:[&:last-child:nth-child(odd)]:col-span-1">
                  <dt className="mt-2 text-sm text-muted">{f.label}</dt>
                  <dd className="font-display text-[2rem] whitespace-nowrap text-ink min-[400px]:text-4xl lg:text-[2.75rem]">
                    <Counter stat={f} />
                  </dd>
                </div>
              ))}
            </dl>
            {a.factsNote && <p className="mt-6 text-xs text-muted">{a.factsNote}</p>}
          </div>
        )}

        {a.caution && (
          <p className="mt-8 flex max-w-4xl items-start gap-2 rounded-[var(--radius-card)] border border-dashed border-line p-4 text-sm text-muted">
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
            <span>
              <strong className="text-ink">Editorial note for review:</strong> {a.caution}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}
