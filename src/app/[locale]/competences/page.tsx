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
import { createLocalizedMetadata } from "@/lib/metadata";
import { RadarChart } from "@/components/radar-chart";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { actionLinkClassName } from "@/lib/styles";
import { RouteStructuredData } from "@/components/route-structured-data";
import { getLocalizedPageContext } from "../route-context";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);
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
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);

  const humanSkills = getCompetencesByType("human");
  const technicalSkills = getCompetencesByType("technical");

  const radarLabels: Record<string, string> = dict.competencesPage.radarLabels;

  const radarData = competences.map((c) => ({
    label: radarLabels[c.slug] ?? c.title[loc],
    value: c.radarValue,
    href: `/${loc}/competences/${c.slug}`,
  }));

  return (
    <>
      <RouteStructuredData locale={loc} pathname={`/${loc}/competences`} />
      <div>
      <EditorialPageHeader
        eyebrow={dict.nav.competences}
        title={dict.competencesPage.heading}
        description={dict.competencesPage.subtext}
        titleClassName="uppercase"
      />

      {/* Radar Chart */}
      <section>
        <div>
          <h2>
            {dict.competencesPage.radarHeading}
          </h2>
          <div>
            <RadarChart
              data={radarData}
              title={dict.competencesPage.radarHeading}
              scaleLabel={dict.competencesPage.radarScaleLabel}
            />
          </div>
        </div>
      </section>

      {/* Human Skills */}
      <section>
        <div>
          <h2>
            {dict.competencesPage.humanSkills}
          </h2>
          <div>
            {humanSkills.map((competence, index) => (
              <Card
                key={competence.slug}
              >
                <CardHeader>
                  <div>
                    <div>
                      <CardTitle>
                        <h3><Link href={`/${loc}/competences/${competence.slug}`}>{competence.title[loc]}</Link></h3>
                      </CardTitle>
                      <CardDescription>
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
      <section>
        <div>
          <h2>
            {dict.competencesPage.technicalSkills}
          </h2>
          <div>
            {technicalSkills.map((competence, index) => (
              <Card
                key={competence.slug}
              >
                <CardHeader>
                  <div>
                    <div>
                      <CardTitle>
                        <h3><Link href={`/${loc}/competences/${competence.slug}`}>{competence.title[loc]}</Link></h3>
                      </CardTitle>
                      <CardDescription>
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
    </>
  );
}
