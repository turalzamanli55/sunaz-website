"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { getProductImage } from "@/lib/placeholders/assets";
import { getProductPath } from "@/lib/products/routes";
import type { ProductItem } from "@/types/dictionary";

interface ProductCardProps {
  product: ProductItem;
  locale: Locale;
  moreDetails: string;
  viewAll: string;
}

export default function ProductCard({ product, locale, moreDetails, viewAll }: ProductCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const href = getProductPath(locale, product.slug);
  const image = getProductImage(product.slug);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => {
      setIsMobile(mq.matches);
      if (!mq.matches) setExpanded(false);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isMobile) {
    return (
      <div
        className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 ${
          expanded ? "border-sunaz-gold/40 shadow-lg" : "border-gray-100"
        }`}
      >
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left"
          aria-expanded={expanded}
        >
          <div className="relative aspect-[4/3] w-full bg-gray-50">
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
            {product.exportGrade && (
              <span className="absolute right-3 top-3 rounded-full bg-sunaz-gold/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Export
              </span>
            )}
          </div>
          <div className="flex items-center justify-between gap-3 p-4">
            <h3 className="font-display text-lg font-semibold text-sunaz-green">{product.name}</h3>
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sunaz-green/5 text-sunaz-green transition-transform duration-300 ${
                expanded ? "rotate-180 bg-sunaz-green text-white" : ""
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </div>
        </button>

        <div
          className={`grid transition-all duration-300 ease-out ${
            expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-4 px-4 pb-4">
              <p className="text-sm leading-relaxed text-sunaz-muted">{product.description}</p>
              <Link
                href={href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sunaz-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sunaz-green-light"
              >
                {moreDetails}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sunaz-gold/30 hover:shadow-xl hover:shadow-sunaz-green/5"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
        <Image
          src={image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.exportGrade && (
          <span className="absolute right-4 top-4 rounded-full bg-sunaz-gold/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sunaz-gold backdrop-blur-sm">
            Export
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold text-sunaz-green">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-sunaz-muted">{product.description}</p>
        <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-sunaz-gold opacity-0 transition-opacity group-hover:opacity-100">
          {viewAll} →
        </span>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-sunaz-gold transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
