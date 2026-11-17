import type { Realisation } from "./types";

export const modulesMetierOdoo: Realisation =
  {
    slug: "modules-metier-odoo",
    title: {
      fr: "Développement de modules métier pour un ERP",
      en: "Business module development for an ERP",
    },
    shortDescription: {
      fr: "Conception en solo de 16 modules Odoo à partir de zéro, ainsi que la correction, l'amélioration et la migration de modules tiers.",
      en: "Solo design of 16 Odoo modules from scratch, plus fixes, improvements, and migration work on third-party modules.",
    },
    context: { fr: "Entreprise", en: "Company" },
    summary: {
      context: {
        fr: "Chez 1UP Distribution, les besoins de la comptabilité, des ventes, de l'administration des ventes et de la logistique dépassaient les possibilités de personnalisation sans code d'Odoo.",
        en: "At 1UP Distribution, accounting, sales, sales administration, and logistics needs exceeded Odoo's no-code customization capabilities.",
      },
      challenge: {
        fr: "Transformer des besoins transverses, non couverts par le paramétrage sans code, en extensions fiables et maintenables de l'ERP.",
        en: "Turn cross-functional needs not covered by no-code configuration into reliable, maintainable ERP extensions.",
      },
      role: {
        fr: "J'ai conçu en solo 16 modules Odoo, depuis l'analyse des besoins jusqu'au développement, aux tests, au déploiement et à l'accompagnement des utilisateurs.",
        en: "I independently designed 16 Odoo modules, from requirements analysis through development, testing, deployment, and user support.",
      },
      decision: {
        fr: "Regrouper les évolutions dans une couche de modules versionnée, testable et reliée aux processus plutôt que multiplier les personnalisations isolées.",
        en: "Group changes into a versioned, testable module layer tied to processes instead of multiplying isolated customizations.",
      },
      result: {
        fr: "Les modules automatisent des tâches métier, structurent des données partagées et rendent des fonctions telles que les relances, les documents ou la synchronisation B2B pilotables dans l'ERP.",
        en: "The modules automate business tasks, structure shared data, and make functions such as reminders, documents, and B2B synchronization manageable within the ERP.",
      },
      proof: {
        fr: "Des captures et des modules génériques publiables illustrent le travail, tandis que les éléments internes restent soumis à autorisation et anonymisation.",
        en: "Screenshots and publishable generic modules illustrate the work, while internal material remains subject to authorization and anonymization.",
      },
    },
    tags: ["Odoo", "Python", "PostgreSQL", "API", "Open Source"],
    presentation: {
      fr: `Chez 1UP Distribution, la comptabilité, les ventes et la logistique avaient des besoins que le paramétrage standard d’Odoo couvrait mal. J’ai conçu et maintenu **seize modules internes**, de l’analyse des demandes à l’accompagnement après déploiement. Ils couvrent entre autres les relances clients, les documents de colisage et le suivi de la marge sur facture.

**Une frontière assumée entre configuration, Studio et code versionné.** Ma règle de décision commence par vérifier si Odoo propose déjà la configuration nécessaire. Lorsque c'est le cas, je l'utilise et je ne développe pas une seconde solution. Si le besoin exige une personnalisation, j'évalue ensuite ce que Studio enregistrerait dans la base. Modifier une vue avec Studio crée par exemple une vue héritée et une expression XPath chargée de cibler la partie modifiée. Pour les adaptations durables de l'entreprise, je préfère déclarer cet héritage dans un module et le versionner dans le dépôt GitHub. Le versionnement conserve l'historique des changements, rend les différences relisibles, permet de reproduire la personnalisation dans plusieurs environnements et facilite son analyse lors d'une migration. Ce choix demande plus de rigueur au moment du développement, mais il est nettement plus maintenable qu'une accumulation de changements techniques dispersés dans la base.

La relance des impayés illustre le cycle complet. La comptabilité devait repérer les factures échues et appliquer des règles qui variaient selon les situations. J’ai organisé ces règles dans un module versionné, avec des réglages accessibles aux personnes chargées du suivi.

**Le module 1up_specifique pour les rapports QWeb.** Ce module centralise notamment des adaptations de documents PDF utilisés dans les applications Ventes, Comptabilité et Inventaire. Odoo produit ces documents avec QWeb, un moteur de modèles qui combine une structure HTML/XML avec les données de l'ERP avant de générer le PDF. Les documents concernés comprennent par exemple les factures pro forma et les bons de livraison. Une facture pro forma est un document commercial provisoire qui présente les conditions d'une vente avant la facture comptable définitive. Un bon de livraison décrit les produits remis ou expédiés au client. Les rapports standard ne contenaient pas toutes les informations nécessaires aux clients ou aux équipes internes. J'ai donc ajouté les champs, conditions d'affichage et mises en page adaptés afin que les documents imprimés deviennent réellement exploitables dans les opérations quotidiennes.`,
      en: `At 1UP Distribution, accounting, sales and logistics had requirements that standard Odoo configuration did not cover well. I designed and maintained **sixteen in-house modules**, from understanding the requests to supporting users after deployment. They cover customer payment reminders, packing documents and invoice margin reporting, among other workflows.

**A deliberate boundary between configuration, Studio, and version-controlled code.** My decision rule starts by checking whether Odoo already provides the required configuration. When it does, I use it and do not develop a second solution. If the requirement needs customization, I then assess what Studio would store in the database. Modifying a view with Studio, for example, creates an inherited view and an XPath expression that targets the modified area. For long-term company adaptations, I prefer declaring this inheritance in a module and versioning it in the GitHub repository. Version control preserves change history, makes differences reviewable, reproduces the customization across environments, and simplifies analysis during migration. This choice requires more discipline during development but is considerably more maintainable than accumulating technical changes scattered throughout the database.

Overdue invoice reminders illustrate the full lifecycle. Accounting needed to identify overdue invoices and apply rules that varied by situation. I organized those rules in a version-controlled module with settings accessible to the people responsible for follow-up.

**The 1up_specifique module for QWeb reports.** This module notably centralizes PDF document adaptations used in the Sales, Accounting, and Inventory applications. Odoo produces these documents with QWeb, a templating engine that combines an HTML/XML structure with ERP data before generating the PDF. The documents include pro forma invoices and delivery slips. A pro forma invoice is a preliminary commercial document presenting the terms of a sale before the final accounting invoice. A delivery slip describes the products handed over or shipped to the customer. Standard reports did not include all the information required by customers or internal teams. I therefore added the appropriate fields, display conditions, and layouts so that printed documents became genuinely usable in daily operations.`,
    },
    objectives: {
      fr: `La comptabilité devait pouvoir repérer et relancer les factures concernées selon les règles de l’entreprise. Les délais, destinataires et exclusions devaient rester ajustables lorsque le processus évoluait. L’équipe devait aussi pouvoir comprendre les choix du module lors de ses vérifications.

**Prioriser les demandes selon leur impact.** J’évaluais le caractère bloquant du problème, le temps perdu, le bénéfice d’un correctif rapide et l’impact financier. Une demande courte pouvait donc passer avant un chantier plus vaste si elle supprimait immédiatement une tâche répétitive importante. À l'inverse, un problème qui empêchait un service de travailler ou qui faisait perdre de l'argent devenait prioritaire même si sa résolution était plus complexe. Cette méthode reliait l'ordre du développement à la valeur attendue pour l'entreprise plutôt qu'à la seule date de la demande.`,
      en: `Accounting needed to identify and follow up on invoices under the company’s rules. Staff needed to adjust timing, recipients and exclusions as the process changed, and to understand the module’s decisions when checking them.

**Prioritizing by impact rather than arrival order.** Requests from several departments could not all be developed immediately. I assessed their priority using four main criteria — whether the problem was blocking, how much time the current situation wasted, whether it represented a quick win, and its financial impact. A quick win is an improvement that is fast to implement relative to the benefit it provides. A short request could therefore take priority over a larger project if it immediately removed a significant repetitive task. Conversely, a problem that prevented a department from working or caused financial loss became a priority even if its resolution was more complex. This method connected development order to expected company value rather than only to the request date.`,
    },
    risks: {
      fr: `Une relance incorrecte peut solliciter un client exclu du processus ou partir au mauvais moment. Le risque venait autant des exceptions métier que du code, car certaines conditions étaient connues des utilisateurs sans être formalisées. Les règles qui pouvaient évoluer ont donc été séparées de la logique Python.

**Divulgation de données confidentielles.** Le risque le plus sensible concernait les droits d'accès. Un commercial m'a par exemple demandé de consulter les factures de ses clients ainsi que l'application Achats. Une facture peut contenir des prix, des conditions commerciales, des coordonnées et d'autres informations qui ne doivent pas être ouvertes à tous les utilisateurs. L'application Achats donne également accès à des données concernant les fournisseurs et les coûts de l'entreprise. Comme les droits Odoo se combinent par groupes et peuvent être affinés par des règles d'enregistrement, une autorisation trop large pouvait exposer beaucoup plus de données que celles nécessaires à la demande. J'ai donc demandé la validation de ma responsable avant de mettre en place un accès strictement limité au périmètre autorisé par la direction.

**Dégradation des performances de l'ERP.** Un module personnalisé s'exécute dans la même application que les fonctions standard d'Odoo. Une recherche trop large, un calcul répété inutilement ou une automatisation déclenchée sur un grand nombre d'enregistrements pouvait ralentir un écran, une tâche planifiée ou l'ensemble du serveur. Ce risque augmente lorsqu'un traitement paraît rapide sur quelques données de test mais doit ensuite parcourir le volume réel de la production. Je devais donc vérifier le comportement fonctionnel tout en restant attentif au nombre d'enregistrements traités, à la fréquence d'exécution et aux opérations de base de données. Une fonctionnalité correcte mais trop coûteuse aurait dégradé l'expérience de tous les utilisateurs.`,
      en: `An incorrect reminder can reach an excluded customer or go out at the wrong time. The risk came from business exceptions as well as code because users knew some conditions that had never been written down. I separated changeable rules from the Python logic to make them easier to review and adjust.

**Disclosure of confidential data.** The most sensitive risk involved access rights. A salesperson once asked me for access to their customers' invoices as well as the Purchase application. An invoice can contain prices, commercial terms, contact details, and other information that should not be open to every user. The Purchase application also provides access to the company's supplier and cost data. Because Odoo rights combine through groups and can be refined through record rules, an overly broad permission could expose far more data than the request required. I therefore obtained approval from my direct manager before implementing access strictly limited to the scope authorized by management.

**Degraded ERP performance.** A custom module runs in the same application as standard Odoo functions. An overly broad search, an unnecessarily repeated calculation, or an automation triggered across a large number of records could slow a screen, scheduled task, or the entire server. This risk increases when processing appears fast on a small test dataset but later has to scan production volume. I therefore needed to verify functional behavior while remaining attentive to the number of records processed, execution frequency, and database operations. A correct but overly expensive feature would degrade every user's experience.`,
    },
    steps: {
      fr: `**Formaliser le besoin dans Jira.** J'ai retranscrit les explications dans un ticket Jira, c'est-à-dire une fiche de suivi centralisant le problème, le travail à réaliser et son état d'avancement. J'y ai ajouté des sous-tâches pour découper le développement, les processus de test à reproduire et les critères d'acceptation. Un critère d'acceptation décrit un résultat observable qui doit être vérifié pour considérer la fonctionnalité comme conforme. Cette formalisation me servait de référence pendant le développement et limitait le risque d'oublier une exception mentionnée oralement. Elle permettait également à la comptabilité de comparer le comportement livré avec ce qui avait été convenu.

**Transformer les règles comptables en paramètres vérifiables.** Pour déterminer quand relancer, j’ai recensé les conditions de paiement, le type de client, le compte bancaire destinataire du règlement et les exceptions définies par la comptabilité. Les échéances servent ensuite à calculer le nombre de jours de retard. La configuration générale précise notamment les délais de relance, les modèles de courriel à employer et le rapport de facture à joindre. Les réglages par client couvrent les destinataires supplémentaires, les exclusions et les traitements particuliers liés à l’affacturage ou à certains comptes bancaires. Ce recensement a constitué la matrice fonctionnelle du module.

**Une première version de notification interne.** Le premier traitement parcourait chaque jour les factures échues et signalait les cas concernés à la comptabilité et au commercial. L’équipe a pu vérifier la sélection avant d’élargir le périmètre à la relance client. Ses retours ont précisé les exceptions, les paliers et les données à rendre configurables.

**Faire évoluer le module vers une relance pilotable depuis l'ERP.** Les retours d'usage ont montré que la logique devait être plus configurable et aller au-delà d'une notification interne. J'ai donc fait évoluer le module afin que la comptabilité puisse déterminer directement dans Odoo les personnes à notifier, les délais à appliquer, le modèle de courriel utilisé et le document de facture joint au message. Elle peut également définir après combien de jours un client doit être bloqué, afin d'empêcher la poursuite normale de certaines opérations lorsque le retard devient trop important. La majorité de ces valeurs était auparavant codée en dur, ou hardcoded — toute modification exigeait alors de changer le code et de redéployer le module. Leur déplacement vers les paramètres de l'ERP a rendu le comportement adaptable par les utilisateurs autorisés sans intervention technique pour chaque changement de règle.

**Tester une matrice de cas sur l'environnement de staging.** En préproduction, j’ai testé une facture avant échéance, chacun des paliers de retard et les exceptions liées au client, à l’affacturage ou au compte bancaire. J’ai aussi vérifié les destinataires, le modèle de courriel, la pièce jointe et le seuil de blocage. Odoo.sh y neutralise les courriels sortants et les intercepte avec un mail catcher. Cet outil permet de consulter le destinataire, l'objet, le contenu et les pièces jointes du message comme s'il avait été envoyé, tout en empêchant qu'un vrai client reçoive une relance issue d'un test.

**Déployer par le flux staging vers production d'Odoo.sh.** Une fois le build de préproduction sans erreur, les tests terminés et la validation métier obtenue, la branche de staging était fusionnée avec la branche de production. Odoo.sh lançait alors un rebuild — la plateforme reconstruisait l'environnement avec la nouvelle révision du dépôt Git, redémarrait Odoo et mettait à jour le code exécuté en production. Lorsque la version du module ou la transformation des données le nécessitait, les scripts de migration associés étaient également exécutés. Ce processus rend le déploiement reproductible — la production reçoit le code versionné et testé, plutôt qu'une succession de modifications manuelles impossibles à retracer.`,
      en: `**Formalizing the requirement in Jira.** I transcribed the explanations into a Jira ticket, meaning a tracking record that centralizes the problem, the work to perform, and its progress. I added subtasks to break down development, the test processes to reproduce, and acceptance criteria. An acceptance criterion describes an observable outcome that must be verified before a feature can be considered compliant. This formalization served as a reference during development and reduced the risk of forgetting an exception mentioned verbally. It also allowed accounting to compare the delivered behavior with what had been agreed.

**Turning accounting rules into verifiable parameters.** I listed the information that determines whether a reminder should be triggered — payment terms, customer type, the bank account receiving payment, and the options defined by accounting. Payment terms establish the date or dates on which an invoice becomes due and therefore make it possible to calculate the number of overdue days. General configuration notably defines reminder intervals, email templates, and the invoice report to attach. Customer-specific settings complete these rules — additional recipients, explicit exclusion from reminders, an invoice assigned to factoring, or use of a bank account requiring different treatment. This inventory formed the module's functional decision matrix.

**An initial internal notification.** The first job ran daily, checking overdue invoices and notifying accounting and the sales representative about relevant cases. Staff could verify which invoices were selected before customer reminders were added. Their feedback clarified the exceptions, reminder stages and settings they needed to control.

**Evolving the module into a reminder system controlled from the ERP.** Usage feedback showed that the logic needed to be more configurable and go beyond an internal notification. I therefore evolved the module so that accounting could determine directly in Odoo who should be notified, which intervals should apply, which email template should be used, and which invoice document should be attached. It can also define after how many days a customer should be blocked, preventing certain operations from continuing normally when the delay becomes too significant. Most of these values had previously been hardcoded, meaning that every change required a code update and a new deployment. Moving them into ERP settings made the behavior adaptable by authorized users without technical intervention for every rule change.

**Testing a matrix of cases in staging.** I checked the different branches of the process in preproduction — an invoice that had not yet reached its due date, an invoice matching each reminder stage, an explicitly ignored customer, an invoice covered by factoring, a specific receiving bank account, additional recipients, the selected email template, the expected attachment, and the blocking threshold. Staging is an isolated copy used to test new code with representative data without modifying production. Odoo.sh neutralizes outgoing email there and intercepts it with a mail catcher. This tool makes it possible to inspect the recipient, subject, content, and attachments exactly as if the message had been sent, while preventing a real customer from receiving a test reminder.

**Deploying through the Odoo.sh staging-to-production flow.** Once the staging build completed without errors, testing was finished, and business validation had been obtained, the staging branch was merged into the production branch. Odoo.sh then started a rebuild — the platform reconstructed the environment with the new Git repository revision, restarted Odoo, and updated the code running in production. When required by the module version or a data transformation, the associated migration scripts were also executed. This process makes deployment reproducible — production receives version-controlled, tested code rather than a sequence of manual changes that cannot be traced.`,
    },
    actors: {
      fr: `La comptabilité a expliqué les pratiques de relance, arbitré les exceptions et vérifié le résultat en préproduction. Ma responsable donnait l’accord de mise en service après les essais et la démonstration. Je prenais en charge les choix techniques, la documentation et la formation. Les décisions touchant à la relation client étaient discutées avec les personnes qui en avaient la responsabilité.

Selon le module, les interlocuteurs étaient les commerciaux, l’administration des ventes, la logistique ou la direction. Leurs exemples m’ont aidé à transformer des demandes générales en critères vérifiables, comme la présence d’une information attendue sur un document de colisage.

**Une recherche de compromis lorsqu'une demande exacte était impossible.** Il arrivait qu'un besoin ne puisse pas être reproduit exactement de la manière imaginée par l'utilisateur en raison d'une contrainte technique d'Odoo. Dans ce cas, je n'essayais pas de masquer l'écart. J'expliquais ce qui empêchait la solution initiale, la différence entre le résultat souhaité et les possibilités réelles, puis je proposais l'alternative qui répondait le mieux à l'objectif. L'échange se concentrait ainsi sur le problème à résoudre plutôt que sur une forme de solution devenue irréalisable. Cette transparence évitait de créer une attente que le module ne pourrait pas satisfaire.`,
      en: `Accounting described the reminder process, decided how exceptions should be handled and checked the result in staging. My manager approved release after the trials and demonstration. I owned the technical choices, documentation and training. Decisions affecting customer relationships were discussed with the staff responsible for them.

Depending on the module, I worked with sales, sales administration, logistics or management. Their examples helped turn broad requests into verifiable criteria, such as whether a packing document showed the information a logistics operator expected.

**Seeking a compromise when the exact request was impossible.** Sometimes a requirement could not be implemented exactly as the user imagined because of a technical Odoo constraint. In that situation, I did not attempt to hide the gap. I explained what prevented the initial solution, the difference between the desired result and the actual possibilities, and then proposed the alternative that best addressed the objective. The discussion therefore focused on the problem to solve rather than on a solution format that had become unfeasible. This transparency avoided creating an expectation the module could not meet.`,
    },
    results: {
      fr: `L’action planifiée effectue les relances courantes en production. La comptabilité peut modifier les principaux paramètres sans demander une modification du code. L’équipe dispose ainsi d’un processus plus régulier et garde la main sur les règles. L’effet sur les délais de paiement ou le temps consacré aux relances reste à mesurer.

**Un contrôle humain conservé pour l'affacturage.** L'automatisation ne supprime pas toutes les vérifications de la comptabilité. Les factures de clients relevant de l'affacturage continuent notamment de nécessiter une attention particulière. Dans ce dispositif, une créance peut être cédée à un organisme financier qui intervient dans son financement ou son recouvrement. Une relance envoyée directement par l'entreprise peut alors ne pas correspondre au circuit prévu. Le résultat recherché n'était donc pas de retirer toute intervention humaine, mais de concentrer cette intervention sur les exceptions pendant que les cas standards sont traités automatiquement.

**Une relance envoyée à tort.** Une facture passée par l’affacturage a déclenché une relance parce que le client n’était pas identifié comme tel dans l’ERP. Le module appliquait la règle correspondant aux données disponibles, alors que la configuration ne reflétait pas le processus réel. Ce cas m’a montré que la validation doit aussi porter sur les données qui gouvernent une règle. Il a confirmé l’intérêt de montrer aux utilisateurs quels réglages consulter avant de laisser partir les relances.

**Des PDF enrichis à partir des données de l’ERP.** J’ai adapté les rapports QWeb pour qu’ils reprennent les taxes, les informations de transport et, selon le document, les consignes logistiques ou les conditions particulières de livraison. Les équipes retrouvaient ainsi sur le PDF des informations déjà saisies dans Odoo. Je n’ai pas chiffré l’effet sur le temps de préparation ni sur le nombre de demandes de clarification.

**Un indicateur disponible pendant l’exercice.** Le module de marge rapproche les revenus des ventes et les coûts pris en compte par l’entreprise. Le directeur général peut consulter cet indicateur à partir des factures pendant l’année. Auparavant, la clôture et l’analyse préparée par l’expert-comptable constituaient le principal repère. Le module donne une lecture intermédiaire et conserve le besoin de vérifier la méthode de calcul avec la comptabilité.

**Une synchronisation B2B rendue possible par des routes API sur mesure.** Le module 1up_b2b_specifique permet au site B2B de synchroniser correctement les données dont il a besoin avec Odoo. Une API est une interface qui permet à deux logiciels d'échanger des informations selon des règles définies. Une route API est un point d'entrée exposé par le serveur pour lire, créer ou mettre à jour une donnée déterminée. Certaines opérations nécessaires au site n'existaient pas dans l'API standard d'Odoo. J'ai donc développé des routes adaptées au processus de l'entreprise. Le site B2B peut ainsi obtenir ou transmettre les informations attendues sans contourner l'ERP ni dupliquer manuellement les données.`,
      en: `The scheduled action handles routine reminders in production. Accounting can change the main settings without requesting a code change. This gives the team a more regular process while keeping the rules under its control. The impact on payment delays and time spent on reminders remains to be measured.

**Human control retained for factoring.** Automation does not remove every accounting check. Invoices for customers covered by factoring notably continue to require special attention. Under this arrangement, a receivable may be assigned to a financial institution involved in financing or collection. A reminder sent directly by the company may then conflict with the expected process. The result sought was therefore not to eliminate human intervention, but to focus it on exceptions while standard cases are handled automatically.

**An incorrect reminder.** An invoice subject to factoring triggered a reminder because the customer was not marked as such in the ERP. The module followed the rule for the available data, but the settings did not reflect the actual process. This case showed me that acceptance testing also needs to cover the data governing a rule. It reinforced the value of showing users which settings to review before sending reminders.

**PDFs populated from ERP data.** I adapted the QWeb reports to include taxes and transport information, along with logistics instructions or special delivery conditions where relevant. Staff could find information already entered in Odoo on the PDF. I did not measure changes in preparation time or the number of clarification requests.

**An indicator available during the financial year.** The margin module brings sales revenue together with the costs included under the company’s rules. The managing director can view the indicator on invoices during the year. Previously, the year-end close and the accountant’s analysis were the main reference points. The module gives management an interim view and still depends on validating the calculation method with accounting.

**B2B synchronization enabled by custom API routes.** The 1up_b2b_specifique module allows the B2B website to synchronize the data it needs correctly with Odoo. An API is an interface that lets two software systems exchange information according to defined rules. An API route is an entry point exposed by the server to read, create, or update specific data. Some operations required by the website were not available in Odoo's standard API. I therefore developed routes adapted to the company's process. The B2B site can obtain or transmit the expected information without bypassing the ERP or manually duplicating data.`,
    },
    aftermath: {
      fr: `La comptabilité peut faire évoluer les délais et les exclusions au fil des besoins. Les demandes qui touchent aux calculs, aux droits ou à un nouveau type de relance passent par un ticket, des essais et une nouvelle validation. La documentation et le versionnement facilitent cette reprise.

**Mesurer l’effet des relances.** Au moment du bilan, je n’avais pas mesuré le temps gagné ni l’évolution des délais de paiement. Je comparerais des périodes de volume similaire en relevant les factures éligibles, les relances envoyées, les cas révisés manuellement et le temps consacré au suivi. Une évolution des délais de paiement pourrait aussi dépendre du profil des clients ou du montant des factures. Ces mesures aideraient d’abord à savoir où l’automatisation libère du temps et où la comptabilité doit encore intervenir.`,
      en: `Accounting can update timing and exclusions as needs change. Requests affecting calculations, permissions or a new reminder type go through a ticket, testing and further validation. Documentation and version control make those changes easier to take over.

**Measuring the effect of reminders.** At the time of the review I had no figures for time saved or changes in payment delays. I would compare periods with similar invoice volumes, recording eligible invoices, reminders sent, cases reviewed manually and time spent on follow-up. Payment delays could also change with customer mix or invoice amounts. The first goal of measurement would be to see where automation frees up time and where accounting staff still need to intervene.`,
    },
    critique: {
      fr: `Mes premières extensions contenaient des valeurs fixées dans le code alors qu’elles dépendaient des pratiques des équipes. Cela rendait une petite modification tributaire d’un déploiement. Le passage par des réglages métier a amélioré la maintenabilité et clarifié quelles décisions appartenaient aux utilisateurs.

**Le module 1up_specifique comme priorité de refactorisation.** Si je devais reprendre un module en priorité, je choisirais 1up_specifique. Il centralise plusieurs adaptations de rapports et conserve encore quelques valeurs figées. Une refactorisation consiste à réorganiser le code sans supprimer la valeur fonctionnelle déjà fournie. Ici, elle viserait à identifier les valeurs propres à l'entreprise, à déterminer lesquelles doivent devenir des paramètres et à conserver dans le code uniquement la logique de génération des documents. Le module gagnerait ainsi en lisibilité, en portabilité et en facilité de migration.

Je garderais la recette avec la comptabilité, tout en écrivant plus tôt des tests pour les exclusions, les échéances et les droits. Sur la marge, j’ai dû remonter plusieurs fois des écarts aux écritures pour comprendre le calcul comptable. Je conserverais ces cas comme tests de non-régression et je mesurerais aussi le coût des requêtes sur un volume réaliste avant le déploiement.`,
      en: `Early extensions encoded values that actually depended on team practices. As a result, a small rule change required a deployment. Moving those values into business settings improved maintainability and clarified which decisions belonged to users.

**The 1up_specifique module as the refactoring priority.** If I had to revisit one module first, I would choose 1up_specifique. It centralizes several report adaptations and still contains a few fixed values. Refactoring means reorganizing code without removing the functional value it already provides. Here, it would involve identifying company-specific values, deciding which should become settings, and leaving only document-generation logic in the code. The module would thereby become more readable, portable, and easier to migrate.

I would keep acceptance testing with accounting and write tests earlier for exclusions, due dates and permissions. On margin calculations, I repeatedly had to trace discrepancies back to their journal entries to understand the accounting rules. I would keep those cases as regression tests and also measure query costs on realistic data volumes before release.`,
    },
    linkedCompetences: [
      "developpement-odoo",
      "autonomie",
      "communication",
    ],
    contextualCompetences: {
      steps: ["python", "adaptabilite"],
      results: ["developpement-backend"],
      critique: ["perseverance", "amelioration-continue"],
    },
    media: [
      {
        type: "image",
        src: "/images/project-screenshots/odoo/self-made-modules-list.png",
        title: {
          fr: "Liste de modules métier développés",
          en: "List of custom business modules",
        },
        description: {
          fr: "Vue d'ensemble de modules Odoo réalisés pour couvrir des besoins comptables, commerciaux, logistiques et B2B.",
          en: "Overview of Odoo modules built to cover accounting, sales, logistics, and B2B needs.",
        },
      },
    ],
  };
