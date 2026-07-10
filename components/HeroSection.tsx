"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n/config";
import { HERO_VIDEO } from "@/lib/placeholders/assets";
import type { Dictionary } from "@/types/dictionary";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export default function HeroSection({ locale, dict }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.setAttribute("webkit-playsinline", "true");
    void video.play().catch(() => {
      /* autoplay may be blocked; attributes still request immediate play */
    });
  }, []);

  return (
    <section id="home" className="overflow-hidden bg-gradient-to-b from-gray-50/80 to-white pt-14 lg:pt-[4.25rem]">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* 1. Hero Video */}
          <div className="w-full max-w-[560px]">
            <div
              className="relative overflow-hidden rounded-[32px] border border-sunaz-gold/25 shadow-2xl shadow-sunaz-green/15"
              style={{ background: "#0F3F2E" }}
            >
              <div className="relative aspect-video w-full">
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-contain"
                  src={HERO_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  controls={false}
                  disablePictureInPicture
                  disableRemotePlayback
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* 2. Badge */}
          <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-sunaz-gold/30 bg-white px-4 py-2 shadow-sm lg:mt-12">
            <span className="h-1.5 w-1.5 rounded-full bg-sunaz-gold" />
            <span className="text-xs font-semibold uppercase tracking-widest text-sunaz-green">
              {dict.hero.badge}
            </span>
          </div>

          {/* 3. Title */}
          <h1 className="mt-6 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-sunaz-green sm:text-4xl lg:text-5xl xl:text-6xl">
            {dict.hero.headline}
          </h1>

          {/* 4. Description */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-sunaz-muted sm:text-xl">
            {dict.hero.subheadline}
          </p>

          {/* 5. CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
    </section>
  );
}
