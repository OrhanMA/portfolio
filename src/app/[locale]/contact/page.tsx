import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { createLocalizedMetadata } from "@/lib/metadata";
import { getLocalizedPageContext } from "../route-context";

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

function RecaptchaDisclosure({
  text,
  privacyLabel,
  termsLabel,
}: {
  text: string;
  privacyLabel: string;
  termsLabel: string;
}) {
  return text.split(/(\{privacy\}|\{terms\})/g).map((part, index) => {
    if (part === "{privacy}") {
      return (
        <a
          key={part}
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-muted-foreground"
        >
          {privacyLabel}
        </a>
      );
    }
    if (part === "{terms}") {
      return (
        <a
          key={part}
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-muted-foreground"
        >
          {termsLabel}
        </a>
      );
    }
    return <span key={`${index}-${part}`}>{part}</span>;
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);
  return createLocalizedMetadata({
    locale: loc,
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
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);

  return (
    <>
      <EditorialPageHeader
        eyebrow={dict.nav.contact}
        title={dict.contact.heading}
        description={dict.contact.subtext}
        titleClassName="uppercase"
      />

      <section className="bg-muted/35 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.65fr_1fr] lg:items-start">
          <aside className="border border-border bg-card p-6 lg:sticky lg:top-28">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md border border-foreground/15 bg-background">
              <Mail aria-hidden="true" className="h-6 w-6 text-primary" />
            </div>
            <p className="editorial-index">Email</p>
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
            <div className="border border-border bg-card p-5 sm:p-8">
              <ContactForm
                locale={loc}
                dict={{
                  contactForm: dict.contactForm,
                  contactReasons: dict.contactReasons,
                  contactValidation: dict.contactValidation,
                  legal: dict.legal,
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
                  <RecaptchaDisclosure
                    text={dict.contact.recaptchaDisclosure}
                    privacyLabel={dict.contact.privacyPolicy}
                    termsLabel={dict.contact.termsOfService}
                  />
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
