import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Locale } from "@/lib/i18n/config";
import { getProductPath } from "@/lib/products/routes";
import type { Dictionary } from "@/types/dictionary";

interface ProductsProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Products({ locale, dict }: ProductsProps) {
  return (
    <section id="products" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow={dict.products.eyebrow}
          title={dict.products.title}
          subtitle={dict.products.subtitle}
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dict.products.items.map((product) => (
            <Link
              key={product.slug}
              href={getProductPath(locale, product.slug)}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sunaz-gold/30 hover:shadow-xl hover:shadow-sunaz-green/5"
            >
              {product.exportGrade && (
                <span className="absolute right-4 top-4 rounded-full bg-sunaz-gold/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sunaz-gold">
                  Export
                </span>
              )}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sunaz-green/5 text-sunaz-green transition-colors group-hover:bg-sunaz-green group-hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-semibold text-sunaz-green">
                {product.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-sunaz-muted">
                {product.description}
              </p>
              <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-sunaz-gold opacity-0 transition-opacity group-hover:opacity-100">
                {dict.products.viewAll} →
              </span>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-sunaz-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
