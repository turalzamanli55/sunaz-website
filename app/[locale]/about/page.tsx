import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutPageContent from "@/components/about/AboutPageContent";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) return {};

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return buildPageMetadata(
    locale,
    {
      ...dict,
      meta: {
        ...dict.meta,
        title: dict.about.page.meta.title,
        description: dict.about.page.meta.description,
      },
    },
    "/about",
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main className="pt-14 lg:pt-[4.25rem]">
        <section className="bg-sunaz-green py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {dict.about.page.title}
            </h1>
            <div className="mx-auto mt-6 h-0.5 w-16 bg-sunaz-gold" />
          </div>
        </section>
        <AboutPageContent dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
