"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Partial<Record<"name" | "company" | "country" | "email" | "phone" | "message", string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_SUBJECT = "SUNAZ Website Contact Form";

function validateField(value: string, minLength: number, fieldName: string): string | undefined {
  const trimmed = value.trim();
  if (trimmed.length < minLength) {
    return `${fieldName} is required`;
  }
  return undefined;
}

function getClientIp(headerStore: Headers): string | undefined {
  const forwarded = headerStore.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headerStore.get("x-real-ip") ?? undefined;
}

function buildEmailBody(fields: {
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
  ip?: string;
}): string {
  return [
    "SUNAZ Website Contact Form",
    "",
    `Full Name: ${fields.name}`,
    `Company: ${fields.company}`,
    `Country: ${fields.country}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone}`,
    `Message: ${fields.message}`,
    "",
    `Submission Time: ${fields.submittedAt}`,
    `User IP: ${fields.ip ?? "unavailable"}`,
  ].join("\n");
}

async function sendContactEmail(payload: {
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
  ip?: string;
}): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!host || !portRaw || !user || !pass || !from || !to) {
    console.error("[SUNAZ Contact] Missing SMTP environment variables");
    return false;
  }

  const port = Number(portRaw);
  if (!Number.isFinite(port)) {
    console.error("[SUNAZ Contact] Invalid SMTP_PORT");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: payload.email,
      subject: CONTACT_SUBJECT,
      text: buildEmailBody(payload),
    });
    return true;
  } catch (error) {
    console.error("[SUNAZ Contact] SMTP send failed", error);
    return false;
  }
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

  const headerStore = await headers();
  const sent = await sendContactEmail({
    name: name.trim(),
    company: company.trim(),
    country: country.trim(),
    email: email.trim(),
    phone: phone.trim(),
    message: message.trim(),
    submittedAt: new Date().toISOString(),
    ip: getClientIp(headerStore),
  });

  if (!sent) {
    return { success: false, message: "delivery_error" };
  }

  return { success: true, message: "success" };
}
