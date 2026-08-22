import { ArrowRight, Mail, MapPin } from "lucide-react";
import { LandingButtonLink } from "@/components/landing/landing-button-link";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export function CtaSection({
  locale,
  dict,
}: {
  locale: string;
  dict: Dictionary["cta"];
}) {
  return (
    <section
      id="contact"
      className="landing-deferred landing-deferred-contact border-t border-border px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-20">
        <div className="contact-copy invisible max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {dict.eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            {dict.heading}
          </h2>
          <div className="contact-details mt-6 max-w-2xl">
            <p className="text-base leading-7 text-muted-foreground">
              {dict.text}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" /> Chambéry, France
              </span>
              <a
                href="mailto:orhan.madi.assani@gmail.com"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Mail aria-hidden="true" className="h-3.5 w-3.5" /> orhan.madi.assani@gmail.com
              </a>
              <span>Odoo · Symfony · Next.js</span>
            </div>
          </div>
        </div>

        <div className="contact-circle invisible">
          <LandingButtonLink
            href={`/${locale}/contact`}
            size="lg"
            className="h-11 gap-3 px-6"
          >
            {dict.ctaContact}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </LandingButtonLink>
        </div>
      </div>
    </section>
  );
}
