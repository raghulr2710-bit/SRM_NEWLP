import Image from "next/image";
import Link from "next/link";
import type { Institution } from "@/types/institution";
import { institutionList } from "@/data/institutions";
import { NAV } from "@/lib/nav";
import { EmailLink, PhoneLink } from "./Cta";

const SOCIAL_LABEL = { facebook: "Facebook", instagram: "Instagram", linkedin: "LinkedIn", youtube: "YouTube", x: "X" } as const;

export function Footer({ inst }: { inst: Institution }) {
  const others = institutionList.filter((i) => i.key !== inst.key);
  return (
    <footer className="on-dark bg-brand-ink pb-28 pt-16 text-white/80 md:pb-12">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className={`inline-block rounded-[var(--radius-card)] ${inst.logoOnDark ? "" : "bg-white p-3"}`}>
            <Image src={inst.logo.src} alt={inst.logo.alt} width={inst.logo.width} height={inst.logo.height} className="h-14 w-auto" sizes="220px" />
          </div>
          <p className="mt-6 max-w-xs font-display text-xl text-white">{inst.footer.tagline}</p>
          <p className="mt-3 text-sm">{inst.legalLine}</p>
        </div>

        <nav aria-label="Footer – this page" className="lg:col-span-2">
          <h2 className="eyebrow mb-4 text-white">Explore</h2>
          <ul className="space-y-1 text-sm">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="inline-flex min-h-11 items-center hover:text-white hover:underline">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#enquire" className="inline-flex min-h-11 items-center hover:text-white hover:underline">
                Enquire
              </a>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="eyebrow mb-4 text-white">Admissions office</h2>
          <address className="space-y-2 text-sm not-italic">
            <p>{inst.contact.address}</p>
            {inst.contact.phones.map((p) => (
              <p key={p.tel}>
                <PhoneLink tel={p.tel} location="footer" className="inline-flex min-h-11 items-center hover:text-white">
                  {p.label}: {p.display}
                </PhoneLink>
              </p>
            ))}
            {inst.contact.emails.map((e) => (
              <p key={e}>
                <EmailLink email={e} location="footer" className="inline-flex min-h-11 items-center gap-2 break-all hover:text-white" />
              </p>
            ))}
          </address>
        </div>

        <div className="lg:col-span-3">
          <h2 className="eyebrow mb-4 text-white">Other campuses</h2>
          <ul className="space-y-1 text-sm">
            {others.map((o) => (
              <li key={o.key}>
                <Link href={o.route} className="inline-flex min-h-11 items-center hover:text-white hover:underline">
                  {o.shortName}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="eyebrow mb-3 mt-8 text-white">Follow</h2>
          {inst.footer.social.length > 0 ? (
            <ul className="flex flex-wrap gap-3 text-sm">
              {inst.footer.social.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener" className="hover:text-white hover:underline">
                    {SOCIAL_LABEL[s.network]}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-white/50">Official social media links pending confirmation.</p>
          )}
        </div>
      </div>

      <div className="container-x mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
        <p>© 2027 {inst.name}. All rights reserved.</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            {inst.footer.privacyUrl ? (
              <a href={inst.footer.privacyUrl} className="hover:text-white">
                Privacy policy
              </a>
            ) : (
              <span title="Official privacy policy URL pending">Privacy policy (link pending)</span>
            )}
          </li>
          <li>
            {inst.footer.termsUrl ? (
              <a href={inst.footer.termsUrl} className="hover:text-white">
                Terms of use
              </a>
            ) : (
              <span title="Official terms URL pending">Terms of use (link pending)</span>
            )}
          </li>
        </ul>
      </div>
    </footer>
  );
}
