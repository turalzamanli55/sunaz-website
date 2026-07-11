import type { ProductSlug } from "@/lib/company";

export interface StatItem {
  id: string;
  value: number | null;
  displayValue: string;
  suffix?: string;
  label: string;
  animate: boolean;
}

export interface ProductItem {
  slug: ProductSlug;
  name: string;
  description: string;
  exportGrade?: boolean;
}

export interface FacilityItem {
  id: string;
  name: string;
  location: string[];
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  nav: {
    home: string;
    about: string;
    products: string;
    export: string;
    quality: string;
    facilities: string;
    gallery: string;
    certificates: string;
    complianceCenter: string;
    contact: string;
    whatsapp: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaProducts: string;
    ctaAbout: string;
    ctaContact: string;
    ctaExport: string;
  };
  stats: {
    eyebrow: string;
    title: string;
    items: StatItem[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    facilitiesTitle: string;
    facilities: Array<{ name: string; details: string[] }>;
    productsTitle: string;
    productList: string[];
    page: {
      meta: { title: string; description: string };
      title: string;
      introduction: string[];
      mission: { title: string; content: string };
      vision: { title: string; content: string };
      why: {
        title: string;
        items: Array<{ title: string; description: string }>;
      };
    };
  };
  products: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewAll: string;
    viewAllProducts: string;
    moreDetails: string;
    items: ProductItem[];
  };
  export: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    productsTitle: string;
    products: string[];
    indicators: Array<{ title: string; description: string }>;
    cta: string;
  };
  quality: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{ title: string; description: string }>;
  };
  facilities: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewGallery: string;
    openInMaps: string;
    items: FacilityItem[];
  };
  visualTrust: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  partners: {
    eyebrow: string;
    title: string;
    subtitle: string;
    visitWebsite: string;
    viewGallery: string;
    items: Array<{ id: string; name: string; description: string }>;
  };
  facilityGallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewGallery: string;
    baku: { title: string; stats: string[] };
    lerik: { title: string; stats: string[] };
  };
  gallery: {
    page: {
      meta: { title: string; description: string };
      title: string;
      subtitle: string;
      all: string;
      categories: {
        facilities: string;
        production: string;
        "cold-storage": string;
        logistics: string;
        products: string;
      };
    };
    items: Array<{ id: string; title: string }>;
  };
  certificates: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{ title: string; description: string; badge: string }>;
  };
  compliance: {
    home: {
      eyebrow: string;
      title: string;
      subtitle: string;
      viewAll: string;
    };
    page: {
      meta: {
        title: string;
        description: string;
      };
      hero: {
        title: string;
        subtitle: string;
      };
      trustTitle: string;
      trustBadges: string[];
      importer: {
        title: string;
        content: string;
        indicators: Array<{ title: string; description: string }>;
      };
      cards: {
        view: string;
        download: string;
        issueDate: string;
        issueDateValue: string;
      };
      items: Array<{
        id: string;
        title: string;
        description: string;
      }>;
    };
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    phone: string;
    email: string;
    address: string;
    headquarters: string;
    whatsappCta: string;
    exportInquiryCta: string;
    mapTitle: string;
    facilityLocations: {
      title: string;
      networkTitle: string;
      openInMaps: string;
      addressLabel: string;
      network: {
        baku: { shortName: string; hectaresLabel: string; secondaryLabel: string };
        lerik: { shortName: string; hectaresLabel: string; secondaryLabel: string };
      };
      items: Array<{
        id: string;
        name: string;
        description: string;
        address: string[];
        specs: string[];
      }>;
    };
    form: {
      name: string;
      company: string;
      country: string;
      email: string;
      phone: string;
      message: string;
      submit: string;
      submitting: string;
      success: string;
      error: string;
      exportSubject: string;
    };
  };
  footer: {
    description: string;
    quickLinks: string;
    companyInfo: string;
    complianceCenter: string;
    infoItems: string[];
    tagline: string;
    copyright: string;
  };
}
