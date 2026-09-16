import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import fr from "@/app/[locale]/dictionaries/fr.json";
import en from "@/app/[locale]/dictionaries/en.json";

vi.mock("@/components/route-structured-data", () => ({
  RouteStructuredData: () => null,
}));

import PrivacyPolicyPage from "../politique-confidentialite/page";

describe("PrivacyPolicyPage", () => {
  it.each([
    ["fr", fr],
    ["en", en],
  ] as const)("renders the six privacy sections in %s", async (locale, dict) => {
    const { container } = render(
      await PrivacyPolicyPage({ params: Promise.resolve({ locale }) }),
    );
    const policy = container.querySelector("[data-privacy-policy]");

    expect(policy).toBeInTheDocument();
    expect(policy?.querySelectorAll(":scope > div > div > section")).toHaveLength(6);
    expect(
      screen.getByRole("heading", { level: 1, name: dict.privacy.heading }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: dict.privacy.cookiesSection }),
    ).toBeInTheDocument();
    expect(container).toHaveTextContent(dict.privacy.lastUpdatedDate);
  });
});
