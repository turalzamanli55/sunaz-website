"use client";

import { useMemo, useState } from "react";
import CertificateCard from "@/components/certifications/CertificateCard";
import ComplianceCertificateCarousel from "@/components/certifications/ComplianceCertificateCarousel";
import CertificateLightbox from "@/components/certifications/CertificateLightbox";
import type { CertificateId } from "@/lib/certifications/catalog";
import { getCertificateAsset } from "@/lib/certifications/catalog";
import type { Dictionary } from "@/types/dictionary";

interface ComplianceCertificateGridProps {
  dict: Dictionary;
  mobileCarousel?: boolean;
}

export default function ComplianceCertificateGrid({
  dict,
  mobileCarousel = false,
}: ComplianceCertificateGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const items = dict.compliance.page.items;

  const lightboxItems = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        title: item.title,
        image: getCertificateAsset(item.id as CertificateId).image,
      })),
    [items],
  );

  function openLightbox(id: string) {
    const index = items.findIndex((item) => item.id === id);
    if (index >= 0) setActiveIndex(index);
  }

  return (
    <>
      {mobileCarousel ? (
        <div className="md:hidden">
          <ComplianceCertificateCarousel dict={dict} onView={openLightbox} />
        </div>
      ) : null}

      <div
        className={
          mobileCarousel
            ? "hidden gap-6 md:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        }
      >
        {items.map((item) => (
          <CertificateCard
            key={item.id}
            item={item}
            cards={dict.compliance.page.cards}
            onView={openLightbox}
          />
        ))}
      </div>

      <CertificateLightbox
        items={lightboxItems}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}
