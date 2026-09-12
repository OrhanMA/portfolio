import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
vi.mock("@/components/route-structured-data", () => ({
  RouteStructuredData: () => null,
}));
import frDict from "@/app/[locale]/dictionaries/fr.json";
import enDict from "@/app/[locale]/dictionaries/en.json";
import { getCompetenceBySlug } from "@/lib/competences";
import { realisations } from "@/lib/realisations";
import type { Realisation } from "@/lib/realisations";
import RealisationDetailPage from "../realisations/[slug]/page";

const dictionaries = { fr: frDict, en: enDict } as const;
const locales = ["fr", "en"] as const;

type ContentKey = keyof Pick<
  Realisation,
  | "presentation"
  | "objectives"
  | "risks"
  | "steps"
  | "actors"
  | "results"
  | "aftermath"
  | "critique"
>;

type ContentSection = {
  id: string;
  key: ContentKey;
  label: keyof (typeof frDict)["realisationsPage"];
};

const contentSections: ContentSection[] = [
  { id: "presentation", key: "presentation", label: "presentationHeading" },
  { id: "objectives", key: "objectives", label: "objectivesHeading" },
  { id: "steps", key: "steps", label: "stepsHeading" },
  { id: "actors", key: "actors", label: "actorsHeading" },
  { id: "results", key: "results", label: "resultsHeading" },
  { id: "aftermath", key: "aftermath", label: "aftermathHeading" },
  { id: "critique", key: "critique", label: "critiqueHeading" },
];

function getContentMarker(content: string) {
  const firstSentence = content
    .split(/\n{2,}/)[0]
    .replace(/^\d+\.\s+/, "")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")

  return `${firstSentence.split(/\.\s|\.$/)[0]}.`;
}

async function renderRealisation(locale: (typeof locales)[number], slug: string) {
  const page = await RealisationDetailPage({
    params: Promise.resolve({ locale, slug }),
  });

  return render(page);
}

describe("RealisationDetailPage", () => {
  it.each(
    realisations.flatMap((realisation) =>
      locales.map((locale) => ({ locale, realisation })),
    ),
  )("renders every $locale section of $realisation.slug", async ({ locale, realisation }) => {
    const { container } = await renderRealisation(locale, realisation.slug);
    const dict = dictionaries[locale].realisationsPage;
    const sections: ContentSection[] = realisation.risks
      ? [
          ...contentSections.slice(0, 2),
          { id: "risks", key: "risks", label: "risksHeading" },
          ...contentSections.slice(2),
        ]
      : contentSections;

    expect(
      screen.getByRole("heading", { level: 1, name: realisation.title[locale] }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: dict.contentsHeading }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll(".realisation-content-deferred")).toHaveLength(
      sections.length,
    );

    for (const section of sections) {
      const content = realisation[section.key];
      const element = container.querySelector(`#${section.id}`);

      expect(element).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: dict[section.label],
        }),
      ).toBeInTheDocument();
      expect(content).toBeDefined();
      expect(element).toHaveTextContent(getContentMarker(content![locale]));
    }

    for (const competenceSlug of realisation.linkedCompetences) {
      const competence = getCompetenceBySlug(competenceSlug);

      expect(competence).toBeDefined();
      expect(
        within(container.querySelector("#linked-competences") as HTMLElement).getByRole("link", { name: competence?.title[locale] }),
      ).toHaveAttribute("href", `/${locale}/competences/${competenceSlug}`);
    }

    const experiences = dictionaries[locale].experience.entries.filter(
      (entry) => entry.linkedRealisations?.includes(realisation.slug),
    );
    expect(experiences.length).toBeGreaterThan(0);
    const experienceNavigation = within(screen.getByRole("navigation", {
      name: dict.linkedExperiencesHeading,
    }));
    expect(experienceNavigation.getAllByRole("link")).toHaveLength(experiences.length);
    for (const experience of experiences) {
      expect(experienceNavigation.getByRole("link", {
        name: `${experience.company} — ${experience.title}`,
      })).toHaveAttribute("href", `/${locale}#experience-${experience.id}`);
    }
  });

  it("keeps the long-form reading structure navigable", async () => {
    const { container } = await renderRealisation("fr", "portfolio-professionnel");
    const dict = dictionaries.fr.realisationsPage;

    expect(
      screen.getByRole("link", { name: dict.presentationHeading }),
    ).toHaveAttribute("href", "#presentation");
    expect(
      screen.getByRole("link", { name: dict.critiqueHeading }),
    ).toHaveAttribute("href", "#critique");
    expect(
      screen.getAllByRole("link", { name: dict.backToContents }),
    ).toHaveLength(8);
    expect(container.querySelectorAll(".realisation-content-deferred")).not.toHaveLength(0);
  });
});
