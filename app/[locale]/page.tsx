import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import VisualTrust from "@/components/VisualTrust";
import About from "@/components/About";
import Products from "@/components/Products";
import ExportSection from "@/components/ExportSection";
import TrustedPartners from "@/components/TrustedPartners";
import Quality from "@/components/Quality";
import Facilities from "@/components/Facilities";
import ComplianceHomeSection from "@/components/certifications/ComplianceHomeSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main>
        <Hero locale={locale} dict={dict} />
        <Stats dict={dict} />
        <VisualTrust dict={dict} />
        <About dict={dict} />
        <Products locale={locale} dict={dict} />
        <ExportSection dict={dict} />
        <TrustedPartners dict={dict} />
        <Quality dict={dict} />
        <ComplianceHomeSection locale={locale} dict={dict} />
        <Contact locale={locale} dict={dict} />
        <Facilities dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
