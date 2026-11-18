"use client";

/**
 * Framed video thumbnail + modal player, adapted from Magic UI "Hero Video
 * Dialog" (top-in / bottom-out) via Motion Studio. The YouTube player only
 * loads when the dialog opens (privacy-enhanced domain, no cookies up front).
 */

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { youTubeId } from "@/components/common/VideoEmbed";

export function PromoVideo({ url, title }: { url: string; title: string }) {
  const id = youTubeId(url);
  const [open, setOpen] = useState(false);
  const [thumb, setThumb] = useState(id ? `https://i.ytimg.com/vi/${id}/sddefault.jpg` : "");
  const reduce = useReducedMotion();
  const trigger = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const fallback = () => setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);

  // the image can finish loading before hydration attaches onLoad: re-check once mounted
  useEffect(() => {
    const el = img.current;
    if (el?.complete && el.naturalWidth > 0 && el.naturalWidth < 200) fallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const t = trigger.current;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      t?.focus();
    };
  }, [open]);

  if (!id) return null;

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block aspect-video w-full overflow-hidden rounded-[1.25rem] bg-brand-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#f2c14e]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube thumbnail with fallback */}
        <img
          ref={img}
          src={thumb}
          alt=""
          loading="lazy"
          onLoad={(e) => {
            // a missing thumbnail returns a 120px grey placeholder when missing
            if (e.currentTarget.naturalWidth < 200 && !thumb.includes("hqdefault")) fallback();
          }}
          onError={fallback}
          className="absolute inset-0 h-full w-full scale-[1.13] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.18]"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-brand-ink/10 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span aria-hidden="true" className="absolute h-24 w-24 rounded-full border border-white/50 transition-transform duration-500 group-hover:scale-110" />
          <span className="relative flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full bg-[#f2c14e] text-brand-ink transition-transform duration-300 group-hover:scale-105">
            <Play aria-hidden="true" className="ml-1 h-7 w-7 fill-current" />
          </span>
        </span>
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/30 backdrop-blur-md">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#f2c14e]" />
          {title}
        </span>
        <span className="sr-only">Play video: {title}</span>
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/80 p-4 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              >
                <motion.div
                  className="relative w-full max-w-5xl"
                  initial={reduce ? { opacity: 0 } : { y: "-60%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { y: "60%", opacity: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    ref={closeBtn}
                    type="button"
                    onClick={() => setOpen(false)}
                    className="absolute -top-14 right-0 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md transition-colors hover:bg-white/25"
                  >
                    <X aria-hidden="true" className="h-5 w-5" />
                    <span className="sr-only">Close video</span>
                  </button>
                  <div className="aspect-video overflow-hidden rounded-2xl bg-black ring-2 ring-white/20">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                      title={title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

/**
 * Scroll-linked tilt-in frame (Aceternity "Container Scroll" pattern via Motion
 * Studio): the media rises from a slight 3D tilt to flat as it scrolls into view.
 * Static for reduced motion.
 */
export function ScrollTiltFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  return (
    <div ref={ref} className={`[perspective:1200px] ${className}`}>
      <motion.div style={reduce ? undefined : { rotateX, scale, transformOrigin: "50% 100%" }}>{children}</motion.div>
    </div>
  );
}
