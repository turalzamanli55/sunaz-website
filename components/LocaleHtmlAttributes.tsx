"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n/config";

const htmlLangMap: Record<Locale, string> = {
  az: "az",
  en: "en",
  ru: "ru",
  tr: "tr",
  zh: "zh-Hans",
};

export default function LocaleHtmlAttributes({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = htmlLangMap[locale];
  }, [locale]);

  return null;
}
