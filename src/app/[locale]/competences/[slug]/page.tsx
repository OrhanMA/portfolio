import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parseLocale } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import {
  getCompetenceBySlug,
  competences,
  competenceLevelLabels,
} from "@/lib/competences";
import { getRealisationBySlug } from "@/lib/realisations";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { getLocalizedPageContext } from "../../route-context";

const romanNumerals = ["I", "II", "III", "IV", "V"] as const;

function formatRomanIndex(index: number) {
  return romanNumerals[index - 1] ?? String(index);
}

function formatAlphabeticalIndex(index: number) {
  return `${String.fromCharCode(96 + index)}.`;
}

function EditorialText({
  text,
  compact = false,
}: {
  text: string;
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "space-y-3 leading-7 text-muted-foreground"
          : "space-y-5 text-[1.025rem] leading-[1.85] text-muted-foreground sm:text-[1.0625rem]"
      }
    >
      {text.split(/\n{2,}/).map((paragraph) => (
        <p key={paragraph.slice(0, 80)}>{paragraph}</p>
      ))}
    </div>
  );
}

function SectionHeading({ index, children }: { index: number; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4 sm:gap-5">
      <span
        aria-hidden="true"
        data-section-index
        className="mt-1 shrink-0 font-sans text-xs font-bold tracking-[0.18em] text-primary"
      >
        {formatRomanIndex(index)}
      </span>
      <h2 className="text-balance text-2xl font-black leading-tight tracking-[-0.025em] sm:text-3xl">
        {children}
      </h2>
    </div>
  );
}

function BackToContents({ label }: { label: string }) {
  return (
    <div className="mt-8 border-t border-border/70 pt-5 text-right">
      <a
        href="#competence-contents"
        className="text-sm font-semibold text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
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
  const sections = [
    { id: "definition", title: dict.competencesPage.definitionHeading },
    { id: "evidence", title: dict.competencesPage.proofsHeading },
    { id: "self-assessment", title: dict.competencesPage.selfCritiqueHeading },
    { id: "growth", title: dict.competencesPage.evolutionHeading },
    {
      id: "linked-achievements",
      title: dict.competencesPage.linkedRealisationsHeading,
    },
  ];

  return (
    <div>
      <EditorialPageHeader
        compact
        eyebrow={dict.nav.competences}
        title={competence.title[loc]}
        description={`${competence.definition[loc].split(".")[0]}.`}
        leading={
          <Link
            href={`/${locale}/competences`}
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-foreground/65 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {dict.competencesPage.backToCompetences}
          </Link>
        }
        meta={
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="font-sans text-[11px] tracking-wide">
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
          <aside className="border border-border bg-card p-5">
            <p className="editorial-index">{dict.competencesPage.levelLabel}</p>
            <div className="mt-5">
              <div className="flex items-end justify-between gap-4">
                <span className="text-5xl font-black leading-none">
                  {competence.radarValue}
                </span>
                <span className="font-sans text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  /100
                </span>
              </div>
              <div
                className="mt-4 h-2 rounded-full bg-muted"
                role="meter"
                aria-label={dict.competencesPage.levelLabel}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={competence.radarValue}
              >
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${competence.radarValue}%` }}
                />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {competenceLevelLabels[competence.level][loc]}
              </p>
            </div>
          </aside>
        }
      />

      <section className="bg-muted/35 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
          <aside id="competence-contents" className="scroll-mt-28 lg:sticky lg:top-28">
            <nav
              aria-label={dict.competencesPage.contentsHeading}
              className="border border-border bg-card p-5 sm:p-6"
            >
              <p className="editorial-index">
                {dict.competencesPage.contentsHeading}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {dict.competencesPage.contentsSubtext}
              </p>
              <ol className="mt-5 divide-y divide-border/70 border-y border-border/70">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group grid grid-cols-[2rem_1fr] gap-2 py-3 text-sm leading-5 text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="font-sans text-xs font-bold text-primary"
                      >
                        {formatRomanIndex(index + 1)}
                      </span>
                      <span className="font-medium group-hover:underline group-hover:underline-offset-4">
                        {section.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="grid min-w-0 gap-8">
            <Card
              id="definition"
              className="scroll-mt-28 gap-0 border border-border bg-card py-0"
            >
              <CardHeader className="border-b border-border/70 px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
                <CardTitle>
                  <SectionHeading index={1}>
                    {dict.competencesPage.definitionHeading}
                  </SectionHeading>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
                <div className="mx-auto max-w-[76ch]">
                  <EditorialText text={competence.definition[loc]} />
                  <article className="mt-9 border-l-2 border-foreground bg-muted/50 px-5 py-5 sm:px-6">
                    <div className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                      <span
                        aria-hidden="true"
                        data-subsection-index
                        className="font-sans text-xs font-bold text-primary"
                      >
                        {formatAlphabeticalIndex(1)}
                      </span>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        <span>{dict.competencesPage.relatedNewsHeading}</span>
                        <time dateTime={competence.relatedNews.date}>
                          {competence.relatedNews.dateLabel[loc]}
                        </time>
                      </div>
                    </div>
                    <h3 className="mt-3 text-xl font-bold leading-snug">
                      {competence.relatedNews.title[loc]}
                    </h3>
                    <p className="mt-3 leading-7 text-muted-foreground">
                      {competence.relatedNews.summary[loc]}
                    </p>
                    <a
                      href={competence.relatedNews.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      {dict.competencesPage.newsSourceLabel}{" "}
                      {competence.relatedNews.source}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </article>
                  <BackToContents label={dict.competencesPage.backToContents} />
                </div>
              </CardContent>
            </Card>

            <Card
              id="evidence"
              className="scroll-mt-28 gap-0 border border-border bg-card py-0"
            >
              <CardHeader className="border-b border-border/70 px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
                <CardTitle>
                  <SectionHeading index={2}>
                    {dict.competencesPage.proofsHeading}
                  </SectionHeading>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
                <div className="mx-auto max-w-[76ch] divide-y divide-border/70">
                  {competence.anecdotes.map((anecdote, index) => (
                    <article
                      key={anecdote.title[loc]}
                      className="py-8 first:pt-0 last:pb-0"
                    >
                      <div className="grid gap-3 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-5">
                        <span
                          aria-hidden="true"
                          data-subsection-index
                          className="font-sans text-xs font-bold tracking-[0.12em] text-primary"
                        >
                          {formatAlphabeticalIndex(index + 1)}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-pretty text-xl font-bold leading-snug tracking-[-0.015em]">
                            {anecdote.title[loc]}
                          </h3>
                          <div className="mt-4">
                            <EditorialText text={anecdote.content[loc]} />
                          </div>
                          <div className="mt-5 border-l-2 border-primary bg-primary/[0.035] px-4 py-3">
                            <p className="leading-7 text-muted-foreground">
                              <span className="font-semibold text-foreground">
                                {dict.competencesPage.resultLabel}
                              </span>{" "}
                              — {anecdote.result[loc]}
                            </p>
                          </div>
                          {anecdote.linkedRealisation && (
                            <Link
                              href={`/${locale}/realisations/${anecdote.linkedRealisation}`}
                              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4"
                            >
                              {getRealisationBySlug(anecdote.linkedRealisation)?.title[
                                loc
                              ] ?? anecdote.linkedRealisation}
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                  <BackToContents label={dict.competencesPage.backToContents} />
                </div>
              </CardContent>
            </Card>

            <Card
              id="self-assessment"
              className="scroll-mt-28 gap-0 border border-border bg-card py-0"
            >
              <CardHeader className="border-b border-border/70 px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
                <CardTitle>
                  <SectionHeading index={3}>
                    {dict.competencesPage.selfCritiqueHeading}
                  </SectionHeading>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
                <dl className="mx-auto max-w-[76ch] divide-y divide-border/70">
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
                      className="grid gap-3 py-6 first:pt-0 last:pb-0 sm:grid-cols-[2rem_12rem_minmax(0,1fr)] sm:gap-6"
                    >
                      <span
                        aria-hidden="true"
                        data-subsection-index
                        className="font-sans text-xs font-bold text-primary"
                      >
                        {formatAlphabeticalIndex(index + 1)}
                      </span>
                      <dt className="font-semibold text-foreground">{item.label}</dt>
                      <dd>
                        <EditorialText text={item.value} compact />
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mx-auto max-w-[76ch]">
                  <BackToContents label={dict.competencesPage.backToContents} />
                </div>
              </CardContent>
            </Card>

            <Card
              id="growth"
              className="scroll-mt-28 gap-0 border border-border bg-card py-0"
            >
              <CardHeader className="border-b border-border/70 px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
                <CardTitle>
                  <SectionHeading index={4}>
                    {dict.competencesPage.evolutionHeading}
                  </SectionHeading>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
                <dl className="mx-auto max-w-[76ch] divide-y divide-border/70">
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
                      className="grid gap-3 py-6 first:pt-0 last:pb-0 sm:grid-cols-[2rem_12rem_minmax(0,1fr)] sm:gap-6"
                    >
                      <span
                        aria-hidden="true"
                        data-subsection-index
                        className="font-sans text-xs font-bold text-primary"
                      >
                        {formatAlphabeticalIndex(index + 1)}
                      </span>
                      <dt className="font-semibold text-foreground">{item.label}</dt>
                      <dd>
                        <EditorialText text={item.value} compact />
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mx-auto max-w-[76ch]">
                  <BackToContents label={dict.competencesPage.backToContents} />
                </div>
              </CardContent>
            </Card>

            {competence.linkedRealisations.length > 0 && (
              <Card
                id="linked-achievements"
                className="scroll-mt-28 gap-0 border border-border bg-card py-0"
              >
                <CardHeader className="border-b border-border/70 px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
                  <CardTitle>
                    <SectionHeading index={5}>
                      {dict.competencesPage.linkedRealisationsHeading}
                    </SectionHeading>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
                  <ul className="mx-auto grid max-w-[76ch] gap-3">
                    {competence.linkedRealisations.map((realisationSlug, index) => {
                      const realisation = getRealisationBySlug(realisationSlug);
                      return (
                        <li key={realisationSlug}>
                          <Link
                            href={`/${locale}/realisations/${realisationSlug}`}
                            className="group grid grid-cols-[2rem_minmax(0,1fr)] items-center border-b border-border/70 py-3.5 font-medium transition-colors hover:text-primary"
                          >
                            <span
                              aria-hidden="true"
                              data-subsection-index
                              className="font-sans text-xs font-bold text-primary"
                            >
                              {formatAlphabeticalIndex(index + 1)}
                            </span>
                            <span className="transition-colors group-hover:text-primary">
                              {realisation?.title[loc] ?? realisationSlug}
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
    </div>
  );
}
