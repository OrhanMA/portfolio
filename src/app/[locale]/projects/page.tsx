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
import { createLocalizedMetadata } from "@/lib/metadata";
import { odooProjects } from "@/lib/odoo-projects";
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
    pathname: "/projects",
    title: dict.projects.pageTitle,
    description: dict.projects.pageDescription,
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);

  return (
    <div>
      <EditorialPageHeader
        eyebrow={dict.projects.eyebrow}
        title={dict.projects.heading}
        description={dict.projects.subtext}
        titleClassName="uppercase"
        meta={
          <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{dict.projects.eyebrow}</Badge>
              <Badge variant="secondary">Odoo</Badge>
              <Badge variant="secondary">Python</Badge>
          </div>
        }
        aside={
          <div className="grid gap-3">
            <Card size="sm" className="border border-border bg-card">
              <CardHeader className="pb-1">
                <CardDescription>{dict.projects.summaryLabel}</CardDescription>
                <CardTitle className="flex items-center gap-2 text-2xl font-black">
                  <FolderKanban className="h-5 w-5 text-primary" />
                  {dict.projects.summaryValue.replace(
                    "{count}",
                    String(odooProjects.length),
                  )}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card size="sm" className="border border-border bg-card">
              <CardHeader className="pb-1">
                <CardDescription>{dict.projects.stackLabel}</CardDescription>
                <CardTitle className="flex items-center gap-2 text-base font-black">
                  <Layers3 className="h-4 w-4 text-primary" />
                  Odoo + Python
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        }
      />

      <section className="bg-muted/35 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {odooProjects.map((project) => (
              <Card
                key={project.slug}
                className="h-full border border-border bg-card transition-colors duration-200 hover:bg-muted/50"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge
                        variant="outline"
                        className="mb-3 font-sans text-[11px] tracking-wide"
                      >
                        {project.slug}
                      </Badge>
                      <CardTitle className="text-xl font-black tracking-[-0.025em]">
                        <h2>{project.title}</h2>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {project.summary[loc]}
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
                      className={actionLinkClassName}
                    >
                      {dict.projects.viewDetails}
                    </Link>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={actionLinkClassName}
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
