import { expect, test, type Page } from "@playwright/test";

async function prepareHomepage(page: Page) {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.addInitScript(() => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ necessary: true, analytics: false, version: 2, decidedAt: Date.now() }),
    );
    localStorage.setItem("theme", "light");
  });
  await page.goto("/fr", { waitUntil: "load" });
  await page.locator(".landing-deferred").evaluateAll((elements) => {
    for (const element of elements) {
      const htmlElement = element as HTMLElement;
      htmlElement.style.contentVisibility = "visible";
      htmlElement.style.containIntrinsicSize = "none";
    }
  });
  await page.locator(".invisible").evaluateAll((elements) => {
    for (const element of elements) {
      (element as HTMLElement).style.visibility = "visible";
    }
  });
  await expect(
    page.getByRole("heading", { name: "Orhan Madi Assani" }),
  ).toBeVisible();
  await expect(page.locator("#documents a")).toHaveCount(4);
}

test.describe("Homepage visual regression", () => {
  test("desktop composition", async ({ page }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await prepareHomepage(page);

    await expect(page).toHaveScreenshot("homepage-japan-pop-desktop.png", {
      fullPage: true,
      animations: "disabled",
      maxDiffPixelRatio: 0.02,
    });
  });

  test("mobile composition", async ({ page }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await prepareHomepage(page);

    await expect(page).toHaveScreenshot("homepage-japan-pop-mobile.png", {
      fullPage: true,
      animations: "disabled",
      maxDiffPixelRatio: 0.02,
    });
  });

  test("about stamp hover keeps its shadow attached", async ({ page }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.emulateMedia({
      colorScheme: "light",
      reducedMotion: "no-preference",
    });
    await page.addInitScript(() => {
      localStorage.setItem(
        "cookie-consent",
        JSON.stringify({ necessary: true, analytics: false, version: 2, decidedAt: Date.now() }),
      );
      localStorage.setItem("theme", "light");
    });
    await page.goto("/fr", { waitUntil: "load" });

    const stamp = page.locator(".about-stamp").first();
    await stamp.scrollIntoViewIfNeeded();
    await expect(stamp).toBeVisible();
    await page.waitForTimeout(1_200);
    await stamp.scrollIntoViewIfNeeded();

    const before = await stamp.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return {
        y: rect.y,
        boxShadow: getComputedStyle(element).boxShadow,
      };
    });

    await stamp.hover();
    await page.waitForTimeout(320);

    const after = await stamp.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return {
        y: rect.y,
        boxShadow: getComputedStyle(element).boxShadow,
      };
    });

    expect(after.y).toBeLessThan(before.y - 7);
    expect(after.boxShadow).toBe(before.boxShadow);
  });
});
