import type { Institution } from "@/types/institution";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { MediaFill } from "@/components/common/Media";

/** Section 03 – Why choose us. "list" = editorial numbered list; "bento" = asymmetric grid. */
export function WhyChooseUs({ inst, index }: { inst: Institution; index: string }) {
  const { why } = inst;

  if (inst.layout.why === "list") {
    return (
      <section id="why" aria-labelledby="why-title" className="section-y bg-surface">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading id="why-title" index={index} eyebrow={`Why ${inst.shortName}`} title={why.heading} intro={why.intro} />
              {why.image && (
                <Reveal>
                  <figure className="group relative hidden aspect-[4/3] overflow-hidden lg:block">
                    <MediaFill media={why.image} sizes="40vw" zoom />
                    {"caption" in why.image && why.image.caption && (
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-12 text-sm font-medium text-white">
                        {why.image.caption}
                      </figcaption>
                    )}
                  </figure>
                </Reveal>
              )}
            </div>
          </div>
          <ol className="lg:col-span-7 lg:pt-4">
            {why.items.map((item, i) => (
              <Reveal as="li" key={item.title} delay={0.04 * i} className="group grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line py-8 last:border-b sm:grid-cols-[5rem_1fr]">
                <span className="font-display text-3xl leading-none text-accent-ink sm:text-4xl" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl leading-tight text-ink transition-colors group-hover:text-brand">{item.title}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
        <p className="container-x mt-6 text-xs text-muted">Source: {why.source}</p>
      </section>
    );
  }

  // Bento
  const spans = ["lg:col-span-7 lg:row-span-2", "lg:col-span-5", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];
  return (
    <section id="why" aria-labelledby="why-title" className="section-y bg-surface">
      <div className="container-x">
        <SectionHeading id="why-title" index={index} eyebrow={`Why ${inst.shortName}`} title={why.heading} intro={why.intro} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {why.items.map((item, i) => {
            const feature = i === 0;
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={0.04 * (i % 6)}
                className={`group relative flex min-h-[12rem] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-7 transition-transform duration-300 hover:-translate-y-1 ${
                  spans[i] ?? "lg:col-span-4"
                } ${feature ? "bg-brand text-on-brand sm:col-span-2 lg:min-h-[26rem]" : i % 3 === 1 ? "bg-accent-soft" : "bg-surface-alt"}`}
              >
                {feature && (
                  <div aria-hidden="true" className="absolute -right-16 -top-16 h-64 w-64 rotate-45 border-[2.5rem] border-accent/80" />
                )}
                <span className={`font-mono text-sm ${feature ? "text-white/60" : "text-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
                <div className="relative">
                  <h3 className={`font-display font-semibold leading-tight ${feature ? "text-3xl lg:text-5xl" : "text-xl text-ink"}`}>{item.title}</h3>
                  <p className={`mt-3 leading-relaxed ${feature ? "max-w-md text-lg text-white/80" : "text-muted"}`}>{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
        <p className="mt-6 text-xs text-muted">Source: {why.source}</p>
      </div>
    </section>
  );
}
