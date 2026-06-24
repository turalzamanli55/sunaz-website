export const CERTIFICATE_IDS = [
  "halal",
  "aqta",
  "veterinary",
  "export",
  "quality",
] as const;

export type CertificateId = (typeof CERTIFICATE_IDS)[number];

/**
 * Static asset paths — replace files in public/certifications/ only;
 * no code changes required when updating real certificates.
 */
export const CERTIFICATE_ASSETS: Record<
  CertificateId,
  { image: string; pdf: string }
> = {
  halal: {
    image: "/certifications/images/halal-certificate.jpg",
    pdf: "/certifications/halal-certificate.pdf",
  },
  aqta: {
    image: "/certifications/images/aqta-compliance.jpg",
    pdf: "/certifications/aqta-compliance.pdf",
  },
  veterinary: {
    image: "/certifications/images/veterinary-certificate.jpg",
    pdf: "/certifications/veterinary-certificate.pdf",
  },
  export: {
    image: "/certifications/images/export-compliance.jpg",
    pdf: "/certifications/export-compliance.pdf",
  },
  quality: {
    image: "/certifications/images/quality-assurance.jpg",
    pdf: "/certifications/quality-assurance.pdf",
  },
};

export function getCertificateAsset(id: CertificateId) {
  return CERTIFICATE_ASSETS[id];
}
