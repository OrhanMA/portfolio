import type { Metadata } from "next";
import Script from "next/script";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { getDictionary } from "../dictionaries";
import type { Locale } from "@/lib/i18n";

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.contact.pageTitle,
    description: dict.contact.pageDescription,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      {/* Load reCAPTCHA v3 script only on this page */}
      {recaptchaSiteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          strategy="lazyOnload"
        />
      )}

      <div className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {dict.contact.heading}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              {dict.contact.subtext}
            </p>
          </div>

          {/* Form */}
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <ContactForm />
          </div>

          {/* Alternative contact + reCAPTCHA disclosure */}
          <div className="mt-6 space-y-2 text-center text-sm text-muted-foreground">
            <p>
              {dict.contact.altEmail}{" "}
              <a
                href="mailto:orhan.madi.assani@gmail.com"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                orhan.madi.assani@gmail.com
              </a>
            </p>
            {recaptchaSiteKey && (
              <p className="text-xs text-muted-foreground/70">
                {dict.contact.recaptchaDisclosure
                  .replace(
                    "{privacy}",
                    `<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 hover:text-muted-foreground">${dict.contact.privacyPolicy}</a>`
                  )
                  .replace(
                    "{terms}",
                    `<a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 hover:text-muted-foreground">${dict.contact.termsOfService}</a>`
                  )
                  .split(/(<a[^>]*>.*?<\/a>)/g)
                  .map((part, i) =>
                    part.startsWith("<a") ? (
                      <span
                        key={i}
                        dangerouslySetInnerHTML={{ __html: part }}
                      />
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
