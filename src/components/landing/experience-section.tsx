import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  EditorialWave,
  UkiyoeCrest,
} from "@/components/landing/editorial-wave";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/app/[locale]/dictionaries";

type ExperienceEntry = {
  order?: number;
  period: string;
  title: string;
  company: string;
  logo?: string;
  url: string;
  companies?: { name: string; logo?: string; url: string }[];
  description: string;
  location?: string;
  institutions?: string;
  certificateUrl?: string;
  certificateLabel?: string;
  responsibilities?: string[];
  linkedRealisations?: string[];
  linkedCompetences?: string[];
  tags: string[];
};

const linkedRealisationTitles: Record<Locale, Record<string, string>> = {
  fr: {
    "migration-odoo-v16-v19": "Migration d'un ERP d'entreprise de Odoo 16 vers Odoo 19",
    "modules-metier-odoo": "Développement de modules métier pour un ERP",
    "refonte-site-corporate": "Refonte d'un site corporate Next.js",
    "app-trajectoires-de-vie": "Développement d'une application web de trajectoires de vie",
    "portfolio-professionnel": "Conception d'un portfolio professionnel",
  },
  en: {
    "migration-odoo-v16-v19": "Enterprise ERP migration from Odoo 16 to Odoo 19",
    "modules-metier-odoo": "Business module development for an ERP",
    "refonte-site-corporate": "Next.js corporate website redesign",
    "app-trajectoires-de-vie": "Development of a life trajectories web application",
    "portfolio-professionnel": "Building a professional portfolio",
  },
};

const linkedCompetenceTitles: Record<Locale, Record<string, string>> = {
  fr: {
    autonomie: "Autonomie",
    perseverance: "Persévérance",
    adaptabilite: "Adaptabilité",
    "amelioration-continue": "Amélioration continue",
    communication: "Communication",
    "developpement-odoo": "Développement Odoo",
    "developpement-frontend": "Développement Frontend (React/Next.js)",
    devops: "DevOps & Administration Serveur",
    python: "Python",
  },
  en: {
    autonomie: "Autonomy",
    perseverance: "Perseverance",
    adaptabilite: "Adaptability",
    "amelioration-continue": "Continuous improvement",
    communication: "Communication",
    "developpement-odoo": "Odoo Development",
    "developpement-frontend": "Frontend Development (React/Next.js)",
    devops: "DevOps & Server Administration",
    python: "Python",
  },
};

export function ExperienceSection({
  locale = "fr",
  dict,
}: {
  locale?: Locale;
  dict: Dictionary["experience"];
}) {
  const loc = locale;

  return (
    <section
      id="parcours"
      className="landing-deferred landing-deferred-experience relative overflow-hidden border-y border-foreground/15 bg-primary/[0.025] px-4 pb-32 pt-20 sm:px-6 lg:px-8 lg:pb-40 lg:pt-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-28 xl:gap-32">
        <div className="relative z-20">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
            {dict.eyebrow}
          </p>
          <h2 className="mt-4 text-5xl font-black uppercase leading-none tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            {dict.heading}
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
            {dict.subtext}
          </p>
        </div>

        <div className="journey-list relative z-10">
          <div className="grid lg:pl-6">
            {[...(dict.entries as ExperienceEntry[])]
              .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
              .map((experience) => {
              const organizations = experience.companies ?? [
                { name: experience.company, logo: experience.logo, url: experience.url },
              ];

              return (
                <article
                  key={`${experience.period}-${experience.title}`}
                  className="journey-row invisible relative min-h-48 border-b border-foreground/15 py-7 first:pt-0 last:border-b-0"
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase leading-5 tracking-[0.16em] text-foreground/70">
                      {experience.period}
                    </p>
                    <h3 className="mt-2 text-xl font-black leading-tight tracking-[-0.025em] sm:text-2xl">
                      {experience.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      {organizations.map((organization) => (
                        <a
                          key={organization.name}
                          href={organization.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/organization inline-flex items-center gap-2.5 rounded-md border border-foreground/10 bg-background/60 py-1.5 pl-1.5 pr-2.5 text-sm font-bold text-primary transition-colors hover:border-primary/30 hover:text-vermillion"
                        >
                          {organization.logo && (
                            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded bg-white p-1 shadow-sm">
                              <Image
                                src={organization.logo}
                                alt=""
                                aria-hidden="true"
                                width={36}
                                height={36}
                                sizes="36px"
                                className="h-full w-full object-contain"
                              />
                            </span>
                          )}
                          {organization.name}
                          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                        </a>
                      ))}
                    </div>
                    {experience.location && (
                      <p className="mt-2 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/55">
                        {experience.location}
                      </p>
                    )}
                    <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
                      {experience.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-sans text-[9px] font-medium uppercase tracking-[0.12em] text-foreground/55">
                      {experience.tags.slice(0, 5).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    {experience.certificateUrl && experience.certificateLabel && (
                      <Link
                        href={experience.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/30 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/10"
                      >
                        {experience.certificateLabel}
                        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </Link>
                    )}
                    {(experience.responsibilities?.length ||
                      experience.institutions ||
                      experience.linkedRealisations?.length ||
                      experience.linkedCompetences?.length) && (
                      <details className="group mt-5 border-t border-foreground/15 pt-4">
                        <summary className="cursor-pointer list-none font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-primary marker:hidden">
                          <span className="inline-flex items-center gap-2">
                            <span className="transition-transform group-open:rotate-45">+</span>
                            {dict.detailsLabel}
                          </span>
                        </summary>
                        <div className="mt-4 grid gap-5 rounded-lg border border-foreground/15 bg-background/65 p-4 text-sm">
                          {experience.responsibilities && (
                            <div>
                              <p className="editorial-index mb-2">
                                {dict.responsibilitiesLabel}
                              </p>
                              <ul className="grid gap-2 text-muted-foreground">
                                {experience.responsibilities.map((responsibility) => (
                                  <li key={responsibility} className="flex gap-2 leading-6">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vermillion" />
                                    {responsibility}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {experience.institutions && (
                            <p className="leading-6 text-muted-foreground">
                              {experience.institutions}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {experience.linkedRealisations?.map((linkedSlug) => {
                              return (
                                <Link
                                  key={linkedSlug}
                                  href={`/${locale}/realisations/${linkedSlug}`}
                                  className="rounded-full border border-primary/30 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/10"
                                >
                                  {linkedRealisationTitles[loc][linkedSlug] ?? linkedSlug}
                                </Link>
                              );
                            })}
                            {experience.linkedCompetences?.map((linkedSlug) => {
                              return (
                                <Link
                                  key={linkedSlug}
                                  href={`/${locale}/competences/${linkedSlug}`}
                                  className="rounded-full border border-vermillion/30 px-3 py-1.5 text-xs font-bold text-vermillion transition-colors hover:bg-vermillion/10"
                                >
                                  {linkedCompetenceTitles[loc][linkedSlug] ?? linkedSlug}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </details>
                    )}
                  </div>
                </article>
              );
              })}
          </div>
        </div>
      </div>

      <Image
        src="/images/decorative/pixel-samurai.png"
        alt=""
        aria-hidden="true"
        width={1254}
        height={1254}
        className="journey-samurai invisible pointer-events-none absolute -bottom-2 -left-20 z-20 hidden h-72 w-72 lg:block xl:-left-28 xl:h-80 xl:w-80"
        sizes="(min-width: 1280px) 320px, 288px"
      />
      <Image
        src="/images/decorative/pixel-ninja-hanging.png"
        alt=""
        aria-hidden="true"
        width={1024}
        height={1536}
        className="journey-hanging-ninja invisible pointer-events-none absolute -right-16 top-6 z-20 hidden h-48 w-32 xl:block"
        sizes="128px"
      />
      <div className="absolute inset-x-0 bottom-[-1px] z-0 opacity-95">
        <EditorialWave className="h-28 sm:h-32 lg:h-36" />
      </div>
      <UkiyoeCrest
        flip
        className="pointer-events-none absolute -bottom-2 -right-20 z-[1] hidden h-56 w-80 opacity-90 md:block"
      />
    </section>
  );
}
