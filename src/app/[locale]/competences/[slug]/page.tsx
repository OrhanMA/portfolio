import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "../../dictionaries";
import {
  getCompetenceBySlug,
  competences,
  competenceLevelLabels,
} from "@/lib/competences";
import { getRealisationBySlug } from "@/lib/realisations";

export async function generateStaticParams() {
  return competences.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const competence = getCompetenceBySlug(slug);

  if (!competence) {
    return {};
  }

  return {
    title: `${competence.title[locale as Locale]} | ${locale === "fr" ? "Compétences" : "Skills"} | Orhan Madi Assani`,
    description: competence.definition[locale as Locale].split(".")[0] + ".",
  };
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

  const dict = await getDictionary(locale as Locale);
  const loc = locale as Locale;

  return (
    <div className="px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back link */}
        <Link
          href={`/${locale}/competences`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.competencesPage.backToCompetences}
        </Link>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="font-mono text-[11px] tracking-wide">
              {competence.type === "human"
                ? dict.competencesPage.humanSkills
                : dict.competencesPage.technicalSkills}
            </Badge>
            <Badge variant="secondary">
              {competenceLevelLabels[competence.level][loc]}
            </Badge>
          </div>

          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
            {competence.title[loc]}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            {competence.definition[loc].split(".")[0]}.
          </p>
          </div>

          <aside className="premium-card rounded-lg p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
              Skill dossier
            </p>
            <div className="mt-5">
              <div className="flex items-end justify-between gap-4">
                <span className="text-5xl font-semibold leading-none">
                  {competence.radarValue}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  /100
                </span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-muted">
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
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 border-t border-border/70 pt-5">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Framework
              </p>
              <ol className="mt-5 grid gap-2 text-sm text-muted-foreground">
                {[
                  dict.competencesPage.definitionHeading,
                  dict.competencesPage.proofsHeading,
                  dict.competencesPage.selfCritiqueHeading,
                  dict.competencesPage.evolutionHeading,
                  dict.competencesPage.linkedRealisationsHeading,
                ].map((item, index) => (
                  <li key={item}>
                    <span className="font-mono text-primary">
                      0{index + 1}
                    </span>{" "}
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <div className="grid gap-6">
          {/* Définition */}
          <Card className="premium-card border-border/50">
            <CardHeader>
              <CardTitle>{dict.competencesPage.definitionHeading}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="leading-7 text-muted-foreground">
                  {competence.definition[loc]}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Éléments de preuve */}
          <Card className="premium-card border-border/50">
            <CardHeader>
              <CardTitle>{dict.competencesPage.proofsHeading}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {competence.anecdotes.map((anecdote) => (
                <div key={anecdote.title[loc]} className="space-y-3">
                  <h3 className="text-lg font-semibold">
                    {anecdote.title[loc]}
                  </h3>
                  <p className="leading-7 text-muted-foreground">
                    {anecdote.content[loc]}
                  </p>
                  <div className="border-l-2 border-primary pl-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {dict.competencesPage.resultLabel}
                      </span>{" "}
                      — {anecdote.result[loc]}
                    </p>
                  </div>
                  {anecdote.linkedRealisation && (
                    <Link
                      href={`/${locale}/realisations/${anecdote.linkedRealisation}`}
                      className="inline-flex items-center gap-1 text-sm text-primary underline-offset-4 hover:underline"
                    >
                      {getRealisationBySlug(anecdote.linkedRealisation)?.title[loc] ??
                        anecdote.linkedRealisation}
                    </Link>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Autocritique */}
          <Card className="premium-card border-border/50">
            <CardHeader>
              <CardTitle>{dict.competencesPage.selfCritiqueHeading}</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 sm:grid-cols-[auto_1fr]">
                <dt className="font-semibold">
                  {dict.competencesPage.levelLabel}
                </dt>
                <dd className="text-muted-foreground">
                  {competence.selfCritique.level[loc]}
                </dd>

                <dt className="font-semibold">
                  {dict.competencesPage.importanceLabel}
                </dt>
                <dd className="text-muted-foreground">
                  {competence.selfCritique.importance[loc]}
                </dd>

                {competence.selfCritique.acquisitionSpeed && (
                  <>
                    <dt className="font-semibold">
                      {dict.competencesPage.acquisitionLabel}
                    </dt>
                    <dd className="text-muted-foreground">
                      {competence.selfCritique.acquisitionSpeed[loc]}
                    </dd>
                  </>
                )}

                <dt className="font-semibold">
                  {dict.competencesPage.adviceLabel}
                </dt>
                <dd className="text-muted-foreground">
                  {competence.selfCritique.advice[loc]}
                </dd>
              </dl>
            </CardContent>
          </Card>

          {/* Évolution */}
          <Card className="premium-card border-border/50">
            <CardHeader>
              <CardTitle>{dict.competencesPage.evolutionHeading}</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 sm:grid-cols-[auto_1fr]">
                <dt className="font-semibold">
                  {dict.competencesPage.goalLabel}
                </dt>
                <dd className="text-muted-foreground">
                  {competence.evolution.goal[loc]}
                </dd>

                <dt className="font-semibold">
                  {dict.competencesPage.trainingLabel}
                </dt>
                <dd className="text-muted-foreground">
                  {competence.evolution.training[loc]}
                </dd>
              </dl>
            </CardContent>
          </Card>

          {/* Réalisations rattachées */}
          {competence.linkedRealisations.length > 0 && (
            <Card className="premium-card border-border/50">
              <CardHeader>
                <CardTitle>
                  {dict.competencesPage.linkedRealisationsHeading}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3">
                  {competence.linkedRealisations.map((realisationSlug) => {
                    const realisation = getRealisationBySlug(realisationSlug);
                    return (
                      <li key={realisationSlug}>
                        <Link
                          href={`/${locale}/realisations/${realisationSlug}`}
                          className="group inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/50 px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                        >
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
      </div>
    </div>
  );
}
