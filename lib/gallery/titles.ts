import type { Dictionary } from "@/types/dictionary";

export function getGalleryTitle(id: string, dict: Dictionary): string {
  const found = dict.gallery.items.find((item) => item.id === id);
  if (found) return found.title;

  if (id.startsWith("product-")) {
    const slug = id.replace("product-", "");
    const product = dict.products.items.find((p) => p.slug === slug);
    if (product) return product.name;
  }

  return id;
}
