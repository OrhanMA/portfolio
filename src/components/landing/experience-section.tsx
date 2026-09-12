import { LinkedText } from "@/components/linked-text";
import { TopicLink } from "@/components/topic-link";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ExperienceDetails } from "@/components/landing/experience-details";
import type { Locale } from "@/lib/i18n";
import { sortTimelineEntries } from "@/lib/experience";
import {
  resolveCompetenceLinks,
  resolveRealisationLinks,
} from "@/lib/portfolio-links";
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
          <p>
            {dict.orderingLabel}
          </p>
        </div>

        <div>
          <ol aria-labelledby="experience-heading">
            {experiences.map((experience, index) => {
              const training = experiences.find((entry) => entry.id === experience.trainingId);
              const realisationLinks = resolveRealisationLinks(
                experience.linkedRealisations,
                loc,
              );
              const competenceLinks = resolveCompetenceLinks(
                experience.linkedCompetences,
                loc,
              );
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
                >
                  {!isLast && (
                    <span
                      aria-hidden="true"
                    />
                  )}
                  <span
                    aria-hidden="true"
                  />
                  <article
                  >
                    <p>
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
                            <span>
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
                    <div>
                      {experience.tags.slice(0, 5).map((tag) => (
                        <TopicLink key={tag} label={tag} locale={locale} />
                      ))}
                    </div>
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
                    {(experience.responsibilities?.length ||
                      experience.institutions ||
                      experience.linkedRealisations?.length ||
                      experience.linkedCompetences?.length) && (
                      <ExperienceDetails label={dict.detailsLabel}>
                        <div>
                          {experience.responsibilities && (
                            <div>
                              <p>
                                {dict.responsibilitiesLabel}
                              </p>
                              <ul>
                                {experience.responsibilities.map((responsibility) => (
                                  <li key={responsibility}>
                                    <span />
                                    <LinkedText locale={locale}>{responsibility}</LinkedText>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {experience.institutions && (
                            <p>
                              <LinkedText locale={locale}>{experience.institutions}</LinkedText>
                            </p>
                          )}
                          <div>
                            {realisationLinks.map(({ slug: linkedSlug, title }) => {
                              return (
                                <Link
                                  key={linkedSlug}
                                  href={`/${locale}/realisations/${linkedSlug}`}
                                >
                                  {title}
                                </Link>
                              );
                            })}
                            {competenceLinks.map(({ slug: linkedSlug, title }) => {
                              return (
                                <Link
                                  key={linkedSlug}
                                  href={`/${locale}/competences/${linkedSlug}`}
                                >
                                  {title}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </ExperienceDetails>
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
