"use server";

import { headers } from "next/headers";
import { createHash } from "node:crypto";
import { Resend } from "resend";
import {
  contactSchema,
  type ContactFormData,
} from "@/lib/schemas/contact";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { rateLimit } from "@/lib/rate-limit";
import { escapeHtml } from "@/lib/utils";
import { getDictionary } from "@/app/[locale]/dictionaries";
import { isValidLocale, type Locale } from "@/lib/i18n";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL ?? "delivered@resend.dev";
const FROM_EMAIL =
  process.env.FROM_EMAIL ?? "Contact Portfolio <onboarding@resend.dev>";

// Minimum time (ms) between form mount and submission
const MIN_SUBMISSION_TIME_MS = 3000;

export type ContactActionState = {
  success: boolean;
  message: string;
} | null;

export async function sendContactEmail(
  locale: Locale,
  data: ContactFormData,
): Promise<ContactActionState> {
  const safeLocale = isValidLocale(locale) ? locale : "fr";
  const dict = await getDictionary(safeLocale);

  // Read the honeypot before schema validation so bots receive a silent,
  // indistinguishable success response without reaching external services.
  if (typeof data?.honeypot === "string" && data.honeypot.length > 0) {
    return { success: true, message: dict.contactErrors.success };
  }

  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return {
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
      success: false,
      message: dict.contactErrors.tooFast,
    };
  }

  // Verify reCAPTCHA before consuming a rate-limit token, preventing invalid
  // traffic from exhausting a legitimate shared-IP quota.
  const recaptchaEnabled = Boolean(process.env.RECAPTCHA_SECRET_KEY);
  if (recaptchaEnabled && !recaptchaToken) {
    return {
      success: false,
      message: dict.contactErrors.recaptchaFailed,
    };
  }

  if (recaptchaToken) {
    const recaptchaResult = await verifyRecaptcha(
      recaptchaToken,
      "contact_form",
    );
    if (!recaptchaResult.success) {
      return {
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
      return { success: false, message: dict.contactErrors.rateLimit };
    }
  } catch (error) {
    console.error("Contact rate-limit unavailable:", error);
    return {
      success: false,
      message: dict.contactErrors.securityUnavailable,
    };
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
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #e5e5e5; padding-bottom: 12px;">
            Nouveau message de contact
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #525252; width: 140px; vertical-align: top;">Nom</td>
              <td style="padding: 8px 12px;">${escapeHtml(name)}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: 600; color: #525252; vertical-align: top;">Email</td>
              <td style="padding: 8px 12px;">
                <a href="mailto:${escapeHtml(email)}" style="color: #2563eb;">${escapeHtml(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #525252; vertical-align: top;">Raison</td>
              <td style="padding: 8px 12px;">${escapeHtml(reasonLabel)}</td>
            </tr>
          </table>
          <div style="background: #f5f5f5; border-left: 4px solid #2563eb; padding: 16px; border-radius: 0 8px 8px 0; margin: 16px 0;">
            <h3 style="margin: 0 0 8px; color: #1a1a1a; font-size: 14px;">Message</h3>
            <p style="margin: 0; white-space: pre-wrap; color: #374151; line-height: 1.6;">
              ${escapeHtml(message)}
            </p>
          </div>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
            Envoye depuis le formulaire de contact du portfolio.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        message: dict.contactErrors.sendError,
      };
    }

    return {
      success: true,
      message: dict.contactErrors.success,
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: dict.contactErrors.unexpectedError,
    };
  }
}
