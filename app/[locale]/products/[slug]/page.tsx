import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRODUCT_SLUGS } from "@/lib/company";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getProductImage } from "@/lib/placeholders/assets";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { ProductSlug } from "@/lib/company";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    PRODUCT_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  if (!isValidLocale(localeParam)) return {};

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const product = dict.products.items.find((p) => p.slug === slug);

  if (!product) return {};

  return buildPageMetadata(locale, {
    ...dict,
    meta: {
      ...dict.meta,
      title: `${product.name} | SUNAZ Group LLC`,
      description: product.description,
    },
  }, `/products/${slug}`);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const product = dict.products.items.find((p) => p.slug === slug);

  if (!product || !PRODUCT_SLUGS.includes(slug as ProductSlug)) notFound();

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main className="pt-14 lg:pt-[4.25rem]">
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <Link
              href={`/${locale}/#products`}
              className="inline-flex items-center gap-2 text-sm font-medium text-sunaz-muted transition-colors hover:text-sunaz-green"
            >
              ← {dict.nav.products}
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 shadow-sm">
                <Image
                  src={getProductImage(slug)}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div>
                {product.exportGrade && (
                  <span className="mb-4 inline-block rounded-full bg-sunaz-gold/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-sunaz-gold">
                    Export Grade
                  </span>
                )}
                <h1 className="font-display text-4xl font-semibold tracking-tight text-sunaz-green sm:text-5xl">
                  {product.name}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-sunaz-muted">
                  {product.description}
                </p>

                <div className="mt-12 flex flex-wrap gap-4">
                  <Link
                    href={`/${locale}/#contact`}
                    className="inline-flex items-center justify-center rounded-full bg-sunaz-green px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-sunaz-green-light"
                  >
                    {dict.contact.title}
                  </Link>
                  {product.exportGrade && (
                    <Link
                      href={`/${locale}/#export`}
                      className="inline-flex items-center justify-center rounded-full border border-sunaz-gold bg-sunaz-gold/10 px-8 py-3.5 text-sm font-semibold text-sunaz-green transition-all hover:bg-sunaz-gold"
                    >
                      {dict.export.cta}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
