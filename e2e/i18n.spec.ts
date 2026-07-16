import { test, expect } from "@playwright/test";

test.describe("Internationalization", () => {
  test("root path redirects to /fr (default locale)", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/fr/);
  });

  test("/fr shows French content", async ({ page }) => {
    await page.goto("/fr");
    await expect(page.locator("text=Accueil").first()).toBeVisible();
  });

  test("/en shows English content", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("text=Home").first()).toBeVisible();
  });

  test("language switcher toggles locale", async ({ page }) => {
    await page.goto("/fr");

    // Follow the progressive-enhancement language link.
    await page.locator('[data-language-switcher]:visible').click();
    await expect(page).toHaveURL(/\/en/);

    // The opposite language link is now available.
    await expect(page.locator('[data-language-switcher]:visible')).toHaveText("FR");
  });

  test("language preference persists across navigation", async ({ page }) => {
    await page.goto("/en");

    // Navigate to articles
    await page.click('nav a[href="/en/articles"]');
    await expect(page).toHaveURL(/\/en\/articles/);

    // Content should still be in English
    await expect(page.locator("h1")).toHaveText("Articles");
  });
});
