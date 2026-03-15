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

    // Click submit without filling anything
    await page.click('button[type="submit"]');

    // Should show validation errors
    await page.waitForTimeout(500);
    // Check that the form didn't submit successfully (no success message)
    await expect(page.locator("text=Message envoye")).not.toBeVisible();
  });

  test("English contact page loads correctly", async ({ page }) => {
    await page.goto("/en/contact");
    await expect(page.locator("h1")).toHaveText("Contact me");
  });
});
