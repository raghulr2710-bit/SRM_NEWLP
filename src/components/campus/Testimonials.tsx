"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowLeft, ArrowRight, Play, Quote } from "lucide-react";
import { isPending, type Testimonial } from "@/types/institution";
import { MediaFill, PendingTag } from "@/components/common/Media";

const initials = (n: string) =>
  n
    .replace(/^(Mr|Ms|Mrs|Dr)\.?\s+/i, "")
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

/**
 * Section 10 – Student testimonials carousel.
 * Native scroll-snap (touch swipe), mouse drag on desktop, arrow buttons and
 * position dots; no autoplay. Only genuine published alumni details are used;
 * quotes appear only when approved verbatim text exists.
 */
export function TestimonialCarousel({ items, note }: { items: Testimonial[]; pendingSlots?: number; note?: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [active, setActive] = useState(0);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
    const card = el.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 20 : el.clientWidth;
    setActive(Math.min(items.length - 1, Math.round(el.scrollLeft / w)));
  }, [items.length]);

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

  const go = (target: number) => {
    const el = track.current;
    const card = el?.querySelectorAll("li")[target] as HTMLElement | undefined;
    if (!el || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const first = el.firstElementChild as HTMLElement;
    el.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  };
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * w, behavior: reduce ? "auto" : "smooth" });
  };

  // Mouse drag (touch already swipes natively).
  const onDown = (e: ReactPointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
  };
  const onMove = (e: ReactPointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    if (!d || !track.current) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      setDragging(true);
      track.current.setPointerCapture(e.pointerId);
    }
    if (d.moved) track.current.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved || !track.current) return;
    setDragging(false);
    // let snap settle on the nearest card
    update();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">{note}</p>
        {items.length > 1 && (
          <div className="flex shrink-0 gap-2">
            {(
              [
                [-1, canPrev, ArrowLeft, "Previous testimonial"],
                [1, canNext, ArrowRight, "Next testimonial"],
              ] as const
            ).map(([dir, enabled, Icon, label]) => (
              <button
                key={label}
                type="button"
                onClick={() => scroll(dir)}
                disabled={!enabled}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-[background-color,color,transform] duration-200 hover:bg-ink hover:text-surface active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">{label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <ul
        ref={track}
        aria-label="Student stories"
        tabIndex={0}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onClickCapture={(e) => {
          if (dragging) e.preventDefault();
        }}
        className={`no-scrollbar -mx-5 flex gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0 ${
          dragging ? "cursor-grabbing select-none snap-none" : "cursor-grab snap-x snap-mandatory scroll-smooth"
        }`}
      >
        {items.map((t, i) => (
          <li
            key={t.name}
            className={`relative flex w-[85%] shrink-0 snap-start flex-col rounded-[var(--radius-card)] border bg-white p-7 transition-[border-color,box-shadow,opacity] duration-500 sm:w-[55%] lg:w-[calc((100%-2.5rem)/3)] ${
              i === active ? "border-brand/30 shadow-[0_30px_60px_-45px_rgba(10,20,50,0.6)]" : "border-line"
            }`}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
          >
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-brand text-on-brand">
                {t.photo && !isPending(t.photo) ? (
                  <MediaFill media={t.photo} sizes="56px" tag={false} />
                ) : (
                  <span className="flex h-full w-full items-center justify-center font-display text-lg" aria-hidden="true">
                    {initials(t.name)}
                  </span>
                )}
              </div>
              <div>
                <p className="font-display text-lg leading-tight text-ink [text-wrap:balance]">{t.name}</p>
                <p className="text-sm text-muted">
                  {t.programme}
                  {t.year && ` · ${t.year}`}
                </p>
              </div>
            </div>

            {t.quote ? (
              <blockquote className="mt-6 flex-1 text-[1.0625rem] leading-relaxed text-ink">
                <Quote aria-hidden="true" className="mb-2 h-6 w-6 text-accent-ink" />
                {t.quote}
              </blockquote>
            ) : (
              <div className="mt-6 flex-1 space-y-3">
                {t.role && (
                  <p className="type-h3 font-display text-brand">
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
      </ul>

      {items.length > 1 && (
        <div className="mt-4 flex justify-center gap-1" role="group" aria-label="Choose a story">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => go(i)}
              aria-current={i === active ? "true" : undefined}
              className="flex h-11 min-w-6 items-center justify-center"
            >
              <span className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ${i === active ? "w-7 bg-brand" : "w-1.5 bg-line"}`} />
              <span className="sr-only">Story {i + 1}: {t.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
