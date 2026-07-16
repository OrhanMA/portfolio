import { expect, test, type Page } from "@playwright/test";

type AuditedRoute = {
  path: string;
  editorial: boolean;
  expectedStatus?: number;
};

const routes: readonly AuditedRoute[] = [
  { path: "/fr/a-propos", editorial: true },
  { path: "/fr/competences", editorial: true },
  { path: "/fr/competences/developpement-backend", editorial: true },
  { path: "/fr/realisations", editorial: true },
  { path: "/fr/realisations/migration-odoo-v16-v19", editorial: true },
  { path: "/fr/projects", editorial: true },
  { path: "/fr/projects/account_invoice_context", editorial: true },
  { path: "/fr/articles", editorial: true },
  { path: "/fr/articles/migration-odoo-v16-v19", editorial: false },
  { path: "/fr/contact", editorial: true },
  { path: "/fr/mentions-legales", editorial: true },
  { path: "/fr/politique-confidentialite", editorial: true },
  { path: "/en/about", editorial: false, expectedStatus: 404 },
  { path: "/en/a-propos", editorial: true },
  { path: "/en/skills", editorial: false, expectedStatus: 404 },
  { path: "/en/competences", editorial: true },
  { path: "/en/realisations", editorial: true },
  { path: "/en/contact", editorial: true },
];

async function preparePage(page: Page) {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.addInitScript(() => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ necessary: true, analytics: false, version: 2, decidedAt: Date.now() }),
    );
    localStorage.setItem("theme", "light");
  });
}

for (const viewport of [
  { label: "desktop", width: 1280, height: 900 },
  { label: "mobile", width: 390, height: 844 },
] as const) {
  test(`secondary routes stay healthy on ${viewport.label}`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize(viewport);
    await preparePage(page);

    for (const route of routes) {
      const response = await page.goto(route.path, { waitUntil: "load" });
      expect(response?.status(), route.path).toBe(route.expectedStatus ?? 200);

      await expect(page.locator("h1"), route.path).toHaveCount(1);

      if ((route.expectedStatus ?? 200) === 200) {
        await expect(
          page.locator("header#primary-navigation"),
          route.path,
        ).toHaveCount(1);
        await expect(page.locator("footer"), route.path).toHaveCount(1);
        await expect(page.locator("html"), route.path).toHaveAttribute(
          "lang",
          route.path.split("/")[1],
        );
        await expect(page.locator("img:not([alt])"), route.path).toHaveCount(0);

        const duplicateIds = await page.evaluate(() => {
          const ids = [...document.querySelectorAll<HTMLElement>("[id]")].map(
            (element) => element.id,
          );
          return [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
        });
        expect(duplicateIds, `${route.path} duplicate ids`).toEqual([]);
      }

      if (route.editorial) {
        await expect(
          page.locator("[data-editorial-page-header]"),
          route.path,
        ).toHaveCount(1);
      }

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, `${route.path} overflows horizontally`).toBeLessThanOrEqual(
        1,
      );

      if ((route.expectedStatus ?? 200) === 200) {
        const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
        expect(canonical, `${route.path} canonical`).toBe(
          `https://orhanmadiassani.com${route.path}`,
        );
      }
    }
  });
}
