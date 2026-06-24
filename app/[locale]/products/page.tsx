import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getProductImage } from "@/lib/placeholders/assets";
import { getProductPath } from "@/lib/products/routes";
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
        title: `${dict.products.title} | SUNAZ Group LLC`,
        description: dict.products.subtitle,
      },
    },
    "/products",
  );
}

export default async function ProductsPage({
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
      <main className="bg-white pt-14 lg:pt-[4.25rem]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <SectionHeader
            eyebrow={dict.products.eyebrow}
            title={dict.products.title}
            subtitle={dict.products.subtitle}
          />

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5">
            {dict.products.items.map((product) => (
              <Link
                key={product.slug}
                href={getProductPath(locale, product.slug)}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sunaz-gold/30 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                  <Image
                    src={getProductImage(product.slug)}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.exportGrade && (
                    <span className="absolute right-3 top-3 rounded-full bg-sunaz-gold/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Export
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4 lg:p-5">
                  <h2 className="font-display text-base font-semibold text-sunaz-green lg:text-lg">
                    {product.name}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-sunaz-muted lg:text-sm">
                    {product.description}
                  </p>
                  <span className="mt-3 text-xs font-semibold text-sunaz-gold lg:text-sm">
                    {dict.products.moreDetails} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
