"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import type { Institution } from "@/types/institution";
import { ApplyButton, PhoneLink, WhatsAppButton } from "./Cta";
import { btn } from "./buttons";
import { NAV } from "@/lib/nav";


export type HeaderInstitution = Pick<Institution, "name" | "shortName" | "logo" | "logoOnDark" | "applyUrl" | "contact">;

export function Header({ institution }: { institution: HeaderInstitution }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const primaryPhone = institution.contact.phones[0];
  const dark = !!institution.logoOnDark;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const trigger = menuBtn.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-[box-shadow,border-color] duration-300 ${dark ? "on-dark bg-brand-ink/95 text-white" : "bg-surface/95"} ${
        scrolled ? `${dark ? "border-white/10" : "border-line"} shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)]` : "border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-surface"
      >
        Skip to content
      </a>
      <div className={`container-x flex items-center justify-between gap-3 transition-[height] duration-300 sm:gap-6 ${scrolled ? "h-16" : "h-[4.75rem]"}`}>
        <a href="#top" className="flex min-h-11 min-w-0 shrink items-center" aria-label={`${institution.name} – back to top`}>
          <Image
            src={institution.logo.src}
            alt={institution.logo.alt}
            width={institution.logo.width}
            height={institution.logo.height}
            preload
            sizes="200px"
            className={`w-auto max-w-[8.5rem] object-contain transition-[height] duration-300 sm:max-w-none ${scrolled ? "h-10" : "h-11 sm:h-12"}`}
          />
        </a>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "location" : undefined}
                  className={`relative inline-flex min-h-11 items-center px-3 text-[0.92rem] font-medium transition-colors hover:text-brand ${
                    active === item.id ? (dark ? "text-white" : "text-brand") : dark ? "text-white/75 hover:!text-white" : "text-ink/80"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 bottom-1.5 h-0.5 origin-left bg-accent transition-transform duration-300 ${
                      active === item.id ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {primaryPhone && (
            <PhoneLink
              tel={primaryPhone.tel}
              location="header"
              className={`hidden min-h-11 items-center gap-2 px-3 text-sm font-semibold lg:inline-flex ${dark ? "text-white hover:text-white/80" : "text-ink hover:text-brand"}`}
              icon
            >
              {primaryPhone.display}
            </PhoneLink>
          )}
          <ApplyButton href={institution.applyUrl} location="header" className={`${btn.accent} !min-h-11 whitespace-nowrap !px-4 text-sm max-[359px]:!hidden sm:!px-6`} />
          <button
            ref={menuBtn}
            type="button"
            className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-card)] border xl:hidden ${dark ? "border-white/30 text-white" : "border-line text-ink"}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="on-dark fixed inset-0 z-[70] flex flex-col bg-brand-ink text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container-x flex h-[4.75rem] items-center justify-between">
              <span className="font-display text-lg">{institution.shortName}</span>
              <button
                type="button"
                autoFocus
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-card)] border border-white/30"
              >
                <X aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <nav aria-label="Mobile" className="container-x flex-1 overflow-y-auto py-6">
              <ul className="flex flex-col">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.25 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="flex min-h-14 items-center border-b border-white/10 font-display text-2xl"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="container-x grid gap-3 pb-8 pt-4">
              <ApplyButton href={institution.applyUrl} location="mobile_menu" className={`${btn.accent} w-full`} />
              <div className="grid grid-cols-2 gap-3">
                <WhatsAppButton
                  number={institution.contact.whatsapp}
                  message={`Hi, I'd like to know about admissions 2027–28 at ${institution.name}.`}
                  location="mobile_menu"
                  className={`${btn.ghostLight} w-full`}
                  label="WhatsApp"
                  onAfter={() => setOpen(false)}
                />
                {primaryPhone && (
                  <PhoneLink tel={primaryPhone.tel} location="mobile_menu" className={`${btn.ghostLight} w-full`}>
                    <Phone aria-hidden="true" className="h-4 w-4" />
                    Call
                  </PhoneLink>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
