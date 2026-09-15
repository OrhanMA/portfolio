import { LinkedText } from "@/components/linked-text";
import { TopicLink } from "@/components/topic-link";
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
import { RouteStructuredData } from "@/components/route-structured-data";
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
    <>
      <RouteStructuredData locale={loc} pathname={`/${loc}/projects/${slug}`} />
      <EditorialPageHeader
        eyebrow={dict.projects.eyebrow}
        title={project.title}
        description={<LinkedText locale={loc} currentPath={`/projects/${slug}`}>{project.summary[loc]}</LinkedText>}
        leading={
          <Link
            href={`/${locale}/projects`}
          >
            <ArrowLeft />
            {dict.projects.backToProjects}
          </Link>
        }
        meta={
          <div>
            <Badge variant="outline">
              {project.slug}
            </Badge>
            <TopicLink label="Odoo" locale={loc} />
            <TopicLink label="Python" locale={loc} />
          </div>
        }
        aside={
          <div>
            <p>GitHub</p>
            <div>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={actionLinkClassName}
            >
              {dict.projects.viewProject}
              <ArrowUpRight />
            </a>
            <Link href={`/${locale}/projects`} className={actionLinkClassName}>
              {dict.projects.backToProjects}
            </Link>
            </div>
          </div>
        }
      />

      <section>
        <div>
          <aside>
            <p>
              {dict.projects.moduleAnatomy}
            </p>
            <div>
              {["Odoo", "Python", "Business workflow"].map((item) => (
                <TopicLink key={item} label={item} locale={loc} />
              ))}
            </div>
          </aside>
          <Card>
            <CardHeader>
              <CardTitle>
                <FolderGit2 />
                <h2>
                  {dict.projects.detailHeading}
                </h2>
              </CardTitle>
              <CardDescription>{dict.projects.detailSubtext}</CardDescription>
            </CardHeader>
            <CardContent>
              {project.businessProblem &&
                project.solution &&
                project.impact && (
                  <div>
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
                      >
                        <p>
                          {item.label}
                        </p>
                        <p>
                          <LinkedText locale={loc} currentPath={`/projects/${slug}`}>{item.value[loc]}</LinkedText>
                        </p>
                      </div>
                    ))}
                  </div>
                )}

              {project.technicalHighlights &&
                project.technicalHighlights.length > 0 && (
                  <div>
                    <p>
                      {dict.projects.technicalHighlights}
                    </p>
                    <div>
                      {project.technicalHighlights.map((highlight) => (
                        <div
                          key={highlight[loc]}
                        >
                          <LinkedText locale={loc} currentPath={`/projects/${slug}`}>{highlight[loc]}</LinkedText>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {project.details.map((paragraph, index) => (
                <div
                  key={paragraph[loc]}
                >
                  <span>
                    0{index + 1}
                  </span>
                  <p>
                    <LinkedText locale={loc} currentPath={`/projects/${slug}`}>{paragraph[loc]}</LinkedText>
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
