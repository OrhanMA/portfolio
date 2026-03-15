"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import {
  contactSchema,
  contactReasons,
  type ContactFormData,
} from "@/lib/schemas/contact";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { rateLimit } from "@/lib/rate-limit";
import { escapeHtml } from "@/lib/utils";

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
  data: ContactFormData
): Promise<ContactActionState> {
  // ─── 1. Schema validation ───────────────────────────────────
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Donnees invalides. Veuillez verifier le formulaire.",
    };
  }

  const {
    name,
    email,
    reason,
    customSubject,
    message,
    honeypot,
    timestamp,
    recaptchaToken,
  } = parsed.data;

  // ─── 2. Honeypot check ──────────────────────────────────────
  if (honeypot && honeypot.length > 0) {
    // Silently succeed — never reveal to bots that they were caught
    return {
      success: true,
      message: "Message envoye avec succes ! Je vous repondrai rapidement.",
    };
  }

  // ─── 3. Time-based check ────────────────────────────────────
  if (timestamp) {
    const elapsed = Date.now() - timestamp;
    if (elapsed < MIN_SUBMISSION_TIME_MS) {
      return {
        success: false,
        message: "Veuillez patienter quelques secondes avant d'envoyer.",
      };
    }
  }

  // ─── 4. Rate limiting by IP ─────────────────────────────────
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? "unknown";

  const rateLimitResult = rateLimit(ip);
  if (!rateLimitResult.success) {
    return {
      success: false,
      message:
        "Trop de messages envoyes. Veuillez reessayer dans une heure.",
    };
  }

  // ─── 5. reCAPTCHA v3 verification ───────────────────────────
  if (recaptchaToken) {
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResult.success) {
      return {
        success: false,
        message:
          "La verification de securite a echoue. Veuillez reessayer.",
      };
    }
  }

  // ─── 6. Build and send email ────────────────────────────────
  const reasonLabel =
    reason === "other"
      ? customSubject ?? "Autre"
      : contactReasons.find((r) => r.value === reason)?.label ?? reason;

  const subject = `[Portfolio] ${reasonLabel} — de ${name}`;

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
        message:
          "Une erreur est survenue lors de l'envoi. Veuillez reessayer plus tard.",
      };
    }

    return {
      success: true,
      message: "Message envoye avec succes ! Je vous repondrai rapidement.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message:
        "Une erreur inattendue est survenue. Veuillez reessayer plus tard.",
    };
  }
}

