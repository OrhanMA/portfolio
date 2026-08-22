import type { Competence } from "./types";

export const devops: Competence = {
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
    fr: `Le DevOps rassemble les pratiques qui rendent une modification reproductible depuis le dépôt de code jusqu'à son exploitation : intégration continue, tests, construction, déploiement, configuration, secrets, sauvegardes, surveillance et retour arrière. L'objectif n'est pas seulement d'automatiser une commande. Il faut réduire l'écart entre l'environnement testé et celui qui sert réellement les utilisateurs, puis disposer d'indices suffisants pour comprendre un échec.

Mon expérience se déroule principalement sur des plateformes gérées. Odoo.sh fournit les environnements de développement, staging et production, les sauvegardes et les builds de l'ERP ; Vercel prend en charge le déploiement des applications Next.js ; GitHub Actions exécute les contrôles du portfolio. Je sais utiliser et relier ces services, lire leurs journaux et préparer une bascule. Je distingue cependant cette pratique de l'administration profonde d'une infrastructure : je ne revendique pas encore une maîtrise avancée de Kubernetes, du réseau, de l'infrastructure as code ou de l'exploitation d'un cluster en production.

La sécurité de la chaîne logicielle fait partie de la compétence : versions d'images, dépendances, provenance, secrets et permissions du pipeline. Une sauvegarde n'est utile que si elle correspond à un état cohérent et peut devenir un point de restauration.`,
    en: `DevOps brings together the practices that make a change reproducible from the code repository through production operations: continuous integration, testing, build, deployment, configuration, secrets, backups, monitoring, and rollback. The objective is not merely to automate a command. The gap between the tested environment and the one actually serving users must be reduced, and sufficient evidence retained to understand a failure.

My experience is primarily on managed platforms. Odoo.sh provides development, staging, and production environments, backups, and ERP builds; Vercel handles Next.js application deployment; GitHub Actions runs portfolio checks. I can use and connect these services, read their logs, and prepare a cutover. I distinguish this practice from deep infrastructure administration: I do not yet claim advanced mastery of Kubernetes, networking, infrastructure as code, or operating a production cluster.

Software supply-chain security is part of the skill: image versions, dependencies, provenance, secrets, and pipeline permissions. A backup is useful only when it represents a consistent state and can become a restoration point.`,
  },
  relatedNews: {
    date: "2026-06-04",
    dateLabel: { fr: "4 juin 2026", en: "June 4, 2026" },
    title: {
      fr: "Docker détaille le rôle des images durcies dans la chaîne logicielle",
      en: "Docker details the role of hardened images in the software supply chain",
    },
    summary: {
      fr: "Docker présente les images durcies comme des bases minimales, continuellement corrigées et accompagnées de métadonnées vérifiables. Cette évolution replace la sécurité de la chaîne d'approvisionnement, les SBOM et la provenance des images au cœur des pratiques DevOps.",
      en: "Docker describes hardened images as minimal, continuously patched foundations with verifiable metadata. This development puts software supply-chain security, SBOMs, and image provenance at the center of DevOps practice.",
    },
    source: "Docker",
    href: "https://www.docker.com/blog/what-are-hardened-images/",
  },
  anecdotes: [
    {
      title: {
        fr: "Préparer la bascule et le retour arrière d'Odoo 19",
        en: "Preparing the Odoo 19 cutover and rollback",
      },
      content: {
        fr: `La migration ERP utilisait les environnements Odoo.sh reliés au dépôt GitHub. J'ai effectué les adaptations sur des branches dédiées, lancé les builds, lu les journaux de migration et restauré des copies réalistes de la production pour les recettes. Avant la bascule, j'ai vérifié qu'une sauvegarde complète associait la base PostgreSQL et le filestore du même état, préparé l'ordre de remise en service des intégrations et défini le retour arrière vers le dernier état stable si une anomalie critique empêchait la reprise.`,
        en: `The ERP migration used Odoo.sh environments connected to the GitHub repository. I made adaptations on dedicated branches, ran builds, read migration logs, and restored realistic production copies for acceptance testing. Before cutover, I verified that a complete backup combined the PostgreSQL database and filestore from the same state, prepared the order for restoring integrations, and defined rollback to the last stable state if a critical anomaly prevented recovery.`,
      },
      result: {
        fr: "La production a repris après l'interruption planifiée et aucun retour arrière n'a été nécessaire. Le scénario restait néanmoins prêt, ce qui a permis de traiter la bascule comme une opération contrôlée plutôt que comme un pari sur la réussite du premier démarrage.",
        en: "Production resumed after the planned outage, and no rollback was required. The scenario was nevertheless ready, allowing the cutover to be treated as a controlled operation rather than a bet on the first startup succeeding.",
      },
      linkedRealisation: "migration-odoo-v16-v19",
    },
    {
      title: {
        fr: "Construire une chaîne de livraison pour le site corporate",
        en: "Building a delivery chain for the corporate website",
      },
      content: {
        fr: `Le site corporate est versionné sur GitHub et préparé pour un déploiement Vercel. J'ai intégré les variables d'environnement, les contrôles de qualité, les tests des composants et de l'API, ainsi que les parcours Playwright. Le choix de Vercel apporte une chaîne de prévisualisation et de production adaptée à Next.js, mais je conserve l'architecture suffisamment standard pour éviter qu'un besoin futur rende la plateforme impossible à quitter. La recette de la version candidate doit précéder la bascule et les services connectés doivent être vérifiés après déploiement.`,
        en: `The corporate website is version-controlled on GitHub and prepared for Vercel deployment. I integrated environment variables, quality checks, component and API tests, and Playwright journeys. Choosing Vercel provides a preview and production chain suited to Next.js, but I keep the architecture standard enough to avoid making the platform impossible to leave if requirements change. Release-candidate acceptance testing must precede cutover, and connected services must be checked after deployment.`,
      },
      result: {
        fr: "Le projet possède déjà une chaîne reproductible jusqu'aux prévisualisations, ainsi que des fondations de contrôle avant sa future production. Le choix de plateforme reste évalué selon son rapport coût-service plutôt que considéré comme définitif.",
        en: "The project already has a reproducible pipeline with preview deployments and a foundation of checks for its future production release. The platform choice continues to be evaluated by its cost-to-service ratio rather than treated as permanent.",
      },
      linkedRealisation: "refonte-site-corporate",
    },
    {
      title: {
        fr: "Automatiser les contrôles du portfolio sans masquer leurs limites",
        en: "Automating portfolio checks without hiding their limits",
      },
      content: {
        fr: `Le portfolio utilise plusieurs niveaux de tests : tests unitaires sous jsdom, tests de composants dans un navigateur Playwright, tests de régression visuelle et parcours de bout en bout. GitHub Actions exécute les contrôles afin qu'une modification ne dépende pas uniquement de mon environnement local. Les secrets de Resend, reCAPTCHA et Google Tag Manager restent fournis par variables d'environnement. Les dépendances externes sont simulées dans certains tests, limite que je documente au lieu de confondre une suite verte avec une validation complète du déploiement.`,
        en: `The portfolio uses several testing levels: unit tests under jsdom, component tests in a Playwright browser, visual regression tests, and end-to-end journeys. GitHub Actions runs checks so a change does not depend solely on my local environment. Resend, reCAPTCHA, and Google Tag Manager secrets remain provided through environment variables. External dependencies are simulated in some tests, a limitation I document instead of confusing a green suite with complete deployment validation.`,
      },
      result: {
        fr: "Plus de 170 tests protègent aujourd'hui les comportements principaux et les relations de contenu. Cette automatisation accélère les changements, tout en laissant identifiés les contrôles réels encore nécessaires aux frontières avec les services externes.",
        en: "More than 170 tests now protect the main behaviors and content relationships. This automation speeds up change while keeping the real checks required at external-service boundaries explicitly identified.",
      },
      linkedRealisation: "portfolio-professionnel",
    },
  ],
  selfCritique: {
    level: {
      fr: "Je conserve un niveau débutant, mais il s'agit d'un débutant ayant déjà préparé des déploiements et une migration critique sur des plateformes gérées. Je sais utiliser les pipelines, journaux, sauvegardes et variables d'environnement. Je manque encore d'expérience sur la construction et l'exploitation de l'infrastructure elle-même, notamment le réseau, l'observabilité distribuée et l'infrastructure as code.",
      en: "I still rate myself as a beginner, albeit one who has already prepared deployments and a critical migration on managed platforms. I can use pipelines, logs, backups, and environment variables. I still lack experience building and operating the infrastructure itself, especially networking, distributed observability, and infrastructure as code.",
    },
    importance: {
      fr: "La compétence est importante parce que je porte souvent la chaîne complète jusqu'à la production. Elle conditionne directement la fiabilité de mes compétences Odoo, backend et frontend : un bon correctif perd sa valeur s'il ne peut pas être déployé, surveillé ou restauré proprement.",
      en: "This skill matters because I often own the complete chain through production. It directly conditions the reliability of my Odoo, backend, and frontend skills: a good fix loses value if it cannot be deployed, monitored, or restored cleanly.",
    },
    advice: {
      fr: "Je conseille de préparer le retour arrière avant la mise en production, de vérifier les sauvegardes par leur cohérence et pas seulement leur présence, puis de lire les logs comme une donnée du produit. Les plateformes gérées réduisent le travail d'exploitation, mais elles ne suppriment ni la responsabilité des secrets, ni les tests, ni la compréhension de ce qu'elles automatisent.",
      en: "My advice is to prepare rollback before production, verify backups through consistency rather than mere presence, and treat logs as product data. Managed platforms reduce operational work, but they do not remove responsibility for secrets, tests, or understanding what they automate.",
    },
  },
  evolution: {
    goal: {
      fr: "Atteindre un niveau intermédiaire solide en sachant décrire et automatiser une infrastructure simple, mettre en place une observabilité exploitable et conduire un déploiement avec restauration testée au-delà d'une seule plateforme gérée.",
      en: "Reach a solid intermediate level by being able to describe and automate a simple infrastructure, establish usable observability, and lead a deployment with tested restoration beyond a single managed platform.",
    },
    training: {
      fr: "Je poursuis mon apprentissage de Docker, des images minimales, des SBOM, des pipelines CI/CD et du monitoring. Mon futur outil de Business Intelligence auto-hébergé doit servir de terrain pour pratiquer les conteneurs, la persistance, les sauvegardes, les métriques et l'exploitation régulière d'un service.",
      en: "I continue studying Docker, minimal images, SBOMs, CI/CD pipelines, and monitoring. My future self-hosted Business Intelligence tool should provide a setting for practicing containers, persistence, backups, metrics, and regular service operation.",
    },
  },
  linkedRealisations: [
    "migration-odoo-v16-v19",
    "modules-metier-odoo",
    "refonte-site-corporate",
    "portfolio-professionnel",
  ],
};
