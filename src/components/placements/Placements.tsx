import Image from "next/image";
import type { CSSProperties } from "react";
import { Briefcase, Building2, Info } from "lucide-react";
import { isPending, type Institution } from "@/types/institution";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Counter } from "@/components/common/Counter";
import { MediaFill } from "@/components/common/Media";
import { ApplyButton } from "@/components/common/Cta";
import { btn } from "@/components/common/buttons";

/**
 * Section 05 – Placement highlights.
 * "ledger": light editorial layout with large figures in a ruled grid.
 * "board":  dark scoreboard layout.
 * Institution-wide vs department-specific data are labelled separately.
 */
export function Placements({ inst, index }: { inst: Institution; index: string }) {
  const p = inst.placements;
  const dark = inst.layout.placements === "board";

  return (
    <section
      id="placements"
      aria-labelledby="placements-title"
      className={`section-y relative overflow-hidden ${dark ? "on-dark bg-brand-ink text-white" : "bg-surface-alt"}`}
    >
      {dark && (
        <div aria-hidden="true" className="absolute -left-24 top-24 h-80 w-80 rotate-45 border-[2.5rem] border-white/[0.04]" />
      )}
      <div className="container-x relative">
        <SectionHeading
          id="placements-title"
          index={index}
          eyebrow="Placements"
          title={p.heading}
          intro={p.intro}
          tone={dark ? "dark" : "light"}
          action={<ApplyButton href={inst.applyUrl} location="placements" className={btn.accent} />}
        />

        {/* Institution-wide statistics */}
        <div>
          <h3 className={`eyebrow mb-4 ${dark ? "text-white/60" : "text-muted"}`}>Institution-wide</h3>
          <dl
            className={`grid grid-cols-2 border-l border-t ${dark ? "border-white/15" : "border-line"} ${
              p.stats.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
            }`}
          >
            {p.stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={0.06 * i}
                className={`flex min-w-0 flex-col-reverse border-b border-r p-4 [&:last-child:nth-child(odd)]:col-span-2 sm:p-8 lg:p-10 lg:[&:last-child:nth-child(odd)]:col-span-1 ${dark ? "border-white/15" : "border-line bg-white"}`}
              >
                <dt className={`mt-3 text-sm font-medium uppercase tracking-wider ${dark ? "text-white/70" : "text-muted"}`}>{s.label}</dt>
                <dd className={`font-display text-[1.75rem] font-semibold leading-none tracking-tight whitespace-nowrap min-[400px]:text-[2.1rem] sm:text-5xl xl:text-[3.5rem] ${dark ? "text-accent-ink" : "text-brand"}`}>
                  <Counter stat={s} />
                </dd>
              </Reveal>
            ))}
          </dl>
          <p className={`mt-4 flex max-w-4xl items-start gap-2 text-sm leading-relaxed ${dark ? "text-white/60" : "text-muted"}`}>
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            {p.scopeNote}
          </p>
        </div>

        {/* Individual placement profiles – every published achiever, with their original photograph */}
        <div className="mt-14">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <h3 className={`eyebrow ${dark ? "text-white/60" : "text-muted"}`}>Student achievements</h3>
            {p.records.length > 0 && <p className={`text-sm ${dark ? "text-white/60" : "text-muted"}`}>{p.records.length} published profiles</p>}
          </div>
          {p.records.length > 0 ? (
            p.records.some((r) => r.photo) ? (
              <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {p.records.map((r, i) => (
                  <Reveal
                    as="li"
                    key={`${r.name}-${i}`}
                    delay={0.04 * (i % 5)}
                    className={`group flex w-[70vw] shrink-0 snap-start flex-col overflow-hidden rounded-[var(--radius-card)] border transition-[transform,box-shadow] duration-300 hover:-translate-y-1 sm:w-auto ${
                      dark ? "border-white/10 bg-white/[0.04] hover:shadow-[0_30px_60px_-40px_rgba(0,0,0,0.8)]" : "border-line bg-white hover:shadow-[0_30px_60px_-40px_rgba(10,20,50,0.45)]"
                    }`}
                  >
                    <div className={`relative aspect-[4/5] overflow-hidden ${dark ? "bg-white/5" : "bg-brand-soft"}`}>
                      {r.photo && (
                        <Image
                          src={r.photo.src}
                          alt={r.photo.alt}
                          fill
                          sizes="(min-width:1280px) 20vw, (min-width:768px) 30vw, 70vw"
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      )}
                      <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-sm font-bold text-on-accent">{r.package}</span>
                    </div>
                    <div className="flex flex-1 flex-col gap-1 p-4">
                      <p className={`font-display text-lg leading-tight ${dark ? "text-white" : "text-ink"}`}>{r.name}</p>
                      {(r.designation || r.programme) && (
                        <p className={`text-sm leading-snug ${dark ? "text-white/70" : "text-muted"}`}>{[r.designation, r.programme].filter(Boolean).join(" · ")}</p>
                      )}
                      {r.stipend && <p className={`text-sm font-semibold ${dark ? "text-white/85" : "text-ink"}`}>Stipend: {r.stipend}</p>}
                      {(r.company || r.companyLogo) && (
                        <div className="mt-auto flex items-center gap-2 pt-3">
                          {r.companyLogo && (
                            <span className="relative h-7 w-24 overflow-hidden rounded bg-white px-1">
                              <Image src={r.companyLogo.src} alt={r.companyLogo.alt} fill sizes="96px" className="object-contain" />
                            </span>
                          )}
                          {r.company && <span className={`text-sm font-semibold ${dark ? "text-white/85" : "text-ink"}`}>{r.company}</span>}
                        </div>
                      )}
                      {r.batch && <p className={`text-xs ${dark ? "text-white/55" : "text-muted"}`}>Batch {r.batch}</p>}
                    </div>
                  </Reveal>
                ))}
              </ul>
            ) : (
              <ul className={`divide-y ${dark ? "divide-white/10 border-y border-white/10" : "divide-line border-y border-line"}`}>
                {p.records.map((r, i) => (
                  <Reveal as="li" key={`${r.name}-${i}`} delay={0.04 * i} className="grid grid-cols-[1fr_auto] items-center gap-4 py-4">
                    <div>
                      <p className={`font-semibold ${dark ? "text-white" : "text-ink"}`}>{r.name}</p>
                      <p className={`text-sm ${dark ? "text-white/65" : "text-muted"}`}>
                        {[r.designation, r.programme, r.company, r.batch && `${r.batch} batch`].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <p className={`font-display text-2xl font-semibold sm:text-3xl ${dark ? "text-white" : "text-brand"}`}>{r.package}</p>
                  </Reveal>
                ))}
              </ul>
            )
          ) : (
            <p className={`flex items-start gap-3 rounded-[var(--radius-card)] border p-5 text-sm leading-relaxed ${dark ? "border-white/15 text-white/75" : "border-line bg-white text-muted"}`}>
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
              Named student placement highlights will appear here once approved by the placement cell.
            </p>
          )}
          {p.recordsNote && <p className={`mt-3 text-xs ${dark ? "text-white/55" : "text-muted"}`}>{p.recordsNote}</p>}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {p.image && (
            <Reveal mask className="group relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] lg:col-span-5 lg:aspect-auto lg:min-h-[20rem]">
              <MediaFill media={p.image} sizes="(min-width:1024px) 40vw, 100vw" zoom />
            </Reveal>
          )}
          <div className={p.image ? "lg:col-span-7" : "lg:col-span-12"}>
            <h3 className={`eyebrow mb-4 ${dark ? "text-white/60" : "text-muted"}`}>Career development</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {p.careerDevelopment.map((c) => (
                <li key={c.title} className={`flex gap-4 rounded-[var(--radius-card)] p-5 ${dark ? "bg-white/[0.05]" : "bg-white"}`}>
                  <Briefcase aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-accent-ink" />
                  <div>
                    <p className={`font-semibold ${dark ? "text-white" : "text-ink"}`}>{c.title}</p>
                    <p className={`mt-1 text-sm leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recruiters – official logos where published, otherwise names */}
        <div className="mt-16">
          <h3 className={`eyebrow mb-5 ${dark ? "text-white/60" : "text-muted"}`}>Leading recruiters</h3>
          {isPending(p.recruiters) ? (
            <p className={`flex items-start gap-3 text-sm leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>
              <Building2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
              Recruiter logos will be shown once the approved list is received from the placement cell.
            </p>
          ) : p.recruiters.logos?.length ? (
            <>
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
                {p.recruiters.logos.map((l, i) => (
                  <Reveal
                    as="li"
                    key={`${l.name}-${i}`}
                    delay={0.02 * (i % 8)}
                    className="group relative flex aspect-[3/2] items-center justify-center rounded-[var(--radius-card)] border border-line bg-white p-3 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-20px_rgba(10,20,50,0.4)]"
                  >
                    <span className="relative h-full w-full">
                      <Image src={l.image.src} alt={l.image.alt || l.name} fill sizes="(min-width:1024px) 12vw, 30vw" className="object-contain" />
                    </span>
                  </Reveal>
                ))}
              </ul>
              <p className={`mt-3 text-xs ${dark ? "text-white/55" : "text-muted"}`}>{p.recruiters.note}</p>
            </>
          ) : (
            <>
              <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] motion-reduce:[mask-image:none]">
                <ul className="marquee-track flex w-max gap-3 motion-reduce:w-auto motion-reduce:flex-wrap" style={{ "--marquee-duration": `${Math.max(p.recruiters.names.length * 3, 24)}s` } as CSSProperties}>
                  {[...p.recruiters.names, ...p.recruiters.names].map((n, i) => {
                    const dup = i >= (p.recruiters as { names: string[] }).names.length;
                    return (
                      <li
                        key={`${n}-${i}`}
                        aria-hidden={dup || undefined}
                        className={`whitespace-nowrap rounded-full border px-4 py-2 font-display text-base font-semibold sm:text-lg ${dup ? "motion-reduce:hidden" : ""} ${
                          dark ? "border-white/15 text-white/90" : "border-line bg-white text-ink"
                        }`}
                      >
                        {n}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <p className={`mt-3 text-xs ${dark ? "text-white/55" : "text-muted"}`}>{p.recruiters.note}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
