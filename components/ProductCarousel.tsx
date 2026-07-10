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
  if (width < 768) return 1.2;
  if (width < 1024) return 3;
  return 4;
}

export default function ProductCarousel({ products, locale, learnMore }: ProductCarouselProps) {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(4);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const dragStartX = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const maxIndex = Math.max(0, Math.ceil(products.length - perView));

  useEffect(() => {
    const update = () => {
      const next = getPerView(window.innerWidth);
      setPerView(next);
      setIndex((i) => Math.min(i, Math.max(0, Math.ceil(products.length - next))));
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

  function handlePointerDown(e: React.PointerEvent) {
    if (e.pointerType === "touch") return;
    dragStartX.current = e.clientX;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (dragStartX.current === null || e.pointerType === "touch") return;
    setDragOffset(e.clientX - dragStartX.current);
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (dragStartX.current === null || e.pointerType === "touch") return;
    const diff = dragStartX.current - e.clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? index + 1 : index - 1);
    }
    dragStartX.current = null;
    setIsDragging(false);
    setDragOffset(0);
  }

  const pageCount = maxIndex + 1;
  const slidePercent = 100 / perView;
  const trackWidth = trackRef.current?.offsetWidth ?? 1;
  const dragPercent = isDragging ? (dragOffset / trackWidth) * 100 : 0;
  const translate = -(index * slidePercent) + dragPercent;

  return (
    <div className="mt-10 lg:mt-14">
      <div className="relative">
        <div
          ref={trackRef}
          className="cursor-grab overflow-hidden active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            className={`flex ${isDragging ? "" : "transition-transform duration-500 ease-out"}`}
            style={{ transform: `translateX(${translate}%)` }}
          >
            {products.map((product) => (
              <article
                key={product.slug}
                className="flex shrink-0 snap-start flex-col px-2 sm:px-2.5"
                style={{ width: `${slidePercent}%` }}
              >
                <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100/80 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgb(15,61,46,0.12)]">
                  <div className="relative h-[220px] w-full overflow-hidden bg-gray-50 md:h-[260px] lg:h-[300px]">
                    <Image
                      src={getProductImage(product.slug)}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 85vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    {product.exportGrade && (
                      <span className="absolute right-3 top-3 rounded-full bg-sunaz-gold/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                        Export
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5 lg:p-6">
                    <h3 className="font-display text-base font-semibold text-sunaz-green lg:text-lg">
                      {product.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-sunaz-muted lg:text-sm">
                      {product.description}
                    </p>
                    <Link
                      href={getProductPath(locale, product.slug)}
                      className="mt-5 inline-flex items-center justify-center rounded-full border border-sunaz-green/15 bg-sunaz-green/5 px-5 py-2.5 text-xs font-semibold text-sunaz-green transition-all duration-300 hover:border-sunaz-green hover:bg-sunaz-green hover:text-white hover:shadow-md lg:text-sm"
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
              className="absolute -left-2 top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-sunaz-green shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 disabled:pointer-events-none disabled:opacity-30 lg:flex"
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
              className="absolute -right-2 top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-sunaz-green shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 disabled:pointer-events-none disabled:opacity-30 lg:flex"
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
        <div className="mt-6 flex justify-center gap-2 lg:hidden">
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
