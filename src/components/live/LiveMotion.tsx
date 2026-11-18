"use client";

/**
 * Motion building blocks for the Ramapuram "option 2" page.
 * Patterns referenced from the Motion Studio catalogue (adapted, not copied):
 *  - ScrollProgress  ← magicui / motion-primitives "Scroll Progress"
 *  - SectionTabs     ← motion.dev "Tab select" (shared-layout indicator) + scroll-spy
 *  - SlideRow        ← motion-primitives "Carousel" (snap + drag + arrows)
 *  - LogoMarquee     ← magicui "Marquee Logos" (two rows, opposite directions)
 *  - FadeCarousel    ← motion-primitives "Carousel" / "Transition Panel" (autoplay crossfade)
 * All respect prefers-reduced-motion.
 */

import Image from "next/image";
import { Children, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Counter } from "@/components/common/Counter";
import { VideoEmbed } from "@/components/common/VideoEmbed";
import { ArrowLeft, ArrowRight, Award, BookOpen, Briefcase, Building2, Calendar, Camera, ClipboardList, FlaskConical, Globe2, GraduationCap, HelpCircle, Hourglass, MapPin, Medal, MessageSquareQuote, Quote, Star, Trophy, Users, PlayCircle, Send, Smartphone, Sparkles, Upload, UserPlus, type LucideIcon } from "lucide-react";

const STEP_ICON_SET: Record<string, LucideIcon> = { UserPlus, Smartphone, ClipboardList, Upload, Send };
const TAB_ICONS: Record<string, LucideIcon> = { Award, BookOpen, Briefcase, Building2, Camera, ClipboardList, Globe2, HelpCircle, MapPin, PlayCircle, Sparkles };

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent" />;
}

export function SectionTabs({ items }: { items: { id: string; label: string; icon: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const bar = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  /** While a tab-click jump is in flight, ignore scroll-spy so the highlight doesn't flicker through sections. */
  const jumping = useRef<number | null>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (v && jumping.current === null) setActive(v.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // keep the active tab visible in the horizontally scrolling bar
  useEffect(() => {
    // Scroll only the tab bar horizontally – never the page (that interrupted anchor jumps).
    const b = bar.current;
    const el = b?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    // instant (not smooth): a second smooth scroll would cancel the page's smooth scroll in Chromium
    if (b && el) b.scrollLeft = el.offsetLeft - b.clientWidth / 2 + el.offsetWidth / 2;
  }, [active]);

  return (
    <div ref={wrap} className="sticky top-[4.5rem] z-40 bg-brand shadow-[0_10px_30px_-18px_rgba(8,15,40,0.6)]">
      <LayoutGroup>
        <div ref={bar} className="no-scrollbar container-x flex gap-1 overflow-x-auto py-2">
          {items.map(({ id, label, icon }) => {
            const on = active === id;
            const Icon = TAB_ICONS[icon] ?? Sparkles;
            return (
              <a
                key={id}
                href={`#${id}`}
                data-tab={id}
                aria-current={on ? "location" : undefined}
                onClick={(e) => {
                  const target = document.getElementById(id);
                  if (!target) return;
                  e.preventDefault();
                  // land exactly under the sticky header + this tab bar
                  const offset = (wrap.current?.getBoundingClientRect().bottom ?? 128) + 8;
                  const top = target.getBoundingClientRect().top + window.scrollY - offset;
                  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                  setActive(id);
                  if (jumping.current) window.clearTimeout(jumping.current);
                  jumping.current = window.setTimeout(() => (jumping.current = null), 1200);
                  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
                  history.replaceState(null, "", `#${id}`);
                }}
                className={`group relative isolate inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors ${on ? "text-brand-ink" : "text-white/90 hover:text-white"}`}
              >
                {on && <motion.span layoutId="section-tab" className="absolute inset-0 -z-10 rounded-full bg-[var(--hl)]" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                <Icon aria-hidden="true" className={`h-4 w-4 transition-colors ${on ? "text-brand-ink" : "text-[var(--hl)]"}`} />
                {label}
              </a>
            );
          })}
        </div>
      </LayoutGroup>
    </div>
  );
}

export function SlideRow({ children, label, itemClassName = "w-[78%] sm:w-[45%] lg:w-[calc((100%-3rem)/4)]" }: { children: ReactNode; label: string; itemClassName?: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);
  useEffect(() => {
    update();
    const el = track.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const w = (el.querySelector("li")?.getBoundingClientRect().width ?? el.clientWidth) + 16;
    el.scrollBy({ left: dir * w, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        {([[-1, edge.start, ArrowLeft, "Previous"], [1, edge.end, ArrowRight, "Next"]] as const).map(([dir, disabled, Icon, l]) => (
          <button
            key={l}
            type="button"
            onClick={() => go(dir)}
            disabled={disabled}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-[background-color,color,transform] hover:bg-brand hover:text-on-brand active:scale-95 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-ink"
          >
            <Icon aria-hidden="true" className="h-5 w-5" />
            <span className="sr-only">
              {l} – {label}
            </span>
          </button>
        ))}
      </div>
      <ul
        ref={track}
        aria-label={label}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && track.current) drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || !track.current) return;
          const dx = e.clientX - d.x;
          if (!d.moved && Math.abs(dx) > 4) {
            d.moved = true;
            setDragging(true);
          }
          if (d.moved) track.current.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => {
          drag.current = null;
          setDragging(false);
        }}
        onPointerLeave={() => {
          drag.current = null;
          setDragging(false);
        }}
        className={`no-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 pb-3 md:mx-0 md:px-0 ${dragging ? "cursor-grabbing select-none snap-none" : "cursor-grab snap-x snap-mandatory scroll-smooth"}`}
      >
        {Children.map(children, (child) => (
          <li className={`shrink-0 snap-start ${itemClassName}`}>{child}</li>
        ))}
      </ul>
    </div>
  );
}

type Logo = { name: string; logo: { src: string; alt: string; width: number; height: number } | null };

function MarqueeRow({ logos, reverse, duration }: { logos: Logo[]; reverse?: boolean; duration: number }) {
  return (
    <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none]">
      <ul
        className="marquee-track flex w-max gap-3 py-1.5 motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center"
        style={{ "--marquee-duration": `${duration}s`, animationDirection: reverse ? "reverse" : undefined } as CSSProperties}
      >
        {[...logos, ...logos].map((l, i) => (
          <li
            key={`${l.name}-${i}`}
            aria-hidden={i >= logos.length || undefined}
            className={`flex h-20 w-40 shrink-0 items-center justify-center rounded-[var(--radius-card)] border border-line bg-white px-5 ${i >= logos.length ? "motion-reduce:hidden" : ""}`}
          >
            <span className="relative h-full w-full">
              {l.logo && <Image src={l.logo.src} alt={l.logo.alt || l.name} fill sizes="160px" className="object-contain py-4" />}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LogoMarquee({ logos }: { logos: Logo[] }) {
  const half = Math.ceil(logos.length / 2);
  return (
    <div className="space-y-3">
      <MarqueeRow logos={logos.slice(0, half)} duration={Math.max(half * 3, 30)} />
      <MarqueeRow logos={logos.slice(half)} duration={Math.max((logos.length - half) * 3, 30)} reverse />
    </div>
  );
}

export function FadeCarousel({ images, interval = 5000 }: { images: { src: string; alt: string; width: number; height: number }[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (paused || reduce || images.length < 2) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % images.length), interval);
    return () => window.clearInterval(t);
  }, [paused, reduce, images.length, interval]);
  const cur = images[i];
  if (!cur) return null;
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-brand-soft" style={{ aspectRatio: `${cur.width} / ${cur.height}` }}>
        <AnimatePresence initial={false}>
          <motion.div key={cur.src} className="absolute inset-0" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <Image src={cur.src} alt={cur.alt} fill sizes="(min-width:1024px) 45vw, 90vw" className="object-contain" />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-3 flex justify-center gap-1" role="group" aria-label="Choose slide">
        {images.map((img, n) => (
          <button key={img.src} type="button" onClick={() => setI(n)} aria-current={n === i ? "true" : undefined} className="flex h-11 min-w-6 items-center justify-center">
            <span className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ${n === i ? "w-7 bg-brand" : "w-1.5 bg-line"}`} />
            <span className="sr-only">Slide {n + 1}: {img.alt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Single-row, auto-looping strip of logo cards with names (pauses on hover / focus). */
export function CardMarquee({ items, duration = 38, compact = false }: { items: Logo[]; duration?: number; compact?: boolean }) {
  return (
    <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none]">
      <ul
        className="marquee-track flex w-max gap-4 py-2 motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center"
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {[...items, ...items].map((c, i) => (
          <li
            key={`${c.name}-${i}`}
            aria-hidden={i >= items.length || undefined}
            className={`group flex shrink-0 flex-col items-center justify-center rounded-2xl ${compact ? "h-32 w-44 gap-2" : "h-40 w-60 gap-3"} border border-line bg-white px-5 text-center transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/25 ${i >= items.length ? "motion-reduce:hidden" : ""}`}
          >
            <span className={`relative w-full transition-transform ${compact ? "h-12" : "h-16"} duration-300 group-hover:scale-105`}>
              {c.logo && <Image src={c.logo.src} alt={c.logo.alt || c.name} fill sizes="240px" className="object-contain" />}
            </span>
            <span className="text-xs font-medium leading-snug text-muted">{c.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type GalleryImg = { src: string; alt: string; width: number; height: number; title: string; tag?: string };

/**
 * Accordion gallery (adapted from React Bits "Accordion Gallery" via Motion Studio):
 * panels widen on hover / focus to reveal the photo and caption, and gently
 * auto-advance when idle. Touch screens get a swipeable card row instead.
 */
export function AccordionGallery({ items, interval = 4200 }: { items: GalleryImg[]; interval?: number }) {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (hold || reduce || items.length < 2) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % items.length), interval);
    return () => window.clearInterval(t);
  }, [hold, reduce, items.length, interval]);

  return (
    <>
      {/* desktop / tablet: expanding panels */}
      <ul
        className="hidden h-[min(64vh,34rem)] gap-3 md:flex"
        onMouseLeave={() => setHold(false)}
        aria-label="Campus life photos"
      >
        {items.map((it, i) => {
          const on = i === active;
          return (
            <li
              key={it.src}
              className="relative min-w-0 overflow-hidden rounded-2xl transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ flexGrow: on ? 5 : 1, flexBasis: 0 }}
              onMouseEnter={() => {
                setHold(true);
                setActive(i);
              }}
            >
              <button
                type="button"
                onFocus={() => {
                  setHold(true);
                  setActive(i);
                }}
                onClick={() => setActive(i)}
                aria-pressed={on}
                aria-label={it.title}
                className="group absolute inset-0 text-left"
              >
                <Image src={it.src} alt={it.alt} fill sizes="(min-width:768px) 60vw, 100vw" className={`object-cover transition-transform duration-[1200ms] ${on ? "scale-100" : "scale-110"}`} />
                <span aria-hidden="true" className={`absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/20 to-transparent transition-opacity duration-500 ${on ? "opacity-100" : "opacity-70"}`} />
                {/* collapsed: vertical label */}
                <span
                  className={`absolute bottom-5 left-1/2 origin-left -translate-x-1/2 whitespace-nowrap font-display text-sm font-semibold text-white transition-opacity duration-300 [writing-mode:vertical-rl] rotate-180 ${on ? "opacity-0" : "opacity-90"}`}
                >
                  {it.title}
                </span>
                {/* expanded: caption */}
                <span className={`absolute inset-x-0 bottom-0 p-6 transition-[opacity,transform] duration-500 ${on ? "translate-y-0 opacity-100 delay-200" : "translate-y-3 opacity-0"}`}>
                  {it.tag && <span className="mb-3 inline-block rounded-full bg-[var(--hl)] px-3 py-1 text-xs font-semibold text-brand-ink">{it.tag}</span>}
                  <span className="block font-display text-xl font-semibold text-white lg:text-2xl">{it.title}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* phones: swipeable cards */}
      <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 md:hidden">
        {items.map((it) => (
          <li key={it.src} className="relative aspect-[4/5] w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl">
            <Image src={it.src} alt={it.alt} fill sizes="80vw" className="object-cover" />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-transparent to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-5">
              {it.tag && <span className="mb-2 inline-block rounded-full bg-[var(--hl)] px-2.5 py-0.5 text-xs font-semibold text-brand-ink">{it.tag}</span>}
              <span className="block font-display text-lg font-semibold text-white">{it.title}</span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export interface StatSlide {
  /** Rendered in order; `big` items are highlighted figures (count up when numeric). */
  parts: { text: string; big?: boolean; accent?: boolean; value?: number; suffix?: string }[];
  image: { src: string; alt: string; width: number; height: number };
}

/**
 * HTML version of the live page's highlight banners (text was baked into images):
 * real text, count-up figures, the official cut-out photo popping out above the card,
 * and an auto-advancing crossfade with dots (pauses on hover / focus).
 */
export function StatBannerCarousel({ slides, interval = 5500 }: { slides: StatSlide[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (paused || reduce || slides.length < 2) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % slides.length), interval);
    return () => window.clearInterval(t);
  }, [paused, reduce, slides.length, interval]);
  const s = slides[i];
  if (!s) return null;

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="relative h-[29rem] sm:h-[19rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* tinted card – the cut-out photo stands on its bottom edge and rises slightly above it */}
            <div className="absolute inset-x-0 bottom-0 top-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--brand-tint)] to-[var(--brand-tint-2)] ring-1 ring-brand/10">
              <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_60%_70%,rgba(255,255,255,0.75),transparent_65%)] sm:block" />
            </div>
            <div className="relative grid h-full grid-rows-[auto_1fr] sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] sm:grid-rows-1">
              <div className="flex flex-col justify-center px-7 pt-16 sm:py-8 sm:pl-12 sm:pr-4 sm:pt-[4.5rem]">
                <span aria-hidden="true" className="mb-4 block h-1 w-10 rounded-full bg-[var(--hl)]" />
                <p className="font-display leading-tight text-ink">
                  {s.parts.map((p, n) =>
                    p.big ? (
                      <span key={n} className="block text-[2.25rem] font-bold leading-[1.05] tracking-tight text-brand sm:text-[2.75rem]">
                        {p.value !== undefined ? <Counter stat={{ value: p.value, suffix: p.suffix, label: p.text }} /> : p.text}
                      </span>
                    ) : (
                      <span key={n} className={`block ${n > 0 ? "mt-2" : ""} ${p.accent ? "text-lg font-semibold text-brand sm:text-xl" : "text-[0.9375rem] text-ink/75 sm:text-base"}`}>
                        {p.text}
                      </span>
                    ),
                  )}
                </p>
              </div>
              <div className="relative min-h-0">
                <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width:1024px) 26rem, 80vw" className="object-contain object-bottom" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-3 flex justify-center gap-1" role="group" aria-label="Choose highlight">
        {slides.map((sl, n) => (
          <button key={n} type="button" onClick={() => setI(n)} aria-current={n === i ? "true" : undefined} className="flex h-11 min-w-6 items-center justify-center">
            <span className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ${n === i ? "w-7 bg-brand" : "w-1.5 bg-line"}`} />
            <span className="sr-only">Highlight {n + 1}: {sl.parts.map((p) => p.text).join(" ")}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

type VideoStory = { name: string; line2: string; line3: string; videoUrl?: string; quote?: string; photo?: { src: string; alt: string; width: number; height: number } | null };

/**
 * Video testimonials, adapted from Aceternity "Animated Testimonials" (via Motion Studio):
 * a tilted stack of video cards – the active one comes forward and is playable –
 * with the student's details beside it and prev / next controls underneath.
 */
export function AnimatedTestimonials({ items }: { items: VideoStory[] }) {
  const [active, setActive] = useState(0);
  const n = items.length;
  const go = (d: number) => setActive((a) => (a + d + n) % n);
  const tilt = [-7, 6, -4, 8, -5];
  const shiftX = [-22, 20, -12, 26, -16];
  const cur = items[active];
  if (!cur) return null;
  return (
    <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-14">
      {/* stacked video cards */}
      <div className="relative mx-auto aspect-video w-full max-w-xl">
        {items.map((t, i) => {
          const on = i === active;
          const id = t.videoUrl?.match(/(?:embed\/|v=|youtu\.be\/)([\w-]{11})/)?.[1];
          return (
            <motion.div
              key={t.name}
              className="absolute inset-0 origin-bottom"
              initial={false}
              animate={{
                rotate: on ? 0 : tilt[i % tilt.length],
                scale: on ? 1 : 0.93,
                x: on ? 0 : shiftX[i % shiftX.length],
                y: on ? 0 : -18,
                opacity: on ? 1 : 0.9,
                zIndex: on ? 30 : 10 + ((i - active + n) % n),
              }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              {on && t.videoUrl ? (
                <div className="h-full overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(10,20,50,0.55)] ring-4 ring-white">
                  <VideoEmbed key={t.videoUrl} url={t.videoUrl} title={`${t.name} – ${t.line2}`} className="!rounded-none h-full" />
                </div>
              ) : !t.videoUrl ? (
                /* written testimonial: quote card */
                <div aria-hidden={!on || undefined} className="relative flex h-full flex-col justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-[0_30px_60px_-30px_rgba(10,20,50,0.55)] ring-1 ring-line sm:p-8">
                  <Quote aria-hidden="true" className="absolute right-5 top-5 h-12 w-12 text-[var(--hl)]/40" />
                  <div className="flex items-center gap-4">
                    {t.photo && (
                      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-brand-soft ring-4 ring-[var(--hl)]/30">
                        <Image src={t.photo.src} alt={on ? t.photo.alt : ""} fill sizes="64px" className="object-cover object-top" />
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="block font-display text-base font-semibold text-ink">{t.name}</span>
                      <span className="block text-sm text-brand">{t.line2}</span>
                    </span>
                  </div>
                  {t.quote && <p className="mt-4 line-clamp-5 text-[0.9375rem] leading-relaxed text-ink/80">“{t.quote}”</p>}
                </div>
              ) : (
                <div
                  aria-hidden="true"
                  className="h-full rounded-2xl bg-cover bg-center shadow-[0_20px_40px_-28px_rgba(10,20,50,0.5)] ring-4 ring-white"
                  style={id ? { backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)` } : undefined}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* details + controls */}
      <div>
        <AnimatePresence mode="wait">
          <motion.div key={cur.name} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--hl)]/25 px-3 py-1 text-xs font-semibold text-[var(--hl-ink)]">
              {cur.videoUrl ? (
                <>
                  <PlayCircle aria-hidden="true" className="h-3.5 w-3.5" /> Video story
                </>
              ) : (
                <>
                  <MessageSquareQuote aria-hidden="true" className="h-3.5 w-3.5" /> Student voice
                </>
              )}
            </span>
            <h3 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">{cur.name}</h3>
            <p className="mt-2 text-lg font-semibold text-brand">{cur.line2}</p>
            <p className="mt-1 text-muted">{cur.line3}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex gap-2">
            {([[-1, ArrowLeft, "Previous story"], [1, ArrowRight, "Next story"]] as const).map(([d, Icon, l]) => (
              <button
                key={l}
                type="button"
                onClick={() => go(d)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-[background-color,color,transform] hover:bg-brand hover:text-on-brand active:scale-95"
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">{l}</span>
              </button>
            ))}
          </div>
          <p className="font-display text-sm font-semibold tabular-nums text-muted">
            <span className="text-ink">{String(active + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
          </p>
        </div>

      </div>
    </div>
  );
}

/**
 * Admission steps, adapted from React Bits "Stepper" + Aceternity "Timeline" (via Motion Studio):
 * a horizontal track whose progress line glides to the active step; steps auto-advance while
 * the section is on screen (pauses on hover / focus, off for reduced motion). Vertical on phones.
 */
export function ProcessStepper({ steps, icons }: { steps: string[]; icons: string[] }) {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const [inView, setInView] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (hold || reduce || !inView) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % steps.length), 2400);
    return () => window.clearInterval(t);
  }, [hold, reduce, inView, steps.length]);
  const pct = steps.length > 1 ? active / (steps.length - 1) : 1;

  return (
    <div ref={box} onMouseLeave={() => setHold(false)}>
      {/* desktop: horizontal track */}
      <div className="relative hidden md:block">
        <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-7 h-1 rounded-full bg-brand/10" />
        <motion.div
          aria-hidden="true"
          className="absolute left-[10%] top-7 h-1 origin-left rounded-full bg-gradient-to-r from-brand to-[var(--hl)]"
          style={{ width: "80%" }}
          initial={false}
          animate={{ scaleX: pct }}
          transition={{ type: "spring", stiffness: 120, damping: 22 }}
        />
        <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0,1fr))` }}>
          {steps.map((s, i) => {
            const Icon = STEP_ICON_SET[icons[i]] ?? Sparkles;
            const done = i <= active;
            const on = i === active;
            return (
              <li key={s} className="flex flex-col items-center px-2 text-center">
                <button
                  type="button"
                  onMouseEnter={() => {
                    setHold(true);
                    setActive(i);
                  }}
                  onFocus={() => {
                    setHold(true);
                    setActive(i);
                  }}
                  onClick={() => setActive(i)}
                  aria-current={on ? "step" : undefined}
                  className="group flex flex-col items-center gap-3"
                >
                  <span
                    className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-[background-color,border-color,color,transform,box-shadow] duration-300 ${
                      on
                        ? "scale-110 border-[var(--hl)] bg-brand text-white shadow-[0_0_0_6px_color-mix(in_srgb,var(--hl)_25%,transparent)]"
                        : done
                          ? "border-brand bg-brand text-white"
                          : "border-line bg-white text-brand group-hover:border-brand/40"
                    }`}
                  >
                    <Icon aria-hidden="true" className="h-5 w-5" />
                    <span className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[0.65rem] font-bold ${done ? "bg-[var(--hl)] text-brand-ink" : "bg-surface-alt text-muted"}`}>
                      {i + 1}
                    </span>
                  </span>
                  <span className={`max-w-[11rem] text-sm font-semibold leading-snug transition-colors ${on ? "text-brand" : "text-ink/80"}`}>{s}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* phones: vertical timeline */}
      <ol className="relative space-y-4 md:hidden">
        <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-0.5 bg-gradient-to-b from-brand to-[var(--hl)]" />
        {steps.map((s, i) => {
          const Icon = STEP_ICON_SET[icons[i]] ?? Sparkles;
          return (
            <li key={s} className="relative flex items-center gap-4">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white ring-4 ring-surface-alt">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-ink shadow-sm">
                <span className="mr-2 text-[var(--hl-ink)]">{String(i + 1).padStart(2, "0")}</span>
                {s}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const MILESTONE_ICONS: Record<string, LucideIcon> = { Calendar, Users, Trophy, Building2, Hourglass, Award, Medal, GraduationCap, Globe2, BookOpen, Briefcase, FlaskConical, Star, MapPin, Sparkles };

/** Institute milestones as one auto-looping row (pauses on hover / focus; static wrap for reduced motion). */
/**
 * Generic auto-looping row (Magic UI "Marquee" via Motion Studio). Children are
 * rendered twice for a seamless loop; the copy is hidden from assistive tech.
 * Pauses on hover / focus; wraps into a static grid for reduced motion.
 */
export function ItemMarquee({ children, duration = 40, itemClassName = "" }: { children: ReactNode[]; duration?: number; itemClassName?: string }) {
  return (
    <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)] motion-reduce:[mask-image:none]">
      <ul className="marquee-track flex w-max gap-5 py-3 pr-5 motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center" style={{ "--marquee-duration": `${duration}s` } as CSSProperties}>
        {children.map((c, i) => (
          <li key={`a${i}`} className={`shrink-0 ${itemClassName}`}>
            {c}
          </li>
        ))}
        {children.map((c, i) => (
          <li key={`b${i}`} aria-hidden="true" inert className={`shrink-0 motion-reduce:hidden ${itemClassName}`}>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MilestoneMarquee({ items, duration = 36 }: { items: { value: string; label: string; icon: string }[]; duration?: number }) {
  const card = (f: { value: string; label: string; icon: string }, i: number, dup: boolean) => {
    const Icon = MILESTONE_ICONS[f.icon] ?? Award;
    const m = f.value.trim().match(/^(#?)([\d,]+)(.*)$/);
    return (
      <li
        key={`${f.label}-${i}`}
        aria-hidden={dup || undefined}
        className={`group flex w-72 shrink-0 items-center gap-4 rounded-2xl border border-line bg-white px-5 py-4 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[var(--hl)]/70 ${dup ? "motion-reduce:hidden" : ""}`}
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--hl)]/25 text-[var(--hl-ink)] transition-colors group-hover:bg-[var(--hl)] group-hover:text-brand-ink">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block font-display text-2xl font-bold leading-none tracking-tight text-brand">
            {m ? <Counter stat={{ prefix: m[1] || undefined, value: Number(m[2].replace(/,/g, "")), suffix: m[3] || undefined, label: f.label }} /> : f.value}
          </span>
          <span className="mt-1.5 block text-[0.8125rem] font-medium leading-snug text-muted">{f.label}</span>
        </span>
      </li>
    );
  };
  return (
    <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)] motion-reduce:[mask-image:none]">
      <ul className="marquee-track flex w-max gap-4 py-2 motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center" style={{ "--marquee-duration": `${duration}s` } as CSSProperties}>
        {items.map((f, i) => card(f, i, false))}
        {items.map((f, i) => card(f, i + items.length, true))}
      </ul>
    </div>
  );
}
