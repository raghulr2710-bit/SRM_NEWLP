import { Briefcase, Info } from "lucide-react";
import { isPending, type Institution } from "@/types/institution";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Counter } from "@/components/common/Counter";
import { PendingBox } from "@/components/common/Media";
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
                <dd className={`font-display text-[1.8rem] font-semibold leading-none tracking-tight whitespace-nowrap min-[400px]:text-[2.1rem] sm:text-6xl lg:text-[3.4rem] xl:text-7xl ${dark ? "text-accent-ink" : "text-brand"}`}>
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

        {/* Individual / department-specific records */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className={`eyebrow mb-4 ${dark ? "text-white/60" : "text-muted"}`}>Student achievements</h3>
            {p.records.length > 0 ? (
              <ul className={`divide-y ${dark ? "divide-white/10 border-y border-white/10" : "divide-line border-y border-line"}`}>
                {p.records.map((r, i) => (
                  <Reveal as="li" key={r.name} delay={0.04 * i} className="grid grid-cols-[1fr_auto] items-center gap-4 py-4">
                    <div>
                      <p className={`font-semibold ${dark ? "text-white" : "text-ink"}`}>{r.name}</p>
                      <p className={`text-sm ${dark ? "text-white/65" : "text-muted"}`}>
                        {[r.programme, r.company, r.batch && `${r.batch} batch`].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <p className={`font-display text-2xl font-semibold sm:text-3xl ${dark ? "text-white" : "text-brand"}`}>{r.package}</p>
                  </Reveal>
                ))}
              </ul>
            ) : (
              <div className="aspect-[16/7]">
                <PendingBox label="Approved student placement highlights" tone={dark ? "dark" : "light"} />
              </div>
            )}
            {p.recordsNote && <p className={`mt-3 text-xs ${dark ? "text-white/55" : "text-muted"}`}>{p.recordsNote}</p>}
          </div>

          <div className="lg:col-span-5">
            <h3 className={`eyebrow mb-4 ${dark ? "text-white/60" : "text-muted"}`}>Career development</h3>
            <ul className="space-y-3">
              {p.careerDevelopment.map((c) => (
                <li
                  key={c.title}
                  className={`flex gap-4 rounded-[var(--radius-card)] p-5 ${dark ? "bg-white/[0.05]" : "bg-white"}`}
                >
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

        {/* Recruiters */}
        <div className="mt-16">
          <h3 className={`eyebrow mb-5 ${dark ? "text-white/60" : "text-muted"}`}>Leading recruiters</h3>
          {isPending(p.recruiters) ? (
            <div className="h-36">
              <PendingBox label={p.recruiters.pending} tone={dark ? "dark" : "light"} />
            </div>
          ) : (
            <>
              <ul className="flex flex-wrap gap-2">
                {p.recruiters.names.map((n) => (
                  <li
                    key={n}
                    className={`rounded-full border px-4 py-2 font-display text-base font-semibold sm:text-lg ${
                      dark ? "border-white/15 text-white/90" : "border-line bg-white text-ink"
                    }`}
                  >
                    {n}
                  </li>
                ))}
              </ul>
              <p className={`mt-3 text-xs ${dark ? "text-white/55" : "text-muted"}`}>{p.recruiters.note}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
