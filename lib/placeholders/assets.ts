export const HERO_IMAGES = [
  "/placeholders/hero/hero-1.jpg",
  "/placeholders/hero/hero-2.jpg",
  "/placeholders/hero/hero-3.jpg",
  "/placeholders/hero/hero-4.jpg",
] as const;

/**
 * Hero media — replace files in public/placeholders/hero/ only.
 * Keep these path constants; no component changes needed when swapping assets.
 */
export const HERO_VIDEO = "/placeholders/hero/hero-video.mp4";
export const HERO_VIDEO_POSTER = "/placeholders/hero/hero-poster.jpg";

export const FACILITY_IMAGES = {
  baku: [
    "/placeholders/facilities/baku-1.jpg",
    "/placeholders/facilities/baku-2.jpg",
    "/placeholders/facilities/baku-3.jpg",
  ],
  lerik: [
    "/placeholders/facilities/lerik-1.jpg",
    "/placeholders/facilities/lerik-2.jpg",
    "/placeholders/facilities/lerik-3.jpg",
  ],
} as const;

/**
 * Maps product slugs → real photography in public/placeholders/products/.
 * Replace files in that folder only; keep filenames stable so no code changes are needed.
 * Unmapped slugs fall back to a generic product image.
 */
const PRODUCT_IMAGE_FILES: Record<string, string> = {
  "whole-chicken": "soyudulmus-toyuq.PNG",
  "premium-whole-chicken": "dondurulmus-toyuq.PNG",
  "fast-cooking-chicken": "toyuq-sorbaliq.PNG",
  "slow-growing-chicken": "gecbisen-soyudulmus.PNG",
  "chicken-fillet": "toyuq-filesi.PNG",
  "chicken-breast": "toyuq-filesi.PNG",
  drumsticks: "toyuq-buddibi.PNG",
  thighs: "toyuq-budu.PNG",
  wings: "toyuq-qanadlari.PNG",
  "mid-joint-wings": "toyuq-qanaduclari.PNG",
  "three-joint-wings": "toyuq-qanadlari.PNG",
  "chicken-feet": "Toyuq-ayaqlari.PNG",
  "chicken-paws": "toyuq-petenekleri.PNG",
  liver: "toyuq-ciyeri.PNG",
  heart: "toyuq-urekleri.PNG",
  gizzard: "soyudulmus-toyuq.PNG",
  "export-products": "dondurulmus-toyuq.PNG",
};

const PRODUCT_IMAGE_FALLBACK = "soyudulmus-toyuq.PNG";

export function getProductImage(slug: string): string {
  const file = PRODUCT_IMAGE_FILES[slug] ?? PRODUCT_IMAGE_FALLBACK;
  return `/placeholders/products/${file}`;
}
