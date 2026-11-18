"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ChevronDown, Clock, GraduationCap, Search, X } from "lucide-react";
import type { InstitutionKey, Level, Programme } from "@/types/institution";
import { useEnquiry } from "@/components/common/EnquiryContext";
import { PendingTag } from "@/components/common/Media";
import { track } from "@/lib/analytics";
import { btn } from "@/components/common/buttons";

const LEVEL_TABS: { key: "all" | Level; label: string; short: string }[] = [
  { key: "all", label: "All", short: "All" },
  { key: "UG", label: "Undergraduate", short: "UG" },
  { key: "PG", label: "Postgraduate", short: "PG" },
  { key: "Diploma", label: "Diploma", short: "Diploma" },
  { key: "Research", label: "Research", short: "Research" },
];
const PAGE = 12;

const value = (p: Programme) => `${p.degree} ${p.name}`;

export function ProgrammeExplorer({
  institution,
  programmes,
  layout,
}: {
  institution: InstitutionKey;
  programmes: Programme[];
  layout: "grid" | "rows";
}) {
  const uid = useId();
  const { openEnquiry } = useEnquiry();
  const [level, setLevel] = useState<"all" | Level>("all");
  const [dept, setDept] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE);
  const [expanded, setExpanded] = useState<string | null>(null);
  const q = useDeferredValue(query.trim().toLowerCase());

  const tabs = LEVEL_TABS.filter((t) => t.key === "all" || programmes.some((p) => p.level === t.key));
  const departments = useMemo(() => {
    const pool = level === "all" ? programmes : programmes.filter((p) => p.level === level);
    return [...new Set(pool.map((p) => p.department))];
  }, [programmes, level]);

  const results = useMemo(
    () =>
      programmes.filter(
        (p) =>
          (level === "all" || p.level === level) &&
          (dept === "all" || p.department === dept) &&
          (!q || `${p.degree} ${p.name} ${p.department}`.toLowerCase().includes(q)),
      ),
    [programmes, level, dept, q],
  );
  const visible = results.slice(0, limit);

  function selectLevel(l: "all" | Level) {
    setLevel(l);
    setLimit(PAGE);
    setExpanded(null);
    if (dept !== "all" && !programmes.some((p) => p.department === dept && (l === "all" || p.level === l))) setDept("all");
  }

  function toggle(p: Programme) {
    const v = value(p);
    setExpanded((cur) => (cur === v ? null : v));
    if (expanded !== v) track("programme_view", institution, { programme_name: v, level: p.level, department: p.department });
  }

  function enquire(p: Programme) {
    track("programme_enquire", institution, { programme_name: value(p), level: p.level });
    openEnquiry({ intent: "programme", programme: value(p) });
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div role="tablist" aria-label="Programme level" className="flex flex-wrap gap-1">
          <LayoutGroup id={`${uid}-tabs`}>
            {tabs.map((t) => {
              const selected = level === t.key;
              const count = t.key === "all" ? programmes.length : programmes.filter((p) => p.level === t.key).length;
              return (
                <button
                  key={t.key}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${uid}-results`}
                  onClick={() => selectLevel(t.key)}
                  className={`relative min-h-11 shrink-0 rounded-[var(--radius-card)] px-4 text-sm font-semibold transition-colors ${
                    selected ? "text-on-brand" : "text-ink hover:bg-surface-alt"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-[var(--radius-card)] bg-brand"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="relative">
                    <span className="sm:hidden">{t.short}</span>
                    <span className="hidden sm:inline">{t.label}</span> <span className="opacity-80">({count})</span>
                  </span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>

        <div className="relative w-full lg:w-80">
          <label htmlFor={`${uid}-search`} className="sr-only">
            Search programmes
          </label>
          <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id={`${uid}-search`}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(PAGE);
            }}
            placeholder="Search e.g. AI, Civil, MBA"
            className="min-h-12 w-full rounded-[var(--radius-card)] border border-line bg-white pl-10 pr-10 text-base text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-muted hover:text-ink"
            >
              <X aria-hidden="true" className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </button>
          )}
        </div>
      </div>

      <div className="no-scrollbar -mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label="Filter by department">
        {["all", ...departments].map((d) => (
          <button
            key={d}
            type="button"
            aria-pressed={dept === d}
            onClick={() => {
              setDept(d);
              setLimit(PAGE);
            }}
            className={`min-h-11 shrink-0 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors ${
              dept === d ? "border-accent bg-accent text-on-accent" : "border-line text-ink hover:border-ink"
            }`}
          >
            {d === "all" ? "All departments" : d}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        Showing {Math.min(limit, results.length)} of {results.length} programme{results.length === 1 ? "" : "s"}
      </p>

      {/* Results */}
      <div id={`${uid}-results`} role="tabpanel" className="mt-4">
        {results.length === 0 ? (
          <div className="rounded-[var(--radius-card)] border border-dashed border-line p-10 text-center">
            <p className="font-display text-xl text-ink">No programmes match “{query}”.</p>
            <p className="mt-2 text-muted">Try a broader term, or ask a counsellor to help you choose.</p>
            <button type="button" className={`${btn.brand} mt-6`} onClick={() => openEnquiry({ intent: "counselling" })}>
              Talk to a counsellor
            </button>
          </div>
        ) : (
          <ul className={layout === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "border-t border-line"}>
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((p) => {
                const v = value(p);
                const open = expanded === v;
                const detailsId = `${uid}-${v.replace(/\W+/g, "-")}`;
                return (
                  <motion.li
                    key={v}
                    layout="position"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className={
                      layout === "grid"
                        ? `group flex flex-col rounded-[var(--radius-card)] border bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:shadow-[0_20px_50px_-30px_rgba(10,20,50,0.45)] ${
                            open ? "border-brand" : "border-line hover:border-brand/40"
                          }`
                        : "group border-b border-line py-5"
                    }
                  >
                    <div className={layout === "rows" ? "grid gap-3 md:grid-cols-[8rem_1fr_auto] md:items-center md:gap-6" : "flex flex-1 flex-col"}>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-sm bg-brand-soft px-2 py-1 text-xs font-bold tracking-wide text-brand">{p.degree}</span>
                        {layout === "grid" && <span className="text-xs font-medium uppercase tracking-wider text-muted">{p.level}</span>}
                      </div>
                      <div className={layout === "grid" ? "mt-4 flex-1" : ""}>
                        <h3 className={`font-display leading-snug text-ink ${layout === "grid" ? "text-xl" : "text-xl md:text-2xl"}`}>{p.name}</h3>
                        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                          <span className="inline-flex items-center gap-1.5">
                            <GraduationCap aria-hidden="true" className="h-4 w-4" />
                            {p.department}
                          </span>
                          {p.duration && (
                            <span className="inline-flex items-center gap-1.5">
                              <Clock aria-hidden="true" className="h-4 w-4" />
                              {p.duration}
                            </span>
                          )}
                          {p.lateralEntry && (
                            <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-semibold text-brand">Lateral entry</span>
                          )}
                          {!p.verified && <PendingTag className="text-accent-ink">Details to be confirmed</PendingTag>}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 ${layout === "grid" ? "mt-5 border-t border-line pt-4" : ""}`}>
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={detailsId}
                          onClick={() => toggle(p)}
                          className="inline-flex min-h-11 items-center gap-1.5 px-1 text-sm font-semibold text-brand hover:underline"
                        >
                          Explore programme
                          <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
                        </button>
                        <button
                          type="button"
                          onClick={() => enquire(p)}
                          className="ml-auto inline-flex min-h-11 items-center rounded-[var(--radius-card)] bg-accent px-4 text-sm font-semibold text-on-accent hover:brightness-110"
                        >
                          Enquire
                          <span className="sr-only"> about {v}</span>
                        </button>
                      </div>
                    </div>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          id={detailsId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <dl className={`mt-4 grid gap-3 rounded-[var(--radius-card)] bg-surface-alt p-4 text-sm ${layout === "rows" ? "md:ml-[9.5rem] md:grid-cols-3" : ""}`}>
                            <div>
                              <dt className="font-semibold text-ink">Eligibility</dt>
                              <dd className="mt-1 whitespace-pre-line text-muted">{p.eligibility ?? "Ask an admission counsellor."}</dd>
                            </div>
                            <div>
                              <dt className="font-semibold text-ink">Duration</dt>
                              <dd className="mt-1 text-muted">{p.duration ?? "To be confirmed"}</dd>
                            </div>
                            <div>
                              <dt className="font-semibold text-ink">Approved intake</dt>
                              <dd className="mt-1 text-muted">{p.intake ?? "Awaiting verified figure"}</dd>
                            </div>
                            {p.notes && (
                              <div className={layout === "rows" ? "md:col-span-3" : ""}>
                                <dt className="font-semibold text-ink">Note</dt>
                                <dd className="mt-1 whitespace-pre-line text-muted">{p.notes}</dd>
                              </div>
                            )}
                          </dl>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </div>

      {results.length > limit && (
        <div className="mt-8 flex justify-center">
          <button type="button" className={btn.outline} onClick={() => setLimit((l) => l + PAGE * 2)}>
            Show more programmes ({results.length - limit} more)
          </button>
        </div>
      )}
    </div>
  );
}
