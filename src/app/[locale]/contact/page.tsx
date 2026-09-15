import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { createLocalizedMetadata } from "@/lib/metadata";
import { RouteStructuredData } from "@/components/route-structured-data";
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
      <RouteStructuredData locale={loc} pathname={`/${loc}/contact`} />
      <section data-contact-page aria-labelledby="contact-heading">
        <div data-contact-layout>
          <div data-contact-intro>
            <p data-contact-eyebrow>{dict.nav.contact}</p>
            <h1 id="contact-heading">{dict.contact.heading}</h1>
            <p data-contact-summary>{dict.contact.subtext}</p>

            <aside data-contact-direct aria-labelledby="contact-email-heading">
              <div>
                <Mail aria-hidden="true" />
              </div>
              <div>
                <p id="contact-email-heading">Email</p>
                <p>{dict.contact.altEmail}</p>
                <a href="mailto:orhan.madi.assani@gmail.com">
                  orhan.madi.assani@gmail.com
                </a>
              </div>
            </aside>

            <section
              data-contact-knowledge
              aria-labelledby="contact-knowledge-heading"
            >
              <h2 id="contact-knowledge-heading">
                {dict.contact.knowledgeHeading}
              </h2>
              <p>{dict.contact.knowledgeText}</p>
              <ul>
                {dict.contact.knowledgeItems.map((item) => (
                  <li key={item.href}>
                    <Link href={`/${loc}${item.href}`}>
                      <span>{item.label}</span>
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div data-contact-form-panel>
            <div>
              <ContactForm
                locale={loc}
                dict={{
                  contactForm: dict.contactForm,
                  contactReasons: dict.contactReasons,
                  contactValidation: dict.contactValidation,
                  contactErrors: dict.contactErrors,
                  legal: dict.legal,
                }}
              />
            </div>

            {recaptchaSiteKey && (
              <div data-contact-form-notes>
                <p>
                  <RecaptchaDisclosure
                    text={dict.contact.recaptchaDisclosure}
                    privacyLabel={dict.contact.privacyPolicy}
                    termsLabel={dict.contact.termsOfService}
                  />
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
