import { describe, test, expect, vi, beforeEach } from "vitest";
import { page } from "vitest/browser";
import { frDict, renderWithProviders } from "@/test/browser-utils";
import { CookieConsent } from "@/components/cookie-consent";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ContactForm } from "@/components/contact-form";

// Mock next/navigation for LanguageSwitcher
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/fr"),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  })),
}));

// Mock server action for ContactForm
vi.mock("@/app/[locale]/actions/contact", () => ({
  sendContactEmail: vi.fn(),
  submitContactForm: vi.fn(),
}));

// Mock reCAPTCHA for ContactForm
vi.mock("@/lib/recaptcha-client", () => ({
  executeRecaptcha: vi.fn(() => Promise.resolve("")),
  preloadRecaptcha: vi.fn(() => Promise.resolve()),
}));

describe("Visual Regression", () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = "cookie-consent-given=;max-age=0";
  });

  test("cookie consent banner", async () => {
    await renderWithProviders(<CookieConsent />);

    // Wait for banner to appear (1.5s delay)
    await expect
      .element(page.getByRole("heading", { name: "Cookies" }), { timeout: 3000 })
      .toBeVisible();

    await expect(page.getByRole("dialog")).toMatchScreenshot(
      "cookie-consent-banner",
    );
  });

  test("cookie consent with expanded preferences", async () => {
    await renderWithProviders(<CookieConsent />);

    // Wait and expand
    const manageBtn = page.getByRole("button", { name: /g[eé]rer/i });
    await expect.element(manageBtn, { timeout: 3000 }).toBeVisible();
    await manageBtn.click();

    await expect.element(page.getByText("Analytiques")).toBeVisible();

    await expect(page.getByRole("dialog")).toMatchScreenshot(
      "cookie-consent-expanded"
    );
  });

  test("language switcher FR state", async () => {
    const { usePathname } = await import("next/navigation");
    vi.mocked(usePathname).mockReturnValue("/fr");

    const { container } = await renderWithProviders(<LanguageSwitcher />);

    await expect
      .element(page.getByText("EN"))
      .toBeVisible();

    await expect(container).toMatchScreenshot(
      "language-switcher-fr"
    );
  });

  test("contact form", async () => {
    const { container } = await renderWithProviders(
      <ContactForm
        locale="fr"
        dict={{
          contactForm: frDict.contactForm,
          contactReasons: frDict.contactReasons,
          contactValidation: frDict.contactValidation,
          contactErrors: frDict.contactErrors,
          legal: frDict.legal,
        }}
      />
    );

    await expect
      .element(page.getByRole("button", { name: /envoyer/i }))
      .toBeVisible();

    await expect(container).toMatchScreenshot("contact-form");
  });
});
