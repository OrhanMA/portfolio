import type { ReactNode } from "react";
import { ArrowRight, Briefcase, Code2, Mail, MapPin } from "lucide-react";
import { LandingButtonLink } from "@/components/landing/landing-button-link";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export function HeroSection({
  locale,
  headshot,
  dict,
}: {
  locale: string;
  headshot: ReactNode;
  dict: Dictionary["hero"];
}) {
  return (
    <section
      className="border-b border-border px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24 lg:pt-32"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] lg:items-center lg:gap-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {dict.subtitle}
          </p>
          <h1 className="mt-5 text-balance text-[clamp(3.5rem,8vw,7rem)] font-semibold leading-[0.88] tracking-[-0.055em]">
            <span className="block">Orhan Madi</span>
            <span className="block">Assani</span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {dict.statement}
          </p>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin aria-hidden="true" className="h-4 w-4" />
              {dict.location}
            </span>
            <span className="flex items-center gap-2">
              <Briefcase aria-hidden="true" className="h-4 w-4" />
              {dict.status}
            </span>
            <span className="flex items-center gap-2">
              <Code2 aria-hidden="true" className="h-4 w-4" />
              Odoo · Symfony · Next.js
            </span>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <LandingButtonLink
              href={`/${locale}/realisations`}
              size="lg"
              className="gap-2 px-5"
            >
              {dict.ctaWork}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </LandingButtonLink>
            <LandingButtonLink
              href={`/${locale}/contact`}
              variant="outline"
              size="lg"
              className="gap-2 px-5"
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              {dict.ctaContact}
            </LandingButtonLink>
          </div>
        </div>

        <div className="mx-auto aspect-square w-full max-w-sm overflow-hidden border border-border bg-muted lg:max-w-none">
          <div className="h-full w-full [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
            {headshot}
          </div>
        </div>
      </div>
    </section>
  );
}
