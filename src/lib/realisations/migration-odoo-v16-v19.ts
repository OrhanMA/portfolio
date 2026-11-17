import type { Realisation } from "./types";

export const migrationOdooV16V19: Realisation =
  {
    slug: "migration-odoo-v16-v19",
    title: {
      fr: "Migration d'un ERP d'entreprise d'Odoo 16 vers Odoo 19",
      en: "Enterprise ERP migration from Odoo 16 to Odoo 19",
    },
    shortDescription: {
      fr: "Migration en solo d'un ERP utilisé par 20 utilisateurs internes directs, avec 16 modules personnalisés et des extensions tierces à adapter.",
      en: "Solo migration of an ERP used by 20 direct internal users, with 16 custom modules and third-party extensions to adapt.",
    },
    context: { fr: "Entreprise", en: "Company" },
    summary: {
      context: {
        fr: "À l'été 2025, l'ERP Odoo 16 de 1UP Distribution, utilisé par 20 utilisateurs internes, devait évoluer hors de sa période de support avec 16 modules sur mesure et des extensions tierces.",
        en: "In summer 2025, 1UP Distribution's Odoo 16 ERP, used by 20 internal users, needed to move beyond its support period with 16 custom modules and third-party extensions.",
      },
      challenge: {
        fr: "Faire évoluer un ERP central sans perdre les données, les règles métier et les intégrations dont dépendait l'activité quotidienne.",
        en: "Upgrade a central ERP without losing the data, business rules, and integrations that daily operations depended on.",
      },
      role: {
        fr: "J’ai piloté les trois migrations, les contrôles techniques et la bascule. J’ai coordonné la recette avec les équipes métier et traité les anomalies remontées après la mise en production.",
        en: "I led the three upgrades, technical checks and cutover. I coordinated acceptance testing with the business teams and addressed issues they reported after release.",
      },
      decision: {
        fr: "Procéder par trois migrations successives, inventorier les personnalisations et stabiliser chaque usage métier après la bascule.",
        en: "Proceed through three successive migrations, inventory customizations, and stabilize each business workflow after cutover.",
      },
      result: {
        fr: "L'ERP et les modules nécessaires ont été portés vers Odoo 19 en préservant les données, les fonctions métier utiles et la continuité de service recherchée.",
        en: "The ERP and required modules were migrated to Odoo 19 while preserving data, useful business functions, and the intended service continuity.",
      },
      proof: {
        fr: "Des captures de migration et l'expérience associée apportent des éléments vérifiables, dans les limites imposées par la confidentialité de l'entreprise.",
        en: "Migration screenshots and the linked experience provide verifiable material, within the company's confidentiality constraints.",
      },
    },
    tags: ["Odoo", "Python", "PostgreSQL", "Migration"],
    presentation: {
      fr: `Chez 1UP Distribution, vingt personnes utilisaient Odoo 16 au quotidien pour la comptabilité, les ventes, les achats et les stocks. Le site B2B et plusieurs services externes échangeaient aussi des données avec cet ERP. Comme la version approchait de sa fin de support, j’ai préparé le passage à **Odoo 19**, avec seize modules internes, des extensions tierces et des personnalisations réalisées directement dans l’ERP avec Odoo Studio.

**Les dépendances de l’ERP.** Le site B2B échangeait les clients, les produits, les commandes et les stocks avec Odoo. Un hub d’intégration reliait aussi l’ERP aux marketplaces et à ShippingBo, qui centralise les commandes et leur préparation en entrepôt. Enfin, des outils de pilotage exploitaient les données Odoo pour produire des tableaux de bord. La recette devait donc couvrir aussi bien l’application elle-même que les échanges qui permettaient aux équipes et aux canaux de vente de reprendre leur activité.

Odoo Studio est un outil visuel qui permet de créer des champs de données, de modifier les écrans de l'ERP — appelés vues — ou d'ajouter des actions automatisées sans développer un module complet. Ces personnalisations sont utiles pour répondre rapidement à un besoin, mais elles sont principalement enregistrées dans la base de données plutôt que dans le dépôt de code. Un dépôt de code est un espace versionné qui conserve les fichiers du logiciel et l'historique de leurs modifications. Lorsque les personnalisations Studio deviennent nombreuses, il est donc plus difficile pour un développeur de les inventorier, de suivre leur évolution et de les adapter lors d'une migration.

J’ai pris en charge la préparation technique, les migrations intermédiaires et la bascule sur Odoo.sh. Les équipes métier ont vérifié les parcours dont elles avaient l’usage et ma responsable est intervenue dans les arbitrages concernant le périmètre et la mise en production.`,
      en: `At 1UP Distribution, twenty employees relied on Odoo 16 every day for accounting, sales, purchasing and inventory. The B2B website and several external services also exchanged data with the ERP. With this version approaching the end of support, I prepared the upgrade to **Odoo 19**, including sixteen in-house modules, third-party extensions and customizations made directly in the ERP with Odoo Studio.

**ERP dependencies.** The B2B site exchanged customer, product, order and stock data with Odoo. An integration hub also connected the ERP to marketplaces and ShippingBo, which centralizes orders and their preparation in the warehouse. Reporting tools used Odoo data for operational dashboards. Acceptance testing therefore needed to cover the application and the exchanges that helped staff and sales channels resume work.

Odoo Studio is a visual tool that lets users create data fields, modify ERP screens—known as views—or add automated actions without developing a complete module. These customizations are useful for responding quickly to a need, but they are primarily stored in the database rather than in the code repository. A code repository is a versioned space that stores the software files and the history of their changes. When Studio customizations become numerous, it is therefore more difficult for a developer to inventory them, track their evolution, and adapt them during a migration.

I handled the technical preparation, intermediate upgrades and cutover on Odoo.sh. The business teams checked their day-to-day workflows, and my manager helped make decisions about scope and release readiness.`,
    },
    objectives: {
      fr: `La comptabilité constituait le périmètre le plus sensible. L'ERP enregistre notamment les factures reçues des fournisseurs pour justifier les achats de l'entreprise. Dans Odoo, toutes les informations ne se trouvent pas uniquement dans la base PostgreSQL — les fichiers associés aux enregistrements sont conservés dans un espace distinct appelé filestore. Ce répertoire de stockage contient les pièces jointes et d'autres données binaires, c'est-à-dire des fichiers tels que des factures au format PDF, des images ou des documents importés. Une migration pouvait donc laisser visible l'écriture correspondant à un achat tout en rendant sa facture jointe indisponible si le filestore était incomplet ou mal rattaché à la base migrée. Une telle perte aurait diminué la traçabilité comptable et compliqué la justification de l'opération lors d'un contrôle comptable ou fiscal. Cet enjeu était d'autant plus important que les factures clients et fournisseurs sont des pièces justificatives que l'entreprise doit conserver pendant dix ans à compter de la clôture de l'exercice concerné.

La disponibilité de l'outil représentait un autre objectif majeur. Comme l'ERP soutient le travail quotidien de la majorité des employés, une interruption de plusieurs jours n'était pas acceptable. Les migrations et les corrections devaient donc être testées à l'avance dans les environnements Odoo.sh afin que la mise en production se concentre sur l'application d'un processus déjà vérifié. Lors de la bascule, Odoo.sh devait reconstruire l'environnement de production, c'est-à-dire recréer l'application à partir de la base migrée et de la version validée du code, puis la remettre à disposition des utilisateurs avec une interruption aussi courte que possible. Une indisponibilité temporaire du site B2B pouvait être tolérée, car son propre code devait lui aussi être adapté à la nouvelle version de l'ERP. La priorité restait toutefois le redémarrage rapide d'Odoo, dont dépendaient davantage de processus internes.`,
      en: `Accounting was the most sensitive area. The ERP notably records invoices received from suppliers as evidence of company purchases. In Odoo, not all information is stored solely in the PostgreSQL database — files associated with records are kept in a separate area called the filestore. This storage directory contains attachments and other binary data, meaning files such as PDF invoices, images, or imported documents. A migration could therefore leave the accounting entry for a purchase visible while making its attached invoice unavailable if the filestore was incomplete or incorrectly linked to the migrated database. Such a loss would reduce accounting traceability and make it more difficult to substantiate the transaction during an accounting or tax audit. This was especially important because customer and supplier invoices are supporting accounting documents that a company must retain for ten years from the end of the relevant financial year under French rules.

System availability was another major objective. Because the ERP supports the daily work of most employees, an interruption lasting several days was not acceptable. Migrations and fixes therefore had to be tested in advance in the Odoo.sh environments so that the production release would focus on applying a process that had already been validated. During the cutover, Odoo.sh had to rebuild the production environment, meaning recreate the application from the migrated database and the validated code version, before making it available to users again with the shortest possible interruption. Temporary unavailability of the B2B website was acceptable because its own code also needed to be adapted to the new ERP version. The priority, however, remained the rapid restart of Odoo, on which a greater number of internal processes depended.`,
    },
    risks: {
      fr: `**Perte ou altération des données structurées.** Une migration de base ne doit pas seulement conserver le nombre global d'enregistrements. Elle doit aussi préserver leurs valeurs, leurs relations et leur historique. Une facture encore présente mais rattachée au mauvais fournisseur, une commande dont certaines lignes auraient disparu ou un paiement ayant perdu son lien comptable auraient constitué des pertes fonctionnelles, même si la base démarrait correctement. La mesure de maîtrise consistait à travailler sur des copies réalistes de la production, à examiner les erreurs produites à chaque changement de version et à vérifier les enregistrements indispensables, des commandes aux factures et aux mouvements de stock.

**Échec de la bascule et retour arrière.** Si Odoo était devenu indisponible ou si une anomalie critique avait empêché la reprise de l'activité, le scénario de secours était un retour arrière. Cette opération, parfois appelée rollback, consiste à abandonner la version nouvellement déployée et à restaurer le dernier état stable connu. Dans ce projet, le point de reprise était la sauvegarde complète réalisée juste avant la migration de la production. Le retour à cet état aurait limité la perte de données, car la période située entre la sauvegarde et la tentative de bascule devait rester aussi courte que possible. Les commandes éventuellement restées en attente sur les canaux externes auraient ensuite dû être contrôlées et resynchronisées afin d'éviter les doublons ou les oublis.`,
      en: `**Loss or alteration of structured data.** A database migration must do more than preserve the overall number of records. It must also retain their values, relationships, and history. An invoice still present but linked to the wrong supplier, an order with missing lines, or a payment that had lost its accounting link would have constituted functional data loss even if the database started successfully. Risk control consisted of working on realistic production copies, examining errors produced by each version change, and prioritizing checks on essential objects — customers, products, orders, invoices, payments, purchases, and stock movements.

**Failed cutover and rollback.** If Odoo became unavailable or a critical anomaly prevented business from resuming, the contingency plan was a rollback. This operation abandons the newly deployed version and restores the last known stable state. In this project, the recovery point was the complete backup taken immediately before production migration. Returning to that state would have limited data loss because the period between the backup and the attempted cutover had to remain as short as possible. Orders potentially left pending on external channels would then need to be checked and synchronized again to avoid duplicates or omissions.`,
    },
    steps: {
      fr: `**Inventaire initial et stratégie pour chaque module.** J'ai commencé par relever la version de chacun des modules installés afin de décider de son traitement. Les extensions dont la dernière version disponible était antérieure à Odoo 16 étaient considérées comme des modules legacy, c'est-à-dire du code ancien qui n'était plus maintenu pour les versions récentes de l'ERP. Leur migration ne consistait pas à les conserver à tout prix — il fallait préparer leur suppression propre, donc retirer leur code et leurs dépendances sans laisser de références incohérentes dans la base ni casser les données encore utiles. Pour les autres modules tiers, j'ai recherché une version compatible avec les versions d'Odoo suivantes. J'ai téléchargé les extensions gratuites et acheté les nouvelles versions des extensions payantes, puis je les ai intégrées une par une aux essais de migration. La présence d'une version récente ne garantissait pas son fonctionnement — certains modules comportaient encore des erreurs que j'ai dû corriger. Dans d'autres cas, le nouveau code fonctionnait mais ne contenait plus les personnalisations ajoutées au-dessus de la version précédente. J'ai alors réintégré ces adaptations métier dans la nouvelle base de code.

**Trois paliers de migration.** J’ai adapté le code pour passer de la version 16 à la 17, puis à la 18 et à la 19. À chaque palier, Odoo.sh reconstruisait l’environnement avec la base convertie et la branche correspondante. Je relançais les contrôles après les corrections. Cette progression permettait d’attribuer une erreur à un changement de version précis et de vérifier les modules avant d’engager le palier suivant.

**Recherche de la cause réelle d'une erreur.** La plupart des tracebacks indiquaient suffisamment clairement le module, le fichier ou la méthode à examiner. Lorsqu'ils n'étaient pas explicites, je devais reconstruire les conditions exactes de déclenchement. Je croisais alors le code exécuté, les données concernées, les changements apportés par la nouvelle version d’Odoo et les transformations du script de migration. Cette mise en relation était nécessaire, car une erreur apparemment située dans le code standard pouvait être déclenchée uniquement par une ancienne donnée, par une personnalisation ou par un champ qui n'avait pas été transformé comme prévu. Je cherchais donc la cause racine, c'est-à-dire le premier défaut expliquant réellement la chaîne d'erreurs, plutôt que de corriger uniquement le dernier message affiché. Cette méthode évitait les correctifs superficiels qui auraient seulement déplacé le problème vers le rebuild suivant.

**Recette technique et fonctionnelle.** Une fois un build capable de démarrer, la validation ne s'arrêtait pas à l'absence d'erreur dans les logs. J'ai effectué une recette, c'est-à-dire une série de vérifications destinées à comparer le comportement obtenu avec le fonctionnement attendu par l'entreprise. Elle couvrait les parcours de vente, d'achat, de comptabilité, d'inventaire et d'administration des ventes, ainsi que les échanges avec le site B2B et les autres systèmes connectés. J'ai également parcouru les vues recensées, une vue étant un écran de consultation ou de saisie dans Odoo, les automatisations, les actions planifiées et les paramètres de configuration. Il fallait vérifier à la fois qu'un écran s'affichait, que les données présentées étaient correctes et que l'action réalisée produisait le bon résultat. Les essais avec différents profils permettaient enfin de repérer une fonctionnalité disponible pour un administrateur mais inaccessible à l'utilisateur qui devait réellement l'employer.

**Bascule de la production le 6 février 2026.** Lorsque les migrations successives et la recette nous ont donné suffisamment de confiance, nous avons créé plusieurs sauvegardes de la production avant de lancer l'opération définitive sur Odoo.sh. Ces sauvegardes constituaient les points de retour disponibles si la nouvelle version empêchait la reprise de l'activité. La plateforme a ensuite exécuté la migration et reconstruit l'environnement de production avec le code compatible Odoo 19. L'opération a temporairement rendu l'ERP indisponible. Dès son redémarrage, nous avons effectué une nouvelle série de tests sur les processus les plus critiques afin de prendre une décision de go/no-go — conserver la nouvelle version si elle permettait de travailler sans anomalie critique, ou déclencher le rollback vers la sauvegarde si un problème suffisamment grave menaçait les données ou bloquait l'activité. Aucune anomalie détectée à ce stade n'a imposé ce retour arrière. La production a donc été maintenue sur Odoo 19 et la phase de stabilisation a commencé.`,
      en: `**Initial inventory and strategy for each module.** I began by recording the version of every installed module in order to decide how each one should be handled. Extensions whose latest available release predated Odoo 16 were considered legacy modules, meaning old code that was no longer maintained for recent ERP versions. Migrating them did not mean preserving them at all costs — I had to prepare their clean removal, removing their code and dependencies without leaving inconsistent references in the database or breaking data that was still useful. For the other third-party modules, I looked for releases compatible with later Odoo versions. I downloaded free extensions and purchased new releases of paid extensions, then integrated them one at a time into migration tests. The existence of a recent release did not guarantee that it worked — some modules still contained errors that I had to fix. In other cases, the new code worked but no longer included customizations that had been added on top of the previous release. I then reintroduced those business adaptations into the new codebase.

**Three upgrade stages.** I adapted the code for each move, from version 16 to 17, then 18 and 19. At each stage, Odoo.sh rebuilt the environment using the converted database and the relevant branch. I reran checks after making fixes. That sequence helped me tie each failure to a specific release change and check the modules before proceeding to the next stage.

**Finding the actual cause of an error.** Most tracebacks identified the module, file, or method to examine clearly enough. When they were not explicit, I had to reconstruct the exact triggering conditions. I then analyzed four elements together — the code executing the operation, the specific data present in the database, changes introduced by the new Odoo code, and transformations performed by the migration script. This correlation was necessary because an error apparently located in standard code could be triggered only by old data, a customization, or a field that had not been transformed as expected. I therefore looked for the root cause, meaning the first defect that genuinely explained the chain of errors, instead of correcting only the final message displayed. This method avoided superficial fixes that would merely move the problem to the next rebuild.

**Technical and functional acceptance testing.** Once a build could start, validation did not stop at the absence of errors in the logs. I performed acceptance testing, meaning a series of checks that compare the resulting behavior with what the company expects. It covered sales, purchasing, accounting, inventory, and sales administration flows, as well as exchanges with the B2B website and other connected systems. I also reviewed the inventoried views, a view being a screen used to display or enter information in Odoo, along with automations, scheduled actions, and configuration settings. I had to verify not only that a screen loaded, but also that the displayed data was correct and that each action produced the expected outcome. Tests using different user profiles finally helped reveal a feature that worked for an administrator but was inaccessible to the person who actually needed to use it.

**Production cutover on February 6, 2026.** Once the successive migrations and acceptance tests gave us sufficient confidence, we created several production backups before launching the final operation on Odoo.sh. These backups were the available recovery points if the new version prevented business from resuming. The platform then ran the migration and rebuilt the production environment using the Odoo 19-compatible code. The operation temporarily made the ERP unavailable. As soon as it restarted, we ran another series of tests on the most critical processes to make a go/no-go decision — keep the new version if work could resume without a critical anomaly, or trigger a rollback to the backup if a sufficiently serious problem threatened data or blocked operations. No issue detected at that stage required such a rollback, so production remained on Odoo 19 and the stabilization phase began.`,
    },
    actors: {
      fr: `**Responsabilité technique et responsabilité fonctionnelle.** J'ai pris en charge seul l'ensemble du volet technique — analyse du code, adaptation des modules, migrations successives, diagnostic des erreurs, préparation de la production et corrections après la bascule. L'assistante de direction constituait ma principale interlocutrice fonctionnelle. Sa connaissance transversale lui permettait de valider les processus métier, de confirmer quelles personnalisations restaient nécessaires et de décider lesquelles pouvaient être supprimées parce qu'elles ne correspondaient plus à un usage utile.

**Tests guidés par l'expérience des utilisateurs.** Je n'ai pas demandé aux équipes de se limiter à vérifier si l'application s'ouvrait. Je leur ai demandé de reproduire tout ce qu'elles effectuaient au quotidien puis de me signaler les différences, les blocages et les comportements inattendus. Cette démarche correspond à un test exploratoire métier. L'utilisateur s'appuie sur sa connaissance du travail réel pour parcourir les situations qu'il juge importantes, plutôt que de suivre uniquement un scénario technique écrit par le développeur. Les utilisateurs connaissaient mieux que quiconque leurs propres processus et pouvaient repérer des détails invisibles pour moi, par exemple un champ manquant, une étape devenue plus longue, un calcul différent ou une information qui n'apparaissait plus au bon endroit.`,
      en: `**Technical responsibility and functional responsibility.** I handled the entire technical scope on my own — code analysis, module adaptation, successive migrations, error diagnosis, production preparation, and fixes after the cutover. The executive assistant was my main functional counterpart. Her broad knowledge enabled her to validate business processes, confirm which customizations were still required, and decide which ones could be removed because they no longer served a useful purpose.

**Testing guided by user experience.** I did not ask the teams merely to check whether the application opened. I asked them to reproduce everything they did daily and report differences, blockers, and unexpected behavior. This approach is exploratory business testing — users rely on their knowledge of real work to cover the situations they consider important instead of following only a technical scenario written by the developer. Users understood their own processes better than anyone else and could identify details that were invisible to me, such as a missing field, a step that had become longer, a changed calculation, or information that no longer appeared in the correct place.`,
    },
    results: {
      fr: `L’ERP et les fonctions essentielles ont repris sur Odoo 19, **sans perte définitive de données signalée**. L’interruption pendant la bascule n’a pas fait l’objet d’une mesure publiable. La galerie présente des validations intermédiaires et des extraits de l’historique des corrections.

**Les personnalisations conservées.** Les seize modules internes ont été adaptés à Odoo 19. Quatre modules tiers devenus inutiles ont été retirés. Nous avons gardé environ 15 % des personnalisations Studio, notamment des filtres de recherche utilisés au quotidien. Les autres n’ont pas été reportées après examen de leur utilité et des fonctions disponibles dans la nouvelle version. À la fin de la stabilisation décrite ici, aucun besoin métier lié à ces retraits n’avait été identifié comme restant à réintroduire.

**Reprise des intégrations après la bascule.** L’ERP a redémarré en premier. J’ai ensuite adapté les appels que je maintenais, notamment ceux du site B2B, puis vérifié les échanges dans les deux sens. La plupart des intégrations reprises sont passées de JSON-RPC à JSON-2, ce qui a impliqué de revoir les appels et leur authentification par clé d’API. Les principaux échanges ont repris progressivement dans les jours qui ont suivi. Une mise à jour dépendait encore du prestataire qui maintenait l’intégration concernée.

**Un rapprochement bancaire plus réactif.** La comptabilité a constaté un affichage plus rapide des écrans de lettrage. Les comptables ouvraient ces écrans plusieurs fois par jour pour rapprocher les mouvements bancaires des factures et des paiements. Il s’agit d’un résultat qualitatif issu de l’usage, sans chronométrage comparable entre les deux versions. Le rapprochement restait plus lent que la plupart des autres vues de l’ERP, ce qui en faisait encore un bon candidat à une mesure ciblée.`,
      en: `The ERP and essential workflows resumed on Odoo 19, with **no reported permanent data loss**. There is no publishable measurement of the cutover downtime. The gallery shows intermediate validations and extracts from the history of fixes.

**Customizations we kept.** All sixteen in-house modules were adapted to Odoo 19. Four third-party modules that were no longer needed were retired. We kept around 15% of the Studio customizations, including search filters that staff used daily. The others were reviewed against current needs and the features available in the new version. By the end of the stabilization period described here, no business requirement affected by these removals had been identified as needing to be restored.

**Restoring integrations after cutover.** The ERP came back first. I then updated the calls I maintained, including those for the B2B website, and checked exchanges in both directions. Most of the integrations we restored moved from JSON-RPC to JSON-2, which required updating calls and their API-key authentication. The main data exchanges resumed over the following days. One update still depended on the provider that maintained the integration.

**More responsive bank reconciliation.** Accounting staff observed that matching screens loaded faster. They use those screens throughout the day to match bank transactions to invoices and payments. This is a qualitative observation from use, with no comparable timing series across the two versions. Bank reconciliation still took longer to load than most ERP screens, making it a worthwhile candidate for targeted measurement.`,
    },
    aftermath: {
      fr: `Après la mise en service, les incidents de migration ont rejoint le suivi habituel des demandes ERP. Certaines intégrations ont pu être adaptées en interne. Pour l’une d’elles, la mise à niveau dépendait encore du prestataire qui détenait le code. Les retours d’usage ont aussi servi à distinguer les anomalies à traiter des personnalisations anciennes qu’il n’était plus nécessaire de réintroduire.

**Une architecture moins dépendante de Studio et des extensions externes.** À moyen terme, je souhaite continuer à limiter les personnalisations Studio et les modules tiers lorsque leur usage rend le comportement difficile à suivre ou dépend d'un éditeur peu réactif. L'objectif n'est pas de tout redévelopper en interne — une extension externe maintenue et bien documentée peut rester le meilleur choix. En revanche, les adaptations propres à l'entreprise gagnent à être placées dans des modules internes versionnés. Leur code et l'historique de leurs changements sont alors visibles dans le dépôt GitHub, testables en préproduction et plus faciles à relire lors d'une future migration. Cette orientation augmente la maîtrise du système sans renoncer aux composants externes réellement utiles.`,
      en: `After release, migration issues moved into the normal ERP backlog. Some integrations could be updated in-house. One still depended on the provider who controlled its code. User feedback also helped distinguish defects that needed fixes from older customizations that no longer needed to be restored.

**An architecture less dependent on Studio and external extensions.** In the medium term, I want to continue limiting Studio customizations and third-party modules when they make behavior difficult to trace or create dependence on an unresponsive vendor. The objective is not to redevelop everything internally — a maintained and well-documented external extension may remain the best choice. However, company-specific adaptations benefit from being placed in version-controlled internal modules. Their code and change history are then visible in the GitHub repository, testable in staging, and easier to review during a future migration. This direction increases control over the system without rejecting external components that provide genuine value.`,
    },
    critique: {
      fr: `J’ai commencé l’inventaire des personnalisations Studio trop tard. Certaines règles invisibles dans le dépôt ont donc été découvertes pendant la migration. J’ai aussi consacré trop de temps à corriger les erreurs une par une avant de formaliser les vérifications récurrentes. Une fois l’inventaire structuré, il est devenu plus simple de décider quoi porter, remplacer ou retirer.

**Des erreurs d'automatisation qui auraient pu être détectées avant la production.** Certaines petites anomalies apparues après la bascule concernaient des actions automatisées. Elles n'étaient pas nécessairement visibles en ouvrant une vue ou en exécutant une seule fois un parcours métier. Une automatisation doit être testée avec son événement déclencheur, ses conditions d'entrée, les données qu'elle modifie et les effets qu'elle ne doit pas produire. Ma recette couvrait un grand nombre d'usages, mais elle ne formalisait pas systématiquement toutes ces dimensions pour chaque action. Une matrice de tests associant à chaque automatisation un cas nominal, un cas où elle ne doit pas se déclencher et un contrôle du résultat aurait permis de détecter davantage de ces erreurs avant la mise en production.

Je garderais les étapes intermédiaires et la validation par les métiers. J’ajouterais dès le départ un inventaire des automatisations, des scénarios reproductibles pour les actions planifiées et un relevé de la durée des répétitions. Cela donnerait aux responsables une base plus précise pour décider de la fenêtre de bascule.`,
      en: `I started inventorying Studio customizations too late. As a result, some rules invisible in the repository were discovered during the upgrade. I also spent too much time resolving failures one by one before formalizing the recurring checks. Once the inventory had a clear structure, it became easier to decide what to port, replace or retire.

**Automation errors that could have been detected before production.** Some minor anomalies discovered after the cutover involved automated actions. They were not necessarily visible simply by opening a view or running a business flow once. An automation must be tested with its triggering event, input conditions, data changes, and effects that must not occur. My acceptance testing covered many uses, but it did not systematically formalize all these dimensions for every action. A test matrix associating each automation with a normal case, a case in which it must not run, and a result check would have detected more of these errors before production release.

I would keep the intermediate upgrades and business acceptance testing. From the start, I would add an automation inventory, repeatable checks for scheduled actions and recorded rehearsal durations. That would give stakeholders better evidence for choosing a cutover window.`,
    },
    linkedCompetences: [
      "developpement-odoo",
      "python",
      "devops",
    ],
    contextualCompetences: {
      steps: ["autonomie", "perseverance"],
      aftermath: ["adaptabilite"],
      critique: ["amelioration-continue"],
    },
    media: [
      {
        type: "image",
        src: "/images/project-screenshots/odoo/odoo-success-migration-v17.png",
        title: {
          fr: "Validation de migration vers Odoo 17",
          en: "Odoo 17 migration validation",
        },
        description: {
          fr: "Étape intermédiaire de la migration Odoo.sh, utilisée pour isoler les incompatibilités avant la montée finale.",
          en: "Intermediate Odoo.sh migration step used to isolate incompatibilities before the final upgrade.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/odoo/odoo-success-migration-v18.png",
        title: {
          fr: "Validation de migration vers Odoo 18",
          en: "Odoo 18 migration validation",
        },
        description: {
          fr: "Passage de validation avant la branche v19, avec correction progressive des modules personnalisés et tiers.",
          en: "Validation step before the v19 branch, with progressive fixes on custom and third-party modules.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/odoo/odoo-success-migration-v19.png",
        title: {
          fr: "Migration Odoo 19 réussie",
          en: "Successful Odoo 19 migration",
        },
        description: {
          fr: "Validation de la branche cible Odoo 19 avant merge staging → production.",
          en: "Validation of the target Odoo 19 branch before the staging to production merge.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/odoo/migration-filter-removal-inventory.png",
        layout: "wide",
        title: {
          fr: "Inventaire préparatoire des filtres à supprimer",
          en: "Pre-migration inventory of filters to remove",
        },
        description: {
          fr: "Avant la migration, ce tableau recense les filtres utilisateurs à retirer, avec leur modèle, leur action, leur domaine et leur contexte. Cet inventaire délimite le périmètre du script de nettoyage et permet d'en contrôler les effets.",
          en: "Before the migration, this sheet lists the user filters to remove together with their model, action, domain, and context. The inventory defines the cleanup script's scope and makes its effects verifiable.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/odoo/migration-git-commits-jan21-26.png",
        layout: "wide",
        title: {
          fr: "Préparation des scripts et modules de migration",
          en: "Preparing migration scripts and modules",
        },
        description: {
          fr: "L'historique du 21 au 26 janvier 2026 retrace l'ajout des modules Odoo 19, la correction des scripts de pré et post-migration, l'ajout de tests unitaires et l'intégration de la branche migration_v19 sur master. Cette capture constitue une sélection représentative de l'historique versionné.",
          en: "The January 21-26, 2026 history records the addition of Odoo 19 modules, fixes to pre- and post-migration scripts, new unit tests, and the integration of migration_v19 into master. This screenshot is a representative selection from the versioned history.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/odoo/migration-git-commits-jan27-28.png",
        layout: "wide",
        title: {
          fr: "Corrections de données et de vues avant validation",
          en: "Data and view corrections before validation",
        },
        description: {
          fr: "Les commits des 27 et 28 janvier 2026 documentent les corrections QWeb et SIRET, la reprise de delivery_date, le nettoyage des filtres hérités et les itérations effectuées sur la branche de test. Cette capture constitue une sélection représentative de l'historique versionné.",
          en: "The January 27-28, 2026 commits document QWeb and SIRET corrections, the transfer to delivery_date, inherited-filter cleanup, and iterations on the test branch. This screenshot is a representative selection from the versioned history.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/odoo/migration-git-commits-feb06-08.png",
        layout: "wide",
        title: {
          fr: "Stabilisation technique et intégration sur master",
          en: "Technical stabilization and integration into master",
        },
        description: {
          fr: "Les commits du 6 au 8 février 2026 montrent l'indexation des modèles utilisés par les applications B2B et SBO, plusieurs correctifs techniques puis la fusion validée de migration_v19_test dans master. Cette capture constitue une sélection représentative de l'historique versionné.",
          en: "The February 6-8, 2026 commits show indexing work for the models used by the B2B and SBO applications, several technical fixes, and the verified merge of migration_v19_test into master. This screenshot is a representative selection from the versioned history.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/odoo/migration-hooks-fields-access-rights.png",
        layout: "wide",
        title: {
          fr: "Transfert des champs et reprise des droits",
          en: "Field transfer and access-right migration",
        },
        description: {
          fr: "Les hooks d'initialisation du module 1up_res_partner_extension transfèrent les champs existants vers le code versionné puis rattachent les utilisateurs aux nouveaux groupes.",
          en: "The initialization hooks in 1up_res_partner_extension move existing fields into version-controlled code, then assign users to the new groups.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/odoo/migration-studio-views-pre-migrate.png",
        layout: "wide",
        title: {
          fr: "Neutralisation des vues Studio incompatibles",
          en: "Disabling incompatible Studio views",
        },
        description: {
          fr: "Le hook de pré-migration repère et désactive les vues Studio devenues incompatibles afin qu'elles ne bloquent pas la reconstruction en Odoo 19.",
          en: "The pre-migration hook identifies and disables incompatible Studio views so they cannot block the Odoo 19 rebuild.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/odoo/migration-qweb-reports-post-migrate.png",
        layout: "wide",
        title: {
          fr: "Correction des rapports QWeb",
          en: "QWeb report corrections",
        },
        description: {
          fr: "Le hook de post-migration met à jour les rapports de facture, corrige l'utilisation du champ SIRET et adapte les sous-totaux avant la validation des vues.",
          en: "The post-migration hook updates invoice reports, corrects SIRET field usage, and adapts subtotals before validating the views.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/odoo/migration-obsolete-automations-cleanup.png",
        layout: "wide",
        title: {
          fr: "Suppression des automatisations obsolètes",
          en: "Removing obsolete automated actions",
        },
        description: {
          fr: "Les actions automatisées devenues invalides ou remplacées sont supprimées avec leurs métadonnées afin d'éviter des erreurs après la migration.",
          en: "Automated actions that became invalid or were replaced are removed with their metadata to prevent post-migration errors.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/odoo/migration-filters-data-templates.png",
        layout: "wide",
        title: {
          fr: "Exécution du nettoyage des filtres et de la migration des données",
          en: "Running filter cleanup and data migration",
        },
        description: {
          fr: "Après l'inventaire préparatoire présenté plus haut, ce journal confirme l'exécution observée de la suppression des filtres recensés, le transfert de la date de livraison Studio vers delivery_date et la correction des langues des modèles de courriel.",
          en: "After the pre-migration inventory shown above, this log confirms the observed execution of the inventoried filter removal, the transfer of the Studio delivery date to delivery_date, and the correction of email-template languages.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/odoo/migration-business-views-reactivation.png",
        layout: "wide",
        title: {
          fr: "Réactivation des vues métier compatibles",
          en: "Reactivating compatible business views",
        },
        description: {
          fr: "Après correction, les vues amazon_ept nécessaires sont réactivées et les modèles de courriel retrouvent une expression de langue compatible.",
          en: "After correction, the required amazon_ept views are reactivated and email templates receive a compatible language expression.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/odoo/migration-contact-references-post-init.png",
        layout: "wide",
        title: {
          fr: "Préconfiguration des centrales",
          en: "Preconfiguring central organizations",
        },
        description: {
          fr: "Le hook de post-initialisation du module Contacts crée les 16 centrales attendues afin que le référentiel métier soit disponible dès la fin de la migration.",
          en: "The Contacts module post-initialization hook creates the 16 required central organizations so the business reference data is ready when migration finishes.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/odoo/migration-odoo19-modules-loaded.png",
        layout: "wide",
        title: {
          fr: "Chargement complet de l'ERP en Odoo 19",
          en: "Complete ERP load on Odoo 19",
        },
        description: {
          fr: "La trace finale confirme le chargement des 339 modules, dont 1up_account_extension, puis l'exécution des derniers nettoyages de schéma.",
          en: "The final trace confirms that all 339 modules, including 1up_account_extension, loaded before the remaining schema cleanup ran.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/odoo/jira-odoo-workflow-board.png",
        layout: "wide",
        title: {
          fr: "Exemple actuel du workflow Odoo après la migration",
          en: "Current Odoo workflow example after the migration",
        },
        description: {
          fr: "Capture du 17 septembre 2026, postérieure à la migration v16-v19. Elle montre comment les demandes Odoo sont aujourd'hui suivies entre travail à faire, développement, revue, attente de mise en production et clôture.",
          en: "Captured on September 17, 2026, after the v16-v19 migration. It shows how Odoo requests are now tracked across planned work, development, review, deployment readiness, and completion.",
        },
      },
    ],
  };
