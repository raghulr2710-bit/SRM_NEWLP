"use client";

/**
 * Client-side motion pieces for the SRM TRP Engineering College sections (see ./trp.tsx).
 * Each component re-implements a Motion Studio reference with motion/react + Tailwind;
 * all of them respect prefers-reduced-motion and only receive plain data from the server.
 */

import { useRef, useState, type PointerEvent } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { ArrowLeft, ArrowRight, Pause, Play, Quote } from "lucide-react";
import { Pic, type Img } from "../parts";
import type { LiveImg } from "../types";

const focusRing = "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hl)]";

/* ------------------------------------------------------------------------------------------ */
/* Why — Motion Studio `aceternity-components-sticky-scroll-reveal`                            */
/* Desktop: titles on the left light up one by one as the section scrolls; the image on the   */
/* right is sticky and swaps to the active item. Mobile: stacked image cards.                  */
/* ------------------------------------------------------------------------------------------ */
export function TrpStickyWhy({ items }: { items: { title: string; image: LiveImg }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = items.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const fill = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 });
  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.min(n - 1, Math.max(0, Math.floor(p * n)))));

  return (
    <>
      {/* desktop: sticky scroll reveal */}
      <div ref={ref} className="hidden gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] xl:gap-16">
        <div className="relative pl-8">
          <span aria-hidden="true" className="absolute bottom-[6.5vh] left-0 top-[6.5vh] w-[3px] rounded-full bg-line" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: fill }}
            className="absolute bottom-[6.5vh] left-0 top-[6.5vh] w-[3px] origin-top rounded-full bg-brand"
          />
          <ol>
            {items.map((w, i) => {
              const on = i === active;
              return (
                <li key={w.title} aria-current={on ? "step" : undefined} className="flex min-h-[13vh] items-center py-1">
                  {/* clickable: scrolls this reason to the middle of the screen (drives the sticky image) */}
                  <button
                    type="button"
                    onClick={(e) => e.currentTarget.closest("li")?.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
                    className={`group flex w-full items-center gap-5 rounded-2xl p-3 text-left transition-[opacity,background-color,transform] duration-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hl)] motion-reduce:transition-none ${
                      on ? "bg-white opacity-100 shadow-[0_20px_40px_-30px_color-mix(in_srgb,var(--brand-deep)_70%,transparent)] ring-1 ring-line motion-safe:translate-x-2" : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <span className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-brand-soft transition-[filter] duration-500 ${on ? "" : "grayscale"}`}>
                      <Pic img={w.image} sizes="80px" />
                    </span>
                    <span className="min-w-0">
                      <span className={`block font-display text-xs font-bold tracking-[0.16em] ${on ? "text-brand" : "text-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="mt-1 block font-display text-xl font-semibold leading-snug tracking-tight text-ink xl:text-2xl">{w.title}</span>
                      <span
                        aria-hidden="true"
                        className={`mt-2 block h-1 rounded-full bg-[var(--hl)] transition-[width] duration-500 motion-reduce:transition-none ${on ? "w-12" : "w-0"}`}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="relative">
          <div className="sticky top-[calc(50vh-min(15rem,calc(50vh-6rem)))] h-[min(30rem,calc(100vh-12rem))] overflow-hidden rounded-[1.75rem] bg-brand-soft shadow-[0_40px_80px_-50px_color-mix(in_srgb,var(--brand-deep)_70%,transparent)] ring-1 ring-line">
            {items.map((w, i) => (
              <div
                key={w.title}
                aria-hidden={i !== active}
                className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"}`}
              >
                <Pic img={w.image} sizes="(min-width:1024px) 55vw, 100vw" />
              </div>
            ))}
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-ink/75 to-transparent" />
            <p aria-hidden="true" className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 text-white">
              <span className="font-display text-lg font-semibold">{items[active]?.title}</span>
              <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-white/30 backdrop-blur-md">
                {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* mobile / tablet: stacked image cards */}
      <ol className="grid gap-4 sm:grid-cols-2 lg:hidden">
        {items.map((w, i) => (
          <li key={w.title} className="overflow-hidden rounded-2xl border border-line bg-white">
            <div className="relative aspect-[4/3] bg-brand-soft">
              <Pic img={w.image} sizes="(min-width:640px) 50vw, 100vw" />
            </div>
            <div className="flex items-center gap-3 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--hl)] font-display text-sm font-bold text-brand-ink">
                {i + 1}
              </span>
              <h3 className="font-display text-base font-semibold leading-snug text-ink">{w.title}</h3>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Placements — Motion Studio `reactbits-components-tilted-card`                               */
/* Large portrait card that tilts toward a mouse pointer (static on touch / reduced motion).   */
/* ------------------------------------------------------------------------------------------ */
export function TrpTiltProfile({ name, company, ctc, photo }: { name: string; company?: string; ctc?: string; photo: Img }) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 220, damping: 22, mass: 0.6 });
  const rotateY = useSpring(ry, { stiffness: 220, damping: 22, mass: 0.6 });
  const scale = useSpring(1, { stiffness: 220, damping: 22 });
  const max = 8;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
    scale.set(1.03);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
    scale.set(1);
  };

  return (
    <div className="[perspective:900px]" onPointerMove={onMove} onPointerLeave={reset}>
      <motion.article
        style={reduce ? undefined : { rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        className="relative aspect-[3/4.2] overflow-hidden rounded-[1.5rem] bg-brand-soft shadow-[0_30px_60px_-40px_color-mix(in_srgb,var(--brand-deep)_80%,transparent)] ring-1 ring-line"
      >
        <Pic img={photo} sizes="(min-width:1024px) 260px, 50vw" className="object-top" />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-brand-ink/95 via-brand-ink/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5" style={reduce ? undefined : { transform: "translateZ(40px)" }}>
          {ctc && (
            <span className="inline-block rounded-full bg-[var(--hl)] px-2.5 py-1 text-xs font-bold text-brand-ink sm:text-[0.8125rem]">{ctc}</span>
          )}
          <h4 className="mt-2 break-words font-display text-[0.9375rem] font-semibold leading-tight text-white sm:text-lg">{name}</h4>
          {company && <p className="mt-0.5 text-xs font-medium text-white/80 sm:text-sm">{company}</p>}
        </div>
      </motion.article>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Recruiters — Motion Studio `magicui-docs-components-scroll-based-velocity`                  */
/* Two logo rows drifting in opposite directions; scrolling the page speeds them up and flips  */
/* their direction. Pausable (button / hover); reduced motion → static wrapped grid.           */
/* ------------------------------------------------------------------------------------------ */
type Logo = { name: string; logo: Img };
const COPIES = 4;
const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

function LogoTile({ l }: { l: Logo }) {
  return (
    <span className="relative flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-line bg-white px-5 py-3 sm:h-24 sm:w-52">
      <span className="relative h-full w-full">
        {l.logo ? <Pic img={l.logo} sizes="208px" contain /> : <span className="flex h-full items-center justify-center text-sm font-semibold text-ink">{l.name}</span>}
      </span>
    </span>
  );
}

function VelocityRow({ logos, baseVelocity, paused }: { logos: Logo[]; baseVelocity: number; paused: boolean }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (paused) return;
    let moveBy = dir.current * baseVelocity * (delta / 1000);
    const f = Math.max(-4, Math.min(4, factor.get()));
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    moveBy += dir.current * moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <motion.div style={{ x }} className="flex w-max">
        {Array.from({ length: COPIES }, (_, c) => (
          <ul key={c} aria-hidden={c > 0 || undefined} className="flex shrink-0 gap-4 pr-4">
            {logos.map((l) => (
              <li key={l.name}>
                <LogoTile l={l} />
              </li>
            ))}
          </ul>
        ))}
      </motion.div>
    </div>
  );
}

export function TrpVelocityLogos({ logos }: { logos: Logo[] }) {
  const reduce = useReducedMotion();
  const [stopped, setStopped] = useState(false);
  const [hover, setHover] = useState(false);
  const half = Math.ceil(logos.length / 2);
  const paused = Boolean(reduce) || stopped || hover;

  return (
    <>
      {/* animated rows (hidden for reduced motion) */}
      <div className="motion-reduce:hidden">
        <div className="space-y-4" onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)} onPointerLeave={() => setHover(false)}>
          <VelocityRow logos={logos.slice(0, half)} baseVelocity={1.4} paused={paused} />
          <VelocityRow logos={logos.slice(half)} baseVelocity={-1.4} paused={paused} />
        </div>
        <div className="container-x mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => setStopped((s) => !s)}
            aria-pressed={stopped}
            className={`inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand ${focusRing}`}
          >
            {stopped ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
            {stopped ? "Play" : "Pause"}
            <span className="sr-only">recruiter logos</span>
          </button>
        </div>
      </div>
      {/* reduced motion: static wrap */}
      <ul className="container-x hidden flex-wrap justify-center gap-3 motion-reduce:flex">
        {logos.map((l) => (
          <li key={l.name}>
            <LogoTile l={l} />
          </li>
        ))}
      </ul>
    </>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Rankings — Motion Studio `reactbits-r-flipcard-js-css-json`                                 */
/* Front: badge + issuing body. Back: the approval text. Flips on mouse hover or via the      */
/* toggle button (keyboard / touch); settles on a spring (instant for reduced motion).         */
/* ------------------------------------------------------------------------------------------ */
export function TrpFlipCard({ badge, body, text, index }: { badge: Img; body: string; text: string; index: number }) {
  const reduce = useReducedMotion();
  const [pressed, setPressed] = useState(false);
  const [hover, setHover] = useState(false);
  const flipped = pressed || hover;

  return (
    <div
      className="relative h-72 [perspective:1200px] sm:h-80"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 18 }}
      >
        {/* front */}
        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-[1.5rem] border border-line bg-white p-6 text-center [backface-visibility:hidden]">
          <span aria-hidden="true" className="absolute left-5 top-4 font-display text-sm font-bold tracking-[0.14em] text-brand/40">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-brand via-[var(--hl)] to-brand" />
          <span className="relative flex h-28 w-28 items-center justify-center rounded-full bg-surface-alt p-5 ring-1 ring-line">
            <span className="relative h-full w-full">
              <Pic img={badge} sizes="112px" contain />
            </span>
          </span>
          <h3 className="mt-5 font-display text-xl font-semibold text-ink">{body}</h3>
        </div>
        {/* back */}
        <div className="on-dark absolute inset-0 flex flex-col justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-brand to-[var(--brand-deep)] p-7 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span aria-hidden="true" className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]" />
          <p className="relative eyebrow text-[var(--hl)]">{body}</p>
          <p className="relative mt-3 font-display text-lg font-semibold leading-snug sm:text-xl">{text}</p>
        </div>
      </motion.div>
      <button
        type="button"
        onClick={() => setPressed((p) => !p)}
        aria-pressed={pressed}
        className={`absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full transition-colors ${flipped ? "bg-white/15 text-white ring-1 ring-white/30 hover:bg-white/25" : "bg-brand-soft text-brand hover:bg-brand hover:text-white"} ${focusRing}`}
      >
        <ArrowRight aria-hidden="true" className={`h-5 w-5 transition-transform duration-300 ${flipped ? "rotate-180" : ""}`} />
        <span className="sr-only">{pressed ? `Show ${body} badge` : `Show ${body} details`}</span>
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Testimonials — Motion Studio `motion-primitives-carousel` (Apple-cards-carousel feel)       */
/* Horizontal scroll-snap row of tall photo cards; swipe natively, arrow buttons on all sizes. */
/* ------------------------------------------------------------------------------------------ */
type Story = { name: string; line2: string; line3: string; quote?: string; photo?: LiveImg | null };

export function TrpQuoteCarousel({ items }: { items: Story[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  };
  const go = (dir: 1 | -1) => {
    const el = ref.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 20), behavior: reduce ? "auto" : "smooth" });
  };

  const arrow = `flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-ink transition-[background-color,color,opacity] hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-35 ${focusRing}`;

  return (
    <div>
      <ul
        ref={ref}
        onScroll={update}
        tabIndex={0}
        aria-label="Student testimonials"
        className={`-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-4 pt-1 [scrollbar-width:none] md:-mx-8 md:scroll-px-8 md:px-8 [&::-webkit-scrollbar]:hidden ${focusRing} rounded-2xl`}
      >
        {items.map((t) => (
          <li key={t.name} className="w-[82%] max-w-[21rem] shrink-0 snap-start sm:w-72 lg:w-[19.5rem]">
            <motion.article
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-[27rem] overflow-hidden rounded-[1.75rem] bg-brand-ink sm:h-[29rem]"
            >
              {t.photo && (
                <div className="absolute inset-0 transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]">
                  <Pic img={t.photo} sizes="(min-width:1024px) 312px, 82vw" className="object-top" />
                </div>
              )}
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-brand-ink via-brand-ink/75 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <Quote aria-hidden="true" className="h-6 w-6 fill-[var(--hl)] text-[var(--hl)]" />
                {t.quote && (
                  <blockquote className="mt-2 font-display text-xl font-semibold leading-snug text-white">&ldquo;{t.quote}&rdquo;</blockquote>
                )}
                <div className="mt-4 border-t border-white/20 pt-3">
                  <p className="font-display text-base font-semibold text-white">{t.name}</p>
                  <p className="mt-0.5 text-[0.8125rem] leading-snug text-white/80">{t.line2}</p>
                  <p className="mt-1 text-xs font-semibold text-[var(--hl)]">{t.line3}</p>
                </div>
              </div>
            </motion.article>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-end gap-3">
        <button type="button" className={arrow} onClick={() => go(-1)} disabled={edge.start} aria-label="Previous testimonial">
          <ArrowLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        <button type="button" className={arrow} onClick={() => go(1)} disabled={edge.end} aria-label="Next testimonial">
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Campus — Motion Studio `aceternity-components-parallax-scroll-2`                            */
/* Three photo columns translating in opposite directions with page scroll (desktop only);    */
/* mobile and reduced motion get a plain grid.                                                 */
/* ------------------------------------------------------------------------------------------ */
type CampusImg = LiveImg & { title: string; tag?: string };

function CampusTile({ p, aspect, sizes }: { p: CampusImg; aspect: string; sizes: string }) {
  return (
    <figure className={`group relative overflow-hidden rounded-[1.5rem] bg-brand-soft ${aspect}`}>
      <Pic img={p} sizes={sizes} className="transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]" />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-ink/80 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-4">
        {p.tag && <span className="inline-block rounded-full bg-[var(--hl)] px-2.5 py-0.5 text-xs font-bold text-brand-ink">{p.tag}</span>}
        <span className="mt-1.5 block font-display text-base font-semibold leading-snug text-white">{p.title}</span>
      </figcaption>
    </figure>
  );
}

/**
 * Campus – Motion Studio: aceternity layout-grid (static bento). Desktop: one large feature photo
 * + four equal tiles in a fixed 4 × 2 grid (captions always visible, photos shown at a sharp size).
 */
export function TrpParallaxCampus({ items }: { items: CampusImg[] }) {
  const [feature, ...rest] = items;
  return (
    <>
      {feature && (
        <div className="hidden h-[min(64vh,34rem)] min-h-[26rem] grid-cols-4 grid-rows-2 gap-4 lg:grid xl:gap-5">
          <div className="col-span-2 row-span-2">
            <CampusTile p={feature} aspect="h-full" sizes="(min-width:1320px) 640px, 50vw" />
          </div>
          {rest.slice(0, 4).map((p) => (
            <div key={p.src + p.title} className="min-h-0">
              <CampusTile p={p} aspect="h-full" sizes="(min-width:1320px) 320px, 25vw" />
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:hidden">
        {items.map((p, i) => (
          <div key={p.src + p.title} className={i === 0 ? "sm:col-span-2" : ""}>
            <CampusTile p={p} aspect={i === 0 ? "aspect-[16/10]" : "aspect-[16/10] sm:aspect-square"} sizes={i === 0 ? "100vw" : "(min-width:640px) 50vw, 100vw"} />
          </div>
        ))}
      </div>
    </>
  );
}
