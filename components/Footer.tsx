import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { COMPANY } from "@/lib/company";
import { getPrimaryNavLinks } from "@/lib/navigation";
import type { Dictionary } from "@/types/dictionary";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Footer({ locale, dict }: FooterProps) {
  const year = new Date().getFullYear();

  const footerLinks = [
    { label: dict.nav.home, href: `/${locale}/#home` },
    ...getPrimaryNavLinks(locale, dict).map((link) =>
      link.href.endsWith("/certifications")
        ? { ...link, label: dict.footer.complianceCenter }
        : link,
    ),
    { label: dict.nav.quality, href: `/${locale}/#quality` },
  ];

  return (
    <footer className="border-t border-white/10 bg-sunaz-green text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <span className="font-display text-3xl font-semibold tracking-tight">SUNAZ</span>
            <p className="mt-1 text-sm font-medium text-sunaz-gold">Group LLC</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              {dict.footer.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-sunaz-gold">
              {dict.footer.quickLinks}
            </h3>
            <nav className="mt-4 flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-sunaz-gold">
              {dict.footer.companyInfo}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {dict.footer.infoItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li>
                <a href={`mailto:${COMPANY.email}`} className="transition-colors hover:text-white">
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/70">
            &copy; {year} SUNAZ Group LLC. {dict.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
