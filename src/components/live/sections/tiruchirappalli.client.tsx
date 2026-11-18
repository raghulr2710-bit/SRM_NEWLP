"use client";
import type { CSSProperties } from "react";

/**
 * Client-side motion pieces for the SRMIST Tiruchirappalli section designs.
 * Each component re-implements a Motion Studio reference with motion/react + Tailwind
 * (no provider code installed). All of them respect prefers-reduced-motion.
 */

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Award, ChevronDown, X, ArrowRight } from "lucide-react";
import type { LiveImg } from "../types";

type Img = LiveImg | null;

/* ------------------------------------------------------------------ */
/* Why – Motion Studio: aceternity-components-layout-grid              */
/* Bento grid of photos; click / Enter expands a tile with its title.   */
/* ------------------------------------------------------------------ */

export function WhyLayoutGrid({ items }: { items: { title: string; image: LiveImg }[] }) {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const last = useRef<number | null>(null);
  const uid = useId();
  // biggest source image gets the 2×2 tile (keeps the photo sharp)
  const big = items.reduce((b, it, i) => (it.image.width > items[b].image.width ? i : b), 0);
  const wide = big === 0 ? 1 : 0;

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (active === null) {
      if (last.current !== null) tiles.current[last.current]?.focus();
      return;
    }
    last.current = active;
    closeBtn.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close]);

  const sel = active !== null ? items[active] : null;

  return (
    <div className="relative">
      <ul className="grid grid-flow-row-dense auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] md:grid-cols-4 lg:auto-rows-[12.5rem] lg:gap-4">
        {items.map((it, i) => {
          const span = i === big ? "col-span-2 row-span-2" : i === wide ? "col-span-2" : "";
          return (
            <li key={it.title} className={span}>
              <motion.button
                ref={(el) => {
                  tiles.current[i] = el;
                }}
                type="button"
                layoutId={reduce ? undefined : `${uid}-why-${i}`}
                onClick={() => setActive(i)}
                aria-expanded={active === i}
                aria-controls={`${uid}-why-panel`}
                aria-label={`${it.title} – view`}
                className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-2xl bg-brand-soft text-left ring-1 ring-line focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hl)]"
              >
                <Image
                  src={it.image.src}
                  alt={it.image.alt}
                  fill
                  sizes={i === big ? "(min-width:768px) 50vw, 100vw" : i === wide ? "(min-width:768px) 50vw, 100vw" : "(min-width:768px) 25vw, 50vw"}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[var(--brand-deep)]/90 via-[var(--brand-deep)]/25 to-transparent" />
                <span aria-hidden="true" className="absolute left-3 top-3 font-display text-xs font-semibold tracking-[0.14em] text-white/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4 ${i === big ? "lg:p-6" : ""}`}>
                  <span className={`font-display font-semibold leading-snug text-white ${i === big ? "text-lg sm:text-xl lg:text-2xl" : "text-[0.8125rem] sm:text-[0.9375rem]"}`}>{it.title}</span>
                  <span aria-hidden="true" className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--hl)] text-lg leading-none text-brand-ink transition-transform duration-300 group-hover:rotate-90 sm:flex">
                    +
                  </span>
                </span>
              </motion.button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {sel && active !== null && (
            <motion.div
              key="scrim"
              aria-hidden="true"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-[var(--brand-deep)]/60 backdrop-blur-[2px]"
            />
        )}
        {sel && active !== null && (
            <div key="panel" className="pointer-events-none fixed inset-0 z-[81] flex items-center justify-center p-4 sm:p-6">
              <motion.div
                id={`${uid}-why-panel`}
                role="dialog"
                aria-modal="true"
                onKeyDown={(e) => {
                  // single focusable control: keep Tab on the close button
                  if (e.key === "Tab") {
                    e.preventDefault();
                    closeBtn.current?.focus();
                  }
                }}
                aria-label={sel.title}
                layoutId={reduce ? undefined : `${uid}-why-${active}`}
                initial={reduce ? { opacity: 0 } : undefined}
                animate={reduce ? { opacity: 1 } : undefined}
                exit={reduce ? { opacity: 0 } : undefined}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                className="pointer-events-auto relative grid w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-30px_rgba(5,15,40,0.6)] sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]"
              >
                <div className="relative aspect-[16/10] bg-brand-soft sm:aspect-auto sm:min-h-60">
                  <Image src={sel.image.src} alt={sel.image.alt} fill sizes="(min-width:640px) 240px, 100vw" className="object-cover" />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: reduce ? 0 : 0.15 } }}
                  className="flex flex-col justify-center gap-3 p-5 pr-14 sm:p-8 sm:pr-14"
                >
                  <span className="font-display text-sm font-semibold tracking-[0.14em] text-[var(--hl-ink)]">
                    {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">{sel.title}</h3>
                  <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-[var(--hl)]" />
                </motion.div>
                <button
                  ref={closeBtn}
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="absolute right-2 top-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/90 text-ink ring-1 ring-line transition-colors hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hl)]"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Placements – Motion Studio: aceternity-components-3d-card           */
/* Pointer-tilt with depth layers; static on touch / reduced motion.    */
/* ------------------------------------------------------------------ */

export interface Profile {
  name: string;
  batch?: string;
  department?: string;
  ctc?: string;
  company?: string;
  photo: Img;
  companyLogo?: Img;
}

/** One auto-scrolling row of profile cards (Magic UI Marquee); pauses on hover / focus, static wrap for reduced motion. */
export function ProfileTiltGrid({ profiles }: { profiles: Profile[] }) {
  const card = (p: Profile) => (
    <article className="relative flex h-full w-60 flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-brand to-[var(--brand-deep)] p-2.5 text-white shadow-[0_22px_44px_-28px_color-mix(in_srgb,var(--brand-deep)_90%,transparent)] ring-1 ring-white/10 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:ring-[var(--hl)]/60 sm:w-64 sm:p-3">
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:14px_14px]" />
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-b from-[var(--brand-tint)] to-[var(--brand-tint-2)] ring-2 ring-white/15">
        {p.photo && <Image src={p.photo.src} alt={p.photo.alt} fill sizes="256px" className="object-cover object-top" />}
        {p.ctc && (
          <span className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] truncate rounded-full bg-[var(--hl)] px-2.5 py-1 text-xs font-bold text-brand-ink shadow-sm">{p.ctc}</span>
        )}
      </div>
      <div className="relative flex flex-1 flex-col px-1 pb-1 pt-3">
        <div className="mb-3.5">
          <h4 className="font-display text-base font-semibold leading-tight text-white">{p.name}</h4>
          {p.batch && <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--hl)]">{p.batch}</p>}
          {p.department && <p className="mt-0.5 text-[0.8125rem] text-white/75">{p.department}</p>}
        </div>
        <div className="relative mt-auto flex h-12 items-center justify-center rounded-lg bg-white px-3">
          {p.companyLogo ? (
            <span className="relative block h-8 w-full">
              <Image src={p.companyLogo.src} alt={p.companyLogo.alt} fill sizes="220px" className="object-contain" />
            </span>
          ) : p.company ? (
            <span className="truncate text-xs font-semibold text-ink">{p.company}</span>
          ) : null}
        </div>
      </div>
    </article>
  );
  return (
    <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)] motion-reduce:[mask-image:none]">
      <ul className="marquee-track flex w-max gap-5 py-3 pr-5 motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center" style={{ "--marquee-duration": `${Math.max(profiles.length * 6, 36)}s` } as CSSProperties}>
        {profiles.map((p) => (
          <li key={p.name} className="shrink-0">
            {card(p)}
          </li>
        ))}
        {profiles.map((p) => (
          <li key={`dup-${p.name}`} aria-hidden="true" inert className="shrink-0 motion-reduce:hidden">
            {card(p)}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Recruiters – Motion Studio: magicui-r-marquee-3d-json               */
/* Tilted multi-column vertical marquee; pauses on hover / focus.       */
/* ------------------------------------------------------------------ */

type Logo = { name: string; logo: Img };

function VerticalColumn({ logos: source, reverse, speed, paused, hidden }: { logos: Logo[]; reverse: boolean; speed: number; paused: boolean; hidden: boolean }) {
  // Repeat the column so one copy is far taller than the tilted viewport – the loop never shows empty space.
  const logos = Array.from({ length: Math.max(1, Math.ceil(16 / Math.max(source.length, 1))) }, () => source).flat();
  const y = useMotionValue(0);
  const track = useRef<HTMLDivElement>(null);
  useAnimationFrame((_, delta) => {
    const el = track.current;
    if (paused || !el) return;
    // three identical copies: loop over one copy so the column always overfills the view above and below
    const half = el.scrollHeight / 3;
    if (!half) return;
    let next = y.get() + (reverse ? 1 : -1) * speed * (delta / 1000);
    if (next <= -half) next += half;
    if (next > 0) next -= half;
    y.set(next);
  });
  const card = (l: Logo, i: number, dup: boolean) => (
    <li key={`${dup ? "b" : "a"}${i}`} aria-hidden={dup || undefined} className="flex h-20 w-36 shrink-0 items-center justify-center rounded-xl border border-line bg-white px-4 shadow-[0_10px_24px_-18px_rgba(10,20,50,0.5)] sm:w-40">
      <span className="relative block h-10 w-full">
        {l.logo ? <Image src={l.logo.src} alt={dup ? "" : l.logo.alt} fill sizes="160px" className="object-contain" /> : <span className="text-xs font-semibold text-ink">{l.name}</span>}
      </span>
    </li>
  );
  return (
    <motion.div ref={track} style={{ y }} aria-hidden={hidden || undefined}>
      <ul className="flex flex-col gap-4 pb-4">{logos.map((l, i) => card(l, i, hidden || i >= source.length))}</ul>
      <ul aria-hidden="true" className="flex flex-col gap-4 pb-4">
        {logos.map((l, i) => card(l, i, true))}
      </ul>
      <ul aria-hidden="true" className="flex flex-col gap-4 pb-4">
        {logos.map((l, i) => card(l, i, true))}
      </ul>
    </motion.div>
  );
}

export function Marquee3D({ logos }: { logos: Logo[] }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);
  const cols = 5;
  const columns = Array.from({ length: cols }, (_, c) => logos.filter((_, i) => i % cols === c));

  if (reduce) {
    return (
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {logos.map((l) => (
          <li key={l.name} className="flex h-16 items-center justify-center rounded-xl border border-line bg-white px-4">
            <span className="relative block h-9 w-full">{l.logo && <Image src={l.logo.src} alt={l.logo.alt} fill sizes="160px" className="object-contain" />}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="relative h-[24rem] overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,transparent,black_9%,black_91%,transparent),linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [-webkit-mask-composite:source-in] [perspective:600px] sm:h-[30rem] lg:h-[34rem]"
    >
      <div className="absolute left-1/2 top-1/2 flex gap-4 [transform:translate(-50%,-50%)_translateZ(-40px)_rotateX(18deg)_rotateY(-8deg)_rotateZ(18deg)_scale(1.18)]">
        {columns.map((col, c) => (
          <VerticalColumn key={c} logos={col} reverse={c % 2 === 1} speed={22 + (c % 2) * 6} paused={hover} hidden={false} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Collaborations – Motion Studio: aceternity-components-card-spotlight */
/* Partner cards with a soft spotlight that follows the cursor.         */
/* ------------------------------------------------------------------ */

export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const bg = useMotionTemplate`radial-gradient(220px circle at ${x}px ${y}px, color-mix(in srgb, var(--brand) 14%, transparent), transparent 70%)`;
  const ring = useMotionTemplate`radial-gradient(180px circle at ${x}px ${y}px, color-mix(in srgb, var(--hl) 85%, transparent), transparent 70%)`;
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };
  return (
    <div onPointerMove={reduce ? undefined : move} className={`group relative overflow-hidden rounded-2xl bg-line p-px ${className}`}>
      {!reduce && (
        <motion.span aria-hidden="true" style={{ background: ring }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      <div className="relative h-full rounded-[calc(1rem-1px)] bg-white">
        {!reduce && (
          <motion.span aria-hidden="true" style={{ background: bg }} className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        )}
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Rankings – Motion Studio: aceternity-components-tabs                */
/* One tab per ranking body; animated indicator + stacked panel deck.   */
/* ------------------------------------------------------------------ */

export function RankingTabs({ items }: { items: { title?: string | null; text: string; badge: Img; body: string }[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const uid = useId();
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = items.length;
    let next = active;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (active + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (active - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setActive(next);
    btns.current[next]?.focus();
  };

  const cur = items[active];
  const curTitle = cur?.title && cur.title.trim().toLowerCase() !== cur.body.trim().toLowerCase() ? cur.title : null;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[21rem_minmax(0,1fr)] lg:items-stretch lg:gap-8">
      {/* ranking bodies: logo tiles (mobile) → vertical list (desktop) */}
      <div
        role="tablist"
        aria-label="Ranking bodies"
        aria-orientation="vertical"
        onKeyDown={onKey}
        className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-1 lg:gap-1.5 lg:rounded-3xl lg:border lg:border-line lg:bg-white lg:p-2.5 lg:shadow-[0_24px_48px_-36px_rgba(10,20,50,0.45)]"
      >
        {items.map((r, i) => {
          const on = i === active;
          return (
            <button
              key={r.body}
              ref={(el) => {
                btns.current[i] = el;
              }}
              id={`${uid}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={`group relative flex cursor-pointer flex-col items-center gap-2 rounded-2xl p-2.5 text-center transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hl)] lg:min-h-16 lg:flex-row lg:gap-3 lg:rounded-xl lg:px-3 lg:py-2 lg:text-left ${on ? "text-white" : "bg-white text-ink ring-1 ring-line hover:bg-brand-soft lg:bg-transparent lg:ring-0"}`}
            >
              {on && (
                <motion.span
                  layoutId={reduce ? undefined : `${uid}-active`}
                  transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                  className="absolute inset-0 rounded-2xl bg-brand shadow-[0_14px_28px_-16px_color-mix(in_srgb,var(--brand)_90%,transparent)] lg:rounded-xl"
                >
                  <span className="absolute inset-y-2 left-0 hidden w-1 rounded-r-full bg-[var(--hl)] lg:block" />
                </motion.span>
              )}
              <span className="relative flex h-11 w-full shrink-0 items-center justify-center rounded-lg bg-white p-1.5 ring-1 ring-line lg:h-11 lg:w-14">
                <span className="relative h-full w-full">
                  {r.badge ? (
                    <Image src={r.badge.src} alt="" fill sizes="56px" className="object-contain" />
                  ) : (
                    <Award aria-hidden="true" className="absolute inset-0 m-auto h-5 w-5 text-brand" strokeWidth={1.5} />
                  )}
                </span>
              </span>
              <span className="relative min-w-0 flex-1">
                <span className="block text-xs font-semibold leading-snug sm:text-[0.8125rem] lg:text-sm">{r.body}</span>
              </span>
              <ArrowRight aria-hidden="true" className={`relative hidden h-4 w-4 shrink-0 transition-[transform,opacity] lg:block ${on ? "translate-x-0 text-[var(--hl)] opacity-100" : "-translate-x-1 opacity-0 group-hover:opacity-60"}`} />
            </button>
          );
        })}
      </div>

      {/* detail panel */}
      {cur && (
        <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-[var(--brand-deep)] p-6 text-white shadow-[0_30px_60px_-40px_rgba(10,20,50,0.6)] sm:p-10">
          <span aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[2.5rem] border-white/5" />
          <span aria-hidden="true" className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:28px_28px]" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: reduce ? 0.12 : 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid h-full items-center gap-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-10"
            >
              <span className="flex h-32 w-40 items-center justify-center rounded-2xl bg-white p-4 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.6)] sm:h-40 sm:w-full">
                <span className="relative h-full w-full">
                  {cur.badge ? (
                    <Image src={cur.badge.src} alt={cur.badge.alt} fill sizes="160px" className="object-contain" />
                  ) : (
                    <Award aria-hidden="true" className="absolute inset-0 m-auto h-10 w-10 text-brand" strokeWidth={1.5} />
                  )}
                </span>
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold tracking-[0.14em] text-[var(--hl)]">
                  {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">{cur.body}</h3>
                {curTitle && <p className="mt-1.5 text-lg font-semibold text-[var(--hl)]">{curTitle}</p>}
                <p className="mt-4 whitespace-pre-line text-[0.98rem] leading-relaxed text-white/80">{cur.text}</p>
                <div className="mt-6 flex gap-1.5" aria-hidden="true">
                  {items.map((_, i) => (
                    <span key={i} className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${i === active ? "w-7 bg-[var(--hl)]" : "w-1.5 bg-white/30"}`} />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* every ranking's text stays in the HTML for search engines / no-JS */}
          <div className="sr-only">
            {items.map((r, i) => (i === active ? null : <p key={r.body}>{r.body}: {r.text}</p>))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Campus – Motion Studio: aceternity-components-parallax-scroll       */
/* Columns drift at different speeds with page scroll (lg+ only).       */
/* ------------------------------------------------------------------ */

type CampusImg = LiveImg & { title: string; tag?: string };

function CampusTile({ it }: { it: CampusImg }) {
  return (
    <figure className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-soft">
      <Image src={it.src} alt={it.alt} fill sizes="(min-width:1024px) 30vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--brand-deep)]/85 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-2 p-3 sm:p-4">
        {it.tag && <span className="rounded-full bg-[var(--hl)] px-2.5 py-0.5 text-xs font-semibold text-brand-ink">{it.tag}</span>}
        <span className="font-display text-sm font-semibold text-white sm:text-base">{it.title}</span>
      </figcaption>
    </figure>
  );
}

function ParallaxCol({ items, y }: { items: CampusImg[]; y: MotionValue<number> | number }) {
  return (
    <motion.ul style={{ y }} className="grid content-start gap-4 lg:gap-5">
      {items.map((it) => (
        <li key={it.src + it.title}>
          <CampusTile it={it} />
        </li>
      ))}
    </motion.ul>
  );
}

export function ParallaxGallery({ items }: { items: CampusImg[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], [60, -90]);
  const down = useTransform(scrollYProgress, [0, 1], [-40, 70]);
  const cols = [0, 1, 2].map((c) => items.filter((_, i) => i % 3 === c));

  // Both layouts are server-rendered and switched by CSS (no hydration shift);
  // display:none keeps the inactive copy out of the accessibility tree and lazy images unloaded.
  return (
    <div ref={ref}>
      {/* below lg: plain two-column grid */}
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
        {items.map((it) => (
          <li key={it.src + it.title}>
            <CampusTile it={it} />
          </li>
        ))}
      </ul>
      {/* lg+: three columns drifting at different speeds (static for reduced motion) */}
      <div className="hidden grid-cols-3 items-start gap-5 py-10 lg:grid">
        <ParallaxCol items={cols[0]} y={reduce ? 0 : up} />
        <ParallaxCol items={cols[1]} y={reduce ? 0 : down} />
        <ParallaxCol items={cols[2]} y={reduce ? 0 : up} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FAQs – Motion Studio: motion-primitives-accordion                   */
/* Single-open accordion with animated height; answers stay in the DOM. */
/* ------------------------------------------------------------------ */

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const uid = useId();
  return (
    <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((f, i) => {
        const on = open === i;
        return (
          <li key={f.q}>
            <h3>
              <button
                type="button"
                id={`${uid}-q-${i}`}
                aria-expanded={on}
                aria-controls={`${uid}-a-${i}`}
                onClick={() => setOpen(on ? null : i)}
                className="group flex min-h-14 w-full cursor-pointer items-center gap-4 px-5 py-4 text-left font-display text-[0.98rem] font-semibold text-ink transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[var(--hl)] sm:px-6"
              >
                <span aria-hidden="true" className={`w-7 shrink-0 font-display text-sm tabular-nums ${on ? "text-[var(--hl-ink)]" : "text-muted"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{f.q}</span>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${on ? "bg-brand text-white" : "bg-brand-soft text-brand"}`}>
                  <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${on ? "rotate-180" : ""}`} />
                </span>
              </button>
            </h3>
            <motion.div
              id={`${uid}-a-${i}`}
              role="region"
              aria-labelledby={`${uid}-q-${i}`}
              aria-hidden={!on}
              inert={!on}
              initial={false}
              animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="whitespace-pre-line px-5 pb-5 pl-[4.25rem] text-sm leading-relaxed text-muted sm:px-6 sm:pl-[4.5rem]">{f.a}</p>
            </motion.div>
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Campus – featured showcase: large photo with slow Ken-Burns zoom and */
/* crossfade, glass caption, thumbnail rail with progress (auto-plays,  */
/* pauses on hover / focus; static for reduced motion).                 */
/* ------------------------------------------------------------------ */

export function CampusShowcase({ items, interval = 4800 }: { items: CampusImg[]; interval?: number }) {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const reduce = useReducedMotion();
  const n = items.length;
  useEffect(() => {
    if (hold || reduce || n < 2) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % n), interval);
    return () => window.clearTimeout(t);
  }, [active, hold, reduce, n, interval]);
  const cur = items[active];
  if (!cur) return null;

  return (
    <div
      className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-5"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      {/* featured photo */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-soft shadow-[0_40px_80px_-50px_rgba(10,20,50,0.7)] sm:aspect-[16/10] lg:aspect-auto lg:h-[32rem]">
        <AnimatePresence initial={false}>
          <motion.div
            key={cur.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={reduce ? false : { scale: 1.04 }}
              animate={{ scale: 1 }}
              transition={{ duration: reduce ? 0 : interval / 1000 + 1, ease: "linear" }}
            >
              <Image src={cur.src} alt={cur.alt} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
        {/* glass caption */}
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 rounded-2xl border border-white/20 bg-white/10 p-3.5 text-white backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-4">
          <div className="min-w-0" aria-live="polite">
            {cur.tag && <span className="mb-1.5 inline-block rounded-full bg-[var(--hl)] px-2.5 py-0.5 text-xs font-semibold text-brand-ink">{cur.tag}</span>}
            <p className="truncate font-display text-lg font-semibold sm:text-2xl">{cur.title}</p>
          </div>
          <p className="shrink-0 font-display text-sm font-semibold tabular-nums text-white/80">
            <span className="text-white">{String(active + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* thumbnail rail */}
      <ul className="no-scrollbar -mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-1 lg:mx-0 lg:h-[32rem] lg:flex-col lg:gap-2.5 lg:overflow-visible lg:px-0 lg:pb-0" aria-label="Campus photos">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <li key={it.src} className="w-36 shrink-0 snap-start sm:w-44 lg:min-h-0 lg:w-auto lg:flex-1">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={on ? "true" : undefined}
                className={`group relative block h-24 w-full cursor-pointer overflow-hidden rounded-2xl text-left ring-2 transition-[box-shadow,transform] duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hl)] lg:h-full ${on ? "ring-[var(--hl)]" : "ring-transparent hover:-translate-y-0.5"}`}
              >
                <Image src={it.src} alt="" fill sizes="(min-width:1024px) 240px, 176px" className={`object-cover transition-[transform,filter] duration-500 ${on ? "scale-105" : "grayscale-[35%] group-hover:scale-105 group-hover:grayscale-0"}`} />
                <span aria-hidden="true" className={`absolute inset-0 transition-colors ${on ? "bg-[var(--brand-deep)]/20" : "bg-[var(--brand-deep)]/45 group-hover:bg-[var(--brand-deep)]/25"}`} />
                <span className="absolute inset-x-2.5 bottom-2 truncate text-xs font-semibold text-white drop-shadow sm:text-[0.8125rem]">{it.title}</span>
                {/* progress */}
                {on && !reduce && !hold && (
                  <motion.span
                    key={`p-${active}`}
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 origin-left bg-[var(--hl)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: interval / 1000, ease: "linear" }}
                  />
                )}
                <span className="sr-only">Show photo: {it.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Campus – Motion Studio: aceternity card-hover-effect. A tidy grid of  */
/* photo cards (photos shown at their natural size → always sharp); a   */
/* tinted highlight glides between cards on hover / focus.              */
/* ------------------------------------------------------------------ */

export function CampusCards({ items }: { items: CampusImg[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const reduce = useReducedMotion();
  return (
    <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4" onMouseLeave={() => setHover(null)}>
      {items.map((it, i) => (
        <li key={it.src} className="relative" onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} onBlur={() => setHover(null)} tabIndex={0}>
          <AnimatePresence>
            {hover === i && (
              <motion.span
                layoutId={reduce ? undefined : "campus-card-hover"}
                className="absolute inset-0 rounded-3xl bg-brand-soft ring-1 ring-brand/15"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
              />
            )}
          </AnimatePresence>
          <figure className="relative z-10 p-2 sm:p-2.5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-soft shadow-[0_14px_30px_-22px_rgba(10,20,50,0.55)]">
              <Image src={it.src} alt={it.alt} fill sizes="(min-width:1024px) 300px, (min-width:640px) 33vw, 50vw" className={`object-cover transition-transform duration-500 ease-out ${hover === i ? "scale-105" : ""}`} />
              {it.tag && <span className="absolute left-2.5 top-2.5 rounded-full bg-[var(--hl)] px-2.5 py-0.5 text-xs font-semibold text-brand-ink shadow-sm">{it.tag}</span>}
            </div>
            <figcaption className="flex items-center justify-between gap-2 px-1 pb-1 pt-3">
              <span className="font-display text-[0.95rem] font-semibold leading-snug text-ink sm:text-base">{it.title}</span>
              <span aria-hidden="true" className={`font-display text-xs font-semibold tabular-nums transition-colors ${hover === i ? "text-brand" : "text-muted/60"}`}>{String(i + 1).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
