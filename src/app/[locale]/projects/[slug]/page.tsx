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
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "../../dictionaries";
import { getOdooProjectBySlug, odooProjects } from "@/lib/odoo-projects";

const actionLinkClassName =
  "inline-flex h-8 w-fit shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px dark:border-input dark:bg-input/30 dark:hover:bg-input/50";

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

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | ${locale === "fr" ? "Projets" : "Projects"} | Orhan Madi Assani`,
    description: project.summary[locale as Locale],
  };
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

  const dict = await getDictionary(locale as Locale);

  return (
    <div className="px-6 pt-24 pb-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/${locale}/projects`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.projects.backToProjects}
        </Link>

        <div className="rounded-[2rem] border border-border/60 bg-card/85 p-8 shadow-sm backdrop-blur-sm sm:p-10">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="font-mono text-[11px] tracking-wide">
              {project.slug}
            </Badge>
            <Badge variant="secondary">Odoo</Badge>
            <Badge variant="secondary">Python</Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            {project.summary[locale as Locale]}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
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

        <div className="mt-8 grid gap-6">
          <Card className="border-border/50 bg-card/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderGit2 className="h-5 w-5 text-primary" />
                {dict.projects.detailHeading}
              </CardTitle>
              <CardDescription>{dict.projects.detailSubtext}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.details.map((paragraph) => (
                <p key={paragraph[locale as Locale]} className="leading-7 text-muted-foreground">
                  {paragraph[locale as Locale]}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
