import SectionHeader from "@/components/ui/SectionHeader";
import type { Dictionary } from "@/types/dictionary";

interface AboutProps {
  dict: Dictionary;
}

export default function About({ dict }: AboutProps) {
  return (
    <section id="about" className="bg-gray-50/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow={dict.about.eyebrow}
          title={dict.about.title}
        />

        <div className="mx-auto mt-16 max-w-3xl space-y-6 text-center">
          {dict.about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-sunaz-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-sm">
            <h3 className="font-display text-2xl font-semibold text-sunaz-green">
              {dict.about.facilitiesTitle}
            </h3>
            <div className="mt-8 space-y-8">
              {dict.about.facilities.map((facility) => (
                <div key={facility.name} className="border-l-2 border-sunaz-gold pl-6">
                  <h4 className="font-semibold text-sunaz-green">{facility.name}</h4>
                  <ul className="mt-2 space-y-1">
                    {facility.details.map((detail) => (
                      <li key={detail} className="text-sm text-sunaz-muted">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-sm">
            <h3 className="font-display text-2xl font-semibold text-sunaz-green">
              {dict.about.productsTitle}
            </h3>
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3">
              {dict.about.productList.map((product) => (
                <li
                  key={product}
                  className="flex items-center gap-2 text-sm text-sunaz-muted"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-sunaz-gold" />
                  {product}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
