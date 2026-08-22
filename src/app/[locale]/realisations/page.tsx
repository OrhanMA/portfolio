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
import { createLocalizedMetadata } from "@/lib/metadata";
import { realisations } from "@/lib/realisations";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { actionLinkClassName } from "@/lib/styles";
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
    <div>
      <EditorialPageHeader
        eyebrow={dict.nav.realisations}
        title={dict.realisationsPage.heading}
        description={dict.realisationsPage.subtext}
        titleClassName="uppercase"
      />

      <section className="bg-muted/35 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-2">
            {realisations.map((realisation) => (
              <Card
                key={realisation.slug}
                className="h-full border border-border bg-card transition-colors duration-200 hover:bg-muted/50"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge
                        variant="outline"
                        className="mb-3 font-sans text-[11px] tracking-wide"
                      >
                        {realisation.context[loc]}
                      </Badge>
                      <CardTitle className="text-xl font-black tracking-[-0.025em] sm:text-2xl">
                        <h2>{realisation.title[loc]}</h2>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {realisation.shortDescription[loc]}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex h-full flex-col justify-between gap-5">
                  <div className="flex flex-wrap gap-2">
                    {realisation.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
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
    </div>
  );
}
