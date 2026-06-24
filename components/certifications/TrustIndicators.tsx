import type { Dictionary } from "@/types/dictionary";

interface TrustIndicatorsProps {
  dict: Dictionary;
  light?: boolean;
}

export default function TrustIndicators({ dict, light = false }: TrustIndicatorsProps) {
  return (
    <section className={light ? "" : "py-12"}>
      <h2
        className={`text-center font-display text-2xl font-semibold sm:text-3xl ${
          light ? "text-white" : "text-sunaz-green"
        }`}
      >
        {dict.compliance.page.trustTitle}
      </h2>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {dict.compliance.page.trustBadges.map((badge) => (
          <div
            key={badge}
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
              light
                ? "border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-sunaz-gold/40"
                : "border-sunaz-green/10 bg-white text-sunaz-green shadow-sm hover:border-sunaz-gold/40 hover:shadow-md"
            }`}
          >
            <svg
              className={`h-4 w-4 shrink-0 ${light ? "text-sunaz-gold" : "text-sunaz-gold"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            {badge}
          </div>
        ))}
      </div>
    </section>
  );
}
