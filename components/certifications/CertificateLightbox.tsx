"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export interface LightboxItem {
  id: string;
  title: string;
  image: string;
}

interface CertificateLightboxProps {
  items: LightboxItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const ZOOM_LEVELS = [1, 1.5, 2, 2.5] as const;

export default function CertificateLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: CertificateLightboxProps) {
  const [zoomIndex, setZoomIndex] = useState(0);

  const isOpen = activeIndex !== null;
  const current = activeIndex !== null ? items[activeIndex] : null;
  const zoom = ZOOM_LEVELS[zoomIndex];

  const handlePrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate(activeIndex === 0 ? items.length - 1 : activeIndex - 1);
    setZoomIndex(0);
  }, [activeIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate(activeIndex === items.length - 1 ? 0 : activeIndex + 1);
    setZoomIndex(0);
  }, [activeIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
      if (event.key === "+" || event.key === "=") {
        setZoomIndex((i) => Math.min(i + 1, ZOOM_LEVELS.length - 1));
      }
      if (event.key === "-") {
        setZoomIndex((i) => Math.max(i - 1, 0));
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !current) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
        aria-label="Close"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:left-4"
        aria-label="Previous certificate"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:right-4"
        aria-label="Next certificate"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div className="flex max-h-full w-full max-w-4xl flex-col items-center gap-4">
        <div className="overflow-auto rounded-xl bg-white/5 p-2">
          <div
            className="relative transition-transform duration-200"
            style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
          >
            <Image
              src={current.image}
              alt={current.title}
              width={800}
              height={1100}
              className="max-h-[70vh] w-auto rounded-lg object-contain"
              priority
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <p className="w-full text-center font-display text-lg text-white">{current.title}</p>
          <button
            type="button"
            onClick={() => setZoomIndex((i) => Math.max(i - 1, 0))}
            disabled={zoomIndex === 0}
            className="rounded-full bg-white/10 px-4 py-2 text-sm text-white disabled:opacity-40"
          >
            −
          </button>
          <span className="text-sm text-white/70">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            onClick={() => setZoomIndex((i) => Math.min(i + 1, ZOOM_LEVELS.length - 1))}
            disabled={zoomIndex === ZOOM_LEVELS.length - 1}
            className="rounded-full bg-white/10 px-4 py-2 text-sm text-white disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
