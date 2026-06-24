import { FACILITY_IMAGES } from "@/lib/placeholders/assets";

export const FACILITY_IDS = ["baku", "lerik"] as const;

export type FacilityId = (typeof FACILITY_IDS)[number];

export interface FacilityLocationData {
  id: FacilityId;
  legacyId: string;
  coordinates: { lat: number; lng: number };
  mapsUrl: string;
  image: string;
  network: {
    hectares: number;
    secondary: {
      value: number;
      displayValue: string;
      suffix?: string;
      animate: boolean;
    };
  };
}

export const FACILITY_LOCATIONS: Record<FacilityId, FacilityLocationData> = {
  baku: {
    id: "baku",
    legacyId: "baku-export-complex",
    coordinates: { lat: 40.45825267213569, lng: 49.656541981308536 },
    mapsUrl: "https://www.google.com/maps?q=40.45825267213569,49.656541981308536",
    image: FACILITY_IMAGES.baku[0],
    network: {
      hectares: 7,
      secondary: { value: 5000, displayValue: "5,000+", suffix: " m²", animate: true },
    },
  },
  lerik: {
    id: "lerik",
    legacyId: "lerik-slaughter-complex",
    coordinates: { lat: 38.73181801394055, lng: 48.660307966463925 },
    mapsUrl: "https://www.google.com/maps?q=38.73181801394055,48.660307966463925",
    image: FACILITY_IMAGES.lerik[0],
    network: {
      hectares: 15,
      secondary: { value: 7000, displayValue: "7,000", animate: true },
    },
  },
};

export function getMapsEmbedUrl(facilityId: FacilityId, zoom = 16): string {
  const { lat, lng } = FACILITY_LOCATIONS[facilityId].coordinates;
  return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
}
