import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/radar-chart", () => ({
  RadarChart: () => <div data-testid="radar-chart" />,
}));
vi.mock("@/components/route-structured-data", () => ({
  RouteStructuredData: () => null,
}));

import CompetencesPage from "../competences/page";

describe("CompetencesPage", () => {
  it("balances each five-card category in a three-then-two desktop grid", async () => {
    const page = await CompetencesPage({
      params: Promise.resolve({ locale: "fr" }),
    });

    const { container } = render(page);
    const grids = container.querySelectorAll(".lg\\:grid-cols-6");

    expect(grids).toHaveLength(2);

    for (const grid of grids) {
      expect(grid.children).toHaveLength(5);
      expect(grid.children[0]).toHaveClass("lg:col-span-2");
      expect(grid.children[1]).toHaveClass("lg:col-span-2");
      expect(grid.children[2]).toHaveClass("lg:col-span-2");
      expect(grid.children[3]).toHaveClass("lg:col-span-3");
      expect(grid.children[4]).toHaveClass("lg:col-span-3");
    }

    expect(screen.getByRole("heading", { name: "Compétences humaines" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Compétences techniques" })).toBeInTheDocument();
  });
});
