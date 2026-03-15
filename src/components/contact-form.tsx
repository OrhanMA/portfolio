"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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

import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import { executeRecaptcha } from "@/lib/recaptcha";
import {
  sendContactEmail,
  type ContactActionState,
} from "@/app/[locale]/actions/contact";
import { useDictionary } from "@/components/dictionary-provider";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [actionState, setActionState] = useState<ContactActionState>(null);
  const mountTimestamp = useRef(Date.now());
  const dict = useDictionary();

  // Record mount time for time-based anti-spam check
  useEffect(() => {
    mountTimestamp.current = Date.now();
  }, []);

  const {
    control,
    handleSubmit,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      reason: "",
      customSubject: "",
      message: "",
      honeypot: "",
      timestamp: 0,
      recaptchaToken: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- watch() is inherently incompatible with React Compiler (react-hook-form subscription model)
  const selectedReason = watch("reason");

  function onSubmit(data: ContactFormData) {
    startTransition(async () => {
      // Get reCAPTCHA token (non-blocking — works even if script hasn't loaded)
      let recaptchaToken = "";
      try {
        recaptchaToken = await executeRecaptcha("contact_form");
      } catch {
        // reCAPTCHA failed to execute — continue without it
      }

      const result = await sendContactEmail({
        ...data,
        timestamp: mountTimestamp.current,
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
      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle2 className="h-6 w-6 text-green-500" />
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        {/* Error banner */}
        {actionState && !actionState.success && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
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
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {dict.contactForm.submittingLabel}
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {dict.contactForm.submitLabel}
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
