import { test, expect } from "@playwright/test";

test.describe("Cookie Consent", () => {
  test.beforeEach(async ({ page }) => {
    // Clear storage before each test
    await page.goto("/fr");
    await page.evaluate(() => localStorage.clear());
  });

  test("banner appears on first visit after delay", async ({ page }) => {
    await page.goto("/fr");

    // Banner should not be visible immediately
    await expect(page.locator("text=Cookies").first()).not.toBeVisible();

    // Wait for the 1.5s delay + render
    await page.waitForTimeout(2000);
    await expect(page.locator("text=Cookies").first()).toBeVisible();
  });

  test("Accept hides the banner", async ({ page }) => {
    await page.goto("/fr");
    await page.waitForTimeout(2000);

    await page.click('button:has-text("Accepter")');

    await expect(page.locator("text=Cookies").first()).not.toBeVisible();
  });

  test("banner does not appear after accepting", async ({ page }) => {
    await page.goto("/fr");
    await page.waitForTimeout(2000);
    await page.click('button:has-text("Accepter")');

    // Reload
    await page.reload();
    await page.waitForTimeout(2000);

    await expect(page.locator("text=Cookies").first()).not.toBeVisible();
  });

  test("Reject hides the banner", async ({ page }) => {
    await page.goto("/fr");
    await page.waitForTimeout(2000);

    await page.click('button:has-text("Refuser")');

    await expect(page.locator("text=Cookies").first()).not.toBeVisible();
  });
});
