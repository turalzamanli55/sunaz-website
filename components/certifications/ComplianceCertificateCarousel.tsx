"use client";

import { useCallback, useRef, useState } from "react";
import CertificateCard from "@/components/certifications/CertificateCard";
import type { Dictionary } from "@/types/dictionary";

interface ComplianceCertificateCarouselProps {
  dict: Dictionary;
  onView: (id: string) => void;
}

export default function ComplianceCertificateCarousel({
  dict,
  onView,
}: ComplianceCertificateCarouselProps) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const items = dict.compliance.page.items;
  const maxIndex = items.length - 1;

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

  return (
    <div className="relative">
      <div className="overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item) => (
            <div key={item.id} className="w-full shrink-0 px-1">
              <CertificateCard
                item={item}
                cards={dict.compliance.page.cards}
                onView={onView}
              />
            </div>
          ))}
        </div>
      </div>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="absolute -left-1 top-[32%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-sunaz-green shadow-lg backdrop-blur-sm transition-all hover:scale-105 disabled:pointer-events-none disabled:opacity-30"
            aria-label="Previous certificate"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index >= maxIndex}
            className="absolute -right-1 top-[32%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-sunaz-green shadow-lg backdrop-blur-sm transition-all hover:scale-105 disabled:pointer-events-none disabled:opacity-30"
            aria-label="Next certificate"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === index ? "h-2 w-8 bg-sunaz-gold" : "h-2 w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Certificate ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
