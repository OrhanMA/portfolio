import { describe, expect, it } from "vitest";
import frDict from "@/app/[locale]/dictionaries/fr.json";
import { Footer } from "@/components/footer";
import { renderWithProviders, screen, within } from "@/test/utils";

describe("Footer", () => {
  it("exposes the secondary pages and legal links", () => {
    const { container } = renderWithProviders(<Footer dict={frDict} locale="fr" />);

    expect(container.querySelector('img[src*="footer-background"]')).toBeInTheDocument();

    const navigation = screen.getByRole("navigation", { name: "Navigation" });
    const links = within(navigation);

    expect(links.getByRole("link", { name: "À propos" })).toHaveAttribute(
      "href",
      "/fr/a-propos",
    );
    expect(links.getByRole("link", { name: "Compétences" })).toHaveAttribute(
      "href",
      "/fr/competences",
    );
    expect(links.getByRole("link", { name: "Réalisations" })).toHaveAttribute(
      "href",
      "/fr/realisations",
    );
    expect(links.getByRole("link", { name: "Projets Odoo" })).toHaveAttribute(
      "href",
      "/fr/projects",
    );
    expect(links.getByRole("link", { name: "Articles" })).toHaveAttribute(
      "href",
      "/fr/articles",
    );
    expect(links.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/fr/contact",
    );

    expect(screen.getByRole("link", { name: "Mentions légales" })).toHaveAttribute(
      "href",
      "/fr/mentions-legales",
    );
    expect(
      screen.getByRole("button", { name: "Gérer les cookies" }),
    ).toHaveClass("[font:inherit]");
    expect(
      screen.getByRole("button", { name: "Gérer les cookies" }),
    ).not.toHaveClass("uppercase");
    expect(screen.queryByText(/GSAP & shadcn\/ui/)).not.toBeInTheDocument();
  });

  it("exposes the public proof documents", () => {
    renderWithProviders(<Footer dict={frDict} locale="fr" />);

    const documents = screen.getByRole("navigation", { name: "Documents" });
    const links = within(documents);

    expect(links.getByRole("link", { name: "CV professionnel" })).toHaveAttribute(
      "href",
      "/proofs/orhan-madi-assani-cv.pdf",
    );
    expect(
      links.getByRole("link", { name: "Certification TOEIC" }),
    ).toHaveAttribute(
      "href",
      "/proofs/certificate_20251030105639_toeic_filigrane.pdf",
    );
    expect(links.getByRole("link", { name: "Titre CDA" })).toHaveAttribute(
      "href",
      "/proofs/diplome_cda_filigrane.pdf",
    );
    expect(links.getByRole("link", { name: "Titre DWWM" })).toHaveAttribute(
      "href",
      "/proofs/titre-dwwm_filigrane.pdf",
    );
  });
});
