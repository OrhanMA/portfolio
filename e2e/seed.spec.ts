import { test, expect } from "@playwright/test";

test.describe("Seed", () => {
  test("homepage loads and is ready", async ({ page }) => {
    await page.goto("/fr");
    await expect(page.locator("h1")).toBeVisible();
    // Accept cookies to clear the consent banner for subsequent tests
    const acceptBtn = page.getByRole("button", { name: "Accepter" });
    if (await acceptBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await acceptBtn.click();
    }
  });
});
