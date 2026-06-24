import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/types/dictionary";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Footer({ dict }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="flex min-h-[60px] max-h-20 items-center justify-center border-t border-white/10 bg-sunaz-green px-6 text-white">
      <p className="text-center text-sm text-white/70">
        &copy; {year} SUNAZ Group LLC. {dict.footer.copyright}
      </p>
    </footer>
  );
}
