import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { AboutSection } from "@/components/landing/about-section";
import { CtaSection } from "@/components/landing/cta-section";
import { ExperienceSection } from "@/components/landing/experience-section";
import { HeroSection } from "@/components/landing/hero-section";
import { ProjectsSection } from "@/components/landing/projects-section";
import { SkillsSection } from "@/components/landing/skills-section";
import { frDict, renderWithProviders, screen } from "@/test/utils";

const featuredProjects = [
  {
    slug: "migration-odoo-v16-v19" as const,
    title: "Migration d'un ERP d'entreprise d'Odoo 16 vers Odoo 19",
    tags: ["Odoo", "Python", "PostgreSQL", "Migration"],
  },
  {
    slug: "modules-metier-odoo" as const,
    title: "Développement de modules métier pour un ERP",
    tags: ["Odoo", "Python", "PostgreSQL", "API"],
  },
  {
    slug: "refonte-site-corporate" as const,
    title: "Refonte d'un site corporate Next.js",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
  },
];

describe("editorial homepage sections", () => {
  it("presents the about section as three product principles", () => {
    renderWithProviders(<AboutSection dict={frDict.about} />);

    expect(
      screen.getByRole("heading", { name: "Focus utilisateur & impact produit" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Code propre & architecture robuste" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Automatisation & performance" }),
    ).toBeInTheDocument();
  });

  it("presents principles without decorative transforms or shadows", () => {
    renderWithProviders(<AboutSection dict={frDict.about} />);

    const stamp = screen
      .getByRole("heading", { name: "Focus utilisateur & impact produit" })
      .closest("article");
    expect(stamp).not.toBeNull();

    expect(stamp).toHaveClass("border-b", "border-border");
    expect(stamp?.className).not.toMatch(/shadow|rotate|scale/);
  });

  it("uses a monochrome hero and contact section without decorative assets", () => {
    const hero = renderWithProviders(
      <HeroSection
        locale="fr"
        dict={frDict.hero}
        headshot={<span aria-hidden="true" />}
      />,
    );

    expect(
      screen.queryByText("Portfolio créatif · Ingénierie logicielle"),
    ).not.toBeInTheDocument();
    expect(hero.container.querySelector('img[src*="decorative"]')).toBeNull();
    expect(screen.getByRole("link", { name: "Voir les réalisations" })).toHaveClass(
      "bg-primary",
      "text-primary-foreground",
    );
    hero.unmount();

    const contact = renderWithProviders(
      <CtaSection locale="fr" dict={frDict.cta} />,
    );

    expect(contact.container.querySelector("img")).toBeNull();
    expect(screen.getByRole("link", { name: "Me contacter" })).toHaveClass(
      "bg-primary",
      "text-primary-foreground",
    );
  });

  it("shows six compact skill domains and links to the full comparison", () => {
    renderWithProviders(<SkillsSection locale="fr" dict={frDict.skills} />);

    expect(screen.getByRole("heading", { name: "Odoo" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Frontend" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Backend" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "DevOps & Outils" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Méthodes" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Formation" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explorer les 10 compétences" }),
    ).toHaveAttribute("href", "/fr/competences");
  });

  it("shows a jury-readable timeline with animated details, logos and proofs", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(
      <ExperienceSection dict={frDict.experience} />,
    );

    expect(container.querySelectorAll(".experience-details")).toHaveLength(6);
    const detailButtons = screen.getAllByRole("button", {
      name: "Afficher le détail",
    });
    expect(detailButtons).toHaveLength(6);
    expect(detailButtons[0]).toHaveAttribute("aria-expanded", "false");
    await user.click(detailButtons[0]);
    expect(detailButtons[0]).toHaveAttribute("aria-expanded", "true");
    expect(
      document.getElementById(detailButtons[0].getAttribute("aria-controls") ?? ""),
    ).toHaveClass("grid-rows-[1fr]", "opacity-100");
    expect(container.querySelector(".journey-path")).toBeNull();
    expect(container.querySelectorAll(".journey-marker")).toHaveLength(0);
    expect(container.querySelector(".journey-row > span")).toBeNull();
    expect(container.querySelector('img[src*="logo-1up"]')).toBeInTheDocument();
    expect(container.querySelector('img[src*="logo-lig"]')).toBeInTheDocument();
    expect(container.querySelector('img[src*="logo-iscod"]')).toBeInTheDocument();
    expect(container.querySelector('img[src*="logo-simplon"]')).toBeInTheDocument();
    expect(container.querySelector('img[src*="logo-usmb"]')).toBeInTheDocument();
    expect(screen.getAllByText("Afficher le détail")).toHaveLength(6);
    expect(screen.getByRole("link", { name: "ISCOD" })).toHaveAttribute(
      "href",
      "https://www.iscod.fr/",
    );
    expect(
      screen.getByRole("link", { name: "Consulter le certificat TOEIC" }),
    ).toHaveAttribute(
      "href",
      "/proofs/certificate_20251030105639_toeic_filigrane.pdf",
    );
    expect(
      screen.getByRole("heading", {
        name: "Concepteur Développeur d'Applications — RNCP niveau 6",
      }),
    ).toBeInTheDocument();

    const journeyRows = Array.from(container.querySelectorAll(".journey-row"));
    expect(
      journeyRows.map((row) => row.querySelector("p")?.textContent),
    ).toEqual([
      "Déc. 2024 — Présent",
      "2025 — 2027",
      "7 août 2025",
      "Mai — oct. 2024",
      "Janv. — déc. 2024",
      "2023",
    ]);
  });

  it("shows documented result metrics without presenting an estimate as a measurement", () => {
    const { container } = renderWithProviders(
      <ProjectsSection
        locale="fr"
        projects={featuredProjects}
        dict={frDict.featuredProjects}
      />,
    );

    expect(screen.queryByText(/^0[1-3]$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Projet 0[1-3]/)).not.toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("16")).toBeInTheDocument();
    expect(screen.getByText("99")).toBeInTheDocument();
    expect(screen.getByText(/Périmètre interne documenté/)).toBeInTheDocument();
    expect(screen.getByText(/temps économisé n'est pas encore mesuré/i)).toBeInTheDocument();
    expect(screen.getByText(/100 en accessibilité et 100 en SEO/)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Voir la réalisation" })).toHaveLength(3);
    expect(
      container.querySelectorAll('[data-slot="project-result"] svg'),
    ).toHaveLength(0);
  });
});
