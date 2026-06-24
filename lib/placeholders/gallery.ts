import { FACILITY_IMAGES, HERO_IMAGES, getProductImage } from "@/lib/placeholders/assets";
import { PRODUCT_SLUGS } from "@/lib/company";

export const GALLERY_CATEGORIES = [
  "facilities",
  "production",
  "cold-storage",
  "logistics",
  "products",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export interface GalleryAsset {
  id: string;
  category: GalleryCategory;
  image: string;
  aspect?: "tall" | "wide" | "square";
}

export const GALLERY_ASSETS: GalleryAsset[] = [
  { id: "baku-1", category: "facilities", image: FACILITY_IMAGES.baku[0], aspect: "wide" },
  { id: "baku-2", category: "facilities", image: FACILITY_IMAGES.baku[1], aspect: "tall" },
  { id: "baku-3", category: "facilities", image: FACILITY_IMAGES.baku[2], aspect: "square" },
  { id: "lerik-1", category: "facilities", image: FACILITY_IMAGES.lerik[0], aspect: "wide" },
  { id: "lerik-2", category: "facilities", image: FACILITY_IMAGES.lerik[1], aspect: "tall" },
  { id: "lerik-3", category: "facilities", image: FACILITY_IMAGES.lerik[2], aspect: "square" },
  { id: "hero-1", category: "production", image: HERO_IMAGES[0], aspect: "wide" },
  { id: "hero-2", category: "production", image: HERO_IMAGES[1], aspect: "tall" },
  { id: "hero-3", category: "production", image: HERO_IMAGES[2], aspect: "square" },
  { id: "hero-4", category: "cold-storage", image: HERO_IMAGES[3], aspect: "wide" },
  { id: "logistics-baku-1", category: "logistics", image: FACILITY_IMAGES.baku[0], aspect: "tall" },
  { id: "logistics-baku-2", category: "logistics", image: FACILITY_IMAGES.baku[2], aspect: "wide" },
  ...PRODUCT_SLUGS.map((slug, i) => ({
    id: `product-${slug}`,
    category: "products" as GalleryCategory,
    image: getProductImage(slug),
    aspect: (["wide", "tall", "square"][i % 3] as GalleryAsset["aspect"]),
  })),
];
