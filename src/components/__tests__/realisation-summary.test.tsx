import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RealisationSummary } from "@/components/realisation-summary";

describe("RealisationSummary", () => {
  it("keeps a concise reading guide and links the proof to its detail", () => {
    render(
      <RealisationSummary
        locale="fr"
        currentPath="/realisations/exemple"
        proofHref="#visual-proof-heading"
        labels={{
          heading: "Synthèse de la réalisation",
          introduction: "Cet aperçu ne remplace pas l'étude de cas complète.",
          context: "Contexte",
          challenge: "Enjeu",
          role: "Mon rôle",
          decision: "Décision clé",
          result: "Résultat",
          proof: "Preuve",
          proofLink: "Accéder aux éléments détaillés",
        }}
        summary={{
          context: { fr: "Un contexte précis.", en: "A precise context." },
          challenge: { fr: "Un enjeu précis.", en: "A precise challenge." },
          role: { fr: "Un rôle précis.", en: "A precise role." },
          decision: { fr: "Une décision précise.", en: "A precise decision." },
          result: { fr: "Un résultat précis.", en: "A precise result." },
          proof: { fr: "Une preuve précise.", en: "A precise proof." },
        }}
      />,
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Synthèse de la réalisation");
    expect(screen.getByText("Contexte")).toBeInTheDocument();
    expect(screen.getByText("Enjeu")).toBeInTheDocument();
    expect(screen.getByText("Mon rôle")).toBeInTheDocument();
    expect(screen.getByText("Décision clé")).toBeInTheDocument();
    expect(screen.getByText("Résultat")).toBeInTheDocument();
    expect(screen.getByText("Preuve")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Accéder aux éléments détaillés" })).toHaveAttribute("href", "#visual-proof-heading");
  });
});
