import { describe, test, expect, vi, beforeEach } from "vitest";
import { page } from "vitest/browser";
import { renderWithProviders } from "@/test/browser-utils";
import { LanguageSwitcher } from "@/components/language-switcher";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/fr"),
}));

describe("LanguageSwitcher (browser)", () => {
  beforeEach(() => {
    document.cookie = "NEXT_LOCALE=;max-age=0";
  });

  test('shows "EN" button when on French path', async () => {
    const { usePathname } = await import("next/navigation");
    vi.mocked(usePathname).mockReturnValue("/fr");

    await renderWithProviders(<LanguageSwitcher />);

    await expect
      .element(page.getByRole("button", { name: /passer en anglais/i }))
      .toBeVisible();
    await expect
      .element(page.getByText("EN"))
      .toBeInTheDocument();
  });

  test('shows "FR" button when on English path', async () => {
    const { usePathname } = await import("next/navigation");
    vi.mocked(usePathname).mockReturnValue("/en");

    await renderWithProviders(<LanguageSwitcher />, { locale: "en" });

    await expect
      .element(page.getByRole("button", { name: /switch to french/i }))
      .toBeVisible();
    await expect
      .element(page.getByText("FR"))
      .toBeInTheDocument();
  });

});
