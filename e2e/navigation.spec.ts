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

  test("uses the same red hover color across navigation links and controls", async ({
    page,
  }) => {
    await page.goto("/fr");

    const contactCta = page
      .locator("#main-content")
      .getByRole("link", { name: "Me contacter", exact: true })
      .first();
    const desktopNavigation = page.locator("[data-desktop-navigation]");
    const aboutLink = desktopNavigation.getByRole("link", {
      name: "À propos",
      exact: true,
    });
    const skillsTrigger = desktopNavigation.getByRole("button", {
      name: "Compétences",
      exact: true,
    });

    const readHoverColor = (locator: typeof contactCta) =>
      locator.evaluate((element) => {
        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        const context = canvas.getContext("2d");
        if (!context) return { color: "", rgba: [] };
        const color = getComputedStyle(element).color;
        context.fillStyle = color;
        context.fillRect(0, 0, 1, 1);
        return { color, rgba: [...context.getImageData(0, 0, 1, 1).data] };
      });

    await contactCta.hover();
    await page.waitForTimeout(250);
    const contactHoverColor = await readHoverColor(contactCta);

    await aboutLink.hover();
    await page.waitForTimeout(250);
    const aboutHoverColor = await readHoverColor(aboutLink);

    await skillsTrigger.hover();
    await page.waitForTimeout(250);
    const skillsHoverColor = await readHoverColor(skillsTrigger);

    expect(aboutHoverColor.rgba).toEqual(contactHoverColor.rgba);
    expect(skillsHoverColor.rgba).toEqual(contactHoverColor.rgba);
  });

  test("makes text links discoverable and keeps icon links on one line", async ({
    page,
  }) => {
    await page.goto("/fr");

    const statusLink = page.getByRole("link", {
      name: "En alternance chez 1UP",
      exact: true,
    });
    await expect(statusLink).toBeVisible();
    await expect
      .poll(() =>
        statusLink.evaluate((element) =>
          getComputedStyle(element).textDecorationLine,
        ),
      )
      .toContain("underline");

    const iconLinks = page.locator("#main-content a:has(> svg)");
    const iconLinkLayout = await iconLinks.evaluateAll((elements) =>
      elements.map((element) => {
        const style = getComputedStyle(element);
        return {
          display: style.display,
          flexWrap: style.flexWrap,
          whiteSpace: style.whiteSpace,
        };
      }),
    );

    expect(iconLinkLayout.length).toBeGreaterThan(0);
    expect(iconLinkLayout).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          display: "inline-flex",
          flexWrap: "nowrap",
          whiteSpace: "nowrap",
        }),
      ]),
    );
    expect(
      iconLinkLayout.every(
        ({ flexWrap, whiteSpace }) =>
          flexWrap === "nowrap" && whiteSpace === "nowrap",
      ),
    ).toBe(true);
  });

  test("timeline entries reveal on direct hash navigation", async ({ page }) => {
    await page.goto("/fr#parcours", { waitUntil: "load" });

    await expect(page).toHaveURL(/\/fr#parcours$/);
    const timeline = page.locator("#parcours");
    await expect(timeline).toBeInViewport();
    const entries = timeline.locator("ol > li[id^='experience-']");
    await expect(entries).toHaveCount(7);
    await expect(
      entries.first().getByRole("link", {
        name: "Développeur et consultant Odoo — Alternance",
      }),
    ).toHaveAttribute("href", "/fr/parcours/1up-fullstack-developer");
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

    const triggerBox = await competencesLink.boundingBox();
    const submenuBox = await competencesSubmenu.boundingBox();
    expect(triggerBox).not.toBeNull();
    expect(submenuBox).not.toBeNull();

    await page.mouse.move(
      triggerBox!.x + triggerBox!.width / 2,
      triggerBox!.y + triggerBox!.height - 1,
    );
    await page.mouse.move(
      submenuBox!.x + submenuBox!.width / 2,
      submenuBox!.y + 6,
    );
    await expect(competencesSubmenu).toBeVisible();
    await expect(
      desktopNavigation.getByRole("link", {
        name: "Autonomie",
        exact: true,
      }),
    ).toBeVisible();

    await page.mouse.move(
      triggerBox!.x + triggerBox!.width / 2,
      triggerBox!.y + triggerBox!.height / 2,
    );

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
