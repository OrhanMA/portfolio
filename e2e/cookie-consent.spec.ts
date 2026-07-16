import { test, expect } from "@playwright/test";

test.describe("Cookie Consent", () => {
  test.beforeEach(async ({ page }) => {
    // Clear storage before each test
    await page.goto("/fr");
    await page.evaluate(() => localStorage.clear());
  });

  test("banner appears on first visit after delay", async ({ page }) => {
    await page.goto("/fr");

    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 2500 });
  });

  test("Accept hides the banner", async ({ page }) => {
    await page.goto("/fr");
    await page.getByRole("button", { name: "Accepter" }).click({ timeout: 2500 });

    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("banner does not appear after accepting", async ({ page }) => {
    await page.goto("/fr");
    await page.getByRole("button", { name: "Accepter" }).click({ timeout: 2500 });

    // Reload
    await page.reload();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("Reject hides the banner", async ({ page }) => {
    await page.goto("/fr");
    await page
      .getByRole("button", { name: "Refuser", exact: true })
      .click({ timeout: 2500 });

    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("preferences can be reopened and withdrawn from the footer", async ({ page }) => {
    await page.goto("/fr");
    await page.getByRole("button", { name: "Accepter" }).click({ timeout: 2500 });
    await page.getByRole("button", { name: "Gérer les cookies" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    const analyticsSwitch = page.getByRole("switch", {
      name: "Autoriser les cookies analytiques",
    });
    await expect(analyticsSwitch).toHaveAttribute("aria-checked", "true");
    await analyticsSwitch.click();
    await page.getByRole("button", { name: "Enregistrer" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(() =>
          JSON.parse(localStorage.getItem("cookie-consent") ?? "null"),
        ),
      )
      .toMatchObject({ analytics: false, version: 2 });
  });
});
