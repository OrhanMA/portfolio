import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderWithProviders, screen, userEvent, act } from "@/test/utils";
import { CookieConsent } from "@/components/cookie-consent";

describe("CookieConsent", () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = "cookie-consent-given=;max-age=0";
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not render initially", () => {
    renderWithProviders(<CookieConsent />);
    expect(screen.queryByText("Cookies")).not.toBeInTheDocument();
  });

  it("renders after 1.5s delay when no prior consent", async () => {
    renderWithProviders(<CookieConsent />);

    // Wrap timer advance in act() so React processes the state update
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1600);
    });

    expect(screen.getByText("Cookies")).toBeInTheDocument();
  });

  it("does not render when consent already given", async () => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ necessary: true, analytics: false })
    );

    renderWithProviders(<CookieConsent />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    expect(screen.queryByText("Cookies")).not.toBeInTheDocument();
  });

  it("Accept button dispatches CustomEvent with analytics: true", async () => {
    renderWithProviders(<CookieConsent />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1600);
    });

    const dispatchSpy = vi.spyOn(window, "dispatchEvent");

    // Switch to real timers so userEvent works properly
    vi.useRealTimers();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Accepter" }));

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "cookie-consent-update",
        detail: { necessary: true, analytics: true },
      })
    );

    dispatchSpy.mockRestore();
  });

  it("Reject button dispatches CustomEvent with analytics: false", async () => {
    renderWithProviders(<CookieConsent />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1600);
    });

    const dispatchSpy = vi.spyOn(window, "dispatchEvent");

    vi.useRealTimers();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Refuser" }));

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "cookie-consent-update",
        detail: { necessary: true, analytics: false },
      })
    );

    dispatchSpy.mockRestore();
  });

  it("Manage button expands preferences", async () => {
    renderWithProviders(<CookieConsent />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1600);
    });

    vi.useRealTimers();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /gerer/i }));

    // Should show the preferences panel with analytics toggle
    expect(screen.getByText("Analytiques")).toBeInTheDocument();
    expect(screen.getByText("Necessaires")).toBeInTheDocument();
  });

  it("banner disappears after accepting", async () => {
    renderWithProviders(<CookieConsent />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1600);
    });

    vi.useRealTimers();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Accepter" }));

    expect(screen.queryByText("Cookies")).not.toBeInTheDocument();
  });

  it("stores consent in localStorage after accepting", async () => {
    renderWithProviders(<CookieConsent />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1600);
    });

    vi.useRealTimers();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Accepter" }));

    const stored = JSON.parse(localStorage.getItem("cookie-consent")!);
    expect(stored.analytics).toBe(true);
  });

  it("X button rejects all and hides banner", async () => {
    renderWithProviders(<CookieConsent />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1600);
    });

    vi.useRealTimers();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Fermer" }));

    expect(screen.queryByText("Cookies")).not.toBeInTheDocument();

    const stored = JSON.parse(localStorage.getItem("cookie-consent")!);
    expect(stored.analytics).toBe(false);
  });
});
