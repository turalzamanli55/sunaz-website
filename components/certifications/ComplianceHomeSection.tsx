import Link from "next/link";
import ComplianceCertificateGrid from "@/components/certifications/ComplianceCertificateGrid";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/types/dictionary";

interface ComplianceHomeSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export default function ComplianceHomeSection({ locale, dict }: ComplianceHomeSectionProps) {
  return (
    <section id="compliance" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow={dict.compliance.home.eyebrow}
          title={dict.compliance.home.title}
          subtitle={dict.compliance.home.subtitle}
        />

        <div className="mt-16">
          <ComplianceCertificateGrid dict={dict} mobileCarousel />
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/certifications`}
            className="inline-flex items-center justify-center rounded-full bg-sunaz-green px-10 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sunaz-green/20 transition-all hover:bg-sunaz-green-light hover:shadow-xl"
          >
            {dict.compliance.home.viewAll} →
          </Link>
        </div>
      </div>
    </section>
  );
}
