import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { PARTNER_ASSETS, type PartnerId } from "@/lib/partners/catalog";
import type { Dictionary } from "@/types/dictionary";

interface TrustedPartnersProps {
  dict: Dictionary;
}

export default function TrustedPartners({ dict }: TrustedPartnersProps) {
  const { partners } = dict;

  return (
    <section id="partners" className="bg-gray-50/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow={partners.eyebrow}
          title={partners.title}
          subtitle={partners.subtitle}
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {partners.items.map((partner) => {
            const assets = PARTNER_ASSETS[partner.id as PartnerId];
            if (!assets) return null;

            return (
              <article
                key={partner.id}
                className="group flex flex-col items-center rounded-3xl border border-white/60 bg-white/70 p-10 text-center shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sunaz-gold/30 hover:shadow-xl"
              >
                <div className="relative flex h-28 w-full max-w-[220px] items-center justify-center">
                  <Image
                    src={assets.logo}
                    alt={partner.name}
                    width={220}
                    height={112}
                    className="max-h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold text-sunaz-green">
                  {partner.name}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-sunaz-muted">
                  {partner.description}
                </p>
                <a
                  href={assets.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-sunaz-green/20 bg-sunaz-green/5 px-8 py-3 text-sm font-semibold text-sunaz-green transition-all hover:border-sunaz-green hover:bg-sunaz-green hover:text-white"
                >
                  {partners.visitWebsite}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
