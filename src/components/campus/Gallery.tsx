"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { isPending, type ImageAsset, type Media } from "@/types/institution";
import { MediaFill } from "@/components/common/Media";
import { Reveal } from "@/components/common/Reveal";

export interface GalleryItem {
  title: string;
  description?: string;
  media: Media;
}

/**
 * Image-led gallery with an accessible lightbox (Esc to close, ←/→ to move,
 * focus returned to the opening tile). Pending assets render as labelled
 * placeholders and are not openable.
 */
export function Gallery({
  items,
  variant,
  tone = "light",
}: {
  items: GalleryItem[];
  variant: "mosaic" | "strip";
  tone?: "light" | "dark";
}) {
  const viewable = items.filter((i) => !isPending(i.media)) as (GalleryItem & { media: ImageAsset })[];
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const triggers = useRef<Map<number, HTMLButtonElement>>(new Map());
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastOpened = useRef<number | null>(null);

  const close = useCallback(() => {
    setOpenIdx(null);
    const idx = lastOpened.current;
    if (idx !== null) window.setTimeout(() => triggers.current.get(idx)?.focus(), 0);
  }, []);
  const step = useCallback(
    (d: number) => setOpenIdx((i) => (i === null ? i : (i + d + viewable.length) % viewable.length)),
    [viewable.length],
  );

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
        // keep focus inside the dialog
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

  const dark = tone === "dark";
  const layouts =
    variant === "mosaic"
      ? ["md:col-span-2 md:row-span-2", "", "", "md:col-span-2", "", "md:col-span-3"]
      : ["", "", "", "", "", ""];

  return (
    <>
      <ul
        className={
          variant === "mosaic"
            ? "grid auto-rows-[14rem] grid-cols-2 gap-3 md:auto-rows-[15rem] md:grid-cols-4"
            : "no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-5"
        }
      >
        {items.map((item, i) => {
          const vIdx = viewable.findIndex((v) => v === item);
          const pending = isPending(item.media);
          const tile = (
            <>
              <MediaFill media={item.media} sizes={variant === "mosaic" ? "(min-width:768px) 50vw, 50vw" : "(min-width:1024px) 20vw, 75vw"} tone={tone} zoom />
              {!pending && (
                <>
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Expand aria-hidden="true" className="h-4 w-4" />
                  </span>
                </>
              )}
              <span className={`absolute inset-x-0 bottom-0 p-4 text-left ${pending ? "hidden" : ""}`}>
                <span className="block font-display text-base leading-tight text-white hyphens-auto [overflow-wrap:anywhere] sm:text-lg">{item.title}</span>
                {item.description && <span className="mt-1 hidden text-sm text-white/85 sm:block">{item.description}</span>}
              </span>
            </>
          );
          return (
            <Reveal
              as="li"
              key={`${item.title}-${i}`}
              delay={0.04 * (i % 6)}
              className={`${layouts[i % layouts.length]} ${variant === "strip" ? "w-[75vw] shrink-0 snap-start sm:w-[45vw] md:w-auto" : ""}`}
            >
              {pending ? (
                <div className={`relative overflow-hidden rounded-[var(--radius-card)] ${variant === "strip" ? "aspect-[3/4]" : "h-full"}`}>
                  {tile}
                  <span className={`absolute inset-x-0 top-0 p-3 text-xs font-semibold ${dark ? "text-white/80" : "text-brand"}`}>{item.title}</span>
                </div>
              ) : (
                <button
                  type="button"
                  ref={(el) => {
                    if (el) triggers.current.set(vIdx, el);
                  }}
                  onClick={() => {
                    lastOpened.current = vIdx;
                    setOpenIdx(vIdx);
                  }}
                  className={`group relative block w-full overflow-hidden rounded-[var(--radius-card)] ${variant === "strip" ? "aspect-[3/4]" : "h-full"}`}
                  aria-label={`View larger: ${item.title}`}
                >
                  {tile}
                </button>
              )}
            </Reveal>
          );
        })}
      </ul>

      <AnimatePresence>
        {openIdx !== null && viewable[openIdx] && (
          <motion.div
            id="gallery-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={viewable[openIdx].title}
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
                {openIdx + 1} / {viewable.length}
              </p>
              <button ref={closeBtn} type="button" onClick={close} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                <X aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && close()}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={viewable[openIdx].media.src}
                  className="absolute inset-4 md:inset-x-20"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image src={viewable[openIdx].media.src} alt={viewable[openIdx].media.alt} fill sizes="100vw" className="object-contain" />
                </motion.div>
              </AnimatePresence>
              {viewable.length > 1 && (
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
              <p className="font-display text-xl">{viewable[openIdx].title}</p>
              {viewable[openIdx].description && <p className="mt-1 text-sm text-white/70">{viewable[openIdx].description}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
