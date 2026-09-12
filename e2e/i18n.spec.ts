import { test, expect } from "@playwright/test";

test.describe("Internationalization", () => {
  test("root path redirects to /fr (default locale)", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/fr/);
  });

  test("/fr shows French content", async ({ page }) => {
    await page.goto("/fr");
    await expect(page.locator("text=Accueil").first()).toBeVisible();
  });

  test("/en shows English content", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("text=Home").first()).toBeVisible();
  });

  test("language switcher toggles locale", async ({ page }) => {
    await page.goto("/fr");

    // Follow the progressive-enhancement language link.
    await page.locator('[data-language-switcher]:visible').click();
    await expect(page).toHaveURL(/\/en/);

    // The opposite language link is now available.
    await expect(page.locator('[data-language-switcher]:visible')).toHaveText("FR");
  });

  test("preserves filtered article lists and renews the CSP nonce", async ({
    page,
  }) => {
    const initialResponse = await page.goto("/fr/articles?q=odoo", {
      waitUntil: "networkidle",
    });
    const initialNonce = initialResponse
      ?.headers()["content-security-policy"]
      ?.match(/'nonce-([^']+)'/)?.[1];

    await expect(page.locator('input[type="search"]')).toHaveValue("odoo");
    const navigation = page.waitForNavigation({ waitUntil: "networkidle" });
    await page.locator('[data-language-switcher]:visible').click();
    const nextResponse = await navigation;

    await expect(page).toHaveURL(/\/en\/articles\?q=odoo$/);
    await expect(page.locator('input[type="search"]')).toHaveValue("odoo");
    expect(
      (await page.context().cookies()).find(
        (cookie) => cookie.name === "NEXT_LOCALE",
      )?.value,
    ).toBe("en");

    const nextNonce = nextResponse
      ?.headers()["content-security-policy"]
      ?.match(/'nonce-([^']+)'/)?.[1];
    expect(initialNonce).toBeTruthy();
    expect(nextNonce).toBeTruthy();
    expect(nextNonce).not.toBe(initialNonce);
  });

  test("preserves an article anchor when switching locale", async ({ page }) => {
    await page.goto("/fr/articles/migration-odoo-v16-v19#contexte", {
      waitUntil: "networkidle",
    });
    await expect(page.locator("#contexte")).toBeVisible();

    const navigation = page.waitForNavigation({ waitUntil: "networkidle" });
    await page.locator('[data-language-switcher]:visible').click();
    await navigation;

    await expect(page).toHaveURL(
      /\/en\/articles\/migration-odoo-v16-v19#contexte$/,
    );
    await expect(page.locator("#contexte")).toBeVisible();
  });

  test("can switch theme after a full locale navigation without CSP violations", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const violations: string[] = [];
      (
        window as typeof window & { __cspViolations?: string[] }
      ).__cspViolations = violations;
      window.addEventListener("securitypolicyviolation", (event) => {
        violations.push(`${event.violatedDirective}:${event.blockedURI}`);
      });
    });

    await page.goto("/fr", { waitUntil: "networkidle" });
    const navigation = page.waitForNavigation({ waitUntil: "networkidle" });
    await page.locator('[data-language-switcher]:visible').click();
    await navigation;

    await expect(page.locator("html")).toHaveClass(/(^|\s)light(\s|$)/);
    await page.getByRole("button", { name: "Toggle theme" }).click();
    await expect(page.locator("html")).toHaveClass(/(^|\s)dark(\s|$)/);

    const violations = await page.evaluate(
      () =>
        (window as typeof window & { __cspViolations?: string[] })
          .__cspViolations ?? [],
    );
    expect(violations, "securitypolicyviolation events after locale/theme change").toEqual(
      [],
    );
  });

  test("language preference persists across navigation", async ({ page }) => {
    await page.goto("/en");

    // Navigate to articles
    await page.click('nav a[href="/en/articles"]');
    await expect(page).toHaveURL(/\/en\/articles/);

    // Content should still be in English
    await expect(page.locator("h1")).toHaveText("Articles");
  });
});
