import type { Realisation } from "./types";

export const portfolioProfessionnel: Realisation =
  {
    slug: "portfolio-professionnel",
    title: {
      fr: "Conception d'un portfolio professionnel",
      en: "Building a professional portfolio",
    },
    shortDescription: {
      fr: "Réalisation d'un portfolio complet avec Next.js, GSAP, i18n bilingue, conformité RGPD, analytics et blog technique.",
      en: "Building a complete portfolio with Next.js, GSAP, bilingual i18n, GDPR compliance, analytics, and a technical blog.",
    },
    context: { fr: "Projet personnel", en: "Personal project" },
    summary: {
      context: {
        fr: "Ce portfolio a été reconstruit pour répondre à la grille d'évaluation de la formation tout en donnant aux recruteurs une lecture claire du parcours et des réalisations.",
        en: "This portfolio was rebuilt to meet the training assessment rubric while giving recruiters a clear view of the journey and achievements.",
      },
      challenge: {
        fr: "Rendre un parcours et des projets techniques évaluables par un jury et lisibles par un recruteur sans réduire les preuves à une liste de technologies.",
        en: "Make a technical journey and projects assessable by a panel and readable by a recruiter without reducing evidence to a technology list.",
      },
      role: {
        fr: "J'en assure la conception, le développement, le design, la rédaction, les tests, le déploiement et la maintenance, avec une relecture humaine des contenus assistés.",
        en: "I handle its architecture, development, design, writing, testing, deployment, and maintenance, with human review of assisted content.",
      },
      decision: {
        fr: "Structurer le site autour de relations bidirectionnelles entre parcours, compétences, réalisations et preuves, avec une version française et anglaise.",
        en: "Structure the site around bidirectional links between experience, skills, achievements, and evidence, in French and English.",
      },
      result: {
        fr: "Le site relie parcours, compétences, réalisations et preuves dans une application bilingue, avec blog technique, gestion du consentement et navigation orientée vers l'évaluation.",
        en: "The site connects experience, skills, achievements, and evidence in a bilingual application with a technical blog, consent management, and assessment-oriented navigation.",
      },
      proof: {
        fr: "Le site publié, son historique Git, les pages de compétences et les contrôles automatisés constituent des éléments consultables pour vérifier cette réalisation.",
        en: "The published site, its Git history, the skill pages, and automated checks provide reviewable material for this achievement.",
      },
    },
    tags: ["Next.js", "React", "GSAP", "TypeScript", "Tailwind CSS", "MDX"],
    presentation: {
      fr: `J’ai commencé ce portfolio en mars 2026 pour présenter mon parcours dans le cadre du titre Expert en ingénierie du logiciel. Je voulais aussi qu’un recruteur puisse comprendre mon rôle dans un projet sans connaître Odoo, mon entreprise ou les critères de l’école. J’ai donc construit le site autour de **situations de travail documentées**, accessibles par le parcours, les compétences ou les réalisations.

**Un ancien portfolio devenu insuffisant.** Avant cette reconstruction, je possédais déjà un portfolio et une page de présentation sur GitHub. Une page de profil GitHub permet d'afficher une introduction, des liens et des dépôts de code sur la plateforme utilisée pour héberger des projets. Ces supports donnaient un premier aperçu de mon activité, mais ils ne correspondaient pas aux attentes des examinateurs du diplôme. Ils manquaient notamment du niveau de rédaction, de structuration et de mise en relation demandé entre compétences, expériences et réalisations.

**Faire apparaître mon objectif de devenir développeur confirmé et référent Odoo.** Ce positionnement est présenté à travers mes compétences, mes projets en cours et mes réalisations. Les articles consacrés à la migration d'Odoo, aux modules métier et aux intégrations montrent que je ne me limite pas à configurer un ERP. Ils expliquent comment j'analyse son code, adapte ses fonctions, automatise des processus, traite les retours des utilisateurs et prends en charge des changements structurants. L'ensemble doit rendre visible une progression vers un rôle de développeur confirmé et de référent capable d'accompagner les décisions autour d'Odoo.

Je prends en charge le design, le code, la rédaction et la maintenance. Le site est bilingue et contient aussi un blog technique destiné aux personnes qui rencontrent les mêmes problèmes que moi, par exemple lors d’une montée de version d’Odoo.`,
      en: `I started this portfolio in March 2026 to present my work for the Expert in Software Engineering qualification. I also wanted recruiters to understand my role in a project without prior knowledge of Odoo, my company or the school’s rubric. I built the site around **documented work examples**, which readers can reach through my career history, skills or achievements.

**A previous portfolio that had become insufficient.** Before this reconstruction, I already had a portfolio and a GitHub profile page. A GitHub profile page can display an introduction, links, and code repositories on the platform used to host projects. These materials provided an initial overview of my activity but did not match the qualification examiners' expectations. In particular, they lacked the required level of writing, structure, and relationships between skills, experience, and achievements.

**Showing my objective of becoming an experienced developer and Odoo specialist.** This positioning is presented through my skills, current projects, and achievements. Articles about Odoo migration, business modules, and integrations show that I do more than configure an ERP. They explain how I analyze its code, adapt functions, automate processes, handle user feedback, and take ownership of structural changes. Together, they should make my progress toward becoming an experienced developer and an Odoo specialist capable of supporting Odoo-related decisions visible.

I handle design, code, writing and maintenance. The bilingual site also includes a technical blog for people facing problems I have worked through, such as an Odoo upgrade.`,
    },
    objectives: {
      fr: `Le jury devait pouvoir trouver dix compétences, cinq réalisations et les étapes du parcours, puis relier une aptitude à un exemple concret et à un résultat. Pour un recruteur, l’enjeu était de comprendre rapidement mon profil et de choisir le dossier qui l’intéresse. J’ai prévu une synthèse au début de chaque étude de cas et des liens entre les fiches.

**Distinguer le périmètre d'évaluation des enrichissements personnels.** La traduction anglaise et le blog apportent une valeur professionnelle, mais pourraient être reportés sans rendre le portfolio non conforme à la grille française. Le bilinguisme élargit le lectorat et le blog démontre ma capacité à transmettre des solutions. J’ai donné la priorité aux fiches de compétences et de réalisations exigées par la grille. Cette distinction permet de prioriser sans abandonner les fonctions qui feront vivre le site après l'examen.

Le contenu devait rester compréhensible sur mobile, dans les deux langues et avec les animations réduites. Les articles techniques devaient garder leurs propres routes afin qu’un lecteur puisse suivre une analyse détaillée sans allonger les pages destinées à l’évaluation.`,
      en: `Assessors needed to find ten skills, five achievements and my career history, then connect each skill to an example and an outcome. Recruiters needed to understand my profile quickly and choose the project they wanted to explore. I added an opening summary to each case study and links between related pages.

**Separating assessment scope from personal enhancements.** English translation and the blog provide professional value but could be postponed without making the portfolio non-compliant with the French rubric. Bilingual delivery broadens readership and the blog demonstrates my ability to share solutions. neither should delay a mandatory skill article or incomplete achievement. This distinction supports prioritization without abandoning the functions that will keep the website alive after examination.

The content needed to remain understandable on mobile, in both languages and with reduced motion. Technical articles had their own pages so readers could explore detailed analysis without making the assessment pages longer.`,
    },
    risks: {
      fr: `Une liste de technologies peut masquer le partage réel du travail. À l’inverse, documenter chaque détail rend les décisions importantes difficiles à retrouver. J’ai séparé les faits, mon rôle et les résultats, puis demandé des retours pour vérifier que les lecteurs pouvaient remonter de l’affirmation à l’exemple.

**La publication accidentelle d'une information confidentielle.** Je prépare moi-même les preuves et peux donc commettre une erreur de censure ou oublier qu'un nom apparaît dans un arrière-plan, une URL, un journal ou une métadonnée. Montrer les éléments aux personnes concernées avant publication ajoute un second contrôle. Les extraits doivent aussi être vérifiés dans leur forme finale sur le site, car un fichier correctement censuré peut être accompagné d'une légende ou d'un texte révélant indirectement ce que l'image masque.

**Une première passe Codex pouvant déformer l'expérience.** L'assistance rédactionnelle peut mal retranscrire une réponse orale, remplacer un terme par une notion différente ou supprimer une nuance considérée à tort comme secondaire. Elle peut aussi produire une explication convaincante mais non conforme aux faits. Le texte généré ne constitue donc jamais une source. Mes réponses, les fichiers du projet, les preuves autorisées et ma relecture manuelle restent les références qui déterminent la version publiée.

**Un risque de non-conformité au RGPD avec les analytics.** Le Règlement général sur la protection des données, ou RGPD, encadre le traitement des données personnelles. Charger un outil de mesure avant le consentement, conserver un choix de manière ambiguë ou ne pas permettre un refus effectif créerait un risque juridique et éthique. Les scripts analytics doivent donc rester désactivés tant que la catégorie correspondante n'a pas été acceptée, tandis que les fonctions nécessaires comme la langue ou le thème peuvent fonctionner indépendamment.`,
      en: `A technology list can obscure who did the work. At the other extreme, documenting every detail can bury important decisions. I separated facts, my role and outcomes, then sought feedback on whether readers could trace each claim to an example.

**Accidental publication of confidential information.** I prepare evidence myself and can therefore make a redaction mistake or overlook a name in a background, URL, log, or metadata. Showing the material to the relevant people before publication adds a second check. Excerpts must also be reviewed in their final website form because a properly redacted file can be accompanied by a caption or text that indirectly reveals what the image hides.

**A Codex first draft capable of distorting experience.** Writing assistance may mistranscribe an oral answer, replace a term with a different concept, or remove a nuance incorrectly considered secondary. It can also produce a convincing explanation that does not match the facts. Generated text is therefore never a source. My answers, project files, approved evidence, and manual review remain the references that determine the published release.

**A GDPR non-compliance risk with analytics.** The General Data Protection Regulation, or GDPR, governs personal-data processing. Loading a measurement tool before consent, storing a choice ambiguously, or failing to provide an effective rejection would create legal and ethical risk. Analytics scripts must therefore remain disabled until the corresponding category is accepted, while necessary functions such as language or theme can operate independently.`,
    },
    steps: {
      fr: `**Détecter la langue dès l'arrivée sur le site.** Un proxy Next.js intercepte les requêtes qui ne contiennent pas encore de langue et les redirige vers l'adresse appropriée. Un proxy est une couche exécutée avant l'affichage d'une page. Il cherche d'abord le cookie NEXT_LOCALE, qui mémorise un choix antérieur, puis l'en-tête Accept-Language envoyé par le navigateur, et utilise le français par défaut si aucune préférence exploitable n'existe. Le sélecteur de langue remplace ensuite le premier segment de l'URL, conserve le reste du chemin et enregistre la préférence pendant un an.

**Séparer le chargement serveur et l'usage interactif des traductions.** Les textes d'interface sont centralisés dans deux dictionnaires JSON, un par langue. JSON est un format structuré composé de clés et de valeurs. Les composants exécutés sur le serveur chargent uniquement le dictionnaire demandé, tandis qu'un contexte React limité transmet aux composants interactifs les libellés dont ils ont besoin. Ce choix évite de recopier des textes dans chaque composant et impose de mettre à jour les deux dictionnaires lorsqu'une nouvelle clé est créée. Le layout localisé génère aussi l'attribut lang directement sur le serveur, avant l'hydratation, pour les lecteurs d'écran et les moteurs de recherche.

**Modéliser dix compétences comparables.** J'ai défini dix fiches divisées en compétences humaines et techniques. Chacune contient un niveau chiffré commun sur 100, un type, une définition, des anecdotes, une autocritique, une évolution et les réalisations associées. La page commune transforme les dix valeurs en graphique radar — chaque axe correspond à une compétence et la distance au centre représente son niveau relatif. Cette représentation ne prétend pas être une mesure scientifique. Elle permet surtout de comprendre immédiatement la place de chaque compétence par rapport aux autres.

**Transformer le parcours en frise antichronologique.** La section consacrée aux expériences présente d'abord les périodes qui se terminent le plus récemment, avec « Présent » en tête. Lorsque deux périodes finissent au même moment, la date de début la plus récente les départage. Chaque entrée fournit un premier niveau de lecture — période, poste ou diplôme, organisation et logo — puis les responsabilités, la description et les liens associés. Les logos d'établissements et d'entreprises peuvent pointer vers leur site. Une ligne verticale continue et un repère par entrée matérialisent cette chronologie sur mobile comme sur grand écran.

**Des liens contrôlés dans les deux sens.** Chaque fiche de compétence renvoie aux projets qui fournissent ses exemples. Chaque étude de cas met en avant trois compétences et renvoie aux autres fiches au niveau des passages qui les documentent. Un test compare les associations des deux côtés et vérifie que chacune s’appuie sur une anecdote. Les pages utilisent ces identifiants pour générer leurs liens dans les deux langues.

**Développer un formulaire validé dans le navigateur et sur le serveur.** Le formulaire de contact repose sur React Hook Form pour gérer les champs et sur Zod pour décrire les règles — longueur du nom et du message, adresse électronique valide, motif obligatoire et sujet libre lorsque l'option « autre » est choisie. La même règle est rejouée par une Server Action, une fonction Next.js exécutée sur le serveur. Cette double validation donne un retour rapide à l'utilisateur sans faire confiance aux données reçues par le serveur. Les valeurs sont échappées avant d'être insérées dans le courriel pour empêcher qu'un message soit interprété comme du code HTML.

**Créer moi-même le bandeau de consentement.** Je n'ai pas installé une plateforme externe — le composant propose « tout accepter », « tout refuser » et la gestion détaillée. Il distingue les cookies nécessaires au fonctionnement — langue et thème — de la mesure d'audience facultative. Le choix est enregistré localement et un événement prévient immédiatement le composant d'analytics. Google Tag Manager ou Google Analytics ne sont injectés qu'après accord pour cette catégorie, ce qui traduit techniquement le principe de consentement du RGPD, le règlement européen protégeant les données personnelles.

**Construire plusieurs niveaux de tests.** Vitest et React Testing Library vérifient notamment la sélection de langue, la validation du formulaire, le consentement et la réciprocité des liens. Le mode navigateur de Vitest utilise Chromium pour contrôler les comportements réels et certaines captures visuelles, notamment le formulaire, le bandeau de cookies et le sélecteur de langue. Playwright exécute des tests de bout en bout, ou E2E, qui parcourent l'application construite comme le ferait un visiteur. Cette combinaison couvre à la fois la logique rapide à tester et les parcours où plusieurs couches interagissent.`,
      en: `**Detecting language as soon as a visitor arrives.** A Next.js proxy intercepts requests that do not yet contain a language and redirects them to the appropriate address. A proxy is a layer executed before a page is displayed. It first checks the NEXT_LOCALE cookie, which remembers an earlier choice, then the Accept-Language header sent by the browser, and uses French by default if no usable preference exists. The language switcher then replaces the first URL segment, preserves the rest of the path, and stores the preference for one year.

**Separating server loading from interactive use of translations.** Interface copy is centralized in two JSON dictionaries, one per language. JSON is a structured key-value format. Components executed on the server load only the requested dictionary, while a limited React context passes interactive components only the labels they need. This choice avoids duplicating copy in every component and requires both dictionaries to be updated whenever a new key is created. The localized layout also emits the document's lang attribute on the server, before hydration, for screen readers and search engines.

**Modeling ten comparable skills.** I defined ten records split between human and technical skills. Each one contains a shared score out of 100, a type, definition, anecdotes, self-assessment, development plan, and related achievements. The listing page turns the ten values into a radar chart — each axis represents one skill and distance from the center represents its relative level. This representation is not intended as a scientific measurement. It mainly makes each skill's place in relation to the others immediately understandable.

**Turning the journey into a reverse-chronological timeline.** The experience section first shows periods that end most recently, with “Present” at the top. When two periods share an end date, the latest start date breaks the tie. Every entry provides an initial reading level—period, position or diploma, organization, and logo—then responsibilities, description, and related links. Institution and company logos can point to their websites. A continuous vertical line and one marker per entry materialize this chronology on mobile as well as on large screens.

**Links checked in both directions.** Each skill profile links to the projects that supply its examples. Each case study highlights three skills and links to additional profiles beside the passages that document them. A test compares associations from both sides and checks that each has a documented example. Pages use those identifiers to generate links in both languages.

**Developing a form validated in both browser and server.** The contact form uses React Hook Form to manage fields and Zod to describe rules — name and message length, valid email address, mandatory reason, and a custom subject when “other” is selected. The same schema is executed again by a Server Action, a Next.js function running on the server. This double validation provides fast feedback without trusting data received by the server. Values are escaped before insertion into email to prevent a message from being interpreted as HTML code.

**Building the consent banner myself.** I did not install an external consent platform — the component provides “accept all,” “reject all,” and detailed preference management. It distinguishes cookies necessary for operation—language and theme—from optional audience measurement. The choice is stored locally, and an event immediately informs the analytics component. Google Tag Manager or Google Analytics is inserted only after consent for that category, technically implementing the GDPR consent principle, the European regulation protecting personal data.

**Building several test levels.** Vitest and React Testing Library verify isolated functions and components — language rules, form, anti-spam, consent, search, navigation, and reciprocal links. Vitest browser mode uses Chromium to check real behavior and selected visual snapshots, including the form, cookie banner, and language switcher. Playwright runs end-to-end, or E2E, tests that navigate the built application like a visitor. This combination covers both logic that can be tested quickly and journeys in which several layers interact.`,
    },
    actors: {
      fr: `J’ai présenté plusieurs versions à mon coach pédagogique. Un retour m’a conduit à approfondir les exemples des compétences et des réalisations. Un autre m’a aidé à remonter le parcours sur l’accueil afin que le lecteur comprenne les étapes de mon évolution avant d’ouvrir les fiches.

**Les proches comme testeurs informels de l'interface.** Des proches ont également parcouru le site et vu certaines propositions réalisées dans Figma. Un testeur informel n'exécute pas un protocole écrit avec des mesures. Il utilise l'interface librement et exprime ce qu'il comprend, apprécie ou trouve perfectible. Leurs retours ont confirmé que le design général était convaincant et ont fait émerger des conseils d'amélioration de l'interface. Je n'attribue toutefois pas à ces échanges une précision qu'ils n'avaient pas. Il s'agissait de retours qualitatifs, pas d'une étude d'utilisabilité complète.

**Le directeur général comme autorité sur les preuves de l'entreprise.** Les captures d'écran, extraits ou informations issus des projets de mon employeur ne peuvent pas être publiés par ma seule décision. Je présente au directeur général le contenu que je souhaite utiliser, déjà anonymisé lorsque cela est nécessaire. Il peut l'autoriser, le refuser ou demander une modification. Ce contrôle protège les clients, les données internes, le code appartenant à l'entreprise et l'image de la société. Il délimite donc ce que je peux prouver publiquement sans remettre en cause la réalité du travail présenté.`,
      en: `I showed several versions to my learning coach. One round of feedback led me to develop the examples on the skill and achievement pages. Another helped me move the career section higher on the homepage so readers could follow my progression before opening individual pages.

**Relatives as informal interface testers.** Relatives also browsed the website and viewed proposals created in Figma. An informal tester does not follow a written protocol with measurements — they use the interface freely and explain what they understand, appreciate, or consider improvable. Their feedback confirmed that the overall design was convincing and surfaced suggestions for interface improvement. I do not give these discussions a level of precision they did not have — they were qualitative observations, not a full usability study.

**The CEO as authority over company evidence.** Screenshots, excerpts, or information from my employer's projects cannot be published on my decision alone. I show the CEO exactly what I intend to use, already anonymized where necessary. They can approve it, reject it, or request a change. This control protects customers, internal data, company-owned code, and the organization's image. It defines what I can prove publicly without undermining the reality of the work presented.`,
    },
    results: {
      fr: `Le site réunit dix fiches de compétences, cinq études de cas, six articles publiés et les détails de mon parcours. Les exemples de mes fiches renvoient aux projets correspondants et chaque étude présente les compétences principales que j’y ai mobilisées. Le site lui-même permet de vérifier ce parcours de lecture.

**Un audit daté qui a révélé un défaut précis.** Le 16 juillet 2026, j’ai audité 100 URL en simulation mobile avec Lighthouse. À cette date, 98 pages atteignaient au moins 90 en performance et la médiane était de 96. Les deux versions de CAP2vie obtenaient 57. Les lecteurs vidéo chargés d’emblée étaient une cause importante du ralentissement. L’audit a orienté le remplacement par des aperçus qui chargent le lecteur après interaction. Ces chiffres décrivent l’ancienne version mesurée et restent un point de comparaison pour un nouvel essai.

**Une chaîne de contact essayée de bout en bout.** Lors des vérifications rapportées pendant le développement, les messages d’essai ont traversé le formulaire, la validation serveur et Resend jusqu’à la boîte destinataire. Cet essai confirme la faisabilité du parcours dans l’environnement utilisé. La réception d’une demande réelle et la configuration finale de l’hébergement doivent être vérifiées séparément lors d’une nouvelle remise.

**Un apprentissage technique marqué par l'accessibilité et la conformité.** Le projet m'a fait travailler des sujets que j'avais moins approfondis auparavant — consentement, protection des données, sémantique des pages, préférences de mouvement, navigation au clavier, métadonnées et politiques de sécurité. Cette progression dépasse l'intégration graphique. Elle m'a appris à considérer un site comme un produit destiné à de vrais visiteurs, avec des responsabilités qui commencent avant le développement et continuent après la mise en ligne.

L’évaluation a reconnu la structure du site et la qualité des exemples. À partir de ces retours, j’ai travaillé sur la concision des études de cas, la précision des plans d’apprentissage et la manière d’illustrer mes valeurs par des décisions d’ingénierie.`,
      en: `The site contains ten skill profiles, five case studies, six published articles and a detailed career history. Examples on the skill pages link to the associated projects, and each case study highlights the main skills I used. The site itself demonstrates this reading path.

**A dated audit that surfaced a specific issue.** On July 16, 2026, I audited 100 URLs with Lighthouse in mobile simulation. At the time, 98 pages scored at least 90 for performance, and the median was 96. Both CAP2vie pages scored 57. Video players loaded upfront were a major source of the slowdown. The audit guided the move to preview images that load the player after interaction. The figures describe the version tested at the time and provide a baseline for a new run.

**An end-to-end contact check.** In the checks recorded during development, test messages went through the form, server validation and Resend before reaching the destination inbox. That test confirms the flow worked in the environment used at the time. Real inquiries and final hosting configuration need their own check when preparing a new submission.

**Technical learning centered on accessibility and compliance.** The project made me work on topics I had explored less thoroughly before — consent, data protection, page semantics, motion preferences, keyboard navigation, metadata, and security policies. This progress goes beyond graphical integration. It taught me to treat a website as a product for real visitors, with responsibilities beginning before development and continuing after launch.

The assessment recognized the site’s structure and the quality of the examples. I used that feedback to make the case studies more concise, give my learning plans more detail and show my values through engineering decisions.`,
    },
    aftermath: {
      fr: `**Faire relire le dossier par deux publics.** Pour une prochaine remise, je demanderais au coach pédagogique de vérifier l’alignement avec la grille. Je proposerais ensuite à une personne qui ne connaît ni Odoo ni mon parcours de lire une étude, puis de résumer le problème, ma contribution et le résultat en indiquant où elle a trouvé la preuve. Les deux lectures permettraient de repérer un critère manquant ou un passage dont le sens dépend encore d’une explication orale.

**Des formulations datées à réexaminer régulièrement.** Les versions d'Odoo, le nombre d'articles, mon niveau déclaré, mes objectifs et les expressions comme « actuellement » peuvent rapidement devenir incorrects. Lors de chaque évolution, je devrai rechercher ces informations dans les versions française et anglaise, mettre à jour les relations concernées et rejouer les tests. Le bilinguisme impose en particulier de ne pas actualiser une seule langue.

**Vérifier l’effet du chargement différé.** Je rejouerais l’audit sous les mêmes conditions que le relevé de juillet, sur les deux pages CAP2vie et sur une page témoin. Je comparerais le temps d’affichage du contenu principal et vérifierais dans les requêtes du navigateur que le lecteur ne se charge qu’après consentement et interaction. Ce contrôle permettrait d’attribuer plus précisément le gain à la modification des vidéos et de repérer un éventuel effet sur les autres pages.`,
      en: `**Asking two audiences to review the work.** For a future submission, I would ask the learning coach to check the work against the rubric. I would then ask someone unfamiliar with Odoo and my background to read one case study and summarize the problem, my contribution and the result, pointing out where they found the evidence. Together these reviews could identify a missed criterion or a passage that still depends on oral explanation.

**Dated wording to review regularly.** Odoo versions, article counts, my declared level, objectives, and expressions such as “currently” can quickly become inaccurate. With every change, I will need to locate this information in both French and English releases, update related relationships, and rerun tests. Bilingual delivery particularly requires avoiding an update in only one language.

**Checking the effect of deferred loading.** I would repeat the audit under the same conditions as the July baseline for both CAP2vie pages and a comparison page. I would compare when the main content appears and inspect browser requests to confirm that the player loads only after consent and interaction. This would help isolate the effect of the video change and surface possible regressions elsewhere.`,
    },
    critique: {
      fr: `En voulant répondre à tous les critères, j’avais rédigé des articles beaucoup trop longs. Le jury y retrouvait le fond, mais il devait parcourir de nombreuses explications pour isoler une décision et son effet. J’ai appris à proposer un résumé, puis à choisir les faits qui permettent de vérifier la contribution annoncée.

**Avoir voulu animer le site trop tôt.** Ma principale erreur a été de commencer les animations avant d'avoir stabilisé le contenu et la structure des pages. Une animation donne rapidement l'impression d'avancer parce que son résultat est visible, mais elle dépend de la taille des blocs, de leur ordre et du message qu'ils portent. Lorsque ces éléments changent ensuite, l'effet doit être ajusté ou supprimé. J'ai donc investi du temps dans une couche de finition alors que la matière qu'elle devait accompagner n'était pas encore suffisamment définie.

**Une couverture d'intégration encore à renforcer.** Un test d'intégration vérifie que plusieurs parties réelles du système fonctionnent ensemble, par exemple le formulaire, l'action serveur, la protection anti-spam et le service d'envoi. Le projet possède des tests unitaires, des tests de composants et des parcours de bout en bout, mais les dépendances externes sont souvent simulées. Resend, reCAPTCHA et la limitation de débit sont remplacés par des mocks, c'est-à-dire des versions contrôlées pour les tests. Il manque donc des scénarios dédiés validant plus fidèlement les frontières entre l'application déployée et ses services.

Lors d’une prochaine révision, je demanderais plus tôt à une personne qui ne connaît pas mes projets de lire une fiche et de me restituer mon rôle, le résultat et sa preuve. Les tests automatisés vérifient le site et ses liens. Cette lecture humaine permettrait de vérifier la compréhension, critère qui guidait le projet depuis le départ.`,
      en: `In trying to address every criterion, I wrote case studies that were much too long. The assessor found the substance but had to read through many explanations to isolate a decision and its effect. I learned to offer a summary first and choose the facts that substantiate the contribution I describe.

**Trying to animate the website too early.** My main mistake was starting animation before stabilizing page content and structure. Animation quickly creates a sense of progress because its result is visible, but it depends on block size, order, and message. When those elements change later, the effect must be adjusted or removed. I therefore invested time in a finishing layer while the material it was meant to support remained insufficiently defined.

**Integration coverage still to strengthen.** An integration test verifies that several real parts of a system work together, such as the form, server action, anti-spam protection, and delivery service. The project has unit, component, and end-to-end tests, but external dependencies are often simulated. Resend, reCAPTCHA, and rate limiting are replaced with mocks, meaning controlled test versions. Dedicated scenarios validating the boundaries between the deployed application and its services more faithfully are therefore still missing.

For the next revision, I would ask someone unfamiliar with my projects to read a case study earlier and explain back my role, the outcome and its evidence. Automated tests check the site and its links. A reader can help check understanding, which was one of the goals from the start.`,
    },
    linkedCompetences: [
      "developpement-frontend",
      "amelioration-continue",
      "devops",
    ],
    contextualCompetences: { steps: ["developpement-backend"] },
  };
