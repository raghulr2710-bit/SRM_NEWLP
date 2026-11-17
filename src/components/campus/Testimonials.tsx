"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play, Quote } from "lucide-react";
import { isPending, type Testimonial } from "@/types/institution";
import { MediaFill, PendingBox, PendingTag } from "@/components/common/Media";

const initials = (n: string) =>
  n
    .replace(/^(Mr|Ms|Mrs|Dr)\.?\s+/i, "")
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

/**
 * Section 10 – Student testimonials carousel (scroll-snap + buttons, no autoplay).
 * Only genuine published alumni details are used; quotes appear only when
 * approved verbatim text exists. Empty slots render as labelled placeholders.
 */
export function TestimonialCarousel({
  items,
  pendingSlots = 0,
  note,
}: {
  items: Testimonial[];
  pendingSlots?: number;
  note?: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
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

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * w, behavior: reduce ? "auto" : "smooth" });
  };

  const total = items.length + pendingSlots;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">{note}</p>
        {total > 1 && (
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              disabled={!canPrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-surface disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
            >
              <ArrowLeft aria-hidden="true" className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              disabled={!canNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-surface disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
            >
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </button>
          </div>
        )}
      </div>

      <ul
        ref={track}
        aria-label="Student stories"
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 md:mx-0 md:px-0"
        tabIndex={0}
      >
        {items.map((t, i) => (
          <li
            key={t.name}
            className="relative flex w-[85%] shrink-0 snap-start flex-col rounded-[var(--radius-card)] border border-line bg-white p-7 sm:w-[55%] lg:w-[calc((100%-2.5rem)/3)]"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
          >
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-brand text-on-brand">
                {t.photo && !isPending(t.photo) ? (
                  <MediaFill media={t.photo} sizes="64px" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center font-display text-xl" aria-hidden="true">
                    {initials(t.name)}
                  </span>
                )}
              </div>
              <div>
                <p className="font-display text-xl leading-tight text-ink [text-wrap:balance]">{t.name}</p>
                <p className="text-sm text-muted">
                  {t.programme}
                  {t.year && ` · ${t.year}`}
                </p>
              </div>
            </div>

            {t.quote ? (
              <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-ink">
                <Quote aria-hidden="true" className="mb-2 h-6 w-6 text-accent-ink" />
                {t.quote}
              </blockquote>
            ) : (
              <div className="mt-6 flex-1 space-y-3">
                {t.role && (
                  <p className="font-display text-2xl leading-snug text-brand">
                    <span className="sr-only">Now: </span>
                    {t.role}
                  </p>
                )}
                {t.achievement && <p className="leading-relaxed text-muted">{t.achievement}</p>}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
              {t.videoUrl ? (
                <a href={t.videoUrl} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand">
                  <Play aria-hidden="true" className="h-4 w-4" /> Watch video
                </a>
              ) : (
                <PendingTag className="text-muted">Photo &amp; video pending</PendingTag>
              )}
            </div>
          </li>
        ))}
        {Array.from({ length: pendingSlots }).map((_, i) => (
          <li key={`pending-${i}`} className="h-80 w-[85%] shrink-0 snap-start sm:w-[55%] lg:w-[calc((100%-2.5rem)/3)]">
            <PendingBox label="Approved student testimonial (photo, name, programme, year, quote)" className="rounded-[var(--radius-card)]" />
          </li>
        ))}
      </ul>
    </div>
  );
}
