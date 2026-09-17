import { describe, expect, it } from "vitest";
import { AboutSection } from "@/components/landing/about-section";
import { CtaSection } from "@/components/landing/cta-section";
import { ExperienceSection } from "@/components/landing/experience-section";
import { HeroSection } from "@/components/landing/hero-section";
import { ProjectsSection } from "@/components/landing/projects-section";
import { SkillsSection } from "@/components/landing/skills-section";
import { enDict, frDict, renderWithProviders, screen, within } from "@/test/utils";

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

const skillCategoryDestinations = [
  "/competences/developpement-backend",
  "/competences/developpement-frontend",
  "/competences/developpement-odoo",
  "/competences/devops",
  "/competences/amelioration-continue",
  "/a-propos",
] as const;

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

  it.each([
    ["fr", frDict, "Découvrir mon profil complet"],
    ["en", enDict, "Discover my full profile"],
  ] as const)(
    "links the %s homepage summary to the full profile",
    (locale, dictionary, label) => {
      renderWithProviders(<AboutSection locale={locale} dict={dictionary.about} />, {
        locale,
        dictionary,
      });

      expect(screen.getByRole("link", { name: label })).toHaveAttribute(
        "href",
        `/${locale}/a-propos`,
      );
    },
  );

  it("presents principles without decorative transforms or shadows", () => {
    renderWithProviders(<AboutSection dict={frDict.about} />);

    const stamp = screen
      .getByRole("heading", { name: "Focus utilisateur & impact produit" })
      .closest("article");
    expect(stamp).not.toBeNull();

    expect(stamp).toHaveClass("border-b", "border-border");
    expect(stamp?.className).not.toMatch(/shadow|rotate|scale/);
  });

  it("names the engineering specialty in the hero without decorative assets", () => {
    const hero = renderWithProviders(
      <HeroSection
        locale="fr"
        dict={frDict.hero}
        headshot={<span aria-hidden="true" />}
      />,
    );

    expect(screen.getByText("Ingénierie logicielle")).toBeInTheDocument();
    expect(hero.container.querySelector('img[src*="decorative"]')).toBeNull();
    const heroTitle = hero.container.querySelector("h1");
    expect(heroTitle?.children).toHaveLength(2);
    expect(heroTitle?.children[0]).toHaveTextContent("Orhan");
    expect(heroTitle?.children[1]).toHaveTextContent("Madi Assani");
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
    expect(screen.getByRole("heading", { name: "Front-end" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Back-end" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "DevOps & Outils" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Méthodes" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Formation" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explorer les 10 compétences" }),
    ).toHaveAttribute("href", "/fr/competences");
  });

  it.each([
    ["fr", frDict],
    ["en", enDict],
  ] as const)(
    "links every skill domain to its dedicated page in %s",
    (locale, dictionary) => {
      const { container } = renderWithProviders(
        <SkillsSection locale={locale} dict={dictionary.skills} />,
        { locale, dictionary },
      );
      const section = container.querySelector("#competences");

      expect(section).not.toBeNull();
      const skillSection = within(section as HTMLElement);
      const links = skillSection.getAllByRole("link", { name: /^(Voir la compétence|View skill)/ });
      expect(links).toHaveLength(skillCategoryDestinations.length);
      for (const [index, path] of skillCategoryDestinations.entries()) {
        expect(links[index]).toHaveAttribute("href", `/${locale}${path}`);
        expect(links[index].querySelector("svg")).toHaveAttribute("aria-hidden", "true");
      }
    },
  );

  it("shows a jury-readable timeline with detail links, logos and proofs", () => {
    const { container } = renderWithProviders(
      <ExperienceSection dict={frDict.experience} />,
    );

    const competenceLinks = screen.getAllByRole("link", {
      name: /Voir la compétence/,
    });
    expect(competenceLinks).toHaveLength(
      frDict.experience.entries.filter(
        (entry) => entry.linkedCompetences?.length,
      ).length,
    );
    expect(competenceLinks[0]).toHaveAttribute(
      "href",
      "/fr/competences/developpement-odoo",
    );
    expect(screen.getByRole("list", { name: "Parcours" })).toBeInTheDocument();
    expect(container.querySelectorAll(".journey-path")).toHaveLength(6);
    expect(container.querySelectorAll(".journey-marker")).toHaveLength(7);
    expect(container.querySelectorAll(".journey-row > .journey-marker")).toHaveLength(7);
    for (const experience of frDict.experience.entries) {
      const entry = container.querySelector(`#experience-${experience.id}`);
      expect(entry).toHaveClass("scroll-mt-28");
      expect(entry).toHaveTextContent(experience.location);
    }
    for (const decoration of container.querySelectorAll(
      ".journey-path, .journey-marker",
    )) {
      expect(decoration).toHaveAttribute("aria-hidden", "true");
    }
    expect(
      screen.queryByText(
        "Ordre : « Présent » d'abord, puis par date de fin décroissante ; à égalité, par date de début décroissante",
      ),
    ).not.toBeInTheDocument();
    expect(container.querySelector('img[src*="logo-1up"]')).toBeInTheDocument();
    expect(container.querySelector('img[src*="logo-lig"]')).toBeInTheDocument();
    expect(container.querySelector('img[src*="logo-iscod"]')).toBeInTheDocument();
    expect(container.querySelector('img[src*="logo-simplon"]')).toBeInTheDocument();
    expect(container.querySelector('img[src*="logo-usmb"]')).toBeInTheDocument();
    expect(container.querySelector('img[src*="logo-ets-global"]')).toBeInTheDocument();
    expect(container.querySelectorAll("[data-company-logo]").length).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: "Afficher le détail" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ISCOD" })).toHaveAttribute(
      "href",
      "/fr/parcours/iscod-software-engineering-master",
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
      journeyRows.map(
        (row) => row.querySelector(".journey-period")?.textContent,
      ),
    ).toEqual([
      "Déc. 2024 — Présent",
      "2025 — 2027",
      "7 août 2025",
      "Janv. — déc. 2024",
      "Mai — oct. 2024",
      "2023 — 2 mois",
      "2023",
    ]);
  });

  it.each([["fr", frDict], ["en", enDict]] as const)("shows the A. Gaveau internship and its training link in %s", (locale, dictionary) => {
    const { container } = renderWithProviders(
      <ExperienceSection locale={locale} dict={dictionary.experience} />,
      { locale, dictionary },
    );
    const entry = container.querySelector("#experience-a-gaveau-web-developer-internship") as HTMLElement;
    expect(entry).toHaveTextContent("WordPress");
    expect(entry).toHaveTextContent("Elementor");
    expect(entry).toHaveTextContent("Rumilly · Haute-Savoie");
    expect(within(entry).getByRole("link", { name: "A. Gaveau" })).toHaveAttribute("href", `/${locale}/parcours/a-gaveau-web-developer-internship`);
    const training = dictionary.experience.entries.find(({ id }) => id === "simplon-web-developer")!;
    const link = within(entry).getByRole("link", { name: `${training.company} — ${training.title}` });
    expect(link).toHaveAttribute("href", `/${locale}/parcours/${training.id}`);
    expect(container.querySelector(`#experience-${training.id}`)).toBeInTheDocument();
  });

  it("keeps result metrics out of the featured project cards", () => {
    const { container } = renderWithProviders(
      <ProjectsSection
        locale="fr"
        projects={featuredProjects}
        dict={frDict.featuredProjects}
      />,
    );

    expect(screen.queryByText(/^0[1-3]$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Projet 0[1-3]/)).not.toBeInTheDocument();
    expect(container.querySelectorAll('[data-slot="project-result"]')).toHaveLength(0);
    expect(screen.getAllByRole("link", { name: "Voir la réalisation" })).toHaveLength(3);
  });

  it("uses the selected photography and credits its Pexels sources", () => {
    renderWithProviders(
      <ProjectsSection
        locale="fr"
        projects={featuredProjects}
        dict={frDict.featuredProjects}
      />,
    );

    expect(
      screen.getByRole("img", {
        name: "Migration d'un ERP d'entreprise d'Odoo 16 vers Odoo 19",
      }),
    ).toHaveAttribute(
      "src",
      expect.stringContaining("%2Fimages%2Fproject-photography%2Fpexels-server-racks-4508751.webp"),
    );
    expect(
      screen.getByRole("img", {
        name: "Développement de modules métier pour un ERP",
      }),
    ).toHaveAttribute(
      "src",
      expect.stringContaining("%2Fimages%2Fproject-photography%2Fpexels-office-collaboration-12899161.webp"),
    );
    expect(
      screen.getByRole("link", { name: "Photo · Brett Sayles / Pexels" }),
    ).toHaveAttribute(
      "href",
      "https://www.pexels.com/photo/server-racks-on-data-center-4508751/",
    );
    expect(
      screen.getByRole("link", { name: "Photo · Mizuno K / Pexels" }),
    ).toHaveAttribute(
      "href",
      "https://www.pexels.com/photo/vertical-shot-of-a-man-and-woman-working-in-an-office-12899161/",
    );
  });
});
