import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderWithProviders, screen, userEvent } from "@/test/utils";
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

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    mockPush.mockReset();
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

  it("clicking switches locale and calls router.push", async () => {
    const { usePathname } = await import("next/navigation");
    vi.mocked(usePathname).mockReturnValue("/fr/contact");

    renderWithProviders(<LanguageSwitcher />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /switch to english/i }));

    expect(mockPush).toHaveBeenCalledWith("/en/contact");
  });

  it("sets NEXT_LOCALE cookie on switch", async () => {
    const { usePathname } = await import("next/navigation");
    vi.mocked(usePathname).mockReturnValue("/fr");

    renderWithProviders(<LanguageSwitcher />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /switch to english/i }));

    expect(document.cookie).toContain("NEXT_LOCALE=en");
  });

  it("has correct aria-label", async () => {
    const { usePathname } = await import("next/navigation");
    vi.mocked(usePathname).mockReturnValue("/fr");

    renderWithProviders(<LanguageSwitcher />);
    expect(
      screen.getByRole("button", { name: "Switch to English" })
    ).toBeInTheDocument();
  });
});
