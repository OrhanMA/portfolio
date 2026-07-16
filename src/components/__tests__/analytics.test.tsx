import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { Analytics } from "@/components/analytics";
import { setStoredConsent } from "@/lib/cookie-consent";

vi.mock("next/script", () => ({
  default: ({ id, src }: { id?: string; src?: string }) => (
    <span data-testid={id ?? "external-script"} data-src={src} />
  ),
}));

vi.mock("@vercel/speed-insights/next", () => ({
  SpeedInsights: () => <span data-testid="speed-insights" />,
}));

describe("Analytics", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("does not load analytics without explicit consent", () => {
    render(<Analytics />);
    expect(screen.queryByTestId("speed-insights")).not.toBeInTheDocument();
  });

  it("reacts to consent changes and enables field Web Vitals", async () => {
    render(<Analytics />);

    act(() => {
      const consent = { necessary: true, analytics: true } as const;
      setStoredConsent(consent);
      window.dispatchEvent(
        new CustomEvent("cookie-consent-update", { detail: consent }),
      );
    });

    expect(await screen.findByTestId("speed-insights")).toBeInTheDocument();
  });
});
