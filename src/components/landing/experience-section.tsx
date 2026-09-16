import { LinkedText } from "@/components/linked-text";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { sortTimelineEntries } from "@/lib/experience";
import { resolveCompetenceLinks } from "@/lib/portfolio-links";
import type { Dictionary } from "@/app/[locale]/dictionaries";

type ExperienceEntry = {
  id: string;
  startDate: string;
  endDate: string | null;
  period: string;
  title: string;
  company: string;
  logo?: string;
  url: string;
  companies?: { name: string; logo?: string; url: string }[];
  description: string;
  location?: string;
  trainingId?: string;
  institutions?: string;
  certificateUrl?: string;
  certificateLabel?: string;
  responsibilities?: string[];
  linkedRealisations?: string[];
  linkedCompetences?: string[];
  tags: string[];
};

export function ExperienceSection({
  locale = "fr",
  dict,
}: {
  locale?: Locale;
  dict: Dictionary["experience"];
}) {
  const loc = locale;
  const experiences = sortTimelineEntries(dict.entries as ExperienceEntry[]);

  return (
    <section
      id="parcours"
    >
      <div>
        <div>
          <p>
            {dict.eyebrow}
          </p>
          <h2
            id="experience-heading"
          >
            {dict.heading}
          </h2>
          <p>
            {dict.subtext}
          </p>
        </div>

        <div>
          <ol aria-labelledby="experience-heading">
            {experiences.map((experience, index) => {
              const training = experiences.find((entry) => entry.id === experience.trainingId);
              const primaryCompetence = resolveCompetenceLinks(
                experience.linkedCompetences?.slice(0, 1),
                loc,
              )[0];
              const organizations = experience.companies ?? [
                {
                  name: experience.company,
                  logo: experience.logo,
                  url: experience.url,
                },
              ];
              const isLast = index === experiences.length - 1;

              return (
                <li
                  key={experience.id}
                  id={`experience-${experience.id}`}
                  data-start-date={experience.startDate}
                  data-end-date={experience.endDate ?? "present"}
                  className="journey-row scroll-mt-28"
                >
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="journey-path"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="journey-marker"
                  />
                  <article
                  >
                    <p className="journey-period">
                      {experience.period}
                    </p>
                    <h3>
                      <Link href={`/${locale}/parcours/${experience.id}`}>{experience.title}</Link>
                    </h3>
                    <div>
                      {organizations.map((organization) => (
                        <Link
                          key={organization.name}
                          href={`/${locale}/parcours/${experience.id}`}
                        >
                          {organization.logo && (
                            <span data-company-logo>
                              <Image
                                src={organization.logo}
                                alt=""
                                aria-hidden="true"
                                width={36}
                                height={36}
                                sizes="36px"
                              />
                            </span>
                          )}
                          {organization.name}
                          <ArrowUpRight aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                    {experience.location && (
                      <p>
                        {experience.location}
                      </p>
                    )}
                    <p>
                      <LinkedText locale={locale}>{experience.description}</LinkedText>
                    </p>
                    {training && (
                      <Link
                        href={`/${locale}/parcours/${training.id}`}
                      >
                        {training.company} — {training.title}
                      </Link>
                    )}
                    {primaryCompetence && (
                      <Link
                        href={`/${locale}/competences/${primaryCompetence.slug}`}
                        className="experience-competence-link"
                      >
                        {dict.viewCompetence} {primaryCompetence.title}
                        <ArrowUpRight aria-hidden="true" />
                      </Link>
                    )}
                    {experience.certificateUrl && experience.certificateLabel && (
                      <Link
                        href={experience.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {experience.certificateLabel}
                        <ArrowUpRight aria-hidden="true" />
                      </Link>
                    )}
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

    </section>
  );
}
