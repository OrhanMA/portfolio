import { describe, expect, it } from "vitest";
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
    title: "Migration d'un ERP d'entreprise de Odoo 16 vers Odoo 19",
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

  it("keeps the shadow synchronized with the CSS hover transform", () => {
    renderWithProviders(<AboutSection dict={frDict.about} />);

    const stamp = screen
      .getByRole("heading", { name: "Focus utilisateur & impact produit" })
      .closest("article");
    expect(stamp).not.toBeNull();

    expect(stamp).toHaveClass(
      "hover:-translate-y-2",
      "hover:scale-[1.025]",
      "transition-[color,background-color,transform]",
    );
    expect(stamp).toHaveClass(
      "shadow-[6px_7px_0_oklch(0.16_0.018_245/0.12)]",
    );
  });

  it("uses sakura assets instead of animated mouse cursors", () => {
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
    expect(hero.container.querySelector(".hero-cursor")).toBeNull();
    expect(hero.container.querySelector(".hero-petals")).toHaveAttribute(
      "src",
      "/images/decorative/sakura-petals-scatter.svg",
    );
    const petalAccents = hero.container.querySelectorAll(".hero-petal-accent");
    expect(petalAccents).toHaveLength(2);
    petalAccents.forEach((petal) => {
      expect(petal).toHaveAttribute(
        "src",
        "/images/decorative/sakura-petal.svg",
      );
    });
    hero.unmount();

    const contact = renderWithProviders(
      <CtaSection locale="fr" dict={frDict.cta} />,
    );

    expect(contact.container.querySelector(".contact-cursor")).toBeNull();
    expect(contact.container.querySelector(".contact-petals")).toHaveAttribute(
      "src",
      "/images/decorative/pixel-sakura-petals-trio.svg",
    );
    expect(contact.container.querySelector(".contact-sakura")).toHaveAttribute(
      "src",
      "/images/decorative/pixel-sakura-branch.svg",
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

  it("shows a jury-readable timeline with separate training, logos and proofs", () => {
    const { container } = renderWithProviders(
      <ExperienceSection dict={frDict.experience} />,
    );

    expect(container.querySelectorAll("details")).toHaveLength(6);
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
  });

  it("shows verifiable result metrics for each featured project", () => {
    renderWithProviders(
      <ProjectsSection
        locale="fr"
        projects={featuredProjects}
        dict={frDict.featuredProjects}
      />,
    );

    expect(screen.queryByText(/^0[1-3]$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Projet 0[1-3]/)).not.toBeInTheDocument();
    expect(screen.getByText("19")).toBeInTheDocument();
    expect(screen.getByText("16")).toBeInTheDocument();
    expect(screen.getByText("99")).toBeInTheDocument();
    expect(screen.getByText(/Aucune perte définitive de données/)).toBeInTheDocument();
    expect(screen.getByText(/Une demi-journée économisée/)).toBeInTheDocument();
    expect(screen.getByText(/100 en accessibilité et 100 en SEO/)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Voir la réalisation" })).toHaveLength(3);
  });
});
