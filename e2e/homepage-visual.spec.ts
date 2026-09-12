import { expect, test, type Page } from "@playwright/test";

async function prepareHomepage(page: Page, theme: "light" | "dark" = "light") {
  await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
  await page.addInitScript((selectedTheme) => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ necessary: true, analytics: false, version: 2, decidedAt: Date.now() }),
    );
    localStorage.setItem("theme", selectedTheme);
  }, theme);
  await page.goto("/fr", { waitUntil: "networkidle" });
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

    await expect(page).toHaveScreenshot("homepage-minimal-desktop.png", {
      fullPage: true,
      animations: "disabled",
      maxDiffPixelRatio: 0.02,
    });
  });

  test("mobile composition", async ({ page }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await prepareHomepage(page);

    await expect(page).toHaveScreenshot("homepage-minimal-mobile.png", {
      fullPage: true,
      animations: "disabled",
      maxDiffPixelRatio: 0.02,
    });
  });

  test("dark composition", async ({ page }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await prepareHomepage(page, "dark");

    await expect(page).toHaveScreenshot("homepage-minimal-dark.png", {
      fullPage: true,
      animations: "disabled",
      maxDiffPixelRatio: 0.02,
    });
  });

  test("uses the neutral portrait with the approved atmospheric background", async ({ page }) => {
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
    await page.goto("/fr", { waitUntil: "networkidle" });

    const portrait = page.locator('main img[src*="coporate-headshot"]');
    await expect(portrait).toBeVisible();
    await expect(portrait).toHaveCSS("filter", "none");
    await expect(page.locator("#realisations img").first()).toHaveCSS("filter", "none");
    await expect(page.locator('img[src*="/images/decorative/"]')).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: "Open issues overlay" }),
    ).toHaveCount(0);
    const atmosphere = page.locator('[data-page-atmosphere][data-family="home"]');
    await expect(atmosphere).toHaveCount(1);
    await expect(atmosphere).toHaveCSS("position", "fixed");
    await expect(atmosphere).toHaveCSS("pointer-events", "none");
    await expect(atmosphere.locator('img[src*="background-home"]')).toHaveCount(1);
  });
});
