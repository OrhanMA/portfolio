import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderWithProviders, screen } from "@/test/utils";
import {
  LanguageSwitcher,
  replaceLocaleInUrl,
} from "@/components/language-switcher";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/fr"),
}));

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    document.cookie = "NEXT_LOCALE=;max-age=0";
  });

  it('shows "EN" when current pathname is French', async () => {
    const { usePathname } = await import("next/navigation");
    vi.mocked(usePathname).mockReturnValue("/fr");

    renderWithProviders(<LanguageSwitcher />);
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it('shows "FR" when current pathname is English', async () => {
    const { usePathname } = await import("next/navigation");
    vi.mocked(usePathname).mockReturnValue("/en");

    renderWithProviders(<LanguageSwitcher />, { locale: "en" });
    expect(screen.getByText("FR")).toBeInTheDocument();
  });

  it("replaces only the locale and keeps query and hash", () => {
    expect(
      replaceLocaleInUrl(
        "/fr/articles/migration-odoo-v16-v19",
        "en",
        "?q=odoo",
        "#contexte",
      ),
    ).toBe("/en/articles/migration-odoo-v16-v19?q=odoo#contexte");
  });

  it("has correct aria-label", async () => {
    const { usePathname } = await import("next/navigation");
    vi.mocked(usePathname).mockReturnValue("/fr");

    renderWithProviders(<LanguageSwitcher />);
    expect(
      screen.getByRole("button", { name: "Passer en anglais" }),
    ).toBeInTheDocument();
  });
});
