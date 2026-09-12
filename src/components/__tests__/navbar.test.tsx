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
  it("shows the full name as a compact persistent signature", () => {
    renderNavbar();
    const identity = screen.getByRole("link", {
      name: "Orhan Madi Assani",
    });

    expect(identity).toHaveAttribute("href", "/fr");
    expect(identity).toHaveTextContent("Orhan Madi Assani");
    expect(
      identity.querySelector("[data-site-identity-name]"),
    ).not.toHaveClass("hidden");
    expect(identity.querySelector("img")).not.toBeInTheDocument();
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
        name: competences[0].title.fr,
      }),
    ).toHaveAttribute("href", `/fr/competences/${competences[0].slug}`);

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
      name: competences[0].title.fr,
    });

    await user.click(childLink);

    expect(
      desktop.queryByRole("link", { name: competences[0].title.fr }),
    ).not.toBeInTheDocument();
  });

  it("closes a desktop disclosure with Escape and restores focus to its trigger", () => {
    const { container } = renderNavbar();
    const navigation = container.querySelector("[data-desktop-navigation]");
    const desktop = within(navigation as HTMLElement);
    const trigger = desktop.getByRole("button", { name: "Compétences" });

    fireEvent.focus(trigger);
    const childLink = desktop.getByRole("link", {
      name: competences[0].title.fr,
    });
    fireEvent.keyDown(childLink, { key: "Escape" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
    expect(
      desktop.queryByRole("link", { name: competences[0].title.fr }),
    ).not.toBeInTheDocument();
  });

  it("keeps the contact call to action contrast-safe in every theme", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: /Contact/ })).toHaveClass(
      "text-primary-foreground",
    );
  });
});
