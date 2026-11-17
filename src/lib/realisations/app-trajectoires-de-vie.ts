import type { Realisation } from "./types";

export const appTrajectoiresDeVie: Realisation =
  {
    slug: "app-trajectoires-de-vie",
    title: {
      fr: "Développement d'une application web de trajectoires de vie",
      en: "Development of a web application for mapping life trajectories",
    },
    shortDescription: {
      fr: "Conception d'une application de questionnaire sociologique avec visualisation de données D3.js sur mesure au Laboratoire d'Informatique de Grenoble.",
      en: "Design of a sociological questionnaire application with custom D3.js data visualization at the Grenoble Computer Science Laboratory.",
    },
    context: { fr: "Stage (recherche universitaire)", en: "Internship (university research)" },
    summary: {
      context: {
        fr: "Lors d'un stage de cinq mois au Laboratoire d'Informatique de Grenoble, il fallait transformer un besoin de recherche sociologique en application interactive de trajectoires de vie.",
        en: "During a five-month internship at the Grenoble Computer Science Laboratory, a sociological research need had to be turned into an interactive life-trajectories application.",
      },
      challenge: {
        fr: "Rendre des récits de vie complexes saisissables et visualisables sans perdre les dates, les incertitudes ni la cohérence scientifique des données.",
        en: "Make complex life narratives recordable and visualizable without losing dates, uncertainty, or the scientific consistency of the data.",
      },
      role: {
        fr: "J'ai conçu et développé le premier système interactif, du questionnaire et des données jusqu'à la visualisation D3.js, avec l'encadrement scientifique de la chercheuse.",
        en: "I designed and developed the first interactive system, from the questionnaire and data through the D3.js visualization, with the researcher's scientific guidance.",
      },
      decision: {
        fr: "Construire une visualisation D3.js sur mesure et une gestion explicite des conflits temporels plutôt que de simplifier les cas ambigus.",
        en: "Build a custom D3.js visualization and explicit temporal-conflict handling instead of simplifying ambiguous cases.",
      },
      result: {
        fr: "CAP2vie rend les parcours compréhensibles par une visualisation sur mesure qui conserve leur évolution chronologique et les relations entre leurs dimensions.",
        en: "CAP2vie makes life paths understandable through a custom visualization that preserves their chronological evolution and relationships between dimensions.",
      },
      proof: {
        fr: "Les captures de l'application et l'expérience de stage associée donnent à voir le prototype et son contexte de recherche.",
        en: "Application screenshots and the linked internship experience make the prototype and its research context visible.",
      },
    },
    tags: ["Vue.js", "JavaScript", "D3.js", "PostgreSQL", "Recherche"],
    presentation: {
      fr: `Pendant un stage de cinq mois au **Laboratoire d’informatique de Grenoble**, j’ai participé à CAP2vie, un prototype pour les entretiens sociologiques. L’enquêteur saisit les événements racontés et la personne interrogée peut voir comment ils se placent dans sa trajectoire. La visualisation donne un support pour relire le récit et corriger les dates pendant l’entretien.

**Le remplacement d'un recueil principalement effectué sur papier.** Avant l'application, les informations étaient recueillies au moyen de formulaires papier. Ce support permet de conduire une enquête, mais il devient difficile à maintenir lorsque les questions évoluent et complexe à analyser lorsque plusieurs trajectoires doivent être rapprochées. Les réponses doivent être relues, retranscrites et restructurées avant de pouvoir alimenter une visualisation ou une comparaison. Le projet cherchait donc à numériser le recueil dès l'entretien et à produire une représentation organisée au fur et à mesure, sans attendre une reprise manuelle complète après chaque enquête.

**Deux rôles complémentaires dans le même entretien.** L'enquêteur était le sociologue chargé de poser les questions selon sa méthodologie et d'enregistrer les éléments utiles. La personne enquêtée répondait aux questions portant sur son histoire. Cette séparation était matérialisée dans l'application par des interfaces adaptées aux deux rôles. L'enquêteur avait besoin des commandes permettant de conduire et structurer le recueil, tandis que la personne interrogée devait pouvoir comprendre la représentation de son parcours sans accéder aux fonctions de gestion de l'enquête.

Nous étions trois développeurs stagiaires, encadrés par une professeure-chercheuse. J’ai pris en charge la visualisation D3.js, une partie du back-end et la synchronisation des écrans. Mes collègues ont travaillé principalement sur le questionnaire et la base de données.`,
      en: `During a five-month internship at the **Grenoble Computer Science Laboratory**, I worked on CAP2vie, a prototype for sociological interviews. The interviewer enters reported events, and the participant can see where they sit along their life trajectory. The visualization gives them a shared way to review the account and correct dates during the interview.

**Replacing data collection performed mainly on paper.** Before the application, information was gathered through paper forms. This medium supports an interview, but becomes difficult to maintain when questions evolve and complex to analyze when several trajectories must be compared. Answers have to be reread, transcribed, and restructured before they can feed a visualization or comparison. The project therefore sought to digitize data collection during the interview and produce an organized representation progressively, without waiting for a complete manual re-entry after every survey.

**Two complementary roles within the same interview.** The interviewer was the sociologist responsible for asking questions according to their methodology and recording relevant information. The participant answered questions about their history. This separation was represented in the application through interfaces suited to both roles. The interviewer needed controls for conducting and structuring data collection, while the participant needed to understand the representation of their path without accessing survey-management functions.

Three student developers worked under the guidance of a researcher. I handled the D3.js visualization, part of the backend and screen synchronization. My colleagues focused primarily on the questionnaire and database.`,
    },
    objectives: {
      fr: `**Partir d'un questionnaire défini par les chercheurs.** Le prototype utilisait un ensemble de questions fourni pour l'expérimentation. Les sociologues ne devaient pas encore créer, modifier ou versionner eux-mêmes leurs questionnaires dans l'application. Un questionnaire dynamique aurait nécessité une interface d'administration, la gestion de plusieurs types de champs et des règles permettant de faire évoluer un formulaire sans rendre les anciennes réponses incompatibles. Cette fonction était pertinente pour une version future, mais elle n'était pas nécessaire pour vérifier le principe central pendant les cinq mois.

**Représenter les dimensions séparément et simultanément.** La visualisation devait proposer plusieurs lectures. Les dimensions comme les études, le travail, la famille, les relations ou les lieux d'habitation pouvaient être consultées séparément afin de rendre chaque parcours lisible. Elles pouvaient aussi être superposées ou rapprochées dans une vue commune pour observer des événements simultanés. Cette double lecture permettait de comprendre chaque domaine de la vie, puis de rapprocher des événements survenus au même moment.

Le périmètre a évolué quand les chercheurs ont demandé un deuxième écran pour que la personne interrogée suive la trajectoire en direct. La saisie de l’enquêteur devait pouvoir continuer si cet écran se déconnectait. Le stage devait déboucher sur un prototype utilisable en démonstration et suffisamment documenté pour être repris.`,
      en: `**Starting from a questionnaire defined by the researchers.** The prototype used a set of questions provided for the experiment. Sociologists were not yet expected to create, modify, or version their own questionnaires within the application. A dynamic questionnaire would have required an administration interface, management of multiple field types, and rules allowing a form to evolve without making previous answers incompatible. This feature was relevant to a future release, but was not needed to verify the central principle during the five months.

**Representing dimensions separately and simultaneously.** The visualization had to provide several readings. Dimensions such as education, work, family, relationships, or places of residence could be viewed separately to keep each path readable. They could also be overlaid or brought together in a shared view to observe simultaneous events. This dual reading addressed the sociological need — understand every area of life and then look for temporal relationships between several areas without confusing them.

The scope changed when researchers asked for a second screen so the participant could follow the trajectory live. The interviewer needed to keep entering responses if that screen disconnected. The internship was meant to produce a demonstrable prototype with enough documentation for another developer to take over.`,
    },
    risks: {
      fr: `Le principal risque était d’afficher un résultat convaincant à l’œil, mais trompeur pour l’enquête. Une date estimée traitée comme certaine ou des intervalles reliés automatiquement pouvaient changer l’interprétation du récit. Les cas ambigus devaient donc être discutés avec les chercheurs et testés avec des exemples d’entretiens.

**Une expérience de formulaire pouvant perturber l'entretien.** Un formulaire trop lent, trop rigide ou difficile à corriger pouvait détourner l'attention de l'enquêteur et casser le rythme de la conversation. Il pouvait aussi encourager une saisie incomplète simplement parce qu'un champ était mal compris. Les démonstrations et itérations avec les sociologues permettaient de confronter l'interface à leur manière réelle de poser les questions. Le contrôle ne se limitait pas à vérifier qu'un bouton fonctionnait. Il fallait s'assurer que l'outil restait compatible avec leur pratique d'enquête.

Le deuxième écran introduisait un risque de divergence entre les réponses enregistrées et le graphique affiché. Le prototype visait un usage local contrôlé. Les récits pouvant contenir des informations sensibles, une utilisation sur le terrain aurait nécessité des contrôles supplémentaires, dont une gestion plus complète des accès et de l’anonymisation.

**Des fonctions d'accès encore limitées par le périmètre.** La gestion complète de plusieurs enquêtes, de plusieurs personnes et de leurs autorisations était envisagée, mais ne constituait pas l'objet du prototype. Le fonctionnement local réduisait l'exposition pendant la démonstration sans remplacer une véritable politique d'accès. Une version déployée devrait authentifier les utilisateurs, séparer les études et limiter chaque chercheur aux données autorisées. Repousser ces fonctions était acceptable pour une preuve de concept, mais incompatible avec une collecte réelle à grande échelle.`,
      en: `The main risk was a chart that looked convincing but misrepresented the interview. Treating an estimate as an exact date or automatically connecting intervals could change the interpretation of the account. Ambiguous cases needed to be reviewed with researchers and tested using interview examples.

**A form experience capable of disrupting the interview.** A slow, rigid, or difficult-to-correct form could distract the interviewer and break the conversation's rhythm. It could also encourage incomplete entry simply because a field was misunderstood. Demonstrations and iterations with sociologists tested the interface against their actual questioning practice. Control went beyond checking that a button worked — the tool had to remain compatible with their interview methods.

The second screen brought a risk that recorded responses and the displayed chart could fall out of sync. The prototype was designed for controlled local use. Because life stories can contain sensitive information, field deployment would have required additional safeguards, including more complete access controls and anonymization.

**Access features still limited by scope.** Complete management of multiple surveys, multiple people, and their permissions was considered, but was not the purpose of the prototype. Local operation reduced exposure during demonstrations without replacing a genuine access policy. A deployed release should authenticate users, separate studies, and limit each researcher to authorized data. Postponing these features was acceptable for a proof of concept, but incompatible with large-scale real data collection.`,
    },
    steps: {
      fr: `**Modéliser les données avec PostgreSQL et Prisma.** PostgreSQL a été choisi comme base de données relationnelle parce que les informations formaient des entités liées entre elles et que cette technologie était connue par l'équipe. Une base relationnelle organise les données dans des tables associées au moyen d'identifiants. Prisma jouait le rôle d'ORM, ou outil de correspondance objet-relationnel — il permettait de décrire les modèles dans le code, de créer la structure de la base et de manipuler les enregistrements sans écrire chaque requête SQL manuellement. Cette combinaison simplifiait l'installation du prototype et la compréhension du modèle.

**Construire un formulaire unique organisé avec un stepper.** Le questionnaire occupait une page, mais il était découpé en étapes successives au moyen d'un stepper. Un stepper est un composant qui guide l'utilisateur à travers plusieurs sections tout en indiquant sa progression. Chaque étape pouvait correspondre à une dimension de la trajectoire. Cette organisation évitait d'afficher toutes les questions en même temps et permettait à l'enquêteur de se concentrer sur un domaine avant de passer au suivant.

**Adapter les questions aux réponses précédentes.** Le questionnaire était dynamique. Pour la trajectoire professionnelle, il pouvait demander si la personne avait occupé un emploi, puis afficher les questions sur l'emploi et sa période seulement lorsque la réponse le justifiait. À la fin de cette saisie, il demandait si un autre emploi devait être ajouté et répétait la séquence si nécessaire. Cette logique conditionnelle permettait de recueillir un nombre variable d'événements sans imposer des champs inutiles à une personne dont le parcours était différent.

**Construire des périodes à partir de dates exactes ou estimées.** La date de début et la date de fin constituaient les informations centrales transmises au graphique. Lorsqu'une date exacte n'était pas connue, nous appliquions une règle cohérente avec la méthode d'enquête. Une date de début manquante pouvait reprendre la fin de l'événement précédent dans la même dimension. Une date de fin inconnue pouvait être prolongée jusqu'au début de l'événement suivant. Cette estimation produisait une continuité exploitable, tout en laissant à l'enquêteur et à l'enquêté la possibilité de corriger les bornes si leur échange apportait une information plus précise.

**Construire le graphique avec les primitives de D3.js.** Nous avons utilisé des éléments SVG, des axes et des échelles temporelles. SVG est un format graphique vectoriel intégré aux pages Web. Ses formes restent nettes lorsqu'elles sont redimensionnées. Une échelle temporelle convertit une date en une position horizontale ou verticale dans l'espace disponible, tandis qu'un axe fournit les repères permettant de lire cette position. D3.js nous évitait de réimplémenter ces calculs de base, tout en nous laissant composer une représentation qui n'existait pas dans une bibliothèque de graphiques prêts à l'emploi.

**Faire remonter une correction du graphique.** La première architecture allait du formulaire au graphique. La modification directe a imposé le trajet inverse. Une correction de période à l’écran devait mettre à jour la réponse, puis recalculer la trajectoire. J’ai séparé l’état de la trajectoire de son rendu SVG pour que les deux interfaces restent cohérentes. C’est la partie que j’ai le plus retravaillée, car une correction visible uniquement sur le graphique aurait laissé une information différente dans le questionnaire.

Pour le deuxième écran, j’ai ajouté des salons Socket.io associés aux entretiens. L’enquêteur pouvait lancer la session et l’autre écran recevait les mises à jour de la trajectoire. La reprise après déconnexion restait manuelle dans le prototype.

**Synchroniser uniquement l'état nécessaire au second écran.** L'enquêteur conservait le formulaire et sa propre représentation graphique. L'enquêté ne recevait que les données nécessaires à l'affichage de sa trajectoire. Lorsqu'une réponse ou une date modifiait le graphique, l’état correspondant était envoyé au salon Socket.io puis appliqué sur l'écran secondaire. Limiter les données échangées à ce besoin rendait le flux plus simple et empêchait l'interface de l'enquêté d'exposer les commandes réservées à la conduite de l'enquête.`,
      en: `**Modeling data with PostgreSQL and Prisma.** PostgreSQL was selected as a relational database because the information formed linked entities and the technology was familiar to the team. A relational database organizes data in tables associated through identifiers. Prisma acted as the ORM, or object-relational mapping tool — it allowed us to describe models in code, create the database structure, and manipulate records without writing every SQL query manually. This combination simplified prototype setup and understanding of the model.

**Building a single form organized with a stepper.** The questionnaire occupied one page, but was divided into successive stages through a stepper. A stepper is a component that guides a user through several sections while indicating progress. Each stage could correspond to a trajectory dimension. This organization avoided displaying every question at once and allowed the interviewer to focus on one area before moving to the next.

**Adapting questions to previous answers.** The questionnaire was dynamic. For the professional trajectory, it could ask whether the person had held a job, then display questions about that job and its period only when the answer justified them. At the end of this entry, it asked whether another job should be added and repeated the sequence when necessary. This conditional logic allowed a variable number of events to be collected without imposing irrelevant fields on a person whose path was different.

**Building periods from exact or estimated dates.** Start and end dates were the central information sent to the chart. When an exact date was unknown, we applied a rule consistent with the survey method. A missing start date could reuse the end of the previous event in the same dimension. an unknown end date could extend to the beginning of the next event. This estimate produced usable continuity while leaving the interviewer and participant able to correct the boundaries when their conversation provided more precise information.

**Building the chart with D3.js primitives.** We used SVG elements, axes, and time scales. SVG is a vector graphics format integrated into web pages. Its shapes remain sharp when resized. A time scale converts a date into a horizontal or vertical position within the available space, while an axis provides markers for reading that position. D3.js prevented us from reimplementing these basic calculations while leaving us free to compose a representation unavailable in a ready-made charting library.

**Sending chart edits back to the form.** The first architecture ran from the form to the chart. Direct editing required a path in the opposite direction. A period edited on screen had to update the response and recalculate the trajectory. I separated the trajectory state from its SVG rendering so both interfaces stayed consistent. I spent most time reworking this link because a change visible only on the chart would have left a different answer in the questionnaire.

For the second screen, I added Socket.io rooms associated with interview sessions. The interviewer could start a session and the other screen received trajectory updates. Rejoining after disconnection remained a manual step in the prototype.

**Synchronizing only the state required by the second screen.** The interviewer retained the form and their own chart. The participant received only the data required to display their trajectory. When an answer or date changed the chart, the corresponding state was sent to the room and applied on the secondary screen. Limiting exchanged data to this need simplified the flow and prevented the participant interface from exposing controls reserved for conducting the interview.`,
    },
    actors: {
      fr: `La professeure-chercheuse a traduit les besoins scientifiques en scénarios et arbitré les règles de représentation avec les chercheurs impliqués. Les stagiaires se répartissaient le développement et relisaient le code avant de fusionner les modifications. Les revues hebdomadaires nous donnaient un cadre pour montrer les écarts entre ce que nous avions compris et ce que nécessitait l’entretien.

**Des revues de code avant chaque fusion.** Nous relisions les changements avant de les intégrer à la branche commune. Une revue de code consiste à examiner la proposition d'un autre développeur afin de repérer une erreur, vérifier sa lisibilité et s'assurer qu'elle respecte le fonctionnement attendu. J'effectuais la majorité de ces revues et décidais le plus souvent si les modifications pouvaient rejoindre la branche principale. Cette responsabilité faisait de moi un point de contrôle technique de fait, même si aucun rôle officiel de lead developer ne m'avait été attribué.

**Des validations réalisées par simulation.** Pendant le stage, nous n'avons pas participé à de véritables entretiens avec des personnes enquêtées. Les tests d'usage étaient réalisés sous forme de simulations avec les chercheurs. Cette méthode permettait de vérifier le parcours, les questions et les réactions du graphique sans engager immédiatement des données réelles. Elle constituait cependant une limite. Un entretien de recherche réel peut faire apparaître des hésitations, des récits imprévus et des contraintes de terrain qu'une simulation entre personnes connaissant déjà l'outil reproduit imparfaitement.

La passation a duré deux semaines. Nous avons montré le parcours complet, documenté l’installation et expliqué les zones à retravailler. Le développeur suivant a pu installer l’application, ce qui a permis de vérifier une première partie de la documentation de reprise.`,
      en: `The supervising researcher translated scientific requirements into scenarios and worked with the other researchers to decide how the chart should represent events. We divided development work among the interns and reviewed code before merging. Weekly reviews helped us surface differences between our interpretation and what the interview process needed.

**Code reviews before every merge.** We reviewed changes before integrating them into the shared branch. A code review involves examining another developer's proposal to identify an error, check readability, and ensure it respects expected behavior. I performed most of these reviews and usually decided whether changes could join the main branch. This responsibility made me a de facto technical checkpoint even though I had not been assigned an official lead-developer role.

**Validation performed through simulation.** During the internship, we did not participate in actual interviews with survey participants. Usage tests were conducted as simulations with researchers. This method allowed the interview flow, questions, and chart reactions to be verified without immediately involving real data. It was nevertheless a limitation — an actual research interview may reveal hesitation, unexpected accounts, and field constraints that a simulation between people already familiar with the tool reproduces imperfectly.

The handover lasted two weeks. We demonstrated the full workflow, documented installation and explained which areas needed more work. The incoming developer installed the application, giving us a first check of the handover instructions.`,
    },
    results: {
      fr: `Le prototype permettait de remplir le questionnaire, d’afficher les **cinq dimensions** avec deux modes de lecture et de corriger une réponse depuis le formulaire ou le graphique. La synchronisation a été démontrée sur deux écrans. Les captures illustrent ces usages. Les chercheurs ont pu réagir à une version qui fonctionnait de bout en bout dans des simulations.

**Une vingtaine de questions principales complétées par des séquences répétables.** Le questionnaire comportait plus de vingt questions de base. Ce nombre ne représentait pas la longueur maximale d'un entretien, car certains groupes pouvaient boucler selon les réponses. La trajectoire professionnelle demandait par exemple de décrire un emploi, puis proposait d'en ajouter un autre. Une personne ayant occupé plusieurs postes générait donc plusieurs occurrences de la même séquence. Le prototype pouvait adapter la collecte à la richesse du parcours au lieu d'imposer un nombre fixe d'événements.

**Des défauts encore connus dans la synchronisation.** La livraison n'était pas exempte de bugs. La synchronisation des données graphiques n'était pas encore parfaite et certains enchaînements pouvaient produire un retard ou un état incohérent entre les écrans. Ce constat reste compatible avec l'objectif de preuve de concept, mais empêche de considérer la communication en temps réel comme prête pour un usage de terrain sans surveillance. Le résultat est donc une interconnexion démontrée, accompagnée d'un besoin de stabilisation clairement identifié pour la suite.

**Les tests disponibles à la remise.** Tous les tests écrits réussissaient à la remise. Ils couvraient des comportements ciblés du formulaire, du graphique et de la synchronisation. Il restait à tester plus systématiquement l’arrivée tardive du deuxième écran et la reconnexion après une correction effectuée pendant la coupure. Ces scénarios auraient permis de vérifier que les deux écrans retrouvaient le même état.

**Des preuves visibles déjà intégrées au portfolio.** La page présente déjà des captures du choix de profil, des interfaces locales et du parcours de création d'une enquête. Ces éléments permettent d'observer l'existence du prototype et son fonctionnement général sans exposer les données réelles d'une personne interrogée. Les textes détaillent également les choix techniques et la contribution personnelle. Je limite les preuves à ce qui peut être publié — certains éléments du projet, du code et des évolutions postérieures restent confidentiels.`,
      en: `The prototype supported completing the questionnaire, displaying **five dimensions** in two views and correcting a response in either the form or the chart. Synchronization was demonstrated on two screens. The screenshots illustrate these workflows. Researchers could review an end-to-end version in simulated interviews.

**Approximately twenty main questions supplemented by repeatable sequences.** The questionnaire contained more than twenty core questions. This number did not represent the maximum interview length because some groups could loop according to answers. The professional trajectory, for example, asked for a job description and then offered the option to add another. A person who had held several positions therefore generated multiple occurrences of the same sequence. The prototype could adapt collection to the richness of a path instead of imposing a fixed number of events.

**Known defects remaining in synchronization.** Delivery was not bug-free. Graphical data synchronization was not yet perfect, and some sequences could produce a delay or inconsistent state between screens. This finding remained compatible with the proof-of-concept objective, but prevented real-time communication from being considered ready for unsupervised field use. The result is therefore a demonstrated interconnection accompanied by a clearly identified need for stabilization.

**The checks available at handover.** All tests written by handover passed. They covered selected behavior in the form, chart and synchronization. We still needed more systematic checks for a late second screen joining and for reconnection after an edit during a drop. These scenarios would have helped verify that both screens returned to the same state.

**Visible evidence already included in the portfolio.** The page already presents screenshots of profile selection, local interfaces, and the survey-creation journey. These elements show that the prototype existed and illustrate its general behavior without exposing actual participant data. Detailed text also explains technical choices and personal contribution. I limit evidence to what can be published — some project elements, code, and later developments remain confidential.`,
    },
    aftermath: {
      fr: `La priorité de la reprise était de sécuriser la synchronisation lors d’une arrivée tardive ou d’une reconnexion. Les évolutions envisagées couvraient ensuite les droits d’accès, l’anonymisation et l’export des données, avant de pouvoir juger l’outil dans des conditions de recherche réelles.

**Une anonymisation automatique prévue dans la suite.** L'application devait finir par prendre elle-même en charge l'anonymisation des données recueillies. Cette fonction aurait permis de dissocier les informations d'identité des réponses destinées à l'analyse selon une procédure reproductible. Elle devait cependant être conçue avec les chercheurs — supprimer uniquement le nom et le prénom ne garantit pas qu'une trajectoire très particulière ne puisse pas être reconnue. La version future devait donc définir les champs concernés, le moment de la transformation et les personnes autorisées à consulter les informations avant anonymisation.

**Un export CSV comme sortie envisagée.** Le format prévu pour extraire les données était le CSV. Un fichier CSV organise les informations sous forme de lignes et de colonnes séparées par un caractère, ce qui permet de l'ouvrir avec un tableur ou de l'importer dans un logiciel d'analyse. L'export devait préserver les dimensions, les dates et les événements dans une structure compréhensible. La plateforme de destination exacte n'était pas encore connue, ce qui imposait de définir un format suffisamment documenté pour rester exploitable par plusieurs outils.

La passation et l’installation du prototype sont des résultats de mon stage. Je ne dispose pas de preuve de son déploiement après mon départ. Les problèmes connus et les possibilités d’évolution ont été transmis avec le code pour aider l’équipe à décider de la suite.`,
      en: `The first handover priority was to make synchronization reliable when a screen joined late or reconnected. Proposed follow-up work covered access rights, anonymization and data export before the tool could be assessed under real research conditions.

**Automatic anonymization planned for continuation.** The application was ultimately intended to handle anonymization of collected data itself. This feature would separate identity information from answers used for analysis through a reproducible procedure. It still had to be designed with researchers — removing only a first and last name does not guarantee that a highly distinctive trajectory cannot be recognized. A future release therefore needed to define the affected fields, when transformation occurred, and who could access information before anonymization.

**CSV as the planned export format.** CSV was the planned format for extracting data. A CSV file organizes information as rows and columns separated by a character, allowing it to be opened in a spreadsheet or imported into analysis software. Export had to preserve dimensions, dates, and events in an understandable structure. The exact destination platform was not yet known, requiring a format documented well enough to remain usable by several tools.

The handover and prototype installation were outcomes of my internship. I have no evidence of deployment after I left. We passed on known issues and possible improvements with the code to support the team’s next decisions.`,
    },
    critique: {
      fr: `J’ai intégré la première version du graphique avant d’avoir assez travaillé sur les périodes ambiguës. Le lien entre le formulaire et D3.js est ainsi devenu la partie que j’ai le plus réécrite. J’aurais gagné du temps en soumettant plus tôt une trajectoire complexe aux chercheurs et en transformant leurs arbitrages en scénarios reproductibles.

**Rendre l’incertitude visible.** Reprendre la fin d’un événement comme début inconnu du suivant peut créer une continuité artificielle. Cette convention aidait à construire une trajectoire au cours de l’entretien, mais elle pouvait suggérer une précision que le récit n’avait pas. Dans une version suivante, je conserverais la provenance de chaque borne dans le modèle et je la signalerais dans le graphique. L’enquêteur et la personne interrogée sauraient alors quelles périodes méritent d’être relues ou corrigées.

**Des rendez-vous hebdomadaires suffisants, mais un premier retour de bout en bout trop tardif.** La fréquence d'une démonstration par semaine était correcte pour le rythme du stage. Ce que j'aurais souhaité obtenir plus tôt n'était pas nécessairement davantage de réunions, mais un retour dès que le formulaire avait été relié aux données du graphique. Cette première chaîne complète constituait le moment où les chercheurs pouvaient observer l'effet réel de leurs réponses. La montrer plus tôt aurait révélé les faiblesses de la liaison entre le formulaire et le graphique avant que plusieurs fonctionnalités dépendent de cette architecture.

Je garderais la correction directe dans le graphique, qui facilite la discussion pendant un entretien. Je validerais d’abord un petit parcours complet, puis j’ajouterais des cas couvrant les dates estimées, les corrections dans les deux sens et la reconnexion d’un écran. Cela rendrait les limites visibles avant d’élargir la démonstration.`,
      en: `I integrated the first chart before working through enough ambiguous date ranges. The connection between the questionnaire and D3.js became the part I rewrote most. I would have saved time by showing the researchers a complex trajectory earlier and turning their decisions into repeatable scenarios.

**Making uncertainty visible.** Reusing one event’s end date as the unknown start of the next can create artificial continuity. The convention helped build a timeline during the interview but could suggest a level of precision the account did not provide. In a follow-up version, I would retain where each date came from in the data model and signal that in the chart. This would help the interviewer and participant see which periods need review or correction.

**Sufficient weekly meetings but end-to-end feedback obtained too late.** One demonstration per week was appropriate for the internship pace. What I would have liked earlier was not necessarily more meetings, but feedback as soon as the form was connected to chart data. This first complete chain was the point at which researchers could observe the real effect of their answers. Showing it earlier would have revealed bridge weaknesses before several features depended on its initial architecture.

I would keep direct editing in the chart because it supports discussion during an interview. I would first validate a small end-to-end workflow and then add cases for estimated dates, edits in both directions and screen reconnection. That would reveal the limitations before expanding the demonstration.`,
    },
    linkedCompetences: [
      "developpement-frontend",
      "developpement-backend",
      "perseverance",
    ],
    contextualCompetences: { actors: ["communication"] },
    media: [
      {
        type: "image",
        src: "/images/project-screenshots/cap2vie/cap2vie-home.png",
        title: {
          fr: "Choix du profil utilisateur",
          en: "User profile selection",
        },
        description: {
          fr: "Écran d'entrée permettant de choisir entre le rôle enquêteur et le rôle enquêté.",
          en: "Entry screen allowing the user to choose between interviewer and respondent roles.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/cap2vie/cap2vie-surveyor.png",
        title: {
          fr: "Espace enquêteur",
          en: "Interviewer workspace",
        },
        description: {
          fr: "Interface locale de l'application CAP2vie montée depuis le dépôt de stage.",
          en: "Local CAP2vie interface started from the internship repository.",
        },
      },
      {
        type: "youtube",
        src: "https://www.youtube.com/embed/LWmh8P7WWYI",
        title: {
          fr: "Création d'une enquête",
          en: "Survey creation",
        },
        description: {
          fr: "Parcours de création d'une enquête sociologique dans l'application CAP2vie.",
          en: "Flow for creating a sociological survey in the CAP2vie application.",
        },
      },
      {
        type: "youtube",
        src: "https://www.youtube.com/embed/MgQ0-j_egfQ",
        title: {
          fr: "Questionnaire séquentiel",
          en: "Sequential questionnaire",
        },
        description: {
          fr: "Interface de saisie guidée permettant aux enquêteurs de collecter les données de trajectoire.",
          en: "Guided input interface allowing interviewers to collect trajectory data.",
        },
      },
      {
        type: "youtube",
        src: "https://www.youtube.com/embed/ZEPOEr3icHg",
        title: {
          fr: "Connexion multiécrans",
          en: "Multi-screen connection",
        },
        description: {
          fr: "Synchronisation en temps réel entre les écrans via Socket.io pour faciliter la conduite d'entretien.",
          en: "Real-time screen synchronization through Socket.io to support interview sessions.",
        },
      },
      {
        type: "youtube",
        src: "https://www.youtube.com/embed/uudXFbMXYnE",
        title: {
          fr: "Gestion des conflits de dates",
          en: "Date conflict handling",
        },
        description: {
          fr: "Exemple de résolution d'incohérences temporelles lors de la saisie des trajectoires.",
          en: "Example of resolving temporal inconsistencies during trajectory input.",
        },
      },
    ],
  };
