import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { parseLocale } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { getDictionary } from "../../dictionaries";
import { getRealisationBySlug, realisations } from "@/lib/realisations";
import { getCompetenceBySlug } from "@/lib/competences";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { RealisationArticleContent } from "@/components/realisation-article-content";
import { YouTubeFacade } from "@/components/youtube-facade";

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
  const loc = parseLocale(locale);

  if (!realisation || !loc) {
    notFound();
  }

  const dict = await getDictionary(loc);
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
    <div>
      <EditorialPageHeader
        compact
        eyebrow={dict.nav.realisations}
        title={realisation.title[loc]}
        description={realisation.shortDescription[loc]}
        leading={
          <Link
            href={`/${locale}/realisations`}
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-foreground/65 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {dict.realisationsPage.backToRealisations}
          </Link>
        }
        meta={
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="font-sans text-[11px] tracking-wide">
              {realisation.context[loc]}
            </Badge>
            {realisation.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        }
        aside={
          <aside className="premium-card rounded-xl border-l-4 border-l-vermillion p-5">
            <p className="editorial-index text-vermillion">
              {dict.realisationsPage.context}
            </p>
            <div className="mt-5 grid gap-4">
              <div>
                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {dict.realisationsPage.context}
                </p>
                <p className="mt-1 text-sm">{realisation.context[loc]}</p>
              </div>
              <div>
                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
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
        }
      />

      <section className="section-tinted px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {realisation.media && realisation.media.length > 0 && (
            <section aria-labelledby="visual-proof-heading">
              <div className="mb-5 grid gap-2 lg:grid-cols-[260px_1fr]">
                <h2
                  id="visual-proof-heading"
                  className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary"
                >
                  {dict.realisationsPage.mediaHeading}
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                  {dict.realisationsPage.mediaSubtext}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {realisation.media.map((item) => (
                  <figure
                    key={item.src}
                    className="premium-card overflow-hidden rounded-xl border-t-4 border-t-primary"
                  >
                    <div className="relative aspect-video bg-muted">
                      {item.type === "image" ? (
                        <Image
                          src={item.src}
                          alt={item.title[loc]}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      ) : (
                        <YouTubeFacade
                          src={item.src}
                          title={item.title[loc]}
                          locale={loc}
                        />
                      )}
                    </div>
                    <figcaption className="p-4">
                      <p className="font-medium">{item.title[loc]}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {item.description[loc]}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
            <aside id="realisation-contents" className="scroll-mt-28 lg:sticky lg:top-28">
              <nav
                aria-label={dict.realisationsPage.contentsHeading}
                className="premium-card rounded-xl border-t-4 border-t-primary p-5 sm:p-6"
              >
                <p className="editorial-index">
                  {dict.realisationsPage.contentsHeading}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {dict.realisationsPage.contentsSubtext}
                </p>
                <ol className="mt-5 divide-y divide-border/70 border-y border-border/70">
                  {contentSections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="group grid grid-cols-[2rem_1fr] gap-2 py-3 text-sm leading-5 text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="font-sans text-xs font-bold text-primary"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-medium group-hover:underline group-hover:underline-offset-4">
                          {section.title}
                        </span>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#linked-competences"
                      className="group grid grid-cols-[2rem_1fr] gap-2 py-3 text-sm leading-5 text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="font-sans text-xs font-bold text-vermillion"
                      >
                        {String(contentSections.length + 1).padStart(2, "0")}
                      </span>
                      <span className="font-medium group-hover:underline group-hover:underline-offset-4">
                        {dict.realisationsPage.linkedCompetencesHeading}
                      </span>
                    </a>
                  </li>
                </ol>
              </nav>
            </aside>

            <div className="grid min-w-0 gap-8">
              {contentSections.map((section, index) => (
                <section
                  id={section.id}
                  key={section.id}
                  aria-labelledby={`${section.id}-heading`}
                  className="premium-card scroll-mt-28 overflow-hidden rounded-xl border-t-4 border-t-primary even:border-t-vermillion"
                >
                  <header className="border-b border-border/70 px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
                    <div className="flex items-start gap-4 sm:gap-5">
                      <p className="mt-1 shrink-0 font-sans text-xs font-bold tracking-[0.18em] text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h2
                        id={`${section.id}-heading`}
                        className="text-balance text-2xl font-black leading-tight tracking-[-0.025em] sm:text-3xl"
                      >
                        {section.title}
                      </h2>
                    </div>
                  </header>
                  <div className="realisation-content-deferred px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
                    <RealisationArticleContent text={section.text} />
                    <div className="mx-auto mt-8 max-w-[76ch] border-t border-border/70 pt-5 text-right">
                      <a
                        href="#realisation-contents"
                        className="text-sm font-semibold text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
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
                className="premium-card scroll-mt-28 rounded-xl border-t-4 border-t-vermillion p-5 sm:p-8 lg:p-10"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <p className="mt-1 shrink-0 font-sans text-xs font-bold tracking-[0.18em] text-vermillion">
                    {String(contentSections.length + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h2
                      id="linked-competences-heading"
                      className="text-balance text-2xl font-black leading-tight tracking-[-0.025em] sm:text-3xl"
                    >
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
      </section>
    </div>
  );
}
