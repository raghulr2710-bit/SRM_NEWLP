import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Fraunces, Inter } from "next/font/google";
import { institutionList } from "@/data/institutions";

const display = Fraunces({ subsets: ["latin"], weight: ["400"], variable: "--font-hub-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-hub-body", display: "swap" });

/** Campaign hub: routes visitors to the four independent campus landing pages. */
export default function Home() {
  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen bg-[#0a1b3d] text-white`}
      style={{ fontFamily: "var(--font-hub-body), system-ui, sans-serif" }}
    >
      <main className="container-x py-16 lg:py-24">
        <p className="eyebrow text-white/60">Admissions Open 2027–28</p>
        <h1
          className="mt-4 max-w-3xl text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-hub-display), Georgia, serif" }}
        >
          Choose your campus.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/70">
          Four institutions, four distinct experiences. Pick a campus to explore its programmes, placements and admission process.
        </p>

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {institutionList.map((inst) => (
            <li key={inst.key}>
              <Link
                href={inst.route}
                className="group flex h-full flex-col justify-between gap-10 bg-white p-8 text-[#0b1426] transition-transform duration-300 hover:-translate-y-1"
                style={{ borderTop: `8px solid ${inst.theme.brand}` }}
              >
                <Image src={inst.logo.src} alt={inst.logo.alt} width={inst.logo.width} height={inst.logo.height} className="h-16 w-auto self-start" sizes="260px" />
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-2xl" style={{ fontFamily: "var(--font-hub-display), Georgia, serif" }}>
                      {inst.shortName}
                    </p>
                    <p className="mt-1 text-sm text-[#4a5568]">
                      {inst.city} · {inst.programmes.items.length} programmes
                    </p>
                  </div>
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white transition-transform group-hover:rotate-45"
                    style={{ background: inst.theme.brand }}
                  >
                    <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
