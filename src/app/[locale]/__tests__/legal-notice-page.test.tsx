import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import fr from "@/app/[locale]/dictionaries/fr.json";
import en from "@/app/[locale]/dictionaries/en.json";

vi.mock("@/components/route-structured-data", () => ({
  RouteStructuredData: () => null,
}));

import LegalNoticePage from "../mentions-legales/page";

describe("LegalNoticePage", () => {
  it.each([
    ["fr", fr],
    ["en", en],
  ] as const)("renders the five legal sections in %s", async (locale, dict) => {
    const { container } = render(
      await LegalNoticePage({ params: Promise.resolve({ locale }) }),
    );
    const notice = container.querySelector("[data-legal-notice]");

    expect(notice).toBeInTheDocument();
    expect(notice?.querySelectorAll(":scope > div > div > section")).toHaveLength(5);
    expect(
      screen.getByRole("heading", { level: 1, name: dict.legal.heading }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: dict.legal.hosting }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: dict.legal.editorEmail })).toHaveAttribute(
      "href",
      `mailto:${dict.legal.editorEmail}`,
    );
  });
});
