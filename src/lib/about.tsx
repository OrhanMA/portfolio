import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";

export type AboutEditorialContent = {
  journey: readonly ReactNode[];
  values: readonly {
    content: ReactNode;
    competenceSlug: string;
  }[];
  project: readonly ReactNode[];
  qualities: readonly {
    title: string;
    content: ReactNode;
    competenceSlug: string;
  }[];
  interests: readonly ReactNode[];
};

/**
 * Long-form About copy belongs to the editorial module rather than the route
 * JSX. Interface labels and headings remain in the locale dictionaries.
 */
export const aboutEditorialContent: Record<Locale, AboutEditorialContent> = {
  fr: {
    journey: [
      <p key="journey-1">
        Initialement en études de droit à l&apos;Université Savoie Mont Blanc,
        j&apos;ai remis en question ce choix pendant la pandémie de Covid-19.
        Durant cette période, je me suis désintéressé de mes études et
        j&apos;ai commencé à explorer le fonctionnement du web en autodidacte :
        YouTube, articles, puis The Odin Project, un cursus complet pour
        maîtriser le développement web.
      </p>,
      <p key="journey-2">
        Ce qui m&apos;a accroché dans ce domaine, c&apos;est le côté mathématique :
        il y a un fonctionnement logique et la limite, c&apos;est notre niveau de
        connaissances. Il n&apos;y a pas de hasard, pas d&apos;interprétation,
        seulement une vérité algorithmique. Le second aspect qui m&apos;attire est
        la possibilité de résoudre de vrais problèmes au quotidien.
      </p>,
      <p key="journey-3">
        J&apos;ai intégré le centre de formation Simplon à Chambéry pour préparer
        le titre de développeur web et web mobile (DWWM, RNCP bac + 2, 2023),
        puis celui de concepteur et développeur d&apos;applications à Grenoble
        (RNCP bac + 3, 2024). Cette seconde formation comprenait un stage de
        cinq mois au Laboratoire d&apos;Informatique de Grenoble. Après
        l&apos;obtention de mon titre, j&apos;ai démarré une alternance en décembre
        2024 chez 1UP Distribution en tant que développeur full-stack, en
        parallèle d&apos;un mastère Expert en Ingénierie du Logiciel (RNCP niveau
        7, bac + 5) à l&apos;ISCOD, jusqu&apos;en mars 2027.
      </p>,
    ],
    values: [
      {
        competenceSlug: "amelioration-continue",
        content: <p key="values-1">
          <strong>Responsabilité</strong> : ce que je développe et modifie est
          déployé en production. Je suis responsable de livrer des fonctionnalités
          de qualité. Sur Odoo, j&apos;ai une autonomie totale et j&apos;ai déjà
          réalisé des dizaines de fonctionnalités et de corrections. Sur le site
          B2B en Symfony, j&apos;ai une autonomie complète sur le développement de
          fonctionnalités jusqu&apos;à la mise en production sur le serveur.
        </p>,
      },
      {
        competenceSlug: "autonomie",
        content: <p key="values-2">
          <strong>Autonomie</strong> : dès le premier jour de mon alternance,
          j&apos;ai dû apprendre le framework Odoo en autonomie : comprendre la base
          de code du framework, l&apos;existant en matière de configuration et de code
          personnalisé, et répondre au fur et à mesure aux demandes sur l&apos;ERP.
        </p>,
      },
      {
        competenceSlug: "amelioration-continue",
        content: <p key="values-3">
          <strong>Amélioration continue</strong> : je n&apos;ai pas la prétention
          d&apos;implémenter à chaque fois la fonctionnalité parfaite. C&apos;est
          pourquoi je cherche continuellement à améliorer l&apos;existant, pas
          seulement à développer de nouvelles fonctionnalités.
        </p>,
      },
    ],
    project: [
      <p key="project-1">
        Le cap professionnel vise un rôle de{" "}
        <strong>développeur confirmé et référent technique Odoo</strong> au sein
        d&apos;une PME utilisatrice finale. Cette proximité avec les équipes métier
        et les utilisateurs permet de transformer leurs besoins en solutions
        durables, avec une priorité claire : <strong>l&apos;écoute utilisateur</strong>{" "}
        et <strong>la qualité avant la rapidité</strong>.
      </p>,
      <p key="project-2">
        Ce positionnement a vocation à dépasser Odoo pour couvrir l&apos;
        <strong>intégration d&apos;ERP avec des systèmes externes</strong> au moyen
        d&apos;API personnalisées destinées aux clients finaux. L&apos;évolution
        recherchée inclut progressivement la gestion de projet, la décision
        produit et l&apos;architecture logicielle, au service de l&apos;automatisation
        et d&apos;outils métier réellement utiles.
      </p>,
      <p key="project-3">
        À cinq ans, l&apos;objectif est d&apos;atteindre un niveau de maîtrise solide
        sur la stack actuelle, Odoo/Python, Symfony/PHP et Next.js/React, tout
        en approfondissant les <strong>API, le DevOps et le clean code</strong> aux
        interfaces entre ERP et systèmes externes.
      </p>,
      <p key="project-4">
        Le projet personnel qui concrétise cette trajectoire est la création
        d&apos;un <strong>outil de business intelligence auto-hébergé</strong> pour
        le pilotage opérationnel. Il synchronisera les données d&apos;Odoo par API
        afin de répondre au principal point de friction rencontré dans
        l&apos;entreprise : faire parler la donnée Odoo dans un système plus moderne
        et automatisé.
      </p>,
    ],
    qualities: [
      {
        title: "Persévérance",
        competenceSlug: "perseverance",
        content: <p>
        Je ne lâche pas sur une tâche complexe,
        quitte à prendre plus de temps que prévu pour trouver la solution. Mon
        parcours même, du droit au développement, en est la preuve.
        </p>,
      },
      {
        title: "Adaptabilité",
        competenceSlug: "adaptabilite",
        content: <p>
        La diversité des projets, des technologies
        et des contextes sur lesquels j&apos;ai travaillé a renforcé ma capacité
        d&apos;adaptation. Au quotidien, je navigue entre Odoo/Python, Symfony/PHP
        et Next.js/React.
        </p>,
      },
      {
        title: "Communication",
        competenceSlug: "communication",
        content: <p>
        Encore en progression, mais la
        documentation et la communication avec les profils non techniques sont
        deux aspects que je souhaite encore améliorer et maîtriser. Si on ne
        communique pas sur ce qu&apos;on fait, nos fonctionnalités n&apos;existent pas
        aux yeux des utilisateurs.
        </p>,
      },
    ],
    interests: [
      <p key="interests-1">
        En dehors du code, je suis passionné de <strong>basket-ball</strong> :
        qu&apos;il s&apos;agisse de jouer au basket 3x3 en extérieur ou de suivre la
        NBA (surtout les Spurs de Wembanyama). Je suis également membre de
        l&apos;<strong>Académie d&apos;Échecs d&apos;Aix-les-Bains</strong>, où je contribue
        à l&apos;organisation du club et participe régulièrement à des tournois,
        en présentiel, notamment face à des joueurs classés à plus de 1 700
        Elo FIDE, comme en ligne contre des clubs du monde entier.
      </p>,
    ],
  },
  en: {
    journey: [
      <p key="journey-1">
        I initially studied law at Université Savoie Mont Blanc, but
        reconsidered that choice during the Covid-19 pandemic. During that
        period, I lost interest in my studies and started exploring how the web
        works on my own: through YouTube, articles, and then The Odin Project,
        a comprehensive web development curriculum.
      </p>,
      <p key="journey-2">
        What drew me to this field was its mathematical side: it follows a
        logical structure, and the only limit is the depth of our knowledge.
        There is no guesswork or room for interpretation, only algorithmic
        truth. The other appeal is the ability to solve real-world problems
        every day.
      </p>,
      <p key="journey-3">
        I joined the Simplon training center in Chambéry for its Web and Mobile
        Web Developer program (DWWM, RNCP level 5, 2023), then completed an
        Application Designer and Developer program in Grenoble (RNCP level 6,
        2024), which included a five-month internship at the Grenoble Computer
        Science Laboratory. After obtaining my qualification, I started a
        work-study program in December 2024 at 1UP Distribution as a full-stack
        developer while pursuing a Master&apos;s in Software Engineering (RNCP
        level 7) at ISCOD through March 2027.
      </p>,
    ],
    values: [
      {
        competenceSlug: "amelioration-continue",
        content: <p key="values-1">
          <strong>Responsibility</strong>: what I develop and modify is shipped to
          production. I&apos;m responsible for delivering high-quality features. On
          Odoo, I have full autonomy and have already completed dozens of features
          and bug fixes. On the Symfony B2B site, I have complete autonomy over
          feature development through to production deployment on the server.
        </p>,
      },
      {
        competenceSlug: "autonomie",
        content: <p key="values-2">
          <strong>Autonomy</strong>: from the first day of my work-study program,
          I had to learn the Odoo framework independently: understanding the
          framework&apos;s codebase, existing configurations and custom code, and
          addressing ERP requests as they arose.
        </p>,
      },
      {
        competenceSlug: "amelioration-continue",
        content: <p key="values-3">
          <strong>Continuous improvement</strong>: I don&apos;t claim to implement
          the perfect feature every time. That&apos;s why I continuously seek to
          improve existing solutions, not just develop new features.
        </p>,
      },
    ],
    project: [
      <p key="project-1">
        The professional goal is to become an{" "}
        <strong>experienced developer and Odoo technical lead</strong> within an
        end-user SME. Working closely with business teams and users makes it
        possible to turn their needs into sustainable solutions, with a clear
        priority: <strong>listening to users</strong> and{" "}
        <strong>quality before speed</strong>.
      </p>,
      <p key="project-2">
        This role is intended to extend beyond Odoo to cover{" "}
        <strong>ERP integrations with external systems</strong> through custom
        APIs for end customers. My intended progression includes project
        management, product decisions, and software architecture, supporting
        automation and genuinely useful business tools.
      </p>,
      <p key="project-3">
        Within five years, the goal is to gain a strong command of the current
        stack, Odoo/Python, Symfony/PHP, and Next.js/React, while deepening
        expertise in <strong>APIs, DevOps, and clean code</strong> at the
        boundaries between ERP platforms and external systems.
      </p>,
      <p key="project-4">
        The personal project that embodies this direction is a{" "}
        <strong>self-hosted business intelligence tool</strong> for operational
        management. It will synchronize Odoo data through APIs to address the
        biggest pain point encountered in the company: turning Odoo data into
        actionable information in a more modern, automated system.
      </p>,
    ],
    qualities: [
      {
        title: "Perseverance",
        competenceSlug: "perseverance",
        content: <p>
        I don&apos;t give up on complex tasks, even
        if it means taking more time than planned to find the solution. My career
        path itself, from law to development, is proof of that.
        </p>,
      },
      {
        title: "Adaptability",
        competenceSlug: "adaptabilite",
        content: <p>
        Working on projects with varied
        technologies and requirements has strengthened my adaptability. On a
        daily basis, I navigate between Odoo/Python, Symfony/PHP, and
        Next.js/React.
        </p>,
      },
      {
        title: "Communication",
        competenceSlug: "communication",
        content: <p>
        Still a work in progress, but
        documentation and communication with non-technical colleagues are two
        areas I want to improve and master. If we don&apos;t communicate about what
        we do, our features don&apos;t exist in users&apos; eyes.
        </p>,
      },
    ],
    interests: [
      <p key="interests-1">
        Outside of coding, I&apos;m passionate about <strong>basketball</strong>:
        whether playing 3x3 basketball outdoors or watching the NBA (especially
        Wembanyama&apos;s Spurs). I&apos;m also a member of the{" "}
        <strong>Aix-les-Bains Chess Academy</strong>, where I help organize the
        club and regularly compete, both in person, including against players
        rated above 1,700 FIDE Elo, and online against clubs from around the
        world.
      </p>,
    ],
  },
};
