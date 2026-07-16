import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { odooProjects } from "@/lib/odoo-projects";
import { competences } from "@/lib/competences";
import { realisations } from "@/lib/realisations";

const BASE_URL = "https://orhanmadiassani.com";
const CONTENT_LAST_UPDATED = new Date("2026-07-16T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/a-propos",
    "/competences",
    "/realisations",
    "/articles",
    "/projects",
    "/contact",
    "/mentions-legales",
    "/politique-confidentialite",
  ];
  const articles = [
    "odoo-session-timeout",
    "telecharger-code-odoo-jupyter",
    "docker-dangling-images",
    "migration-odoo-v16-v19",
    "refonte-site-corporate-1up",
    "application-cap2vie-lig",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: CONTENT_LAST_UPDATED,
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    }

    for (const slug of articles) {
      entries.push({
        url: `${BASE_URL}/${locale}/articles/${slug}`,
        lastModified: CONTENT_LAST_UPDATED,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    for (const project of odooProjects) {
      entries.push({
        url: `${BASE_URL}/${locale}/projects/${project.slug}`,
        lastModified: CONTENT_LAST_UPDATED,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const competence of competences) {
      entries.push({
        url: `${BASE_URL}/${locale}/competences/${competence.slug}`,
        lastModified: CONTENT_LAST_UPDATED,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const realisation of realisations) {
      entries.push({
        url: `${BASE_URL}/${locale}/realisations/${realisation.slug}`,
        lastModified: CONTENT_LAST_UPDATED,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
