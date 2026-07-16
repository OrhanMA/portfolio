import { describe, expect, it } from "vitest";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { renderWithProviders, screen } from "@/test/utils";

describe("EditorialPageHeader", () => {
  it("renders a semantic page title and decorative assets", () => {
    const { container } = renderWithProviders(
      <EditorialPageHeader
        eyebrow="Profil"
        title="À propos"
        description="Un parcours construit par la pratique."
      />,
    );

    expect(screen.getByRole("heading", { level: 1, name: "À propos" })).toBeInTheDocument();
    expect(screen.getByText("Profil")).toBeInTheDocument();
    expect(container.querySelector("[data-editorial-page-header]")).toBeInTheDocument();
    expect(container.querySelector('img[src="/images/decorative/sakura-petals-trio.svg"]')).toBeInTheDocument();
  });
});
