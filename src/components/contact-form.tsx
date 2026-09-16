"use client";

import { useMemo, useState, useSyncExternalStore, useTransition } from "react";
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
  submitContactForm,
  type ContactActionState,
} from "@/app/[locale]/actions/contact";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import type { Locale } from "@/lib/i18n";

export type ContactFormDictionary = Pick<
  Dictionary,
  | "contactForm"
  | "contactReasons"
  | "contactValidation"
  | "contactErrors"
  | "legal"
>;

function subscribeToHydration() {
  return () => {};
}

export function ContactForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: ContactFormDictionary;
}) {
  const [isPending, startTransition] = useTransition();
  const [actionState, setActionState] = useState<ContactActionState>(null);
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
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

      try {
        const result = await sendContactEmail(locale, {
          ...data,
          timestamp: mountTimestamp,
          recaptchaToken,
        });
        setActionState(result);
        if (result?.success) {
          reset();
        }
      } catch (error) {
        console.error("Contact form action unavailable:", error);
        setActionState({
          status: "temporarily-unavailable",
          success: false,
          message: dict.contactErrors.temporarilyUnavailable,
        });
      }
    });
  }

  // Show success state
  if (actionState?.success) {
    return (
      <div
        role="status"
        aria-live="polite"
      >
        <div>
          <CheckCircle2 aria-hidden="true" />
        </div>
        <div>
          <h3>
            {dict.contactForm.successHeading}
          </h3>
          <p>
            {actionState.message}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setActionState(null)}
        >
          {dict.contactForm.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action={submitContactForm.bind(null, locale)}
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
              className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden whitespace-nowrap"
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

        <input type="hidden" name="timestamp" value={mountTimestamp} />
        <input type="hidden" name="recaptchaToken" value="" />

        {/* Name & Email row */}
        <div>
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
                  autoComplete="name"
                  aria-invalid={!!fieldState.error}
                  aria-describedby={
                    fieldState.error ? "name-error" : undefined
                  }
                  {...field}
                />
                <FieldError id="name-error">
                  {fieldState.error?.message}
                </FieldError>
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
                  autoComplete="email"
                  aria-invalid={!!fieldState.error}
                  aria-describedby={
                    fieldState.error ? "email-error" : undefined
                  }
                  {...field}
                />
                <FieldError id="email-error">
                  {fieldState.error?.message}
                </FieldError>
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
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  ref={field.ref}
                  id="reason"
                  aria-invalid={!!fieldState.error}
                  aria-describedby={
                    fieldState.error ? "reason-error" : undefined
                  }
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
              <FieldError id="reason-error">
                {fieldState.error?.message}
              </FieldError>
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
                  aria-describedby={
                    fieldState.error
                      ? "customSubject-description customSubject-error"
                      : "customSubject-description"
                  }
                  {...field}
                />
                <FieldDescription id="customSubject-description">
                  {dict.contactForm.customSubjectDescription}
                </FieldDescription>
                <FieldError id="customSubject-error">
                  {fieldState.error?.message}
                </FieldError>
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
                aria-invalid={!!fieldState.error}
                aria-describedby={
                  fieldState.error
                    ? "message-description message-error"
                    : "message-description"
                }
                {...field}
              />
              <FieldDescription id="message-description">
                {field.value.length > 0 && (
                  <span
                  >
                    {field.value.length}/5000 {dict.contactForm.characters}
                  </span>
                )}
              </FieldDescription>
              <FieldError id="message-error">
                {fieldState.error?.message}
              </FieldError>
            </Field>
          )}
        />

        {/* Submit button */}
        <Button
          type="submit"
          size="lg"
          disabled={!isHydrated || isPending}
        >
          {isPending ? (
            <>
              <Loader2 aria-hidden="true" />
              {dict.contactForm.submittingLabel}
            </>
          ) : (
            <>
              <Send aria-hidden="true" />
              {dict.contactForm.submitLabel}
            </>
          )}
        </Button>

        <p>
          <span>
            {dict.contactForm.privacyNotice} {" "}
            <a
              href={`mailto:${dict.legal.editorEmail}`}
            >
              {dict.legal.editorEmail}
            </a>
          </span>
          <span className="mt-2 block">
            <a
              href={`/${locale}/politique-confidentialite`}
            >
              {dict.contactForm.privacyNoticeLink}
            </a>
          </span>
        </p>
      </FieldGroup>
    </form>
  );
}
