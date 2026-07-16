import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import { Navbar } from "@/components/navbar";
import { competences } from "@/lib/competences";
import { realisations } from "@/lib/realisations";
import {
  frDict,
  renderWithProviders,
  screen,
  userEvent,
  within,
} from "@/test/utils";

vi.mock("next/navigation", () => ({
  usePathname: () => "/fr",
  useRouter: () => ({ push: vi.fn() }),
}));

const menus = {
  competences: competences.map((item) => ({
    href: `/fr/competences/${item.slug}`,
    label: item.title.fr,
  })),
  realisations: realisations.map((item) => ({
    href: `/fr/realisations/${item.slug}`,
    label: item.title.fr,
  })),
};

function renderNavbar() {
  return renderWithProviders(
    <Navbar
      locale="fr"
      dict={{
        nav: frDict.nav,
        experienceHeading: frDict.experience.heading,
        skillsHeading: frDict.skills.heading,
      }}
      menus={menus}
    />,
  );
}

describe("Navbar", () => {
  it("exposes every competence and realisation in keyboard-accessible desktop submenus", () => {
    const { container } = renderNavbar();
    const navigation = container.querySelector("[data-desktop-navigation]");
    expect(navigation).not.toBeNull();
    const desktop = within(navigation as HTMLElement);

    fireEvent.focus(
      desktop.getByRole("link", { name: "Compétences" }),
    );
    fireEvent.focus(
      desktop.getByRole("link", { name: "Réalisations" }),
    );

    expect(
      desktop.getByRole("link", { name: "Voir les 10 compétences" }),
    ).toHaveAttribute("href", "/fr/competences");
    expect(
      desktop.getByRole("link", { name: "Voir les 5 réalisations" }),
    ).toHaveAttribute("href", "/fr/realisations");

    for (const item of [...menus.competences, ...menus.realisations]) {
      expect(desktop.getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href,
      );
    }

    const panels = navigation?.querySelectorAll("[data-desktop-submenu]");
    expect(panels).toHaveLength(2);
    panels?.forEach((panel) => {
      expect(panel).toHaveClass("absolute", "top-full");
    });
  });

  it("opens the mobile menu and its localized submenus", async () => {
    const user = userEvent.setup();
    const { container } = renderNavbar();

    await user.click(
      screen.getByRole("button", { name: "Ouvrir ou fermer le menu" }),
    );
    const mobileNavigation = container.querySelector(
      "[data-mobile-navigation]",
    );
    expect(mobileNavigation).not.toBeNull();

    await user.click(
      within(mobileNavigation as HTMLElement).getByRole("button", {
        name: /Afficher le sous-menu Compétences/,
      }),
    );

    expect(
      within(mobileNavigation as HTMLElement).getByRole("link", {
        name: competences[0].title.fr,
      }),
    ).toHaveAttribute("href", `/fr/competences/${competences[0].slug}`);
  });

  it("keeps the contact call to action contrast-safe in every theme", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: /Contact/ })).toHaveClass(
      "text-white",
    );
  });
});
