import { COMPANY } from "@/lib/company";
import { CERTIFICATE_ASSETS, CERTIFICATE_IDS } from "@/lib/certifications/catalog";
import { getSiteUrl } from "@/lib/seo/metadata";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/types/dictionary";

export function buildCertificationsStructuredData(locale: Locale, dict: Dictionary) {
  const base = getSiteUrl();
  const pageUrl = `${base}/${locale}/certifications`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: dict.compliance.page.meta.title,
        description: dict.compliance.page.meta.description,
        inLanguage: locale,
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#certificates`,
        name: dict.compliance.page.hero.title,
        itemListElement: dict.compliance.page.items.map((item, index) => {
          const assets = CERTIFICATE_ASSETS[item.id as (typeof CERTIFICATE_IDS)[number]];
          return {
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              name: item.title,
              description: item.description,
              url: `${base}${assets.pdf}`,
              image: `${base}${assets.image}`,
              publisher: {
                "@type": "Organization",
                name: COMPANY.legalName,
              },
            },
          };
        }),
      },
    ],
  };
}
