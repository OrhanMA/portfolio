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
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "../dictionaries";
import { realisations } from "@/lib/realisations";

const linkClassName =
  "inline-flex h-10 w-fit shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm font-medium whitespace-nowrap transition-all outline-none hover:border-primary/70 hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px dark:border-input dark:bg-input/30 dark:hover:bg-input/50";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.realisationsPage.pageTitle,
    description: dict.realisationsPage.pageDescription,
  };
}

export default async function RealisationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="pt-28">
      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-normal sm:text-6xl md:text-7xl">
              {dict.realisationsPage.heading}
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              {dict.realisationsPage.subtext}
            </p>
          </div>
        </div>
      </section>

      <section className="section-tinted px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-2">
            {realisations.map((realisation) => (
              <Card
                key={realisation.slug}
                className="premium-card h-full border-border/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge
                        variant="outline"
                        className="mb-3 font-mono text-[11px] tracking-wide"
                      >
                        {realisation.context[locale as Locale]}
                      </Badge>
                      <CardTitle className="text-xl">
                        {realisation.title[locale as Locale]}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {realisation.shortDescription[locale as Locale]}
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
