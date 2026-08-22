import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CompetenceDetailPage from "../competences/[slug]/page";

describe("CompetenceDetailPage", () => {
  it("provides a readable contents navigation and three achievement-backed proofs", async () => {
    const page = await CompetenceDetailPage({
      params: Promise.resolve({ locale: "fr", slug: "developpement-backend" }),
    });

    render(page);

    expect(
      screen.getByRole("heading", { name: "Développement Backend & API" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Sommaire" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Éléments de preuve" })).toHaveAttribute(
      "href",
      "#evidence",
    );
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Exposer des routes ERP ciblées pour le site B2B",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Modéliser et synchroniser un prototype de recherche",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Protéger la chaîne d'envoi du formulaire du portfolio",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Retour au sommaire" })).toHaveLength(4);

    const sectionIndexes = document.querySelectorAll("[data-section-index]");
    expect(Array.from(sectionIndexes, (index) => index.textContent)).toEqual([
      "I",
      "II",
      "III",
      "IV",
      "V",
    ]);

    const evidence = document.querySelector("#evidence");
    expect(
      Array.from(
        evidence?.querySelectorAll("[data-subsection-index]") ?? [],
        (index) => index.textContent,
      ),
    ).toEqual(["a.", "b.", "c."]);
  });

  it("shows the dated news item and official source in French", async () => {
    const page = await CompetenceDetailPage({
      params: Promise.resolve({ locale: "fr", slug: "autonomie" }),
    });

    render(page);

    expect(screen.getByText("Actualité liée")).toBeInTheDocument();
    expect(screen.getByText("2 février 2026")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Codex devient un poste de commande multi-agents",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Consulter la source : OpenAI/ })).toHaveAttribute(
      "href",
      "https://openai.com/index/introducing-the-codex-app/",
    );
  });

  it("localizes the news item in English", async () => {
    const page = await CompetenceDetailPage({
      params: Promise.resolve({ locale: "en", slug: "python" }),
    });

    render(page);

    expect(screen.getByText("Related news")).toBeInTheDocument();
    expect(screen.getByText("October 7, 2025")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Python 3.14 officially supports free-threaded mode",
      }),
    ).toBeInTheDocument();
  });
});
