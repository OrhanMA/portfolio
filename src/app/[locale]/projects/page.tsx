import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, FolderKanban, Layers3, PackageOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDictionary } from "../dictionaries";
import type { Locale } from "@/lib/i18n";
import { odooProjects } from "@/lib/odoo-projects";

const projectLinkClassName =
  "inline-flex h-10 w-fit shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm font-medium whitespace-nowrap transition-all outline-none hover:border-primary/70 hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px dark:border-input dark:bg-input/30 dark:hover:bg-input/50";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.projects.pageTitle,
    description: dict.projects.pageDescription,
  };
}

export default async function ProjectsPage({
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
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="outline">{dict.projects.eyebrow}</Badge>
              <Badge variant="secondary">Odoo</Badge>
              <Badge variant="secondary">Python</Badge>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)] lg:items-end">
              <div className="max-w-3xl">
                <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-normal sm:text-6xl md:text-7xl">
                  {dict.projects.heading}
                </h1>
                <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
                  {dict.projects.subtext}
                </p>
              </div>

              <div className="grid gap-3">
                <Card size="sm" className="premium-card border-border/50">
                  <CardHeader className="pb-1">
                    <CardDescription>{dict.projects.summaryLabel}</CardDescription>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <FolderKanban className="h-5 w-5 text-primary" />
                      {dict.projects.summaryValue.replace(
                        "{count}",
                        String(odooProjects.length)
                      )}
                    </CardTitle>
                  </CardHeader>
                </Card>

                <Card size="sm" className="premium-card border-border/50">
                  <CardHeader className="pb-1">
                    <CardDescription>{dict.projects.stackLabel}</CardDescription>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Layers3 className="h-4 w-4 text-primary" />
                      Odoo + Python
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tinted px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {odooProjects.map((project) => (
              <Card
                key={project.slug}
                className="premium-card h-full border-border/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge
                        variant="outline"
                        className="mb-3 font-mono text-[11px] tracking-wide"
                      >
                        {project.slug}
                      </Badge>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {project.summary[locale as Locale]}
                      </CardDescription>
                    </div>

                    <CardAction>
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <PackageOpen className="h-5 w-5" />
                      </div>
                    </CardAction>
                  </div>
                </CardHeader>

                <CardContent className="flex h-full flex-col justify-between gap-5">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Odoo</Badge>
                    <Badge variant="secondary">Python</Badge>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/${locale}/projects/${project.slug}`}
                      className={projectLinkClassName}
                    >
                      {dict.projects.viewDetails}
                    </Link>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={projectLinkClassName}
                    >
                      {dict.projects.viewProject}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
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
