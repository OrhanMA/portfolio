import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.describe.configure({ mode: "serial", timeout: 60_000 });

  test("home page loads correctly", async ({ page }) => {
    await page.goto("/fr");
    await expect(
      page.getByRole("heading", { name: "Orhan Madi Assani", exact: true }),
    ).toBeVisible();
  });

  test("timeline entries reveal on direct hash navigation", async ({ page }) => {
    await page.goto("/fr#parcours", { waitUntil: "load" });

    await expect(
      page.getByRole("heading", {
        name: "Développeur Fullstack — Alternance",
      }),
    ).toBeVisible();
    await expect(page.locator("#parcours .experience-details")).toHaveCount(6);
    await expect(
      page.locator("#parcours .experience-details button[aria-expanded='false']"),
    ).toHaveCount(6);
  });

  test("articles page loads", async ({ page }) => {
    await page.goto("/fr/articles");
    await expect(
      page.getByRole("heading", { name: "Articles", exact: true }),
    ).toBeVisible();
  });

  test("contact page loads", async ({ page }) => {
    await page.goto("/fr/contact");
    await expect(
      page.getByRole("heading", { name: "Me contacter", exact: true }),
    ).toBeVisible();
  });

  test("projects page loads", async ({ page }) => {
    await page.goto("/fr/projects");
    await expect(
      page.getByRole("heading", { name: "Projets Odoo", exact: true }),
    ).toBeVisible();
  });

  test("project detail page loads", async ({ page }) => {
    await page.goto("/fr/projects/packing_list");
    await expect(
      page.getByRole("heading", { name: "Packing List", exact: true }),
    ).toBeVisible();
  });

  test("404 page renders for unknown routes", async ({ page }) => {
    await page.goto("/fr/nonexistent-page");
    await expect(page.locator("text=Page introuvable")).toBeVisible();
  });

  test("nav links work", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "cookie-consent",
        JSON.stringify({
          necessary: true,
          analytics: false,
          version: 2,
          decidedAt: Date.now(),
        }),
      );
    });
    await page.goto("/fr");
    const footer = page.locator("[data-site-footer]");

    await footer.getByRole("link", { name: "Articles", exact: true }).click();
    await expect(page).toHaveURL(/\/fr\/articles/);

    await page
      .locator("[data-site-footer]")
      .getByRole("link", { name: "Contact", exact: true })
      .click();
    await expect(page).toHaveURL(/\/fr\/contact/);

    await page.goto("/fr");
    await expect(
      page
      .locator("[data-site-footer]")
      .getByRole("link", { name: "Projets Odoo", exact: true }),
    ).toHaveAttribute("href", "/fr/projects");
  });
});
