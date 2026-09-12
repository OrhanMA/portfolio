import type { Competence } from "./types";

export const developpementBackend: Competence = {
  slug: "developpement-backend",
  title: {
    fr: "Développement Backend & API",
    en: "Backend & API Development",
  },
  type: "technical",
  level: "intermediate",
  radarValue: 80,
  icon: "Server",
  definition: {
    fr: `Le développement backend couvre les traitements exécutés côté serveur : règles métier, accès aux données, authentification et autorisation, API, tâches planifiées, intégrations externes et observabilité. Une route qui renvoie une réponse correcte n'est qu'une partie du travail. Il faut définir les données acceptées, valider les entrées, préserver les invariants, gérer les erreurs, protéger les secrets, contrôler les effets de bord et rendre le comportement testable.

Ma pratique ne se limite pas à un seul langage. J'utilise Python avec l'ORM Odoo pour les processus ERP, PHP et Symfony sur le site B2B, Node.js avec Express, Prisma et PostgreSQL pour CAP2vie, ainsi que les Server Actions de Next.js pour le portfolio. Cette diversité m'a appris à reconnaître les mêmes responsabilités derrière des outils différents : contrat d'échange, transaction, contrôle d'accès, résilience et traçabilité.

Je porte une attention particulière aux intégrations. Lorsque deux systèmes échangent des clients, produits, commandes ou courriels, une disponibilité apparente ne prouve pas que les données sont complètes et cohérentes. Je vérifie donc le format, les erreurs, les reprises, les doublons possibles et la responsabilité de chaque système.`,
    en: `Backend development covers processing performed on the server: business rules, data access, authentication and authorization, APIs, scheduled tasks, external integrations, and observability. A route returning a correct response is only part of the work. Accepted data must be defined, inputs validated, invariants preserved, errors handled, secrets protected, side effects controlled, and behavior made testable.

My practice is not limited to one language. I use Python with Odoo's ORM for ERP processes, PHP and Symfony on the B2B website, Node.js with Express, Prisma, and PostgreSQL for CAP2vie, and Next.js Server Actions for the portfolio. This diversity has taught me to recognize the same responsibilities behind different tools: exchange contracts, transactions, access control, resilience, and traceability.

I pay particular attention to integrations. When two systems exchange customers, products, orders, or emails, apparent availability does not prove that data is complete and consistent. I therefore verify formats, errors, recovery behavior, possible duplicates, and each system's responsibility.`,
  },
  relatedNews: {
    date: "2025-11-27",
    dateLabel: { fr: "27 novembre 2025", en: "November 27, 2025" },
    title: {
      fr: "Symfony 8.0 supprime les API dépréciées",
      en: "Symfony 8.0 removes deprecated APIs",
    },
    summary: {
      fr: "Symfony 8.0.0 est devenu stable le 27 novembre 2025, accompagné de ses nouveautés et d'un guide de mise à niveau. Cette sortie majeure rappelle qu'un backend maintenable demande des tests, le traitement progressif des incompatibilités et une stratégie de migration.",
      en: "Symfony 8.0.0 became stable on November 27, 2025, together with its feature overview and upgrade guide. This major release is a reminder that maintainable backend work requires tests, gradual compatibility work, and a migration strategy.",
    },
    source: "Symfony",
    href: "https://symfony.com/blog/symfony-8-0-0-released",
  },
  anecdotes: [
    {
      title: {
        fr: "Exposer des routes ERP ciblées pour le site B2B",
        en: "Exposing focused ERP routes for the B2B website",
      },
      content: {
        fr: `Le site B2B Symfony dépend des clients, produits, stocks et commandes gérés dans Odoo. Lorsque les mécanismes standard ne répondaient pas exactement au contrat nécessaire, j'ai développé des contrôleurs ciblés dans les modules internes. Je devais sélectionner les données utiles, respecter les droits, éviter d'exposer des informations confidentielles et conserver une frontière claire entre le domaine de l'ERP et celui du site. La migration vers Odoo 19 a ensuite imposé d'adapter la majorité des échanges vers JSON-2 et de vérifier les flux dans les deux sens.`,
        en: `The Symfony B2B website depends on customers, products, stock, and orders managed in Odoo. When standard mechanisms did not precisely satisfy the required contract, I developed focused controllers in internal modules. I had to select useful data, respect permissions, avoid exposing confidential information, and preserve a clear boundary between the ERP domain and the website. The Odoo 19 migration then required adapting most exchanges to JSON-2 and checking flows in both directions.`,
      },
      result: {
        fr: "Le site B2B et les intégrations principales ont repris leur fonctionnement après la migration. Les routes sur mesure restent localisées dans des modules versionnés, ce qui rend leur responsabilité et leur évolution identifiables.",
        en: "The B2B website and main integrations resumed operation after the migration. Custom routes remain contained in version-controlled modules, making their responsibility and evolution identifiable.",
      },
      linkedRealisation: "modules-metier-odoo",
    },
    {
      title: {
        fr: "Modéliser et synchroniser un prototype de recherche",
        en: "Modeling and synchronizing a research prototype",
      },
      content: {
        fr: `Pour CAP2vie, l'équipe a construit un backend JavaScript avec Express, PostgreSQL et Prisma. Nous avons défini les principales entités du questionnaire, stocké les réponses et associé les événements aux dimensions de trajectoire. En cours de projet, j'ai pris le lead sur l'interconnexion multiécrans avec Socket.io : création d'une room identifiée et protégée par mot de passe, synchronisation de l'état nécessaire au second écran et maintien de la saisie lorsque l'affichage secondaire se déconnectait. Le prototype restait local et la reconnexion était encore manuelle, limites que nous avons documentées.`,
        en: `For CAP2vie, the team built a JavaScript backend with Express, PostgreSQL, and Prisma. We defined the questionnaire's main entities, stored answers, and associated events with trajectory dimensions. During the project, I led the multi-screen connection using Socket.io: creating a password-protected room, synchronizing the state required by the second screen, and keeping input available when the secondary display disconnected. The prototype remained local and reconnection was still manual, limitations that we documented.`,
      },
      result: {
        fr: "La démonstration multiécrans a fonctionné et le développeur suivant a réussi à installer le projet. L'expérience m'a appris à raisonner sur l'état d'une connexion temps réel, ses interruptions et le périmètre de sécurité acceptable uniquement pour une preuve de concept contrôlée.",
        en: "The multi-screen demonstration worked, and the next developer successfully installed the project. The experience taught me to reason about real-time connection state, interruptions, and a security scope acceptable only for a controlled proof of concept.",
      },
      linkedRealisation: "app-trajectoires-de-vie",
    },
    {
      title: {
        fr: "Protéger la chaîne d'envoi du formulaire du portfolio",
        en: "Protecting the portfolio contact-delivery chain",
      },
      content: {
        fr: `Le formulaire du portfolio utilise une Server Action Next.js qui revalide les données avec Zod avant d'appeler Resend. J'ai ajouté plusieurs couches contre les soumissions indésirables : un champ honeypot, un contrôle du temps écoulé, une limitation à cinq requêtes par heure et par adresse IP, puis reCAPTCHA v3 lorsqu'il est configuré. Le navigateur ne décide jamais seul de la validité. Les réponses d'erreur restent génériques pour l'utilisateur tandis que les tests simulent les dépendances externes afin de couvrir les embranchements sans envoyer de vrais courriels.`,
        en: `The portfolio contact form uses a Next.js Server Action that revalidates data with Zod before calling Resend. I added several layers against unwanted submissions: a honeypot field, an elapsed-time check, a limit of five requests per hour per IP address, and reCAPTCHA v3 when configured. The browser never decides validity alone. Error responses remain generic for users, while tests simulate external dependencies to cover branches without sending real emails.`,
      },
      result: {
        fr: "La chaîne d'envoi a été validée par mes essais et dispose de tests sur la validation et les protections principales. Je conserve néanmoins une limite explicite : les services externes sont simulés dans les tests automatisés et méritent encore des scénarios d'intégration plus proches du déploiement réel.",
        en: "The delivery chain has been validated through my own trials and has tests for validation and the main protections. I retain an explicit limitation: external services are simulated in automated tests and still deserve integration scenarios closer to the real deployment.",
      },
      linkedRealisation: "portfolio-professionnel",
    },
  ],
  selfCritique: {
    level: {
      fr: "J'estime avoir un niveau intermédiaire. Je sais concevoir des modèles, des règles métier, des API et des intégrations dans plusieurs écosystèmes, puis les tester et les déployer. Mon expérience la plus profonde reste Odoo ; sur Symfony, l'architecture distribuée et les systèmes en temps réel à grande échelle, je manque encore de projets récents menés jusqu'à une forte charge de production.",
      en: "I assess myself as intermediate. I can design models, business rules, APIs, and integrations across several ecosystems, then test and deploy them. My deepest experience remains Odoo; with Symfony, distributed architecture, and large-scale real-time systems, I still lack recent projects carried through to heavy production load.",
    },
    importance: {
      fr: "Le backend relie ma spécialisation ERP à mon profil full-stack. Il me permet de ne pas traiter Odoo comme une application isolée : commandes B2B, logistique, courriels, données analytiques et interfaces publiques dépendent de contrats serveur fiables.",
      en: "Backend development connects my ERP specialization to my full-stack profile. It prevents me from treating Odoo as an isolated application: B2B orders, logistics, email, analytical data, and public interfaces depend on reliable server contracts.",
    },
    advice: {
      fr: "Je conseille de commencer une API par son contrat, ses acteurs et ses erreurs avant d'écrire le scénario nominal. Il faut savoir qui possède la donnée, quelles validations font autorité, comment l'appel peut être rejoué et quelle trace permettra de diagnostiquer un échec. Les contrôles d'interface complètent cette protection, mais ne remplacent jamais ceux du serveur.",
      en: "My advice is to start an API with its contract, actors, and errors before writing the happy path. It is necessary to know who owns the data, which validations are authoritative, how the call may be replayed, and what trace will diagnose a failure. Interface checks complement this protection but never replace server-side controls.",
    },
  },
  evolution: {
    goal: {
      fr: "Atteindre un niveau avancé en consolidant la conception d'API, les transactions, l'observabilité et les tests d'intégration, avec une capacité plus forte à comparer les architectures plutôt qu'à raisonner depuis un seul framework.",
      en: "Reach an advanced level by consolidating API design, transactions, observability, and integration testing, with a stronger ability to compare architectures rather than reason from a single framework.",
    },
    training: {
      fr: "Je poursuis la pratique de Symfony sur le B2B, l'approfondissement de PostgreSQL et la conception des intégrations JSON-2. Le projet de Business Intelligence connecté à Odoo doit aussi me faire travailler les pipelines de données, la reprise sur erreur et la séparation entre lecture analytique et transactions ERP.",
      en: "I continue practicing Symfony on the B2B platform, deepening PostgreSQL knowledge, and designing JSON-2 integrations. The Business Intelligence project connected to Odoo should also develop my skills in data pipelines, error recovery, and separating analytical reads from ERP transactions.",
    },
  },
  linkedRealisations: [
    "modules-metier-odoo",
    "app-trajectoires-de-vie",
    "portfolio-professionnel",
  ],
};
