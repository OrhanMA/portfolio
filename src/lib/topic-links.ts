import type { Locale } from "@/lib/i18n";

/** Shared destinations for the technologies and subjects displayed in the portfolio. */
const groups: [string, string[]][] = [
  [
    "/competences/developpement-odoo",
    [
      "Odoo",
      "Odoo 16+",
      "Odoo.sh",
      "ERP",
      "Business workflow",
      "XML",
      "QWeb",
      "XPath",
      "ORM",
      "ACL",
      "Studio",
      "JSON-2",
    ],
  ],
  ["/competences/autonomie", ["Autonomie", "Autonomy"]],
  ["/competences/perseverance", ["Persévérance", "Perseverance"]],
  ["/competences/adaptabilite", ["Adaptabilité", "Adaptability"]],
  ["/competences/communication", ["Communication"]],
  ["/competences/python", ["Python", "Jupyter"]],
  [
    "/competences/developpement-backend",
    [
      "PHP",
      "Symfony",
      "Symfony 6.3+",
      "PostgreSQL",
      "Redis",
      "BDD",
      "Databases",
      "Backend",
      "API",
      "APIs",
      "REST API",
    ],
  ],
  [
    "/competences/developpement-frontend",
    [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "HTML / CSS",
      "HTML",
      "CSS",
      "JavaScript",
      "Frontend",
      "UI / UX",
      "Sites web",
      "Websites",
    ],
  ],
  [
    "/competences/devops",
    [
      "Docker",
      "Linux",
      "DevOps",
      "VPS",
      "Administration",
      "Déploiement",
      "Deployment",
      "CI / CD",
      "CI/CD",
      "Git / GitHub",
      "Git",
      "GitHub",
      "GitLab",
      "Nginx",
      "OVH",
      "DigitalOcean",
    ],
  ],
  [
    "/realisations/refonte-site-corporate",
    ["Sanity", "GSAP", "i18n", "SEO", "site corporate", "corporate website"],
  ],
  [
    "/realisations/app-trajectoires-de-vie",
    [
      "Vue.js",
      "D3.js",
      "Nuxt",
      "CAP2vie",
      "Recherche",
      "Research",
      "UML",
      "Gestion de projet",
      "Project Management",
      "Agile / Scrum",
    ],
  ],
  ["/realisations/portfolio-professionnel", ["MDX", "Tests", "Testing"]],
  ["/realisations/migration-odoo-v16-v19", ["Migration", "Migrations"]],
  [
    "/realisations/modules-metier-odoo",
    [
      "Open Source",
      "Architecture",
      "Architecture modulaire",
      "Modular architecture",
    ],
  ],
  [
    "/competences/amelioration-continue",
    ["Qualité", "Quality", "Amélioration continue", "Continuous improvement"],
  ],
  [
    "/parcours/a-gaveau-web-developer-internship",
    ["WordPress", "Elementor", "A. Gaveau"],
  ],
  [
    "/parcours/1up-fullstack-developer",
    ["1UP", "1UP Distribution", "Alternance", "Work-study"],
  ],
  [
    "/parcours/lig-web-developer-internship",
    [
      "Laboratoire d’Informatique de Grenoble",
      "Laboratoire d'Informatique de Grenoble",
      "LIG",
    ],
  ],
  ["/parcours/iscod-software-engineering-master", ["ISCOD", "RNCP 7"]],
  [
    "/parcours/simplon-application-developer",
    [
      "RNCP 6",
      "CDA",
      "Concepteur Développeur d’Applications",
      "Concepteur Développeur d'Applications",
    ],
  ],
  [
    "/parcours/simplon-web-developer",
    [
      "RNCP 5",
      "DWWM",
      "Simplon",
      "Développeur Web et Web Mobile",
      "Web and Mobile Web Developer",
    ],
  ],
  [
    "/parcours/toeic-listening-reading",
    ["TOEIC", "920/990", "Listening C1", "Reading B2"],
  ],
];

export const topicPaths: Readonly<Record<string, string>> = Object.fromEntries(
  groups.flatMap(([path, labels]) => labels.map((label) => [label, path])),
);

const relatedExperiencePaths: Readonly<Record<string, string>> = {
  "/parcours/a-gaveau-web-developer-internship":
    "/parcours/simplon-web-developer",
  "/parcours/simplon-web-developer":
    "/parcours/a-gaveau-web-developer-internship",
  "/parcours/1up-fullstack-developer": "/realisations/modules-metier-odoo",
  "/parcours/lig-web-developer-internship":
    "/realisations/app-trajectoires-de-vie",
  "/parcours/simplon-application-developer":
    "/realisations/app-trajectoires-de-vie",
  "/parcours/iscod-software-engineering-master":
    "/realisations/portfolio-professionnel",
  "/parcours/toeic-listening-reading": "/competences/communication",
};

export function getTopicHref(
  label: string,
  locale: Locale,
  currentPath?: string,
) {
  const path = topicPaths[label];
  if (!path)
    throw new Error(`Missing internal destination for topic: ${label}`);
  // Avoid self-links: use a related experience or the relevant collection.
  const destination =
    path === currentPath
      ? (relatedExperiencePaths[path] ?? `/${path.split("/")[1]}`)
      : path;
  return `/${locale}${destination}`;
}
