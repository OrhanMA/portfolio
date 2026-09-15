import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import { Navbar } from "@/components/navbar";
import {
  competenceLevelLabels,
  getCompetencesByType,
} from "@/lib/competences";
import { realisations } from "@/lib/realisations";
import {
  frDict,
  renderWithProviders,
  screen,
  userEvent,
  within,
} from "@/test/utils";

let currentPathname = "/fr";

vi.mock("next/navigation", () => ({
  usePathname: () => currentPathname,
  useRouter: () => ({ push: vi.fn() }),
}));

const menus = {
  competences: [
    {
      label: frDict.nav.humanCompetences,
      items: getCompetencesByType("human")
        .map((item) => ({
          href: `/fr/competences/${item.slug}`,
          label: item.title.fr,
          badge: competenceLevelLabels[item.level].fr,
        })),
    },
    {
      label: frDict.nav.technicalCompetences,
      items: getCompetencesByType("technical")
        .map((item) => ({
          href: `/fr/competences/${item.slug}`,
          label: item.title.fr,
          badge: competenceLevelLabels[item.level].fr,
        })),
    },
  ],
  realisations: realisations.map((item) => ({
    href: `/fr/realisations/${item.slug}`,
    label: item.title.fr,
  })),
};

const competenceMenuItems = menus.competences.flatMap((group) => group.items);

function renderNavbar(pathname = "/fr") {
  currentPathname = pathname;

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
  it("shows the full name as a compact persistent signature", () => {
    const { container } = renderNavbar();
    const identity = screen.getByRole("link", {
      name: "Orhan Madi Assani",
    });

    expect(identity).toHaveAttribute("href", "/fr");
    expect(identity).toHaveTextContent("Orhan Madi Assani");
    expect(
      identity.querySelector("[data-site-identity-name]"),
    ).not.toHaveClass("hidden");
    expect(identity.querySelectorAll("[data-site-identity-photo]")).toHaveLength(2);
    expect(identity.querySelector("[data-site-identity-photo]")).toHaveAttribute(
      "src",
      expect.stringContaining("orhan-portrait.webp"),
    );
    expect(container.querySelector("[data-navbar-background]")).toHaveAttribute(
      "src",
      expect.stringContaining("navbar-ivy.webp"),
    );
  });

  it("links Parcours to its dedicated bilingual timeline page", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: "Parcours" })).toHaveAttribute(
      "href",
      "/fr/parcours",
    );
  });

  it("marks the current page in the primary navigation", () => {
    const { container, rerender } = renderNavbar("/fr/realisations");

    expect(
      within(container.querySelector("[data-desktop-navigation]") as HTMLElement)
        .getByRole("button", { name: "Réalisations" }),
    ).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "À propos" })).not.toHaveAttribute(
      "aria-current",
    );

    currentPathname = "/fr/competences/gestion-de-projet";
    rerender(
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

    expect(
      within(container.querySelector("[data-desktop-navigation]") as HTMLElement)
        .getByRole("button", { name: "Compétences" }),
    ).toHaveAttribute("aria-current", "page");
  });

  it("exposes every competence and realisation in keyboard-accessible desktop submenus", () => {
    const { container } = renderNavbar();
    const navigation = container.querySelector("[data-desktop-navigation]");
    expect(navigation).not.toBeNull();
    const desktop = within(navigation as HTMLElement);

    const competencesTrigger = desktop.getByRole("button", {
      name: "Compétences",
    });
    const realisationsTrigger = desktop.getByRole("button", {
      name: "Réalisations",
    });
    fireEvent.focus(competencesTrigger);
    fireEvent.focus(realisationsTrigger);

    expect(competencesTrigger).not.toHaveAttribute("aria-haspopup");
    expect(competencesTrigger).toHaveAttribute(
      "aria-controls",
      "desktop-competences-submenu",
    );

    expect(
      desktop.getByRole("link", { name: "Voir les 10 compétences" }),
    ).toHaveAttribute("href", "/fr/competences");
    expect(
      desktop.getByRole("link", { name: "Voir les 5 réalisations" }),
    ).toHaveAttribute("href", "/fr/realisations");
    expect(
      desktop.getByText(frDict.nav.humanCompetences),
    ).toBeInTheDocument();
    expect(
      desktop.getByText(frDict.nav.technicalCompetences),
    ).toBeInTheDocument();

    for (const item of [...competenceMenuItems, ...menus.realisations]) {
      expect(desktop.getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href,
      );
    }

    expect(
      desktop.getByRole("link", { name: "Autonomie" }),
    ).toHaveAccessibleDescription("Avancé");
    expect(
      desktop.getAllByText("Avancé", { selector: "[data-submenu-badge]" }),
    ).toHaveLength(3);

    const panels = navigation?.querySelectorAll("[data-desktop-submenu]");
    expect(panels).toHaveLength(2);
    panels?.forEach((panel) => {
      expect(panel).toHaveClass("absolute", "top-full");
    });
  });

  it("opens a desktop submenu from a click even when hover has opened it first", async () => {
    const user = userEvent.setup();
    const { container } = renderNavbar();
    const navigation = container.querySelector("[data-desktop-navigation]");
    const desktop = within(navigation as HTMLElement);
    const trigger = desktop.getByRole("button", { name: "Compétences" });

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      desktop.getByRole("link", { name: "Voir les 10 compétences" }),
    ).toBeInTheDocument();
  });

  it("opens the mobile menu and its localized submenus", async () => {
    const user = userEvent.setup();
    const { container } = renderNavbar();

    await user.click(
      screen.getByRole("button", { name: "Ouvrir ou fermer le menu" }),
    );
    const mobileToggle = screen.getByRole("button", {
      name: "Ouvrir ou fermer le menu",
    });
    expect(mobileToggle).toHaveAttribute(
      "aria-controls",
      "mobile-navigation-panel",
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
        name: competenceMenuItems[0].label,
      }),
    ).toHaveAttribute("href", competenceMenuItems[0].href);

    fireEvent.keyDown(mobileNavigation as HTMLElement, { key: "Escape" });
    expect(mobileToggle).toHaveAttribute("aria-expanded", "false");
    expect(mobileToggle).toHaveFocus();
  });

  it("closes a desktop submenu when navigating from one of its child links", async () => {
    const user = userEvent.setup();
    const { container } = renderNavbar();
    const navigation = container.querySelector("[data-desktop-navigation]");
    expect(navigation).not.toBeNull();
    const desktop = within(navigation as HTMLElement);

    fireEvent.focus(desktop.getByRole("button", { name: "Compétences" }));
    const childLink = desktop.getByRole("link", {
      name: competenceMenuItems[0].label,
    });

    await user.click(childLink);

    expect(
      desktop.queryByRole("link", { name: competenceMenuItems[0].label }),
    ).not.toBeInTheDocument();
  });

  it("closes a desktop disclosure with Escape and restores focus to its trigger", () => {
    const { container } = renderNavbar();
    const navigation = container.querySelector("[data-desktop-navigation]");
    const desktop = within(navigation as HTMLElement);
    const trigger = desktop.getByRole("button", { name: "Compétences" });

    fireEvent.focus(trigger);
    const childLink = desktop.getByRole("link", {
      name: competenceMenuItems[0].label,
    });
    fireEvent.keyDown(childLink, { key: "Escape" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
    expect(
      desktop.queryByRole("link", { name: competenceMenuItems[0].label }),
    ).not.toBeInTheDocument();
  });

  it("keeps the contact call to action contrast-safe in every theme", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: /Contact/ })).toHaveClass(
      "text-primary-foreground",
    );
  });
});
