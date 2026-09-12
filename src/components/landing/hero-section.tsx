import { LinkedText } from "@/components/linked-text";
import Link from "next/link";
import { TopicLink } from "@/components/topic-link";
import type { ReactNode } from "react";
import { ArrowRight, Briefcase, Code2, Mail, MapPin } from "lucide-react";
import { LandingButtonLink } from "@/components/landing/landing-button-link";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import type { Locale } from "@/lib/i18n";

export function HeroSection({
  locale,
  headshot,
  dict,
}: {
  locale: Locale;
  headshot: ReactNode;
  dict: Dictionary["hero"];
}) {
  return (
    <section
    >
      <div>
        <div>
          <p>
            <LinkedText locale={locale}>{dict.subtitle}</LinkedText>
          </p>
          <h1>
            <span>Orhan Madi</span>
            <span>Assani</span>
          </h1>

          <p>
            <LinkedText locale={locale}>{dict.statement}</LinkedText>
          </p>

          <div>
            <span>
              <MapPin aria-hidden="true" />
              {dict.location}
            </span>
            <span>
              <Briefcase aria-hidden="true" />
              <Link href={`/${locale}/parcours/1up-fullstack-developer`}>{dict.status}</Link>
            </span>
            <span>
              <Code2 aria-hidden="true" />
              <TopicLink label="Odoo" locale={locale} /> · <TopicLink label="Symfony" locale={locale} /> · <TopicLink label="Next.js" locale={locale} />
            </span>
          </div>

          <div>
            <LandingButtonLink
              href={`/${locale}/realisations`}
              size="lg"
            >
              {dict.ctaWork}
              <ArrowRight aria-hidden="true" />
            </LandingButtonLink>
            <LandingButtonLink
              href={`/${locale}/contact`}
              variant="outline"
              size="lg"
            >
              <Mail aria-hidden="true" />
              {dict.ctaContact}
            </LandingButtonLink>
          </div>
        </div>

        <div>
          <div>
            {headshot}
          </div>
        </div>
      </div>
    </section>
  );
}
