import type { Metadata } from "next";
import {
  defaultLocale,
  hreflangMap,
  locales,
  ogLocaleMap,
  type Locale,
} from "@/lib/i18n/config";
import type { Dictionary } from "@/types/dictionary";

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sunaz.az";
}

export function buildAlternateLanguages(path = ""): Record<string, string> {
  const base = getSiteUrl();
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    languages[hreflangMap[locale]] = `${base}/${locale}${path}`;
  }

  languages["x-default"] = `${base}/${defaultLocale}${path}`;
  return languages;
}

export function buildPageMetadata(locale: Locale, dict: Dictionary, path = ""): Metadata {
  const base = getSiteUrl();
  const url = `${base}/${locale}${path}`;

  return {
    metadataBase: new URL(base),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    alternates: {
      canonical: url,
      languages: buildAlternateLanguages(path),
    },
    openGraph: {
      type: "website",
      locale: ogLocaleMap[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => ogLocaleMap[l]),
      url,
      siteName: "SUNAZ Group LLC",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
