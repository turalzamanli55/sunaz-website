import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComplianceCertificateGrid from "@/components/certifications/ComplianceCertificateGrid";
import TrustIndicators from "@/components/certifications/TrustIndicators";
import GlobalImporterSection from "@/components/certifications/GlobalImporterSection";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildCertificationsStructuredData } from "@/lib/seo/certifications-structured-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) return {};

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return buildPageMetadata(
    locale,
    {
      ...dict,
      meta: {
        ...dict.meta,
        title: dict.compliance.page.meta.title,
        description: dict.compliance.page.meta.description,
      },
    },
    "/certifications",
  );
}

export default async function CertificationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const structuredData = buildCertificationsStructuredData(locale, dict);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header locale={locale} dict={dict} />
      <main className="pt-16 lg:pt-20">
        <section className="relative overflow-hidden bg-sunaz-green py-20 lg:py-28">
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 50%, rgba(212,175,55,0.2) 0%, transparent 60%)`,
              }}
            />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-sunaz-gold">
              SUNAZ Group LLC
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {dict.compliance.page.hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
              {dict.compliance.page.hero.subtitle}
            </p>
          </div>
        </section>

        <section className="bg-gray-50/60 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <ComplianceCertificateGrid dict={dict} />
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <TrustIndicators dict={dict} />
          </div>
        </section>

        <section className="bg-gray-50/60 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <GlobalImporterSection dict={dict} />
          </div>
        </section>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
