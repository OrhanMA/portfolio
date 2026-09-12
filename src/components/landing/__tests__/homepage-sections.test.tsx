import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
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

const skillDestinations = [
  ["PHP", "/competences/developpement-backend"],
  ["Symfony", "/competences/developpement-backend"],
  ["Python", "/competences/python"],
  ["PostgreSQL", "/competences/developpement-backend"],
  ["REST API", "/projects/stock_value_api"],
  ["Architecture modulaire", "/realisations/modules-metier-odoo"],
  ["Next.js", "/realisations/refonte-site-corporate"],
  ["React", "/realisations/refonte-site-corporate"],
  ["TypeScript", "/realisations/refonte-site-corporate"],
  ["Tailwind CSS", "/realisations/refonte-site-corporate"],
  ["HTML / CSS", "/competences/developpement-frontend"],
  ["UI / UX", "/competences/developpement-frontend"],
  ["Odoo 16 → 19", "/realisations/migration-odoo-v16-v19"],
  ["Modules métier", "/realisations/modules-metier-odoo"],
  ["Personnalisation", "/competences/developpement-odoo"],
  ["Migrations", "/realisations/migration-odoo-v16-v19"],
  ["Automatisations", "/projects/invoice_overdue_alert"],
  ["Rapports", "/projects/packing_list"],
  ["Docker", "/competences/devops"],
  ["Git / GitHub", "/competences/devops"],
  ["Linux", "/competences/devops"],
  ["CI / CD", "/competences/devops"],
  ["Nginx", "/competences/devops"],
  ["VPS", "/competences/devops"],
  ["Agile / Scrum", "/realisations/app-trajectoires-de-vie"],
  ["Conception", "/realisations/app-trajectoires-de-vie"],
  ["Tests", "/realisations/portfolio-professionnel"],
  ["Documentation", "/realisations/app-trajectoires-de-vie"],
  ["Optimisation", "/competences/amelioration-continue"],
  ["Qualité", "/competences/amelioration-continue"],
  ["Algorithmique", "/realisations/app-trajectoires-de-vie"],
  ["Structures de données", "/realisations/app-trajectoires-de-vie"],
  ["Réseaux", "/realisations/app-trajectoires-de-vie"],
  ["Systèmes", "/competences/devops"],
  ["Bases de données", "/realisations/app-trajectoires-de-vie"],
  ["Mathématiques", "/a-propos"],
] as const;

const skillLabelsEn: Record<string, string> = {
  "Architecture modulaire": "Modular architecture",
  "Modules métier": "Business modules",
  Personnalisation: "Customization",
  Automatisations: "Automation",
  Rapports: "Reports",
  Conception: "Design",
  Optimisation: "Optimization",
  Qualité: "Quality",
  Algorithmique: "Algorithms",
  "Structures de données": "Data structures",
  Réseaux: "Networks",
  Systèmes: "Systems",
  "Bases de données": "Databases",
  Mathématiques: "Mathematics",
};

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

  it.each([
    ["fr", frDict],
    ["en", enDict],
  ] as const)(
    "links every skill to its most relevant internal page in %s",
    (locale, dictionary) => {
      const { container } = renderWithProviders(
        <SkillsSection locale={locale} dict={dictionary.skills} />,
        { locale, dictionary },
      );
      const section = container.querySelector("#competences");

      expect(section).not.toBeNull();
      expect(section?.querySelectorAll("ul a")).toHaveLength(
        skillDestinations.length,
      );

      const skillSection = within(section as HTMLElement);
      for (const [label, path] of skillDestinations) {
        const localizedLabel = locale === "en" ? (skillLabelsEn[label] ?? label) : label;
        const link = skillSection.getAllByRole("link", { name: localizedLabel }).find((element) => element.closest("li"))!;
        expect(link).toHaveAttribute("href", `/${locale}${path}`);
        expect(link.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
      }
    },
  );

  it("shows a jury-readable timeline with animated details, logos and proofs", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(
      <ExperienceSection dict={frDict.experience} />,
    );

    expect(container.querySelectorAll(".experience-details")).toHaveLength(7);
    const detailButtons = screen.getAllByRole("button", {
      name: "Afficher le détail",
    });
    expect(detailButtons).toHaveLength(7);
    expect(detailButtons[0]).toHaveAttribute("aria-expanded", "false");
    await user.click(detailButtons[0]);
    expect(detailButtons[0]).toHaveAttribute("aria-expanded", "true");
    expect(
      document.getElementById(detailButtons[0].getAttribute("aria-controls") ?? ""),
    ).toHaveClass("grid-rows-[1fr]", "opacity-100");
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
      screen.getByText(
        "Ordre : « Présent » d'abord, puis par date de fin décroissante ; à égalité, par date de début décroissante",
      ),
    ).toBeInTheDocument();
    expect(container.querySelector('img[src*="logo-1up"]')).toBeInTheDocument();
    expect(container.querySelector('img[src*="logo-lig"]')).toBeInTheDocument();
    expect(container.querySelector('img[src*="logo-iscod"]')).toBeInTheDocument();
    expect(container.querySelector('img[src*="logo-simplon"]')).toBeInTheDocument();
    expect(container.querySelector('img[src*="logo-usmb"]')).toBeInTheDocument();
    expect(screen.getAllByText("Afficher le détail")).toHaveLength(7);
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
