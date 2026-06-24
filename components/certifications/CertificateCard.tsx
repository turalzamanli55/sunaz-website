"use client";

import Image from "next/image";
import type { CertificateId } from "@/lib/certifications/catalog";
import { getCertificateAsset } from "@/lib/certifications/catalog";
import type { Dictionary } from "@/types/dictionary";

interface CertificateCardProps {
  item: Dictionary["compliance"]["page"]["items"][number];
  cards: Dictionary["compliance"]["page"]["cards"];
  onView: (id: string) => void;
  compact?: boolean;
}

export default function CertificateCard({
  item,
  cards,
  onView,
  compact = false,
}: CertificateCardProps) {
  const assets = getCertificateAsset(item.id as CertificateId);

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sunaz-gold/30 hover:shadow-xl ${
        compact ? "" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => onView(item.id)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-sunaz-green/5 to-sunaz-gold/5"
        aria-label={`${cards.view}: ${item.title}`}
      >
        <Image
          src={assets.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-sunaz-green/0 transition-colors group-hover:bg-sunaz-green/10" />
        <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-sunaz-green opacity-0 shadow transition-opacity group-hover:opacity-100">
          {cards.view}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold text-sunaz-green">
          {item.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-sunaz-muted">
          {item.description}
        </p>
        <p className="mt-4 text-xs text-sunaz-muted">
          <span className="font-semibold uppercase tracking-wider text-sunaz-gold">
            {cards.issueDate}
          </span>
          <span className="ml-2">{cards.issueDateValue}</span>
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onView(item.id)}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-sunaz-green/20 px-4 py-2.5 text-xs font-semibold text-sunaz-green transition-all hover:border-sunaz-green hover:bg-sunaz-green/5"
          >
            {cards.view}
          </button>
          <a
            href={assets.pdf}
            download
            className="inline-flex flex-1 items-center justify-center rounded-full bg-sunaz-green px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-sunaz-green-light"
          >
            {cards.download}
          </a>
        </div>
      </div>
    </article>
  );
}
