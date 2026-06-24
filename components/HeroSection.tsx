"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { HERO_IMAGES } from "@/lib/placeholders/assets";
import type { Dictionary } from "@/types/dictionary";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export default function HeroSection({ locale, dict }: HeroSectionProps) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = HERO_IMAGES.length;

  const goTo = useCallback((next: number) => {
    setIndex(((next % total) + total) % total);
  }, [total]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 5500);
    return () => clearInterval(timer);
  }, [total]);

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

  return (
    <section id="home" className="overflow-hidden bg-gradient-to-b from-gray-50/80 to-white pt-14 lg:pt-[4.25rem]">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-5 lg:items-center lg:gap-14">
          {/* Carousel first on mobile */}
          <div className="order-1 lg:order-2 lg:col-span-2">
            <div
              className="relative overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-2xl shadow-sunaz-green/10"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative aspect-[4/5] w-full sm:aspect-[3/4] lg:aspect-[4/5]">
                {HERO_IMAGES.map((src, i) => (
                  <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      i === index ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      priority={i === 0}
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/50 to-transparent px-4 pb-4 pt-12">
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/90 text-sunaz-green shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-white"
                  aria-label="Previous slide"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </button>

                <div className="flex flex-1 justify-center gap-2">
                  {HERO_IMAGES.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => goTo(i)}
                      className={`rounded-full transition-all duration-300 ${
                        i === index ? "h-2 w-8 bg-sunaz-gold" : "h-2 w-2 bg-white/60 hover:bg-white/80"
                      }`}
                      aria-label={`Slide ${i + 1}`}
                      aria-current={i === index ? "true" : undefined}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/90 text-sunaz-green shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-white"
                  aria-label="Next slide"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-2 lg:order-1 lg:col-span-3">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sunaz-gold/30 bg-white px-4 py-2 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-sunaz-gold" />
              <span className="text-xs font-semibold uppercase tracking-widest text-sunaz-green">
                {dict.hero.badge}
              </span>
            </div>

            <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-sunaz-green sm:text-5xl lg:text-6xl xl:text-7xl">
              {dict.hero.headline}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-sunaz-muted sm:text-xl">
              {dict.hero.subheadline}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`/${locale}/#products`}
                className="inline-flex items-center justify-center rounded-full bg-sunaz-green px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sunaz-green/20 transition-all hover:bg-sunaz-green-light hover:shadow-xl"
              >
                {dict.hero.ctaProducts}
              </a>
              <a
                href={`/${locale}/#about`}
                className="inline-flex items-center justify-center rounded-full border border-sunaz-green/15 bg-white px-7 py-3.5 text-sm font-semibold text-sunaz-green transition-all hover:border-sunaz-green/30 hover:bg-sunaz-green/5"
              >
                {dict.hero.ctaAbout}
              </a>
              <a
                href={`/${locale}/#export`}
                className="inline-flex items-center justify-center rounded-full bg-sunaz-gold px-7 py-3.5 text-sm font-semibold text-sunaz-green shadow-md transition-all hover:bg-sunaz-gold-light"
              >
                {dict.hero.ctaExport}
              </a>
              <Link
                href={`/${locale}/#contact`}
                className="inline-flex items-center justify-center rounded-full border border-gray-200 px-7 py-3.5 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
              >
                {dict.hero.ctaContact}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
