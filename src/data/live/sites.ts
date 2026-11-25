import type { LiveSiteConfig } from "@/components/live/LiveLanding";
import type { LiveData } from "@/components/live/types";
import { easwari, ramapuram, tiruchirappalli, trp } from "@/data/institutions";
import ramapuramData from "./ramapuram.json";
import tiruchirappalliData from "./tiruchirappalli.json";
import easwariData from "./easwari.json";
import trpData from "./trp.json";
import { tiruchirappalliSections } from "@/components/live/sections/tiruchirappalli";
import { easwariSections } from "@/components/live/sections/easwari";
import { trpSections } from "@/components/live/sections/trp";

/**
 * Per-institution identity for the live landing pages. Content: ./<key>.json (verbatim from each
 * live registration site). Hero visuals are AI-generated illustrations (transparent cut-outs);
 * circle = position of the disc behind the student's head, measured from the image alpha.
 */

/** SRMIST Ramapuram – SRM blue + gold. */
export const ramapuramSite: LiveSiteConfig = {
  inst: ramapuram,
  data: ramapuramData as unknown as LiveData,
  palette: {
    brand: "#0b4fa0",
    brandInk: "#0a1b3d",
    brandSoft: "#eaf1fb",
    brandDeep: "#0a3f82",
    brandTint: "#eaf2ff",
    brandTint2: "#d6e6ff",
    hl: "#f2c14e",
    hlDeep: "#d9a520",
    hlSoft: "#fdf6e3",
    hlInk: "#7a5a00",
    accentOnDark: "#9cc3ff",
  },
  hideHeroSubline: true,
  heroImageFill: true, // client: student the same size on every desktop screen (height-driven)
  heroBg: { pattern: "none", image: "/assets/ramapuram/hero/hero-bg-steel-facade.webp", position: "center 40%", opacity: 0.5 }, // client: no grid; campus steel facade photo (no cafe sign) at 50% opacity
  heroImage: {
    src: "/assets/ramapuram/hero/hero-student-cse-girl-cutout.webp", // client-supplied photo (Nov 2026)
    alt: "Smiling student with an ID lanyard holding a Data Communications and Networking textbook",
    width: 1096,
    height: 1436,
    circle: { cx: 49.7, w: 72, top: -3.5, opacity: 0.55 },
  },
};

/** SRMIST Tiruchirappalli – deep ocean blue (live site #0c477f) + amber. */
export const tiruchirappalliSite: LiveSiteConfig = {
  inst: tiruchirappalli,
  data: tiruchirappalliData as unknown as LiveData,
  palette: {
    brand: "#0c477f",
    brandInk: "#071f3a",
    brandSoft: "#e8f0f8",
    brandDeep: "#083660",
    brandTint: "#e9f1fa",
    brandTint2: "#d3e3f3",
    hl: "#f7b32b",
    hlDeep: "#ef9a0a",
    hlSoft: "#fef5e3",
    hlInk: "#8a5300",
    accentOnDark: "#9fc4ec",
    buttonRadius: "30px",
    surfaceAlt: "#f3f6fa",
    line: "#dce4ee",
    ink: "#0b1a2e",
    muted: "#4a5668",
  },
  heroImageFill: true, // client: student the same size on every desktop screen (as Ramapuram / Easwari)
  heroBg: { pattern: "dots", image: "/assets/tiruchirappalli/campus/campus-entrance.webp", position: "30% center", opacity: 0.17 },
  hideHeroSubline: true,
  heroImage: {
    src: "/assets/tiruchirappalli/hero/ai-hero-science-cutout.webp",
    alt: "Science student in a lab coat holding a tablet, with microscope, DNA, satellite and computing imagery",
    width: 1200,
    height: 1841,
    circle: { cx: 50.8, w: 70, top: -2 },
  },
  globe: { home: [10.95, 78.75], partners: false, base: [0.86, 0.91, 0.98], marker: [0.97, 0.62, 0.04], glow: [0.8, 0.87, 0.97] },
  sections: tiruchirappalliSections,
};

/** Easwari Engineering College – maroon (live site #430005) + Easwari yellow (#fbca38). */
export const easwariSite: LiveSiteConfig = {
  courseWording: { one: "programme", many: "programmes", group: "Programme" },
  inst: easwari,
  data: easwariData as unknown as LiveData,
  palette: {
    brand: "#7a1020",
    brandInk: "#2a0508",
    brandSoft: "#f8ecec",
    brandDeep: "#4f0611",
    brandTint: "#faeeee",
    brandTint2: "#f2dbdb",
    hl: "#fbca38",
    hlDeep: "#e9b106",
    hlSoft: "#fef7e0",
    hlInk: "#7a5800",
    accentOnDark: "#f5b8bf",
    surfaceAlt: "#f8f4f2",
    line: "#ebe0dd",
    ink: "#23161a",
    muted: "#5b4d50",
  },
  heroImageFill: true, // client: student the same size on every desktop screen (as Ramapuram)
  heroBg: { pattern: "diagonal", image: "/img/eec/green-campus.jpg", position: "center 35%", opacity: 0.15 },
  heroImage: {
    src: "/assets/easwari/hero/ai-hero-cse-cutout.webp",
    alt: "Computer engineering student holding a laptop, with AI robot, microchip, drone and circuit imagery",
    width: 1200,
    height: 2126,
    circle: { cx: 44.7, w: 80, top: -1.75 },
  },
  globe: { home: [13.03, 80.18], partners: false, base: [0.98, 0.91, 0.91], marker: [0.98, 0.79, 0.22], glow: [0.96, 0.86, 0.86] },
  sections: easwariSections,
};

/** SRM TRP Engineering College – logo indigo-purple (#2f2f62) + yellow. */
export const trpSite: LiveSiteConfig = {
  courseWording: { one: "programme", many: "programmes", group: "Programme" },
  compactCourseCards: true,
  inst: trp,
  data: trpData as unknown as LiveData,
  palette: {
    brand: "#33337a",
    brandInk: "#14143a",
    brandSoft: "#ececf7",
    brandDeep: "#232358",
    brandTint: "#eeeef9",
    brandTint2: "#d9d9f0",
    hl: "#fbca38",
    hlDeep: "#e9b106",
    hlSoft: "#fef7e0",
    hlInk: "#7a5800",
    accentOnDark: "#b9b9ee",
    surfaceAlt: "#f4f4f9",
    line: "#e0e0ec",
    ink: "#14142b",
    muted: "#50506a",
  },
  heroBg: { pattern: "rings", image: "/assets/trp/campus/state-of-the-art-infrastructure.jpg", position: "center 60%", opacity: 0.16 },
  heroImage: {
    src: "/assets/trp/hero/ai-hero-mech-cutout.webp",
    alt: "Engineering student holding a rolled blueprint, with wind turbine, electric car, gears and jet engine imagery",
    width: 1200,
    height: 2094,
    circle: { cx: 46.8, w: 70, top: -1.78 },
  },
  globe: { home: [10.76, 78.81], partners: false, base: [0.9, 0.9, 0.97], marker: [0.98, 0.79, 0.22], glow: [0.86, 0.86, 0.96] },
  sections: trpSections,
  headerBadge: { src: "/assets/trp/accreditation/naac-a-plus.png", alt: "Accredited by NAAC with A+ Grade", width: 214, height: 156 },
  tabsTone: "hl",
  hideHeroBadges: true,
};
