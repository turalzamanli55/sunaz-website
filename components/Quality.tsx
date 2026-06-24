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

        <div className="mt-10 grid grid-cols-2 gap-3 md:mt-16 md:gap-6 lg:grid-cols-3">
          {dict.quality.items.map((item, index) => (
            <article
              key={item.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sunaz-green/20 hover:shadow-xl md:p-8"
            >
              <span className="font-display text-3xl font-bold text-sunaz-green/10 transition-colors group-hover:text-sunaz-gold/20 md:text-5xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-sm font-semibold text-sunaz-green md:mt-4 md:text-xl">
                {item.title}
              </h3>
              <p className="mt-2 line-clamp-4 flex-1 text-xs leading-relaxed text-sunaz-muted md:mt-3 md:line-clamp-none md:text-sm">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
