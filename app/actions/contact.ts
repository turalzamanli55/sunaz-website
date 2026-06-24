"use server";

import { COMPANY } from "@/lib/company";

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Partial<Record<"name" | "company" | "country" | "email" | "phone" | "message", string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(value: string, minLength: number, fieldName: string): string | undefined {
  const trimmed = value.trim();
  if (trimmed.length < minLength) {
    return `${fieldName} is required`;
  }
  return undefined;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "");
  const company = String(formData.get("company") ?? "");
  const country = String(formData.get("country") ?? "");
  const email = String(formData.get("email") ?? "");
  const phone = String(formData.get("phone") ?? "");
  const message = String(formData.get("message") ?? "");
  const locale = String(formData.get("locale") ?? "en");
  const inquiryType = String(formData.get("inquiryType") ?? "general");

  const errors: ContactFormState["errors"] = {
    name: validateField(name, 2, "name"),
    company: validateField(company, 2, "company"),
    country: validateField(country, 2, "country"),
    email: !EMAIL_PATTERN.test(email.trim()) ? "email" : undefined,
    phone: validateField(phone, 5, "phone"),
    message: validateField(message, 10, "message"),
  };

  const hasErrors = Object.values(errors).some(Boolean);
  if (hasErrors) {
    return {
      success: false,
      message: "validation_error",
      errors,
    };
  }

  const payload = {
    name: name.trim(),
    company: company.trim(),
    country: country.trim(),
    email: email.trim(),
    phone: phone.trim(),
    message: message.trim(),
    locale,
    inquiryType,
    submittedAt: new Date().toISOString(),
    to: COMPANY.email,
  };

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { success: false, message: "delivery_error" };
    }
  } else if (process.env.NODE_ENV === "production") {
    console.info("[SUNAZ Contact]", JSON.stringify(payload));
  }

  return { success: true, message: "success" };
}
