import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import fr from "@/app/[locale]/dictionaries/fr.json";
import en from "@/app/[locale]/dictionaries/en.json";

// RouteStructuredData reads request headers in a server component. Keep this
// page-content test focused on the rendered timeline detail.
vi.mock("@/components/route-structured-data", () => ({
  RouteStructuredData: () => null,
}));

import ExperiencePage, { generateStaticParams } from "../parcours/[slug]/page";

const cases = (
  [
    ["fr", fr],
    ["en", en],
  ] as const
).flatMap(([locale, dict]) =>
  dict.experience.entries.map((entry) => ({ locale, dict, entry })),
);

describe("experience detail pages", () => {
  it.each(cases)(
    "renders $entry.id in $locale with internal navigation",
    async ({ locale, dict, entry }) => {
      const { container } = render(
        await ExperiencePage({
          params: Promise.resolve({ locale, slug: entry.id }),
        }),
      );
      expect(
        screen.getByRole("heading", { level: 1, name: entry.title }),
      ).toBeInTheDocument();
      expect(
        container.querySelector("[data-editorial-page-header]"),
      ).toHaveTextContent(entry.description);
      const detail = container.querySelector("[data-journey-detail]");
      expect(detail).not.toBeNull();
      expect(detail).toHaveTextContent(dict.experience.detailHeading);
      expect(detail).toHaveTextContent(entry.detail[0].text);
      expect(entry.detail).toHaveLength(
        entry.id === "toeic-listening-reading" ? 4 : 5,
      );
      if (entry.linkedRealisations?.length) {
        expect(detail).toHaveTextContent(dict.experience.caseStudiesHeading);
        expect(detail?.querySelectorAll("[data-journey-case-study]")).toHaveLength(
          entry.linkedRealisations.length,
        );
      }
      expect(
        screen.getByRole("link", { name: dict.experience.backToTimeline }),
      ).toHaveAttribute("href", `/${locale}/parcours#experience-${entry.id}`);
      expect(
        screen.getByRole("link", { name: dict.experience.organizationWebsite }),
      ).toHaveAttribute("href", entry.url);
      expect(container.querySelector("a a")).toBeNull();
      for (const link of container.querySelectorAll('a[href^="/"]')) {
        expect(link.getAttribute("href")).not.toBe(
          `/${locale}/parcours/${entry.id}`,
        );
      }
    },
  );
  it("generates one detail route per timeline entry", async () => {
    expect(await generateStaticParams()).toEqual(
      fr.experience.entries.map(({ id }) => ({ slug: id })),
    );
  });
});
