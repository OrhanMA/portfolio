import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// RouteStructuredData reads request headers in a server component. Keep this
// page-content test focused on the rendered editorial sections.
vi.mock("@/components/route-structured-data", () => ({
  RouteStructuredData: () => null,
}));

import AboutPage from "../a-propos/page";

describe("AboutPage", () => {
  it("presents the professional and personal project in French", async () => {
    const page = await AboutPage({
      params: Promise.resolve({ locale: "fr" }),
    });

    const { container } = render(page);

    expect(
      screen.getByRole("heading", {
        name: "Mon projet professionnel et personnel",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Projet professionnel" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Projet personnel" }),
    ).toBeInTheDocument();
    expect(container).toHaveTextContent(/développeur confirmé et référent technique Odoo/i);
    expect(container).toHaveTextContent(/outil de business intelligence auto-hébergé/i);
    expect(container).toHaveTextContent(/API, le DevOps et le clean code/i);
    expect(container).toHaveTextContent(/DWWM, RNCP bac \+ 2, 2023/i);
    expect(container).toHaveTextContent(/RNCP bac \+ 3, 2024/i);
    expect(container).toHaveTextContent(/alternance en décembre 2024/i);
    expect(
      screen.getByRole("heading", { name: "Persévérance" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Adaptabilité" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Communication" }),
    ).toBeInTheDocument();
  });

  it("presents the professional and personal project in English", async () => {
    const page = await AboutPage({
      params: Promise.resolve({ locale: "en" }),
    });

    const { container } = render(page);

    expect(
      screen.getByRole("heading", {
        name: "My professional and personal project",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Professional project" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Personal project" }),
    ).toBeInTheDocument();
    expect(container).toHaveTextContent(/experienced developer and Odoo technical lead/i);
    expect(container).toHaveTextContent(/self-hosted business intelligence tool/i);
    expect(container).toHaveTextContent(/APIs, DevOps, and clean code/i);
    expect(container).toHaveTextContent(/DWWM, RNCP level 5, 2023/i);
    expect(container).toHaveTextContent(/RNCP level 6, 2024/i);
    expect(container).toHaveTextContent(/work-study program in December 2024/i);
    expect(
      screen.getByRole("heading", { name: "Discover my journey" }),
    ).toBeInTheDocument();
    expect(
      within(container.querySelector("[data-page-end-cta]") as HTMLElement).getByRole(
        "link",
        { name: "View my journey" },
      ),
    ).toHaveAttribute("href", "/en/parcours");
    expect(
      screen.getByRole("heading", { name: "Perseverance" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Adaptability" }),
    ).toBeInTheDocument();
  });

  it("organizes the presentation into accessible named chapters", async () => {
    const page = await AboutPage({
      params: Promise.resolve({ locale: "fr" }),
    });

    const { container } = render(page);

    expect(container.querySelector("[data-editorial-page-header]")).toBeInTheDocument();
    expect(
      container.querySelector("[data-editorial-page-header]")?.parentElement,
    ).toBe(container);
    expect(container.querySelector("#parcours")).toBeInTheDocument();
    expect(container.querySelector("#valeurs")).toBeInTheDocument();
    expect(container.querySelector("#projet")).toBeInTheDocument();
    expect(container.querySelector("#qualites")).toBeInTheDocument();
    expect(container.querySelector("#interets")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Explorer le portfolio" }),
    ).toBeInTheDocument();
    expect(
      screen
        .getByRole("navigation", { name: "Explorer le portfolio" })
        .querySelectorAll("svg"),
    ).toHaveLength(3);
    expect(screen.getAllByRole("link", { name: "Voir mon parcours" })[0]).toHaveAttribute(
      "href",
      "/fr/parcours",
    );
    expect(screen.getAllByAltText("Portrait d'Orhan Madi Assani")).toHaveLength(2);
  });

  it("ends with a link to the journey", async () => {
    const page = await AboutPage({
      params: Promise.resolve({ locale: "fr" }),
    });

    const { container } = render(page);
    const cta = container.querySelector("[data-page-end-cta]");

    expect(cta).not.toBeNull();
    expect(
      screen.getByRole("heading", { name: "Découvrez mon parcours" }),
    ).toBeInTheDocument();
    expect(
      within(cta as HTMLElement).getByRole("link", {
        name: "Voir mon parcours",
      }),
    ).toHaveAttribute("href", "/fr/parcours");
  });

  it("keeps the three parcours images together in chronological order", async () => {
    const page = await AboutPage({
      params: Promise.resolve({ locale: "fr" }),
    });

    const { container } = render(page);
    const journeyMedia = container.querySelector("[data-journey-media]");

    expect(journeyMedia?.querySelectorAll("figure")).toHaveLength(3);
    expect(journeyMedia?.querySelector('img[alt="Bâtiment Dynamo à Chambéry, lieu de formation Simplon."]')).toBeInTheDocument();
    expect(journeyMedia?.querySelector('img[alt="Bâtiment du Laboratoire d\'Informatique de Grenoble."]')).toBeInTheDocument();
    expect(journeyMedia?.querySelector('img[alt="Bâtiment de 1UP Distribution."]')).toBeInTheDocument();
    expect(container.querySelector('#valeurs img[alt="Bâtiment de 1UP Distribution."]')).toBeNull();
  });
});
