import type { Competence } from "./types";

export const python: Competence = {
  slug: "python",
  title: { fr: "Python", en: "Python" },
  type: "technical",
  level: "intermediate",
  radarValue: 60,
  icon: "Code",
  definition: {
    fr: `Python est un langage généraliste dont la lisibilité permet d'exprimer rapidement une règle, mais cette simplicité apparente ne dispense pas de concevoir les données, les responsabilités et les erreurs. Je l'utilise principalement dans Odoo, où il porte les modèles ORM, les champs calculés, les contraintes, les actions planifiées, les contrôleurs, les scripts de migration et les tests. Le code s'exécute au sein d'un framework riche : comprendre l'héritage, les décorateurs, les ensembles d'enregistrements et le contexte est aussi important que connaître la syntaxe du langage.

Ma pratique vise un code métier explicite. Je sépare les paramètres des algorithmes, évite les valeurs figées, travaille sur des ensembles d'enregistrements plutôt que sur des hypothèses de volume et tiens compte des transactions et des droits. Lorsque la documentation ne suffit pas, je lis les implémentations standard pour identifier la méthode réellement appelée et reproduire le pattern attendu par la version d'Odoo utilisée.

Je suis également les évolutions du langage, mais je distingue les nouveautés de Python de ce qui est disponible et pertinent dans l'environnement précis de l'ERP. Une fonctionnalité récente n'a de valeur que si elle reste compatible avec le runtime, les conventions et le cycle de migration du produit.`,
    en: `Python is a general-purpose language whose readability makes it possible to express a rule quickly, but that apparent simplicity does not remove the need to design data, responsibilities, and errors. I use it mainly in Odoo, where it powers ORM models, computed fields, constraints, scheduled actions, controllers, migration scripts, and tests. The code runs within a rich framework: understanding inheritance, decorators, recordsets, and context is as important as knowing the language syntax.

My practice aims for explicit business code. I separate settings from algorithms, avoid fixed values, operate on recordsets rather than volume assumptions, and account for transactions and permissions. When documentation is insufficient, I read standard implementations to identify the method actually called and reproduce the pattern expected by the Odoo version in use.

I also follow language evolution, while distinguishing Python innovations from what is available and relevant in the ERP's specific environment. A recent feature is valuable only when it remains compatible with the product's runtime, conventions, and migration cycle.`,
  },
  relatedNews: {
    date: "2025-10-07",
    dateLabel: { fr: "7 octobre 2025", en: "October 7, 2025" },
    title: {
      fr: "Python 3.14 stabilise le mode free-threaded",
      en: "Python 3.14 officially supports free-threaded mode",
    },
    summary: {
      fr: "Python 3.14 a rendu officiellement supporté le mode free-threaded et ajouté notamment les annotations différées, les template strings et plusieurs interpréteurs dans la bibliothèque standard. Suivre ces évolutions permet de distinguer les nouveautés du langage de ce qui reste compatible avec le cadre précis d'Odoo.",
      en: "Python 3.14 officially supported free-threaded mode and added deferred annotations, template strings, and multiple interpreters in the standard library. Following these changes helps distinguish new language capabilities from what remains compatible with Odoo's specific runtime constraints.",
    },
    source: "Python Software Foundation",
    href: "https://www.python.org/downloads/release/python-3140/",
  },
  anecdotes: [
    {
      title: {
        fr: "Exprimer des règles comptables dans un module configurable",
        en: "Expressing accounting rules in a configurable module",
      },
      content: {
        fr: `Le module de relance des impayés utilise Python pour sélectionner les factures, calculer leur position par rapport à l'échéance, appliquer les exclusions et déclencher l'action correspondant au palier. Les premières valeurs étaient trop figées. J'ai restructuré le code afin que les délais, modèles de courriel, destinataires, pièces jointes et seuils de blocage proviennent de la configuration. L'algorithme conserve la responsabilité d'appliquer la règle, tandis que les utilisateurs autorisés choisissent les valeurs métier depuis Odoo.`,
        en: `The overdue-reminder module uses Python to select invoices, calculate their position relative to the due date, apply exclusions, and trigger the action matching the current stage. Early values were too fixed. I restructured the code so intervals, email templates, recipients, attachments, and blocking thresholds come from configuration. The algorithm retains responsibility for applying the rule, while authorized users select business values from Odoo.`,
      },
      result: {
        fr: "Le traitement quotidien couvre automatiquement les factures concernées. Le code peut évoluer sans dupliquer une version du module pour chaque règle de la comptabilité ; le gain de temps reste à mesurer.",
        en: "Daily processing automatically covers the relevant invoices. The code can evolve without duplicating a module version for every accounting rule; the time saving remains to be measured.",
      },
      linkedRealisation: "modules-metier-odoo",
    },
    {
      title: {
        fr: "Adapter seize modules à trois changements de version",
        en: "Adapting sixteen modules across three version changes",
      },
      content: {
        fr: `Entre Odoo 16 et Odoo 19, des méthodes, modèles, champs et signatures ont changé. J'ai relu les modules internes à chaque version intermédiaire, identifié les appels devenus invalides, recherché les nouvelles implémentations dans le code source et adapté les scripts lorsque des données devaient être transformées. Cette progression 16 vers 17, 17 vers 18 puis 18 vers 19 évitait de cumuler trois causes possibles dans la même erreur et rendait chaque correction attribuable à une évolution précise.`,
        en: `Between Odoo 16 and Odoo 19, methods, models, fields, and signatures changed. I reviewed internal modules at each intermediate release, identified calls that had become invalid, searched for new implementations in the source code, and adapted scripts when data had to be transformed. Progressing from 16 to 17, 17 to 18, and then 18 to 19 avoided combining three possible causes in the same error and made each fix attributable to a specific change.`,
      },
      result: {
        fr: "Les seize modules utiles ont été conservés sur Odoo 19 et l'ERP a redémarré sans perte définitive de données. Cette migration a renforcé ma capacité à lire du Python écrit par d'autres développeurs et à distinguer une incompatibilité de framework d'une erreur métier locale.",
        en: "The sixteen useful modules were retained on Odoo 19 and the ERP restarted with no permanent data loss. This migration strengthened my ability to read Python written by other developers and distinguish a framework incompatibility from a local business error.",
      },
      linkedRealisation: "migration-odoo-v16-v19",
    },
    {
      title: {
        fr: "Diagnostiquer les performances et les droits dans le code source",
        en: "Diagnosing performance and permissions in source code",
      },
      content: {
        fr: `Le calcul de marge et certaines vues comptables m'ont obligé à dépasser le code du module lui-même. J'ai suivi les champs calculés, les dépendances et les appels ORM afin d'identifier ce qui déclenchait des recalculs coûteux. Sur les sujets de sécurité, j'ai vérifié les groupes, ACL et record rules au niveau des modèles et des enregistrements au lieu de me contenter d'un menu masqué. Cette lecture du framework reste prudente : je privilégie une extension contrôlée à une modification directe du moteur standard, qui compliquerait les correctifs officiels et les migrations futures.`,
        en: `Margin calculation and certain accounting views required me to go beyond the module's own code. I traced computed fields, dependencies, and ORM calls to identify what triggered expensive recomputation. For security matters, I checked groups, ACLs, and record rules at model and record level instead of relying on a hidden menu. This framework investigation remains cautious: I favor controlled extension over direct modification of the standard engine, which would complicate official fixes and future migrations.`,
      },
      result: {
        fr: "Les indicateurs de marge sont disponibles pendant l'exercice et les droits restent traités dans les mécanismes prévus par Odoo. La performance doit encore progresser, mais l'optimisation est menée avec des mesures et sans fragiliser le moteur standard.",
        en: "Margin indicators are available during the financial year, and permissions remain handled through Odoo's intended mechanisms. Performance still needs improvement, but optimization is being conducted through measurement without weakening the standard engine.",
      },
      linkedRealisation: "modules-metier-odoo",
    },
  ],
  selfCritique: {
    level: {
      fr: "Je situe mon niveau à intermédiaire. J'utilise Python quotidiennement pour des modules, migrations, API et tâches planifiées, et je peux lire des portions du framework pour diagnostiquer un problème. Mon expérience reste fortement concentrée sur Odoo ; je dois encore approfondir les usages du langage hors ERP, le typage, l'asynchronisme et les outils de profilage plus avancés.",
      en: "I assess myself as intermediate. I use Python daily for modules, migrations, APIs, and scheduled tasks, and I can read framework portions to diagnose a problem. My experience remains strongly concentrated on Odoo; I still need to deepen language use outside ERP, typing, asynchronous programming, and more advanced profiling tools.",
    },
    importance: {
      fr: "Python est le langage central de ma spécialisation Odoo. Progresser dans le langage améliore directement la qualité de mes modèles, de mes intégrations et de mes diagnostics, mais m'aide aussi à distinguer les bonnes pratiques générales des conventions propres au framework.",
      en: "Python is the central language of my Odoo specialization. Improving in the language directly improves the quality of my models, integrations, and diagnostics, while also helping me distinguish general good practices from framework-specific conventions.",
    },
    advice: {
      fr: "Je conseille de ne pas apprendre Python dans Odoo uniquement par imitation de modules existants. Il faut comprendre les recordsets, les décorateurs et les transactions, puis vérifier les patterns dans le code standard de la version ciblée. Une boucle Python lisible peut rester coûteuse ou incorrecte si elle ignore la manière dont l'ORM charge, calcule et sécurise les enregistrements.",
      en: "My advice is not to learn Python in Odoo solely by imitating existing modules. Recordsets, decorators, and transactions must be understood, then patterns verified in the standard code of the target release. Readable Python can still be expensive or incorrect if it ignores how the ORM loads, computes, and secures records.",
    },
  },
  evolution: {
    goal: {
      fr: "Atteindre un niveau avancé en consolidant le typage, les tests, le profilage et les mécanismes internes du langage, puis en appliquant ces acquis à des projets Python au-delà du seul cadre Odoo.",
      en: "Reach an advanced level by consolidating typing, testing, profiling, and internal language mechanisms, then applying that knowledge to Python projects beyond Odoo alone.",
    },
    training: {
      fr: "Je poursuis la lecture du code source d'Odoo et de projets Python open source, ainsi que l'étude des évolutions du langage. Le futur service de Business Intelligence doit me donner un contexte complémentaire pour travailler le traitement de données, les API et l'observabilité en Python.",
      en: "I continue reading Odoo source code and open-source Python projects, as well as studying language evolution. The future Business Intelligence service should provide a complementary setting for working with data processing, APIs, and observability in Python.",
    },
  },
  linkedRealisations: ["migration-odoo-v16-v19", "modules-metier-odoo"],
};
