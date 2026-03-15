import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const BASE_URL = "https://orhanmadiassani.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/articles", "/contact", "/mentions-legales", "/politique-confidentialite"];
  const articles = ["odoo-session-timeout", "telecharger-code-odoo-jupyter", "docker-dangling-images"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    }

    for (const slug of articles) {
      entries.push({
        url: `${BASE_URL}/${locale}/articles/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
