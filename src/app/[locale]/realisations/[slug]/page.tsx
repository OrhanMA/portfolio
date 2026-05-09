import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "../../dictionaries";
import { getRealisationBySlug, realisations } from "@/lib/realisations";
import { getCompetenceBySlug } from "@/lib/competences";

const linkClassName =
  "inline-flex h-10 w-fit shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm font-medium whitespace-nowrap transition-all outline-none hover:border-primary/70 hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px dark:border-input dark:bg-input/30 dark:hover:bg-input/50";

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
  const loc = locale as Locale;
  const contentSections = [
    {
      title: dict.realisationsPage.presentationHeading,
      content: renderParagraphs(realisation.presentation[loc]),
    },
    {
      title: dict.realisationsPage.objectivesHeading,
      content: renderParagraphs(realisation.objectives[loc]),
    },
    {
      title: dict.realisationsPage.stepsHeading,
      content: renderParagraphs(realisation.steps[loc]),
    },
    {
      title: dict.realisationsPage.actorsHeading,
      content: renderParagraphs(realisation.actors[loc]),
    },
    {
      title: dict.realisationsPage.resultsHeading,
      content: renderWithBold(realisation.results[loc]),
    },
    {
      title: dict.realisationsPage.aftermathHeading,
      content: renderParagraphs(realisation.aftermath[loc]),
    },
    {
      title: dict.realisationsPage.critiqueHeading,
      content: renderParagraphs(realisation.critique[loc]),
    },
  ];

  return (
    <div className="px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href={`/${locale}/realisations`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.realisationsPage.backToRealisations}
        </Link>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="font-mono text-[11px] tracking-wide">
              {realisation.context[loc]}
            </Badge>
            {realisation.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-normal sm:text-6xl lg:text-7xl">
            {realisation.title[loc]}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            {realisation.shortDescription[loc]}
          </p>
          </div>

          <aside className="premium-card rounded-lg p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
              Case file
            </p>
            <div className="mt-5 grid gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {dict.realisationsPage.context}
                </p>
                <p className="mt-1 text-sm">{realisation.context[loc]}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Stack
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {realisation.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 border-t border-border/70 pt-5">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Narrative
              </p>
              <ol className="mt-5 grid gap-2 text-sm text-muted-foreground">
                {contentSections.map((section, index) => (
                  <li key={section.title}>
                    <span className="font-mono text-primary">
                      0{index + 1}
                    </span>{" "}
                    {section.title}
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <div className="grid gap-4">
            {contentSections.map((section, index) => (
              <section
                key={section.title}
                className="premium-card rounded-lg p-5 sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-[72px_1fr]">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                    0{index + 1}
                  </p>
                  <div>
                    <h2 className="text-2xl font-semibold tracking-normal">
                      {section.title}
                    </h2>
                    <div className="mt-5 space-y-4">{section.content}</div>
                  </div>
                </div>
              </section>
            ))}

            <section className="premium-card rounded-lg p-5 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-[72px_1fr]">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                  08
                </p>
                <div>
                  <h2 className="text-2xl font-semibold tracking-normal">
                    {dict.realisationsPage.linkedCompetencesHeading}
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {realisation.linkedCompetences.map((compSlug) => {
                  const competence = getCompetenceBySlug(compSlug);
                  if (!competence) return null;
                  return (
                    <Link
                      key={compSlug}
                      href={`/${locale}/competences/${compSlug}`}
                      className={linkClassName}
                    >
                      {competence.title[loc]}
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
    </div>
  );
}
