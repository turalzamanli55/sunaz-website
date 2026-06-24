import type { Dictionary } from "@/types/dictionary";

interface GlobalImporterSectionProps {
  dict: Dictionary;
}

export default function GlobalImporterSection({ dict }: GlobalImporterSectionProps) {
  const { importer } = dict.compliance.page;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-sunaz-green/10 bg-sunaz-green p-10 lg:p-14">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 80% 20%, rgba(212,175,55,0.25) 0%, transparent 50%)`,
        }}
      />
      <div className="relative">
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          {importer.title}
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75">
          {importer.content}
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {importer.indicators.map((indicator) => (
            <div
              key={indicator.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-sunaz-gold/30"
            >
              <h3 className="font-semibold text-sunaz-gold">{indicator.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
