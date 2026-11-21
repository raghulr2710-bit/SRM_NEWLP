"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Single row that glides sideways on its own (seamless loop: the items are rendered twice),
 * pauses on hover / focus / touch, and has prev / next arrows that move one card at a time.
 * Reduced motion: no auto-scroll; the row stays swipeable and the arrows still work.
 */
export function AutoScrollRow({ children, label, itemClassName = "", speed = 40 }: { children: ReactNode; label: string; itemClassName?: string; speed?: number }) {
  const ref = useRef<HTMLUListElement>(null);
  const paused = useRef(false);
  const reduce = useReducedMotion();
  const items = Children.toArray(children);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    let raf = 0;
    let last = performance.now();
    let pos = el.scrollLeft;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      if (!paused.current) {
        const half = el.scrollWidth / 2;
        if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft; // user / arrow moved it
        pos += (speed * dt) / 1000;
        if (pos >= half) pos -= half;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, speed]);

  const go = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    const half = el.scrollWidth / 2;
    // keep inside the duplicated range so the loop stays seamless
    if (dir < 0 && el.scrollLeft < step) el.scrollLeft += half;
    if (dir > 0 && el.scrollLeft + step >= half * 2 - el.clientWidth) el.scrollLeft -= half;
    paused.current = true;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
    window.setTimeout(() => (paused.current = false), 1600);
  };

  const pause = () => {
    paused.current = true;
  };
  const resume = () => {
    paused.current = false;
  };
  const resumeLater = () => {
    window.setTimeout(resume, 2500);
  };
  return (
    <div className="relative">
      <ul
        ref={ref}
        aria-label={label}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocus={pause}
        onBlur={resume}
        onTouchStart={pause}
        onTouchEnd={resumeLater}
        className="no-scrollbar flex gap-5 overflow-x-auto py-3 [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]"
      >
        {[0, 1].map((copy) =>
          items.map((child, i) => (
            <li key={`${copy}-${i}`} aria-hidden={copy ? true : undefined} inert={copy ? true : undefined} className={`shrink-0 ${itemClassName}`}>
              {child}
            </li>
          )),
        )}
      </ul>
      <div className="mt-5 flex justify-center gap-3">
        {([[-1, ArrowLeft, "Previous"], [1, ArrowRight, "Next"]] as const).map(([d, Icon, l]) => (
          <button
            key={l}
            type="button"
            onClick={() => go(d)}
            aria-label={`${l} ${label.toLowerCase()}`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-brand shadow-sm transition-colors hover:bg-brand hover:text-on-brand"
          >
            <Icon aria-hidden="true" className="h-5 w-5" />
          </button>
        ))}
      </div>
    </div>
  );
}
