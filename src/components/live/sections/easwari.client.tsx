"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, Briefcase, Building2, Leaf, Lightbulb, MapPin, Music2, Plane, Quote, Sparkles, Users, type LucideIcon } from "lucide-react";
import type { LiveImg } from "../types";

/** Easwari client pieces (state / pointer / scroll driven). Server sections pass plain data + children only. */

type Dir = "top" | "right" | "bottom" | "left";

function entryDir(e: { clientX: number; clientY: number }, el: HTMLElement): Dir {
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left - r.width / 2) * (r.width > r.height ? r.height / r.width : 1);
  const y = (e.clientY - r.top - r.height / 2) * (r.height > r.width ? r.width / r.height : 1);
  const d = Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4;
  return (["top", "right", "bottom", "left"] as const)[d];
}

const OFFSET: Record<Dir, { x: string; y: string }> = {
  top: { x: "0%", y: "-100%" },
  right: { x: "100%", y: "0%" },
  bottom: { x: "0%", y: "100%" },
  left: { x: "-100%", y: "0%" },
};

/**
 * Motion Studio: aceternity-components-direction-aware-hover.
 * Uniform photo tile; the caption panel slides in from the side the pointer entered
 * (and leaves the way it exits). Keyboard focus slides it up from the bottom; on
 * touch (no hover) captions are always visible; reduced motion = fade only.
 */
export function DirectionTile({ image, title, index }: { image: LiveImg; title: string; index: number }) {
  const reduce = useReducedMotion();
  const [state, setState] = useState<{ on: boolean; dir: Dir }>({ on: false, dir: "bottom" });
  const off = reduce ? { x: "0%", y: "0%" } : OFFSET[state.dir];
  return (
    <div
      tabIndex={0}
      onMouseEnter={(e) => setState({ on: true, dir: entryDir(e, e.currentTarget) })}
      onMouseLeave={(e) => setState({ on: false, dir: entryDir(e, e.currentTarget) })}
      onFocus={() => setState({ on: true, dir: "bottom" })}
      onBlur={() => setState({ on: false, dir: "bottom" })}
      className="group relative aspect-square overflow-hidden rounded-2xl bg-brand-soft outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-brand"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width:1024px) 22vw, (min-width:640px) 30vw, 46vw"
        className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.06]"
      />
      <span aria-hidden="true" className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-display text-xs font-semibold text-brand backdrop-blur-sm">
        {String(index + 1).padStart(2, "0")}
      </span>
      <motion.div
        initial={false}
        animate={state.on ? { x: "0%", y: "0%", opacity: 1 } : { ...off, opacity: 0 }}
        transition={{ duration: reduce ? 0.2 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-end bg-gradient-to-t from-[var(--brand-deep)]/90 via-[var(--brand-deep)]/45 to-transparent p-3 sm:p-4 [@media(hover:none)]:transform-none! [@media(hover:none)]:opacity-100!"
      >
        <h3 className="border-l-[3px] border-[var(--hl)] pl-2.5 font-display text-sm font-semibold leading-snug text-white sm:text-base">{title}</h3>
      </motion.div>
    </div>
  );
}

/**
 * Motion Studio: aceternity-components-card-spotlight.
 * A soft maroon radial spotlight follows the pointer inside the card.
 */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onPointerMove={move} className={`group relative overflow-hidden ${className}`} style={{ "--sx": "50%", "--sy": "0%" } as CSSProperties}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(260px_circle_at_var(--sx)_var(--sy),color-mix(in_srgb,var(--brand)_14%,transparent),transparent_70%)]"
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

/**
 * Motion Studio: aceternity-components-3d-card.
 * Subtle pointer tilt (max ~8deg) with the inner logo lifted on the Z axis.
 * Static for touch and reduced motion.
 */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 16);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 16);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };
  return (
    <div className="h-full [perspective:900px]">
      <motion.div onPointerMove={move} onPointerLeave={reset} style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }} className={className}>
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Motion Studio: aceternity-components-focus-cards.
 * Hovering (or focusing) one photo blurs and dims the others and reveals its title.
 * Titles are always shown on touch devices.
 */
export function FocusGallery({ items }: { items: (LiveImg & { title: string; tag?: string })[] }) {
  const [active, setActive] = useState<number | null>(null);
  // Bento that fits one screen on desktop: 5 × 2 grid, featured photo 2 × 2, six photos 1 × 1.
  // With six photos the last one spans two columns (desktop and phone) so the grid has no hole.
  const span = (i: number) =>
    i === 0
      ? "col-span-2 aspect-[16/10] sm:row-span-2 sm:aspect-auto"
      : items.length === 6 && i === 5
        ? "col-span-2 aspect-[16/10] sm:col-span-1 sm:aspect-auto lg:col-span-2"
        : i === 6
        ? "aspect-square sm:col-span-3 sm:aspect-auto lg:col-span-1"
        : "aspect-square sm:aspect-auto";
  return (
    <ul
      className="grid grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:grid-cols-3 lg:h-[min(60vh,32rem)] lg:min-h-[24rem] lg:grid-cols-5 lg:grid-rows-2 lg:gap-3.5"
      onMouseLeave={() => setActive(null)}
    >
      {items.map((it, i) => {
        const dim = active !== null && active !== i;
        const on = active === i;
        return (
          <li
            key={it.src + i}
            tabIndex={0}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            className={`relative overflow-hidden rounded-2xl bg-brand-soft outline-none ring-offset-2 transition-[filter,transform,opacity] duration-300 ease-out focus-visible:ring-2 focus-visible:ring-brand motion-reduce:transition-opacity ${span(i)} ${
              dim ? "opacity-60 blur-[3px] motion-safe:scale-[0.98] motion-reduce:blur-none" : ""
            }`}
          >
            <Image src={it.src} alt={it.alt} fill sizes={i === 0 ? "(min-width:1024px) 40vw, 100vw" : "(min-width:1024px) 20vw, 50vw"} className={`object-cover transition-transform duration-700 ease-out ${on ? "scale-105" : ""}`} />
            {/* caption – always visible (tag + title), stronger on the featured photo */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--brand-deep)]/85 via-black/15 to-transparent" />
            <div className={`absolute inset-x-0 bottom-0 flex flex-col items-start gap-1.5 ${i === 0 ? "p-4 sm:p-6" : "p-3 sm:p-3.5"}`}>
              {it.tag && <span className="rounded-full bg-[var(--hl)] px-2.5 py-0.5 text-xs font-semibold text-brand-ink">{it.tag}</span>}
              <span className={`font-display font-semibold leading-snug text-white drop-shadow ${i === 0 ? "text-xl sm:text-3xl" : "text-sm sm:text-base"}`}>{it.title}</span>
              {i === 0 && <span aria-hidden="true" className="mt-1 block h-1 w-10 rounded-full bg-[var(--hl)]" />}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Motion Studio: aceternity-components-timeline (scroll beam).
 * Vertical rail that fills in maroon → yellow as the list scrolls through view.
 * Reduced motion shows the rail fully filled.
 */
export function TimelineRail({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref} className={`relative ${className}`}>
      <span aria-hidden="true" className="absolute bottom-6 left-[1.375rem] top-6 w-0.5 -translate-x-1/2 rounded-full bg-line" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reduce ? 1 : scaleY }}
        className="absolute bottom-6 left-[1.375rem] top-6 w-0.5 origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-brand to-[var(--hl-deep)]"
      />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials – Motion Studio: aceternity-components-animated-       */
/* testimonials (one story at a time, slide + word reveal, arrows,      */
/* avatar dots, auto-advance that pauses on hover / focus).             */
/* ------------------------------------------------------------------ */

type Story = { name: string; line2: string; line3: string; quote?: string; photo?: LiveImg | null };

export function QuoteSlider({ items, interval = 6500 }: { items: Story[]; interval?: number }) {
  const [[active, dir], setState] = useState<[number, number]>([0, 1]);
  const [hold, setHold] = useState(false);
  const reduce = useReducedMotion();
  const n = items.length;
  const go = (d: number) => setState(([a]) => [(a + d + n) % n, d]);
  const to = (i: number) => setState(([a]) => [i, i >= a ? 1 : -1]);
  useEffect(() => {
    if (hold || reduce || n < 2) return;
    const t = window.setTimeout(() => setState(([a]) => [(a + 1) % n, 1]), interval);
    return () => window.clearTimeout(t);
  }, [active, hold, reduce, n, interval]);
  const cur = items[active];
  if (!cur) return null;
  const words = (cur.quote ?? "").split(" ");

  return (
    <div
      className="mx-auto max-w-5xl"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_40px_80px_-50px_rgba(60,10,20,0.55)]">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.figure
            key={active}
            custom={dir}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -40 }}
            transition={{ duration: reduce ? 0.15 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-[minmax(0,1fr)] md:min-h-[20rem] md:grid-cols-[17rem_minmax(0,1fr)]"
            aria-live="polite"
          >
            {/* person */}
            <figcaption className="relative flex flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br from-brand to-[var(--brand-deep)] px-6 py-8 text-center text-white">
              <span aria-hidden="true" className="absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(135deg,white_0_1px,transparent_1px_14px)]" />
              <span aria-hidden="true" className="absolute -bottom-14 -left-14 h-40 w-40 rounded-full border-[1.25rem] border-[var(--hl)]/20" />
              {cur.photo && (
                <span className="relative h-28 w-28 overflow-hidden rounded-full bg-brand-soft ring-4 ring-[var(--hl)] ring-offset-4 ring-offset-transparent">
                  <Image src={cur.photo.src} alt={cur.photo.alt} fill sizes="112px" className="object-cover object-top" />
                </span>
              )}
              <span className="relative mt-1 block font-display text-xl font-semibold leading-tight">{cur.name}</span>
              {cur.line2 && <span className="relative block text-sm leading-snug text-white/80">{cur.line2}</span>}
              {cur.line3 && <span className="relative block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--hl)]">{cur.line3}</span>}
            </figcaption>
            {/* quote */}
            <div className="relative flex flex-col justify-center p-6 sm:p-10">
              <Quote aria-hidden="true" className="absolute right-6 top-6 h-14 w-14 text-[var(--hl)]/35 sm:right-8 sm:top-8" strokeWidth={1.25} />
              <blockquote className="relative font-display text-xl italic leading-relaxed text-ink sm:text-2xl">
                <p>
                  “
                  {words.map((w, i) => (
                    <motion.span
                      key={i}
                      initial={reduce ? false : { filter: "blur(6px)", opacity: 0, y: 4 }}
                      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut", delay: reduce ? 0 : 0.015 * i }}
                      className="inline-block"
                    >
                      {w}&nbsp;
                    </motion.span>
                  ))}
                  ”
                </p>
              </blockquote>
            </div>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* controls */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2" role="group" aria-label="Choose testimonial">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => to(i)}
              aria-current={i === active ? "true" : undefined}
              className={`relative h-11 w-11 cursor-pointer overflow-hidden rounded-full bg-brand-soft transition-[transform,box-shadow,opacity] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hl)] ${i === active ? "scale-105 ring-[3px] ring-[var(--hl)]" : "opacity-60 ring-1 ring-line hover:opacity-100"}`}
            >
              {t.photo && <Image src={t.photo.src} alt="" fill sizes="44px" className="object-cover object-top" />}
              <span className="sr-only">Show testimonial from {t.name}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <p className="font-display text-sm font-semibold tabular-nums text-muted">
            <span className="text-ink">{String(active + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
          </p>
          {([[-1, ArrowLeft, "Previous testimonial"], [1, ArrowRight, "Next testimonial"]] as const).map(([d, Icon, l]) => (
            <button
              key={l}
              type="button"
              onClick={() => go(d)}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-[background-color,color,transform] hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hl)] active:scale-95"
            >
              <Icon aria-hidden="true" className="h-5 w-5" />
              <span className="sr-only">{l}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Why – Motion Studio: motion-examples tab-select + aceternity tabs:   */
/* every reason visible as a selectable card; the active one shows its  */
/* photo large (crossfade) and a progress bar while it auto-advances.   */
/* ------------------------------------------------------------------ */

const WHY_ICON = (t: string): LucideIcon =>
  /chennai|located|city/i.test(t)
    ? MapPin
    : /infrastructure|lab/i.test(t)
      ? Building2
      : /abroad|semester|international/i.test(t)
        ? Plane
        : /vibrant|culture|campus life/i.test(t)
          ? Music2
          : /green|eco/i.test(t)
            ? Leaf
            : /placement|mnc|career/i.test(t)
              ? Briefcase
              : /club|student/i.test(t)
                ? Users
                : /innovation|start|research/i.test(t)
                  ? Lightbulb
                  : Sparkles;

export function WhyShowcase({ items, interval = 4500 }: { items: { title: string; image: LiveImg }[]; interval?: number }) {
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
      className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-stretch lg:gap-8"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      {/* reasons – always visible */}
      <ul className="order-2 grid grid-cols-2 gap-2.5 sm:gap-3 lg:order-1" aria-label="Reasons to choose SRM Easwari, Chennai">
        {items.map((it, i) => {
          const on = i === active;
          const Icon = WHY_ICON(it.title);
          return (
            <li key={it.title}>
              <button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-pressed={on}
                className={`group relative flex h-full min-h-[4.75rem] w-full cursor-pointer items-center gap-3 overflow-hidden rounded-2xl border p-3 text-left transition-[background-color,border-color,color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hl)] sm:min-h-[5.5rem] sm:gap-4 sm:p-4 ${
                  on ? "border-transparent bg-gradient-to-br from-brand to-[var(--brand-deep)] text-white shadow-[0_18px_36px_-22px_rgba(60,10,20,0.7)]" : "border-line bg-white text-ink hover:border-[var(--hl)]"
                }`}
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors sm:h-11 sm:w-11 ${on ? "bg-[var(--hl)] text-brand-ink" : "bg-brand-soft text-brand group-hover:bg-[var(--hl)]/30"}`}>
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className={`block font-display text-xs font-semibold tracking-[0.12em] ${on ? "text-[var(--hl)]" : "text-brand/60"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="block text-[0.8125rem] font-semibold leading-snug sm:text-[0.95rem]">{it.title}</span>
                </span>
                {on && !reduce && !hold && (
                  <motion.span
                    key={`p${active}`}
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1 origin-left bg-[var(--hl)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: interval / 1000, ease: "linear" }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* active photo */}
      <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-3xl bg-brand-soft shadow-[0_40px_80px_-50px_rgba(60,10,20,0.7)] lg:order-2 lg:aspect-auto lg:min-h-[24rem]">
        <AnimatePresence initial={false}>
          <motion.div
            key={cur.image.src}
            className="absolute inset-0"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src={cur.image.src} alt={cur.image.alt} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--brand-deep)]/85 via-transparent to-transparent" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-6 left-0 w-1.5 rounded-r-full bg-[var(--hl)]" />
        <div className="absolute inset-x-5 bottom-5 text-white" aria-live="polite">
          <p className="font-display text-sm font-semibold tracking-[0.14em] text-[var(--hl)]">
            {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>
          <p className="mt-1 font-display text-xl font-semibold leading-snug sm:text-2xl">{cur.title}</p>
        </div>
      </div>
    </div>
  );
}
