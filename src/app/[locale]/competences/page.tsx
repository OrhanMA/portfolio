import Link from "next/link";
import type { Metadata } from "next";
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
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "../dictionaries";
import { RadarChart } from "@/components/radar-chart";

const linkClassName =
  "inline-flex h-8 w-fit shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px dark:border-input dark:bg-input/30 dark:hover:bg-input/50";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.competencesPage.pageTitle,
    description: dict.competencesPage.pageDescription,
  };
}

export default async function CompetencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

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
    label: radarLabels[c.slug]?.[locale] ?? c.title[locale as Locale],
    value: c.radarValue,
  }));

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {dict.competencesPage.heading}
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              {dict.competencesPage.subtext}
            </p>
          </div>
        </div>
      </section>

      {/* Radar Chart */}
      <section className="section-tinted px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
            {dict.competencesPage.radarHeading}
          </h2>
          <div className="flex justify-center">
            <RadarChart data={radarData} />
          </div>
        </div>
      </section>

      {/* Human Skills */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
            {dict.competencesPage.humanSkills}
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {humanSkills.map((competence) => (
              <Card
                key={competence.slug}
                className="h-full border-border/50 bg-card/95 transition-transform duration-200 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">
                        {competence.title[locale as Locale]}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {competence.definition[locale as Locale].slice(0, 100)}
                        {competence.definition[locale as Locale].length > 100
                          ? "…"
                          : ""}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">
                      {competenceLevelLabels[competence.level][locale as Locale]}
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
      <section className="section-tinted px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
            {dict.competencesPage.technicalSkills}
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {technicalSkills.map((competence) => (
              <Card
                key={competence.slug}
                className="h-full border-border/50 bg-card/95 transition-transform duration-200 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">
                        {competence.title[locale as Locale]}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {competence.definition[locale as Locale].slice(0, 100)}
                        {competence.definition[locale as Locale].length > 100
                          ? "…"
                          : ""}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">
                      {competenceLevelLabels[competence.level][locale as Locale]}
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
