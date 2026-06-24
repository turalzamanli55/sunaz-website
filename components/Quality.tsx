import SectionHeader from "@/components/ui/SectionHeader";
import type { Dictionary } from "@/types/dictionary";

interface QualityProps {
  dict: Dictionary;
}

export default function Quality({ dict }: QualityProps) {
  return (
    <section id="quality" className="bg-gray-50/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow={dict.quality.eyebrow}
          title={dict.quality.title}
          subtitle={dict.quality.subtitle}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.quality.items.map((item, index) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sunaz-green/20 hover:shadow-xl"
            >
              <span className="font-display text-5xl font-bold text-sunaz-green/10 transition-colors group-hover:text-sunaz-gold/20">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-sunaz-green">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-sunaz-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
