import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RealisationSummary } from "@/components/realisation-summary";

describe("RealisationSummary", () => {
  it("keeps four factual reading points and links the proof to its detail", () => {
    render(
      <RealisationSummary
        locale="fr"
        currentPath="/realisations/exemple"
        proofHref="#visual-proof-heading"
        labels={{
          heading: "Synthèse de la réalisation",
          context: "Contexte",
          role: "Mon rôle",
          result: "Résultat",
          proof: "Preuve",
          proofLink: "Accéder aux éléments détaillés",
        }}
        summary={{
          context: { fr: "Un contexte précis.", en: "A precise context." },
          role: { fr: "Un rôle précis.", en: "A precise role." },
          result: { fr: "Un résultat précis.", en: "A precise result." },
          proof: { fr: "Une preuve précise.", en: "A precise proof." },
        }}
      />,
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Synthèse de la réalisation");
    expect(screen.getByText("Contexte")).toBeInTheDocument();
    expect(screen.getByText("Mon rôle")).toBeInTheDocument();
    expect(screen.getByText("Résultat")).toBeInTheDocument();
    expect(screen.getByText("Preuve")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Accéder aux éléments détaillés" })).toHaveAttribute("href", "#visual-proof-heading");
  });
});
