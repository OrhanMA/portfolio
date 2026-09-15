import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/route-structured-data", () => ({
  RouteStructuredData: () => null,
}));

import ProjectsPage from "../projects/page";

describe("ProjectsPage", () => {
  it("presents the Odoo repositories through three business solutions in French", async () => {
    const page = await ProjectsPage({
      params: Promise.resolve({ locale: "fr" }),
    });
    const { container } = render(page);
    const solutions = container.querySelector("[data-project-solutions]");

    expect(solutions).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Les solutions métier apportées" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Fiabiliser la finance et le pilotage" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Mieux qualifier, vendre et sécuriser les commandes" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Rendre les flux produits plus contrôlables" }),
    ).toBeInTheDocument();
    expect(solutions?.querySelectorAll("ol > li")).toHaveLength(3);
    expect(container.querySelector("[data-editorial-list='projects']")).toBeNull();
    expect(
      screen.getByRole("link", { name: "Explorer les dépôts open source" }),
    ).toHaveAttribute(
      "href",
      "https://github.com/OrhanMA?tab=repositories&q=odoo&type=source",
    );
  });

  it("keeps the business-solution presentation in English", async () => {
    const page = await ProjectsPage({
      params: Promise.resolve({ locale: "en" }),
    });
    const { container } = render(page);

    expect(
      screen.getByRole("heading", { name: "Business solutions delivered" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Making product flows easier to control" }),
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-project-solutions]")?.querySelectorAll("ol > li"),
    ).toHaveLength(3);
  });
});
