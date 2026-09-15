import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { LinkedText } from "@/components/linked-text";
import { PageEndCta } from "@/components/page-end-cta";
import { RouteStructuredData } from "@/components/route-structured-data";
import { TopicLink } from "@/components/topic-link";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import { createLocalizedMetadata } from "@/lib/metadata";
import { sortTimelineEntries } from "@/lib/experience";
import type { Locale } from "@/lib/i18n";
import { getLocalizedPageContext } from "../route-context";

type CareerEntry = {
  id: string;
  type: "experience" | "education";
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
  tags: string[];
};

type CareerPageCopy = Dictionary["parcoursPage"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);

  return createLocalizedMetadata({
    locale: loc,
    pathname: "/parcours",
    title: dict.parcoursPage.pageTitle,
    description: dict.parcoursPage.pageDescription,
  });
}

function organizationInitials(name: string) {
  return name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function organizationList(entry: CareerEntry) {
  return entry.companies ?? [
    {
      name: entry.company,
      logo: entry.logo,
      url: entry.url,
    },
  ];
}

function CareerTrack({
  id,
  kind,
  title,
  description,
  entries,
  locale,
  copy,
}: {
  id: string;
  kind: CareerEntry["type"];
  title: string;
  description: string;
  entries: CareerEntry[];
  locale: Locale;
  copy: CareerPageCopy;
}) {
  return (
    <section
      id={id}
      data-career-track={kind}
      aria-labelledby={`${id}-heading`}
    >
      <div data-career-track-heading>
        <p>{kind === "experience" ? "01" : "02"}</p>
        <div>
          <h2 id={`${id}-heading`}>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <ol>
        {entries.map((entry) => (
          <li
            key={entry.id}
            id={`experience-${entry.id}`}
            data-career-entry
            data-career-entry-kind={kind}
          >
            <article>
              <p data-career-period>{entry.period}</p>
              <h3>
                <Link href={`/${locale}/parcours/${entry.id}`}>
                  {entry.title}
                </Link>
              </h3>

              <div data-career-organizations>
                {organizationList(entry).map((organization) => (
                  <a
                    key={`${entry.id}-${organization.name}`}
                    href={organization.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span data-career-logo aria-hidden="true">
                      {organization.logo ? (
                        <Image
                          src={organization.logo}
                          alt=""
                          width={40}
                          height={40}
                          sizes="40px"
                        />
                      ) : (
                        organizationInitials(organization.name)
                      )}
                    </span>
                    <span>{organization.name}</span>
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                ))}
              </div>

              {entry.location && <p data-career-location>{entry.location}</p>}
              <p data-career-summary>
                <LinkedText locale={locale} currentPath={`/parcours/${entry.id}`}>
                  {entry.description}
                </LinkedText>
              </p>

              <ul data-career-tags aria-label={title}>
                {entry.tags.slice(0, 4).map((tag) => (
                  <li key={tag}>
                    <TopicLink
                      label={tag}
                      locale={locale}
                      currentPath={`/parcours/${entry.id}`}
                    />
                  </li>
                ))}
              </ul>

              <Link
                href={`/${locale}/parcours/${entry.id}`}
                data-career-detail
              >
                {copy.viewDetail}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default async function ParcoursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);
  const entries = sortTimelineEntries(
    dict.experience.entries as CareerEntry[],
  );
  const experiences = entries.filter(({ type }) => type === "experience");
  const education = entries.filter(({ type }) => type === "education");

  return (
    <>
      <RouteStructuredData locale={loc} pathname={`/${loc}/parcours`} />
      <EditorialPageHeader
        eyebrow={dict.experience.eyebrow}
        title={dict.parcoursPage.heading}
        description={dict.parcoursPage.subtext}
      />

      <section
        data-career-timeline
        aria-labelledby="career-timeline-heading"
      >
        <div>
          <div data-career-timeline-intro>
            <h2 id="career-timeline-heading">{dict.experience.heading}</h2>
          </div>

          <div data-career-columns>
            <CareerTrack
              id="career-experiences"
              kind="experience"
              title={dict.parcoursPage.experiencesHeading}
              description={dict.parcoursPage.experiencesSubtext}
              entries={experiences}
              locale={loc}
              copy={dict.parcoursPage}
            />
            <CareerTrack
              id="career-education"
              kind="education"
              title={dict.parcoursPage.educationHeading}
              description={dict.parcoursPage.educationSubtext}
              entries={education}
              locale={loc}
              copy={dict.parcoursPage}
            />
          </div>
        </div>
      </section>

      <PageEndCta
        id="journey-discovery"
        title={dict.parcoursPage.discoveryHeading}
        description={dict.parcoursPage.discoveryText}
        links={[
          {
            href: `/${loc}/competences`,
            label: dict.parcoursPage.discoverySkills,
          },
          {
            href: `/${loc}/realisations`,
            label: dict.parcoursPage.discoveryAchievements,
          },
        ]}
      />
    </>
  );
}
