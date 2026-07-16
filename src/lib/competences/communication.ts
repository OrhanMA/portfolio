import type { Competence } from "./types";

export const communication: Competence = {
  slug: "communication",
  title: { fr: "Communication", en: "Communication" },
  type: "human",
  level: "intermediate",
  radarValue: 50,
  icon: "MessageSquare",
  definition: {
    fr: `La communication d'un développeur consiste à rendre un problème, une décision et un résultat compréhensibles par des personnes qui n'ont ni les mêmes connaissances ni les mêmes responsabilités. Elle commence par l'écoute : reconstituer le processus réel, faire préciser les exceptions et distinguer le besoin de la solution imaginée. Elle se poursuit par la reformulation, la démonstration, la documentation et l'explication des compromis. Un message techniquement exact reste insuffisant s'il n'aide pas son destinataire à décider ou à agir.

Cette compétence protège directement la qualité du logiciel. Un besoin ambigu produit un comportement difficile à valider ; une contrainte cachée réapparaît tard ; une livraison mal expliquée reste inutilisée. Dans mes projets, je communique avec la comptabilité, la logistique, les commerciaux, des graphistes, des chercheurs, des responsables et d'autres développeurs. Mon rôle est de choisir le bon niveau de détail, de rendre visibles les limites et de ne jamais présenter une hypothèse ou un prototype comme un résultat définitivement validé.`,
    en: `A developer's communication skill is the ability to make a problem, decision, and result understandable to people who do not share the same knowledge or responsibilities. It begins with listening: reconstructing the actual process, clarifying exceptions, and separating the need from the imagined solution. It continues through reformulation, demonstration, documentation, and explanation of trade-offs. A technically accurate message is still insufficient if it does not help its recipient decide or act.

This skill directly protects software quality. An ambiguous need produces behavior that is difficult to validate; a hidden constraint reappears late; a poorly explained delivery remains unused. In my projects, I communicate with accounting, logistics, sales, designers, researchers, managers, and other developers. My role is to choose the right level of detail, make limitations visible, and never present an assumption or prototype as a fully validated outcome.`,
  },
  relatedNews: {
    date: "2025-09-25",
    dateLabel: { fr: "25 septembre 2025", en: "September 25, 2025" },
    title: {
      fr: "L'agent de code GitHub généralise le travail par issue et pull request",
      en: "GitHub's coding agent brings issue-and-PR collaboration to general availability",
    },
    summary: {
      fr: "GitHub a rendu son coding agent disponible à tous ses abonnés payants : une tâche se délègue par issue, puis l'agent ouvre une pull request et sollicite une revue. Le résultat dépend directement de la qualité du besoin écrit, des commentaires et de la validation humaine.",
      en: "GitHub made its coding agent generally available to paid subscribers: a task can be delegated through an issue, after which the agent opens a pull request and requests review. The result directly depends on the quality of the written requirement, comments, and human validation.",
    },
    source: "GitHub",
    href: "https://github.blog/changelog/2025-09-25-copilot-coding-agent-is-now-generally-available/",
  },
  anecdotes: [
    {
      title: {
        fr: "Traduire les règles de la comptabilité en décisions testables",
        en: "Translating accounting rules into testable decisions",
      },
      content: {
        fr: `Pour le module de relance des impayés, les utilisateurs décrivaient un processus connu par l'expérience : échéances, affacturage, comptes bancaires particuliers, clients à exclure, destinataires additionnels et seuil de blocage. J'ai organisé des échanges avec l'assistante de direction et la comptabilité, reformulé les explications dans un ticket Jira et transformé chaque exception en paramètre ou scénario d'acceptation. Les démonstrations et le staging permettaient ensuite de discuter du comportement à partir d'un exemple visible plutôt que d'une interprétation abstraite du besoin.`,
        en: `For the overdue-invoice reminder module, users described a process known through experience: due dates, factoring, specific bank accounts, customers to exclude, additional recipients, and blocking thresholds. I organized discussions with the executive assistant and accounting, reformulated explanations in a Jira ticket, and turned each exception into a setting or acceptance scenario. Demonstrations and staging then made it possible to discuss behavior from a visible example instead of an abstract interpretation of the requirement.`,
      },
      result: {
        fr: "La comptabilité a pu valider la justesse des décisions avant la production, puis recevoir une formation sur les réglages. La communication a réduit le risque d'automatiser une règle techniquement cohérente mais fausse dans la pratique.",
        en: "Accounting was able to validate decision correctness before production and then receive training on the settings. Communication reduced the risk of automating a rule that was technically coherent but wrong in practice.",
      },
      linkedRealisation: "modules-metier-odoo",
    },
    {
      title: {
        fr: "Construire un langage commun entre recherche et développement",
        en: "Building a shared language between research and development",
      },
      content: {
        fr: `CAP2vie devait matérialiser une méthode de recherche sociologique sans la déformer. Les chercheurs parlaient de trajectoires, de dimensions, d'événements et de périodes exactes ou estimées ; l'équipe devait traduire ces notions en entités, questions, états et règles de visualisation. Nous produisions des spécifications, tickets et schémas, puis présentions l'avancement chaque semaine. Lorsque la représentation pouvait influencer l'interprétation scientifique, la décision revenait aux chercheurs. Entre développeurs, les revues de code et le bureau partagé facilitaient la résolution des désaccords techniques.`,
        en: `CAP2vie had to embody a sociological research method without distorting it. Researchers spoke about trajectories, dimensions, events, and exact or estimated periods; the team had to translate these concepts into entities, questions, states, and visualization rules. We produced specifications, tickets, and diagrams, then presented progress every week. When a representation could influence scientific interpretation, the decision belonged to the researchers. Between developers, code reviews and a shared office helped resolve technical disagreements.`,
      },
      result: {
        fr: "Le prototype a couvert le questionnaire, la visualisation et une démonstration multi-écrans, puis a pu être installé par le développeur suivant. La communication est la principale compétence humaine que j'attribue à cette expérience, parce qu'elle a relié trois développeurs et plusieurs spécialistes autour d'un objet qui n'existait pas encore.",
        en: "The prototype covered the questionnaire, visualization, and a multi-screen demonstration, then was successfully installed by the next developer. Communication is the main human skill I attribute to this experience because it connected three developers and several specialists around an artifact that did not yet exist.",
      },
      linkedRealisation: "app-trajectoires-de-vie",
    },
    {
      title: {
        fr: "Coordonner technique, design, marketing et direction",
        en: "Coordinating engineering, design, marketing, and management",
      },
      content: {
        fr: `Sur le site corporate, les responsabilités étaient complémentaires : deux graphistes produisaient les ressources visuelles, le directeur marketing portait les textes et les droits liés aux marques, le directeur général fixait le cap, et je portais l'intégration technique. Les sujets de responsive, d'animation et de performance imposaient des compromis visibles. Je présentais les conséquences d'un choix, produisais des prototypes lorsque plusieurs pistes restaient ouvertes et demandais une validation proportionnée à la portée de la décision. J'ai toutefois identifié que mes demandes de contenus et certains briefs adressés aux graphistes auraient dû être plus précoces et plus précis.`,
        en: `On the corporate website, responsibilities were complementary: two designers produced visual assets, the marketing director owned copy and brand permissions, the managing director set direction, and I owned technical implementation. Responsive behavior, animation, and performance required visible trade-offs. I presented the consequences of a choice, produced prototypes when several directions remained open, and requested approval proportionate to the decision's reach. I also identified that my content requests and some briefs to designers should have been earlier and more precise.`,
      },
      result: {
        fr: "Les retours graphiques ont amélioré les prototypes et permis de conserver des composants techniquement solides sans imposer mes préférences visuelles. Le projet reste incomplet, mais ses décisions ouvertes, ses responsabilités et son prochain jalon sont explicitement identifiés.",
        en: "Design feedback improved the prototypes and made it possible to retain technically sound components without imposing my visual preferences. The project remains incomplete, but its open decisions, responsibilities, and next milestone are explicitly identified.",
      },
      linkedRealisation: "refonte-site-corporate",
    },
  ],
  selfCritique: {
    level: {
      fr: "Je situe mon niveau à intermédiaire. Je sais recueillir un besoin, reformuler, documenter, présenter une solution et adapter mon vocabulaire à des interlocuteurs différents. Les réalisations montrent néanmoins deux limites : je sollicite parfois les contenus trop tard et je n'ai pas encore fait valider régulièrement le portfolio par une personne complètement novice du sujet.",
      en: "I assess myself as intermediate. I can gather a requirement, reformulate it, document it, present a solution, and adapt my vocabulary to different stakeholders. The achievements also reveal two limitations: I sometimes request content too late, and I have not yet had the portfolio regularly validated by someone entirely unfamiliar with the subject.",
    },
    importance: {
      fr: "Elle est centrale parce que mon travail se situe à l'interface entre processus métier et logiciels. Une grande partie de ma valeur vient de la traduction : rendre une contrainte Odoo compréhensible, rendre une règle comptable implémentable ou rendre une limite technique arbitrable par la direction.",
      en: "It is central because my work sits at the interface between business processes and software. Much of my value comes from translation: making an Odoo constraint understandable, an accounting rule implementable, or a technical limitation decidable by management.",
    },
    acquisitionSpeed: {
      fr: "Cette compétence a progressé rapidement pendant le stage CAP2vie, où les rendez-vous hebdomadaires, les revues de code et la passation rendaient immédiatement visibles les incompréhensions. L'alternance l'a ensuite approfondie par des échanges quotidiens avec plusieurs services et niveaux hiérarchiques.",
      en: "This skill progressed quickly during the CAP2vie internship, where weekly meetings, code reviews, and handover made misunderstandings immediately visible. The work-study period then deepened it through daily discussions with several departments and management levels.",
    },
    advice: {
      fr: "Je conseille de terminer chaque échange important par une reformulation observable : scénario, maquette, exemple de donnée, critère d'acceptation ou décision écrite. Cela évite qu'un accord apparent cache deux compréhensions différentes. Il faut également annoncer ce qui n'est pas encore prouvé ; la transparence sur une limite renforce davantage la confiance qu'une assurance artificielle.",
      en: "My advice is to end every important discussion with an observable reformulation: a scenario, mockup, data example, acceptance criterion, or written decision. This prevents apparent agreement from hiding two different understandings. What is not yet proven should also be stated; transparency about a limitation builds more trust than artificial confidence.",
    },
  },
  evolution: {
    goal: {
      fr: "Atteindre un niveau avancé en préparant plus tôt les communications qui structurent un projet : cartographie des acteurs, briefs, comptes rendus de décision, démonstrations ciblées et validation par des publics moins techniques.",
      en: "Reach an advanced level by preparing the communications that structure a project earlier: stakeholder maps, briefs, decision records, focused demonstrations, and validation by less technical audiences.",
    },
    training: {
      fr: "Je veux pratiquer davantage la facilitation de réunions, la rédaction de documentation d'architecture et la présentation orale de compromis techniques. Le jury du portfolio et les prochaines formations utilisateurs constitueront des situations concrètes pour mesurer mes progrès.",
      en: "I want more practice facilitating meetings, writing architecture documentation, and presenting technical trade-offs orally. The portfolio jury and upcoming user training will provide concrete situations for measuring progress.",
    },
  },
  linkedRealisations: [
    "modules-metier-odoo",
    "refonte-site-corporate",
    "app-trajectoires-de-vie",
    "portfolio-professionnel",
  ],
};
