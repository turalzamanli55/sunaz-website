import Link from "next/link";
import ProductCarousel from "@/components/ProductCarousel";
import SectionHeader from "@/components/ui/SectionHeader";
import { FEATURED_PRODUCT_SLUGS } from "@/lib/company";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/types/dictionary";

interface ProductsProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Products({ locale, dict }: ProductsProps) {
  const featured = FEATURED_PRODUCT_SLUGS.map((slug) =>
    dict.products.items.find((p) => p.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section id="products" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow={dict.products.eyebrow}
          title={dict.products.title}
          subtitle={dict.products.subtitle}
        />

        <ProductCarousel
          products={featured}
          locale={locale}
          learnMore={dict.products.moreDetails}
        />

        <div className="mt-10 text-center lg:mt-12">
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center justify-center rounded-full bg-sunaz-green px-10 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sunaz-green/20 transition-all hover:bg-sunaz-green-light hover:shadow-xl"
          >
            {dict.products.viewAllProducts} →
          </Link>
        </div>
      </div>
    </section>
  );
}
