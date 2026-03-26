import type { LocalizedContent } from "./odoo-projects";

export type CompetenceType = "human" | "technical";

export type CompetenceLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";

export type Anecdote = {
  title: LocalizedContent;
  content: LocalizedContent;
  result: LocalizedContent;
  linkedRealisation?: string; // slug of linked realisation
};

export type Competence = {
  slug: string;
  title: LocalizedContent;
  type: CompetenceType;
  level: CompetenceLevel;
  /** 0–100, used for radar chart */
  radarValue: number;
  icon: string;
  definition: LocalizedContent;
  anecdotes: Anecdote[];
  selfCritique: {
    level: LocalizedContent;
    importance: LocalizedContent;
    acquisitionSpeed?: LocalizedContent;
    advice: LocalizedContent;
  };
  evolution: {
    goal: LocalizedContent;
    training: LocalizedContent;
  };
  linkedRealisations: string[];
};

export const competences: Competence[] = [
  // ═══════════════════════════════════════════════
  // COMPÉTENCES HUMAINES (5)
  // ═══════════════════════════════════════════════
  {
    slug: "autonomie",
    title: { fr: "Autonomie", en: "Autonomy" },
    type: "human",
    level: "intermediate",
    radarValue: 60,
    icon: "Compass",
    definition: {
      fr: "L'autonomie en ingénierie logicielle est la capacité à prendre en charge un sujet technique de bout en bout — de la compréhension du besoin à la mise en production — sans dépendre d'un encadrement constant. Dans un secteur où les technologies évoluent en permanence et où les équipes sont souvent réduites, savoir avancer seul tout en sachant quand demander de l'aide est une compétence clé.",
      en: "Autonomy in software engineering is the ability to take ownership of a technical subject end-to-end — from understanding the need to deploying in production — without relying on constant supervision. In a field where technologies evolve constantly and teams are often small, knowing how to move forward independently while recognizing when to ask for help is a key skill.",
    },
    anecdotes: [
      {
        title: {
          fr: "Apprentissage autodidacte via The Odin Project",
          en: "Self-taught learning through The Odin Project",
        },
        content: {
          fr: "Pendant la pandémie COVID, alors que j'étais en études de droit, j'ai remis en question mon parcours et commencé à apprendre le développement web en autonomie via YouTube, des articles, puis The Odin Project — un cursus autodidacte complet pour maîtriser le développement web. Cette initiative personnelle, sans cadre institutionnel, m'a appris à structurer mon apprentissage et à persévérer sans encadrement.",
          en: "During the COVID pandemic, while studying law, I questioned my career path and started learning web development on my own through YouTube, articles, then The Odin Project — a comprehensive self-taught curriculum for mastering web development. This personal initiative, without any institutional framework, taught me to structure my learning and persevere without supervision.",
        },
        result: {
          fr: "J'ai acquis des bases solides en HTML, CSS, JavaScript et Git qui m'ont permis d'intégrer une formation professionnelle chez Simplon avec une longueur d'avance.",
          en: "I built solid foundations in HTML, CSS, JavaScript, and Git that allowed me to enter professional training at Simplon with a head start.",
        },
      },
      {
        title: {
          fr: "Apprentissage d'Odoo from scratch en alternance",
          en: "Learning Odoo from scratch during work-study",
        },
        content: {
          fr: "Dès le premier jour de mon alternance chez 1UP, j'ai dû apprendre le framework Odoo en totale autonomie. J'ai commencé par faire un tour complet de l'ERP, en posant un maximum de questions à mes collègues des différentes équipes pour comprendre le workflow métier. J'ai ensuite exploré toute la documentation officielle d'Odoo et suivi leurs cours de développement de modules. Étant le seul développeur Odoo de l'entreprise, chaque demande impliquant du développement me revenait, ce qui m'a permis de monter rapidement en compétences.",
          en: "From day one of my work-study at 1UP, I had to learn the Odoo framework entirely on my own. I started by taking a complete tour of the ERP, asking as many questions as possible to colleagues from different teams to understand the business workflow. I then explored all of Odoo's official documentation and followed their module development courses. Being the only Odoo developer in the company, every request involving development came to me, which allowed me to ramp up quickly.",
        },
        result: {
          fr: "En quelques mois, j'étais capable de développer des modules complets et de répondre aux demandes métier de toute l'entreprise.",
          en: "Within a few months, I was able to develop complete modules and respond to business requests from the entire company.",
        },
        linkedRealisation: "modules-metier-odoo",
      },
    ],
    selfCritique: {
      level: {
        fr: "Niveau intermédiaire. Je suis capable de mener des projets en autonomie complète, mais je continue à développer ma capacité à anticiper les besoins et à prendre des décisions architecturales plus complexes sans validation externe.",
        en: "Intermediate level. I can lead projects with full autonomy, but I'm still developing my ability to anticipate needs and make more complex architectural decisions without external validation.",
      },
      importance: {
        fr: "L'autonomie est fondamentale dans mon profil. En tant que seul développeur Odoo et responsable de plusieurs projets en parallèle (ERP, B2B Symfony, site corporate), je dois être capable d'avancer sur chaque sujet sans attendre de directives.",
        en: "Autonomy is fundamental to my profile. As the sole Odoo developer and responsible for multiple parallel projects (ERP, B2B Symfony, corporate website), I need to be able to make progress on each subject without waiting for directives.",
      },
      advice: {
        fr: "L'autonomie ne signifie pas travailler seul dans son coin. Il est crucial de savoir poser les bonnes questions au bon moment et de communiquer régulièrement sur l'avancement pour éviter les malentendus.",
        en: "Autonomy doesn't mean working alone in a corner. It's crucial to know when to ask the right questions and to communicate regularly on progress to avoid misunderstandings.",
      },
    },
    evolution: {
      goal: {
        fr: "Atteindre un niveau avancé en développant ma capacité à prendre des décisions architecturales stratégiques et à anticiper les évolutions techniques à moyen terme.",
        en: "Reach an advanced level by developing my ability to make strategic architectural decisions and anticipate medium-term technical evolutions.",
      },
      training: {
        fr: "Formation continue sur les patterns d'architecture logicielle et les bonnes pratiques de gestion de projets techniques en autonomie.",
        en: "Ongoing training on software architecture patterns and best practices for managing technical projects independently.",
      },
    },
    linkedRealisations: [
      "migration-odoo-v16-v19",
      "modules-metier-odoo",
      "refonte-site-corporate",
    ],
  },
  {
    slug: "perseverance",
    title: { fr: "Persévérance", en: "Perseverance" },
    type: "human",
    level: "advanced",
    radarValue: 80,
    icon: "Mountain",
    definition: {
      fr: "La persévérance en développement logiciel est la capacité à rester déterminé face à des problèmes complexes, à ne pas abandonner devant un bug tenace ou une fonctionnalité difficile à implémenter. Dans un métier où l'on passe une part significative de son temps à débugger et à chercher des solutions, cette qualité fait la différence entre livrer une solution robuste et contourner le problème.",
      en: "Perseverance in software development is the ability to stay determined when facing complex problems, to not give up on a stubborn bug or a difficult feature to implement. In a profession where a significant portion of time is spent debugging and finding solutions, this quality makes the difference between delivering a robust solution and working around the problem.",
    },
    anecdotes: [
      {
        title: {
          fr: "Développement du calcul de marge sur factures",
          en: "Developing invoice margin calculation",
        },
        content: {
          fr: "L'une des fonctionnalités les plus exigeantes que j'ai développées chez 1UP est le module de calcul de marge sur les factures comptables. Cette fonctionnalité n'existe pas dans le framework Odoo de base et a nécessité de nombreux allers-retours avec l'équipe comptabilité pour comprendre exactement comment calculer les marges selon les règles métier de l'entreprise. Côté technique, j'ai dû explorer en profondeur le fonctionnement interne d'Odoo pour implémenter une solution fiable, avec beaucoup d'essais et de corrections.",
          en: "One of the most demanding features I developed at 1UP is the invoice margin calculation module. This functionality doesn't exist in the base Odoo framework and required numerous back-and-forth exchanges with the accounting team to understand exactly how to calculate margins according to the company's business rules. On the technical side, I had to deeply explore Odoo's internals to implement a reliable solution, with many trials and corrections.",
        },
        result: {
          fr: "Le module a permis à la direction d'avoir des indicateurs de rentabilité et des KPI directement dans l'ERP, améliorant significativement le pilotage commercial de l'entreprise.",
          en: "The module gave management profitability indicators and KPIs directly in the ERP, significantly improving the company's commercial steering.",
        },
        linkedRealisation: "modules-metier-odoo",
      },
      {
        title: {
          fr: "Parcours atypique : du droit au développement",
          en: "Unconventional path: from law to development",
        },
        content: {
          fr: "Mon parcours même est une illustration de la persévérance. Passer d'études de droit à une carrière de développeur fullstack n'est pas un chemin linéaire. Cela a demandé des mois d'apprentissage autodidacte, deux formations certifiantes, un stage, et une alternance — tout en maintenant la motivation dans les moments de doute.",
          en: "My career path itself is an illustration of perseverance. Moving from law studies to a fullstack developer career is not a linear path. It required months of self-teaching, two certified trainings, an internship, and a work-study — all while maintaining motivation through moments of doubt.",
        },
        result: {
          fr: "Aujourd'hui, je suis développeur fullstack en alternance avec une autonomie complète sur des projets critiques pour l'entreprise.",
          en: "Today, I'm a fullstack developer on a work-study program with full autonomy on business-critical projects.",
        },
      },
    ],
    selfCritique: {
      level: {
        fr: "Niveau avancé. Je ne lâche pas sur une tâche complexe, quitte à prendre plus de temps que prévu pour trouver la bonne solution plutôt que d'opter pour un contournement.",
        en: "Advanced level. I don't give up on a complex task, even if it means taking more time than planned to find the right solution rather than opting for a workaround.",
      },
      importance: {
        fr: "La persévérance est au cœur de mon quotidien. En tant que seul développeur sur certains projets, il n'y a personne à qui déléguer les problèmes difficiles — je dois les résoudre.",
        en: "Perseverance is at the core of my daily work. As the sole developer on certain projects, there's no one to delegate difficult problems to — I have to solve them.",
      },
      advice: {
        fr: "La persévérance doit s'accompagner de discernement. Savoir quand persévérer et quand changer d'approche est aussi important que la ténacité elle-même.",
        en: "Perseverance must be accompanied by discernment. Knowing when to persevere and when to change approach is as important as tenacity itself.",
      },
    },
    evolution: {
      goal: {
        fr: "Continuer à affiner ma capacité à évaluer rapidement si un problème nécessite de la persévérance ou un changement de stratégie.",
        en: "Continue refining my ability to quickly assess whether a problem requires perseverance or a change in strategy.",
      },
      training: {
        fr: "Pratique continue à travers des défis techniques de plus en plus complexes, notamment dans les couches internes du framework Odoo.",
        en: "Continuous practice through increasingly complex technical challenges, particularly in the internal layers of the Odoo framework.",
      },
    },
    linkedRealisations: [
      "migration-odoo-v16-v19",
      "modules-metier-odoo",
      "app-trajectoires-de-vie",
    ],
  },
  {
    slug: "adaptabilite",
    title: { fr: "Adaptabilité", en: "Adaptability" },
    type: "human",
    level: "advanced",
    radarValue: 75,
    icon: "RefreshCw",
    definition: {
      fr: "L'adaptabilité en ingénierie logicielle est la capacité à évoluer efficacement entre différents contextes techniques, métier et organisationnels. Dans un secteur en mutation permanente, un développeur doit pouvoir passer d'un langage à un autre, d'un framework à un autre, et d'un domaine métier à un autre sans perte significative de productivité.",
      en: "Adaptability in software engineering is the ability to move efficiently between different technical, business, and organizational contexts. In a constantly evolving field, a developer must be able to switch from one language to another, one framework to another, and one business domain to another without significant loss of productivity.",
    },
    anecdotes: [
      {
        title: {
          fr: "Gestion de trois projets simultanés aux stacks différentes",
          en: "Managing three simultaneous projects with different stacks",
        },
        content: {
          fr: "Au quotidien chez 1UP, je navigue entre trois projets de natures très différentes : le développement de modules Odoo en Python, la maintenance et l'évolution d'un site B2B en Symfony/PHP, et la refonte du site corporate en Next.js/React. Chaque projet a sa propre base de code, ses propres patterns et son propre contexte métier. Au début, passer d'un contexte à l'autre était compliqué car les deux bases de code (Odoo et Symfony) sont très volumineuses. La documentation dans le code, la doc dans Notion et la gestion des tâches dans Jira m'ont grandement aidé à gérer ces transitions.",
          en: "On a daily basis at 1UP, I navigate between three very different projects: developing Odoo modules in Python, maintaining and evolving a B2B site in Symfony/PHP, and redesigning the corporate website in Next.js/React. Each project has its own codebase, its own patterns, and its own business context. Initially, switching between contexts was challenging because both codebases (Odoo and Symfony) are very large. Code documentation, Notion docs, and Jira task management greatly helped me handle these transitions.",
        },
        result: {
          fr: "J'ai développé une méthode de travail qui me permet de basculer efficacement d'un projet à l'autre, parfois même de faire du support utilisateur en parallèle.",
          en: "I developed a working method that allows me to switch efficiently between projects, sometimes even providing user support in parallel.",
        },
        linkedRealisation: "modules-metier-odoo",
      },
    ],
    selfCritique: {
      level: {
        fr: "Niveau avancé. Mon expérience sur des projets aux technologies et natures variées m'a donné une bonne capacité d'adaptation. Le nombre de contextes différents que je gère au quotidien en est la preuve.",
        en: "Advanced level. My experience on projects with varied technologies and natures has given me a strong ability to adapt. The number of different contexts I manage daily is proof of this.",
      },
      importance: {
        fr: "L'adaptabilité est essentielle dans mon poste actuel où je suis le seul développeur sur plusieurs projets aux stacks complètement différentes.",
        en: "Adaptability is essential in my current role where I'm the sole developer on multiple projects with completely different stacks.",
      },
      advice: {
        fr: "La documentation et l'organisation sont les meilleurs alliés de l'adaptabilité. Sans eux, le changement de contexte devient un frein au lieu d'être une force.",
        en: "Documentation and organization are the best allies of adaptability. Without them, context switching becomes a hindrance instead of a strength.",
      },
    },
    evolution: {
      goal: {
        fr: "Formaliser encore davantage mes processus de transition entre projets pour réduire le temps de remise en contexte.",
        en: "Further formalize my transition processes between projects to reduce context-switching time.",
      },
      training: {
        fr: "Veille continue sur les méthodologies de gestion multi-projets et les outils de productivité pour développeurs.",
        en: "Ongoing monitoring of multi-project management methodologies and developer productivity tools.",
      },
    },
    linkedRealisations: [
      "modules-metier-odoo",
      "refonte-site-corporate",
    ],
  },
  {
    slug: "amelioration-continue",
    title: { fr: "Amélioration continue", en: "Continuous improvement" },
    type: "human",
    level: "intermediate",
    radarValue: 55,
    icon: "TrendingUp",
    definition: {
      fr: "L'amélioration continue en développement logiciel est la volonté de ne pas se contenter d'une première implémentation fonctionnelle, mais de chercher constamment à améliorer la qualité, la maintenabilité et l'expérience utilisateur du code existant. C'est l'idée que le logiciel n'est jamais « fini » et qu'il peut toujours être amélioré.",
      en: "Continuous improvement in software development is the willingness to not settle for a first working implementation, but to constantly seek to improve the quality, maintainability, and user experience of existing code. It's the idea that software is never 'finished' and can always be improved.",
    },
    anecdotes: [
      {
        title: {
          fr: "Itérations sur les modules Odoo existants",
          en: "Iterations on existing Odoo modules",
        },
        content: {
          fr: "Plusieurs de mes modules Odoo ont connu des versions successives. Les premières versions (V1) ne correspondaient pas toujours exactement aux attentes des utilisateurs. Plutôt que de considérer le travail comme terminé une fois la feature livrée, j'ai systématiquement recueilli les retours utilisateurs et amélioré les fonctionnalités. Je n'ai pas la prétention d'implémenter à chaque fois la feature parfaite, et c'est pourquoi je cherche continuellement à améliorer l'existant, pas seulement à développer de nouvelles fonctionnalités.",
          en: "Several of my Odoo modules went through successive versions. The first versions (V1) didn't always exactly match user expectations. Rather than considering the work done once a feature was delivered, I systematically collected user feedback and improved the features. I don't claim to implement the perfect feature every time, which is why I continuously seek to improve existing code, not just develop new features.",
        },
        result: {
          fr: "Les modules améliorés ont mieux répondu aux besoins réels des utilisateurs, réduisant les frictions et augmentant l'adoption.",
          en: "The improved modules better met actual user needs, reducing friction and increasing adoption.",
        },
        linkedRealisation: "modules-metier-odoo",
      },
    ],
    selfCritique: {
      level: {
        fr: "Niveau intermédiaire. J'ai la mentalité de l'amélioration continue mais je dois encore progresser dans la systématisation de cette démarche — par exemple en mettant en place des revues de code régulières ou des métriques de qualité.",
        en: "Intermediate level. I have the mindset of continuous improvement but I still need to progress in systematizing this approach — for example by setting up regular code reviews or quality metrics.",
      },
      importance: {
        fr: "L'amélioration continue est particulièrement importante dans le contexte d'un ERP utilisé quotidiennement par toute l'entreprise. Chaque amélioration a un impact direct sur la productivité des utilisateurs.",
        en: "Continuous improvement is particularly important in the context of an ERP used daily by the entire company. Every improvement has a direct impact on user productivity.",
      },
      advice: {
        fr: "Ne pas attendre que le code soit parfait pour le livrer, mais ne jamais le considérer comme terminé non plus. La meilleure approche est de livrer une version fonctionnelle, puis d'itérer.",
        en: "Don't wait for the code to be perfect before delivering it, but never consider it finished either. The best approach is to deliver a working version, then iterate.",
      },
    },
    evolution: {
      goal: {
        fr: "Mettre en place des processus plus formels de revue et d'amélioration continue, notamment via des métriques et des audits de code réguliers.",
        en: "Establish more formal review and continuous improvement processes, particularly through metrics and regular code audits.",
      },
      training: {
        fr: "Approfondissement des pratiques de refactoring et de clean code, notamment les principes SOLID et les design patterns.",
        en: "Deepening refactoring and clean code practices, particularly SOLID principles and design patterns.",
      },
    },
    linkedRealisations: ["modules-metier-odoo", "portfolio-professionnel"],
  },
  {
    slug: "communication",
    title: { fr: "Communication", en: "Communication" },
    type: "human",
    level: "intermediate",
    radarValue: 50,
    icon: "MessageSquare",
    definition: {
      fr: "La communication en ingénierie logicielle va au-delà de la simple transmission d'informations. C'est la capacité à expliquer des concepts techniques à des non-techniciens, à documenter son travail, et à s'assurer que les fonctionnalités développées sont comprises et adoptées par les utilisateurs. Si on ne communique pas sur ce qu'on fait, nos fonctionnalités n'existent pas aux yeux des utilisateurs.",
      en: "Communication in software engineering goes beyond simply transmitting information. It's the ability to explain technical concepts to non-technical people, to document one's work, and to ensure that developed features are understood and adopted by users. If we don't communicate about what we do, our features don't exist in the eyes of users.",
    },
    anecdotes: [
      {
        title: {
          fr: "Documentation des changements de workflow B2B/Odoo",
          en: "Documenting B2B/Odoo workflow changes",
        },
        content: {
          fr: "En 2025, nous avons fait des changements majeurs sur le workflow de synchronisation des données entre Odoo et le site B2B. Le nouveau processus pour les commerciaux — notamment pour donner accès à leurs clients à la plateforme B2B — était difficilement compris. J'ai documenté les changements, expliqué le nouveau fonctionnement aux commerciaux et partagé des tutoriels étape par étape.",
          en: "In 2025, we made major changes to the data synchronization workflow between Odoo and the B2B site. The new process for sales representatives — particularly for granting their clients access to the B2B platform — was hard to understand. I documented the changes, explained the new workflow to the sales team, and shared step-by-step tutorials.",
        },
        result: {
          fr: "Les tutoriels et la documentation ont grandement aidé les utilisateurs à s'adapter aux changements, réduisant significativement les demandes de support.",
          en: "The tutorials and documentation greatly helped users adapt to the changes, significantly reducing support requests.",
        },
        linkedRealisation: "modules-metier-odoo",
      },
    ],
    selfCritique: {
      level: {
        fr: "Niveau intermédiaire, en progression. La documentation et le travail de communication avec les profils non techniques est une chose que je veux largement améliorer et à terme maîtriser.",
        en: "Intermediate level, progressing. Documentation and communication work with non-technical profiles is something I want to greatly improve and eventually master.",
      },
      importance: {
        fr: "La communication est de plus en plus centrale dans mon rôle. Si on ne communique pas, le fonctionnement de ce qu'on crée peut ne pas être compris, et pour aller plus loin, si on ne communique pas sur ce qu'on fait, nos super features n'existent pas.",
        en: "Communication is increasingly central to my role. If we don't communicate, how our creations work may not be understood, and going further, if we don't communicate about what we do, our great features simply don't exist.",
      },
      advice: {
        fr: "La rédaction d'articles techniques et de guides utilisateur est un excellent exercice pour améliorer sa communication. Écrire force à structurer sa pensée et à se mettre à la place du lecteur.",
        en: "Writing technical articles and user guides is an excellent exercise to improve communication. Writing forces you to structure your thinking and put yourself in the reader's shoes.",
      },
    },
    evolution: {
      goal: {
        fr: "Atteindre un niveau avancé en communication technique. Être capable de documenter systématiquement les changements, de former les utilisateurs et d'écrire des articles de qualité professionnelle.",
        en: "Reach an advanced level in technical communication. Be able to systematically document changes, train users, and write professional-quality articles.",
      },
      training: {
        fr: "Rédaction régulière d'articles techniques sur mon blog, création de documentations utilisateur pour les nouvelles fonctionnalités, et amélioration de mes compétences en rédaction technique.",
        en: "Regular writing of technical articles on my blog, creation of user documentation for new features, and improvement of my technical writing skills.",
      },
    },
    linkedRealisations: ["modules-metier-odoo", "portfolio-professionnel"],
  },

  // ═══════════════════════════════════════════════
  // COMPÉTENCES TECHNIQUES (5)
  // ═══════════════════════════════════════════════
  {
    slug: "developpement-odoo",
    title: { fr: "Développement Odoo", en: "Odoo Development" },
    type: "technical",
    level: "advanced",
    radarValue: 85,
    icon: "Puzzle",
    definition: {
      fr: "Le développement Odoo consiste à étendre et personnaliser le framework ERP open source Odoo pour répondre aux besoins métier spécifiques d'une entreprise. Cela inclut le développement de modules custom, l'extension des modèles existants, la création de vues, de rapports, et de workflows. Odoo étant un framework très complet mais aussi très spécifique, maîtriser son développement nécessite une compréhension profonde de son architecture ORM, de son système d'héritage et de ses mécanismes internes.",
      en: "Odoo development involves extending and customizing the open-source ERP framework Odoo to meet specific business needs. This includes developing custom modules, extending existing models, creating views, reports, and workflows. Odoo being a very complete but also very specific framework, mastering its development requires deep understanding of its ORM architecture, inheritance system, and internal mechanisms.",
    },
    anecdotes: [
      {
        title: {
          fr: "Migration solo d'Odoo v16 vers v19",
          en: "Solo migration from Odoo v16 to v19",
        },
        content: {
          fr: "J'ai géré en solo la migration de l'ERP de l'entreprise d'Odoo v16 vers v19, sans l'aide d'une agence Odoo. La migration impliquait une vingtaine de modules custom en plus de centaines de personnalisations effectuées par les utilisateurs dans l'ERP avec Odoo Studio. Ces personnalisations ne sont pas versionnées dans le code — elles sont uniquement enregistrées en base de données — ce qui signifiait que je devais identifier chacune d'entre elles et créer des scripts de migration pour s'assurer que les nouvelles versions d'Odoo ne cassaient pas leurs fonctionnalités.",
          en: "I single-handedly managed the company's ERP migration from Odoo v16 to v19, without the help of an Odoo agency. The migration involved about twenty custom modules plus hundreds of customizations made by users through Odoo Studio. These customizations aren't version-controlled in code — they're only stored in the database — meaning I had to identify each one and create migration scripts to ensure new Odoo versions didn't break their functionality.",
        },
        result: {
          fr: "La migration s'est bien passée après 6 mois de travail. Quelques régressions corrigées au fur et à mesure pendant le mois suivant la mise en production. L'ERP tourne désormais sur une version supportée avec de nouvelles fonctionnalités (IA, améliorations des applications existantes).",
          en: "The migration went well after 6 months of work. A few regressions were fixed progressively during the month following production deployment. The ERP now runs on a supported version with new features (AI, improvements to existing applications).",
        },
        linkedRealisation: "migration-odoo-v16-v19",
      },
      {
        title: {
          fr: "Publication de 20+ modules open source",
          en: "Publishing 20+ open-source modules",
        },
        content: {
          fr: "J'ai extrait et publié plus de 20 modules Odoo en open source sur GitHub. Chaque module est nettoyé pour fonctionner sur des installations Odoo génériques et répond à un besoin métier réel identifié dans mon expérience en entreprise.",
          en: "I extracted and published over 20 Odoo modules as open source on GitHub. Each module is cleaned up to work on generic Odoo installations and addresses a real business need identified from my professional experience.",
        },
        result: {
          fr: "Ces modules sont accessibles à toute la communauté Odoo et démontrent ma capacité à produire du code métier réutilisable.",
          en: "These modules are accessible to the entire Odoo community and demonstrate my ability to produce reusable business code.",
        },
        linkedRealisation: "modules-metier-odoo",
      },
    ],
    selfCritique: {
      level: {
        fr: "Niveau avancé, proche de l'expert. Je maîtrise le développement de modules, l'ORM, les vues, les rapports, les workflows et les mécanismes de migration. Je creuse de plus en plus dans les couches internes du framework pour mes implémentations.",
        en: "Advanced level, close to expert. I master module development, ORM, views, reports, workflows, and migration mechanisms. I'm digging deeper and deeper into the framework's internal layers for my implementations.",
      },
      importance: {
        fr: "C'est ma compétence technique principale et ma spécialisation. Odoo est l'outil central de l'entreprise et ma maîtrise de ce framework est directement liée à la valeur que j'apporte au quotidien.",
        en: "This is my main technical skill and specialization. Odoo is the company's central tool and my mastery of this framework is directly linked to the value I bring daily.",
      },
      acquisitionSpeed: {
        fr: "Montée en compétences rapide grâce à une immersion totale dès le premier jour et au fait que toutes les demandes de développement me revenaient en tant que seul développeur Odoo.",
        en: "Fast skill acquisition through total immersion from day one and the fact that all development requests came to me as the sole Odoo developer.",
      },
      advice: {
        fr: "Pour apprendre Odoo efficacement, il faut lire le code source du framework autant que la documentation officielle. C'est en comprenant comment Odoo fonctionne en interne qu'on devient capable de l'étendre correctement.",
        en: "To learn Odoo effectively, you need to read the framework's source code as much as the official documentation. It's by understanding how Odoo works internally that you become able to extend it correctly.",
      },
    },
    evolution: {
      goal: {
        fr: "Devenir un véritable spécialiste reconnu d'Odoo. Dernièrement, j'ai de plus en plus creusé dans le framework pour mes implémentations et je veux continuer dans ce sens. J'ai pour ambition de commencer à participer aux conférences Odoo (Odoo Experience, etc.).",
        en: "Become a recognized Odoo specialist. Recently, I've been digging deeper into the framework for my implementations and I want to continue in this direction. I aspire to start participating in Odoo conferences (Odoo Experience, etc.).",
      },
      training: {
        fr: "Exploration continue du code source Odoo, veille sur les nouveautés du framework, et préparation pour participer à des conférences Odoo.",
        en: "Ongoing exploration of Odoo source code, monitoring framework updates, and preparation to participate in Odoo conferences.",
      },
    },
    linkedRealisations: ["migration-odoo-v16-v19", "modules-metier-odoo"],
  },
  {
    slug: "developpement-backend",
    title: {
      fr: "Développement Backend (PHP/Symfony)",
      en: "Backend Development (PHP/Symfony)",
    },
    type: "technical",
    level: "intermediate",
    radarValue: 55,
    icon: "Server",
    definition: {
      fr: "Le développement backend consiste à concevoir et implémenter la logique serveur, les API, la gestion des données et les processus métier qui font fonctionner une application web. Avec Symfony, cela implique la maîtrise de l'écosystème PHP moderne : architecture MVC, Doctrine ORM, services, événements et intégration avec des systèmes tiers.",
      en: "Backend development involves designing and implementing server logic, APIs, data management, and business processes that power a web application. With Symfony, this means mastering the modern PHP ecosystem: MVC architecture, Doctrine ORM, services, events, and integration with third-party systems.",
    },
    anecdotes: [
      {
        title: {
          fr: "Développement de fonctionnalités sur le site B2B",
          en: "Feature development on the B2B site",
        },
        content: {
          fr: "Le site B2B de 1UP est une plateforme complète construite avec Symfony où les clients et commerciaux passent des commandes qui atterrissent directement dans Odoo. Le site permet aussi le suivi des commandes, factures et informations clients. J'ai développé des fonctionnalités de gestion de produits en autonomie complète, de la conception à la mise en production sur le serveur VPS.",
          en: "The 1UP B2B site is a full platform built with Symfony where clients and sales representatives place orders that land directly in Odoo. The site also enables order tracking, invoicing, and client information management. I developed product management features with full autonomy, from design to production deployment on the VPS server.",
        },
        result: {
          fr: "Les fonctionnalités livrées ont amélioré l'expérience des utilisateurs du B2B et renforcé l'intégration entre le site et l'ERP Odoo.",
          en: "The delivered features improved the B2B user experience and strengthened the integration between the site and the Odoo ERP.",
        },
      },
    ],
    selfCritique: {
      level: {
        fr: "Niveau intermédiaire. Je suis capable de développer des fonctionnalités complètes en Symfony et de les déployer, mais ce n'est pas ma spécialisation principale. Ma priorité est sur Odoo.",
        en: "Intermediate level. I can develop complete features in Symfony and deploy them, but it's not my main specialization. My priority is on Odoo.",
      },
      importance: {
        fr: "Le backend Symfony est un pilier de l'infrastructure de 1UP avec le site B2B. Maîtriser cette stack me permet d'être polyvalent et de répondre aux besoins de l'entreprise au-delà d'Odoo.",
        en: "Symfony backend is a pillar of 1UP's infrastructure with the B2B site. Mastering this stack allows me to be versatile and meet company needs beyond Odoo.",
      },
      advice: {
        fr: "Travailler sur un projet Symfony existant de grande envergure est le meilleur moyen de progresser. La lecture du code existant et la compréhension des patterns en place sont essentielles.",
        en: "Working on a large existing Symfony project is the best way to progress. Reading existing code and understanding established patterns is essential.",
      },
    },
    evolution: {
      goal: {
        fr: "Maintenir un niveau intermédiaire solide et progresser sur les patterns avancés de Symfony pour être capable de prendre en charge des fonctionnalités plus complexes.",
        en: "Maintain a solid intermediate level and progress on advanced Symfony patterns to be able to handle more complex features.",
      },
      training: {
        fr: "Pratique continue sur le projet B2B et veille sur les évolutions de Symfony.",
        en: "Ongoing practice on the B2B project and monitoring Symfony updates.",
      },
    },
    linkedRealisations: ["modules-metier-odoo"],
  },
  {
    slug: "developpement-frontend",
    title: {
      fr: "Développement Frontend (React/Next.js)",
      en: "Frontend Development (React/Next.js)",
    },
    type: "technical",
    level: "intermediate",
    radarValue: 60,
    icon: "Monitor",
    definition: {
      fr: "Le développement frontend consiste à concevoir et implémenter l'interface utilisateur d'une application web. Avec React et Next.js, cela implique la maîtrise des composants, du state management, du Server-Side Rendering (SSR), de la génération statique (SSG) et de l'écosystème moderne du frontend : TypeScript, Tailwind CSS, animations, accessibilité et performance.",
      en: "Frontend development involves designing and implementing the user interface of a web application. With React and Next.js, this means mastering components, state management, Server-Side Rendering (SSR), Static Site Generation (SSG), and the modern frontend ecosystem: TypeScript, Tailwind CSS, animations, accessibility, and performance.",
    },
    anecdotes: [
      {
        title: {
          fr: "Refonte du site corporate avec Next.js",
          en: "Corporate website redesign with Next.js",
        },
        content: {
          fr: "J'ai pris en charge la refonte complète du site corporate de 1UP, qui était construit avec le builder d'Odoo 16 et complètement dépassé. Le nouveau site est développé avec Next.js et GSAP pour les animations, en étroite collaboration avec les graphistes/designers de la boîte et le directeur marketing pour le contenu. J'ai aussi travaillé avec le CEO pour l'image générale à renvoyer.",
          en: "I took charge of the complete redesign of 1UP's corporate website, which was built with Odoo 16's website builder and completely outdated. The new site is developed with Next.js and GSAP for animations, in close collaboration with the company's graphic designers and the marketing director for content. I also worked with the CEO on the overall image to convey.",
        },
        result: {
          fr: "Le site est bientôt live et représente un vrai changement positif pour l'image de la boîte, avec un design moderne, des performances optimales et un bon référencement.",
          en: "The site is soon going live and represents a real positive change for the company's image, with modern design, optimal performance, and good SEO.",
        },
        linkedRealisation: "refonte-site-corporate",
      },
    ],
    selfCritique: {
      level: {
        fr: "Niveau intermédiaire. Je maîtrise React, Next.js et l'écosystème frontend moderne, mais ma spécialisation reste le backend/Odoo. Le frontend est un domaine où je continue d'apprendre avec chaque projet.",
        en: "Intermediate level. I master React, Next.js, and the modern frontend ecosystem, but my specialization remains backend/Odoo. Frontend is a domain where I keep learning with each project.",
      },
      importance: {
        fr: "Le frontend est de plus en plus important dans mon profil, notamment avec la refonte du site corporate et la réalisation de ce portfolio. La capacité à produire des interfaces de qualité est un atout qui complète mes compétences backend.",
        en: "Frontend is increasingly important in my profile, especially with the corporate website redesign and this portfolio. The ability to produce quality interfaces is an asset that complements my backend skills.",
      },
      advice: {
        fr: "Commencer un projet ambitieux de A à Z est le meilleur moyen de progresser en frontend. Ce portfolio en est la preuve : il m'a poussé à explorer des sujets comme l'i18n, les animations GSAP, la conformité RGPD et le SEO.",
        en: "Starting an ambitious project from scratch is the best way to progress in frontend. This portfolio is proof: it pushed me to explore topics like i18n, GSAP animations, GDPR compliance, and SEO.",
      },
    },
    evolution: {
      goal: {
        fr: "Consolider mes compétences React/Next.js et développer une expertise en animations web et en design d'interfaces.",
        en: "Consolidate my React/Next.js skills and develop expertise in web animations and interface design.",
      },
      training: {
        fr: "Projets personnels avec Next.js, exploration avancée de GSAP et des Web APIs modernes.",
        en: "Personal projects with Next.js, advanced exploration of GSAP and modern Web APIs.",
      },
    },
    linkedRealisations: [
      "refonte-site-corporate",
      "portfolio-professionnel",
      "app-trajectoires-de-vie",
    ],
  },
  {
    slug: "devops",
    title: {
      fr: "DevOps & Administration Serveur",
      en: "DevOps & Server Administration",
    },
    type: "technical",
    level: "beginner",
    radarValue: 35,
    icon: "Container",
    definition: {
      fr: "Le DevOps et l'administration serveur englobent les pratiques de déploiement, d'automatisation, de monitoring et de maintenance des environnements de production. Cela inclut la gestion de serveurs VPS, la conteneurisation avec Docker, la mise en place de pipelines CI/CD, et la résolution d'incidents de production.",
      en: "DevOps and server administration encompass deployment practices, automation, monitoring, and maintenance of production environments. This includes VPS server management, containerization with Docker, CI/CD pipeline setup, and production incident resolution.",
    },
    anecdotes: [
      {
        title: {
          fr: "Résolution d'incidents de stockage sur VPS",
          en: "Resolving VPS storage incidents",
        },
        content: {
          fr: "J'ai résolu plusieurs incidents sur le serveur VPS de production. Le premier : un problème de surcharge de stockage causé par l'accumulation d'images Docker orphelines tirées sur le serveur lors des déploiements successifs. Le second : une saturation de stockage causée par des binlogs SQL qui s'accumulaient en raison d'une configuration par défaut inadaptée. Dans les deux cas, j'ai dû analyser le serveur pour comprendre la cause puis appliquer les corrections (purge des images, purge des binlogs et modification de la configuration SQL).",
          en: "I resolved several incidents on the production VPS server. The first: a storage overload problem caused by the accumulation of orphaned Docker images pulled to the server during successive deployments. The second: storage saturation caused by SQL binlogs accumulating due to an unsuitable default configuration. In both cases, I had to analyze the server to understand the cause and then apply fixes (image cleanup, binlog purge, and SQL configuration modification).",
        },
        result: {
          fr: "Les incidents ont été résolus et j'ai mis en place des mesures préventives pour éviter leur récurrence. J'ai d'ailleurs publié un article technique sur le nettoyage des images Docker dangling suite à cette expérience.",
          en: "The incidents were resolved and I implemented preventive measures to avoid recurrence. I even published a technical article on cleaning dangling Docker images following this experience.",
        },
      },
    ],
    selfCritique: {
      level: {
        fr: "Niveau débutant. Ce n'est pas ma spécialisation mais je suis capable d'intervenir de façon sécurisée sur les serveurs, de mettre en place des pipelines CI/CD et de résoudre des incidents de production.",
        en: "Beginner level. This is not my specialization but I can intervene securely on servers, set up CI/CD pipelines, and resolve production incidents.",
      },
      importance: {
        fr: "Le DevOps est un complément précieux à mon profil de développeur fullstack. Pouvoir déployer et maintenir ce que je développe est un atout qui me rend plus autonome.",
        en: "DevOps is a valuable complement to my fullstack developer profile. Being able to deploy and maintain what I develop is an asset that makes me more autonomous.",
      },
      advice: {
        fr: "Même si ce n'est pas sa spécialisation, tout développeur devrait comprendre les bases du déploiement et de l'administration serveur. Cela aide à écrire du code plus robuste et à mieux diagnostiquer les problèmes.",
        en: "Even if it's not their specialization, every developer should understand the basics of deployment and server administration. It helps write more robust code and better diagnose issues.",
      },
    },
    evolution: {
      goal: {
        fr: "Atteindre un niveau intermédiaire solide, notamment en automatisation et en monitoring, pour être encore plus autonome sur mes déploiements.",
        en: "Reach a solid intermediate level, particularly in automation and monitoring, to be even more autonomous in my deployments.",
      },
      training: {
        fr: "Approfondissement de Docker, Kubernetes et des outils de monitoring. Amélioration continue des pipelines CI/CD existants.",
        en: "Deepening Docker, Kubernetes, and monitoring tool knowledge. Continuous improvement of existing CI/CD pipelines.",
      },
    },
    linkedRealisations: ["modules-metier-odoo", "refonte-site-corporate"],
  },
  {
    slug: "python",
    title: { fr: "Python", en: "Python" },
    type: "technical",
    level: "intermediate",
    radarValue: 60,
    icon: "Code",
    definition: {
      fr: "Python est un langage de programmation polyvalent utilisé dans de nombreux domaines : développement web, data science, scripting, automatisation et ERP. Dans le contexte du développement Odoo, Python est le langage principal : toute la logique métier du framework est écrite en Python, des modèles ORM aux contrôleurs en passant par les wizards et les scripts de migration.",
      en: "Python is a versatile programming language used in many domains: web development, data science, scripting, automation, and ERP. In the context of Odoo development, Python is the main language: all the framework's business logic is written in Python, from ORM models to controllers, wizards, and migration scripts.",
    },
    anecdotes: [
      {
        title: {
          fr: "Python au cœur de chaque module Odoo",
          en: "Python at the core of every Odoo module",
        },
        content: {
          fr: "À chaque module que je développe pour Odoo, Python est omniprésent. C'est le langage avec lequel je définis les modèles de données, la logique métier, les contrôleurs API, les scripts de migration, et les tests. Tout le métier du framework Odoo repose sur Python, ce qui en fait mon langage de travail quotidien depuis plus d'un an.",
          en: "In every module I develop for Odoo, Python is omnipresent. It's the language I use to define data models, business logic, API controllers, migration scripts, and tests. All of Odoo's business framework relies on Python, making it my daily working language for over a year.",
        },
        result: {
          fr: "Ma maîtrise de Python me permet de développer des modules Odoo complets et de creuser dans le code source du framework quand nécessaire.",
          en: "My Python proficiency allows me to develop complete Odoo modules and dig into the framework's source code when necessary.",
        },
        linkedRealisation: "modules-metier-odoo",
      },
    ],
    selfCritique: {
      level: {
        fr: "Niveau intermédiaire. Python est mon troisième langage de base (après JavaScript/TypeScript et PHP). Je l'utilise quotidiennement dans le contexte Odoo mais je dois encore approfondir mes connaissances des patterns avancés du langage.",
        en: "Intermediate level. Python is my third base language (after JavaScript/TypeScript and PHP). I use it daily in the Odoo context but I still need to deepen my knowledge of the language's advanced patterns.",
      },
      importance: {
        fr: "Python est directement lié à ma spécialisation Odoo. Progresser en Python, c'est progresser en Odoo, et inversement.",
        en: "Python is directly linked to my Odoo specialization. Progressing in Python means progressing in Odoo, and vice versa.",
      },
      advice: {
        fr: "Pour maîtriser Python dans un contexte ERP, il faut aller au-delà de la syntaxe et comprendre les patterns spécifiques à Odoo : héritage de classes, décorateurs, metaclasses et ORM.",
        en: "To master Python in an ERP context, you need to go beyond syntax and understand Odoo-specific patterns: class inheritance, decorators, metaclasses, and ORM.",
      },
    },
    evolution: {
      goal: {
        fr: "Atteindre un niveau avancé en Python, notamment sur les aspects avancés du langage (metaclasses, descriptors, async) et leur application dans le contexte Odoo.",
        en: "Reach an advanced level in Python, particularly on advanced language aspects (metaclasses, descriptors, async) and their application in the Odoo context.",
      },
      training: {
        fr: "Lecture du code source d'Odoo pour comprendre les patterns Python avancés utilisés par le framework. Exploration de projets Python open source.",
        en: "Reading Odoo's source code to understand advanced Python patterns used by the framework. Exploring open-source Python projects.",
      },
    },
    linkedRealisations: ["migration-odoo-v16-v19", "modules-metier-odoo"],
  },
];

export function getCompetenceBySlug(slug: string) {
  return competences.find((c) => c.slug === slug);
}

export function getCompetencesByType(type: CompetenceType) {
  return competences.filter((c) => c.type === type);
}

export const competenceLevelLabels: Record<
  CompetenceLevel,
  LocalizedContent
> = {
  beginner: { fr: "Débutant", en: "Beginner" },
  intermediate: { fr: "Intermédiaire", en: "Intermediate" },
  advanced: { fr: "Avancé", en: "Advanced" },
  expert: { fr: "Expert", en: "Expert" },
};
