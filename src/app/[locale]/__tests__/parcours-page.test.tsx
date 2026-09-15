import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import fr from "@/app/[locale]/dictionaries/fr.json";
import en from "@/app/[locale]/dictionaries/en.json";

vi.mock("@/components/route-structured-data", () => ({
  RouteStructuredData: () => null,
}));

import ParcoursPage from "../parcours/page";

describe("ParcoursPage", () => {
  it.each([
    ["fr", fr],
    ["en", en],
  ] as const)("keeps experiences and education in separate timelines (%s)", async (locale, dict) => {
    const { container } = render(
      await ParcoursPage({ params: Promise.resolve({ locale }) }),
    );

    expect(
      screen.getByRole("heading", { level: 1, name: dict.parcoursPage.heading }),
    ).toBeInTheDocument();

    const timelineIntro = container.querySelector("[data-career-timeline-intro]");
    expect(timelineIntro).not.toBeNull();
    expect(
      within(timelineIntro as HTMLElement).getByRole("heading", {
        level: 2,
        name: dict.experience.heading,
      }),
    ).toBeInTheDocument();
    expect(timelineIntro).not.toHaveTextContent(dict.experience.orderingLabel);

    const experienceTrack = container.querySelector(
      '[data-career-track="experience"]',
    );
    const educationTrack = container.querySelector(
      '[data-career-track="education"]',
    );
    expect(experienceTrack).not.toBeNull();
    expect(educationTrack).not.toBeNull();

    for (const entry of dict.experience.entries) {
      const track = entry.type === "experience" ? experienceTrack : educationTrack;
      expect(track).not.toBeNull();
      const entryElement = track?.querySelector(`#experience-${entry.id}`);
      expect(entryElement).not.toBeNull();
      expect(entryElement).toHaveTextContent(entry.description);
      expect(
        within(entryElement as HTMLElement).getByRole("link", {
          name: dict.parcoursPage.viewDetail,
        }),
      ).toHaveAttribute("href", `/${locale}/parcours/${entry.id}`);
    }

    expect(container.querySelectorAll("[data-career-entry]")).toHaveLength(
      dict.experience.entries.length,
    );
    expect(container.querySelectorAll("[data-career-logo]").length).toBeGreaterThan(
      0,
    );

    const gaveau = container.querySelector(
      "#experience-a-gaveau-web-developer-internship",
    ) as HTMLElement;
    expect(gaveau.querySelector('img[src*="logo-a-gaveau"]')).toBeInTheDocument();
    expect(within(gaveau).getByRole("link", { name: "A. Gaveau" })).toHaveAttribute(
      "href",
      "https://a-gaveau.fr/",
    );

    const toeic = container.querySelector(
      "#experience-toeic-listening-reading",
    ) as HTMLElement;
    expect(toeic.querySelector('img[src*="logo-ets-global"]')).toBeInTheDocument();
    expect(within(toeic).getByRole("link", { name: "ETS Global" })).toHaveAttribute(
      "href",
      "https://www.etsglobal.org/fr/fr/test-type-family/test-toeic-listening-and-reading",
    );

    const cta = container.querySelector("[data-page-end-cta]");
    expect(cta).not.toBeNull();
    expect(
      within(cta as HTMLElement).getByRole("link", {
        name: dict.parcoursPage.discoverySkills,
      }),
    ).toHaveAttribute("href", `/${locale}/competences`);
    expect(
      within(cta as HTMLElement).getByRole("link", {
        name: dict.parcoursPage.discoveryAchievements,
      }),
    ).toHaveAttribute("href", `/${locale}/realisations`);
  });
});
