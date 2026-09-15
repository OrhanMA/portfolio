import type { Competence } from "./types";

export const autonomie: Competence = {
  slug: "autonomie",
  title: { fr: "Autonomie", en: "Autonomy" },
  type: "human",
  level: "advanced",
  radarValue: 90,
  icon: "Compass",
  definition: {
    fr: `L'autonomie en ingénierie logicielle ne consiste pas à travailler sans interlocuteur. Elle désigne la capacité à prendre en charge un problème de bout en bout : comprendre le besoin réel, identifier ce qui manque, proposer une stratégie, mesurer les risques, produire une solution vérifiable et rendre compte des décisions prises. Elle suppose aussi de distinguer ce que le développeur peut décider seul de ce qui relève du métier, de la hiérarchie ou d'un fournisseur externe. Une personne autonome avance sans attendre des instructions détaillées, mais elle ne transforme pas l'absence d'encadrement en absence de contrôle.

Cette compétence devient particulièrement visible lorsqu'un système est critique ou mal documenté. Il faut alors chercher dans le code, les journaux, la documentation et les retours des utilisateurs, puis confronter ces sources au lieu de s'arrêter à la première explication plausible. Les assistants de développement peuvent accélérer cette exploration, mais ils ne déplacent pas la responsabilité : je reste chargé de vérifier leurs hypothèses, de protéger les données, d'exécuter les tests et de décider si un changement peut réellement atteindre la production.`,
    en: `Autonomy in software engineering does not mean working without stakeholders. It is the ability to take ownership of a problem from end to end: understand the actual need, identify missing information, propose a strategy, assess risks, produce a verifiable solution, and report the decisions made. It also requires distinguishing between what a developer can decide independently and what belongs to business users, management, or an external provider. An autonomous person moves forward without waiting for detailed instructions, but does not turn a lack of supervision into a lack of control.

This skill becomes especially visible when a system is critical or poorly documented. The developer must search through code, logs, documentation, and user feedback, then compare those sources instead of accepting the first plausible explanation. Development assistants can speed up this exploration, but they do not transfer accountability: I remain responsible for checking their assumptions, protecting data, running tests, and deciding whether a change is genuinely ready for production.`,
  },
  relatedNews: {
    date: "2026-02-02",
    dateLabel: { fr: "2 février 2026", en: "February 2, 2026" },
    title: {
      fr: "Codex devient un poste de commande multi-agents",
      en: "Codex becomes a multi-agent command center",
    },
    summary: {
      fr: "OpenAI a lancé l'app Codex pour piloter plusieurs agents sur des tâches longues et parallèles. Cette délégation renforce la valeur de l'autonomie : le développeur doit cadrer le travail, contrôler les changements et rester responsable du résultat.",
      en: "OpenAI launched the Codex app to supervise multiple agents working on long-running, parallel tasks. This delegation makes autonomy even more valuable: developers must frame the work, review changes, and remain accountable for the outcome.",
    },
    source: "OpenAI",
    href: "https://openai.com/index/introducing-the-codex-app/",
  },
  anecdotes: [
    {
      title: {
        fr: "Assumer seul le volet technique d'une migration ERP critique",
        en: "Owning the technical side of a critical ERP migration",
      },
      content: {
        fr: `Chez 1UP Distribution, j'ai alerté la direction sur la fin du support d'Odoo 16, puis préparé le passage successif vers les versions 17, 18 et 19. Le périmètre comprenait 16 modules internes, des modules tiers, de nombreuses personnalisations Studio, une base PostgreSQL et des intégrations avec le site B2B, les marketplaces et la logistique. Le prestataire qui devait m'assister n'étant finalement pas intervenu, j'ai dû construire l'inventaire, analyser les erreurs dans Odoo.sh, adapter le code, organiser les recettes, préparer le retour arrière et piloter la bascule. Je sollicitais les utilisateurs pour valider leurs processus et le support lorsque la décision ne dépendait pas de moi, mais la cohérence technique d'ensemble restait sous ma responsabilité.`,
        en: `At 1UP Distribution, I alerted management that Odoo 16 support was ending, then prepared the successive upgrades to versions 17, 18, and 19. The scope included 16 internal modules, third-party modules, Studio customizations, a PostgreSQL database, and integrations with the B2B website, marketplaces, and logistics. When the contractor who was meant to assist me ultimately did not participate, I had to build the inventory, analyze Odoo.sh errors, adapt the code, organize acceptance testing, prepare rollback, and lead the cutover. I involved users to validate their processes and contacted support when a decision was outside my control, but overall technical consistency remained my responsibility.`,
      },
      result: {
        fr: "La production a été migrée le 6 février 2026 sans perte définitive de données signalée. La durée d'interruption n'a pas été mesurée de façon publiable ; cette réalisation montre surtout le maintien de validations métier et d'un scénario de secours.",
        en: "Production was migrated on February 6, 2026, with no reported permanent data loss. Downtime was not measured in a publishable way; this achievement chiefly shows the use of business validation points and a contingency plan.",
      },
      linkedRealisation: "migration-odoo-v16-v19",
    },
    {
      title: {
        fr: "Transformer un problème comptable en module maintenable",
        en: "Turning an accounting problem into a maintainable module",
      },
      content: {
        fr: `Pour automatiser la relance des factures impayées, je ne disposais pas d'une spécification technique prête à être mise en œuvre. J'ai reconstitué le processus avec la comptabilité, formalisé les règles et les cas limites dans Jira, séparé les paramètres modifiables de l'algorithme, développé une première version, puis fait évoluer le module à partir des essais sur le staging. J'ai pris en charge le code Python, les vues XML, les droits, l'action planifiée, les tests, le déploiement et la formation. Lorsque les choix engageaient la relation client ou les autorisations, je présentais les options à ma responsable plutôt que de décider à sa place.`,
        en: `When automating overdue-invoice reminders, I did not receive a ready-made technical specification. I reconstructed the process with accounting, formalized rules and edge cases in Jira, separated editable settings from the algorithm, developed an initial version, and evolved the module through staging feedback. I owned the Python code, XML views, permissions, scheduled action, testing, deployment, and training. When decisions affected customer relationships or authorization levels, I presented options to my manager rather than making the business decision myself.`,
      },
      result: {
        fr: "Le contrôle des factures est désormais quotidien et automatisé, tandis que la comptabilité maîtrise directement les principaux réglages. Le gain de temps n'est pas encore mesuré ; l'automatisation ne retire pas aux utilisateurs la responsabilité des règles métier.",
        en: "Invoices are now checked automatically every day, while accounting directly controls the main settings. The time savings have not yet been measured; automation does not remove business users' responsibility for the underlying rules.",
      },
      linkedRealisation: "modules-metier-odoo",
    },
    {
      title: {
        fr: "Faire avancer un produit alors que le design et les contenus évoluent",
        en: "Moving a product forward while design and content evolve",
      },
      content: {
        fr: `Sur la refonte du site corporate, j'étais responsable du socle Next.js, du responsive, des animations, des performances, du formulaire et du déploiement, tandis que les graphistes, le marketing et la direction produisaient ou validaient les ressources. Pour ne pas bloquer le projet en attendant chaque décision, j'ai construit les composants réutilisables, l'internationalisation, les fondations SEO et une première chaîne de contact avec des contenus de démonstration clairement identifiés. Je présentais des prototypes lorsqu'ils permettaient un arbitrage réel et je protégeais la future V1 contre l'ajout continu de fonctions non essentielles.`,
        en: `On the corporate website redesign, I owned the Next.js foundation, responsive behavior, animation, performance, contact form, and deployment, while designers, marketing, and management produced or approved the assets. To avoid blocking the project while waiting for every decision, I built reusable components, internationalization, SEO foundations, and an initial contact flow using clearly identified placeholder content. I presented prototypes when they enabled a real decision and protected the future first release from a continuous stream of nonessential features.`,
      },
      result: {
        fr: "La page d'accueil, la page de contact, les composants partagés et la chaîne technique sont déjà présentables alors que le projet est encore en cours. L'autonomie a servi à réduire l'incertitude, pas à contourner les validations éditoriales et visuelles encore nécessaires.",
        en: "The homepage, contact page, shared components, and technical delivery chain are already presentable while the project is still underway. Autonomy reduced uncertainty without bypassing the editorial and visual approvals that are still required.",
      },
      linkedRealisation: "refonte-site-corporate",
    },
  ],
  selfCritique: {
    level: {
      fr: `J'estime avoir un niveau avancé. Je peux conduire seul un sujet technique important, entrer dans une base de code inconnue et prendre en charge la production. La migration Odoo montre toutefois ma limite actuelle : j'ai commencé le pilotage personnel trop tard et j'ai sous-estimé le volume des personnalisations Studio. Mon autonomie d'exécution est plus forte que mon anticipation méthodique des grands projets.`,
      en: `I assess myself as advanced. I can independently lead an important technical subject, enter an unfamiliar codebase, and take responsibility for production. The Odoo migration also shows my current limit: I started personal project tracking too late and underestimated the volume of Studio customizations. My execution autonomy is stronger than my methodical anticipation of large projects.`,
    },
    importance: {
      fr: "Cette compétence structure mon profil parce que je suis souvent le seul développeur interne disponible sur Odoo et que je porte aussi des sujets Next.js et Symfony. Elle me permet de transformer une demande incomplète en plan de travail, mais elle n'a de valeur que si les risques, les dépendances et les décisions restant à valider sont rendus visibles.",
      en: "This skill is central to my profile because I am often the only available in-house Odoo developer and also take responsibility for Next.js and Symfony projects. It lets me turn an incomplete request into a work plan, but it is valuable only when risks, dependencies, and decisions still requiring validation remain visible.",
    },
    advice: {
      fr: "Je conseille de définir dès le départ les critères de réussite, les personnes qui valident chaque partie et les conditions d'arrêt ou de retour arrière. Avancer seul devient dangereux lorsque les décisions restent implicites. L'autonomie la plus utile combine initiative, traçabilité, communication et capacité à demander un arbitrage avant que le risque ne se transforme en incident.",
      en: "My advice is to define success criteria, validators for each area, and stop or rollback conditions from the outset. Working independently becomes dangerous when decisions remain implicit. The most useful autonomy combines initiative, traceability, communication, and the ability to seek a decision before a risk becomes an incident.",
    },
  },
  evolution: {
    goal: {
      fr: "Consolider ce niveau avancé en ajoutant à mon autonomie technique une pratique plus systématique du pilotage : registre des risques, jalons observables, décisions consignées, critères d'acceptation et revues d'architecture proportionnées à l'impact.",
      en: "Consolidate this advanced level by adding more systematic project leadership to my technical autonomy: risk registers, observable milestones, recorded decisions, acceptance criteria, and architecture reviews proportionate to impact.",
    },
    training: {
      fr: "Je poursuis l'étude des architectures logicielles, de la gestion des migrations et des méthodes de décision technique. Mes prochains projets doivent surtout me faire pratiquer ces outils plus tôt, avant que la complexité soit déjà installée.",
      en: "I continue studying software architecture, migration management, and technical decision-making methods. My next projects must above all give me opportunities to apply these tools earlier, before complexity is already established.",
    },
  },
  linkedRealisations: [
    "migration-odoo-v16-v19",
    "modules-metier-odoo",
    "refonte-site-corporate",
    "app-trajectoires-de-vie",
  ],
};
