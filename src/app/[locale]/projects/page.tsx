import { LinkedText } from "@/components/linked-text";
import { TopicLink } from "@/components/topic-link";
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
      <div>
      <EditorialPageHeader
        eyebrow={dict.projects.eyebrow}
        title={dict.projects.heading}
        description={dict.projects.subtext}
        titleClassName="uppercase"
        meta={
          <div>
              <Badge variant="outline">{dict.projects.eyebrow}</Badge>
              <TopicLink label="Odoo" locale={loc} />
              <TopicLink label="Python" locale={loc} />
          </div>
        }
        aside={
          <div>
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

      <section>
        <div>
          <div>
            {odooProjects.map((project) => (
              <Card
                key={project.slug}
              >
                <CardHeader>
                  <div>
                    <div>
                      <Badge
                        variant="outline"
                      >
                        {project.slug}
                      </Badge>
                      <CardTitle>
                        <h2><Link href={`/${loc}/projects/${project.slug}`}>{project.title}</Link></h2>
                      </CardTitle>
                      <CardDescription>
                        <LinkedText locale={loc}>{project.summary[loc]}</LinkedText>
                      </CardDescription>
                    </div>

                    <CardAction>
                      <div>
                        <PackageOpen />
                      </div>
                    </CardAction>
                  </div>
                </CardHeader>

                <CardContent>
                  <div>
                    <TopicLink label="Odoo" locale={loc} />
                    <TopicLink label="Python" locale={loc} />
                  </div>

                  <div>
                    <Link
                      href={`/${locale}/projects/${project.slug}`}
                    >
                      {dict.projects.viewDetails}
                    </Link>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {dict.projects.viewProject}
                      <ArrowUpRight />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
