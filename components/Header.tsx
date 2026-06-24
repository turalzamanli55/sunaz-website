"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/types/dictionary";
import { COMPANY } from "@/lib/company";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Header({ locale, dict }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: dict.nav.home, href: `#home` },
    { label: dict.nav.about, href: `#about` },
    { label: dict.nav.products, href: `#products` },
    { label: dict.nav.export, href: `#export` },
    { label: dict.nav.quality, href: `#quality` },
    { label: dict.nav.facilities, href: `#facilities` },
    { label: dict.nav.certificates, href: `#certificates` },
    { label: dict.nav.complianceCenter, href: `/${locale}/certifications` },
    { label: dict.nav.contact, href: `#contact` },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 lg:h-20 lg:px-8">
        <Link
          href={`/${locale}`}
          className="shrink-0 font-display text-xl font-semibold tracking-tight text-sunaz-green transition-colors hover:text-sunaz-green-light sm:text-2xl lg:text-3xl"
        >
          SUNAZ
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-sunaz-green"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher locale={locale} />

          <a
            href={COMPANY.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#1ebe57] hover:shadow-md md:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="hidden lg:inline">{dict.nav.whatsapp}</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-sunaz-green transition-colors hover:bg-gray-100 xl:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-gray-100 bg-white/95 px-6 py-4 backdrop-blur-xl xl:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-sunaz-green"
              >
                {link.label}
              </a>
            ))}
            <a
              href={COMPANY.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {dict.nav.whatsapp}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
