import type { Institution } from "@/types/institution";
import { siteUrl } from "@/lib/site";

/** schema.org structured data built only from verified contact + programme data. */
export function JsonLd({ inst }: { inst: Institution }) {
  const url = `${siteUrl()}${inst.route}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollegeOrUniversity",
        "@id": `${url}#org`,
        name: inst.name,
        url,
        logo: `${siteUrl()}${inst.logo.src}`,
        ...(inst.contact.addressVerified
          ? { address: { "@type": "PostalAddress", streetAddress: inst.contact.address, addressCountry: "IN" } }
          : {}),
        email: inst.contact.emails[0],
        telephone: inst.contact.phones[0]?.display,
      },
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: inst.seo.title,
        description: inst.seo.description,
        about: { "@id": `${url}#org` },
      },
      {
        "@type": "FAQPage",
        mainEntity: inst.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output, with "<" escaped so content can't close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
