import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { EditorialPageHeader } from "@/components/editorial-page-header";
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
      <EditorialPageHeader
        eyebrow={dict.nav.contact}
        title={dict.contact.heading}
        description={dict.contact.subtext}
        titleClassName="uppercase"
      />

      <section>
        <div>
          <aside>
            <div>
              <Mail aria-hidden="true" />
            </div>
            <p>Email</p>
            <p>
              {dict.contact.altEmail}
            </p>
            <a
              href="mailto:orhan.madi.assani@gmail.com"
            >
              orhan.madi.assani@gmail.com
            </a>
          </aside>

          <div>
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

            <div>
              <p>
                {dict.contact.altEmail}{" "}
                <a
                  href="mailto:orhan.madi.assani@gmail.com"
                >
                  orhan.madi.assani@gmail.com
                </a>
              </p>
              {recaptchaSiteKey && (
                <p>
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
