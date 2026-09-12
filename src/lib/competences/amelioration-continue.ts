import type { Competence } from "./types";

export const ameliorationContinue: Competence = {
  slug: "amelioration-continue",
  title: { fr: "Amélioration continue", en: "Continuous improvement" },
  type: "human",
  level: "intermediate",
  radarValue: 80,
  icon: "TrendingUp",
  definition: {
    fr: `L'amélioration continue consiste à utiliser les défauts, les mesures et les retours d'usage pour faire progresser à la fois le produit et la manière de le construire. Elle ne se limite pas au refactoring du code. Elle peut concerner la formulation du besoin, les critères d'acceptation, la couverture de test, la configuration, la documentation, le déploiement ou la façon d'associer les utilisateurs. Une amélioration est utile lorsqu'elle réduit un risque, un effort récurrent ou une incertitude observable.

Je cherche à éviter deux excès : réécrire sans bénéfice mesuré et conserver une dette uniquement parce qu'elle fonctionne encore. La bonne décision dépend de l'impact, de la fréquence du problème et du coût de maintenance. Mes réalisations montrent une pratique déjà régulière de l'itération, mais aussi un axe clair : définir les mesures et les scénarios plus tôt, avant que les retours de production deviennent la principale source de connaissance.`,
    en: `Continuous improvement means using defects, measurements, and usage feedback to advance both the product and the way it is built. It is not limited to code refactoring. It can involve requirement formulation, acceptance criteria, test coverage, configuration, documentation, deployment, or the way users are involved. An improvement is useful when it reduces a risk, recurring effort, or observable uncertainty.

I try to avoid two extremes: rewriting without measured benefit and retaining debt merely because it still works. The right decision depends on impact, problem frequency, and maintenance cost. My achievements show a regular practice of iteration, but also a clear improvement area: defining measurements and scenarios earlier, before production feedback becomes the main source of knowledge.`,
  },
  relatedNews: {
    date: "2025-09-23",
    dateLabel: { fr: "23 septembre 2025", en: "September 23, 2025" },
    title: {
      fr: "Le rapport DORA 2025 relie IA et boucles de retour rapides",
      en: "The 2025 DORA report links AI with fast feedback loops",
    },
    summary: {
      fr: "L'étude DORA menée auprès de près de 5 000 professionnels observe que l'IA améliore le débit de livraison mais reste associée à une moindre stabilité sans tests solides, versionnement mature et retours rapides. L'amélioration continue porte donc autant sur le système de travail que sur le code produit.",
      en: "DORA's study of nearly 5,000 professionals found that AI improves delivery throughput but remains associated with lower stability without strong tests, mature version control, and fast feedback. Continuous improvement therefore applies to the working system as much as to the code being shipped.",
    },
    source: "Google Cloud / DORA",
    href: "https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report",
  },
  anecdotes: [
    {
      title: {
        fr: "Passer de valeurs figées à une configuration métier",
        en: "Moving from fixed values to business-controlled settings",
      },
      content: {
        fr: `Les premiers modules Odoo répondaient au besoin immédiat, mais certaines règles restaient inscrites directement dans le code : délais de relance, destinataires, exclusions ou paramètres de documents. Cette approche imposait une modification technique et un déploiement pour chaque évolution. Les retours de la comptabilité et un incident lié à ma compréhension encore partielle des données ont montré que le mécanisme devait être plus explicite et plus testable. J'ai progressivement déplacé les valeurs variables vers les réglages d'Odoo, documenté leur usage et généralisé ce principe aux nouveaux modules.`,
        en: `The first Odoo modules addressed immediate needs, but some rules remained hardcoded: reminder intervals, recipients, exclusions, or document settings. This approach required a technical change and deployment for every adjustment. Accounting feedback and an incident linked to my still-partial understanding of the data showed that the mechanism needed to be more explicit and testable. I gradually moved variable values into Odoo settings, documented their use, and generalized this principle to new modules.`,
      },
      result: {
        fr: "La comptabilité peut maintenant adapter les principales règles sans attendre un développement. La solution réduit le coût des changements courants et concentre mes interventions sur les évolutions qui modifient réellement l'algorithme ou la sécurité.",
        en: "Accounting can now adapt the main rules without waiting for development. The solution reduces the cost of routine changes and focuses my involvement on changes that genuinely affect the algorithm or security.",
      },
      linkedRealisation: "modules-metier-odoo",
    },
    {
      title: {
        fr: "Transformer la stabilisation de la migration en méthode réutilisable",
        en: "Turning migration stabilization into a reusable method",
      },
      content: {
        fr: `Après la bascule vers Odoo 19, les retours utilisateurs ont alimenté un backlog mêlant anomalies nouvelles et tickets plus anciens. Les problèmes autour des numéros mobiles, des marges de factures et de certaines automatisations ont montré les limites d'une recette principalement manuelle. J'ai corrigé les incidents, surveillé les erreurs et maintenu les sauvegardes, mais j'ai aussi formalisé ce que je changerais lors de la prochaine migration : catalogue des processus par service, scénarios d'acceptation réutilisables, validations intermédiaires plus fréquentes et inventaire plus précoce de Studio.`,
        en: `After the Odoo 19 cutover, user feedback fed a backlog combining new anomalies and older tickets. Problems involving mobile numbers, invoice margins, and certain automations exposed the limits of mainly manual acceptance testing. I fixed incidents, monitored errors, and maintained backups, but also formalized what I would change in the next migration: a process catalog by department, reusable acceptance scenarios, more frequent intermediate validation, and an earlier Studio inventory.`,
      },
      result: {
        fr: "La migration n'a pas seulement produit une nouvelle version de l'ERP. Elle a réduit les personnalisations inutiles, clarifié les points de surveillance et fourni une méthode plus structurée pour la maintenance continue et le prochain changement majeur.",
        en: "The migration produced more than a new ERP version. It reduced unnecessary customizations, clarified monitoring points, and supplied a more structured method for continuous maintenance and the next major upgrade.",
      },
      linkedRealisation: "migration-odoo-v16-v19",
    },
    {
      title: {
        fr: "Faire évoluer le portfolio à partir de preuves plutôt que d'impressions",
        en: "Evolving the portfolio from evidence rather than impressions",
      },
      content: {
        fr: `Le portfolio a progressé par petites modifications vérifiables : ajout du bilinguisme, structuration des compétences et réalisations, liens réciproques protégés par des tests, contrôles Lighthouse, amélioration de l'accessibilité, tests unitaires, de navigateur et de bout en bout. Les retours du learning coach ont déclenché l'approfondissement des articles et une nouvelle hiérarchie de la page d'accueil. Mon propre regard critique a ensuite conduit à réduire les effets décoratifs, à retravailler les pages longues et à découper les fichiers de contenu devenus monolithiques.`,
        en: `The portfolio evolved through small, verifiable changes: bilingual support, structured skills and achievements, reciprocal links protected by tests, Lighthouse checks, accessibility improvements, and unit, browser, and end-to-end testing. Learning-coach feedback triggered deeper articles and a revised homepage hierarchy. My own critical review then led to reducing decorative effects, improving long-form pages, and splitting content files that had become monolithic.`,
      },
      result: {
        fr: "Le site publié dispose aujourd'hui d'un socle complet et de plus de 170 tests automatisés. Les scores de performance restent présentés comme des mesures datées, et la liste de contrôle du portfolio sert de contrôle explicite plutôt que de simple mémoire du travail réalisé.",
        en: "The published site now has a complete foundation and more than 170 automated tests. Performance scores remain presented as dated measurements, and the portfolio checklist acts as an explicit control rather than a simple memory of completed work.",
      },
      linkedRealisation: "portfolio-professionnel",
    },
  ],
  selfCritique: {
    level: {
      fr: "J'estime avoir un niveau intermédiaire. J'identifie les défauts, j'accepte de reprendre mon propre travail et je transforme plusieurs retours en améliorations durables. En revanche, certaines boucles commencent encore trop tard : les tests d'intégration, les critères de mesure ou la validation de contenu auraient dû être définis avant l'accumulation des fonctionnalités.",
      en: "I assess myself as intermediate. I identify defects, accept revisiting my own work, and turn several kinds of feedback into lasting improvements. However, some loops still begin too late: integration tests, measurement criteria, and content validation should have been defined before features accumulated.",
    },
    importance: {
      fr: "Cette compétence est importante parce que je maintiens des produits vivants : un ERP critique, des modules utilisés quotidiennement et des sites qui continueront d'évoluer après leur première livraison. Elle m'évite de considérer la mise en production comme la fin du travail et relie directement maintenance, qualité et apprentissage.",
      en: "This skill matters because I maintain living products: a critical ERP, modules used every day, and websites that will continue evolving after their first release. It prevents me from treating production deployment as the end of the work and directly connects maintenance, quality, and learning.",
    },
    advice: {
      fr: "Je conseille de choisir peu d'indicateurs, mais de les relier à une décision. Un score, un retour utilisateur ou un incident n'a de valeur que s'il modifie une priorité, un test ou une règle de conception. Il faut également documenter les améliorations refusées : ne pas refactoriser immédiatement peut être une décision saine lorsque la dette reste comprise, localisée et rentable.",
      en: "My advice is to choose few indicators but connect each one to a decision. A score, user comment, or incident has value only if it changes a priority, test, or design rule. Rejected improvements should also be documented: not refactoring immediately can be a sound decision when the debt remains understood, localized, and economically acceptable.",
    },
  },
  evolution: {
    goal: {
      fr: "Atteindre un niveau avancé en installant les boucles de retour dès le cadrage : critères d'acceptation, mesures avant/après, tests des parcours critiques et revues régulières de la dette technique.",
      en: "Reach an advanced level by establishing feedback loops during framing: acceptance criteria, before-and-after measurements, tests for critical journeys, and regular technical-debt reviews.",
    },
    training: {
      fr: "Je poursuis l'étude du refactoring, des tests d'intégration et des pratiques DORA. Les migrations Odoo, le calcul de marge et la maintenance du portfolio serviront à mesurer plus systématiquement l'effet réel des changements livrés.",
      en: "I continue studying refactoring, integration testing, and DORA practices. Odoo migrations, margin calculation, and portfolio maintenance will be used to measure the real effect of delivered changes more systematically.",
    },
  },
  linkedRealisations: [
    "migration-odoo-v16-v19",
    "modules-metier-odoo",
    "portfolio-professionnel",
  ],
};
