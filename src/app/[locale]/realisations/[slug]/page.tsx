import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "../../dictionaries";
import { getRealisationBySlug, realisations } from "@/lib/realisations";
import { getCompetenceBySlug } from "@/lib/competences";

const linkClassName =
  "inline-flex h-8 w-fit shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px dark:border-input dark:bg-input/30 dark:hover:bg-input/50";

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

  if (!realisation) {
    return {};
  }

  return {
    title: `${realisation.title[locale as Locale]} | ${locale === "fr" ? "Réalisations" : "Achievements"} | Orhan Madi Assani`,
    description: realisation.shortDescription[locale as Locale],
  };
}

function renderParagraphs(text: string) {
  return text.split("\n\n").map((paragraph, i) => (
    <p key={i} className="leading-7 text-muted-foreground">
      {paragraph}
    </p>
  ));
}

function renderWithBold(text: string) {
  return text.split("\n\n").map((paragraph, i) => {
    const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="leading-7 text-muted-foreground">
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j}>{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    );
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

  const dict = await getDictionary(locale as Locale);

  return (
    <div className="px-6 pt-24 pb-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/${locale}/realisations`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.realisationsPage.backToRealisations}
        </Link>

        {/* Header card */}
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="font-mono text-[11px] tracking-wide">
              {realisation.context[locale as Locale]}
            </Badge>
            {realisation.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {realisation.title[locale as Locale]}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            {realisation.shortDescription[locale as Locale]}
          </p>
        </div>

        {/* Content sections */}
        <div className="mt-8 grid gap-6">
          {/* Présentation */}
          <Card className="border-border/50 bg-card/95">
            <CardHeader>
              <CardTitle>{dict.realisationsPage.presentationHeading}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderParagraphs(realisation.presentation[locale as Locale])}
            </CardContent>
          </Card>

          {/* Objectifs, contexte et enjeux */}
          <Card className="border-border/50 bg-card/95">
            <CardHeader>
              <CardTitle>{dict.realisationsPage.objectivesHeading}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderParagraphs(realisation.objectives[locale as Locale])}
            </CardContent>
          </Card>

          {/* Les étapes */}
          <Card className="border-border/50 bg-card/95">
            <CardHeader>
              <CardTitle>{dict.realisationsPage.stepsHeading}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderParagraphs(realisation.steps[locale as Locale])}
            </CardContent>
          </Card>

          {/* Les acteurs */}
          <Card className="border-border/50 bg-card/95">
            <CardHeader>
              <CardTitle>{dict.realisationsPage.actorsHeading}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderParagraphs(realisation.actors[locale as Locale])}
            </CardContent>
          </Card>

          {/* Les résultats */}
          <Card className="border-border/50 bg-card/95">
            <CardHeader>
              <CardTitle>{dict.realisationsPage.resultsHeading}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderWithBold(realisation.results[locale as Locale])}
            </CardContent>
          </Card>

          {/* Les lendemains */}
          <Card className="border-border/50 bg-card/95">
            <CardHeader>
              <CardTitle>{dict.realisationsPage.aftermathHeading}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderParagraphs(realisation.aftermath[locale as Locale])}
            </CardContent>
          </Card>

          {/* Mon regard critique */}
          <Card className="border-border/50 bg-card/95">
            <CardHeader>
              <CardTitle>{dict.realisationsPage.critiqueHeading}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderParagraphs(realisation.critique[locale as Locale])}
            </CardContent>
          </Card>

          {/* Compétences rattachées */}
          <Card className="border-border/50 bg-card/95">
            <CardHeader>
              <CardTitle>{dict.realisationsPage.linkedCompetencesHeading}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {realisation.linkedCompetences.map((compSlug) => {
                  const competence = getCompetenceBySlug(compSlug);
                  if (!competence) return null;
                  return (
                    <Link
                      key={compSlug}
                      href={`/${locale}/competences/${compSlug}`}
                      className={linkClassName}
                    >
                      {competence.title[locale as Locale]}
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
