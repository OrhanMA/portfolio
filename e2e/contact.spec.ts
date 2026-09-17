import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test("page loads with correct heading", async ({ page }) => {
    await page.goto("/fr/contact");
    await expect(page.locator("h1")).toHaveText("Me contacter");
  });

  test("form fields are visible", async ({ page }) => {
    await page.goto("/fr/contact");

    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test("form shows validation errors on empty submission", async ({ page }) => {
    await page.goto("/fr/contact");

    await page.click('button[type="submit"]');

    await expect(
      page.getByText("Le nom doit contenir au moins 2 caractères."),
    ).toBeVisible();
    await expect(page.getByText("Adresse de courriel invalide.")).toBeVisible();
    await expect(
      page.getByText("Veuillez sélectionner une raison."),
    ).toBeVisible();
    await expect(
      page.getByText("Le message doit contenir au moins 10 caractères."),
    ).toBeVisible();
  });

  test("English contact page loads correctly", async ({ page }) => {
    await page.goto("/en/contact");
    await expect(page.locator("h1")).toHaveText("Contact me");
    await page.click('button[type="submit"]');
    await expect(
      page.getByText("Your name must contain at least 2 characters."),
    ).toBeVisible();
  });
});
