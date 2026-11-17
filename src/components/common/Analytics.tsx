import Script from "next/script";
import type { InstitutionKey } from "@/types/institution";

/**
 * GA4 loader. Uses a per-institution property when configured
 * (NEXT_PUBLIC_GA4_ID_RMP / _TRICHY / _EEC / _TRP), otherwise the shared
 * NEXT_PUBLIC_GA4_ID. Renders nothing when no ID is set.
 * Every hit carries the `institution` parameter for per-campus reporting.
 */
export function GoogleAnalytics({ institution }: { institution: InstitutionKey }) {
  const id = process.env[`NEXT_PUBLIC_GA4_ID_${institution.toUpperCase()}`] || process.env.NEXT_PUBLIC_GA4_ID;
  if (!id || !/^G-[A-Z0-9]+$/.test(id)) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id={`ga4-${institution}`} strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('set',{institution:'${institution}'});gtag('config','${id}',{institution:'${institution}',allow_google_signals:false,allow_ad_personalization_signals:false});`}
      </Script>
    </>
  );
}
