import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RealisationDetailPage from "../realisations/[slug]/page";

describe("RealisationDetailPage", () => {
  it("provides a navigable reading structure without hiding the long-form content", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "fr",
        slug: "portfolio-professionnel",
      }),
    });

    render(page);

    const contents = screen.getByRole("navigation", { name: "Sommaire" });
    expect(contents).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Présentation" }),
    ).toHaveAttribute("href", "#presentation");
    expect(
      screen.getByRole("link", { name: "Mon regard critique" }),
    ).toHaveAttribute("href", "#critique");
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Un projet commencé le 12 mars 2026.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/L'historique Git situe la création de cette version/i),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Retour au sommaire" }),
    ).toHaveLength(8);
  });

  it("shows the dedicated migration risk analysis in French", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "fr",
        slug: "migration-odoo-v16-v19",
      }),
    });

    render(page);

    expect(
      screen.getByRole("heading", {
        name: "Risques et mesures de maîtrise",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Indisponibilité complète de l'ERP."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Les ACL, ou listes de contrôle d'accès/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Inventaire initial et stratégie pour chaque module."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Décision de lancer la migration."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Aucune perte définitive de données."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un backlog mêlant anciens et nouveaux tickets."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un pilotage personnel commencé trop tard."),
    ).toBeInTheDocument();
  });

  it("shows the dedicated migration risk analysis in English", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "en",
        slug: "migration-odoo-v16-v19",
      }),
    });

    render(page);

    expect(
      screen.getByRole("heading", {
        name: "Risks and mitigation measures",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Complete ERP unavailability."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ACLs, or access control lists/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Initial inventory and strategy for each module."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Decision to launch the migration."),
    ).toBeInTheDocument();
    expect(screen.getByText("No permanent data loss.")).toBeInTheDocument();
    expect(
      screen.getByText("A backlog combining old and new tickets."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Personal project tracking started too late."),
    ).toBeInTheDocument();
  });

  it("shows the detailed business module context in French", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "fr",
        slug: "modules-metier-odoo",
      }),
    });

    render(page);

    expect(
      screen.getByText("Une couche métier cohérente ajoutée à l'ERP."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Le module 1up_invoice_overdue_alert pour les factures impayées.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Le module 1up_product_extension pour enrichir l'inventaire.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Améliorer l'expérience utilisateur et la pertinence des données."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Divulgation de données confidentielles."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Recueillir le problème auprès de la comptabilité."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Tester une matrice de cas sur l'environnement de staging."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Déployer par le flux staging vers production d'Odoo.sh."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une interlocutrice métier centrale."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Des arbitrages confiés à la hiérarchie."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une autonomie encadrée par le risque."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une demi-journée de travail économisée chaque semaine."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un incident révélateur de la dépendance aux données."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un pilotage de la marge disponible en cours d'année."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Des preuves publiques et des éléments encore soumis à autorisation."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un fonctionnement aujourd'hui autonome."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Des routes API plus ciblées pour le site B2B."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une reprise rendue possible par la documentation."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une architecture de Business Intelligence ouverte aux personnalisations."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Du code fonctionnel, mais trop dépendant de valeurs figées."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une dette technique assumée lorsqu'elle reste rentable."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un niveau que j'évalue aujourd'hui à 9 sur 10."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Le code source comme outil d'apprentissage indispensable."),
    ).toBeInTheDocument();
  });

  it("shows the detailed business module context in English", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "en",
        slug: "modules-metier-odoo",
      }),
    });

    render(page);

    expect(
      screen.getByText("A coherent business layer added to the ERP."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The 1up_invoice_overdue_alert module for unpaid invoices.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The 1up_product_extension module for richer inventory data.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Improving user experience and data relevance."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Disclosure of confidential data."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Gathering the problem from accounting."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Testing a matrix of cases in staging."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Deploying through the Odoo.sh staging-to-production flow."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A central business contact."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Arbitration entrusted to management."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Autonomy bounded by risk."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Half a working day saved every week."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("An incident revealing the dependency on data."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Margin steering available during the financial year."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Public evidence and material still subject to authorization."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Operation that is now autonomous."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("More focused API routes for the B2B website."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A handover made possible by documentation."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A Business Intelligence architecture open to customization."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Functional code that depended too heavily on fixed values."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Technical debt accepted when it remains profitable."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A level I currently assess at 9 out of 10."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Source code as an essential learning tool."),
    ).toBeInTheDocument();
  });

  it("shows the detailed corporate website context in French", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "fr",
        slug: "refonte-site-corporate",
      }),
    });

    render(page);

    expect(
      screen.getByText("Un site vitrine destiné aux clients professionnels."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un lancement bilingue plutôt que treize langues."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une séparation volontaire avec l'ERP."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un rôle de responsable technique et de coordinateur."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Moderniser en priorité l'image de l'entreprise."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Préserver le design sans dégrader l'expérience mobile."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Ne publier que des informations commerciales validées."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Obtenir une validation éditoriale et visuelle explicite."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un design encore incomplet comme risque principal."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("La validation éditoriale comme goulot d'étranglement."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une prise en charge des animations réduites encore hétérogène."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une migration susceptible d'affecter le référencement."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une dépendance future envers un seul responsable technique."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Auditer l'existant avant de choisir la solution."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Construire un système de composants réutilisables."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Répartir les animations entre GSAP, Motion et Lenis."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Mettre en place une internationalisation centralisée."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Développer une première chaîne de contact fonctionnelle."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Tester les composants, l'API et les parcours réels."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Préparer le déploiement sur Vercel sans enfermer le projet."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une équipe resserrée aux responsabilités complémentaires."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Le lead graphiste comme interlocuteur visuel principal."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une responsabilité technique assumée de bout en bout."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une décision partagée lorsque le design rencontre une contrainte technique."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Les animations comme sujet concret de compromis."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Le directeur général comme responsable du cap et de la validation."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une chaîne de contact partagée entre technique et métier."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une répartition prévue pour l'après-lancement."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un projet arrivé à environ 50 % de son développement."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une page d'accueil et une page de contact déjà présentables."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Des audits Lighthouse réalisés dans plusieurs conditions."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("La résolution du défaut mobile le plus visible de l'ancien site."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une gestion éditoriale préparée, mais pas encore remise au marketing."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Des indicateurs définis avant le lancement."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("La démonstration d'une responsabilité technique de bout en bout."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Choisir une direction graphique avant de poursuivre l'intégration."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Viser une mise en ligne avant la Gamescom 2026."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Organiser une recette impliquant les acteurs du projet."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Déployer au moyen du pipeline CI/CD jusqu'à Vercel."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Vérifier l'état des services connectés."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Former le marketing à Sanity avant la production."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Constituer une V2 à partir des besoins déjà identifiés."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Faire vivre le site grâce au blog."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Réutiliser l'architecture pour la branche EPI."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une difficulté principalement organisationnelle."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une base de design qui aurait mérité davantage de temps au départ."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Sanity utile à terme, mais non indispensable pour commencer."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une couverture de test large, mais jamais absolue."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Des textes qui auraient dû être demandés plus tôt."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une difficulté technique modérée."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un niveau que j'évalue actuellement à 7 sur 10."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Protéger la qualité par la concentration sur l'essentiel."),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Le site couvre 13 locales/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/35 pays couverts/i)).not.toBeInTheDocument();
  });

  it("shows the detailed corporate website context in English", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "en",
        slug: "refonte-site-corporate",
      }),
    });

    render(page);

    expect(
      screen.getByText("A showcase website intended for professional customers."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A bilingual launch rather than thirteen languages."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Deliberate separation from the ERP."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A role as technical lead and coordinator."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Modernizing the company's image as the first priority."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Preserving design without damaging the mobile experience."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Publishing only validated commercial information."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Obtaining explicit editorial and visual approval."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("An unfinished design as the main risk."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Editorial approval as the bottleneck."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Reduced-motion support that remains inconsistent."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A migration that may affect search visibility."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Future dependency on a single technical owner."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Auditing the existing site before choosing a solution."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Building a reusable component system."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Distributing animation work between GSAP, Motion, and Lenis."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Implementing centralized internationalization."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Developing a first functional contact chain."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Testing components, the API, and real workflows."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Preparing deployment on Vercel without locking the project in."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A small team with complementary responsibilities."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The lead graphic designer as my main visual counterpart."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("End-to-end technical ownership."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A shared decision when design meets a technical constraint."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Animation as a concrete subject for compromise."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The Chief Executive Officer as owner of direction and approval."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A contact workflow shared between technology and the business."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A planned division of ownership after launch."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A project at approximately 50% of its development."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A homepage and contact page that can already be presented."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Lighthouse audits performed under several conditions."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Resolution of the previous website's most visible mobile defect."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Editorial management prepared but not yet handed over to marketing."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Success indicators defined before launch."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Demonstrating end-to-end technical responsibility."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Selecting a visual direction before continuing integration."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Targeting launch before Gamescom 2026."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Organizing acceptance testing with project participants."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Deploying through the CI/CD pipeline to Vercel."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Verifying the state of connected services."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Training marketing on Sanity before production."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Building V2 from needs already identified."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Keeping the website alive through the blog."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Reusing the architecture for the PPE branch."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A primarily organizational difficulty."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A design foundation that deserved more time at the outset."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Sanity useful in the long term but not essential at the beginning."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Broad test coverage that can never be absolute."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Copy that should have been requested earlier."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Moderate technical difficulty."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A level I currently assess at 7 out of 10."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Protecting quality by focusing on what matters."),
    ).toBeInTheDocument();
    expect(screen.queryByText(/The site covers 13 locales/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/35 countries covered/i)).not.toBeInTheDocument();
  });

  it("shows the detailed CAP2vie presentation in French", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "fr",
        slug: "app-trajectoires-de-vie",
      }),
    });

    render(page);

    expect(
      screen.getByText("Un stage de cinq mois pour valider une formation de concepteur-développeur."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un projet accueilli au Laboratoire d'Informatique de Grenoble."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("La trajectoire de vie comme objet d'étude."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Le remplacement d'un recueil principalement effectué sur papier."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une visualisation partagée sur plusieurs écrans."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Des informations sensibles nécessitant une anonymisation après l'enquête."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un projet commencé à partir d'une idée et non d'un logiciel existant."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un prototype de recherche comme résultat attendu."),
    ).toBeInTheDocument();
  });

  it("shows the detailed CAP2vie presentation in English", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "en",
        slug: "app-trajectoires-de-vie",
      }),
    });

    render(page);

    expect(
      screen.getByText("A five-month internship completing an application designer-developer program."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A project hosted at the Grenoble Computer Science Laboratory."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The life trajectory as an object of study."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Replacing data collection performed mainly on paper."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A visualization shared across several screens."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Sensitive information requiring anonymization after the interview."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A project started from an idea rather than existing software."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A research prototype as the expected outcome."),
    ).toBeInTheDocument();
  });

  it("shows CAP2vie objectives and risks in French", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "fr",
        slug: "app-trajectoires-de-vie",
      }),
    });

    render(page);

    expect(
      screen.getByText("Limiter le noyau initial à deux fonctions obligatoires."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Représenter les dimensions séparément et simultanément."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Ajouter une interconnexion multi-écrans en cours de projet."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Préparer explicitement une reprise par un autre développeur."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une architecture impossible à réussir entièrement du premier coup."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un graphique visuellement plausible mais scientifiquement faux."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une anonymisation non automatisée dans l'application."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une reprise future dépendante de la qualité de la transmission."),
    ).toBeInTheDocument();
  });

  it("shows CAP2vie objectives and risks in English", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "en",
        slug: "app-trajectoires-de-vie",
      }),
    });

    render(page);

    expect(
      screen.getByText("Limiting the initial core to two mandatory functions."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Representing dimensions separately and simultaneously."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Adding multi-screen interconnection during the project."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Explicitly preparing handover to another developer."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("An architecture impossible to get entirely right on the first attempt."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A visually plausible but scientifically incorrect chart."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Anonymization not automated within the application."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Future continuation dependent on handover quality."),
    ).toBeInTheDocument();
  });

  it("shows the detailed CAP2vie implementation steps in French", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "fr",
        slug: "app-trajectoires-de-vie",
      }),
    });

    render(page);

    expect(screen.getByText("Commencer par documenter le besoin.")).toBeInTheDocument();
    expect(
      screen.getByText("Ne pas créer de maquettes qui n'auraient pas réduit l'incertitude."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Construire un formulaire unique organisé avec un stepper."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Construire le graphique avec les primitives de D3.js."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Faire évoluer le graphique en trois versions principales."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Revoir l'architecture pour rendre le graphique modifiable."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Créer une room identifiée et protégée par un mot de passe."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Versionner le travail collectif dans GitLab."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Effectuer une passation directe avec le développeur suivant."),
    ).toBeInTheDocument();
  });

  it("shows the detailed CAP2vie implementation steps in English", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "en",
        slug: "app-trajectoires-de-vie",
      }),
    });

    render(page);

    expect(screen.getByText("Starting by documenting the requirement.")).toBeInTheDocument();
    expect(
      screen.getByText("Not creating mockups that would not have reduced uncertainty."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Building a single form organized with a stepper."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Building the chart with D3.js primitives."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Evolving the chart through three main versions."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Revising the architecture to make the chart editable."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Creating an identified, password-protected room."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Versioning collective work in GitLab."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Conducting a direct handover with the next developer."),
    ).toBeInTheDocument();
  });

  it("shows the detailed CAP2vie stakeholder interactions in French", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "fr",
        slug: "app-trajectoires-de-vie",
      }),
    });

    render(page);

    expect(
      screen.getByText("Trois développeurs stagiaires réunis sur le même prototype."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une répartition des tâches selon les compétences."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("La visualisation D3.js comme responsabilité personnelle principale."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Des revues de code avant chaque fusion."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Trois chercheurs ou enseignants impliqués régulièrement."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Des décisions scientifiques qui ne revenaient pas aux développeurs."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une reprise confiée à un nouveau développeur pendant deux semaines."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Des itérations qui auraient pu être encore plus courtes."),
    ).toBeInTheDocument();
  });

  it("shows the detailed CAP2vie stakeholder interactions in English", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "en",
        slug: "app-trajectoires-de-vie",
      }),
    });

    render(page);

    expect(
      screen.getByText("Three intern developers working on the same prototype."),
    ).toBeInTheDocument();
    expect(screen.getByText("Tasks divided according to skills.")).toBeInTheDocument();
    expect(
      screen.getByText("D3.js visualization as my main personal responsibility."),
    ).toBeInTheDocument();
    expect(screen.getByText("Code reviews before every merge.")).toBeInTheDocument();
    expect(
      screen.getByText("Three researchers or teachers involved regularly."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Scientific decisions that did not belong to developers."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A two-week handover to a new developer."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Iterations that could have been even shorter."),
    ).toBeInTheDocument();
  });

  it("shows the detailed CAP2vie results in French", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "fr",
        slug: "app-trajectoires-de-vie",
      }),
    });

    render(page);

    expect(
      screen.getByText("Un questionnaire utilisable du début à la fin."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Cinq dimensions de trajectoire réellement disponibles."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Des défauts encore connus dans la synchronisation."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une méthode évaluable, mais pas encore validée en situation réelle."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une installation réussie par le développeur suivant."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une évolution après mon départ que je ne peux pas attribuer précisément."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("La création d'une solution sans équivalent directement réutilisable."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une contribution directe à l'obtention de mon titre professionnel."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un bénéfice consistant à rendre une expérimentation possible."),
    ).toBeInTheDocument();
  });

  it("shows the detailed CAP2vie results in English", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "en",
        slug: "app-trajectoires-de-vie",
      }),
    });

    render(page);

    expect(
      screen.getByText("A questionnaire usable from beginning to end."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Five trajectory dimensions genuinely available."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Known defects remaining in synchronization."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A method that could be evaluated but had not yet been validated in practice."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Successful installation by the next developer."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Post-internship evolution that I cannot attribute precisely."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Creating a solution without a directly reusable equivalent."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A direct contribution to earning my professional title."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A benefit consisting of making experimentation possible."),
    ).toBeInTheDocument();
  });

  it("shows the detailed CAP2vie aftermath in French", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "fr",
        slug: "app-trajectoires-de-vie",
      }),
    });

    render(page);

    expect(
      screen.getByText("La synchronisation comme chantier prioritaire."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Aucun essai réel déjà planifié à la fin du stage."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une poursuite effective que je ne peux pas confirmer."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une authentification et des rôles à ajouter."),
    ).toBeInTheDocument();
    expect(screen.getByText("Un export CSV comme sortie envisagée.")).toBeInTheDocument();
    expect(
      screen.getByText("Une ambition concernant un réseau national d'universités partenaires."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une compétence de visualisation déjà réutilisée en Business Intelligence."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un projet professionnellement utile par ses compétences plutôt que par son domaine."),
    ).toBeInTheDocument();
  });

  it("shows the detailed CAP2vie aftermath in English", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "en",
        slug: "app-trajectoires-de-vie",
      }),
    });

    render(page);

    expect(screen.getByText("Synchronization as a priority workstream.")).toBeInTheDocument();
    expect(
      screen.getByText("No real-world trial already scheduled at the end of the internship."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Actual continuation that I cannot confirm."),
    ).toBeInTheDocument();
    expect(screen.getByText("Authentication and roles to add.")).toBeInTheDocument();
    expect(screen.getByText("CSV as the planned export format.")).toBeInTheDocument();
    expect(
      screen.getByText("An ambition involving a national network of partner universities."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A visualization skill already reused in Business Intelligence."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A project professionally useful through skills rather than domain."),
    ).toBeInTheDocument();
  });

  it("shows the detailed CAP2vie critical review in French", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "fr",
        slug: "app-trajectoires-de-vie",
      }),
    });

    render(page);

    expect(
      screen.getByText("Un algorithme de résolution insuffisamment approfondi avant la première intégration."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un bridge formulaire-graphique devenu le point le plus retravaillé."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Des tests insuffisants sur les scénarios de réponses complexes."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("L'absence d'enquête réelle comme principale limite du résultat."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Trois décisions que je prendrais différemment."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une maîtrise de D3.js que j'évaluais à 6 sur 10."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un niveau backend aujourd'hui nettement supérieur."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("D3.js comme choix technique que je maintiens."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Accorder davantage de temps à l'architecture et à l'algorithmie."),
    ).toBeInTheDocument();
  });

  it("shows the detailed CAP2vie critical review in English", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "en",
        slug: "app-trajectoires-de-vie",
      }),
    });

    render(page);

    expect(
      screen.getByText("An answer-resolution algorithm insufficiently explored before initial integration."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A form-to-chart bridge that became the most frequently reworked area."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Insufficient testing of complex answer scenarios."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The absence of a real interview as the result's main limitation."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Three decisions I would make differently."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("D3.js mastery that I assessed at 6 out of 10."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A clearly higher backend level today."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("D3.js as a technical choice I still support."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Allocating more time to architecture and algorithms."),
    ).toBeInTheDocument();
  });

  it("shows the detailed professional portfolio presentation in French", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "fr",
        slug: "portfolio-professionnel",
      }),
    });

    render(page);

    expect(screen.getByText("Un projet commencé le 12 mars 2026.")).toBeInTheDocument();
    expect(
      screen.getByText("Une réalisation d'abord imposée par ma formation."),
    ).toBeInTheDocument();
    expect(screen.getByText("Un ancien portfolio devenu insuffisant.")).toBeInTheDocument();
    expect(
      screen.getByText("Une vitrine professionnelle sans recherche d'emploi immédiate."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Faire apparaître mon objectif de devenir développeur confirmé et référence Odoo."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une construction sur mesure pour répondre à la grille."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une utilisation transparente de Codex comme outil d'assistance."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un blog destiné à partager des solutions difficiles à trouver."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Des preuves limitées par la confidentialité de l'entreprise."),
    ).toBeInTheDocument();
  });

  it("shows the detailed professional portfolio presentation in English", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "en",
        slug: "portfolio-professionnel",
      }),
    });

    render(page);

    expect(screen.getByText("A project started on March 12, 2026.")).toBeInTheDocument();
    expect(
      screen.getByText("An achievement initially required by my training."),
    ).toBeInTheDocument();
    expect(screen.getByText("A previous portfolio that had become insufficient.")).toBeInTheDocument();
    expect(
      screen.getByText("A professional showcase without an immediate job search."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Showing my objective of becoming an experienced developer and Odoo reference."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A custom build designed around the rubric."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Transparent use of Codex as an assistance tool."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A blog intended to share hard-to-find solutions."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Evidence limited by company confidentiality."),
    ).toBeInTheDocument();
  });

  it("shows the professional portfolio objectives and risks in French", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "fr",
        slug: "portfolio-professionnel",
      }),
    });

    render(page);

    expect(screen.getByText("Viser la totalité des 100 points de la grille.")).toBeInTheDocument();
    expect(
      screen.getByText("Ne laisser aucun critère demandé sans réponse."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Développer les contenus sans rester superficiel."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Atteindre au moins 95 dans chaque catégorie Lighthouse."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Publier des preuves professionnelles contrôlées."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un échec principalement causé par un contenu absent ou insuffisant."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Des preuves Odoo censurées pouvant devenir trop vagues."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une première passe Codex pouvant déformer l'expérience."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Le spam pouvant épuiser les quotas d'envoi ou dégrader le service."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une dette de structure identifiée puis traitée."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un objectif de 100 % exigeant une vérification du rendu réel."),
    ).toBeInTheDocument();
  });

  it("shows the professional portfolio objectives and risks in English", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "en",
        slug: "portfolio-professionnel",
      }),
    });

    render(page);

    expect(screen.getByText("Targeting all 100 points in the rubric.")).toBeInTheDocument();
    expect(
      screen.getByText("Leaving no requested criterion unanswered."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Developing content without remaining superficial."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Reaching at least 95 in every Lighthouse category."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Publishing controlled professional evidence."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Failure caused primarily by missing or insufficient content."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Redacted Odoo evidence becoming too vague."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A Codex first draft capable of distorting experience."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Spam capable of exhausting delivery quotas or degrading service."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A structural debt that was identified and then addressed."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A 100% target requiring verification of the actual rendering."),
    ).toBeInTheDocument();
  });

  it("shows the detailed professional portfolio steps in French", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "fr",
        slug: "portfolio-professionnel",
      }),
    });

    render(page);

    expect(
      screen.getByText("Installer le bilinguisme avant de construire les pages."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Poser une architecture Next.js typée et réutilisable."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Modéliser dix compétences comparables."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Garantir la navigation circulaire par les données et les tests."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Ajouter toutes les protections anti-spam dans le même sprint."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Automatiser les contrôles avec GitHub Actions."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Enrichir les textes à partir de faits, puis les relire humainement."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Préparer une version réellement prête à être évaluée."),
    ).toBeInTheDocument();
  });

  it("shows the detailed professional portfolio steps in English", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "en",
        slug: "portfolio-professionnel",
      }),
    });

    render(page);

    expect(
      screen.getByText("Installing bilingual support before building pages."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Establishing a typed and reusable Next.js architecture."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Modeling ten comparable skills."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Guaranteeing circular navigation through data and tests."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Adding every anti-spam layer in the same sprint."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Automating controls through GitHub Actions."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Enriching text from facts, then reviewing it manually."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Preparing a release that is genuinely assessment-ready."),
    ).toBeInTheDocument();
  });

  it("shows the detailed professional portfolio actors in French", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "fr",
        slug: "portfolio-professionnel",
      }),
    });

    render(page);

    expect(
      screen.getByText("Un projet personnel dont je reste le responsable principal."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Le learning coach comme garant des attentes du titre."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Quatre ou cinq points de contrôle pendant la réalisation."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un premier retour ayant déclenché l'approfondissement des articles."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un second retour ayant modifié la hiérarchie de la page d'accueil."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une validation de compréhension par un public novice encore à réaliser."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Le directeur général comme autorité sur les preuves de l'entreprise."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Des fonctionnalités principales que je ne délègue pas à l'IA."),
    ).toBeInTheDocument();
  });

  it("shows the detailed professional portfolio actors in English", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "en",
        slug: "portfolio-professionnel",
      }),
    });

    render(page);

    expect(
      screen.getByText("A personal project for which I remain primarily responsible."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The learning coach as guardian of qualification expectations."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Four or five checkpoints during development."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Initial feedback that triggered deeper articles."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A second piece of feedback that changed homepage hierarchy."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Comprehension validation by a novice audience still to be completed."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The CEO as authority over company evidence."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Core features that I do not delegate to AI."),
    ).toBeInTheDocument();
  });

  it("shows the detailed professional portfolio results in French", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "fr",
        slug: "portfolio-professionnel",
      }),
    });

    render(page);

    expect(
      screen.getByText("Un produit réellement publié sur un domaine personnel."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("L'objectif Lighthouse atteint sur la page française en production."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une accessibilité mesurée à 96 sur 100."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Des statistiques de consultation effectivement disponibles."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un formulaire dont la chaîne d'envoi a été validée par mes essais."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une qualité du code protégée par plus de 140 tests automatisés."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un niveau actuel représenté par le frontend et les intégrations de services."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une réussite finale définie par le design et la conformité."),
    ).toBeInTheDocument();
  });

  it("shows the detailed professional portfolio results in English", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "en",
        slug: "portfolio-professionnel",
      }),
    });

    render(page);

    expect(
      screen.getByText("A product genuinely published on a personal domain."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The Lighthouse objective achieved on the live French page."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Accessibility measured at 96 out of 100."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Actual audience statistics available."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A form whose delivery chain has been validated through my tests."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Code quality protected by more than 140 automated tests."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A current level represented by frontend work and service integrations."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Final success defined through design and compliance."),
    ).toBeInTheDocument();
  });

  it("shows the detailed professional portfolio aftermath in French", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "fr",
        slug: "portfolio-professionnel",
      }),
    });

    render(page);

    expect(
      screen.getByText("Un contrôle complet avant la présentation au jury."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une première version finalisée en août 2026."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une maintenance déclenchée par les évolutions professionnelles."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("La poursuite d'un blog centré sur le développement."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une accessibilité à faire progresser au-delà du score de 96."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un découpage du fichier central désormais réalisé."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("La maîtrise de l'existant avant toute nouvelle fonctionnalité."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Trois rôles durables pour le portfolio."),
    ).toBeInTheDocument();
  });

  it("shows the detailed professional portfolio aftermath in English", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "en",
        slug: "portfolio-professionnel",
      }),
    });

    render(page);

    expect(
      screen.getByText("A complete check before presentation to the jury."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A first release finalized in August 2026."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Maintenance triggered by professional changes."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Continuing a development-focused blog."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Accessibility to improve beyond the score of 96."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The central file has now been split."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Mastering existing features before adding new ones."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Three lasting roles for the portfolio."),
    ).toBeInTheDocument();
  });

  it("shows the detailed professional portfolio critical review in French", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "fr",
        slug: "portfolio-professionnel",
      }),
    });

    render(page);

    expect(
      screen.getByText("Avoir voulu animer le site trop tôt."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un blog probablement développé trop tôt."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Des interfaces de cartes insuffisamment mutualisées."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une couverture d'intégration encore à renforcer."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un système de consentement artisanal que je ne conserverais probablement pas."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une conformité RGPD encore à auditer."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une note actuelle de 7 sur 10."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Le header et le footer comme décisions que je referais."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Prendre le temps de concevoir avant de développer."),
    ).toBeInTheDocument();
  });

  it("shows the detailed professional portfolio critical review in English", async () => {
    const page = await RealisationDetailPage({
      params: Promise.resolve({
        locale: "en",
        slug: "portfolio-professionnel",
      }),
    });

    render(page);

    expect(
      screen.getByText("Trying to animate the website too early."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A blog probably developed too early."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Card interfaces insufficiently shared."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Integration coverage still to strengthen."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A handmade consent system I probably would not retain."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("GDPR compliance still requiring an audit."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A current score of 7 out of 10."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The header and footer as decisions I would repeat."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Taking time to design before developing."),
    ).toBeInTheDocument();
  });
});
