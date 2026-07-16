import type { Metadata } from "next";
import Script from "next/script";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { getDictionary } from "../dictionaries";
import type { Locale } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return createLocalizedMetadata({
    locale: locale as Locale,
    pathname: "/contact",
    title: dict.contact.pageTitle,
    description: dict.contact.pageDescription,
  });
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

      <EditorialPageHeader
        eyebrow={dict.nav.contact}
        title={dict.contact.heading}
        description={dict.contact.subtext}
        titleClassName="uppercase"
      />

      <section className="section-tinted px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.65fr_1fr] lg:items-start">
          <aside className="premium-card rounded-xl border-l-4 border-l-vermillion p-6 lg:sticky lg:top-28">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md border border-foreground/15 bg-background">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <p className="editorial-index text-vermillion">Email</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {dict.contact.altEmail}
            </p>
            <a
              href="mailto:orhan.madi.assani@gmail.com"
              className="mt-3 block break-all font-sans text-xs font-bold text-primary underline-offset-4 hover:underline"
            >
              orhan.madi.assani@gmail.com
            </a>
          </aside>

          <div>
            <div className="premium-card rounded-xl border-t-4 border-t-primary p-5 sm:p-8">
              <ContactForm
                dict={{
                  contactForm: dict.contactForm,
                  contactReasons: dict.contactReasons,
                }}
              />
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
      </section>
    </>
  );
}
