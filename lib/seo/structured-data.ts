import { COMPANY } from "@/lib/company";
import { FACILITY_IDS, FACILITY_LOCATIONS } from "@/lib/facilities/catalog";
import { getSiteUrl } from "@/lib/seo/metadata";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/types/dictionary";

export function buildOrganizationSchema(locale: Locale, dict: Dictionary) {
  const base = getSiteUrl();

  const hasPOS = FACILITY_IDS.map((id) => {
    const location = FACILITY_LOCATIONS[id];
    const item = dict.contact.facilityLocations.items.find((f) => f.id === id);

    return {
      "@type": "Place",
      name: item?.name ?? COMPANY.legalName,
      description: item?.description,
      geo: {
        "@type": "GeoCoordinates",
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng,
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "AZ",
        streetAddress: item?.address.join(", ") ?? "",
      },
      hasMap: location.mapsUrl,
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: COMPANY.legalName,
    alternateName: "SUNAZ",
    url: `${base}/${locale}`,
    logo: `${base}/logo.png`,
    description: dict.meta.description,
    foundingDate: String(COMPANY.founded),
    email: COMPANY.email,
    telephone: COMPANY.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.headquarters.city,
      addressCountry: "AZ",
      streetAddress: COMPANY.headquarters.address,
    },
    hasPOS,
    areaServed: ["AZ", "International"],
    knowsAbout: [
      "Poultry Processing",
      "Halal Food Production",
      "Food Export",
      "Chicken Products",
    ],
    sameAs: [COMPANY.social.linkedin],
  };
}

export function buildLocalBusinessSchema(locale: Locale, dict: Dictionary) {
  const base = getSiteUrl();
  const facility = COMPANY.facilities.baku;
  const bakuItem = dict.contact.facilityLocations.items.find((f) => f.id === "baku");

  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": `${base}/#localbusiness`,
    name: bakuItem?.name ?? `${COMPANY.legalName} — Baku Processing & Export Complex`,
    description: dict.contact.facilityLocations.items.find((f) => f.id === "baku")?.description,
    url: `${base}/${locale}#facilities`,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    foundingDate: String(COMPANY.founded),
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.headquarters.city,
      addressRegion: "Baku",
      addressCountry: "AZ",
      streetAddress: COMPANY.headquarters.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: facility.coordinates.lat,
      longitude: facility.coordinates.lng,
    },
    servesCuisine: "Halal Poultry Products",
    priceRange: "$$",
  };
}

export function buildWebSiteSchema(locale: Locale) {
  const base = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: `${base}/${locale}`,
    name: "SUNAZ Group LLC",
    inLanguage: locale,
    publisher: {
      "@id": `${base}/#organization`,
    },
  };
}

export function buildStructuredData(locale: Locale, dict: Dictionary) {
  return [
    buildOrganizationSchema(locale, dict),
    buildLocalBusinessSchema(locale, dict),
    buildWebSiteSchema(locale),
  ];
}
