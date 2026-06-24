import {
  FACILITY_IDS,
  FACILITY_LOCATIONS,
  getMapsEmbedUrl,
  type FacilityId,
} from "@/lib/facilities/catalog";
import type { Dictionary } from "@/types/dictionary";

interface FacilitiesProps {
  dict: Dictionary;
}

export default function Facilities({ dict }: FacilitiesProps) {
  return (
    <section id="facilities" className="border-t border-gray-100 bg-gray-50/40 py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center font-display text-lg font-semibold tracking-tight text-sunaz-green lg:text-xl">
          {dict.facilities.title}
        </h2>

        <div className="mt-5 grid gap-4 lg:mt-6 lg:grid-cols-2 lg:gap-5">
          {FACILITY_IDS.map((id) => {
            const item = dict.facilities.items.find((f) => f.id === id);
            if (!item) return null;

            const location = FACILITY_LOCATIONS[id as FacilityId];

            return (
              <article
                key={id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="flex flex-col gap-3 p-4 lg:p-5">
                  <h3 className="font-display text-base font-semibold text-sunaz-green">
                    {item.name}
                  </h3>
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center justify-center gap-1.5 rounded-full border border-sunaz-green/20 bg-sunaz-green/5 px-4 py-2 text-xs font-semibold text-sunaz-green transition-all hover:border-sunaz-green hover:bg-sunaz-green hover:text-white"
                  >
                    {dict.facilities.openInMaps}
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>

                <iframe
                  title={item.name}
                  src={getMapsEmbedUrl(id, 16)}
                  className="h-[220px] w-full border-0 lg:h-[280px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
