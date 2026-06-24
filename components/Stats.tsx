import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Dictionary } from "@/types/dictionary";

interface StatsProps {
  dict: Dictionary;
}

export default function Stats({ dict }: StatsProps) {
  return (
    <section id="stats" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow={dict.stats.eyebrow}
          title={dict.stats.title}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.stats.items.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-sunaz-gold/30 hover:shadow-xl hover:shadow-sunaz-green/5"
            >
              <div className="font-display text-3xl font-semibold text-sunaz-green sm:text-4xl">
                {item.animate && item.value !== null ? (
                  <AnimatedCounter
                    value={item.value}
                    suffix={item.suffix}
                    displayValue={item.displayValue}
                  />
                ) : (
                  <>
                    {item.displayValue}
                    {item.suffix}
                  </>
                )}
              </div>
              <p className="mt-3 text-sm font-medium leading-snug text-sunaz-muted">
                {item.label}
              </p>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-sunaz-gold transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
