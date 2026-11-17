import { ArrowUpRight } from "lucide-react";
import type { Institution } from "@/types/institution";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { PendingTag } from "@/components/common/Media";

/** Section 06 – Industry connect: verified highlights + four-year exposure timeline. */
export function IndustryConnect({ inst, index }: { inst: Institution; index: string }) {
  const ind = inst.industry;
  return (
    <section id="industry" aria-labelledby="industry-title" className="section-y bg-surface">
      <div className="container-x">
        <SectionHeading id="industry-title" index={index} eyebrow="Industry connect" title={ind.heading} intro={ind.intro} />

        <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-3">
          {ind.highlights.map((h, i) => (
            <Reveal as="li" key={h.title} delay={0.06 * i} className="group flex flex-col bg-surface p-8 transition-colors hover:bg-brand-soft">
              <span className="font-mono text-sm text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-display text-2xl leading-tight text-ink">{h.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{h.body}</p>
              <p className="mt-6 flex items-center gap-1 text-xs text-muted">
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /> Source: {h.source}
              </p>
            </Reveal>
          ))}
        </ul>

        <div className="mt-16">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <h3 className="font-display text-2xl text-ink">Your four-year industry pathway</h3>
            {ind.timeline.some((t) => t.pending) && (
              <PendingTag className="text-accent-ink">MoU, internship &amp; visit partners pending</PendingTag>
            )}
          </div>
          <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
            <span aria-hidden="true" className="absolute left-[11px] top-3 bottom-3 w-px bg-line md:left-0 md:right-0 md:top-[11px] md:bottom-auto md:h-px md:w-auto" />
            {ind.timeline.map((t, i) => (
              <Reveal as="li" key={t.phase} delay={0.08 * i} className="relative pl-10 md:pl-0 md:pt-10">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-brand bg-surface md:top-0"
                >
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </span>
                <p className="eyebrow text-brand">{t.phase}</p>
                <p className="mt-2 font-display text-xl text-ink">{t.title}</p>
                <p className="mt-1 text-sm text-muted">{t.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
