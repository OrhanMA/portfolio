import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("home page loads correctly", async ({ page }) => {
    await page.goto("/fr");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("articles page loads", async ({ page }) => {
    await page.goto("/fr/articles");
    await expect(page.locator("h1")).toHaveText("Articles");
  });

  test("contact page loads", async ({ page }) => {
    await page.goto("/fr/contact");
    await expect(page.locator("h1")).toHaveText("Me contacter");
  });

  test("404 page renders for unknown routes", async ({ page }) => {
    await page.goto("/fr/nonexistent-page");
    await expect(page.locator("text=Page introuvable")).toBeVisible();
  });

  test("nav links work", async ({ page }) => {
    await page.goto("/fr");

    // Click articles link in nav
    await page.click('nav a[href="/fr/articles"]');
    await expect(page).toHaveURL(/\/fr\/articles/);

    // Click contact link in nav
    await page.click('nav a[href="/fr/contact"]');
    await expect(page).toHaveURL(/\/fr\/contact/);
  });
});
