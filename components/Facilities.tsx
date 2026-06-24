import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/types/dictionary";

interface FacilitiesProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Facilities({ locale, dict }: FacilitiesProps) {
  return (
    <section id="facilities" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow={dict.facilities.eyebrow}
          title={dict.facilities.title}
          subtitle={dict.facilities.subtitle}
        />

        <div className="mt-16 space-y-8">
          {dict.facilities.items.map((facility, index) => (
            <article
              key={facility.id}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="grid lg:grid-cols-5">
                <div className="relative bg-sunaz-green p-10 lg:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-sunaz-gold">
                    Facility {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-white lg:text-3xl">
                    {facility.name}
                  </h3>
                  {facility.stat && (
                    <div className="mt-8 inline-block rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md">
                      <span className="font-display text-2xl font-semibold text-sunaz-gold">
                        {facility.stat.value}
                      </span>
                      <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                        {facility.stat.label}
                      </p>
                    </div>
                  )}
                  <div className="mt-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                      Location
                    </p>
                    <ul className="mt-2 space-y-1">
                      {facility.location.map((line) => (
                        <li key={line} className="text-sm text-white/80">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-10 lg:col-span-3">
                  <p className="text-lg leading-relaxed text-sunaz-muted">
                    {facility.description}
                  </p>
                  <div className="mt-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-sunaz-gold">
                      Infrastructure
                    </p>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {facility.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-center gap-2 text-sm text-sunaz-muted"
                        >
                          <svg className="h-4 w-4 shrink-0 text-sunaz-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/gallery`}
            className="inline-flex items-center justify-center rounded-full border border-sunaz-green/20 bg-sunaz-green/5 px-10 py-3.5 text-sm font-semibold text-sunaz-green transition-all hover:border-sunaz-green hover:bg-sunaz-green hover:text-white"
          >
            {dict.facilities.viewGallery} →
          </Link>
        </div>
      </div>
    </section>
  );
}
