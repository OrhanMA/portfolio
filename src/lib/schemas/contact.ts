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

export const contactSchema = z
  .object({
    name: z
      .string()
      .min(2, "Le nom doit contenir au moins 2 caractères.")
      .max(100, "Le nom ne doit pas dépasser 100 caractères."),
    email: z.string().email("Adresse email invalide."),
    reason: z.string().min(1, "Veuillez sélectionner une raison."),
    customSubject: z.string().optional(),
    message: z
      .string()
      .min(10, "Le message doit contenir au moins 10 caractères.")
      .max(5000, "Le message ne doit pas dépasser 5000 caractères."),
    // Anti-spam fields (not shown to user)
    honeypot: z.string().max(0, "Bot detected.").optional(),
    timestamp: z.number().optional(),
    recaptchaToken: z.string().optional(),
  })
  .refine(
    (data) =>
      data.reason !== "other" ||
      (data.customSubject !== undefined && data.customSubject.trim().length > 0),
    {
      message: "Veuillez préciser le sujet de votre message.",
      path: ["customSubject"],
    }
  );

export type ContactFormData = z.infer<typeof contactSchema>;
