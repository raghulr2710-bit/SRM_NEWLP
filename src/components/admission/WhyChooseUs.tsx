import type { Institution } from "@/types/institution";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { MediaFill } from "@/components/common/Media";
import { VideoEmbed } from "@/components/common/VideoEmbed";

/**
 * Section 03 – Why choose us.
 * "list":  editorial – sticky heading + photograph, numbered reasons with a restrained hover rule.
 * "bento": asymmetric grid – the lead reason is a full photographic tile.
 */
export function WhyChooseUs({ inst, index }: { inst: Institution; index: string }) {
  const { why } = inst;

  if (inst.layout.why === "list") {
    return (
      <section id="why" aria-labelledby="why-title" className="section-y bg-surface">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading id="why-title" index={index} eyebrow={`Why ${inst.shortName}`} title={why.heading} intro={why.intro} />
              {why.image && (
                <Reveal mask as="figure" className="group relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] lg:aspect-[4/5]">
                  <MediaFill media={why.image} sizes="(min-width:1024px) 38vw, 100vw" zoom />
                  {"caption" in why.image && why.image.caption && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-12 text-sm font-medium text-white">
                      {why.image.caption}
                    </figcaption>
                  )}
                </Reveal>
              )}
              {why.videoUrl && <VideoEmbed url={why.videoUrl} title={why.videoTitle ?? `${inst.shortName} – campus video`} className="mt-4" />}
            </div>
          </div>
          <ol className="lg:col-span-7 lg:pt-2">
            {why.items.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={0.04 * i}
                className="group relative grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-7 last:border-b sm:grid-cols-[4.5rem_1fr]"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[-1px] h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <span className="font-display text-2xl leading-none text-accent-ink sm:text-3xl" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={item.media ? "grid gap-4 sm:grid-cols-[1fr_9rem] sm:items-start" : ""}>
                  <div>
                    <h3 className="type-h3 font-display text-ink transition-colors duration-300 group-hover:text-brand">{item.title}</h3>
                    <p className="type-lead mt-2 max-w-xl text-muted">{item.body}</p>
                  </div>
                  {item.media && (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] sm:order-none">
                      <MediaFill media={item.media} sizes="(min-width:640px) 9rem, 90vw" zoom tagClassName="left-1.5 top-1.5" />
                    </div>
                  )}
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
  const [lead, ...others] = why.items;
  // Two tiles beside the lead image, then rows of three; a short last row stretches to fill.
  const rest = Math.max(others.length - 2, 0);
  const tail = rest % 3;
  const span = (i: number) => {
    if (i < 2) return "lg:col-span-5";
    const fromEnd = others.length - i;
    if (tail === 1 && fromEnd === 1) return "lg:col-span-12";
    if (tail === 2 && fromEnd <= 2) return "lg:col-span-6";
    return "lg:col-span-4";
  };
  return (
    <section id="why" aria-labelledby="why-title" className="section-y bg-surface">
      <div className="container-x">
        <SectionHeading id="why-title" index={index} eyebrow={`Why ${inst.shortName}`} title={why.heading} intro={why.intro} />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
          {lead && (
            <Reveal
              as="li"
              mask
              className="group relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-brand p-7 text-white sm:col-span-2 lg:col-span-7 lg:row-span-2 lg:min-h-[30rem] lg:p-10"
            >
              {why.image && (
                <div className="absolute inset-0 -z-10">
                  <MediaFill media={why.image} sizes="(min-width:1024px) 55vw, 100vw" zoom />
                </div>
              )}
              <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-ink via-brand-ink/60 to-transparent" />
              <span className="font-mono text-sm text-white/70">01</span>
              <h3 className="mt-3 max-w-lg font-display text-[1.75rem] leading-tight font-semibold lg:text-[2.25rem]">{lead.title}</h3>
              <p className="type-lead mt-3 max-w-md text-white/85">{lead.body}</p>
            </Reveal>
          )}
          {others.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={0.05 * ((i % 5) + 1)}
              className={`group relative flex min-h-[11rem] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-6 transition-[transform,background-color] duration-300 hover:-translate-y-1 lg:p-7 ${
                span(i)
              } ${i % 3 === 0 ? "bg-accent-soft" : i % 3 === 1 ? "bg-surface-alt" : "bg-brand-soft"}`}
            >
              {item.media ? (
                <div className="relative -mx-6 -mt-6 mb-4 aspect-[16/9] overflow-hidden lg:-mx-7 lg:-mt-7">
                  <MediaFill media={item.media} sizes="(min-width:1024px) 30vw, 90vw" zoom />
                </div>
              ) : (
                <span className="font-mono text-sm text-muted">{String(i + 2).padStart(2, "0")}</span>
              )}
              <div>
                <h3 className="type-h3 font-display font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{item.body}</p>
              </div>
              <span aria-hidden="true" className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
            </Reveal>
          ))}
        </ul>
        {why.videoUrl && (
          <Reveal className="mx-auto mt-8 max-w-3xl">
            <VideoEmbed url={why.videoUrl} title={why.videoTitle ?? `${inst.shortName} – campus video`} />
          </Reveal>
        )}
        <p className="mt-6 text-xs text-muted">Source: {why.source}</p>
      </div>
    </section>
  );
}
