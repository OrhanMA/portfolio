import type { Metadata } from "next";
import { createLocalizedMetadata } from "@/lib/metadata";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { getLocalizedPageContext } from "../route-context";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);
  return createLocalizedMetadata({
    locale: loc,
    pathname: "/a-propos",
    title: dict.aboutPage.pageTitle,
    description: dict.aboutPage.pageDescription,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { dictionary: dict } = await getLocalizedPageContext(locale);

  const isFr = locale === "fr";

  return (
    <div>
      <EditorialPageHeader
        eyebrow={dict.nav.about}
        title={dict.aboutPage.heading}
        description={dict.aboutPage.subtext}
        titleClassName="uppercase"
      />

      {/* Section 1: Mon parcours */}
      <section className="bg-muted/35 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 border border-border bg-card p-5 sm:p-8 lg:grid-cols-[120px_1fr]">
            <p className="editorial-index">
              I
            </p>
            <div>
            <h2 className="mb-4 text-2xl font-black uppercase tracking-[-0.03em] sm:text-3xl">
                {dict.aboutPage.journeyHeading}
              </h2>
            <div className="prose dark:prose-invert max-w-none">
              {isFr ? (
                <>
                  <p>
                    Initialement en études de droit à l&apos;Université Savoie
                    Mont Blanc, j&apos;ai remis en question ce choix pendant la
                    pandémie COVID. Durant cette période, je me suis
                    désintéressé de mes études et j&apos;ai commencé à explorer le
                    fonctionnement du web en autodidacte — YouTube, articles,
                    puis The Odin Project, un cursus complet pour maîtriser le
                    développement web.
                  </p>
                  <p>
                    Ce qui m&apos;a accroché dans ce domaine, c&apos;est le côté
                    mathématique : il y a un fonctionnement logique et la limite,
                    c&apos;est notre niveau de connaissance. Il n&apos;y a pas de
                    hasard, pas d&apos;interprétations, seulement une vérité
                    algorithmique. Et le deuxième élément, c&apos;est la
                    possibilité de résoudre de vrais problèmes, au quotidien.
                  </p>
                  <p>
                    J&apos;ai intégré le centre de formation Simplon à Chambéry
                    pour une formation en développement web et web mobile (RNCP
                    bac+2, 2024), puis à Grenoble pour une formation Concepteur
                    et Développeur d&apos;Applications (RNCP bac+3, 2024), qui
                    incluait un stage de 5 mois au Laboratoire
                    d&apos;Informatique de Grenoble. Après l&apos;obtention de
                    mon titre, j&apos;ai démarré une alternance en décembre 2024
                    chez 1UP Distribution en tant que développeur fullstack, en
                    parallèle d&apos;un mastère Expert en Ingénierie du Logiciel
                    (RNCP 7, bac+5) à l&apos;ISCOD, jusqu&apos;en mars 2027.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Originally studying law at Université Savoie Mont Blanc, I
                    questioned that choice during the COVID pandemic. During that
                    period, I lost interest in my studies and started exploring
                    how the web works on my own — YouTube, articles, then The
                    Odin Project, a comprehensive curriculum for mastering web
                    development.
                  </p>
                  <p>
                    What hooked me about this field is the mathematical side:
                    there&apos;s a logical framework and the only limit is our
                    level of knowledge. There&apos;s no chance, no
                    interpretations, only algorithmic truth. The second element
                    is the ability to solve real problems, every day.
                  </p>
                  <p>
                    I joined the Simplon training center in Chambéry for web and
                    mobile web development training (RNCP level 5, 2024), then in
                    Grenoble for Application Designer &amp; Developer training
                    (RNCP level 6, 2024), which included a 5-month internship at
                    the Grenoble Computer Science Laboratory. After obtaining my
                    degree, I started a work-study program in December 2024 at
                    1UP Distribution as a fullstack developer, alongside a
                    Master&apos;s in Software Engineering (RNCP level 7) at
                    ISCOD, until March 2027.
                  </p>
                </>
              )}
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Mes valeurs */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 border border-border bg-card p-5 sm:p-8 lg:grid-cols-[120px_1fr]">
            <p className="editorial-index">
              II
            </p>
            <div>
            <h2 className="mb-4 text-2xl font-black uppercase tracking-[-0.03em] sm:text-3xl">
                {dict.aboutPage.valuesHeading}
              </h2>
            <div className="prose dark:prose-invert max-w-none">
              {isFr ? (
                <>
                  <p>
                    <strong>Responsabilité</strong> — Ce que je développe et
                    modifie est déployé en production. Je suis responsable de
                    livrer des fonctionnalités de qualité. Sur Odoo, j&apos;ai
                    une autonomie totale et j&apos;ai déjà réalisé des dizaines
                    de fonctionnalités et de corrections. Sur le site B2B en Symfony,
                    j&apos;ai une autonomie complète sur le développement de
                    fonctionnalités jusqu&apos;à la mise en production sur le
                    serveur.
                  </p>
                  <p>
                    <strong>Autonomie</strong> — Dès le premier jour de mon
                    alternance, j&apos;ai dû apprendre le framework Odoo en
                    autonomie : comprendre la base de code du framework,
                    l&apos;existant en matière de configuration et de code personnalisé,
                    et répondre au fur et à mesure aux demandes sur l&apos;ERP.
                  </p>
                  <p>
                    <strong>Amélioration continue</strong> — Je n&apos;ai pas la
                    prétention d&apos;implémenter à chaque fois la fonctionnalité
                    parfaite. C&apos;est pourquoi je cherche continuellement à
                    améliorer l&apos;existant, pas seulement à développer de
                    nouvelles fonctionnalités.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Responsibility</strong> — What I develop and modify
                    is shipped to production. I&apos;m responsible for delivering
                    quality features. On Odoo, I have full autonomy and have
                    already completed dozens of features and bug fixes. On the
                    B2B site in Symfony, I have complete autonomy over feature
                    development through to production deployment on the server.
                  </p>
                  <p>
                    <strong>Autonomy</strong> — From day one of my work-study, I
                    had to learn the Odoo framework independently: understanding
                    the framework&apos;s codebase, existing configurations and
                    custom code, and progressively responding to ERP requests.
                  </p>
                  <p>
                    <strong>Continuous improvement</strong> — I don&apos;t claim
                    to implement the perfect feature every time. That&apos;s why
                    I continuously seek to improve what exists, not just develop
                    new features.
                  </p>
                </>
              )}
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Mon projet professionnel et personnel */}
      <section className="bg-muted/35 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 border border-border bg-card p-5 sm:p-8 lg:grid-cols-[120px_1fr]">
            <p className="editorial-index">
              III
            </p>
            <div>
              <h2 className="mb-4 text-2xl font-black uppercase tracking-[-0.03em] sm:text-3xl">
                {dict.aboutPage.projectHeading}
              </h2>
              <div className="prose max-w-none dark:prose-invert">
                {isFr ? (
                  <>
                    <p>
                      Le cap professionnel vise un rôle de{" "}
                      <strong>
                        développeur confirmé et référent technique Odoo
                      </strong>{" "}
                      au sein d&apos;une PME utilisatrice finale. Cette proximité
                      avec les équipes métier et les utilisateurs permet de
                      transformer leurs besoins en solutions durables, avec une
                      priorité claire : <strong>l&apos;écoute utilisateur</strong>{" "}
                      et <strong>la qualité avant la rapidité</strong>.
                    </p>
                    <p>
                      Ce positionnement a vocation à dépasser Odoo pour couvrir
                      l&apos;
                      <strong>
                        intégration d&apos;ERP avec des systèmes externes
                      </strong>{" "}
                      au moyen d&apos;API personnalisées destinées aux clients
                      finaux. L&apos;évolution recherchée inclut progressivement
                      la gestion de projet, la décision produit et
                      l&apos;architecture logicielle, au service de
                      l&apos;automatisation et d&apos;outils métier réellement
                      utiles.
                    </p>
                    <p>
                      À cinq ans, l&apos;objectif est d&apos;atteindre un niveau
                      de maîtrise solide sur la stack actuelle — Odoo/Python,
                      Symfony/PHP et Next.js/React — tout en approfondissant les{" "}
                      <strong>API, le DevOps et le clean code</strong> aux
                      interfaces entre ERP et systèmes externes.
                    </p>
                    <p>
                      Le projet personnel qui concrétise cette trajectoire est la
                      création d&apos;un{" "}
                      <strong>outil de business intelligence auto-hébergé</strong>{" "}
                      pour le pilotage opérationnel. Il synchronisera les données
                      d&apos;Odoo par API afin de répondre au principal point de
                      friction rencontré dans l&apos;entreprise : faire parler
                      la donnée Odoo dans un système plus moderne et automatisé.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      The professional goal is to become an{" "}
                      <strong>
                        experienced developer and Odoo technical lead
                      </strong>{" "}
                      within an end-user SME. Working closely with business teams
                      and users makes it possible to turn their needs into
                      sustainable solutions, with a clear priority:{" "}
                      <strong>listening to users</strong> and{" "}
                      <strong>quality before speed</strong>.
                    </p>
                    <p>
                      This role is intended to extend beyond Odoo to cover{" "}
                      <strong>
                        ERP integrations with external systems
                      </strong>{" "}
                      through custom APIs for end customers. The desired
                      progression includes project management, product decisions,
                      and software architecture, supporting automation and
                      genuinely useful business tools.
                    </p>
                    <p>
                      Within five years, the goal is to achieve strong mastery of
                      the current stack — Odoo/Python, Symfony/PHP, and
                      Next.js/React — while deepening expertise in{" "}
                      <strong>APIs, DevOps, and clean code</strong> at the
                      boundaries between ERP platforms and external systems.
                    </p>
                    <p>
                      The personal project that puts this direction into practice
                      is a{" "}
                      <strong>self-hosted business intelligence tool</strong> for
                      operational management. It will synchronize Odoo data
                      through APIs to address the biggest pain point encountered
                      in the company: turning Odoo data into actionable
                      information in a more modern, automated system.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Mes qualités humaines */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 border border-border bg-card p-5 sm:p-8 lg:grid-cols-[120px_1fr]">
            <p className="editorial-index">
              IV
            </p>
            <div>
            <h2 className="mb-4 text-2xl font-black uppercase tracking-[-0.03em] sm:text-3xl">
                {dict.aboutPage.qualitiesHeading}
              </h2>
            <div className="prose dark:prose-invert max-w-none">
              {isFr ? (
                <>
                  <p>
                    <strong>Persévérance</strong> — Je ne lâche pas sur une tâche
                    complexe, quitte à prendre plus de temps que prévu pour
                    trouver la solution. Mon parcours même — du droit au
                    développement — en est la preuve.
                  </p>
                  <p>
                    <strong>Adaptabilité</strong> — Le nombre de projets aux
                    technologies et natures différentes sur lesquels j&apos;ai
                    travaillé m&apos;a donné une forte capacité
                    d&apos;adaptation. Au quotidien, je navigue entre
                    Odoo/Python, Symfony/PHP et Next.js/React.
                  </p>
                  <p>
                    <strong>Communication</strong> — Encore en progression, mais
                    la documentation et la communication avec les profils non
                    techniques sont deux aspects que je veux largement améliorer et
                    maîtriser. Si on ne communique pas sur ce qu&apos;on fait,
                    nos fonctionnalités n&apos;existent pas aux yeux des
                    utilisateurs.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Perseverance</strong> — I don&apos;t give up on
                    complex tasks, even if it means taking more time than planned
                    to find the solution. My career path itself — from law to
                    development — is proof of that.
                  </p>
                  <p>
                    <strong>Adaptability</strong> — The number of projects with
                    different technologies and natures I&apos;ve worked on has
                    given me strong adaptability. On a daily basis, I navigate
                    between Odoo/Python, Symfony/PHP, and Next.js/React.
                  </p>
                  <p>
                    <strong>Communication</strong> — Still a work in progress,
                    but documentation and communication with non-technical
                    profiles is something I want to greatly improve and master.
                    If we don&apos;t communicate about what we do, our features
                    don&apos;t exist in users&apos; eyes.
                  </p>
                </>
              )}
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Mes centres d'intérêt */}
      <section className="bg-muted/35 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 border border-border bg-card p-5 sm:p-8 lg:grid-cols-[120px_1fr]">
            <p className="editorial-index">
              V
            </p>
            <div>
            <h2 className="mb-4 text-2xl font-black uppercase tracking-[-0.03em] sm:text-3xl">
                {dict.aboutPage.interestsHeading}
              </h2>
            <div className="prose dark:prose-invert max-w-none">
              {isFr ? (
                <p>
                  En dehors du code, je suis passionné de{" "}
                  <strong>basketball</strong> — que ce soit jouer en street 3x3
                  ou suivre la NBA (surtout les Spurs de Wembanyama). Je suis
                  également membre de l&apos;
                  <strong>Académie d&apos;Échecs d&apos;Aix-les-Bains</strong>,
                  où je participe à l&apos;organisation du club et à des
                  tournois réguliers, en personne (tournois à +1700 Elo FIDE)
                  comme en ligne contre des clubs du monde entier.
                </p>
              ) : (
                <p>
                  Outside of coding, I&apos;m passionate about{" "}
                  <strong>basketball</strong> — whether playing street 3x3 or
                  watching the NBA (especially Wembanyama&apos;s Spurs).
                  I&apos;m also a member of the{" "}
                  <strong>Aix-les-Bains Chess Academy</strong>, where I
                  participate in club organization and regular tournaments, both
                  in person (1700+ FIDE Elo tournaments) and online against
                  clubs from around the world.
                </p>
              )}
            </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
