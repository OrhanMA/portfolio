import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
vi.mock("@/components/route-structured-data", () => ({
  RouteStructuredData: () => null,
}));
import CompetenceDetailPage from "../competences/[slug]/page";
import frDict from "@/app/[locale]/dictionaries/fr.json";
import enDict from "@/app/[locale]/dictionaries/en.json";
import { getCompetenceBySlug } from "@/lib/competences";

const dictionaries = { fr: frDict, en: enDict } as const;
const locales = ["fr", "en"] as const;

describe("CompetenceDetailPage", () => {
  it("provides readable table-of-contents navigation and three achievement-backed proofs", async () => {
    const page = await CompetenceDetailPage({
      params: Promise.resolve({ locale: "fr", slug: "developpement-backend" }),
    });

    render(page);

    expect(
      screen.getByRole("heading", { name: "Développement Back-end & API" }),
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
    expect(screen.getAllByRole("link", { name: "Retour au sommaire" })).toHaveLength(5);

    const sectionIndexes = document.querySelectorAll("[data-section-index]");
    expect(Array.from(sectionIndexes, (index) => index.textContent)).toEqual([
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
    ]);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Les réalisations qui mettent la compétence à l'épreuve",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Ma contribution")).toHaveLength(3);

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

  it.each(locales)(
    "keeps the three Odoo anecdotes and adds the localized Jira evidence in %s",
    async (locale) => {
      const page = await CompetenceDetailPage({
        params: Promise.resolve({ locale, slug: "developpement-odoo" }),
      });
      const { container } = render(page);
      const competence = getCompetenceBySlug("developpement-odoo");
      const media = competence?.media?.[0];
      const evidence = container.querySelector("#evidence") as HTMLElement;
      const gallery = evidence.querySelector(
        "[data-competence-media] [data-evidence-media-grid]",
      ) as HTMLElement;

      expect(competence?.anecdotes).toHaveLength(3);
      expect(within(evidence).getAllByRole("heading", { level: 3 })).toHaveLength(3);
      expect(media?.src).toBe(
        "/images/project-screenshots/odoo/jira-odoo-workflow-board.png",
      );
      expect(gallery).toBeInTheDocument();
      expect(gallery).toHaveAttribute("data-evidence-carousel-count", "1");
      expect(
        within(gallery).queryByRole("button", {
          name: dictionaries[locale].competencesPage.mediaCarouselNext,
        }),
      ).not.toBeInTheDocument();

      const image = within(gallery).getByRole("img", {
        name: media?.title[locale],
      });
      const links = within(gallery).getAllByRole("link");

      expect(image).toHaveAttribute("alt", media?.title[locale]);
      expect(gallery).toHaveTextContent(media?.title[locale] ?? "");
      expect(gallery).toHaveTextContent(media?.description[locale] ?? "");
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAttribute("href", media?.src);
      expect(links[1]).toHaveAttribute("href", media?.src);
      expect(links[1]).toHaveTextContent(
        dictionaries[locale].competencesPage.mediaOpenFullSize,
      );
    },
  );
});
