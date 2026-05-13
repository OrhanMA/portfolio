import type { LocalizedContent } from "./odoo-projects";

export type Realisation = {
  slug: string;
  title: LocalizedContent;
  shortDescription: LocalizedContent;
  context: LocalizedContent;
  tags: string[];
  presentation: LocalizedContent;
  objectives: LocalizedContent;
  steps: LocalizedContent;
  actors: LocalizedContent;
  results: LocalizedContent;
  aftermath: LocalizedContent;
  critique: LocalizedContent;
  linkedCompetences: string[];
  media?: RealisationMedia[];
};

export type RealisationMedia = {
  type: "image" | "youtube";
  src: string;
  title: LocalizedContent;
  description: LocalizedContent;
};

export const realisations: Realisation[] = [
  {
    slug: "migration-odoo-v16-v19",
    title: {
      fr: "Migration d'un ERP d'entreprise de Odoo 16 vers Odoo 19",
      en: "Enterprise ERP migration from Odoo 16 to Odoo 19",
    },
    shortDescription: {
      fr: "Migration en solo d'un ERP utilisé directement par 19 utilisateurs internes et indirectement par une trentaine de collaborateurs, avec 16 modules custom et une dizaine de modules tiers à adapter.",
      en: "Solo migration of an ERP directly used by 19 internal users and indirectly affecting around 30 employees, with 16 custom modules and about 10 third-party modules to adapt.",
    },
    context: { fr: "Entreprise", en: "Company" },
    tags: ["Odoo", "Python", "PostgreSQL", "Migration"],
    presentation: {
      fr: "La migration d'Odoo v16 vers v19 est un projet d'envergure que j'ai mené en solo chez 1UP Distribution. L'ERP est utilisé directement par 19 utilisateurs internes et impacte une trentaine de collaborateurs au total via Odoo, la logistique, le site B2B, le site corporate et les processus associés.",
      en: "The migration from Odoo v16 to v19 is a large-scale project I led single-handedly at 1UP Distribution. The ERP is directly used by 19 internal users and affects around 30 employees overall through Odoo, logistics, the B2B site, the corporate site, and related workflows.",
    },
    objectives: {
      fr: "L'objectif principal était de migrer l'intégralité de l'ERP vers Odoo v19 sans perte de données et avec un minimum de régression fonctionnelle. Les risques identifiés étaient importants : perte de données potentielle, modules custom incompatibles, personnalisations Studio non versionnées susceptibles de casser, et un temps d'arrêt (downtime) à minimiser pour ne pas impacter l'activité commerciale.",
      en: "The main objective was to migrate the entire ERP to Odoo v19 without data loss and with minimal functional regression. The identified risks were significant: potential data loss, incompatible custom modules, unversioned Studio customizations likely to break, and downtime to minimize to avoid impacting business operations.",
    },
    steps: {
      fr: "J'ai commencé par lister les personnalisations existantes : 16 modules custom créés par moi from scratch, une dizaine de modules tiers à corriger, améliorer ou migrer, et des centaines de personnalisations effectuées via Odoo Studio.\n\nJ'ai travaillé sur un environnement staging Odoo.sh réaliste, basé sur les données de production. La bascule vers Odoo 19 a eu lieu le 6 février 2026, puis la version stable a été atteinte environ 1 mois plus tard.\n\nDeux incidents importants ont aussi été résolus pendant cette stabilisation : récupération de numéros mobiles supprimés par un changement Odoo via scripts de migration et cron jobs ; récupération et fiabilisation des marges sur factures via mon module dédié, avec une marge plus fiable qu'avant et désormais automatisée.",
      en: "I started by listing existing customizations: 16 custom modules I built from scratch, about 10 third-party modules to fix, improve, or migrate, and hundreds of customizations made through Odoo Studio.\n\nI worked on a realistic Odoo.sh staging environment based on production data. The switch to Odoo 19 happened on February 6, 2026, and the stable version was reached around 1 month later.\n\nTwo important incidents were also resolved during stabilization: recovery of mobile numbers removed by an Odoo change through migration scripts and cron jobs; recovery and reliability improvements for invoice margins through my dedicated module, making margin more reliable than before and fully automated.",
    },
    actors: {
      fr: "J'ai géré seul tout le volet technique de la migration. Mes interactions principales étaient avec une collègue assistante de direction qui connaît très bien l'ERP au niveau fonctionnel et les processus internes de l'entreprise. Sa connaissance métier était précieuse pour valider que les fonctionnalités migrées correspondaient bien aux usages réels.",
      en: "I handled the entire technical side of the migration alone. My main interactions were with a colleague, the executive assistant, who knows the ERP very well at a functional level and understands the company's internal processes. Her business knowledge was invaluable for validating that migrated features matched actual usage.",
    },
    results: {
      fr: "La migration a pris 6 mois de préparation et la stabilisation principale après bascule a duré environ 1 mois. Elle a sécurisé un ERP utilisé directement par 19 utilisateurs, avec 16 modules custom, une dizaine de modules tiers adaptés et plusieurs incidents de données résolus. Les automatisations Odoo et simplifications métier font gagner plusieurs minutes à plusieurs heures par jour selon les utilisateurs et les processus.",
      en: "The migration took 6 months of preparation and the main post-switch stabilization lasted around 1 month. It secured an ERP directly used by 19 users, with 16 custom modules, about 10 third-party modules adapted, and several data incidents resolved. Odoo automations and workflow simplifications save users several minutes to several hours per day depending on the process.",
    },
    aftermath: {
      fr: "Aujourd'hui, l'ERP fonctionne de façon stable sur Odoo v19. Les utilisateurs bénéficient des améliorations de la nouvelle version et les modules custom ont été adaptés. Cette migration a aussi posé les bases pour les futures mises à jour, qui seront plus simples grâce à la documentation et aux scripts de migration créés pendant le processus.",
      en: "Today, the ERP runs stably on Odoo v19. Users benefit from the new version's improvements and custom modules have been adapted. This migration also laid the groundwork for future updates, which will be simpler thanks to the documentation and migration scripts created during the process.",
    },
    critique: {
      fr: "Si c'était à refaire, je mapperais plus rigoureusement la liste des changements entre versions et les processus métier à tester, pour avoir moins de régressions inattendues après la migration. Un document de recette plus structuré, validé avec les utilisateurs clés avant la bascule, aurait permis de réduire encore le nombre de corrections post-migration.",
      en: "If I had to do it again, I would more rigorously map the list of changes between versions and the business processes to test, to have fewer unexpected regressions after migration. A more structured acceptance document, validated with key users before the switch, would have further reduced the number of post-migration fixes.",
    },
    linkedCompetences: [
      "developpement-odoo",
      "python",
      "autonomie",
      "perseverance",
    ],
    media: [
      {
        type: "image",
        src: "/images/project-screenshots/odoo/odoo-success-migration-v17.png",
        title: {
          fr: "Validation de migration vers Odoo 17",
          en: "Odoo 17 migration validation",
        },
        description: {
          fr: "Étape intermédiaire de la migration Odoo.sh, utilisée pour isoler les incompatibilités avant la montée finale.",
          en: "Intermediate Odoo.sh migration step used to isolate incompatibilities before the final upgrade.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/odoo/odoo-success-migration-v18.png",
        title: {
          fr: "Validation de migration vers Odoo 18",
          en: "Odoo 18 migration validation",
        },
        description: {
          fr: "Passage de validation avant la branche v19, avec correction progressive des modules custom et tiers.",
          en: "Validation step before the v19 branch, with progressive fixes on custom and third-party modules.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/odoo/odoo-success-migration-v19.png",
        title: {
          fr: "Migration Odoo 19 réussie",
          en: "Successful Odoo 19 migration",
        },
        description: {
          fr: "Validation de la branche cible Odoo 19 avant merge staging → production.",
          en: "Validation of the target Odoo 19 branch before the staging to production merge.",
        },
      },
    ],
  },
  {
    slug: "modules-metier-odoo",
    title: {
      fr: "Développement de modules métier pour un ERP",
      en: "Business module development for an ERP",
    },
    shortDescription: {
      fr: "Conception solo de 16 modules Odoo from scratch, plus corrections, améliorations et migration d'une dizaine de modules tiers.",
      en: "Solo design of 16 Odoo modules from scratch, plus fixes, improvements, and migration for about 10 third-party modules.",
    },
    context: { fr: "Entreprise", en: "Company" },
    tags: ["Odoo", "Python", "PostgreSQL", "API", "Open Source"],
    presentation: {
      fr: "Ce projet regroupe les modules Odoo custom que j'ai développés chez 1UP Distribution pour répondre aux besoins métier spécifiques de l'entreprise. Au total, 16 modules ont été créés par moi en solo from scratch, auxquels s'ajoutent les fixes, améliorations et migrations d'environ 10 modules tiers. Les domaines couverts vont de la comptabilité à la logistique, en passant par le commercial, le catalogue produit, les API de stock et le site B2B.",
      en: "This project encompasses the custom Odoo modules I developed at 1UP Distribution to address the company's specific business needs. In total, I built 16 modules solo from scratch, in addition to fixes, improvements, and migrations for about 10 third-party modules. Covered domains range from accounting to logistics, sales, product catalog, stock APIs, and the B2B site.",
    },
    objectives: {
      fr: "Aucun module existant sur le store Odoo ne répondait aux besoins spécifiques de l'entreprise. L'objectif était de développer des solutions sur mesure qui s'intègrent parfaitement dans les workflows existants, sans perturber l'utilisation quotidienne de l'ERP par les équipes.",
      en: "No existing module on the Odoo store met the company's specific needs. The objective was to develop custom solutions that integrate seamlessly into existing workflows without disrupting teams' daily ERP usage.",
    },
    steps: {
      fr: "Les demandes arrivaient de plusieurs canaux : demandes orales, écrites, via des discussions sur l'ERP, via des fichiers de demande. Pour chaque besoin, j'échangeais avec les personnes concernées pour comprendre précisément leurs attentes. Le processus suivait ensuite un cycle clair : ticket Jira → développement → test → retours utilisateurs → modifications et re-tests éventuels → mise en production → communication des changements aux utilisateurs.",
      en: "Requests came through multiple channels: verbal, written, ERP discussions, request files. For each need, I exchanged with the relevant people to understand their expectations precisely. The process then followed a clear cycle: Jira ticket → development → testing → user feedback → modifications and re-testing if needed → production deployment → communicating changes to users.",
    },
    actors: {
      fr: "Les demandeurs pouvaient être n'importe quel utilisateur de l'ERP : direction, comptabilité, logistique, commerciaux. Chaque module nécessitait une collaboration étroite avec l'équipe concernée pour comprendre le besoin métier et valider la solution. Par exemple, le module de marge a nécessité de nombreux allers-retours avec l'équipe comptabilité.",
      en: "Requesters could be any ERP user: management, accounting, logistics, sales. Each module required close collaboration with the relevant team to understand the business need and validate the solution. For example, the margin module required numerous back-and-forth exchanges with the accounting team.",
    },
    results: {
      fr: "Parmi les modules les plus impactants :\n\n- **Calcul de marge sur factures** : a permis de donner des indicateurs de rentabilité et des KPI à la direction, améliorant le pilotage commercial.\n- **Synchronisation Odoo/B2B** : a permis la synchronisation de données de stock essentielles entre l'ERP et le site B2B, avec des champs personnalisés, des routes API et des algorithmes de calcul de stock complexes qui sortaient des sentiers battus d'Odoo.\n- **Alertes de retard de paiement** : impact immédiat car la comptabilité pouvait plus facilement détecter et relancer les clients lors des retards, améliorant la gestion de trésorerie.\n\nTous les modules ont été nettoyés et publiés en open source sur GitHub.",
      en: "Among the most impactful modules:\n\n- **Invoice margin calculation**: provided profitability indicators and KPIs to management, improving commercial steering.\n- **Odoo/B2B synchronization**: enabled synchronization of essential stock data between the ERP and B2B site, with custom fields, API routes, and complex stock calculation algorithms that went beyond Odoo's beaten path.\n- **Overdue payment alerts**: immediate impact as accounting could more easily detect and follow up on late-paying clients, improving cash flow management.\n\nAll modules were cleaned up and published as open source on GitHub.",
    },
    aftermath: {
      fr: "Les modules sont utilisés quotidiennement par les équipes de 1UP et continuent d'évoluer en fonction des retours utilisateurs. Ils impactent directement les utilisateurs Odoo internes et, indirectement, les équipes logistique, le site B2B et les clients qui utilisent les outils connectés.",
      en: "The modules are used daily by 1UP teams and continue to evolve based on user feedback. They directly impact internal Odoo users and indirectly affect logistics teams, the B2B site, and customers using connected tools.",
    },
    critique: {
      fr: "Si je devais réécrire mes premiers modules, j'essaierais de coller encore plus aux bonnes pratiques et au coding style du code source d'Odoo. Mes premiers développements étaient fonctionnels mais pas toujours alignés avec les conventions du framework, ce que j'ai corrigé au fil du temps grâce à une meilleure connaissance du code source.",
      en: "If I had to rewrite my first modules, I would try to stick even more closely to best practices and the coding style of Odoo's source code. My early developments were functional but not always aligned with framework conventions, which I corrected over time through better knowledge of the source code.",
    },
    linkedCompetences: [
      "developpement-odoo",
      "python",
      "autonomie",
      "perseverance",
      "amelioration-continue",
      "communication",
      "adaptabilite",
    ],
    media: [
      {
        type: "image",
        src: "/images/project-screenshots/odoo/self-made-modules-list.png",
        title: {
          fr: "Liste de modules métier développés",
          en: "List of custom business modules",
        },
        description: {
          fr: "Vue d'ensemble de modules Odoo réalisés pour couvrir des besoins comptables, commerciaux, logistiques et B2B.",
          en: "Overview of Odoo modules built to cover accounting, sales, logistics, and B2B needs.",
        },
      },
    ],
  },
  {
    slug: "refonte-site-corporate",
    title: {
      fr: "Refonte d'un site corporate avec Next.js",
      en: "Corporate website redesign with Next.js",
    },
    shortDescription: {
      fr: "Refonte complète du site vitrine d'une entreprise de commerce international, du builder Odoo vers une application Next.js moderne.",
      en: "Complete redesign of an international trading company's showcase website, from Odoo builder to a modern Next.js application.",
    },
    context: { fr: "Entreprise", en: "Company" },
    tags: ["Next.js", "React", "GSAP", "TypeScript", "Tailwind CSS"],
    presentation: {
      fr: "Le site corporate de 1UP Distribution était construit avec le website builder d'Odoo 16 et était complètement dépassé, tant au niveau du design que des performances et du référencement. Le nouveau site a été pensé comme une plateforme corporate internationale : 13 locales, pages statiques clés, blog/carrières via Sanity, hero vidéo, carrousels de marques et partenaires retail, formulaires de contact/candidature, JSON-LD, sitemap, hreflang et conformité légale.",
      en: "1UP Distribution's corporate website was built with Odoo 16's website builder and was completely outdated, both in terms of design and performance/SEO. The new website was designed as an international corporate platform: 13 locales, key static pages, blog/careers via Sanity, video hero, brand and retail partner carousels, contact/application forms, JSON-LD, sitemap, hreflang, and legal compliance.",
    },
    objectives: {
      fr: "L'objectif était une refonte complète : nouveau design moderne, performances optimales, bon référencement SEO, responsive design, et une expérience utilisateur qui met en valeur les marques distribuées par l'entreprise (figurines Minix, peluches Nintendo, accessoires gaming Oniverse).",
      en: "The objective was a complete redesign: modern design, optimal performance, good SEO, responsive design, and a user experience that showcases the brands distributed by the company (Minix figurines, Nintendo plushes, Oniverse gaming accessories).",
    },
    steps: {
      fr: "J'ai travaillé en solo en tant que développeur, mais en étroite collaboration avec les graphistes/designers de la boîte pour les maquettes et le directeur de l'équipe marketing pour le contenu textuel du site. J'ai aussi travaillé avec le CEO pour définir l'image générale à renvoyer. Le développement a été fait avec Next.js pour le framework, GSAP pour les animations, et Tailwind CSS pour le styling.",
      en: "I worked solo as a developer, but in close collaboration with the company's graphic designers for mockups and the marketing team director for textual content. I also worked with the CEO to define the overall image to convey. Development was done with Next.js as the framework, GSAP for animations, and Tailwind CSS for styling.",
    },
    actors: {
      fr: "Collaboration avec l'équipe graphique/design pour les maquettes, le directeur marketing pour le contenu, et le CEO pour la vision et l'image de marque. Le développement technique était entièrement de ma responsabilité.",
      en: "Collaboration with the graphic/design team for mockups, the marketing director for content, and the CEO for vision and branding. Technical development was entirely my responsibility.",
    },
    results: {
      fr: "Le site représente un vrai changement positif pour l'image de l'entreprise. Un audit Lighthouse réalisé en production donne 99/100 en performance, 100/100 en accessibilité et 96/100 en bonnes pratiques. Le site couvre 13 locales et met en avant des preuves commerciales fortes : 35 pays couverts, 5000+ points de vente, 120+ marques partenaires et 25 ans d'expérience.",
      en: "The site represents a real positive change for the company's image. A Lighthouse audit run in production scores 99/100 performance, 100/100 accessibility, and 96/100 best practices. The site covers 13 locales and highlights strong commercial proof points: 35 covered countries, 5000+ stores, 120+ partner brands, and 25 years of experience.",
    },
    aftermath: {
      fr: "Les prochaines étapes sont la validation finale du site par la direction et sa mise en production. Le site continuera d'évoluer avec l'ajout de contenu et de fonctionnalités selon les besoins marketing.",
      en: "Next steps are final site validation by management and production deployment. The site will continue to evolve with content and feature additions based on marketing needs.",
    },
    critique: {
      fr: "Ce projet m'a permis de donner ma touche personnelle à l'image et l'histoire de la boîte, ce qui est une expérience enrichissante. En termes de choix techniques, la stack Next.js + GSAP s'est avérée pertinente pour ce type de site vitrine où les animations et les performances sont clés.",
      en: "This project allowed me to give my personal touch to the company's image and story, which was an enriching experience. In terms of technical choices, the Next.js + GSAP stack proved relevant for this type of showcase site where animations and performance are key.",
    },
    linkedCompetences: [
      "developpement-frontend",
      "autonomie",
      "adaptabilite",
      "devops",
    ],
    media: [
      {
        type: "image",
        src: "/images/project-screenshots/corporate/corporate-landing-page.png",
        title: {
          fr: "Hero vidéo et positionnement",
          en: "Video hero and positioning",
        },
        description: {
          fr: "Premier écran du site corporate, conçu autour d'un fond vidéo, d'un message clair et de CTA orientés distribution/création produit.",
          en: "First viewport of the corporate site, built around a video background, clear messaging, and distribution/product-creation CTAs.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/corporate/corporate-brands-section.png",
        title: {
          fr: "Mise en avant des marques partenaires",
          en: "Partner brands showcase",
        },
        description: {
          fr: "Section interactive avec logos de marques distribuées et animation GSAP draggable.",
          en: "Interactive section with distributed brand logos and draggable GSAP animation.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/corporate/corporate-partners-section.png",
        title: {
          fr: "Preuves de distribution retail",
          en: "Retail distribution proof",
        },
        description: {
          fr: "Section de réassurance orientée partenaires retail et crédibilité commerciale.",
          en: "Trust-building section focused on retail partners and commercial credibility.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/corporate/corporate-local-hero.png",
        title: {
          fr: "Rendu local du hero",
          en: "Local hero rendering",
        },
        description: {
          fr: "Capture générée depuis le site corporate monté en local pour vérifier le rendu réel.",
          en: "Screenshot generated from the locally running corporate site to verify the real rendering.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/corporate/score-lighthouse-corporate.png",
        title: {
          fr: "Audit Lighthouse production",
          en: "Production Lighthouse audit",
        },
        description: {
          fr: "Score mesuré en production : 99 performance, 100 accessibilité, 96 bonnes pratiques.",
          en: "Production score: 99 performance, 100 accessibility, 96 best practices.",
        },
      },
    ],
  },
  {
    slug: "app-trajectoires-de-vie",
    title: {
      fr: "Développement d'une application web de trajectoires de vie",
      en: "Development of a life trajectories web application",
    },
    shortDescription: {
      fr: "Conception d'une application de questionnaire sociologique avec visualisation de données D3.js sur mesure au Laboratoire d'Informatique de Grenoble.",
      en: "Design of a sociological questionnaire application with custom D3.js data visualization at the Grenoble Computer Science Laboratory.",
    },
    context: { fr: "Stage (recherche universitaire)", en: "Internship (university research)" },
    tags: ["Vue.js", "JavaScript", "D3.js", "PostgreSQL", "Recherche"],
    presentation: {
      fr: "Lors de mon stage de 5 mois au Laboratoire d'Informatique de Grenoble (LIG), j'ai été en charge de développer une application web de questionnaire pour des sociologues. Cette application permettait de récupérer les informations d'individus lors d'enquêtes sociologiques et de générer des trajectoires de vie sous plusieurs aspects : professionnel, personnel et géographique. Le projet s'inscrivait dans un travail de recherche plus large sur une nouvelle méthode en sociologie basée sur les trajectoires de vie.\n\nL'application reposait sur Nuxt 3/Vue 3 côté front-end, Express.js côté back-end, Prisma/PostgreSQL pour les données, D3.js pour la visualisation et Socket.io pour la connexion multi-écrans.",
      en: "During my 5-month internship at the Grenoble Computer Science Laboratory (LIG), I was in charge of developing a questionnaire web application for sociologists. This application collected individual information during sociological surveys and generated life trajectories across multiple aspects: professional, personal, and geographical. The project was part of a larger research effort on a new sociology method based on life trajectories.\n\nThe application used Nuxt 3/Vue 3 on the frontend, Express.js on the backend, Prisma/PostgreSQL for data, D3.js for visualization, and Socket.io for multi-screen connection.",
    },
    objectives: {
      fr: "L'objectif était de créer la première version d'un outil from scratch, sous la direction d'une professeure chercheuse. L'application devait être utilisée par 3 à 4 sociologues enquêteurs, membres du LIG mais aussi professeurs d'autres universités en France.",
      en: "The objective was to create the first version of a tool from scratch, under the direction of a research professor. The application was to be used by 3 to 4 sociologist investigators, LIG members as well as professors from other French universities.",
    },
    steps: {
      fr: "La stack technique comprenait une base de données PostgreSQL, une application web développée avec Vue.js, et D3.js pour les visualisations de données entièrement custom. Le highlight technique du projet était l'implémentation d'une solution sur mesure avec D3.js pour créer un type de graphique qui n'existait pas encore pour tracer les trajectoires de vie. D3.js est une librairie qui donne un contrôle total : il fallait construire le graphique souhaité à partir des briques de base de la librairie, à l'opposé des librairies de graphiques prêts à l'emploi.",
      en: "The technical stack included a PostgreSQL database, a web application developed with Vue.js, and D3.js for fully custom data visualizations. The technical highlight of the project was implementing a custom solution with D3.js to create a chart type that didn't exist yet for tracing life trajectories. D3.js is a library that gives total control: the desired chart had to be built from the library's basic building blocks, the opposite of ready-to-use charting libraries.",
    },
    actors: {
      fr: "J'ai travaillé sous la direction d'une professeure chercheuse du LIG. Les utilisateurs finaux étaient des sociologues enquêteurs — environ 3 à 4 chercheurs, membres du LIG et professeurs d'autres universités françaises.",
      en: "I worked under the direction of a LIG research professor. The end users were sociologist investigators — about 3 to 4 researchers, LIG members and professors from other French universities.",
    },
    results: {
      fr: "L'application a été livrée en version fonctionnelle avec le système de questionnaire et les visualisations D3.js custom. Le type de graphique créé pour les trajectoires de vie était un vrai défi technique qui a abouti à un résultat original et utile pour les chercheurs.",
      en: "The application was delivered as a working version with the questionnaire system and custom D3.js visualizations. The chart type created for life trajectories was a real technical challenge that resulted in an original and useful outcome for researchers.",
    },
    aftermath: {
      fr: "L'application a été reprise pour continuer son développement, d'autant plus qu'elle fait partie d'un travail plus grand sur une nouvelle méthode en sociologie. Le projet continue de vivre au-delà de mon stage.",
      en: "The application was taken over for continued development, especially as it's part of a larger body of work on a new sociology method. The project continues to live beyond my internship.",
    },
    critique: {
      fr: "Ce projet m'a appris l'importance de construire une solution sur des bases solides dès le départ, pour ne pas devoir retravailler la solution en permanence ou faire fausse route. C'est une leçon que j'applique désormais à tous mes projets.",
      en: "This project taught me the importance of building a solution on solid foundations from the start, to avoid constantly reworking the solution or going down the wrong path. It's a lesson I now apply to all my projects.",
    },
    linkedCompetences: [
      "developpement-frontend",
      "perseverance",
      "autonomie",
    ],
    media: [
      {
        type: "image",
        src: "/images/project-screenshots/cap2vie/cap2vie-home.png",
        title: {
          fr: "Choix du profil utilisateur",
          en: "User profile selection",
        },
        description: {
          fr: "Écran d'entrée permettant de choisir entre le rôle enquêteur et le rôle enquêté.",
          en: "Entry screen allowing the user to choose between interviewer and respondent roles.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/cap2vie/cap2vie-surveyor.png",
        title: {
          fr: "Espace enquêteur",
          en: "Interviewer workspace",
        },
        description: {
          fr: "Interface locale de l'application CAP2vie montée depuis le dépôt de stage.",
          en: "Local CAP2vie interface started from the internship repository.",
        },
      },
      {
        type: "youtube",
        src: "https://www.youtube.com/embed/LWmh8P7WWYI",
        title: {
          fr: "Création d'une enquête",
          en: "Survey creation",
        },
        description: {
          fr: "Parcours de création d'une enquête sociologique dans l'application CAP2vie.",
          en: "Flow for creating a sociological survey in the CAP2vie application.",
        },
      },
      {
        type: "youtube",
        src: "https://www.youtube.com/embed/MgQ0-j_egfQ",
        title: {
          fr: "Questionnaire séquentiel",
          en: "Sequential questionnaire",
        },
        description: {
          fr: "Interface de saisie guidée permettant aux enquêteurs de collecter les données de trajectoire.",
          en: "Guided input interface allowing interviewers to collect trajectory data.",
        },
      },
      {
        type: "youtube",
        src: "https://www.youtube.com/embed/ZEPOEr3icHg",
        title: {
          fr: "Connexion multi-écrans",
          en: "Multi-screen connection",
        },
        description: {
          fr: "Synchronisation temps réel entre écrans via Socket.io pour faciliter la conduite d'entretien.",
          en: "Real-time screen synchronization through Socket.io to support interview sessions.",
        },
      },
      {
        type: "youtube",
        src: "https://www.youtube.com/embed/uudXFbMXYnE",
        title: {
          fr: "Gestion des conflits de dates",
          en: "Date conflict handling",
        },
        description: {
          fr: "Exemple de résolution d'incohérences temporelles lors de la saisie des trajectoires.",
          en: "Example of resolving temporal inconsistencies during trajectory input.",
        },
      },
    ],
  },
  {
    slug: "portfolio-professionnel",
    title: {
      fr: "Conception d'un portfolio professionnel",
      en: "Building a professional portfolio",
    },
    shortDescription: {
      fr: "Réalisation d'un portfolio complet avec Next.js, GSAP, i18n bilingue, conformité RGPD, analytics et blog technique.",
      en: "Building a complete portfolio with Next.js, GSAP, bilingual i18n, GDPR compliance, analytics, and technical blog.",
    },
    context: { fr: "Projet personnel", en: "Personal project" },
    tags: ["Next.js", "React", "GSAP", "TypeScript", "Tailwind CSS", "MDX"],
    presentation: {
      fr: "Ce portfolio est un projet personnel visant à montrer ma palette technique et ma maîtrise d'un framework moderne. Plutôt que d'utiliser un template existant, j'ai choisi de le construire entièrement de zéro avec Next.js pour démontrer mes compétences en développement web complet — du frontend au déploiement.",
      en: "This portfolio is a personal project aimed at showcasing my technical range and mastery of a modern framework. Rather than using an existing template, I chose to build it entirely from scratch with Next.js to demonstrate my full-stack web development skills — from frontend to deployment.",
    },
    objectives: {
      fr: "L'objectif principal était d'avoir un portfolio professionnel complet et d'augmenter mes compétences via ce projet. Le portfolio devait aller bien au-delà d'une simple page statique en intégrant de nombreuses fonctionnalités : Google Analytics, envoi d'emails, reCAPTCHA, animations GSAP, blog MDX, internationalisation bilingue (français/anglais), conformité RGPD avec bannière de cookies.",
      en: "The main objective was to have a complete professional portfolio and to increase my skills through this project. The portfolio had to go well beyond a simple static page by integrating many features: Google Analytics, email sending, reCAPTCHA, GSAP animations, MDX blog, bilingual internationalization (French/English), GDPR compliance with cookie banner.",
    },
    steps: {
      fr: "Développement itératif avec Next.js comme framework, Tailwind CSS pour le styling, GSAP pour les animations, shadcn/ui comme design system, MDX pour les articles de blog, Resend pour l'envoi d'emails, et Vercel pour le déploiement. Mise en place d'une suite de tests complète (Vitest + Playwright) et d'un pipeline CI/CD avec GitHub Actions.",
      en: "Iterative development with Next.js as framework, Tailwind CSS for styling, GSAP for animations, shadcn/ui as design system, MDX for blog articles, Resend for email sending, and Vercel for deployment. Setup of a complete test suite (Vitest + Playwright) and CI/CD pipeline with GitHub Actions.",
    },
    actors: {
      fr: "Projet entièrement personnel. Toutes les décisions techniques, le design et le contenu sont de mon fait.",
      en: "Entirely personal project. All technical decisions, design, and content are mine.",
    },
    results: {
      fr: "Le portfolio est en ligne sur orhanmadiassani.com avec un domaine personnalisé, un bon référencement SEO, des animations fluides, un blog technique avec 3 articles publiés, et une conformité RGPD complète. C'est un gros apprentissage de réalisation d'un projet qui va plus loin qu'une simple page.",
      en: "The portfolio is live at orhanmadiassani.com with a custom domain, good SEO, smooth animations, a technical blog with 3 published articles, and full GDPR compliance. It's a major learning experience of building a project that goes beyond a simple page.",
    },
    aftermath: {
      fr: "Le portfolio continue d'évoluer avec l'ajout de nouvelles sections (compétences, réalisations, à propos) et de nouveaux articles. Il sert de vitrine professionnelle et de terrain d'expérimentation technique.",
      en: "The portfolio continues to evolve with the addition of new sections (skills, achievements, about) and new articles. It serves as a professional showcase and technical experimentation ground.",
    },
    critique: {
      fr: "L'un des enseignements majeurs est l'importance d'anticiper les features en amont pour commencer avec une implémentation correcte. Par exemple, le site est traduit en deux langues et il fallait commencer par une structure dynamique selon la locale dans Next.js. Au début, j'avais commencé comme si le portfolio allait être seulement en français, ce qui a nécessité une refonte de la structure par la suite.",
      en: "One of the major takeaways is the importance of anticipating features upfront to start with a correct implementation. For example, the site is translated in two languages and needed to start with a dynamic locale-based structure in Next.js. Initially, I had started as if the portfolio would only be in French, which required restructuring later.",
    },
    linkedCompetences: [
      "developpement-frontend",
      "amelioration-continue",
      "communication",
      "devops",
    ],
  },
];

export function getRealisationBySlug(slug: string) {
  return realisations.find((r) => r.slug === slug);
}
