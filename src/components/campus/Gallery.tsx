"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { isPending, type ImageAsset, type Media } from "@/types/institution";
import { MediaFill } from "@/components/common/Media";
import { Reveal } from "@/components/common/Reveal";

export interface GalleryItem {
  title: string;
  description?: string;
  media: Media;
}
type Viewable = GalleryItem & { media: ImageAsset };

/* ------------------------------------------------------------------------ */
/* Lightbox (shared)                                                         */
/* ------------------------------------------------------------------------ */

function useLightbox(count: number) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const triggers = useRef<Map<number, HTMLButtonElement>>(new Map());
  const lastOpened = useRef<number | null>(null);
  const open = useCallback((i: number) => {
    lastOpened.current = i;
    setOpenIdx(i);
  }, []);
  const close = useCallback(() => {
    setOpenIdx(null);
    const idx = lastOpened.current;
    if (idx !== null) window.setTimeout(() => triggers.current.get(idx)?.focus({ preventScroll: true }), 0);
  }, []);
  const step = useCallback((d: number) => setOpenIdx((i) => (i === null ? i : (i + d + count) % count)), [count]);
  const register = (i: number) => (el: HTMLButtonElement | null) => {
    if (el) triggers.current.set(i, el);
  };
  return { openIdx, open, close, step, register };
}

function Lightbox({
  items,
  openIdx,
  close,
  step,
}: {
  items: Viewable[];
  openIdx: number | null;
  close: () => void;
  step: (d: number) => void;
}) {
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (openIdx === null) return;
    closeBtn.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab") {
        const nodes = document.querySelectorAll<HTMLElement>("#gallery-lightbox button");
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIdx, close, step]);

  const current = openIdx !== null ? items[openIdx] : null;
  return (
    <AnimatePresence>
      {current && openIdx !== null && (
        <motion.div
          id="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[80] flex flex-col bg-black/95 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="flex items-center justify-between p-4">
            <p className="text-sm text-white/70" aria-live="polite">
              {openIdx + 1} / {items.length}
            </p>
            <button ref={closeBtn} type="button" onClick={close} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <X aria-hidden="true" className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && close()}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.media.src}
                className="absolute inset-4 md:inset-x-20"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Image src={current.media.src} alt={current.media.alt} fill sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>
            {items.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/25">
                  <ChevronLeft aria-hidden="true" className="h-6 w-6" />
                  <span className="sr-only">Previous image</span>
                </button>
                <button type="button" onClick={() => step(1)} className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/25">
                  <ChevronRight aria-hidden="true" className="h-6 w-6" />
                  <span className="sr-only">Next image</span>
                </button>
              </>
            )}
          </div>
          <div className="p-5 text-center">
            <p className="font-display text-xl">{current.title}</p>
            {current.description && <p className="mt-1 text-sm text-white/70">{current.description}</p>}
            {current.media.illustrative && (
              <p className="mt-2 text-xs text-white/60">Illustrative AI-generated image – not a photograph of this campus.</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Tile({ item, sizes, onOpen, register, className = "", brand = false, index }: { item: GalleryItem; sizes: string; onOpen?: () => void; register?: (el: HTMLButtonElement | null) => void; className?: string; brand?: boolean; index?: number }) {
  const inner = (
    <>
      <MediaFill media={item.media} sizes={sizes} zoom />
      {brand ? (
        <>
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-ink/95 via-brand-ink/35 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
          <span aria-hidden="true" className="absolute inset-0 bg-brand/0 transition-colors duration-500 group-hover:bg-brand/10" />
          {index !== undefined && (
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-display text-xs font-semibold text-brand-ink backdrop-blur sm:left-5 sm:top-5">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </>
      ) : (
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
      )}
      {onOpen && (
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <Expand aria-hidden="true" className="h-4 w-4" />
        </span>
      )}
      <span className={`absolute inset-x-0 bottom-0 text-left ${brand ? "p-5 sm:p-6" : "p-4 sm:p-5"}`}>
        {brand && <span aria-hidden="true" className="mb-3 block h-1 w-10 rounded-full bg-[#f2c14e] transition-[width] duration-500 group-hover:w-16" />}
        <span className={`block translate-y-1 font-display leading-tight text-white ${brand ? "text-lg font-semibold sm:text-xl" : "text-base sm:text-lg"} transition-transform duration-500 group-hover:translate-y-0 [overflow-wrap:anywhere]`}>
          {item.title}
        </span>
        {item.description && (
          <span className="mt-1 hidden max-h-0 overflow-hidden text-sm text-white/85 opacity-0 transition-[max-height,opacity] duration-500 group-hover:max-h-16 group-hover:opacity-100 group-focus-visible:max-h-16 group-focus-visible:opacity-100 sm:block">
            {item.description}
          </span>
        )}
      </span>
    </>
  );
  if (!onOpen) return <div className={`group relative block h-full w-full overflow-hidden rounded-[var(--radius-card)] ${className}`}>{inner}</div>;
  return (
    <button
      type="button"
      ref={register}
      onClick={onOpen}
      aria-label={`View larger: ${item.title}`}
      className={`group relative block h-full w-full overflow-hidden rounded-[var(--radius-card)] ${className}`}
    >
      {inner}
    </button>
  );
}

/* ------------------------------------------------------------------------ */
/* Mosaic – asymmetric photo grid (campus life)                              */
/* ------------------------------------------------------------------------ */

/** Gap-free asymmetric layouts on a 6-column grid (2 columns on mobile), chosen by photo count. */
const MOSAIC_MD: Record<number, string[]> = {
  3: ["md:col-span-4 md:row-span-2", "md:col-span-2", "md:col-span-2"],
  4: ["md:col-span-3 md:row-span-2", "md:col-span-3", "md:col-span-3", "md:col-span-6"],
  5: ["md:col-span-4 md:row-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-3", "md:col-span-3"],
  6: ["md:col-span-4 md:row-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2"],
  7: ["md:col-span-4 md:row-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-6"],
};
function mosaic(i: number, n: number) {
  const md = MOSAIC_MD[n]?.[i] ?? "md:col-span-2";
  const mobile = i === 0 ? "col-span-2 row-span-2" : (n - 1) % 2 === 1 && i === n - 1 ? "col-span-2" : "";
  return `${mobile} ${md}`;
}

export function Gallery({ items }: { items: GalleryItem[] }) {
  const viewable = items.filter((i) => !isPending(i.media)) as Viewable[];
  const lb = useLightbox(viewable.length);
  return (
    <>
      <ul className="grid grid-flow-dense auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:auto-rows-[13rem] md:grid-cols-6 lg:gap-4">
        {items.map((item, i) => {
          const vIdx = viewable.findIndex((v) => v === item);
          return (
            <Reveal as="li" mask key={`${item.title}-${i}`} delay={0.05 * (i % 6)} className={`${mosaic(i, items.length)} overflow-hidden rounded-[var(--radius-card)]`}>
              <Tile
                item={item}
                sizes="(min-width:768px) 50vw, 100vw"
                onOpen={vIdx >= 0 ? () => lb.open(vIdx) : undefined}
                register={vIdx >= 0 ? lb.register(vIdx) : undefined}
              />
            </Reveal>
          );
        })}
      </ul>
      <Lightbox items={viewable} openIdx={lb.openIdx} close={lb.close} step={lb.step} />
    </>
  );
}

/* ------------------------------------------------------------------------ */
/* Immersive – scroll-linked horizontal gallery (infrastructure)             */
/* ------------------------------------------------------------------------ */

const subscribeDesktop = (cb: () => void) => {
  const mq = window.matchMedia("(min-width: 1024px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;

/**
 * Desktop: the section pins while vertical scrolling moves a row of large
 * photographs sideways (sticky + scroll-linked translateX). Touch, small
 * screens and reduced-motion: a native swipeable snap row. Every tile opens
 * the shared lightbox.
 */
export function ImmersiveGallery({
  items,
  heading,
  stickyPad = "pt-16",
  tileHeight = "h-[min(50vh,30rem)]",
  uniform = false,
  brand = false,
}: {
  items: GalleryItem[];
  heading: ReactNode;
  stickyPad?: string;
  tileHeight?: string;
  /** Same width for every tile (otherwise every third tile is wide). */
  uniform?: boolean;
  /** Brand-tinted overlay with index chip and accent rule. */
  brand?: boolean;
}) {
  const viewable = items.filter((i) => !isPending(i.media)) as Viewable[];
  const lb = useLightbox(viewable.length);
  const reduce = useReducedMotion();
  const desktop = useSyncExternalStore(subscribeDesktop, isDesktop, () => false);
  const pinned = desktop && !reduce && items.length > 2;

  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!pinned) return;
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(el.scrollWidth - window.innerWidth + 80, 0));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const tiles = items.map((item, i) => {
    const vIdx = viewable.findIndex((v) => v === item);
    return { item, vIdx, wide: i % 3 === 0 };
  });

  if (!pinned) {
    return (
      <div ref={outer} className="relative">
        <div className="container-x">{heading}</div>
        <ul className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:px-8">
          {tiles.map(({ item, vIdx, wide }, i) => (
            <Reveal as="li" key={`${item.title}-${i}`} delay={0.05 * (i % 4)} className={`h-[24rem] shrink-0 snap-start sm:h-[28rem] ${uniform ? "w-[80vw] sm:w-[26rem]" : wide ? "w-[86vw] sm:w-[34rem]" : "w-[72vw] sm:w-[24rem]"}`}>
              <Tile item={item} brand={brand} index={i} sizes="(min-width:640px) 34rem, 86vw" onOpen={vIdx >= 0 ? () => lb.open(vIdx) : undefined} register={vIdx >= 0 ? lb.register(vIdx) : undefined} />
            </Reveal>
          ))}
        </ul>
        <Lightbox items={viewable} openIdx={lb.openIdx} close={lb.close} step={lb.step} />
      </div>
    );
  }

  return (
    <>
      <div ref={outer} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
        <div className={`sticky top-0 flex h-screen flex-col justify-center overflow-hidden ${stickyPad}`}>
          <div className="container-x">{heading}</div>
          <motion.ul ref={track} style={{ x }} className="flex w-max gap-5 pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))] pr-10 will-change-transform">
            {tiles.map(({ item, vIdx, wide }, i) => (
              <li key={`${item.title}-${i}`} className={`${tileHeight} shrink-0 ${uniform ? "w-[min(34vw,27rem)]" : wide ? "w-[min(52vw,46rem)]" : "w-[min(32vw,28rem)]"}`}>
                <Tile item={item} brand={brand} index={i} sizes="(min-width:1024px) 34vw, 80vw" onOpen={vIdx >= 0 ? () => lb.open(vIdx) : undefined} register={vIdx >= 0 ? lb.register(vIdx) : undefined} />
              </li>
            ))}
          </motion.ul>
          <div className="container-x mt-6 flex items-center gap-4">
            <div className="h-0.5 flex-1 overflow-hidden rounded bg-line">
              <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-accent" />
            </div>
            <p className="flex items-center gap-1.5 text-sm text-muted">
              Keep scrolling <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </p>
          </div>
        </div>
      </div>
      <Lightbox items={viewable} openIdx={lb.openIdx} close={lb.close} step={lb.step} />
    </>
  );
}
