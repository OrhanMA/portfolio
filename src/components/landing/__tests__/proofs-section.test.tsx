import { describe, expect, it } from "vitest";
import { ProofsSection } from "@/components/landing/proofs-section";
import { renderWithProviders, screen } from "@/test/utils";

describe("ProofsSection", () => {
  it("renders links to the public proof documents", () => {
    renderWithProviders(<ProofsSection locale="fr" />);

    expect(
      screen.getByRole("heading", {
        name: "Quelques preuves vérifiables du parcours.",
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /CV professionnel/ })).toHaveAttribute(
      "href",
      "/proofs/orhan-madi-assani-cv.pdf",
    );
    expect(screen.getByRole("link", { name: /Certification TOEIC/ })).toHaveAttribute(
      "href",
      "/proofs/certificate_20251030105639_toeic_filigrane.pdf",
    );
    expect(screen.getByRole("link", { name: /Titre CDA/ })).toHaveAttribute(
      "href",
      "/proofs/diplome_cda_filigrane.pdf",
    );
    expect(screen.getByRole("link", { name: /Titre DWWM/ })).toHaveAttribute(
      "href",
      "/proofs/titre-dwwm_filigrane.pdf",
    );

    expect(screen.getByRole("link", { name: "Me contacter" })).toHaveAttribute(
      "href",
      "/fr/contact",
    );
  });
});
