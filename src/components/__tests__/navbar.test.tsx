import { describe, expect, it, vi } from "vitest";
import { Navbar } from "@/components/navbar";
import { frDict, renderWithProviders, screen, userEvent, within } from "@/test/utils";
import { competences } from "@/lib/competences";
import { realisations } from "@/lib/realisations";

const navbarDict = {
  nav: frDict.nav,
  experienceHeading: frDict.experience.heading,
  skillsHeading: frDict.skills.heading,
};

const navbarMenus = {
  competences: competences.map((competence) => ({
    href: `/fr/competences/${competence.slug}`,
    label: competence.title.fr,
  })),
  realisations: realisations.map((realisation) => ({
    href: `/fr/realisations/${realisation.slug}`,
    label: realisation.title.fr,
  })),
};

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/fr"),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  })),
}));

describe("Navbar", () => {
  it("links directly to every homepage section", () => {
    const { container } = renderWithProviders(
      <Navbar locale="fr" dict={navbarDict} menus={navbarMenus} />,
    );

    expect(
      container.querySelector('img[src*="coporate-headshot"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('header svg[shape-rendering="crispEdges"]'),
    ).not.toBeInTheDocument();

    expect(screen.getByRole("link", { name: "À propos" })).toHaveAttribute(
      "href",
      "/fr/a-propos",
    );
    expect(screen.getByRole("link", { name: "Parcours" })).toHaveAttribute(
      "href",
      "/fr#parcours",
    );
    expect(screen.getByRole("link", { name: "Compétences" })).toHaveAttribute(
      "href",
      "/fr/competences",
    );
    expect(screen.getByRole("link", { name: "Réalisations" })).toHaveAttribute(
      "href",
      "/fr/realisations",
    );
    expect(screen.queryByRole("link", { name: "Documents" })).not.toBeInTheDocument();

    for (const item of [...navbarMenus.competences, ...navbarMenus.realisations]) {
      expect(screen.getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href,
      );
    }
  });

  it("opens a scrollable mobile menu with section links and contact", async () => {
    const { container } = renderWithProviders(
      <Navbar locale="fr" dict={navbarDict} menus={navbarMenus} />,
    );
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Toggle menu" }));

    const mobilePanel = container.querySelector("header > div.fixed");
    expect(mobilePanel).not.toBeNull();
    expect(mobilePanel).toHaveClass("overflow-y-auto");
    expect(mobilePanel).toHaveClass("overscroll-contain");

    const mobileMenu = within(mobilePanel as HTMLElement);
    expect(mobileMenu.getByRole("link", { name: "Parcours" })).toHaveAttribute(
      "href",
      "/fr#parcours",
    );
    expect(mobileMenu.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/fr/contact",
    );

    await user.click(
      mobileMenu.getByRole("button", {
        name: "Afficher le sous-menu Compétences",
      }),
    );
    for (const item of navbarMenus.competences) {
      expect(mobileMenu.getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href,
      );
    }

    await user.click(
      mobileMenu.getByRole("button", {
        name: "Afficher le sous-menu Réalisations",
      }),
    );
    for (const item of navbarMenus.realisations) {
      expect(mobileMenu.getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href,
      );
    }
  });
});
