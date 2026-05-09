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
          strategy="afterInteractive"
        />
      )}

      <div className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md border border-border/70 bg-card">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
              Contact
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.95] tracking-normal sm:text-6xl">
              {dict.contact.heading}
            </h1>
            <p className="mt-5 max-w-md text-lg leading-8 text-muted-foreground">
              {dict.contact.subtext}
            </p>
          </div>

          <div>
            <div className="premium-card rounded-lg p-5 sm:p-8">
              <ContactForm />
            </div>

            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
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
                <p className="text-xs leading-6 text-muted-foreground/70">
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
      </div>
    </>
  );
}
