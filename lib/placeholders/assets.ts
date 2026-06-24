export const HERO_IMAGES = [
  "/placeholders/hero/hero-1.jpg",
  "/placeholders/hero/hero-2.jpg",
  "/placeholders/hero/hero-3.jpg",
  "/placeholders/hero/hero-4.jpg",
] as const;

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

export function getProductImage(slug: string): string {
  return `/placeholders/products/${slug}.jpg`;
}
