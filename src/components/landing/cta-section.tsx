import { ArrowRight, Mail, MapPin } from "lucide-react";
import { LandingButtonLink } from "@/components/landing/landing-button-link";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import type { Locale } from "@/lib/i18n";

export function CtaSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["cta"];
}) {
  return (
    <section
      id="contact"
    >
      <div>
        <div>
          <p>
            {dict.eyebrow}
          </p>
          <h2>
            {dict.heading}
          </h2>
          <div>
            <p>
              {dict.text}
            </p>
            <div>
              <span>
                <MapPin aria-hidden="true" /> Chambéry, France
              </span>
              <a
                href="mailto:orhan.madi.assani@gmail.com"
              >
                <Mail aria-hidden="true" /> orhan.madi.assani@gmail.com
              </a>
              <span>Odoo · Symfony · Next.js</span>
            </div>
          </div>
        </div>

        <div>
          <LandingButtonLink
            href={`/${locale}/contact`}
            size="lg"
          >
            {dict.ctaContact}
            <ArrowRight aria-hidden="true" />
          </LandingButtonLink>
        </div>
      </div>
    </section>
  );
}
