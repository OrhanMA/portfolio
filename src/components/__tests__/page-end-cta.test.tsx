import { describe, expect, it } from "vitest";
import { PageEndCta } from "@/components/page-end-cta";
import { renderWithProviders, screen } from "@/test/utils";

describe("PageEndCta", () => {
  it.each([
    [
      "fr",
      "À propos",
      "Un profil full-stack orienté produit.",
      "Découvrir mon profil complet",
      "/fr/a-propos",
    ],
    [
      "en",
      "About",
      "A product-minded full-stack profile.",
      "Discover my full profile",
      "/en/a-propos",
    ],
  ] as const)(
    "renders the %s discovery destination as a primary action",
    (_locale, title, description, label, href) => {
      const { container } = renderWithProviders(
        <PageEndCta
          id="about-discovery"
          title={title}
          description={description}
          links={[{ href, label }]}
        />,
      );

      const section = container.querySelector("[data-page-end-cta]");
      expect(section).toHaveAttribute("aria-labelledby", "about-discovery-heading");
      expect(screen.getByRole("heading", { name: title })).toHaveAttribute(
        "id",
        "about-discovery-heading",
      );
      expect(screen.getByText(description)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", href);
      expect(screen.getByRole("link", { name: label })).toHaveAttribute(
        "data-page-end-cta-primary",
        "true",
      );
    },
  );
});
