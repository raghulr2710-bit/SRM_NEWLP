import { ArrowUpRight } from "lucide-react";
import type { Institution } from "@/types/institution";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { MediaFill, PendingTag } from "@/components/common/Media";

/**
 * Section 06 – Industry connect.
 * Wide photograph with the verified highlights docked over its lower edge
 * (a swipeable row on mobile), then the four-year pathway as a timeline whose
 * rule draws itself in on scroll.
 */
export function IndustryConnect({ inst, index }: { inst: Institution; index: string }) {
  const ind = inst.industry;
  return (
    <section id="industry" aria-labelledby="industry-title" className="section-y overflow-hidden bg-surface">
      <div className="container-x">
        <SectionHeading id="industry-title" index={index} eyebrow="Industry connect" title={ind.heading} intro={ind.intro} />

        {ind.image && (
          <Reveal mask className="group relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] sm:aspect-[21/9]">
            <MediaFill media={ind.image} sizes="(min-width:1320px) 1240px, 100vw" zoom tagClassName="right-3 top-3" />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-ink/50 via-transparent to-transparent" />
          </Reveal>
        )}

        <ul
          aria-label="Industry highlights"
          className={`no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:gap-4 ${
            ind.image ? "relative -mt-10 md:-mt-20 md:px-6 lg:px-10" : ""
          }`}
        >
          {ind.highlights.map((h, i) => (
            <Reveal
              as="li"
              key={h.title}
              delay={0.08 * i}
              className="group flex w-[82%] shrink-0 snap-start flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[0_30px_60px_-40px_rgba(10,20,50,0.5)] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 sm:w-[60%] md:w-auto lg:p-7"
            >
              <span className="font-mono text-sm text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="type-h3 mt-4 font-display text-ink">{h.title}</h3>
              <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{h.body}</p>
              <p className="mt-5 flex items-center gap-1 text-xs text-muted">
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /> Source: {h.source}
              </p>
            </Reveal>
          ))}
        </ul>

        <div className="mt-16">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <h3 className="type-h3 font-display text-ink">Your four-year industry pathway</h3>
            {ind.timeline.some((t) => t.pending) && (
              <PendingTag className="text-accent-ink">MoU, internship &amp; visit partners pending</PendingTag>
            )}
          </div>
          <div className="relative">
            <Reveal
              y={0}
              className="pointer-events-none absolute bottom-3 left-[11px] top-3 w-px bg-line md:bottom-auto md:left-0 md:right-0 md:top-[11px] md:h-px md:w-auto"
            >
              <span
                aria-hidden="true"
                className="block h-full w-full origin-top scale-y-0 bg-accent transition-transform delay-200 duration-[1400ms] ease-out [[data-revealed]>&]:scale-y-100 md:origin-left md:scale-x-0 md:scale-y-100 md:[[data-revealed]>&]:scale-x-100"
              />
            </Reveal>
          <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
            {ind.timeline.map((t, i) => (
              <Reveal as="li" key={t.phase} delay={0.15 + 0.12 * i} className="relative pl-10 md:pl-0 md:pt-10">
                <span aria-hidden="true" className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-brand bg-surface">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </span>
                <p className="eyebrow text-brand">{t.phase}</p>
                <p className="mt-2 font-display text-lg text-ink">{t.title}</p>
                <p className="mt-1 text-sm text-muted">{t.body}</p>
              </Reveal>
            ))}
          </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
