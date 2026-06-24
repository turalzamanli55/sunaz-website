export const PARTNER_IDS = ["atlasfood", "sulavco"] as const;

export type PartnerId = (typeof PARTNER_IDS)[number];

export const PARTNER_ASSETS: Record<PartnerId, { logo: string; website: string }> = {
  atlasfood: {
    logo: "/partners/atlasfood-logo.png",
    website: "https://atlasfood.dk",
  },
  sulavco: {
    logo: "/partners/sulavco-logo.png",
    website: "https://www.sulavco.com",
  },
};
