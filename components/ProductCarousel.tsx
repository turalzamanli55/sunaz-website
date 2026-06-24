"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { getProductImage } from "@/lib/placeholders/assets";
import { getProductPath } from "@/lib/products/routes";
import type { ProductItem } from "@/types/dictionary";

interface ProductCarouselProps {
  products: ProductItem[];
  locale: Locale;
  learnMore: string;
}

function getPerView(width: number): number {
  if (width < 768) return 1;
  if (width < 1024) return 2;
  if (width < 1280) return 3;
  return 4;
}

export default function ProductCarousel({ products, locale, learnMore }: ProductCarouselProps) {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(4);
  const touchStartX = useRef<number | null>(null);
  const maxIndex = Math.max(0, products.length - perView);

  useEffect(() => {
    const update = () => {
      const next = getPerView(window.innerWidth);
      setPerView(next);
      setIndex((i) => Math.min(i, Math.max(0, products.length - next)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [products.length]);

  const goTo = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(next, maxIndex)));
    },
    [maxIndex],
  );

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(diff > 0 ? index + 1 : index - 1);
    }
    touchStartX.current = null;
  }

  const pageCount = maxIndex + 1;

  return (
    <div className="mt-10 lg:mt-16">
      <div className="relative">
        <div className="overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
          >
            {products.map((product) => (
              <article
                key={product.slug}
                className="flex shrink-0 flex-col px-2 sm:px-2.5"
                style={{ width: `${100 / perView}%` }}
              >
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                    <Image
                      src={getProductImage(product.slug)}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                    {product.exportGrade && (
                      <span className="absolute right-3 top-3 rounded-full bg-sunaz-gold/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        Export
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4 lg:p-5">
                    <h3 className="font-display text-base font-semibold text-sunaz-green lg:text-lg">
                      {product.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-sunaz-muted lg:text-sm">
                      {product.description}
                    </p>
                    <Link
                      href={getProductPath(locale, product.slug)}
                      className="mt-4 inline-flex items-center justify-center rounded-full border border-sunaz-green/20 bg-sunaz-green/5 px-5 py-2.5 text-xs font-semibold text-sunaz-green transition-all hover:border-sunaz-green hover:bg-sunaz-green hover:text-white lg:text-sm"
                    >
                      {learnMore}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {pageCount > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              className="absolute -left-1 top-[38%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-sunaz-green shadow-lg backdrop-blur-sm transition-all hover:scale-105 disabled:pointer-events-none disabled:opacity-30 sm:-left-4 lg:h-11 lg:w-11"
              aria-label="Previous products"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index >= maxIndex}
              className="absolute -right-1 top-[38%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-sunaz-green shadow-lg backdrop-blur-sm transition-all hover:scale-105 disabled:pointer-events-none disabled:opacity-30 sm:-right-4 lg:h-11 lg:w-11"
              aria-label="Next products"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}
      </div>

      {pageCount > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === index ? "h-2 w-8 bg-sunaz-gold" : "h-2 w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Product slide ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
