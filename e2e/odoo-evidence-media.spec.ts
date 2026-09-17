import { expect, test, type Locator, type Page } from "@playwright/test";

const jiraPath = "/images/project-screenshots/odoo/jira-odoo-workflow-board.png";
const realisationMediaPaths = [
  "/images/project-screenshots/odoo/odoo-success-migration-v17.png",
  "/images/project-screenshots/odoo/odoo-success-migration-v18.png",
  "/images/project-screenshots/odoo/odoo-success-migration-v19.png",
  "/images/project-screenshots/odoo/migration-filter-removal-inventory.png",
  "/images/project-screenshots/odoo/migration-git-commits-jan21-26.png",
  "/images/project-screenshots/odoo/migration-git-commits-jan27-28.png",
  "/images/project-screenshots/odoo/migration-git-commits-feb06-08.png",
  "/images/project-screenshots/odoo/migration-hooks-fields-access-rights.png",
  "/images/project-screenshots/odoo/migration-studio-views-pre-migrate.png",
  "/images/project-screenshots/odoo/migration-qweb-reports-post-migrate.png",
  "/images/project-screenshots/odoo/migration-obsolete-automations-cleanup.png",
  "/images/project-screenshots/odoo/migration-filters-data-templates.png",
  "/images/project-screenshots/odoo/migration-business-views-reactivation.png",
  "/images/project-screenshots/odoo/migration-contact-references-post-init.png",
  "/images/project-screenshots/odoo/migration-odoo19-modules-loaded.png",
  jiraPath,
] as const;
const viewports = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
] as const;
const locales = ["fr", "en"] as const;
const themes = ["light", "dark"] as const;

async function preparePage(page: Page, theme: (typeof themes)[number]) {
  await page.addInitScript((selectedTheme) => {
    localStorage.setItem("theme", selectedTheme);
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({
        necessary: true,
        analytics: false,
        version: 2,
        decidedAt: Date.now(),
      }),
    );
  }, theme);
  await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
}

async function expectLoadedImage(image: Locator) {
  await image.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      image.evaluate(
        (element) =>
          element instanceof HTMLImageElement &&
          element.complete &&
          element.naturalWidth > 0,
      ),
    )
    .toBe(true);
}

async function expectNoHorizontalOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);
}

async function expectReadableCaptions(gallery: Locator) {
  const captions = gallery.locator("figcaption");
  expect(await captions.count()).toBeGreaterThan(0);
  expect(
    await captions.evaluateAll((elements) =>
      elements.every((element) => {
        const style = getComputedStyle(element);
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          style.color !== "rgba(0, 0, 0, 0)"
        );
      }),
    ),
  ).toBe(true);
}

async function expectTouchFriendlyControls(gallery: Locator) {
  const buttons = gallery.locator("[data-evidence-carousel-controls] button");
  await expect(buttons).toHaveCount(3);

  for (let index = 0; index < 3; index += 1) {
    const box = await buttons.nth(index).boundingBox();
    expect(box).not.toBeNull();
    expect(box?.height).toBeGreaterThanOrEqual(44);
    expect(box?.width).toBeGreaterThanOrEqual(44);
  }
}

test.describe("Odoo evidence carousels", () => {
  test.describe.configure({ timeout: 120_000 });

  test("advances after ten seconds and stays still when paused", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("theme", "light");
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
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/fr/realisations/migration-odoo-v16-v19", {
      waitUntil: "domcontentloaded",
    });

    const gallery = page.locator(
      "[data-realisation-media] [data-evidence-media-grid]",
    );
    const item = gallery.locator("[data-evidence-media-item]");
    await expect(item).toHaveAttribute("data-evidence-media-index", "0");
    await expect
      .poll(() => item.getAttribute("data-evidence-media-index"), {
        timeout: 12_000,
      })
      .toBe("1");

    await gallery.getByRole("button", { name: "Mettre en pause" }).click();
    await page.waitForTimeout(10_500);
    await expect(item).toHaveAttribute("data-evidence-media-index", "1");
  });

  for (const locale of locales) {
    for (const theme of themes) {
      for (const viewport of viewports) {
        test(`${locale} ${theme} ${viewport.name}`, async ({ page }) => {
          await page.setViewportSize(viewport);
          await preparePage(page, theme);

          await page.goto(`/${locale}/realisations/migration-odoo-v16-v19`, {
            waitUntil: "domcontentloaded",
          });
          const realisationGallery = page.locator(
            "[data-realisation-media] [data-evidence-media-grid]",
          );
          await expect(realisationGallery).toHaveAttribute(
            "data-evidence-carousel-count",
            String(realisationMediaPaths.length),
          );
          await expectTouchFriendlyControls(realisationGallery);
          await expectReadableCaptions(realisationGallery);
          await expectNoHorizontalOverflow(page);

          const nextLabel = locale === "fr" ? "Suivant" : "Next";
          const nextButton = realisationGallery.getByRole("button", {
            name: nextLabel,
          });

          for (const [index, path] of realisationMediaPaths.entries()) {
            const item = realisationGallery.locator("[data-evidence-media-item]");
            await expect(item).toHaveCount(1);
            await expect(item).toHaveAttribute(
              "data-evidence-media-index",
              String(index),
            );

            const image = item.locator("img");
            await expect(image).toHaveCount(1);
            await expectLoadedImage(image);

            const fullSizeLink = item.locator("[data-evidence-media-full-size]");
            await expect(fullSizeLink).toHaveAttribute("href", path);

            if (index === 0) {
              await fullSizeLink.focus();
              await expect(fullSizeLink).toBeFocused();
              await nextButton.focus();
            }

            if (index < realisationMediaPaths.length - 1) {
              await nextButton.click();
            }
          }

          await expectNoHorizontalOverflow(page);

          await page.goto(`/${locale}/competences/developpement-odoo`, {
            waitUntil: "domcontentloaded",
          });
          const competenceGallery = page.locator(
            "[data-competence-media] [data-evidence-media-grid]",
          );
          await expect(competenceGallery).toHaveAttribute(
            "data-evidence-carousel-count",
            "1",
          );
          await expectLoadedImage(competenceGallery.locator("img"));
          await expectReadableCaptions(competenceGallery);
          await expectNoHorizontalOverflow(page);
          await expect(
            competenceGallery.locator("[data-evidence-carousel-controls]"),
          ).toHaveCount(0);

          const competenceFullSizeLink = competenceGallery.locator(
            "[data-evidence-media-full-size]",
          );
          await competenceFullSizeLink.focus();
          await expect(competenceFullSizeLink).toBeFocused();
          await expect(competenceFullSizeLink).toHaveAttribute("href", jiraPath);
        });
      }
    }
  }
});
