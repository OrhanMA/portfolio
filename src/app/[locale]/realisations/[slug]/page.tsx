import { LinkedText } from "@/components/linked-text";
import { TopicLink } from "@/components/topic-link";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { parseLocale } from "@/lib/i18n";
import { findLinkedExperiences, requireLinkedExperience } from "@/lib/experience";
import { createLocalizedMetadata } from "@/lib/metadata";
import { getRealisationBySlug, realisations } from "@/lib/realisations";
import { resolveCompetenceLinks } from "@/lib/portfolio-links";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { RealisationArticleContent } from "@/components/realisation-article-content";
import { YouTubeFacade } from "@/components/youtube-facade";
import { actionLinkClassName } from "@/lib/styles";
import { RouteStructuredData } from "@/components/route-structured-data";
import { getLocalizedPageContext } from "../../route-context";

export async function generateStaticParams() {
  return realisations.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const realisation = getRealisationBySlug(slug);
  const loc = parseLocale(locale);

  if (!realisation || !loc) {
    return {};
  }

  return createLocalizedMetadata({
    locale: loc,
    pathname: `/realisations/${slug}`,
    title: `${realisation.title[loc]} | ${locale === "fr" ? "Réalisations" : "Achievements"} | Orhan Madi Assani`,
    description: realisation.shortDescription[loc],
  });
}

export default async function RealisationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const realisation = getRealisationBySlug(slug);

  if (!realisation) {
    notFound();
  }

  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);
  const linkedExperiences = findLinkedExperiences(dict.experience.entries, slug);
  const primaryLinkedExperience = requireLinkedExperience(
    dict.experience.entries,
    slug,
  );
  const linkedCompetenceLinks = resolveCompetenceLinks(
    realisation.linkedCompetences,
    loc,
  );
  const contentSections = [
    {
      id: "presentation",
      title: dict.realisationsPage.presentationHeading,
      text: realisation.presentation[loc],
    },
    {
      id: "objectives",
      title: dict.realisationsPage.objectivesHeading,
      text: realisation.objectives[loc],
    },
    ...(realisation.risks
      ? [
          {
            id: "risks",
            title: dict.realisationsPage.risksHeading,
            text: realisation.risks[loc],
          },
        ]
      : []),
    {
      id: "steps",
      title: dict.realisationsPage.stepsHeading,
      text: realisation.steps[loc],
    },
    {
      id: "actors",
      title: dict.realisationsPage.actorsHeading,
      text: realisation.actors[loc],
    },
    {
      id: "results",
      title: dict.realisationsPage.resultsHeading,
      text: realisation.results[loc],
    },
    {
      id: "aftermath",
      title: dict.realisationsPage.aftermathHeading,
      text: realisation.aftermath[loc],
    },
    {
      id: "critique",
      title: dict.realisationsPage.critiqueHeading,
      text: realisation.critique[loc],
    },
  ];

  return (
    <>
      <RouteStructuredData
        locale={loc}
        pathname={`/${loc}/realisations/${slug}`}
      />
      <div>
      <EditorialPageHeader
        compact
        eyebrow={dict.nav.realisations}
        title={realisation.title[loc]}
        description={<LinkedText locale={loc} currentPath={`/realisations/${slug}`}>{realisation.shortDescription[loc]}</LinkedText>}
        leading={
          <Link
            href={`/${locale}/realisations`}
          >
            <ArrowLeft />
            {dict.realisationsPage.backToRealisations}
          </Link>
        }
        meta={
          <div>
            <Link href={`/${loc}/parcours/${primaryLinkedExperience.id}`}>
              {realisation.context[loc]}
            </Link>
            {realisation.tags.map((tag) => (
              <TopicLink key={tag} label={tag} locale={loc} currentPath={`/realisations/${slug}`} />
            ))}
          </div>
        }
        aside={
          <aside>
            <p>
              {dict.realisationsPage.context}
            </p>
            <div>
              <div>
                <p>
                  {dict.realisationsPage.context}
                </p>
                <p>{realisation.context[loc]}</p>
              </div>
              {linkedExperiences.length > 0 && (
                <nav aria-label={dict.realisationsPage.linkedExperiencesHeading}>
                  <p>
                    {dict.realisationsPage.linkedExperiencesHeading}
                  </p>
                  <ul>
                    {linkedExperiences.map((experience) => (
                      <li key={experience.id}>
                        <Link
                          href={`/${loc}/#experience-${experience.id}`}
                        >
                          {experience.company} — {experience.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <div>
                <p>
                  Stack
                </p>
                <div>
                  {realisation.tags.map((tag) => (
                    <TopicLink key={tag} label={tag} locale={loc} currentPath={`/realisations/${slug}`} />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        }
      />

      <section>
        <div>
          {realisation.media && realisation.media.length > 0 && (
            <section aria-labelledby="visual-proof-heading">
              <div>
                <h2
                  id="visual-proof-heading"
                >
                  {dict.realisationsPage.mediaHeading}
                </h2>
                <p>
                  {dict.realisationsPage.mediaSubtext}
                </p>
              </div>
              <div>
                {realisation.media.map((item) => (
                  <figure
                    key={item.src}
                  >
                    <div>
                      {item.type === "image" ? (
                        <Image
                          src={item.src}
                          alt={item.title[loc]}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                        />
                      ) : (
                        <YouTubeFacade
                          src={item.src}
                          title={item.title[loc]}
                          locale={loc}
                        />
                      )}
                    </div>
                    <figcaption>
                      <p>{item.title[loc]}</p>
                      <p>
                        {item.description[loc]}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          <div>
            <aside id="realisation-contents">
              <nav
                aria-label={dict.realisationsPage.contentsHeading}
              >
                <p>
                  {dict.realisationsPage.contentsHeading}
                </p>
                <p>
                  {dict.realisationsPage.contentsSubtext}
                </p>
                <ol>
                  {contentSections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                      >
                        <span
                          aria-hidden="true"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>
                          {section.title}
                        </span>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#linked-competences"
                    >
                      <span
                        aria-hidden="true"
                      >
                        {String(contentSections.length + 1).padStart(2, "0")}
                      </span>
                      <span>
                        {dict.realisationsPage.linkedCompetencesHeading}
                      </span>
                    </a>
                  </li>
                </ol>
              </nav>
            </aside>

            <div>
              {contentSections.map((section, index) => (
                <section
                  id={section.id}
                  key={section.id}
                  aria-labelledby={`${section.id}-heading`}
                  className="realisation-content-deferred"
                >
                  <header>
                    <div>
                      <p>
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h2
                        id={`${section.id}-heading`}
                      >
                        {section.title}
                      </h2>
                    </div>
                  </header>
                  <div>
                    <RealisationArticleContent text={section.text} locale={loc} currentPath={`/realisations/${slug}`} />
                    <div>
                      <a
                        href="#realisation-contents"
                      >
                        {dict.realisationsPage.backToContents}
                      </a>
                    </div>
                  </div>
                </section>
              ))}

              <section
                id="linked-competences"
                aria-labelledby="linked-competences-heading"
              >
                <div>
                  <p>
                    {String(contentSections.length + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h2
                      id="linked-competences-heading"
                    >
                      {dict.realisationsPage.linkedCompetencesHeading}
                    </h2>
                    <div>
                      {linkedCompetenceLinks.map(({ slug: compSlug, title }) => {
                        return (
                          <Link
                            key={compSlug}
                            href={`/${locale}/competences/${compSlug}`}
                          >
                            {title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
