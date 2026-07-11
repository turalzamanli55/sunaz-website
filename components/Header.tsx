"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/types/dictionary";
import { COMPANY } from "@/lib/company";
import { getPrimaryNavLinks } from "@/lib/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

function isLinkActive(pathname: string, href: string): boolean {
  if (href.includes("#")) return false;
  const path = href.split("#")[0];
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function Header({ locale, dict }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navLinks = getPrimaryNavLinks(locale, dict);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClass = (href: string, mobile = false) => {
    const active = isLinkActive(pathname, href);
    if (mobile) {
      return `rounded-xl px-4 py-3.5 text-[17px] font-normal tracking-wide transition-colors ${
        active
          ? "bg-sunaz-green/5 font-medium text-sunaz-green"
          : "text-gray-800 hover:bg-black/[0.03] hover:text-sunaz-green"
      }`;
    }
    return `group relative text-[13px] tracking-wide transition-colors duration-200 ${
      active
        ? "font-medium text-sunaz-green"
        : "font-normal text-gray-600 hover:text-sunaz-green"
    }`;
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.06] bg-white/72 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/65">
        <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-5 lg:h-[4.25rem] lg:px-8">
          <Link
            href={`/${locale}`}
            className="relative z-10 shrink-0 transition-opacity hover:opacity-80"
            aria-label="SUNAZ"
          >
            <Image
              src="/logo.PNG"
              alt="SUNAZ"
              width={1536}
              height={1024}
              priority
              className="h-[36px] w-auto object-contain lg:h-[45px]"
            />
          </Link>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 xl:gap-8 lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-sunaz-green transition-all duration-300 ease-out ${
                    isLinkActive(pathname, link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-2 sm:gap-2.5">
            <LanguageSwitcher locale={locale} />

            <a
              href={COMPANY.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center justify-center rounded-full bg-[#25D366] p-2.5 text-white shadow-sm transition-all duration-200 hover:scale-105 hover:bg-[#1ebe57] hover:shadow-md md:inline-flex"
              aria-label={dict.nav.whatsapp}
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-sunaz-green transition-colors hover:bg-black/[0.04] lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] lg:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
        />

        <nav
          className={`absolute right-0 top-0 flex h-full w-[min(100vw-3rem,20rem)] flex-col bg-white/95 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobile navigation"
        >
          <div className="flex h-14 items-center justify-between border-b border-black/[0.06] px-5">
            <Image
              src="/logo.PNG"
              alt="SUNAZ"
              width={1536}
              height={1024}
              className="h-[36px] w-auto object-contain"
            />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-black/[0.04]"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden px-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={linkClass(link.href, true)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-black/[0.06] p-5">
            <a
              href={COMPANY.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3.5 text-[15px] font-medium text-white shadow-sm transition-all hover:bg-[#1ebe57]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {dict.nav.whatsapp}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
