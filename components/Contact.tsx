"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import SectionHeader from "@/components/ui/SectionHeader";
import { COMPANY } from "@/lib/company";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/types/dictionary";

const initialState: ContactFormState = { success: false, message: "" };

interface ContactProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Contact({ locale, dict }: ContactProps) {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  return (
    <section id="contact" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow={dict.contact.eyebrow}
          title={dict.contact.title}
          subtitle={dict.contact.subtitle}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div>
            <form action={formAction} className="space-y-5">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="inquiryType" id="inquiryType" value="general" />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-sunaz-green">
                    {dict.contact.form.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-colors focus:border-sunaz-green focus:outline-none focus:ring-2 focus:ring-sunaz-green/20"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-sunaz-green">
                    {dict.contact.form.company}
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-colors focus:border-sunaz-green focus:outline-none focus:ring-2 focus:ring-sunaz-green/20"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="country" className="mb-1.5 block text-sm font-medium text-sunaz-green">
                    {dict.contact.form.country}
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-colors focus:border-sunaz-green focus:outline-none focus:ring-2 focus:ring-sunaz-green/20"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-sunaz-green">
                    {dict.contact.form.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-colors focus:border-sunaz-green focus:outline-none focus:ring-2 focus:ring-sunaz-green/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-sunaz-green">
                  {dict.contact.form.phone}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-colors focus:border-sunaz-green focus:outline-none focus:ring-2 focus:ring-sunaz-green/20"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-sunaz-green">
                  {dict.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-colors focus:border-sunaz-green focus:outline-none focus:ring-2 focus:ring-sunaz-green/20"
                />
              </div>

              {state.message === "success" && (
                <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">
                  {dict.contact.form.success}
                </p>
              )}
              {(state.message === "delivery_error" || state.message === "validation_error") && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
                  {dict.contact.form.error}
                </p>
              )}

              <div className="flex flex-wrap gap-4">
                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex items-center justify-center rounded-full bg-sunaz-green px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-sunaz-green-light disabled:opacity-60"
                >
                  {pending ? dict.contact.form.submitting : dict.contact.form.submit}
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  onClick={() => {
                    const input = document.getElementById("inquiryType") as HTMLInputElement;
                    if (input) input.value = "export";
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-sunaz-gold bg-sunaz-gold/10 px-8 py-3.5 text-sm font-semibold text-sunaz-green transition-all hover:bg-sunaz-gold hover:text-white disabled:opacity-60"
                >
                  {dict.contact.exportInquiryCta}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: dict.contact.phone, value: COMPANY.phone, href: COMPANY.phoneHref },
                { label: dict.contact.email, value: COMPANY.email, href: `mailto:${COMPANY.email}` },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 transition-all hover:border-sunaz-green/20 hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-sunaz-muted">
                    {item.label}
                  </p>
                  <p className="mt-2 font-medium text-sunaz-green">{item.value}</p>
                </a>
              ))}
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-sunaz-muted">
                {dict.contact.address}
              </p>
              <p className="mt-2 font-medium text-sunaz-green">{dict.contact.headquarters}</p>
              <p className="mt-1 text-sm text-sunaz-muted">{COMPANY.headquarters.address}</p>
            </div>

            <a
              href={COMPANY.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#1ebe57] sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {dict.contact.whatsappCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
