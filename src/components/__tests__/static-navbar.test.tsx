import { describe, expect, it } from "vitest";

import { StaticNavbar } from "@/components/static-homepage";
import { competences } from "@/lib/competences";
import { realisations } from "@/lib/realisations";
import { frDict, renderWithProviders, within } from "@/test/utils";

describe("StaticNavbar", () => {
  it("exposes every competence and realisation in desktop and mobile submenus", () => {
    const { container } = renderWithProviders(
      <StaticNavbar locale="fr" dict={frDict} />,
    );
    const desktopNavigation = container.querySelector(
      "[data-static-desktop-navigation]",
    );
    const mobileNavigation = container.querySelector(
      "details.relative.lg\\:hidden > div",
    );

    expect(desktopNavigation).not.toBeNull();
    expect(mobileNavigation).not.toBeNull();
    expect(
      container.querySelector('header svg[shape-rendering="crispEdges"]'),
    ).not.toBeInTheDocument();

    const desktop = within(desktopNavigation as HTMLElement);

    expect(
      desktop.getByRole("link", { name: "Voir les 10 compétences" }),
    ).toHaveAttribute("href", "/fr/competences");
    expect(
      desktop.getByRole("link", { name: "Voir les 5 réalisations" }),
    ).toHaveAttribute("href", "/fr/realisations");

    for (const competence of competences) {
      const href = `/fr/competences/${competence.slug}`;

      expect(
        desktop.getByRole("link", { name: competence.title.fr }),
      ).toHaveAttribute("href", href);
      expect(
        mobileNavigation?.querySelector(`a[href="${href}"]`),
      ).toBeInTheDocument();
    }

    for (const realisation of realisations) {
      const href = `/fr/realisations/${realisation.slug}`;

      expect(
        desktop.getByRole("link", { name: realisation.title.fr }),
      ).toHaveAttribute("href", href);
      expect(
        mobileNavigation?.querySelector(`a[href="${href}"]`),
      ).toBeInTheDocument();
    }

    const desktopPanels = desktopNavigation?.querySelectorAll(
      ".group > div.invisible",
    );
    expect(desktopPanels).toHaveLength(2);
    desktopPanels?.forEach((panel) => {
      expect(panel).toHaveClass(
        "group-hover:visible",
        "group-focus-within:visible",
      );
    });

    expect(mobileNavigation?.querySelectorAll("details")).toHaveLength(2);
  });
});
