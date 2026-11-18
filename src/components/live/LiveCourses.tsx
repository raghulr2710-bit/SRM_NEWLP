"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, AnimatePresence, LayoutGroup, motion } from "motion/react";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  FlaskConical,
  HeartPulse,
  Layers,
  ChevronDown,
  Clock,
  Cpu,
  GraduationCap,
  Info,
  Ruler,
  Search,
  UserCog,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEnquiry } from "@/components/common/EnquiryContext";

export interface LiveCourse {
  faculty: string;
  section: string | null;
  title: string;
  eligibility: string | null;
  lateralEntry: boolean;
  partTime: boolean;
  level: string;
}

export interface UgEligibility {
  heading: string;
  text: string[];
  qualifyingExamination?: string;
  gceALevel?: string;
  internationalBaccalaureate?: { text: string; table: Record<string, string>[] };
  note?: string | string[];
  /** faculty tab the panel belongs to (defaults to the first tab) */
  faculty?: string;
}

const LATERAL = "LATERAL ENTRY PROGRAMME";
const ICON = (f: string): LucideIcon =>
  f === LATERAL
    ? ArrowUpRight
    : /ENGINEER|TECHNOLOG|COMPUT/.test(f)
      ? Cpu
      : /ARCHITECT|DESIGN/.test(f)
        ? Ruler
        : /MEDIC|HEALTH|NURS|PHARM|ALLIED|PHYSIO/.test(f)
          ? HeartPulse
          : /SCIENCE|RESEARCH/.test(f)
            ? FlaskConical
            : /LIBERAL|ARTS|HUMANIT|LAW/.test(f)
              ? BookOpen
              : /MANAGEMENT|BUSINESS|COMMERCE|HOTEL/.test(f)
                ? Briefcase
                : /POST ?GRAD|\bPG\b|MASTER/.test(f)
                  ? GraduationCap
                  : /UNDER ?GRAD|\bUG\b|BACHELOR/.test(f)
                    ? Layers
                    : UserCog;
const label = (f: string) =>
  f === LATERAL
    ? "Lateral Entry"
    : /^[A-Z]{2,6}\b\s*(\(|$)/.test(f)
      ? f.match(/^[A-Z]{2,6}/)![0]
      : f
        .replace(/\s*\(.*\)$/, "")
        .replace(/ PROGRAMME$/, "")
        .replace("WORKING PROFESSIONAL COURSES(WPC)", "Working Professional")
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .replace("And", "and");

/** "B.Tech - Civil Engineering" → { degree: "B.Tech", name: "Civil Engineering" } (display only; source text unchanged). */
function splitTitle(t: string) {
  const m = t.match(/^(.+?)\s+[-–]\s+(.+)$/);
  if (m && m[1].length <= 22) return { degree: m[1].trim(), name: m[2].trim() };
  const first = t.split(" ")[0];
  return /^[A-Z][A-Za-z.()/]*\.[A-Za-z]/.test(first) ? { degree: first, name: t.slice(first.length).trim() } : { degree: "", name: t };
}
/** "UNDERGRADUATE COURSES (DURATION 4 YEARS)" → { title: "Undergraduate courses", duration: "4 years" } */
function splitSection(s: string) {
  const m = s.match(/\(DURATION ([^)]+)\)/i);
  const title = s.replace(/\s*\(DURATION [^)]+\)/i, "").trim();
  const nice = title.charAt(0) + title.slice(1).toLowerCase();
  return { title: nice, duration: m ? m[1].toLowerCase() : null };
}
const LEVEL_OF = (c: LiveCourse) => (/DIPLOMA/i.test(c.section ?? "") ? "Diploma" : c.level === "PG" ? "PG" : c.level === "UG" ? "UG" : c.level);

/**
 * "Courses We Offer and Eligibility Criteria" – every course from the live page,
 * eligibility shown verbatim. Desktop: faculty sidebar + filterable course cards.
 * Mobile: faculty chips + the same cards in one column.
 */
export function LiveCourses({
  items,
  ugEligibility,
  flabsUgNote,
  lateral,
}: {
  items: LiveCourse[];
  ugEligibility?: UgEligibility;
  flabsUgNote?: string;
  lateral?: { eligibility: string; programmes: string[] };
}) {
  const { openEnquiry } = useEnquiry();
  const faculties = useMemo(() => [...new Set(items.map((i) => i.faculty)), ...(lateral?.programmes.length ? [LATERAL] : [])], [items, lateral]);
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    items.forEach((i) => m.set(i.faculty, (m.get(i.faculty) ?? 0) + 1));
    if (lateral) m.set(LATERAL, lateral.programmes.length);
    return m;
  }, [items, lateral]);

  const [tab, setTab] = useState(faculties[0]);
  const [level, setLevel] = useState<string>("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const query = q.trim().toLowerCase();

  const base: LiveCourse[] =
    tab === LATERAL && lateral
      ? lateral.programmes.map((t) => ({ faculty: LATERAL, section: "Lateral entry – direct 2nd year B.Tech", title: t, eligibility: lateral.eligibility, lateralEntry: true, partTime: false, level: "UG" }))
      : items.filter((i) => i.faculty === tab);
  const pool = query ? items : base;
  const levels = ["All", ...new Set(pool.map(LEVEL_OF))].filter((l, i, a) => a.indexOf(l) === i);
  const filtered = pool.filter(
    (c) => (level === "All" || LEVEL_OF(c) === level) && (!query || `${c.title} ${c.eligibility ?? ""}`.toLowerCase().includes(query)),
  );
  const groups = new Map<string, LiveCourse[]>();
  for (const c of filtered) {
    const key = query ? label(c.faculty) : c.section ?? "Courses";
    groups.set(key, [...(groups.get(key) ?? []), c]);
  }

  /** horizontal faculty strip (mobile/tablet): bring the chosen tab to the centre */
  const strip = useRef<HTMLUListElement>(null);
  // runs after the tab change has rendered (a scroll started inside the click handler is cancelled by the re-render)
  useEffect(() => {
    const ul = strip.current;
    const el = ul?.querySelector<HTMLElement>("[aria-selected=\"true\"]")?.parentElement;
    if (!ul || !el || ul.scrollWidth <= ul.clientWidth) return; // desktop: vertical list, nothing to scroll
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = Math.max(0, Math.min(el.offsetLeft - (ul.clientWidth - el.offsetWidth) / 2, ul.scrollWidth - ul.clientWidth));
    // animate scrollLeft directly: a native smooth scroll gets cancelled by the pill layout animation
    if (reduce) {
      ul.scrollLeft = target;
      return;
    }
    const controls = animate(ul.scrollLeft, target, { duration: 0.45, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => (ul.scrollLeft = v) });
    return () => controls.stop();
  }, [tab]);

  const choose = (f: string) => {
    setTab(f);
    setQ("");
    setLevel("All");
    setOpen(null);
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[18.5rem_minmax(0,1fr)] lg:gap-8">
      {/* ---------- faculty navigation ---------- */}
      <LayoutGroup>
        <nav aria-label="Faculties" className="min-w-0 lg:sticky lg:top-36 lg:self-start lg:overflow-hidden lg:rounded-3xl lg:border lg:border-brand/10 lg:bg-gradient-to-b lg:from-brand-soft lg:to-[var(--hl-soft)] lg:p-3 lg:shadow-[0_24px_48px_-36px_rgba(10,20,50,0.45)]">
          <div className="relative mb-3 hidden items-center justify-between overflow-hidden rounded-2xl bg-brand px-4 py-3.5 text-white lg:flex">
            <span aria-hidden="true" className="absolute -right-6 -top-8 h-24 w-24 rounded-full border-[0.9rem] border-[var(--hl)]/40" />
            <span className="relative">
              <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/70">Choose a</span>
              <span className="block font-display text-base font-semibold">Faculty</span>
            </span>
            <span className="relative rounded-full bg-[var(--hl)] px-2.5 py-0.5 text-xs font-bold text-brand-ink">{items.length} courses</span>
          </div>
          <ul ref={strip} role="tablist" className="no-scrollbar relative -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0">
            {faculties.map((f) => {
              const active = !query && tab === f;
              const Icon = ICON(f);
              return (
                <li key={f} className="shrink-0">
                  <button
                    role="tab"
                    aria-selected={active}
                    onClick={() => choose(f)}
                    className={`group relative isolate flex min-h-11 w-full items-center gap-3 rounded-xl px-3.5 py-2 text-left text-sm font-semibold transition-colors lg:py-2.5 ${
                      active ? "text-on-brand" : "border border-line bg-white text-ink hover:border-[var(--hl)]/70 hover:text-brand lg:border-white lg:bg-white/80 lg:shadow-[0_1px_2px_rgba(10,20,50,0.05)] lg:hover:bg-white"
                    }`}
                  >
                    {active && <motion.span layoutId="faculty-pill" className="absolute inset-0 -z-10 rounded-xl bg-brand shadow-[0_12px_24px_-14px_color-mix(in_srgb,var(--brand)_80%,transparent)]" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${active ? "bg-[var(--hl)] text-brand-ink" : "bg-brand-soft text-brand group-hover:bg-[var(--hl)]/30"}`}>
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span className="flex-1 whitespace-nowrap lg:whitespace-normal lg:text-balance lg:leading-snug">{label(f)}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${active ? "bg-white/20 text-white" : "bg-brand-soft text-brand"}`}>{counts.get(f)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </LayoutGroup>

      {/* ---------- results ---------- */}
      <div className="min-w-0">
        {/* toolbar */}
        <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-3 shadow-[0_1px_2px_rgba(10,20,50,0.04)] sm:flex-row sm:items-center">
          <label className="relative block flex-1">
            <span className="sr-only">Search all courses</span>
            <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setLevel("All");
              }}
              placeholder={`Search all ${items.length} courses or eligibility…`}
              className="min-h-11 w-full rounded-xl bg-surface-alt pl-10 pr-10 text-sm outline-none transition-[box-shadow,background-color] focus:bg-white focus:ring-4 focus:ring-brand/15"
            />
            {q && (
              <button type="button" onClick={() => setQ("")} className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:text-ink">
                <X aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </button>
            )}
          </label>
          {levels.length > 2 && (
            <div role="group" aria-label="Filter by level" className="flex gap-1 rounded-xl bg-surface-alt p-1">
              {levels.map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={level === l}
                  onClick={() => setLevel(l)}
                  className={`min-h-10 rounded-lg px-3.5 text-sm font-semibold transition-colors ${level === l ? "bg-white text-brand shadow-sm" : "text-muted hover:text-ink"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="mt-4 text-sm text-muted" aria-live="polite">
          {query ? (
            <>
              <strong className="text-ink">{filtered.length}</strong> result{filtered.length === 1 ? "" : "s"} for “{q}”
            </>
          ) : (
            <>
              <strong className="text-ink">{filtered.length}</strong> courses in {label(tab)}
            </>
          )}
        </p>

        {/* general UG eligibility – progressive disclosure */}
        {ugEligibility && !query && tab === (ugEligibility.faculty ?? items[0]?.faculty) && (
          <details className="group mt-4 overflow-hidden rounded-2xl border border-brand/15 bg-brand-soft/50">
            <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-5 py-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-on-brand">
                <Info aria-hidden="true" className="h-4 w-4" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold text-ink">{ugEligibility.heading}</span>
                <span className="block text-xs text-muted">{ugEligibility.gceALevel ? "Nationality, age, qualifying examination, GCE A-level and IB requirements" : "General eligibility for undergraduate admission"}</span>
              </span>
              <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-brand transition-transform group-open:rotate-180" />
            </summary>
            <div className="space-y-4 border-t border-brand/10 bg-white px-5 py-5 text-sm leading-relaxed text-muted">
              <ul className="list-disc space-y-1 pl-5">
                {ugEligibility.text.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              {ugEligibility.qualifyingExamination && (
                <div>
                  <p className="font-semibold text-ink">QUALIFYING EXAMINATION</p>
                  <p className="mt-1">{ugEligibility.qualifyingExamination}</p>
                </div>
              )}
              {ugEligibility.gceALevel && (
                <div>
                  <p className="font-semibold text-ink">GCE A-level</p>
                  <p className="mt-1">{ugEligibility.gceALevel}</p>
                </div>
              )}
              {ugEligibility.internationalBaccalaureate && (
              <div>
                <p className="font-semibold text-ink">International Baccalaureate DIPLOMA/CERTIFICATE</p>
                <p className="mt-1">{ugEligibility.internationalBaccalaureate.text}</p>
                <div className="mt-3 overflow-x-auto rounded-xl border border-line">
                  <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                    <thead className="bg-surface-alt">
                      <tr>
                        {Object.keys(ugEligibility.internationalBaccalaureate.table[0] ?? {}).map((h) => (
                          <th key={h} className="px-3 py-2 font-semibold text-ink">
                            {h === "program" ? "Program" : h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ugEligibility.internationalBaccalaureate.table.map((row, i) => (
                        <tr key={i} className="border-t border-line">
                          {Object.values(row).map((v, j) => (
                            <td key={j} className="px-3 py-2 align-top">
                              {v}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              )}
              {ugEligibility.note && (
                <div>
                  <p className="font-semibold text-ink">NOTE</p>
                  <p className="mt-1 whitespace-pre-line">{Array.isArray(ugEligibility.note) ? ugEligibility.note.join("\n") : ugEligibility.note}</p>
                </div>
              )}
            </div>
          </details>
        )}

        {/* course groups */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={`${query ? "q" : tab}-${level}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="mt-6 space-y-8">
            {[...groups.entries()].map(([section, courses]) => {
              const { title, duration } = query ? { title: section, duration: null } : splitSection(section);
              return (
                <div key={section}>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
                    {duration && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--hl)]/25 px-2.5 py-0.5 text-xs font-semibold text-brand-ink">
                        <Clock aria-hidden="true" className="h-3 w-3" /> {duration}
                      </span>
                    )}
                    <span className="ml-auto text-xs font-medium text-muted">{courses.length} courses</span>
                  </div>
                  <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
                    {courses.map((c, i) => {
                      const id = `${c.faculty}-${c.title}-${i}`;
                      const isOpen = open === id;
                      const { degree, name } = splitTitle(c.title);
                      return (
                        <li
                          key={id}
                          className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-[border-color,box-shadow,transform] duration-300 ${
                            isOpen
                              ? "border-[var(--hl)] shadow-[0_24px_48px_-30px_rgba(10,20,50,0.45)] sm:col-span-2 xl:col-span-3"
                              : "border-line hover:-translate-y-0.5 hover:border-[var(--hl)]/70"
                          }`}
                        >
                          {/* yellow accent rule */}
                          <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 origin-left bg-[var(--hl)] transition-transform duration-500 ${isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                          <div className="flex flex-1 flex-col p-4 pb-3">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                                {degree && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2 py-0.5 text-xs font-semibold tracking-wide text-brand">
                                    <GraduationCap aria-hidden="true" className="h-3 w-3" />
                                    {degree}
                                  </span>
                                )}
                                {c.lateralEntry && tab !== LATERAL && (
                                  <span className="rounded-full bg-[var(--hl)]/25 px-2 py-0.5 text-xs font-semibold text-[var(--hl-ink)]">Lateral entry</span>
                                )}
                                {c.partTime && <span className="rounded-full bg-surface-alt px-2 py-0.5 text-xs font-semibold text-muted">Part time</span>}
                              </div>
                            </div>
                            <p title={c.title} className={`mt-2 font-display text-[0.9375rem] font-medium leading-[1.45] text-ink sm:mt-3 ${isOpen ? "" : "line-clamp-2 sm:min-h-[2.75rem]"}`}>
                              {name}
                            </p>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                                  <div className="mt-3 rounded-xl border-l-4 border-[var(--hl)] bg-[var(--hl-soft)] p-3.5">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--hl-ink)]">Eligibility</p>
                                    <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-ink/80">
                                      {c.eligibility ?? "Eligibility not published on the admissions page – ask a counsellor."}
                                    </p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <div className="flex items-center justify-between gap-2 bg-surface-alt/70 px-4 py-2">
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              onClick={() => setOpen(isOpen ? null : id)}
                              className="inline-flex min-h-10 items-center gap-1 text-[0.8125rem] font-medium text-brand transition-colors hover:text-brand-ink"
                            >
                              {isOpen ? "Hide eligibility" : "View eligibility"}
                              <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                            </button>
                            <button
                              type="button"
                              onClick={() => openEnquiry({ intent: "programme" })}
                              className="inline-flex min-h-10 items-center gap-1 rounded-full bg-[var(--hl)] px-4 text-[0.8125rem] font-semibold text-brand-ink transition-[filter,transform] hover:brightness-105 active:translate-y-px"
                            >
                              Enquire
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">
                No course matches “{q}”. Try a shorter word such as “CSE”, “MBA” or “Design”.
              </div>
            )}
            {!query && /^(LIBERAL|FLABS)/.test(tab) && flabsUgNote && <p className="text-sm text-muted">{flabsUgNote}</p>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
