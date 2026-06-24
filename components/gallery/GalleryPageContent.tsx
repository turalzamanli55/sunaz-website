"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import CertificateLightbox from "@/components/certifications/CertificateLightbox";
import { GALLERY_ASSETS, GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/placeholders/gallery";
import { getGalleryTitle } from "@/lib/gallery/titles";
import type { Dictionary } from "@/types/dictionary";

interface GalleryPageContentProps {
  dict: Dictionary;
}

export default function GalleryPageContent({ dict }: GalleryPageContentProps) {
  const [category, setCategory] = useState<GalleryCategory | "all">("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      category === "all"
        ? GALLERY_ASSETS
        : GALLERY_ASSETS.filter((item) => item.category === category),
    [category],
  );

  const lightboxItems = useMemo(
    () =>
      filtered.map((item) => ({
        id: item.id,
        title: getGalleryTitle(item.id, dict),
        image: item.image,
      })),
    [filtered, dict],
  );

  const categories = GALLERY_CATEGORIES;

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
            category === "all"
              ? "bg-sunaz-green text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {dict.gallery.page.all}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              category === cat
                ? "bg-sunaz-green text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {dict.gallery.page.categories[cat]}
          </button>
        ))}
      </div>

      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filtered.map((item, index) => {
          const title = getGalleryTitle(item.id, dict);
          const aspectClass =
            item.aspect === "tall"
              ? "aspect-[3/4]"
              : item.aspect === "wide"
                ? "aspect-[4/3]"
                : "aspect-square";

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`group relative mb-4 w-full break-inside-avoid overflow-hidden rounded-2xl bg-gray-100 ${aspectClass}`}
            >
              <Image
                src={item.image}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sunaz-green/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-0 left-0 right-0 p-4 text-left text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {title}
              </span>
            </button>
          );
        })}
      </div>

      <CertificateLightbox
        items={lightboxItems}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}
