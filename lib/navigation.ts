import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/types/dictionary";

export interface NavLink {
  label: string;
  href: string;
}

export function getPrimaryNavLinks(locale: Locale, dict: Dictionary): NavLink[] {
  return [
    { label: dict.nav.about, href: `/${locale}/#about` },
    { label: dict.nav.products, href: `/${locale}/#products` },
    { label: dict.nav.export, href: `/${locale}/#export` },
    { label: dict.nav.facilities, href: `/${locale}/#facilities` },
    { label: dict.nav.gallery, href: `/${locale}/gallery` },
    { label: dict.nav.complianceCenter, href: `/${locale}/certifications` },
    { label: dict.nav.contact, href: `/${locale}/#contact` },
  ];
}
