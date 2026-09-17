import { expect, test } from "@playwright/test";

test.describe("motion and language accessibility", () => {
  test("shows the English radar immediately in reduced motion mode", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
    await page.addInitScript(() => {
      const samples: Array<{ computed: string; inline: string }> = [];
      (
        window as typeof window & {
          __radarOpacitySamples?: Array<{ computed: string; inline: string }>;
        }
      ).__radarOpacitySamples = samples;

      const observer = new MutationObserver((records) => {
        for (const record of records) {
          if (!(record.target instanceof Element)) continue;
          if (
            !record.target.matches("[data-radar-polygon], [data-radar-label]")
          ) {
            continue;
          }
          samples.push({
            computed: getComputedStyle(record.target).opacity,
            inline: (record.target as SVGElement).style.opacity,
          });
        }
      });

      observer.observe(document.documentElement, {
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "style"],
      });
    });

    await page.goto("/en/competences", { waitUntil: "networkidle" });

    const radar = page.locator("[data-radar-chart]");
    await expect(radar).toBeVisible();
    await expect(radar.locator("[data-radar-polygon]")).toBeVisible();
    await expect(radar.locator("[data-radar-label]").first()).toBeVisible();
    await expect(radar.locator("desc")).toContainText("out of 100");
    await expect(radar.locator("desc")).not.toContainText("sur 100");

    const opacitySamples = await page.evaluate(
      () =>
        (
          window as typeof window & {
            __radarOpacitySamples?: Array<{
              computed: string;
              inline: string;
            }>;
          }
        )
          .__radarOpacitySamples ?? [],
    );
    expect(
      opacitySamples.every(
        ({ computed, inline }) => computed === "1" && (inline === "" || inline === "1"),
      ),
      "reduced-motion radar opacity samples",
    ).toBe(true);
  });

  test("marks the translated MDX body with the English article language", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
    await page.goto("/en/articles/migration-odoo-v16-v19", {
      waitUntil: "networkidle",
    });

    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    const article = page.locator("article[data-article-content]");
    await expect(article.locator(':scope > [lang="en"][data-article-body]')).toHaveCount(
      1,
    );
    await expect(
      article.locator(':scope > [lang="en"][data-article-body] h1'),
    ).toContainText("Odoo v16 to v19 migration");
    await expect(
      page.getByText(
        "Articles are written in French; browser translation works well.",
      ),
    ).toHaveCount(0);
  });
});
