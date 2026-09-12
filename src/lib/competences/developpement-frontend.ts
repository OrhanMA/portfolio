import type { Competence } from "./types";

export const developpementFrontend: Competence = {
  slug: "developpement-frontend",
  title: {
    fr: "Développement Frontend (React/Next.js)",
    en: "Frontend Development (React/Next.js)",
  },
  type: "technical",
  level: "intermediate",
  radarValue: 80,
  icon: "Monitor",
  definition: {
    fr: `Le développement frontend transforme des contenus, des données et des actions en une interface compréhensible, accessible et fiable. La compétence ne se réduit pas à reproduire une maquette : il faut construire une hiérarchie, gérer les états, adapter la mise en page à la largeur disponible, préserver la navigation au clavier, annoncer correctement les changements et limiter le coût des ressources exécutées dans le navigateur.

Avec React et Next.js, je distingue les composants qui peuvent rester rendus sur le serveur de ceux qui nécessitent réellement de l'interactivité. Cette séparation réduit le JavaScript envoyé, clarifie les responsabilités et protège le chargement initial. Les animations restent isolées dans des composants clients, respectent la préférence de mouvement réduit et utilisent une portée explicite. L'internationalisation, les métadonnées et les routes localisées font partie de l'architecture plutôt que d'être ajoutées après les pages.

J'évalue une interface avec plusieurs types de preuves : comportement responsive réel, tests de composants et de parcours, contrôle visuel, accessibilité sémantique et mesures de performance. Un score Lighthouse aide à détecter un écart, mais il reste une mesure datée et ne remplace ni l'usage ni la lecture du code.`,
    en: `Frontend development transforms content, data, and actions into an interface that is understandable, accessible, and reliable. The skill is not limited to reproducing a mockup: hierarchy must be built, states managed, layout adapted to available width, keyboard navigation preserved, changes announced correctly, and the cost of browser resources limited.

With React and Next.js, I distinguish components that can remain server-rendered from those that genuinely require interactivity. This separation reduces shipped JavaScript, clarifies responsibilities, and preserves initial-load performance. Animations remain isolated in client components, respect reduced-motion preferences, and use explicit scope. Internationalization, metadata, and localized routes are part of the architecture rather than additions made after pages exist.

I evaluate an interface through several kinds of evidence: actual responsive behavior, component and journey tests, visual inspection, semantic accessibility, and performance measurement. A Lighthouse score helps reveal a gap, but remains a dated measurement and does not replace usage or code review.`,
  },
  relatedNews: {
    date: "2025-10-01",
    dateLabel: { fr: "1er octobre 2025", en: "October 1, 2025" },
    title: {
      fr: "React 19.2 introduit Activity et les Performance Tracks",
      en: "React 19.2 introduces Activity and Performance Tracks",
    },
    summary: {
      fr: "React 19.2 a ajouté le composant Activity, le prérendu partiel et des pistes dédiées dans Chrome DevTools. Ces outils déplacent le travail frontend au-delà de l'affichage : il faut aussi savoir prioriser le rendu, préserver l'état et mesurer les performances réelles.",
      en: "React 19.2 added the Activity component, partial pre-rendering, and dedicated tracks in Chrome DevTools. These tools move frontend work beyond display alone: developers must also prioritize rendering, preserve state, and measure real performance.",
    },
    source: "React",
    href: "https://react.dev/blog/2025/10/01/react-19-2",
  },
  anecdotes: [
    {
      title: {
        fr: "Transformer des maquettes corporate en système responsive",
        en: "Turning corporate mockups into a responsive system",
      },
      content: {
        fr: `Pour le nouveau site corporate, j'ai transformé trois maquettes Figma en mise en page continue plutôt qu'en versions séparées pour quelques écrans. J'ai construit des composants partagés, séparé les éléments serveur des interactions, centralisé les traductions et réparti les animations entre GSAP, Motion et Lenis selon leur rôle. Les vidéos et images sont intégrées selon leur usage, les préférences de mouvement réduit sont prises en compte et Lighthouse est mesuré après les étapes importantes. Les prototypes ont permis aux graphistes d'ajuster la direction sans obliger à reconstruire le socle technique.`,
        en: `For the new corporate website, I transformed three Figma mockups into a continuous responsive layout rather than separate versions for a few screens. I built shared components, separated server elements from interactions, centralized translations, and assigned animation responsibilities across GSAP, Motion, and Lenis. Videos and images are integrated according to their use, reduced-motion preferences are considered, and Lighthouse is measured after important milestones. Prototypes allowed designers to refine direction without requiring the technical foundation to be rebuilt.`,
      },
      result: {
        fr: "La page d'accueil et la page de contact sont déjà présentables sur plusieurs navigateurs et formats, avec un système de composants réutilisable. Le principal défaut mobile de l'ancien site a été traité dès le développement plutôt qu'après la mise en ligne.",
        en: "The homepage and contact page are already presentable across several browsers and formats, with a reusable component system. The old website's most visible mobile defect was addressed during development rather than after launch.",
      },
      linkedRealisation: "refonte-site-corporate",
    },
    {
      title: {
        fr: "Construire une visualisation interactive sans graphique standard",
        en: "Building an interactive visualization without a standard chart",
      },
      content: {
        fr: `Dans CAP2vie, j'étais principalement responsable de la visualisation D3.js d'une trajectoire de vie. Les réponses du questionnaire devaient devenir des périodes exactes ou estimées, réparties sur cinq dimensions et lisibles selon deux modes. Le graphique devait également permettre des corrections qui se répercutaient dans le formulaire. J'ai travaillé avec Vue et Nuxt, utilisé les primitives de D3.js plutôt qu'un composant prêt à l'emploi, et fait évoluer le rendu en trois versions principales afin de rapprocher progressivement la représentation de la méthode des chercheurs.`,
        en: `In CAP2vie, I was mainly responsible for the D3.js life-trajectory visualization. Questionnaire answers had to become exact or estimated periods distributed across five dimensions and readable in two modes. The chart also had to allow corrections that flowed back into the form. I worked with Vue and Nuxt, used D3.js primitives rather than a ready-made component, and evolved the display through three main versions to progressively align the representation with the researchers' method.`,
      },
      result: {
        fr: "Le prototype a rendu les réponses visibles, comparables et corrigeables depuis deux points d'entrée. Il m'a appris qu'une interface de données doit préserver la signification scientifique avant de chercher une finition visuelle spectaculaire.",
        en: "The prototype made answers visible, comparable, and editable from two entry points. It taught me that a data interface must preserve scientific meaning before pursuing spectacular visual polish.",
      },
      linkedRealisation: "app-trajectoires-de-vie",
    },
    {
      title: {
        fr: "Faire du portfolio un produit éditorial testable",
        en: "Turning the portfolio into a testable editorial product",
      },
      content: {
        fr: `Le portfolio associe Next.js 16, React 19, Tailwind CSS, shadcn/ui, MDX et GSAP. J'ai construit les routes bilingues, les dictionnaires serveur et client, la navigation, le thème, les transitions, le défilement Lenis, le blog, les formulaires et les pages éditoriales longues. La page d'accueil est rendue statiquement sans runtime React côté client pour son contenu principal, tandis que les interactions restent isolées. Les pages de réalisations et de compétences utilisent des sommaires, des largeurs de lecture limitées et de vrais niveaux de titres afin que leur volume ne produise pas un mur de texte.`,
        en: `The portfolio combines Next.js 16, React 19, Tailwind CSS, shadcn/ui, MDX, and GSAP. I built bilingual routes, server and client dictionaries, navigation, theme, transitions, Lenis scrolling, the blog, forms, and long-form editorial pages. The homepage is statically rendered without a client-side React runtime for its main content, while interactions remain isolated. Achievement and skill pages use table-of-contents navigation, limited reading widths, and genuine heading levels so their volume does not become a wall of text.`,
      },
      result: {
        fr: "Le site est publié, responsive et couvert par des tests unitaires, de navigateur, visuels et bout en bout. Une mesure Lighthouse de juillet 2026 indique 95 en performance, 96 en accessibilité et 100 pour les bonnes pratiques et le SEO, valeurs que je conserve comme photographie datée plutôt que comme garantie permanente.",
        en: "The site is published, responsive, and covered by unit, browser, visual, and end-to-end tests. A July 2026 Lighthouse measurement reports scores of 95 for performance, 96 for accessibility, and 100 for best practices and SEO. I retain these values as a dated snapshot rather than a permanent guarantee.",
      },
      linkedRealisation: "portfolio-professionnel",
    },
  ],
  selfCritique: {
    level: {
      fr: "J'estime avoir un niveau intermédiaire confirmé. Je peux construire une application responsive et bilingue, organiser ses composants, intégrer des animations et couvrir ses parcours principaux. Je dois encore progresser dans la conception visuelle originale, la validation par des utilisateurs novices et l'optimisation fondée sur des profils de performance plus détaillés qu'un audit global.",
      en: "I assess myself as a strong intermediate. I can build a responsive, bilingual application, organize its components, integrate animation, and cover its main journeys. I still need to improve original visual design, validation by novice users, and optimization based on performance profiles more detailed than a global audit.",
    },
    importance: {
      fr: "Le frontend rend visibles mes autres compétences. Une règle métier, une API ou une preuve professionnelle ne produit de valeur que si son interface permet de la comprendre et de l'utiliser. Il élargit aussi mon profil au-delà d'Odoo vers des produits web publics et des expériences de données.",
      en: "Frontend work makes my other skills visible. A business rule, API, or professional proof creates value only when its interface makes it understandable and usable. It also broadens my profile beyond Odoo toward public web products and data experiences.",
    },
    advice: {
      fr: "Je conseille de concevoir avec le contenu réel et la quantité réelle de texte avant de finaliser les cartes ou les animations. Il faut ensuite vérifier les extrêmes : écran étroit, clavier, mouvement réduit, traduction plus longue, erreur réseau et contenu absent. Une interface réussie ne dépend pas de l'effet le plus visible, mais de sa capacité à rester claire lorsque les conditions idéales disparaissent.",
      en: "My advice is to design with actual content and actual text volume before finalizing cards or animations. Extremes should then be checked: narrow screens, keyboard use, reduced motion, longer translations, network errors, and missing content. A successful interface does not depend on its most visible effect but on remaining clear when ideal conditions disappear.",
    },
  },
  evolution: {
    goal: {
      fr: "Atteindre un niveau avancé en renforçant l'architecture de composants, l'accessibilité manuelle, la mesure des performances React et la capacité à transformer une direction artistique en système cohérent sans dépendre de solutions conventionnelles.",
      en: "Reach an advanced level by strengthening component architecture, manual accessibility testing, React performance measurement, and the ability to turn an art direction into a coherent system without relying on conventional solutions.",
    },
    training: {
      fr: "Je poursuis l'étude de React et Next.js, les tests avec Playwright et l'analyse des Performance Tracks. La finalisation du site corporate et les prochaines itérations du portfolio serviront à travailler plus profondément la composition, l'accessibilité et la réutilisation des composants.",
      en: "I continue studying React and Next.js, Playwright testing, and Performance Tracks analysis. Finalizing the corporate website and future portfolio iterations will provide deeper practice in composition, accessibility, and component reuse.",
    },
  },
  linkedRealisations: [
    "refonte-site-corporate",
    "portfolio-professionnel",
    "app-trajectoires-de-vie",
  ],
};
