"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { HERO_VIDEO, HERO_VIDEO_POSTER } from "@/lib/placeholders/assets";
import type { Dictionary } from "@/types/dictionary";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export default function HeroSection({ locale, dict }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [canPlayVideo, setCanPlayVideo] = useState(true);
  const [preferReducedMotion, setPreferReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPreferReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (preferReducedMotion || !canPlayVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const play = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch {
        setCanPlayVideo(false);
      }
    };

    void play();
  }, [preferReducedMotion, canPlayVideo]);

  const showVideo = canPlayVideo && !preferReducedMotion;

  return (
    <section id="home" className="overflow-hidden bg-gradient-to-b from-gray-50/80 to-white pt-14 lg:pt-[4.25rem]">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-5 lg:items-center lg:gap-14">
          {/* Video first on mobile */}
          <div className="order-1 lg:order-2 lg:col-span-2">
            <div className="relative overflow-hidden rounded-[32px] border border-sunaz-gold/25 bg-white shadow-2xl shadow-sunaz-green/10">
              <div className="relative aspect-video w-full lg:aspect-[4/5]">
                <Image
                  src={HERO_VIDEO_POSTER}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className={`object-cover transition-opacity duration-300 ${
                    showVideo && videoReady ? "opacity-0" : "opacity-100"
                  }`}
                />

                {showVideo && (
                  <video
                    ref={videoRef}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                      videoReady ? "opacity-100" : "opacity-0"
                    }`}
                    src={HERO_VIDEO}
                    poster={HERO_VIDEO_POSTER}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    controls={false}
                    disablePictureInPicture
                    disableRemotePlayback
                    onLoadedData={() => setVideoReady(true)}
                    onCanPlay={() => setVideoReady(true)}
                    onError={() => setCanPlayVideo(false)}
                    aria-hidden="true"
                  />
                )}

                <div className="pointer-events-none absolute inset-0 bg-black/[0.08]" />
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
