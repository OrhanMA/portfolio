import { LinkedText } from "@/components/linked-text";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parseLocale, type Locale } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import {
  getCompetenceBySlug,
  competences,
  competenceLevelLabels,
} from "@/lib/competences";
import { getRealisationBySlug } from "@/lib/realisations";
import { resolveRealisationLinks } from "@/lib/portfolio-links";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { getLocalizedPageContext } from "../../route-context";
import { RouteStructuredData } from "@/components/route-structured-data";

const romanNumerals = ["I", "II", "III", "IV", "V", "VI"] as const;

function formatRomanIndex(index: number) {
  return romanNumerals[index - 1] ?? String(index);
}

function formatAlphabeticalIndex(index: number) {
  return `${String.fromCharCode(96 + index)}.`;
}

function EditorialText({
  text,
  locale,
  currentPath,
}: {
  text: string;
  locale: Locale;
  currentPath: string;
}) {
  return (
    <div
    >
      {text.split(/\n{2,}/).map((paragraph) => (
        <p key={paragraph.slice(0, 80)}><LinkedText locale={locale} currentPath={currentPath}>{paragraph}</LinkedText></p>
      ))}
    </div>
  );
}

function SectionHeading({ index, children }: { index: number; children: ReactNode }) {
  return (
    <div>
      <span
        aria-hidden="true"
        data-section-index
      >
        {formatRomanIndex(index)}
      </span>
      <h2>
        {children}
      </h2>
    </div>
  );
}

function BackToContents({ label }: { label: string }) {
  return (
    <div>
      <a
        href="#competence-contents"
      >
        {label}
      </a>
    </div>
  );
}

export async function generateStaticParams() {
  return competences.map((competence) => ({ slug: competence.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const competence = getCompetenceBySlug(slug);
  const loc = parseLocale(locale);

  if (!competence || !loc) {
    return {};
  }

  return createLocalizedMetadata({
    locale: loc,
    pathname: `/competences/${slug}`,
    title: `${competence.title[loc]} | ${locale === "fr" ? "Compétences" : "Skills"} | Orhan Madi Assani`,
    description: competence.definition[loc].split(".")[0] + ".",
  });
}

export default async function CompetenceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const competence = getCompetenceBySlug(slug);

  if (!competence) {
    notFound();
  }

  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);
  const linkedRealisationLinks = resolveRealisationLinks(
    competence.linkedRealisations,
    loc,
  );
  const linkedRealisations = competence.linkedRealisations.map(
    (realisationSlug) => {
      const realisation = getRealisationBySlug(realisationSlug);

      if (!realisation) {
        throw new Error(
          `Unknown realisation ${realisationSlug} linked from competence ${competence.slug}`,
        );
      }

      return realisation;
    },
  );
  const sections = [
    { id: "definition", title: dict.competencesPage.definitionHeading },
    { id: "evidence", title: dict.competencesPage.proofsHeading },
    {
      id: "case-studies",
      title: dict.competencesPage.caseStudiesHeading,
    },
    { id: "self-assessment", title: dict.competencesPage.selfCritiqueHeading },
    { id: "growth", title: dict.competencesPage.evolutionHeading },
    {
      id: "linked-achievements",
      title: dict.competencesPage.linkedRealisationsHeading,
    },
  ];

  return (
    <>
      <RouteStructuredData
        locale={loc}
        pathname={`/${loc}/competences/${slug}`}
      />
      <EditorialPageHeader
        className="competence-page-header"
        eyebrow={dict.nav.competences}
        title={competence.title[loc]}
        description={<LinkedText locale={loc} currentPath={`/competences/${slug}`}>{`${competence.definition[loc].split(".")[0]}.`}</LinkedText>}
        leading={
          <Link
            href={`/${locale}/competences`}
          >
            <ArrowLeft />
            {dict.competencesPage.backToCompetences}
          </Link>
        }
        meta={
          <div>
            <Badge variant="outline">
              {competence.type === "human"
                ? dict.competencesPage.humanSkills
                : dict.competencesPage.technicalSkills}
            </Badge>
            <Badge variant="secondary">
              {competenceLevelLabels[competence.level][loc]}
            </Badge>
          </div>
        }
        aside={
          <aside>
            <p>{dict.competencesPage.levelLabel}</p>
            <div>
              <div>
                <span>
                  {competence.radarValue}
                </span>
                <span>
                  /100
                </span>
              </div>
              <div
                role="meter"
                aria-label={dict.competencesPage.levelLabel}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={competence.radarValue}
              >
                <div
                />
              </div>
              <p>
                {competenceLevelLabels[competence.level][loc]}
              </p>
            </div>
          </aside>
        }
      />

      <section data-competence-article>
        <div>
          <aside id="competence-contents">
            <nav
              aria-label={dict.competencesPage.contentsHeading}
            >
              <p>
                {dict.competencesPage.contentsHeading}
              </p>
              <p>
                {dict.competencesPage.contentsSubtext}
              </p>
              <ol>
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                    >
                      <span
                        aria-hidden="true"
                      >
                        {formatRomanIndex(index + 1)}
                      </span>
                      <span>
                        {section.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div>
            <Card
              id="definition"
            >
              <CardHeader>
                <CardTitle>
                  <SectionHeading index={1}>
                    {dict.competencesPage.definitionHeading}
                  </SectionHeading>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <EditorialText locale={loc} currentPath={`/competences/${slug}`} text={competence.definition[loc]} />
                  <article>
                    <div>
                      <span
                        aria-hidden="true"
                        data-subsection-index
                      >
                        {formatAlphabeticalIndex(1)}
                      </span>
                      <div>
                        <span>{dict.competencesPage.relatedNewsHeading}</span>
                        <time dateTime={competence.relatedNews.date}>
                          {competence.relatedNews.dateLabel[loc]}
                        </time>
                      </div>
                    </div>
                    <h3>
                      <LinkedText locale={loc} currentPath={`/competences/${slug}`}>{competence.relatedNews.title[loc]}</LinkedText>
                    </h3>
                    <p>
                      <LinkedText locale={loc} currentPath={`/competences/${slug}`}>{competence.relatedNews.summary[loc]}</LinkedText>
                    </p>
                    <a
                      href={competence.relatedNews.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {dict.competencesPage.newsSourceLabel}{" "}
                      {competence.relatedNews.source}
                      <ExternalLink aria-hidden="true" />
                    </a>
                  </article>
                  <BackToContents label={dict.competencesPage.backToContents} />
                </div>
              </CardContent>
            </Card>

            <Card
              id="evidence"
            >
              <CardHeader>
                <CardTitle>
                  <SectionHeading index={2}>
                    {dict.competencesPage.proofsHeading}
                  </SectionHeading>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  {competence.anecdotes.map((anecdote, index) => {
                    const linkedRealisation = anecdote.linkedRealisation
                      ? resolveRealisationLinks(
                          [anecdote.linkedRealisation],
                          loc,
                        ).at(0)
                      : undefined;

                    return (
                    <article
                      key={anecdote.title[loc]}
                    >
                      <div>
                        <span
                          aria-hidden="true"
                          data-subsection-index
                        >
                          {formatAlphabeticalIndex(index + 1)}
                        </span>
                        <div>
                          <h3>
                            {anecdote.linkedRealisation ? <Link href={`/${loc}/realisations/${anecdote.linkedRealisation}`}>{anecdote.title[loc]}</Link> : <LinkedText locale={loc} currentPath={`/competences/${slug}`}>{anecdote.title[loc]}</LinkedText>}
                          </h3>
                          <div>
                            <EditorialText locale={loc} currentPath={`/competences/${slug}`} text={anecdote.content[loc]} />
                          </div>
                          <div>
                            <p>
                              <span>
                                {dict.competencesPage.resultLabel}
                              </span>{" "}
                              — <LinkedText locale={loc} currentPath={`/competences/${slug}`}>{anecdote.result[loc]}</LinkedText>
                            </p>
                          </div>
                          {anecdote.linkedRealisation && (
                            <Link
                              href={`/${locale}/realisations/${anecdote.linkedRealisation}`}
                            >
                              {linkedRealisation?.title}
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                    );
                  })}
                </div>
                <div>
                  <BackToContents label={dict.competencesPage.backToContents} />
                </div>
              </CardContent>
            </Card>

            <Card id="case-studies" data-competence-case-studies>
              <CardHeader>
                <CardTitle>
                  <SectionHeading index={3}>
                    {dict.competencesPage.caseStudiesHeading}
                  </SectionHeading>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p data-competence-case-studies-intro>
                  {dict.competencesPage.caseStudiesIntro}
                </p>
                <div>
                  {linkedRealisations.map((realisation, index) => (
                    <article key={realisation.slug}>
                      <div>
                        <span aria-hidden="true" data-subsection-index>
                          {formatAlphabeticalIndex(index + 1)}
                        </span>
                        <div>
                          <h3>
                            <Link href={`/${loc}/realisations/${realisation.slug}`}>
                              {realisation.title[loc]}
                            </Link>
                          </h3>
                          <dl data-competence-case-study-summary>
                            <div>
                              <dt>{dict.competencesPage.caseStudyContextLabel}</dt>
                              <dd>
                                <LinkedText
                                  locale={loc}
                                  currentPath={`/competences/${slug}`}
                                >
                                  {realisation.summary.context[loc]}
                                </LinkedText>
                              </dd>
                            </div>
                            <div>
                              <dt>{dict.competencesPage.caseStudyRoleLabel}</dt>
                              <dd>
                                <LinkedText
                                  locale={loc}
                                  currentPath={`/competences/${slug}`}
                                >
                                  {realisation.summary.role[loc]}
                                </LinkedText>
                              </dd>
                            </div>
                            <div>
                              <dt>{dict.competencesPage.caseStudyResultLabel}</dt>
                              <dd>
                                <LinkedText
                                  locale={loc}
                                  currentPath={`/competences/${slug}`}
                                >
                                  {realisation.summary.result[loc]}
                                </LinkedText>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <div>
                  <BackToContents label={dict.competencesPage.backToContents} />
                </div>
              </CardContent>
            </Card>

            <Card
              id="self-assessment"
            >
              <CardHeader>
                <CardTitle>
                  <SectionHeading index={4}>
                    {dict.competencesPage.selfCritiqueHeading}
                  </SectionHeading>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl>
                  {[
                    {
                      label: dict.competencesPage.levelLabel,
                      value: competence.selfCritique.level[loc],
                    },
                    {
                      label: dict.competencesPage.importanceLabel,
                      value: competence.selfCritique.importance[loc],
                    },
                    ...(competence.selfCritique.acquisitionSpeed
                      ? [
                          {
                            label: dict.competencesPage.acquisitionLabel,
                            value: competence.selfCritique.acquisitionSpeed[loc],
                          },
                        ]
                      : []),
                    {
                      label: dict.competencesPage.adviceLabel,
                      value: competence.selfCritique.advice[loc],
                    },
                  ].map((item, index) => (
                    <div
                      key={item.label}
                    >
                      <span
                        aria-hidden="true"
                        data-subsection-index
                      >
                        {formatAlphabeticalIndex(index + 1)}
                      </span>
                      <dt>{item.label}</dt>
                      <dd>
                        <EditorialText locale={loc} currentPath={`/competences/${slug}`} text={item.value} />
                      </dd>
                    </div>
                  ))}
                </dl>
                <div>
                  <BackToContents label={dict.competencesPage.backToContents} />
                </div>
              </CardContent>
            </Card>

            <Card
              id="growth"
            >
              <CardHeader>
                <CardTitle>
                  <SectionHeading index={5}>
                    {dict.competencesPage.evolutionHeading}
                  </SectionHeading>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl>
                  {[
                    {
                      label: dict.competencesPage.goalLabel,
                      value: competence.evolution.goal[loc],
                    },
                    {
                      label: dict.competencesPage.trainingLabel,
                      value: competence.evolution.training[loc],
                    },
                  ].map((item, index) => (
                    <div
                      key={item.label}
                    >
                      <span
                        aria-hidden="true"
                        data-subsection-index
                      >
                        {formatAlphabeticalIndex(index + 1)}
                      </span>
                      <dt>{item.label}</dt>
                      <dd>
                        <EditorialText locale={loc} currentPath={`/competences/${slug}`} text={item.value} />
                      </dd>
                    </div>
                  ))}
                </dl>
                <div>
                  <BackToContents label={dict.competencesPage.backToContents} />
                </div>
              </CardContent>
            </Card>

            {competence.linkedRealisations.length > 0 && (
              <Card
                id="linked-achievements"
              >
                <CardHeader>
                  <CardTitle>
                      <SectionHeading index={6}>
                      {dict.competencesPage.linkedRealisationsHeading}
                    </SectionHeading>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    {linkedRealisationLinks.map(({ slug: realisationSlug, title }, index) => {
                      return (
                        <li key={realisationSlug}>
                          <Link
                            href={`/${locale}/realisations/${realisationSlug}`}
                          >
                            <span
                              aria-hidden="true"
                              data-subsection-index
                            >
                              {formatAlphabeticalIndex(index + 1)}
                            </span>
                            <span>
                              {title}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
