import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.describe.configure({ timeout: 60_000 });

  test("home page loads correctly", async ({ page }) => {
    await page.goto("/fr");
    await expect(
      page.getByRole("heading", { name: "Orhan Madi Assani", exact: true }),
    ).toBeVisible();
    const identity = page.locator("[data-site-identity]");
    await expect(identity).toContainText("Orhan Madi Assani");
  });

  test("timeline entries reveal on direct hash navigation", async ({ page }) => {
    await page.goto("/fr#parcours", { waitUntil: "load" });

    await expect(
      page.getByRole("heading", {
        name: "Développeur Fullstack — Alternance",
      }),
    ).toBeVisible();
    await expect(page.locator("#parcours .experience-details")).toHaveCount(7);
    await expect(
      page.locator("#parcours .experience-details button[aria-expanded='false']"),
    ).toHaveCount(7);
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
    const identity = page.locator("[data-site-identity]");
    await expect(identity).toContainText("Orhan Madi Assani");
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

  test("updates page JSON-LD after client navigation", async ({ page }) => {
    const readPageEntity = () =>
      page.evaluate(() => {
        const items = [...document.querySelectorAll<HTMLScriptElement>(
          'script[type="application/ld+json"]',
        )].flatMap((script) => {
          const graph = JSON.parse(script.textContent ?? "{}");
          return Array.isArray(graph["@graph"]) ? graph["@graph"] : [];
        });
        return items.find((item) =>
          ["ProfilePage", "WebPage"].includes(item["@type"]),
        );
      });

    await page.goto("/fr", { waitUntil: "networkidle" });
    await expect.poll(readPageEntity).toMatchObject({
      "@type": "ProfilePage",
      url: "https://orhanmadiassani.com/fr",
    });

    await page.locator('nav a[href="/fr/a-propos"]').first().click();
    await expect(page).toHaveURL(/\/fr\/a-propos$/);
    await expect.poll(readPageEntity).toMatchObject({
      "@type": "WebPage",
      url: "https://orhanmadiassani.com/fr/a-propos",
    });
  });

  test("closes a desktop submenu after navigating from a child link", async ({
    page,
  }) => {
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

    const desktopNavigation = page.locator("[data-desktop-navigation]");
    const competencesLink = desktopNavigation.getByRole("button", {
      name: "Compétences",
      exact: true,
    });
    const competencesSubmenu = desktopNavigation.locator(
      "#desktop-competences-submenu",
    );

    await competencesLink.hover();
    await expect(competencesSubmenu).toBeVisible();

    await competencesLink.press("Escape");
    await expect(competencesLink).toHaveAttribute("aria-expanded", "false");
    await expect(competencesLink).toBeFocused();
    await expect(competencesSubmenu).toBeHidden();

    await competencesLink.click();

    await desktopNavigation
      .getByRole("link", { name: "Autonomie", exact: true })
      .click();

    await expect(page).toHaveURL(/\/fr\/competences\/autonomie$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Autonomie", exact: true }),
    ).toBeVisible();
    await expect(competencesLink).toHaveAttribute("aria-expanded", "false");
    await expect(competencesSubmenu).toBeHidden();
  });

  test("closes the mobile navigation with Escape and restores focus", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
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

    const toggle = page.getByRole("button", {
      name: "Ouvrir ou fermer le menu",
    });
    await toggle.click();
    const panel = page.locator("#mobile-navigation-panel");

    await expect(panel).toBeVisible();
    await expect(toggle).toHaveAttribute(
      "aria-controls",
      "mobile-navigation-panel",
    );

    await page.keyboard.press("Escape");

    await expect(panel).toBeHidden();
    await expect(toggle).toBeFocused();
  });
});
