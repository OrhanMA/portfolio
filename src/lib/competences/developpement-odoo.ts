import type { Competence } from "./types";

export const developpementOdoo: Competence = {
  slug: "developpement-odoo",
  title: { fr: "Développement Odoo", en: "Odoo Development" },
  type: "technical",
  level: "advanced",
  radarValue: 85,
  icon: "Puzzle",
  definition: {
    fr: `Le développement Odoo consiste à étendre un ERP sans rompre la cohérence de son modèle métier, de ses droits et de ses mécanismes internes. Un module peut ajouter des modèles Python, des champs, des vues XML, des rapports QWeb, des actions planifiées, des contrôleurs API, des données de configuration et des scripts de migration. La difficulté n'est pas seulement de faire fonctionner chaque composant : il faut comprendre l'ORM, les héritages, le contexte d'exécution, les dépendances entre modules et les conventions du framework afin qu'une personnalisation reste installable, testable et compatible avec les versions suivantes.

La compétence inclut également la traduction du besoin. Dans un ERP, une règle technique représente souvent une décision comptable, commerciale, logistique ou de sécurité. Je dois identifier les données fiables, les utilisateurs autorisés, les exceptions et les effets sur les autres applications. Les ACL accordent des opérations au niveau d'un modèle, les record rules limitent les enregistrements accessibles et les groupes composent les privilèges d'un utilisateur ; masquer un écran n'est donc jamais une protection suffisante.

Enfin, développer pour Odoo implique de savoir choisir entre le standard, la configuration, Studio et un module versionné. Je privilégie le standard lorsqu'il répond au besoin, la configuration lorsque la règle doit rester pilotable par les utilisateurs et le code lorsque le comportement exige une logique durable, révisable et déployable. Cette frontière réduit la dette technique et facilite les migrations.`,
    en: `Odoo development means extending an ERP without breaking the consistency of its business model, permissions, and internal mechanisms. A module can add Python models, fields, XML views, QWeb reports, scheduled actions, API controllers, configuration data, and migration scripts. The difficulty is not merely making each component work: the ORM, inheritance, execution context, module dependencies, and framework conventions must be understood so a customization remains installable, testable, and compatible with future releases.

The skill also includes translating requirements. In an ERP, a technical rule often represents an accounting, sales, logistics, or security decision. I must identify reliable data, authorized users, exceptions, and effects on other applications. ACLs grant operations at model level, record rules restrict accessible records, and groups compose a user's privileges; hiding a screen is therefore never sufficient protection.

Finally, developing for Odoo requires choosing between standard behavior, configuration, Studio, and a version-controlled module. I favor standard functionality when it addresses the need, configuration when the rule should remain controlled by users, and code when behavior requires durable, reviewable, deployable logic. This boundary reduces technical debt and simplifies migrations.`,
  },
  relatedNews: {
    date: "2025-09",
    dateLabel: { fr: "Septembre 2025", en: "September 2025" },
    title: {
      fr: "Odoo 19 fait évoluer l'ERP et ses usages métier",
      en: "Odoo 19 evolves the ERP and its business workflows",
    },
    summary: {
      fr: "Les notes de version d'Odoo 19 recensent des évolutions transversales dans les activités, documents clients, interfaces et applications métier. Pour un développeur Odoo, chaque nouvelle version implique de comprendre les nouveautés natives avant d'adapter les modules et personnalisations existants.",
      en: "The Odoo 19 release notes document cross-cutting changes to activities, customer documents, interfaces, and business applications. For an Odoo developer, each new release means understanding native capabilities before adapting existing modules and customizations.",
    },
    source: "Odoo",
    href: "https://www.odoo.com/odoo-19-release-notes",
  },
  anecdotes: [
    {
      title: {
        fr: "Migrer un ERP de la version 16 à la version 19",
        en: "Migrating an ERP from version 16 to version 19",
      },
      content: {
        fr: `J'ai pris en charge la migration successive d'Odoo 16 vers 17, 18 puis 19 pour un ERP utilisé par 20 personnes en interne et une dizaine d'agents commerciaux. Le projet comprenait 16 modules sur mesure, une dizaine d'extensions tierces et plusieurs centaines de personnalisations Studio. Pour chaque étape, j'ai adapté les modèles, méthodes Python, vues XML et XPath devenus incompatibles, recherché les changements dans le code source, récupéré ou corrigé les modules tiers et contrôlé les données PostgreSQL ainsi que le filestore. La recette couvrait les processus métier, les droits et les intégrations externes, avec une sauvegarde complète comme point de retour arrière.`,
        en: `I owned the successive migration from Odoo 16 to 17, 18, and then 19 for an ERP used by 20 internal users and around ten sales agents. The project included 16 custom modules, around ten third-party extensions, and several hundred Studio customizations. At each step, I adapted incompatible models, Python methods, XML views, and XPath expressions, researched changes in the source code, retrieved or fixed third-party modules, and checked PostgreSQL data and the filestore. Acceptance testing covered business processes, permissions, and external integrations, with a complete backup as the rollback point.`,
      },
      result: {
        fr: "Odoo 19 a été mis en production sans perte définitive de données et avec une interruption limitée à environ trois heures. Les fonctions utiles ont été conservées, la majorité des personnalisations Studio obsolètes supprimées et les intégrations principales modernisées.",
        en: "Odoo 19 was deployed to production with no permanent data loss and downtime limited to roughly three hours. Useful functions were retained, most obsolete Studio customizations were removed, and the main integrations were modernized.",
      },
      linkedRealisation: "migration-odoo-v16-v19",
    },
    {
      title: {
        fr: "Concevoir une couche métier de seize modules",
        en: "Designing a business layer of sixteen modules",
      },
      content: {
        fr: `J'ai développé et maintenu seize modules qui complètent l'ERP pour la comptabilité, les ventes, l'inventaire, la logistique et l'administration des ventes. Le module de relance des impayés illustre la démarche complète : recueil du besoin, matrice de décision, paramètres, modèles Python, vues XML, droits, action planifiée, modèles de courriel, rapport joint, tests en staging, validation métier, déploiement Odoo.sh et formation. D'autres modules enrichissent les produits, les rapports QWeb, les marges de facture ou les documents logistiques. Je sélectionne uniquement les dossiers et composants utiles au besoin au lieu de reproduire mécaniquement une structure complète.`,
        en: `I developed and maintained sixteen modules that extend the ERP for accounting, sales, inventory, logistics, and sales administration. The overdue-reminder module illustrates the complete approach: requirement gathering, decision matrix, settings, Python models, XML views, permissions, scheduled action, email templates, attached report, staging tests, business validation, Odoo.sh deployment, and training. Other modules enrich products, QWeb reports, invoice margins, or logistics documents. I select only the directories and components required by the need instead of mechanically reproducing a full structure.`,
      },
      result: {
        fr: "Ces modules automatisent des tâches quotidiennes, rendent les documents plus complets et mettent des indicateurs de pilotage à disposition pendant l'exercice. Le seul module de relance économise environ une demi-journée de travail chaque semaine.",
        en: "These modules automate daily tasks, make documents more complete, and provide management indicators during the financial year. The reminder module alone saves around half a working day each week.",
      },
      linkedRealisation: "modules-metier-odoo",
    },
    {
      title: {
        fr: "Sécuriser les échanges et diagnostiquer au-delà de l'interface",
        en: "Securing exchanges and diagnosing beyond the interface",
      },
      content: {
        fr: `Le site B2B et le hub d'intégration dépendent des clients, produits, stocks et commandes conservés dans Odoo. J'ai créé des routes API ciblées lorsque les mécanismes standard ne répondaient pas au contrat d'échange et j'ai participé à l'adaptation vers l'API JSON-2 d'Odoo 19. Pour éviter qu'une solution d'interface n'expose des données, je raisonne séparément sur les ACL, les groupes, les record rules et les champs sensibles. Lorsqu'un comportement paraît incohérent, je lis les logs, suis l'héritage des méthodes et consulte le code source plutôt que de multiplier les contournements dans les vues.`,
        en: `The B2B website and integration hub depend on customers, products, stock, and orders stored in Odoo. I created focused API routes when standard mechanisms did not satisfy the exchange contract and helped adapt integrations to Odoo 19's JSON-2 API. To prevent an interface solution from exposing data, I reason separately about ACLs, groups, record rules, and sensitive fields. When behavior appears inconsistent, I read logs, trace method inheritance, and inspect source code rather than accumulating workarounds in views.`,
      },
      result: {
        fr: "Les systèmes externes ont retrouvé leurs échanges principaux après la migration et les modules internes restent maîtrisés dans le dépôt versionné. Cette capacité à descendre jusqu'au framework me permet de corriger la cause d'un défaut et pas seulement son affichage.",
        en: "External systems recovered their main exchanges after the migration, and internal modules remain controlled in the versioned repository. This ability to work down into the framework lets me correct a defect's cause rather than only its display.",
      },
      linkedRealisation: "modules-metier-odoo",
    },
  ],
  selfCritique: {
    level: {
      fr: "Je situe mon niveau à avancé. Je peux concevoir, migrer, sécuriser, déployer et maintenir des modules couvrant plusieurs services, et je sais rechercher un comportement dans le code source. Je ne me considère pas expert : le moteur comptable, les optimisations profondes de l'ORM et certaines interactions internes restent des domaines où je dois encore mesurer davantage avant de modifier.",
      en: "I assess myself as advanced. I can design, migrate, secure, deploy, and maintain modules spanning several departments, and I can investigate behavior in the source code. I do not consider myself an expert: the accounting engine, deep ORM optimization, and some internal interactions remain areas where I need more measurement before making changes.",
    },
    importance: {
      fr: "C'est la compétence technique la plus importante de mon profil actuel. Elle combine Python, PostgreSQL, XML, API, sécurité, déploiement et compréhension des processus d'entreprise. Elle correspond aussi à mon objectif de devenir développeur confirmé et référent technique Odoo.",
      en: "This is the most important technical skill in my current profile. It combines Python, PostgreSQL, XML, APIs, security, deployment, and understanding of business processes. It also matches my objective of becoming a senior developer and Odoo technical reference.",
    },
    acquisitionSpeed: {
      fr: "J'ai appris Odoo à partir de zéro en alternance, en étant rapidement le seul développeur interne chargé des demandes. Les modules, incidents et migrations m'ont fait progresser plus vite qu'un parcours uniquement théorique, mais cette vitesse explique aussi certaines premières implémentations trop dépendantes de valeurs figées.",
      en: "I learned Odoo from scratch during work-study while quickly becoming the only in-house developer responsible for requests. Modules, incidents, and migrations accelerated my progress beyond a purely theoretical path, but that speed also explains some early implementations that relied too heavily on fixed values.",
    },
    advice: {
      fr: "Je conseille de commencer par le processus métier et les fonctions standard avant d'écrire un module. Ensuite, il faut séparer configuration et algorithme, tester avec des comptes et des données représentatifs, puis lire le code source dès que le comportement réel contredit l'hypothèse. Studio est utile pour une modification légère, mais le code versionné devient préférable lorsque la logique est critique ou durable.",
      en: "My advice is to start with the business process and standard features before writing a module. Configuration and algorithm should then be separated, tests run with representative accounts and data, and source code inspected as soon as actual behavior contradicts the hypothesis. Studio is useful for a lightweight change, but version-controlled code is preferable when logic is critical or durable.",
    },
  },
  evolution: {
    goal: {
      fr: "Consolider un niveau avancé jusqu'à pouvoir définir l'architecture d'un ensemble de modules, préparer les migrations en amont et accompagner d'autres développeurs sur les choix de sécurité, performance et maintenabilité.",
      en: "Consolidate an advanced level until I can define the architecture of a module suite, prepare migrations in advance, and guide other developers on security, performance, and maintainability decisions.",
    },
    training: {
      fr: "Je poursuis la lecture du code source et de la documentation officielle, l'étude des scripts de migration et l'automatisation des tests Odoo. Les prochains axes pratiques sont la performance du calcul de marge, les intégrations JSON-2 et la future architecture de Business Intelligence connectée à l'ERP.",
      en: "I continue reading source code and official documentation, studying migration scripts, and automating Odoo tests. My next practical areas are margin-calculation performance, JSON-2 integrations, and the future Business Intelligence architecture connected to the ERP.",
    },
  },
  linkedRealisations: ["migration-odoo-v16-v19", "modules-metier-odoo"],
};
