"use server";

import { headers } from "next/headers";
import { createHash } from "node:crypto";
import { Resend } from "resend";
import {
  contactSchema,
  type ContactFormInput,
} from "@/lib/schemas/contact";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { rateLimit } from "@/lib/rate-limit";
import { createContactEmailHtml, createContactEmailText } from "@/lib/contact-email";
import { getDictionary } from "@/app/[locale]/dictionaries";
import { isValidLocale, type Locale } from "@/lib/i18n";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL ?? "delivered@resend.dev";
const FROM_EMAIL =
  process.env.FROM_EMAIL ?? "Contact Portfolio <onboarding@resend.dev>";

// Minimum time (ms) between form mount and submission
const MIN_SUBMISSION_TIME_MS = 3000;

export type ContactActionState =
  | { status: "success"; success: true; message: string }
  | { status: "validation-error"; success: false; message: string }
  | { status: "temporarily-unavailable"; success: false; message: string }
  | null;

function getFormField(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}

/**
 * HTTPS progressive-enhancement fallback for the contact form.
 *
 * Client-side validation normally intercepts the submit event. Without
 * JavaScript, this Server Action receives the native FormData instead of
 * sending a message through a mailto: URL.
 */
export async function submitContactForm(
  locale: Locale,
  formData: FormData,
): Promise<void> {
  await sendContactEmail(locale, {
    name: getFormField(formData, "name"),
    email: getFormField(formData, "email"),
    reason: getFormField(formData, "reason"),
    customSubject: getFormField(formData, "customSubject"),
    message: getFormField(formData, "message"),
    honeypot: getFormField(formData, "honeypot"),
    timestamp: Number(getFormField(formData, "timestamp")),
    recaptchaToken: getFormField(formData, "recaptchaToken"),
  });
}

export async function sendContactEmail(
  locale: Locale,
  data: ContactFormInput,
): Promise<ContactActionState> {
  const safeLocale = isValidLocale(locale) ? locale : "fr";
  const dict = await getDictionary(safeLocale);

  // Read the honeypot before schema validation so bots receive a silent,
  // indistinguishable success response without reaching external services.
  if (typeof data?.honeypot === "string" && data.honeypot.length > 0) {
    return {
      status: "success",
      success: true,
      message: dict.contactErrors.success,
    };
  }

  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return {
      status: "validation-error",
      success: false,
      message: dict.contactErrors.invalidData,
    };
  }

  const {
    name,
    email,
    reason,
    customSubject,
    message,
    timestamp,
    recaptchaToken,
  } = parsed.data;

  // Time-based bot check.
  const elapsed = Date.now() - timestamp;
  if (elapsed < MIN_SUBMISSION_TIME_MS) {
    return {
      status: "validation-error",
      success: false,
      message: dict.contactErrors.tooFast,
    };
  }

  // Verify reCAPTCHA before consuming a rate-limit token, preventing invalid
  // traffic from exhausting a legitimate shared-IP quota.
  const recaptchaEnabled = Boolean(process.env.RECAPTCHA_SECRET_KEY);
  if (recaptchaEnabled && !recaptchaToken) {
    return {
      status: "validation-error",
      success: false,
      message: dict.contactErrors.recaptchaFailed,
    };
  }

  if (recaptchaToken) {
    let recaptchaResult: Awaited<ReturnType<typeof verifyRecaptcha>>;
    try {
      recaptchaResult = await verifyRecaptcha(
        recaptchaToken,
        "contact_form",
      );
    } catch (error) {
      console.error("Contact reCAPTCHA unavailable:", error);
      return {
        status: "temporarily-unavailable",
        success: false,
        message: dict.contactErrors.securityUnavailable,
      };
    }

    if (!recaptchaResult.success) {
      return {
        status: "validation-error",
        success: false,
        message: dict.contactErrors.recaptchaFailed,
      };
    }
  }

  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? "unknown";
  const rateLimitKey = createHash("sha256").update(ip).digest("hex");

  try {
    const rateLimitResult = await rateLimit(rateLimitKey);
    if (!rateLimitResult.success) {
      return {
        status: "validation-error",
        success: false,
        message: dict.contactErrors.rateLimit,
      };
    }
  } catch (error) {
    // Keep the contact channel available if the best-effort limiter fails.
    // reCAPTCHA, the honeypot and the minimum submission time have already run;
    // log the degraded protection so the incident remains observable.
    console.warn(
      "Contact rate-limit unavailable; continuing with remaining anti-spam protections:",
      error,
    );
  }

  const reasonLabel =
    reason === "other"
      ? customSubject ?? dict.contactReasons.at(-1)?.label ?? "Other"
      : dict.contactReasons.find((item) => item.value === reason)?.label ??
        reason;

  const subjectName = name.replace(/[\r\n]+/g, " ");
  const subjectReason = reasonLabel.replace(/[\r\n]+/g, " ");
  const subject = `[Portfolio] ${subjectReason} — de ${subjectName}`;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [RECIPIENT_EMAIL],
      replyTo: email,
      subject,
      html: createContactEmailHtml({
        locale: safeLocale,
        copy: dict.contactEmail,
        name,
        email,
        reasonLabel,
        message,
      }),
      text: createContactEmailText({
        locale: safeLocale,
        copy: dict.contactEmail,
        name,
        email,
        reasonLabel,
        message,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        status: "temporarily-unavailable",
        success: false,
        message: dict.contactErrors.sendError,
      };
    }

    return {
      status: "success",
      success: true,
      message: dict.contactErrors.success,
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      status: "temporarily-unavailable",
      success: false,
      message: dict.contactErrors.unexpectedError,
    };
  }
}
