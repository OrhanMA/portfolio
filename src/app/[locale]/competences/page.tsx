import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  competences,
  getCompetencesByType,
  competenceLevelLabels,
} from "@/lib/competences";
import { parseLocale } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { getDictionary } from "../dictionaries";
import { RadarChart } from "@/components/radar-chart";
import { EditorialPageHeader } from "@/components/editorial-page-header";

const linkClassName =
  "inline-flex h-10 w-fit shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm font-medium whitespace-nowrap transition-all outline-none hover:border-primary/70 hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px dark:border-input dark:bg-input/30 dark:hover:bg-input/50";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = parseLocale(locale);
  if (!loc) notFound();
  const dict = await getDictionary(loc);
  return createLocalizedMetadata({
    locale: loc,
    pathname: "/competences",
    title: dict.competencesPage.pageTitle,
    description: dict.competencesPage.pageDescription,
  });
}

export default async function CompetencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = parseLocale(locale);
  if (!loc) notFound();
  const dict = await getDictionary(loc);

  const humanSkills = getCompetencesByType("human");
  const technicalSkills = getCompetencesByType("technical");

  const radarLabels: Record<string, Record<string, string>> = {
    "developpement-backend": { fr: "Backend", en: "Backend" },
    "developpement-frontend": { fr: "Frontend", en: "Frontend" },
    "devops": { fr: "DevOps", en: "DevOps" },
    "amelioration-continue": { fr: "Amélioration", en: "Improvement" },
    "developpement-odoo": { fr: "Odoo", en: "Odoo" },
  };

  const radarData = competences.map((c) => ({
    label: radarLabels[c.slug]?.[loc] ?? c.title[loc],
    value: c.radarValue,
  }));

  return (
    <div>
      <EditorialPageHeader
        eyebrow={dict.nav.competences}
        title={dict.competencesPage.heading}
        description={dict.competencesPage.subtext}
        titleClassName="uppercase"
      />

      {/* Radar Chart */}
      <section className="section-tinted border-b border-foreground/15 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-index mb-3">01</p>
          <h2 className="mb-8 text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl">
            {dict.competencesPage.radarHeading}
          </h2>
          <div className="flex justify-center">
            <RadarChart data={radarData} title={dict.competencesPage.radarHeading} />
          </div>
        </div>
      </section>

      {/* Human Skills */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-index mb-3 text-vermillion">02</p>
          <h2 className="mb-8 text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl">
            {dict.competencesPage.humanSkills}
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {humanSkills.map((competence) => (
              <Card
                key={competence.slug}
                className="premium-card h-full rounded-xl border-l-4 border-l-vermillion transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl font-black tracking-[-0.025em]">
                        <h3>{competence.title[loc]}</h3>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {competence.definition[loc].slice(0, 100)}
                        {competence.definition[loc].length > 100
                          ? "…"
                          : ""}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">
                      {competenceLevelLabels[competence.level][loc]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link
                    href={`/${locale}/competences/${competence.slug}`}
                    className={linkClassName}
                  >
                    {dict.competencesPage.viewDetail}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="section-tinted border-t border-foreground/15 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-index mb-3">03</p>
          <h2 className="mb-8 text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl">
            {dict.competencesPage.technicalSkills}
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {technicalSkills.map((competence) => (
              <Card
                key={competence.slug}
                className="premium-card h-full rounded-xl border-l-4 border-l-primary transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl font-black tracking-[-0.025em]">
                        <h3>{competence.title[loc]}</h3>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {competence.definition[loc].slice(0, 100)}
                        {competence.definition[loc].length > 100
                          ? "…"
                          : ""}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">
                      {competenceLevelLabels[competence.level][loc]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link
                    href={`/${locale}/competences/${competence.slug}`}
                    className={linkClassName}
                  >
                    {dict.competencesPage.viewDetail}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
