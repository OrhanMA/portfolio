import type { Competence } from "./types";

export const adaptabilite: Competence = {
  slug: "adaptabilite",
  title: { fr: "Adaptabilité", en: "Adaptability" },
  type: "human",
  level: "advanced",
  radarValue: 75,
  icon: "RefreshCw",
  definition: {
    fr: `L'adaptabilité est la capacité à modifier sa manière de travailler lorsqu'une information nouvelle rend le plan initial moins pertinent. En développement, le changement peut venir du besoin métier, d'une version de framework, d'une contrainte de sécurité, d'un design incomplet ou d'un résultat de test. S'adapter ne signifie pas accepter chaque nouvelle demande : il faut préserver l'objectif, mesurer le coût du changement et décider si l'on ajuste la solution, le calendrier ou le périmètre.

Cette compétence demande de séparer les choix structurants des choix réversibles. Une architecture, un modèle de données ou une règle d'accès méritent une validation forte ; un prototype visuel ou un paramètre métier peut évoluer plus rapidement. Mon expérience m'a appris à conserver un socle stable — données, tests, composants partagés, déploiement — tout en laissant les parties encore incertaines suffisamment modulaires pour être remplacées sans reconstruire tout le produit.`,
    en: `Adaptability is the ability to change the way one works when new information makes the initial plan less relevant. In software development, change can come from a business requirement, a framework release, a security constraint, an incomplete design, or a test result. Adapting does not mean accepting every new request: the objective must be preserved, the cost of change assessed, and a decision made about whether to adjust the solution, schedule, or scope.

This skill requires separating structural decisions from reversible ones. Architecture, data models, and access rules deserve strong validation; a visual prototype or business setting can evolve more quickly. My experience has taught me to keep a stable foundation—data, tests, shared components, and deployment—while making uncertain parts modular enough to be replaced without rebuilding the entire product.`,
  },
  relatedNews: {
    date: "2025-10-21",
    dateLabel: { fr: "21 octobre 2025", en: "October 21, 2025" },
    title: {
      fr: "Next.js 16 recompose plusieurs repères du framework",
      en: "Next.js 16 reshapes several framework conventions",
    },
    summary: {
      fr: "Next.js 16 a stabilisé Turbopack, introduit les Cache Components et remplacé la convention middleware par proxy. Une telle version demande d'adapter rapidement ses pratiques, son architecture et ses outils sans perdre de vue les besoins du produit.",
      en: "Next.js 16 stabilized Turbopack, introduced Cache Components, and replaced the middleware convention with proxy. A release like this requires developers to adapt practices, architecture, and tooling quickly without losing sight of product needs.",
    },
    source: "Next.js",
    href: "https://nextjs.org/blog/next-16",
  },
  anecdotes: [
    {
      title: {
        fr: "Faire évoluer un simple signal interne vers une relance configurable",
        en: "Evolving a simple internal alert into a configurable reminder system",
      },
      content: {
        fr: `La première version du module de factures impayées détectait les échéances et notifiait les membres de la comptabilité ainsi que le commercial concerné. Les retours d'usage ont montré que cette réponse restait trop rigide : les délais, destinataires, modèles de courriel, pièces jointes, exclusions et règles de blocage devaient pouvoir varier sans redéploiement. J'ai conservé le moteur de sélection, mais déplacé les valeurs figées vers la configuration Odoo et fait évoluer le traitement vers l'envoi de relances pilotées par la comptabilité.`,
        en: `The first version of the overdue-invoice module detected deadlines and notified accounting members and the relevant salesperson. Usage feedback showed that this response remained too rigid: intervals, recipients, email templates, attachments, exclusions, and blocking rules had to vary without redeployment. I retained the selection engine but moved fixed values into Odoo settings and evolved the process toward reminders controlled by accounting.`,
      },
      result: {
        fr: "Le module répond aujourd'hui à davantage de situations tout en demandant moins d'intervention technique. L'adaptation n'a pas produit une seconde solution parallèle : elle a transformé le premier prototype en mécanisme maintenable et administrable par les utilisateurs compétents.",
        en: "The module now handles more situations while requiring less technical intervention. Adaptation did not create a second parallel solution; it transformed the initial prototype into a maintainable mechanism administered by knowledgeable users.",
      },
      linkedRealisation: "modules-metier-odoo",
    },
    {
      title: {
        fr: "Construire le site corporate pendant que le produit se précise",
        en: "Building the corporate website while the product takes shape",
      },
      content: {
        fr: `La refonte du site corporate a commencé alors que les maquettes, les textes, les droits liés aux marques et le circuit final du formulaire n'étaient pas tous stabilisés. La préparation envisageait treize langues, mais la première version a finalement été recentrée sur le français et l'anglais. Plusieurs pistes graphiques ont été prototypées avant qu'une direction définitive soit retenue. J'ai adapté l'intégration en isolant les contenus, en construisant des composants réutilisables et en séparant les éléments serveur des interactions animées, afin que les décisions encore ouvertes ne fragilisent pas l'ensemble.`,
        en: `The corporate website redesign began while layouts, copy, brand permissions, and the form's final routing were not all stable. Preparation considered thirteen languages, but the first release was ultimately refocused on French and English. Several visual directions were prototyped before a final direction was selected. I adapted the implementation by isolating content, building reusable components, and separating server elements from animated interactions so open decisions would not destabilize the whole application.`,
      },
      result: {
        fr: "Le projet dispose d'un socle responsive, bilingue, testable et déployable alors que la direction visuelle et les contenus poursuivent leur validation. Le périmètre de la V1 reste protégé, et l'extension future des langues n'exigera pas de réécrire les pages.",
        en: "The project has a responsive, bilingual, testable, and deployable foundation while visual direction and content continue through approval. The first-release scope remains protected, and adding languages later will not require rewriting pages.",
      },
      linkedRealisation: "refonte-site-corporate",
    },
    {
      title: {
        fr: "Réévaluer chaque personnalisation lors d'une migration majeure",
        en: "Reassessing every customization during a major migration",
      },
      content: {
        fr: `Pendant la migration vers Odoo 19, reproduire mécaniquement l'existant aurait conservé des centaines de personnalisations Studio, y compris celles devenues obsolètes ou remplacées par le standard. Pour chaque module, vue ou automatisation, j'ai dû choisir entre adapter, remplacer, corriger localement ou supprimer. Les API utilisées par les systèmes externes ont également évolué, ce qui a imposé de moderniser la majorité des intégrations vers JSON-2 tout en maintenant temporairement une dépendance envers un prestataire pour la dernière.`,
        en: `During the Odoo 19 migration, mechanically reproducing the existing system would have retained hundreds of Studio customizations, including ones that were obsolete or replaced by standard features. For every module, view, or automation, I had to choose whether to adapt, replace, fix locally, or remove it. APIs used by external systems also evolved, requiring most integrations to move to JSON-2 while temporarily retaining a dependency on a provider for the final one.`,
      },
      result: {
        fr: "Environ 85 % des personnalisations Studio ont pu être abandonnées sans manque fonctionnel connu, ce qui réduit la dette technique au lieu de simplement la transporter vers la nouvelle version. Cette adaptation a conservé la valeur métier plutôt que la forme historique de chaque solution.",
        en: "Around 85% of Studio customizations could be removed with no known functional gap, reducing technical debt instead of merely transporting it to the new version. This adaptation preserved business value rather than the historical form of every solution.",
      },
      linkedRealisation: "migration-odoo-v16-v19",
    },
  ],
  selfCritique: {
    level: {
      fr: "Je situe mon niveau à avancé : je peux changer de technologie, de structure ou de périmètre sans perdre l'objectif principal, et je sais conserver des interfaces stables autour d'une partie encore mouvante. Ma limite est organisationnelle : sur le site corporate, certains contenus et choix graphiques auraient dû être demandés ou arbitrés plus tôt afin de réduire le nombre de prototypes nécessaires.",
      en: "I assess myself as advanced: I can change technology, structure, or scope without losing the main objective, and I can preserve stable interfaces around an evolving area. My limitation is organizational: on the corporate website, some content and visual choices should have been requested or decided earlier to reduce the number of necessary prototypes.",
    },
    importance: {
      fr: "Elle est prioritaire dans mon profil parce que mes projets combinent des frameworks en évolution, des besoins métier et des interlocuteurs non techniques. Elle me permet de continuer à livrer pendant que l'information se précise, mais elle doit rester encadrée par un périmètre et des critères de réussite pour ne pas devenir une acceptation permanente du changement.",
      en: "It is a priority in my profile because my projects combine evolving frameworks, business requirements, and nontechnical stakeholders. It lets me continue delivering while information becomes clearer, but it must remain bounded by scope and success criteria so it does not become permanent acceptance of change.",
    },
    advice: {
      fr: "Je conseille de rendre explicites trois catégories : ce qui est validé, ce qui peut encore évoluer et ce qui est volontairement hors périmètre. Cette distinction permet de concevoir des points d'extension sans surarchitecturer le projet. S'adapter efficacement consiste autant à refuser une variation non prioritaire qu'à intégrer rapidement un changement réellement nécessaire.",
      en: "My advice is to make three categories explicit: what is approved, what may still change, and what is deliberately out of scope. This distinction enables extension points without overengineering the project. Effective adaptation involves refusing a low-priority variation just as much as rapidly integrating a genuinely necessary change.",
    },
  },
  evolution: {
    goal: {
      fr: "Renforcer mon adaptabilité produit : mieux chiffrer le coût d'un changement, présenter plusieurs options avec leurs conséquences et décider plus tôt quelles parties doivent rester flexibles ou au contraire être stabilisées.",
      en: "Strengthen my product adaptability by estimating change costs more accurately, presenting options with their consequences, and deciding earlier which areas should remain flexible or instead be stabilized.",
    },
    training: {
      fr: "Je poursuis ma veille sur Next.js, Odoo et les architectures évolutives, mais je veux surtout pratiquer davantage les documents de décision, le prototypage limité dans le temps et la priorisation par valeur plutôt que par nouveauté technique.",
      en: "I continue monitoring Next.js, Odoo, and evolvable architectures, but above all I want more practice with decision records, time-boxed prototyping, and prioritization by value rather than technical novelty.",
    },
  },
  linkedRealisations: [
    "migration-odoo-v16-v19",
    "modules-metier-odoo",
    "refonte-site-corporate",
  ],
};
