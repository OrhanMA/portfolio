import { z } from "zod/v3";

export const contactReasons = [
  { value: "offer", label: "Offre" },
  { value: "freelance", label: "Mission freelance" },
  { value: "collaboration", label: "Collaboration technique" },
  { value: "question", label: "Question technique" },
  { value: "feedback", label: "Retour sur un article" },
  { value: "other", label: "Autre" },
] as const;

export type ContactReason = (typeof contactReasons)[number]["value"];

export interface ContactValidationMessages {
  nameMin: string;
  nameMax: string;
  emailInvalid: string;
  reasonRequired: string;
  subjectRequired: string;
  subjectMax: string;
  messageMin: string;
  messageMax: string;
}

const defaultMessages: ContactValidationMessages = {
  nameMin: "Le nom doit contenir au moins 2 caractères.",
  nameMax: "Le nom ne doit pas dépasser 100 caractères.",
  emailInvalid: "Adresse de courriel invalide.",
  reasonRequired: "Veuillez sélectionner une raison.",
  subjectRequired: "Veuillez préciser le sujet de votre message.",
  subjectMax: "Le sujet ne doit pas dépasser 120 caractères.",
  messageMin: "Le message doit contenir au moins 10 caractères.",
  messageMax: "Le message ne doit pas dépasser 5000 caractères.",
};

const contactReasonValues = contactReasons.map(({ value }) => value);

export function createContactSchema(
  messages: ContactValidationMessages = defaultMessages,
) {
  return z
  .object({
    name: z
      .string()
      .trim()
      .min(2, messages.nameMin)
      .max(100, messages.nameMax),
    email: z.string().trim().max(254, messages.emailInvalid).email(messages.emailInvalid),
    reason: z.string().refine(
      (value): value is ContactReason =>
        contactReasonValues.includes(value as ContactReason),
      messages.reasonRequired,
    ),
    customSubject: z.string().trim().max(120, messages.subjectMax).optional(),
    message: z
      .string()
      .trim()
      .min(10, messages.messageMin)
      .max(5000, messages.messageMax),
    // Anti-spam fields (not shown to user)
    honeypot: z.string().max(200).optional(),
    timestamp: z.number().int().positive(),
    recaptchaToken: z.string().max(4096).optional(),
  })
  .refine(
    (data) =>
      data.reason !== "other" ||
      (data.customSubject !== undefined && data.customSubject.trim().length > 0),
    {
      message: messages.subjectRequired,
      path: ["customSubject"],
    }
  );
}

export const contactSchema = createContactSchema();

export type ContactFormData = z.infer<typeof contactSchema>;
export type ContactFormInput = z.input<typeof contactSchema>;
