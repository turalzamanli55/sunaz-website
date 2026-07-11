import Image from "next/image";
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
      <div className="flex items-center gap-3">
        <Image
          src="/logo.PNG"
          alt="SUNAZ"
          width={1536}
          height={1024}
          className="h-7 w-auto object-contain"
        />
        <p className="text-center text-sm text-white/70">
          &copy; {year} SUNAZ Group LLC. {dict.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
