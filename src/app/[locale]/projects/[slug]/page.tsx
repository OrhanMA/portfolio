import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, FolderGit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { parseLocale } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { getOdooProjectBySlug, odooProjects } from "@/lib/odoo-projects";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { actionLinkClassName } from "@/lib/styles";
import { getLocalizedPageContext } from "../../route-context";

export async function generateStaticParams() {
  return odooProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getOdooProjectBySlug(slug);
  const loc = parseLocale(locale);

  if (!project || !loc) {
    return {};
  }

  return createLocalizedMetadata({
    locale: loc,
    pathname: `/projects/${slug}`,
    title: `${project.title} | ${locale === "fr" ? "Projets" : "Projects"} | Orhan Madi Assani`,
    description: project.summary[loc],
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getOdooProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);

  return (
    <div>
      <EditorialPageHeader
        compact
        eyebrow={dict.projects.eyebrow}
        title={project.title}
        description={project.summary[loc]}
        leading={
          <Link
            href={`/${locale}/projects`}
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-foreground/65 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {dict.projects.backToProjects}
          </Link>
        }
        meta={
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="font-sans text-[11px] tracking-wide">
              {project.slug}
            </Badge>
            <Badge variant="secondary">Odoo</Badge>
            <Badge variant="secondary">Python</Badge>
          </div>
        }
        aside={
          <div className="border border-border bg-card p-5">
            <p className="editorial-index">GitHub</p>
            <div className="mt-5 flex flex-wrap gap-3 lg:flex-col">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={actionLinkClassName}
            >
              {dict.projects.viewProject}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link href={`/${locale}/projects`} className={actionLinkClassName}>
              {dict.projects.backToProjects}
            </Link>
            </div>
          </div>
        }
      />

      <section className="bg-muted/35 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="hidden border-t border-border/70 pt-5 lg:block">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Module anatomy
            </p>
            <div className="mt-5 grid gap-2">
              {["Odoo", "Python", "Business workflow"].map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="w-fit border border-border/50 bg-background/70 font-sans"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </aside>
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderGit2 className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-black uppercase tracking-[-0.025em]">
                  {dict.projects.detailHeading}
                </h2>
              </CardTitle>
              <CardDescription>{dict.projects.detailSubtext}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.businessProblem &&
                project.solution &&
                project.impact && (
                  <div className="grid gap-4 border-b border-border/70 pb-6 md:grid-cols-3">
                    {[
                      {
                        label: dict.projects.businessProblem,
                        value: project.businessProblem,
                      },
                      {
                        label: dict.projects.solution,
                        value: project.solution,
                      },
                      {
                        label: dict.projects.impact,
                        value: project.impact,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-lg border border-foreground/15 bg-background/75 p-4"
                      >
                        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                          {item.label}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                          {item.value[loc]}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

              {project.technicalHighlights &&
                project.technicalHighlights.length > 0 && (
                  <div className="border-b border-border/70 pb-6">
                    <p className="font-sans text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                      {dict.projects.technicalHighlights}
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {project.technicalHighlights.map((highlight) => (
                        <div
                          key={highlight[loc]}
                          className="rounded-lg border border-border/60 bg-muted/30 p-4 text-sm leading-6 text-muted-foreground"
                        >
                          {highlight[loc]}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {project.details.map((paragraph, index) => (
                <div
                  key={paragraph[loc]}
                  className="grid gap-4 border-t border-border/70 pt-5 first:border-t-0 first:pt-0 sm:grid-cols-[52px_1fr]"
                >
                  <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    0{index + 1}
                  </span>
                  <p className="leading-7 text-muted-foreground">
                    {paragraph[loc]}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
