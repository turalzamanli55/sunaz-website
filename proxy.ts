import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isValidLocale, locales, type Locale } from "@/lib/i18n/config";

const LOCALE_COOKIE = "SUNAZ_LOCALE";

const localePriority: Record<string, Locale> = {
  az: "az",
  en: "en",
  ru: "ru",
  tr: "tr",
  zh: "zh",
  "zh-cn": "zh",
  "zh-hans": "zh",
};

function resolveLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const preferences = acceptLanguage
    .split(",")
    .map((part) => {
      const [lang, qPart] = part.trim().split(";q=");
      return { lang: lang.toLowerCase(), q: qPart ? parseFloat(qPart) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of preferences) {
    if (localePriority[lang]) return localePriority[lang];
    const base = lang.split("-")[0];
    if (localePriority[base]) return localePriority[base];
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) {
    const segment = pathname.split("/")[1];
    if (isValidLocale(segment)) {
      const response = NextResponse.next();
      response.cookies.set(LOCALE_COOKIE, segment, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
      return response;
    }
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    cookieLocale && isValidLocale(cookieLocale)
      ? cookieLocale
      : resolveLocaleFromHeader(request.headers.get("accept-language"));

  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
