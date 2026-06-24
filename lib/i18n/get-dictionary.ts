import "server-only";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/types/dictionary";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  az: () => import("@/dictionaries/az").then((m) => m.dictionary),
  en: () => import("@/dictionaries/en").then((m) => m.dictionary),
  ru: () => import("@/dictionaries/ru").then((m) => m.dictionary),
  tr: () => import("@/dictionaries/tr").then((m) => m.dictionary),
  zh: () => import("@/dictionaries/zh").then((m) => m.dictionary),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
