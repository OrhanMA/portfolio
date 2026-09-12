import { describe, test, expect, beforeEach } from "vitest";
import { page } from "vitest/browser";
import { renderWithProviders } from "@/test/browser-utils";
import { CookieConsent } from "@/components/cookie-consent";
import { setStoredConsent } from "@/lib/cookie-consent";

describe("CookieConsent (browser)", () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = "cookie-consent-given=;max-age=0";
    document.cookie = "cookie-consent-analytics=;max-age=0";
  });

  test("does not render immediately", async () => {
    await renderWithProviders(<CookieConsent />);
    await expect
      .element(page.getByRole("heading", { name: "Cookies" }), { timeout: 500 })
      .not.toBeInTheDocument();
  });

  test("renders after 1.5s delay when no prior consent", async () => {
    await renderWithProviders(<CookieConsent />);

    // Real browser timing — no fake timers needed
    await expect
      .element(page.getByRole("heading", { name: "Cookies" }), { timeout: 3000 })
      .toBeVisible();
    await expect.element(page.getByRole("dialog")).toHaveFocus();
  });

  test("does not render when consent already given", async () => {
    setStoredConsent({ necessary: true, analytics: false });

    await renderWithProviders(<CookieConsent />);

    // Wait enough time — banner should never appear
    await new Promise((r) => setTimeout(r, 2000));
    await expect
      .element(page.getByRole("heading", { name: "Cookies" }), { timeout: 500 })
      .not.toBeInTheDocument();
  });

  test("Accept button stores consent and hides banner", async () => {
    await renderWithProviders(<CookieConsent />);

    // Wait for banner to appear
    const acceptBtn = page.getByRole("button", { name: "Accepter" });
    await expect.element(acceptBtn, { timeout: 3000 }).toBeVisible();

    await acceptBtn.click();

    // Banner should disappear
    await expect
      .element(page.getByRole("heading", { name: "Cookies" }), { timeout: 1000 })
      .not.toBeInTheDocument();

    // Consent stored in localStorage
    const stored = JSON.parse(localStorage.getItem("cookie-consent")!);
    expect(stored.analytics).toBe(true);
  });

  test("Reject button stores consent and hides banner", async () => {
    await renderWithProviders(<CookieConsent />);

    const rejectBtn = page.getByRole("button", {
      name: "Refuser",
      exact: true,
    });
    await expect.element(rejectBtn, { timeout: 3000 }).toBeVisible();

    await rejectBtn.click();

    await expect
      .element(page.getByRole("heading", { name: "Cookies" }), { timeout: 1000 })
      .not.toBeInTheDocument();

    const stored = JSON.parse(localStorage.getItem("cookie-consent")!);
    expect(stored.analytics).toBe(false);
  });

  test("Manage button expands preferences panel", async () => {
    await renderWithProviders(<CookieConsent />);

    const manageBtn = page.getByRole("button", { name: /g[eé]rer/i });
    await expect.element(manageBtn, { timeout: 3000 }).toBeVisible();

    await manageBtn.click();

    await expect.element(page.getByText("Analytiques")).toBeVisible();
    await expect.element(page.getByText("Nécessaires")).toBeVisible();
    await expect
      .element(page.getByRole("switch", { name: "Nécessaires" }))
      .toHaveAttribute("aria-checked", "true");
  });

  test("restores focus to the opener after closing preferences", async () => {
    setStoredConsent({ necessary: true, analytics: false });
    await renderWithProviders(
      <>
        <button type="button">Open preferences</button>
        <CookieConsent />
      </>,
    );

    const opener = page.getByRole("button", { name: "Open preferences" });
    await opener.click();
    window.dispatchEvent(new Event("cookie-consent-open"));

    await expect.element(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("button", { name: "Refuser", exact: true }).click();
    await expect
      .element(page.getByRole("dialog"), { timeout: 1000 })
      .not.toBeInTheDocument();
    await expect.element(opener).toHaveFocus();
  });
});
