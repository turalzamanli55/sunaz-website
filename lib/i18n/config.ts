export const locales = ["az", "en", "ru", "tr", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "az";

export const localeNames: Record<Locale, string> = {
  az: "Azərbaycan",
  en: "English",
  ru: "Русский",
  tr: "Türkçe",
  zh: "中文",
};

export const hreflangMap: Record<Locale, string> = {
  az: "az",
  en: "en",
  ru: "ru",
  tr: "tr",
  zh: "zh-Hans",
};

export const ogLocaleMap: Record<Locale, string> = {
  az: "az_AZ",
  en: "en_US",
  ru: "ru_RU",
  tr: "tr_TR",
  zh: "zh_CN",
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
