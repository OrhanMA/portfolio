"use client";

import { useMemo, useState, useTransition } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldDescription,
} from "@/components/ui/field";

import {
  createContactSchema,
  type ContactFormData,
  type ContactFormInput,
} from "@/lib/schemas/contact";
import {
  executeRecaptcha,
  preloadRecaptcha,
} from "@/lib/recaptcha-client";
import {
  sendContactEmail,
  type ContactActionState,
} from "@/app/[locale]/actions/contact";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import type { Locale } from "@/lib/i18n";

export type ContactFormDictionary = Pick<
  Dictionary,
  "contactForm" | "contactReasons" | "contactValidation" | "legal"
>;

export function ContactForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: ContactFormDictionary;
}) {
  const [isPending, startTransition] = useTransition();
  const [actionState, setActionState] = useState<ContactActionState>(null);
  const [mountTimestamp] = useState(() => Date.now());
  const schema = useMemo(
    () => createContactSchema(dict.contactValidation),
    [dict.contactValidation],
  );

  const { control, handleSubmit, reset } = useForm<
    ContactFormInput,
    unknown,
    ContactFormData
  >({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      reason: "",
      customSubject: "",
      message: "",
      honeypot: "",
      timestamp: mountTimestamp,
      recaptchaToken: "",
    },
  });

  const selectedReason = useWatch({ control, name: "reason" });

  function onSubmit(data: ContactFormData) {
    setActionState(null);
    startTransition(async () => {
      let recaptchaToken = "";
      try {
        recaptchaToken = await executeRecaptcha("contact_form");
      } catch {
        // The server applies the authoritative security policy and returns a
        // localized retry message when reCAPTCHA is required but unavailable.
      }

      const result = await sendContactEmail(locale, {
        ...data,
        timestamp: mountTimestamp,
        recaptchaToken,
      });
      setActionState(result);
      if (result?.success) {
        reset();
      }
    });
  }

  // Show success state
  if (actionState?.success) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <CheckCircle2 aria-hidden="true" className="h-6 w-6 text-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">
            {dict.contactForm.successHeading}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {actionState.message}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setActionState(null)}
          className="mt-2"
        >
          {dict.contactForm.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocusCapture={() => {
        void preloadRecaptcha().catch(() => undefined);
      }}
      aria-busy={isPending}
      noValidate
    >
      <FieldGroup>
        {/* Error banner */}
        {actionState && !actionState.success && (
          <div
            role="alert"
            aria-live="assertive"
            className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {actionState.message}
          </div>
        )}

        {/* Honeypot — hidden from humans, visible to bots */}
        <Controller
          name="honeypot"
          control={control}
          render={({ field }) => (
            <div
              aria-hidden="true"
              className="absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden"
            >
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...field}
              />
            </div>
          )}
        />

        {/* Name & Email row */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error || undefined}>
                <FieldLabel htmlFor="name">
                  {dict.contactForm.nameLabel}
                </FieldLabel>
                <Input
                  id="name"
                  placeholder={dict.contactForm.namePlaceholder}
                  aria-invalid={!!fieldState.error}
                  {...field}
                />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error || undefined}>
                <FieldLabel htmlFor="email">
                  {dict.contactForm.emailLabel}
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder={dict.contactForm.emailPlaceholder}
                  aria-invalid={!!fieldState.error}
                  {...field}
                />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />
        </div>

        {/* Contact reason select */}
        <Controller
          name="reason"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error || undefined}>
              <FieldLabel htmlFor="reason">
                {dict.contactForm.reasonLabel}
              </FieldLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="reason"
                  className="w-full"
                  aria-invalid={!!fieldState.error}
                >
                  <SelectValue
                    placeholder={dict.contactForm.reasonPlaceholder}
                  />
                </SelectTrigger>
                <SelectContent>
                  {dict.contactReasons.map(
                    (reason: { value: string; label: string }) => (
                      <SelectItem key={reason.value} value={reason.value}>
                        {reason.label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        {/* Custom subject — shown when "other" is selected */}
        {selectedReason === "other" && (
          <Controller
            name="customSubject"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error || undefined}>
                <FieldLabel htmlFor="customSubject">
                  {dict.contactForm.customSubjectLabel}
                </FieldLabel>
                <Input
                  id="customSubject"
                  placeholder={dict.contactForm.customSubjectPlaceholder}
                  aria-invalid={!!fieldState.error}
                  {...field}
                />
                <FieldDescription>
                  {dict.contactForm.customSubjectDescription}
                </FieldDescription>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />
        )}

        {/* Message textarea */}
        <Controller
          name="message"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error || undefined}>
              <FieldLabel htmlFor="message">
                {dict.contactForm.messageLabel}
              </FieldLabel>
              <Textarea
                id="message"
                placeholder={dict.contactForm.messagePlaceholder}
                className="min-h-32"
                aria-invalid={!!fieldState.error}
                {...field}
              />
              <FieldDescription>
                {field.value.length > 0 && (
                  <span
                    className={
                      field.value.length > 5000
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }
                  >
                    {field.value.length}/5000 {dict.contactForm.characters}
                  </span>
                )}
              </FieldDescription>
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        {/* Submit button */}
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="w-full sm:w-auto"
        >
          {isPending ? (
            <>
              <Loader2 aria-hidden="true" className="mr-2 h-4 w-4 animate-spin" />
              {dict.contactForm.submittingLabel}
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="mr-2 h-4 w-4" />
              {dict.contactForm.submitLabel}
            </>
          )}
        </Button>

        <p className="max-w-2xl text-xs leading-5 text-muted-foreground">
          {dict.contactForm.privacyNotice} {" "}
          <a
            href={`mailto:${dict.legal.editorEmail}`}
            className="underline underline-offset-2 hover:text-foreground"
          >
            {dict.legal.editorEmail}
          </a>
          {" "}
          <a
            href={`/${locale}/politique-confidentialite`}
            className="underline underline-offset-2 hover:text-foreground"
          >
            {dict.contactForm.privacyNoticeLink}
          </a>
        </p>
      </FieldGroup>
    </form>
  );
}
