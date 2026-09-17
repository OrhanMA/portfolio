import { TopicLink } from "@/components/topic-link";
import type { Metadata } from "next";
import { ArrowUpRight, FolderKanban, Layers3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createLocalizedMetadata } from "@/lib/metadata";
import { odooProjects } from "@/lib/odoo-projects";
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
    <>
      <RouteStructuredData locale={loc} pathname={`/${loc}/projects`} />
      <EditorialPageHeader
        className="projects-page-header"
        eyebrow={dict.projects.eyebrow}
        title={dict.projects.heading}
        description={dict.projects.subtext}
        titleClassName="uppercase"
        meta={
          <div data-projects-meta>
            <Badge variant="outline">{dict.projects.eyebrow}</Badge>
            <TopicLink label="Odoo" locale={loc} />
            <TopicLink label="Python" locale={loc} />
          </div>
        }
        aside={
          <div data-projects-summary>
            <Card size="sm">
              <CardHeader>
                <CardDescription>{dict.projects.summaryLabel}</CardDescription>
                <CardTitle>
                  <FolderKanban />
                  {dict.projects.summaryValue.replace(
                    "{count}",
                    String(odooProjects.length),
                  )}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card size="sm">
              <CardHeader>
                <CardDescription>{dict.projects.stackLabel}</CardDescription>
                <CardTitle>
                  <Layers3 />
                  <TopicLink label="Odoo" locale={loc} /> + <TopicLink label="Python" locale={loc} />
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        }
      />

      <section data-project-solutions aria-labelledby="project-solutions-heading">
        <div>
          <header>
            <h2 id="project-solutions-heading">{dict.projects.solutionsHeading}</h2>
            <p>{dict.projects.solutionsLead}</p>
          </header>

          <ol>
            {dict.projects.solutions.map((solution) => (
              <li key={solution.title}>
                <article>
                  <p>{solution.scope}</p>
                  <div>
                    <h3>{solution.title}</h3>
                    <p>{solution.description}</p>
                    <p>{solution.outcome}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>

          <a
            href="https://github.com/OrhanMA?tab=repositories&q=odoo&type=source"
            target="_blank"
            rel="noopener noreferrer"
            className={actionLinkClassName}
          >
            {dict.projects.viewRepositories}
            <ArrowUpRight />
          </a>
        </div>
      </section>
    </>
  );
}
