import type { Competence } from "./types";

export const perseverance: Competence = {
  slug: "perseverance",
  title: { fr: "Persévérance", en: "Perseverance" },
  type: "human",
  level: "advanced",
  radarValue: 90,
  icon: "Mountain",
  definition: {
    fr: `La persévérance en développement logiciel est la capacité à continuer une investigation lorsque le premier correctif ne traite que le symptôme, que la documentation ne couvre pas le cas rencontré ou qu'une solution impose plusieurs cycles d'essai. Elle associe endurance, méthode et mémoire du chemin parcouru : reproduire le défaut, formuler une hypothèse, recueillir des traces, modifier une seule variable utile, vérifier le résultat et conserver ce qui a été appris. Sans cette discipline, la ténacité peut devenir une répétition coûteuse des mêmes tentatives.

Je distingue donc la persévérance de l'obstination. Continuer est pertinent lorsque chaque itération réduit l'incertitude ou rapproche d'un critère observable. Changer d'approche est préférable lorsque l'architecture, le périmètre ou l'hypothèse de départ ne tient plus. Cette compétence est particulièrement importante dans les migrations, les visualisations sur mesure et les règles métier complexes, où une solution apparemment fonctionnelle peut encore cacher une erreur de données, de sécurité ou d'interprétation.`,
    en: `Perseverance in software development is the ability to continue an investigation when the first fix only treats a symptom, documentation does not cover the case, or a solution requires several trial cycles. It combines endurance, method, and memory of the path already taken: reproduce the defect, formulate a hypothesis, collect evidence, change one useful variable, verify the result, and retain what was learned. Without that discipline, tenacity can become an expensive repetition of the same attempts.

I therefore distinguish perseverance from stubbornness. Continuing is worthwhile when each iteration reduces uncertainty or moves closer to an observable criterion. Changing direction is better when the architecture, scope, or initial assumption no longer holds. This skill matters especially in migrations, custom visualizations, and complex business rules, where an apparently working solution may still hide a data, security, or interpretation error.`,
  },
  relatedNews: {
    date: "2026-01-26",
    dateLabel: { fr: "26 janvier 2026", en: "January 26, 2026" },
    title: {
      fr: "React corrige une nouvelle variante après React2Shell",
      en: "React patches another variant after React2Shell",
    },
    summary: {
      fr: "Après le correctif critique de décembre 2025, les recherches ont révélé plusieurs vulnérabilités supplémentaires dans les React Server Components, dont une encore corrigée le 26 janvier 2026. Cet épisode illustre qu'un problème complexe exige des vérifications et des itérations jusqu'à traiter aussi les variantes du défaut initial.",
      en: "After the critical December 2025 patch, further research uncovered several additional React Server Components vulnerabilities, including one patched on January 26, 2026. The episode shows that complex problems require verification and repeated iterations until variants of the original flaw are addressed too.",
    },
    source: "React",
    href: "https://react.dev/blog/2025/12/11/denial-of-service-and-source-code-exposure-in-react-server-components",
  },
  anecdotes: [
    {
      title: {
        fr: "Traverser trois versions majeures d'Odoo sans sauter les diagnostics",
        en: "Crossing three major Odoo versions without skipping diagnostics",
      },
      content: {
        fr: `La migration d'Odoo 16 vers Odoo 19 ne pouvait pas être exécutée en une seule opération. Chaque passage vers les versions 17, 18 puis 19 faisait apparaître de nouvelles erreurs dans les modules internes, les extensions tierces, les vues XML ou les personnalisations Studio. J'ai dû lire les logs d'Odoo.sh, retrouver l'héritage ou le champ devenu invalide dans le code source, adapter la personnalisation, relancer la migration et vérifier que le correctif n'introduisait pas une autre régression. Certaines extensions officiellement mises à jour restaient défectueuses et nécessitaient encore une correction locale ou une migration manuelle.`,
        en: `The migration from Odoo 16 to Odoo 19 could not be performed in a single operation. Each move to versions 17, 18, and then 19 exposed new errors in internal modules, third-party extensions, XML views, or Studio customizations. I had to read Odoo.sh logs, locate the inheritance or field that had become invalid in the source code, adapt the customization, rerun the migration, and verify that the fix did not introduce another regression. Some officially updated extensions still failed and required a local correction or manual migration.`,
      },
      result: {
        fr: "La migration a abouti après plusieurs mois avec les données et les fonctions utiles préservées. La persévérance n'a pas consisté à relancer aveuglément : chaque erreur résolue enrichissait l'inventaire et rendait la migration suivante plus prévisible.",
        en: "The migration was completed after several months with data and useful functions preserved. Perseverance did not mean rerunning blindly: every resolved error enriched the inventory and made the next migration more predictable.",
      },
      linkedRealisation: "migration-odoo-v16-v19",
    },
    {
      title: {
        fr: "Repenser l'architecture d'une visualisation D3.js devenue modifiable",
        en: "Rethinking the architecture of an editable D3.js visualization",
      },
      content: {
        fr: `Dans CAP2vie, la trajectoire devait représenter des périodes exactes ou estimées, cinq dimensions et deux modes de lecture, puis rester cohérente lorsque l'enquêteur corrigeait une réponse depuis le formulaire ou directement depuis le graphique. Ma première intégration reposait sur un algorithme de résolution insuffisamment approfondi. Le pont entre les données du questionnaire et D3.js est devenu la partie la plus retravaillée du projet. Plutôt que d'empiler des exceptions, j'ai revu la transformation des réponses, la construction des intervalles et la manière dont les modifications revenaient vers l'état partagé.`,
        en: `In CAP2vie, the trajectory had to represent exact or estimated periods, five dimensions, and two reading modes, then remain consistent when the interviewer corrected an answer from the form or directly from the chart. My first integration relied on an insufficiently explored resolution algorithm. The bridge between questionnaire data and D3.js became the most reworked part of the project. Instead of accumulating exceptions, I revisited response transformation, interval construction, and the way edits returned to shared state.`,
      },
      result: {
        fr: "Le prototype a livré une visualisation reliée au questionnaire, corrigeable depuis deux points d'entrée et utilisable en démonstration. Cette expérience m'a appris que persévérer peut exiger de reconstruire une partie de l'architecture plutôt que de protéger le premier code écrit.",
        en: "The prototype delivered a visualization connected to the questionnaire, editable from two entry points, and usable in demonstrations. This experience taught me that perseverance may require rebuilding part of the architecture instead of protecting the first code written.",
      },
      linkedRealisation: "app-trajectoires-de-vie",
    },
    {
      title: {
        fr: "Fiabiliser des calculs métier que le framework ne fournissait pas",
        en: "Making business calculations reliable when the framework did not provide them",
      },
      content: {
        fr: `Le calcul de marge sur les factures comptables n'existait pas sous la forme attendue par l'entreprise. Il fallait rapprocher les écritures, les lignes de facture et les règles comptables tout en respectant le moteur interne d'Odoo. Les premières versions ont nécessité de nombreux échanges avec la comptabilité et des lectures du code source pour comprendre quels événements recalculaient les valeurs. Après la migration, un défaut autour des marges de factures a encore montré qu'un résultat correct dans un scénario ne suffisait pas à couvrir toutes les données réelles.`,
        en: `Invoice margin calculation did not exist in the form the company needed. Accounting entries, invoice lines, and business rules had to be reconciled while respecting Odoo's internal engine. Early versions required many discussions with accounting and source-code investigation to understand which events recalculated values. After the migration, a defect around invoice margins again showed that a correct result in one scenario did not cover every real data condition.`,
      },
      result: {
        fr: "La direction dispose d'indicateurs de marge pendant l'exercice au lieu d'attendre uniquement les analyses de clôture. Je conserve néanmoins ce calcul comme un chantier perfectible : la valeur livrée est réelle, mais sa complexité impose encore des mesures de performance et des cas de test supplémentaires.",
        en: "Management can access margin indicators during the financial year instead of relying only on closing analysis. I still treat this calculation as an area for improvement: its delivered value is real, but its complexity requires further performance measurement and test cases.",
      },
      linkedRealisation: "modules-metier-odoo",
    },
  ],
  selfCritique: {
    level: {
      fr: "J'estime avoir un niveau avancé parce que je reste mobilisé sur des problèmes longs, incertains et techniquement ingrats jusqu'à obtenir un résultat exploitable. Je sais reprendre une hypothèse, lire le code d'un framework et accepter de réécrire. Mon axe de progrès est d'instrumenter plus tôt cette persévérance avec des scénarios de test, des mesures et un journal de décisions afin de réduire le nombre d'itérations tardives.",
      en: "I assess myself as advanced because I stay engaged with long, uncertain, and technically unrewarding problems until I obtain a usable outcome. I can revisit an assumption, read framework source code, and accept rewriting work. My improvement area is to support that perseverance earlier with test scenarios, measurements, and a decision log so fewer iterations happen late.",
    },
    importance: {
      fr: "Elle est essentielle à ma spécialisation Odoo, où une erreur peut provenir du code interne, d'un module tiers, d'une personnalisation en base ou d'une donnée métier. Elle compte aussi dans le front-end et la visualisation, car un rendu plausible ne prouve pas que l'information représentée est juste.",
      en: "It is essential to my Odoo specialization, where an error may originate in internal code, a third-party module, a database customization, or business data. It also matters in frontend and visualization work because a plausible display does not prove that the represented information is correct.",
    },
    advice: {
      fr: "Je conseille de définir ce que la prochaine tentative doit apprendre avant de la lancer. Si elle ne produit aucune information nouvelle, il faut changer de méthode : réduire le cas, ajouter des traces, demander une expertise métier ou revoir l'architecture. La persévérance devient professionnelle lorsqu'elle diminue l'incertitude au lieu de seulement consommer du temps.",
      en: "My advice is to define what the next attempt should teach before starting it. If it produces no new information, the method must change: reduce the case, add traces, request business expertise, or revisit the architecture. Perseverance becomes professional when it reduces uncertainty rather than merely consuming time.",
    },
  },
  evolution: {
    goal: {
      fr: "Conserver cette endurance tout en réduisant le temps nécessaire pour reconnaître une mauvaise piste. Je veux progresser dans la formulation d'hypothèses, l'automatisation des reproductions et l'usage de métriques qui permettent d'arrêter plus vite une approche non rentable.",
      en: "Retain this endurance while reducing the time needed to recognize a poor direction. I want to improve hypothesis formulation, automated reproductions, and the use of metrics that make it possible to stop an unproductive approach sooner.",
    },
    training: {
      fr: "Je poursuis la lecture du code source d'Odoo, l'écriture de tests de migration et l'étude des méthodes de diagnostic. Les prochains travaux sur le calcul de marge et les intégrations ERP serviront de terrain pour appliquer cette démarche plus systématique.",
      en: "I continue reading Odoo source code, writing migration tests, and studying diagnostic methods. Upcoming work on margin calculation and ERP integrations will provide a setting for applying this more systematic approach.",
    },
  },
  linkedRealisations: [
    "migration-odoo-v16-v19",
    "modules-metier-odoo",
    "app-trajectoires-de-vie",
  ],
};
