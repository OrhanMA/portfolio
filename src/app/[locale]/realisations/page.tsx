import { LinkedText } from "@/components/linked-text";
import { TopicLink } from "@/components/topic-link";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { createLocalizedMetadata } from "@/lib/metadata";
import { requireLinkedExperience } from "@/lib/experience";
import { realisations } from "@/lib/realisations";
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
    pathname: "/realisations",
    title: dict.realisationsPage.pageTitle,
    description: dict.realisationsPage.pageDescription,
  });
}

export default async function RealisationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);

  return (
    <>
      <RouteStructuredData locale={loc} pathname={`/${loc}/realisations`} />
      <EditorialPageHeader
        className="realisation-page-header"
        eyebrow={dict.nav.realisations}
        title={dict.realisationsPage.heading}
        description={dict.realisationsPage.subtext}
        titleClassName="uppercase"
      />

      <section data-editorial-list="work">
        <div>
          <div>
            {realisations.map((realisation) => (
              <Card
                key={realisation.slug}
              >
                <CardHeader>
                  <div>
                    <div>
                      <Link
                        href={`/${loc}/parcours/${requireLinkedExperience(dict.experience.entries, realisation.slug).id}`}
                      >
                        {realisation.context[loc]}
                      </Link>
                      <CardTitle>
                        <h2><Link href={`/${loc}/realisations/${realisation.slug}`}>{realisation.title[loc]}</Link></h2>
                      </CardTitle>
                      <CardDescription>
                        <LinkedText locale={loc}>{realisation.shortDescription[loc]}</LinkedText>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div>
                    {realisation.tags.map((tag) => (
                      <TopicLink key={tag} label={tag} locale={loc} />
                    ))}
                  </div>

                  <div>
                    <Link
                      href={`/${locale}/realisations/${realisation.slug}`}
                      className={actionLinkClassName}
                    >
                      {dict.realisationsPage.viewDetail}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
