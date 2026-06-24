import SectionHeader from "@/components/ui/SectionHeader";
import type { Dictionary } from "@/types/dictionary";

interface CertificatesProps {
  dict: Dictionary;
}

export default function Certificates({ dict }: CertificatesProps) {
  return (
    <section id="certificates" className="bg-gray-50/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow={dict.certificates.eyebrow}
          title={dict.certificates.title}
          subtitle={dict.certificates.subtitle}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.certificates.items.map((cert) => (
            <article
              key={cert.title}
              className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sunaz-gold/40 hover:shadow-xl"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-sunaz-gold/30 bg-sunaz-gold/5 transition-all group-hover:border-sunaz-gold group-hover:bg-sunaz-gold/10">
                <span className="font-display text-sm font-bold text-sunaz-green">
                  {cert.badge}
                </span>
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold text-sunaz-green">
                {cert.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-sunaz-muted">
                {cert.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
