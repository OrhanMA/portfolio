import { expect, test, type Page } from "@playwright/test";

async function preparePage(page: Page) {
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
    localStorage.setItem("theme", "light");
  });
}

test.describe("interactive control matrix", () => {
  test("desktop and mobile navigation controls reveal the right destinations", async ({
    page,
  }) => {
    await preparePage(page);
    await page.goto("/fr", { waitUntil: "networkidle" });

    const desktopNavigation = page.locator("[data-desktop-navigation]");
    const skills = desktopNavigation.getByRole("button", {
      name: "Compétences",
      exact: true,
    });
    await skills.click();
    await expect(skills).toHaveAttribute("aria-expanded", "true");
    await desktopNavigation
      .getByRole("link", { name: "Autonomie", exact: true })
      .click();
    await expect(page).toHaveURL(/\/fr\/competences\/autonomie$/);

    await page.goto("/fr", { waitUntil: "networkidle" });
    const achievements = desktopNavigation.getByRole("button", {
      name: "Réalisations",
      exact: true,
    });
    await achievements.click();
    await expect(achievements).toHaveAttribute("aria-expanded", "true");
    await desktopNavigation
      .locator('a[href="/fr/realisations/migration-odoo-v16-v19"]')
      .click();
    await expect(page).toHaveURL(/\/fr\/realisations\/migration-odoo-v16-v19$/);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/fr", { waitUntil: "networkidle" });
    await page
      .getByRole("button", { name: "Ouvrir ou fermer le menu" })
      .click();
    const mobilePanel = page.locator("#mobile-navigation-panel");
    await expect(mobilePanel).toBeVisible();
    await mobilePanel
      .getByRole("button", { name: "Afficher le sous-menu Compétences" })
      .click();
    await mobilePanel
      .getByRole("link", { name: "Autonomie", exact: true })
      .click();
    await expect(page).toHaveURL(/\/fr\/competences\/autonomie$/);
    await expect(mobilePanel).toBeHidden();
  });

  test("language, theme, search and topic controls preserve their visible state", async ({
    page,
  }) => {
    await preparePage(page);
    await page.goto("/fr/articles?q=odoo", { waitUntil: "networkidle" });

    const search = page.getByRole("searchbox", {
      name: "Rechercher par titre, contenu ou tag...",
    });
    await expect(search).toHaveValue("odoo");
    await page.getByRole("button", { name: "Effacer la recherche" }).click();
    await expect(search).toHaveValue("");
    await expect(page).toHaveURL(/\/fr\/articles$/);

    const allTopics = page.getByRole("button", { name: "Tous", exact: true });
    await allTopics.click();
    await expect(allTopics).toHaveAttribute("aria-pressed", "true");

    const themeToggle = page.getByRole("button", { name: "Changer de thème" });
    await themeToggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.getByRole("button", { name: "Passer en anglais" }).click();
    await expect(page).toHaveURL(/\/en\/articles$/);
    await expect(page.getByRole("button", { name: "Toggle theme" })).toBeVisible();
  });

  test("article copy buttons and the privacy-first video control acknowledge their action", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await preparePage(page);

    await page.goto("/fr/articles/migration-odoo-v16-v19", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Copier le lien" }).click();
    await expect(page.getByRole("button", { name: "Lien copié" })).toBeVisible();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain(
      "/fr/articles/migration-odoo-v16-v19",
    );

    await page.goto("/fr/articles/odoo-session-timeout", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Copier le code" }).first().click();
    await expect(page.getByRole("button", { name: "Code copié" })).toBeVisible();

    await page.goto("/fr/realisations/app-trajectoires-de-vie", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: /^Charger la vidéo:/ }).first().click();
    await expect(page.locator("iframe[src*='www.youtube-nocookie.com/embed/']").first()).toBeVisible();
  });
});
