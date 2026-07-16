import { expect, test } from "@playwright/test";

const articleSlugs = [
  "odoo-session-timeout",
  "telecharger-code-odoo-jupyter",
  "docker-dangling-images",
  "migration-odoo-v16-v19",
  "refonte-site-corporate-1up",
  "application-cap2vie-lig",
] as const;

test("every article keeps its editorial layout in both locales", async ({ page }) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.addInitScript(() => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ necessary: true, analytics: false, version: 2, decidedAt: Date.now() }),
    );
    localStorage.setItem("theme", "light");
  });

  for (const locale of ["fr", "en"] as const) {
    for (const slug of articleSlugs) {
      const route = `/${locale}/articles/${slug}`;
      const response = await page.goto(route, { waitUntil: "load" });

      expect(response?.status(), route).toBe(200);
      await expect(page.locator("[data-article-masthead]"), route).toHaveCount(1);
      await expect(page.locator("article[data-article-content]"), route).toHaveCount(1);
      await expect(page.locator("article[data-article-content] h1"), route).toHaveCount(1);
      await expect(page.locator("article[data-article-content] h1"), route).toHaveCSS(
        "font-size",
        "72px",
      );
      await expect(page.locator("article[data-article-content] h2").first(), route).toBeVisible();
      await expect(page.locator("article[data-article-content] h2").first(), route).toHaveCSS(
        "border-top-width",
        "1px",
      );
      if (slug === "odoo-session-timeout") {
        await expect(page.locator("article[data-article-content] pre").first(), route).toHaveCSS(
          "border-left-width",
          "3px",
        );
        await expect(page.locator("article[data-article-content] pre code").first(), route).toHaveCSS(
          "background-color",
          "rgba(0, 0, 0, 0)",
        );
        await expect(
          page.getByRole("button", {
            name: locale === "fr" ? "Copier le code" : "Copy code",
          }),
          route,
        ).toHaveCount(4);
      }
      await expect(page.locator("article[data-article-content]")).toHaveClass(/prose/);
    }
  }
});
