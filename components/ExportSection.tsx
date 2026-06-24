import SectionHeader from "@/components/ui/SectionHeader";
import type { Dictionary } from "@/types/dictionary";

interface ExportSectionProps {
  dict: Dictionary;
}

export default function ExportSection({ dict }: ExportSectionProps) {
  return (
    <section id="export" className="relative overflow-hidden bg-sunaz-green py-20 lg:py-28">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 70% 30%, rgba(212,175,55,0.3) 0%, transparent 60%)`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow={dict.export.eyebrow}
          title={dict.export.title}
          subtitle={dict.export.subtitle}
          light
        />

        <p className="mx-auto mt-10 max-w-3xl text-center text-lg leading-relaxed text-white/70">
          {dict.export.description}
        </p>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-md">
            <h3 className="font-display text-xl font-semibold text-sunaz-gold">
              {dict.export.productsTitle}
            </h3>
            <ul className="mt-6 space-y-4">
              {dict.export.products.map((product) => (
                <li
                  key={product}
                  className="flex items-center gap-3 text-white/90"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sunaz-gold/20 text-sunaz-gold">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </span>
                  {product}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-sunaz-gold px-8 py-3.5 text-sm font-semibold text-sunaz-green transition-all hover:bg-sunaz-gold-light"
            >
              {dict.export.cta}
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {dict.export.indicators.map((indicator) => (
              <div
                key={indicator.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-sunaz-gold/30 hover:bg-white/10"
              >
                <h4 className="font-semibold text-white">{indicator.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {indicator.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
