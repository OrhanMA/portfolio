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
import { parseLocale } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { getDictionary } from "../dictionaries";
import { realisations } from "@/lib/realisations";
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
  const loc = parseLocale(locale);
  if (!loc) notFound();
  const dict = await getDictionary(loc);

  return (
    <div>
      <EditorialPageHeader
        eyebrow={dict.nav.realisations}
        title={dict.realisationsPage.heading}
        description={dict.realisationsPage.subtext}
        titleClassName="uppercase"
      />

      <section className="section-tinted px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-2">
            {realisations.map((realisation) => (
              <Card
                key={realisation.slug}
                className="premium-card h-full rounded-xl border-t-4 border-t-primary transition-all duration-300 odd:border-t-vermillion hover:-translate-y-1 hover:border-primary/50"
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
                      className={linkClassName}
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
