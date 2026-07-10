export const COMPANY = {
  name: "SUNAZ Group LLC",
  legalName: "SUNAZ Group LLC",
  founded: 2020,
  phone: "+994 50 204 90 03",
  phoneHref: "tel:+994502049003",
  email: "info@sunaz.az",
  whatsapp: "994502049003",
  whatsappUrl: "https://wa.me/994502049003",
  headquarters: {
    city: "Baku",
    country: "Azerbaijan",
    address: "28 May Settlement, Baku-Shamakhi Highway, 14th Kilometer, Binagadi District",
  },
  facilities: {
    baku: {
      id: "baku-export-complex",
      coordinates: { lat: 40.45825267213569, lng: 49.656541981308536 },
      mapsUrl: "https://www.google.com/maps?q=40.45825267213569,49.656541981308536",
      mapsQuery: "Baku-Shamakhi Highway 14 km Binagadi Baku Azerbaijan",
    },
    lerik: {
      id: "lerik-slaughter-complex",
      coordinates: { lat: 38.73181801394055, lng: 48.660307966463925 },
      mapsUrl: "https://www.google.com/maps?q=38.73181801394055,48.660307966463925",
      mapsQuery: "Piran Village Lerik Azerbaijan",
    },
  },
  social: {
    linkedin: "https://www.linkedin.com/company/sunaz",
  },
} as const;

export const PRODUCT_SLUGS = [
  "whole-chicken",
  "premium-whole-chicken",
  "fast-cooking-chicken",
  "slow-growing-chicken",
  "chicken-fillet",
  "chicken-breast",
  "drumsticks",
  "thighs",
  "wings",
  "mid-joint-wings",
  "three-joint-wings",
  "chicken-feet",
  "chicken-paws",
  "liver",
  "heart",
  "gizzard",
  "export-products",
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export const FEATURED_PRODUCT_SLUGS: ProductSlug[] = [
  "whole-chicken",
  "premium-whole-chicken",
  "chicken-breast",
  "chicken-fillet",
  "drumsticks",
  "chicken-feet",
  "chicken-paws",
  "export-products",
];

export const EXPORT_PRODUCT_SLUGS: ProductSlug[] = [
  "chicken-feet",
  "chicken-paws",
  "three-joint-wings",
  "mid-joint-wings",
  "export-products",
];
