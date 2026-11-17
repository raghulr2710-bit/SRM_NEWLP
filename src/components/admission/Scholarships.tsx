import { Award } from "lucide-react";
import type { Institution } from "@/types/institution";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { PendingTag } from "@/components/common/Media";
import { EnquireButton } from "@/components/common/Cta";
import { btn } from "@/components/common/buttons";

const ROWS = [
  { key: "eligibility", label: "Eligibility" },
  { key: "benefits", label: "Benefits" },
  { key: "process", label: "How to apply" },
  { key: "terms", label: "Terms & conditions" },
] as const;

/** Section 09 – Scholarships. Comparison table on desktop, cards on mobile. */
export function Scholarships({ inst, index }: { inst: Institution; index: string }) {
  const s = inst.scholarships;
  const anyPending = s.items.some((i) => !i.verified);
  return (
    <section id="scholarships" aria-labelledby="scholarships-title" className="section-y bg-surface">
      <div className="container-x">
        <SectionHeading
          id="scholarships-title"
          index={index}
          eyebrow="Scholarships"
          title={s.heading}
          intro={s.intro}
          action={
            <EnquireButton intent="scholarship" location="scholarships" className={btn.accent}>
              <Award aria-hidden="true" className="h-4 w-4" />
              Explore Scholarships
            </EnquireButton>
          }
        />

        {/* Desktop comparison */}
        <Reveal className="hidden overflow-hidden rounded-[var(--radius-card)] border border-line md:block">
          <table className="w-full table-fixed border-collapse text-left">
            <caption className="sr-only">Scholarship categories compared</caption>
            <thead>
              <tr className="bg-brand text-on-brand">
                <th scope="col" className="w-48 p-5 text-sm font-semibold uppercase tracking-wider">
                  Category
                </th>
                {s.items.map((i) => (
                  <th key={i.category} scope="col" className="p-5 font-display text-xl font-normal">
                    {i.category}
                    {!i.verified && <PendingTag className="ml-2 align-middle text-white">Pending</PendingTag>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, ri) => (
                <tr key={r.key} className={ri % 2 ? "bg-surface-alt" : "bg-white"}>
                  <th scope="row" className="p-5 align-top text-sm font-semibold text-ink">
                    {r.label}
                  </th>
                  {s.items.map((i) => (
                    <td key={i.category} className="p-5 align-top text-sm leading-relaxed text-muted">
                      {i[r.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Mobile cards */}
        <ul className="grid gap-4 md:hidden">
          {s.items.map((i) => (
            <li key={i.category} className="rounded-[var(--radius-card)] border border-line bg-white p-5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-xl text-ink">{i.category}</h3>
                {!i.verified && <PendingTag className="text-accent-ink">Pending</PendingTag>}
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                {ROWS.map((r) => (
                  <div key={r.key}>
                    <dt className="font-semibold text-ink">{r.label}</dt>
                    <dd className="mt-0.5 text-muted">{i[r.key]}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>

        {anyPending && (
          <p className="mt-5 text-sm text-muted">
            No scholarship amounts or benefits are shown until the institution publishes its official 2027–28 policy.
          </p>
        )}
      </div>
    </section>
  );
}
