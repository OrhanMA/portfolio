import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("home page loads correctly", async ({ page }) => {
    await page.goto("/fr");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("timeline entries reveal on direct hash navigation", async ({ page }) => {
    await page.goto("/fr#parcours", { waitUntil: "networkidle" });

    await expect(
      page.getByRole("heading", {
        name: "Développeur Fullstack — Alternance",
      }),
    ).toBeVisible();
    await expect(page.locator("#parcours details")).toHaveCount(6);
  });

  test("articles page loads", async ({ page }) => {
    await page.goto("/fr/articles");
    await expect(page.locator("h1")).toHaveText("Articles");
  });

  test("contact page loads", async ({ page }) => {
    await page.goto("/fr/contact");
    await expect(page.locator("h1")).toHaveText("Me contacter");
  });

  test("projects page loads", async ({ page }) => {
    await page.goto("/fr/projects");
    await expect(page.locator("h1")).toHaveText("Projets Odoo");
  });

  test("project detail page loads", async ({ page }) => {
    await page.goto("/fr/projects/packing_list");
    await expect(page.locator("h1")).toHaveText("Packing List");
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

    await page.goto("/fr");

    // Click projects link in nav
    await page.click('nav a[href="/fr/projects"]');
    await expect(page).toHaveURL(/\/fr\/projects/);
  });
});
