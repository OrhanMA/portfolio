import { expect, test } from "@playwright/test";

const representativeRoutes = [
  "/fr",
  "/fr/articles",
  "/fr/contact",
  "/en/articles/migration-odoo-v16-v19",
  "/fr/realisations/portfolio-professionnel",
] as const;

test.describe("runtime boundaries", () => {
  test("representative routes stay free of uncaught browser errors", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
    page.on("console", (message) => {
      if (message.type() === "error") {
        errors.push(`console: ${message.text()}`);
      }
    });

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

    for (const route of representativeRoutes) {
      const response = await page.goto(route, { waitUntil: "networkidle" });
      expect(response?.status(), route).toBe(200);
    }

    expect(errors, "browser errors on representative routes").toEqual([]);
  });

  test("the site remains usable when browser storage is refused", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.addInitScript(() => {
      for (const method of ["getItem", "setItem", "removeItem"] as const) {
        Storage.prototype[method] = () => {
          throw new DOMException("Storage is unavailable", "QuotaExceededError");
        };
      }
    });

    await page.goto("/fr", { waitUntil: "networkidle" });
    await expect(
      page.getByRole("heading", { name: "Orhan Madi Assani", exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 2500 });
    await page.getByRole("button", { name: "Refuser", exact: true }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();

    expect(errors, "browser errors with storage denied").toEqual([]);
  });
});

test.describe("calendar rendering", () => {
  test.use({ timezoneId: "America/Los_Angeles" });

  test("calendar dates remain stable in a west-coast timezone", async ({
    page,
  }) => {
    await page.goto("/fr/articles", { waitUntil: "networkidle" });

    const articleIndex = page.locator("main");
    await expect(articleIndex).toContainText("13 mai 2026");
    await expect(articleIndex).not.toContainText("12 mai 2026");
  });
});

test.describe("no-JavaScript fallback", () => {
  test.use({ javaScriptEnabled: false });

  test("keeps the server-rendered homepage readable", async ({ page }) => {
    await page.goto("/fr", { waitUntil: "load" });

    await expect(
      page.getByRole("heading", { name: "Orhan Madi Assani", exact: true }),
    ).toBeVisible();
    await expect(page.locator("#a-propos")).toContainText("À propos");
    await expect(page.locator("#a-propos article").first()).toBeVisible();
    await expect(page.getByRole("status")).toHaveCount(0);
  });

  test("keeps article links and a safe contact fallback without JavaScript", async ({
    page,
  }) => {
    await page.goto("/fr/articles", { waitUntil: "load" });
    await expect(page.locator("main a[href^='/fr/articles/']")).toHaveCount(6);

    await page.goto("/fr/contact", { waitUntil: "load" });
    const form = page.locator("form");
    await expect(form).toHaveAttribute("method", "post");
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
    await expect(
      page.getByRole("link", { name: "orhan.madi.assani@gmail.com" }).first(),
    ).toBeVisible();
  });
});

test("rapidly clearing article search converges URL and visible results", async ({
  page,
}) => {
  await page.goto("/fr/articles", { waitUntil: "networkidle" });
  const search = page.getByRole("searchbox");
  await search.fill("odoo");
  await search.fill("");

  await expect(search).toHaveValue("");
  await expect(page).toHaveURL(/\/fr\/articles$/);
  await expect(page.locator("main a[href^='/fr/articles/']")).toHaveCount(6);
});
