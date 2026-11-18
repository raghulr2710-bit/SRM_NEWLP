"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import type { InstitutionKey } from "@/types/institution";
import { ApplyButton, WhatsAppButton, WhatsAppIcon } from "./Cta";

/**
 * Sticky mobile admission bar (Apply / WhatsApp) + back-to-top control.
 * The mobile bar appears after the hero and hides while the enquiry form is
 * in view so it never covers the form fields.
 */
export function FloatingControls({
  applyUrl,
  whatsapp,
  institutionName,
  topClassName,
}: {
  institution: InstitutionKey;
  applyUrl: string;
  whatsapp: string | null;
  institutionName: string;
  /** Optional style override for the back-to-top button. */
  topClassName?: string;
}) {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.6);
      setShowTop(window.scrollY > window.innerHeight * 1.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const form = document.getElementById("enquire");
    const io = form
      ? new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.15 })
      : null;
    if (form && io) io.observe(form);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const barVisible = pastHero && !formVisible;

  return (
    <>
      <AnimatePresence>
        {barVisible && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden"
          >
            <div className="grid grid-cols-[1fr_auto] gap-3">
              <ApplyButton
                href={applyUrl}
                location="mobile_sticky"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-card)] bg-accent px-4 font-semibold text-on-accent"
              />
              <WhatsAppButton
                number={whatsapp}
                message={`Hi, I'd like to know about admissions 2027–28 at ${institutionName}.`}
                location="mobile_sticky"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-card)] border border-line bg-surface px-4 font-semibold text-ink"
                label="WhatsApp"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* desktop: floating WhatsApp button (always available, bottom-right) */}
      <div className="fixed bottom-5 right-5 z-40 hidden md:block">
        <WhatsAppButton
          number={whatsapp}
          message={`Hi, I'd like to know about admissions 2027–28 at ${institutionName}.`}
          location="desktop_floating"
          showIcon={false}
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-12px_rgba(37,211,102,0.8)] ring-4 ring-white/80 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-[#25D366]/40"
          label={
            <>
              <WhatsAppIcon className="h-7 w-7" />
              <span className="sr-only">WhatsApp</span>
              <span aria-hidden="true" className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                Chat on WhatsApp
              </span>
            </>
          }
        />
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => {
              const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
              document.querySelector<HTMLElement>("header a[href='#top']")?.focus({ preventScroll: true });
            }}
            className={topClassName ?? "fixed bottom-24 right-6 z-40 hidden h-12 w-12 items-center justify-center rounded-full bg-ink text-surface shadow-lg hover:bg-brand md:flex"}
          >
            <ArrowUp aria-hidden="true" className="h-5 w-5" />
            <span className="sr-only">Back to top</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
