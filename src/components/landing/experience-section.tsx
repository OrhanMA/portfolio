import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ExperienceDetails } from "@/components/landing/experience-details";
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
    "migration-odoo-v16-v19": "Migration d'un ERP d'entreprise d'Odoo 16 vers Odoo 19",
    "modules-metier-odoo": "Développement de modules métier pour un ERP",
    "refonte-site-corporate": "Refonte d'un site corporate Next.js",
    "app-trajectoires-de-vie": "Développement d'une application web de trajectoires de vie",
    "portfolio-professionnel": "Conception d'un portfolio professionnel",
  },
  en: {
    "migration-odoo-v16-v19": "Enterprise ERP migration from Odoo 16 to Odoo 19",
    "modules-metier-odoo": "Business module development for an ERP",
    "refonte-site-corporate": "Next.js corporate website redesign",
    "app-trajectoires-de-vie": "Development of a web application for mapping life trajectories",
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
      className="landing-deferred landing-deferred-experience border-y border-border bg-muted/35 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {dict.eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            {dict.heading}
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
            {dict.subtext}
          </p>
        </div>

        <div className="journey-list">
          <div className="grid border-t border-border">
            {[...(dict.entries as ExperienceEntry[])]
              .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
              .map((experience) => {
              const organizations = experience.companies ?? [
                { name: experience.company, logo: experience.logo, url: experience.url },
              ];

              return (
                <article
                  key={`${experience.period}-${experience.title}`}
                  className="journey-row invisible border-b border-border py-8"
                >
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">
                      {experience.period}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold leading-tight tracking-[-0.02em] sm:text-2xl">
                      {experience.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      {organizations.map((organization) => (
                        <a
                          key={organization.name}
                          href={organization.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/organization inline-flex items-center gap-2.5 border border-border bg-background py-1.5 pl-1.5 pr-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        >
                          {organization.logo && (
                            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden bg-white p-1">
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
                        className="mt-4 inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-muted"
                      >
                        {experience.certificateLabel}
                        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </Link>
                    )}
                    {(experience.responsibilities?.length ||
                      experience.institutions ||
                      experience.linkedRealisations?.length ||
                      experience.linkedCompetences?.length) && (
                      <ExperienceDetails label={dict.detailsLabel}>
                        <div className="grid gap-5 border border-border bg-background p-4 text-sm">
                          {experience.responsibilities && (
                            <div>
                              <p className="editorial-index mb-2">
                                {dict.responsibilitiesLabel}
                              </p>
                              <ul className="grid gap-2 text-muted-foreground">
                                {experience.responsibilities.map((responsibility) => (
                                  <li key={responsibility} className="flex gap-2 leading-6">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
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
                                  className="border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-muted"
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
                                  className="border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-muted"
                                >
                                  {linkedCompetenceTitles[loc][linkedSlug] ?? linkedSlug}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </ExperienceDetails>
                    )}
                  </div>
                </article>
              );
              })}
          </div>
        </div>
      </div>

    </section>
  );
}
