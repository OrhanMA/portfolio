import { describe, test, expect, vi, beforeEach } from "vitest";
import { page } from "vitest/browser";
import { renderWithProviders } from "@/test/browser-utils";
import { LanguageSwitcher } from "@/components/language-switcher";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/fr"),
  useRouter: vi.fn(() => ({
    push: mockPush,
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  })),
}));

describe("LanguageSwitcher (browser)", () => {
  beforeEach(() => {
    mockPush.mockReset();
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

  test("clicking switches locale", async () => {
    const { usePathname } = await import("next/navigation");
    vi.mocked(usePathname).mockReturnValue("/fr/contact");

    await renderWithProviders(<LanguageSwitcher />);

    const btn = page.getByRole("button", { name: /passer en anglais/i });
    await btn.click();

    expect(mockPush).toHaveBeenCalledWith("/en/contact");
  });

  test("sets NEXT_LOCALE cookie on switch", async () => {
    const { usePathname } = await import("next/navigation");
    vi.mocked(usePathname).mockReturnValue("/fr");

    await renderWithProviders(<LanguageSwitcher />);

    await page.getByRole("button", { name: /passer en anglais/i }).click();

    expect(document.cookie).toContain("NEXT_LOCALE=en");
  });
});
