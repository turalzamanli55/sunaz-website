import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryPageContent from "@/components/gallery/GalleryPageContent";
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
        title: dict.gallery.page.meta.title,
        description: dict.gallery.page.meta.description,
      },
    },
    "/gallery",
  );
}

export default async function GalleryPage({
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
              {dict.gallery.page.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
              {dict.gallery.page.subtitle}
            </p>
          </div>
        </section>
        <section className="bg-gray-50/60 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <GalleryPageContent dict={dict} />
          </div>
        </section>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
