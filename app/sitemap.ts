import type { MetadataRoute } from "next";
import { PRODUCT_SLUGS } from "@/lib/company";
import { locales } from "@/lib/i18n/config";
import { getSiteUrl } from "@/lib/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${base}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l === "zh" ? "zh-Hans" : l, `${base}/${l}`]),
        ),
      },
    });

    entries.push({
      url: `${base}/${locale}/certifications`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [
            l === "zh" ? "zh-Hans" : l,
            `${base}/${l}/certifications`,
          ]),
        ),
      },
    });

    for (const slug of PRODUCT_SLUGS) {
      entries.push({
        url: `${base}/${locale}/products/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l === "zh" ? "zh-Hans" : l,
              `${base}/${l}/products/${slug}`,
            ]),
          ),
        },
      });
    }
  }

  return entries;
}
