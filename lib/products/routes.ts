import type { Locale } from "@/lib/i18n/config";
import type { ProductSlug } from "@/lib/company";

export function getProductPath(locale: Locale, slug: ProductSlug): string {
  return `/${locale}/products/${slug}`;
}
