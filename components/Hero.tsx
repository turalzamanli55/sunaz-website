import HeroSection from "@/components/HeroSection";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/types/dictionary";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Hero({ locale, dict }: HeroProps) {
  return <HeroSection locale={locale} dict={dict} />;
}
