import type { Realisation } from "./types";

export const refonteSiteCorporate: Realisation =
  {
    slug: "refonte-site-corporate",
    title: {
      fr: "Refonte d'un site corporate avec Next.js",
      en: "Corporate website redesign with Next.js",
    },
    shortDescription: {
      fr: "Refonte complète du site vitrine d'une entreprise de commerce international, du builder Odoo vers une application Next.js moderne.",
      en: "Complete redesign of an international trading company's showcase website, from Odoo's website builder to a modern Next.js application.",
    },
    context: { fr: "Entreprise", en: "Company" },
    summary: {
      context: {
        fr: "Le site vitrine de 1UP Distribution devait quitter le builder Odoo pour mieux présenter l'entreprise aux clients professionnels, sur tous les formats d'écran.",
        en: "1UP Distribution's showcase website needed to move away from the Odoo builder to present the company more effectively to professional clients across screen sizes.",
      },
      challenge: {
        fr: "Remplacer un site limité par un support B2B crédible sur tous les écrans, sans sacrifier la lisibilité ni l'accessibilité aux effets visuels.",
        en: "Replace a constrained site with a credible B2B presence on every screen without sacrificing readability or accessibility to visual effects.",
      },
      role: {
        fr: "J'ai audité l'existant, formalisé le besoin, analysé les maquettes Figma puis construit l'intégration responsive et l'architecture front-end avec Next.js.",
        en: "I audited the existing site, formalized the requirements, analyzed the Figma mockups, then built the responsive integration and front-end architecture with Next.js.",
      },
      decision: {
        fr: "Passer à une architecture Next.js à composants réutilisables et réserver les animations aux moments où elles soutiennent réellement le message.",
        en: "Move to a reusable-component Next.js architecture and reserve animation for moments where it genuinely supports the message.",
      },
      result: {
        fr: "La refonte remplace des blocs limités par une interface responsive continue, des composants réutilisables et des interactions qui restent accessibles sans bloquer l'information.",
        en: "The redesign replaces constrained blocks with a continuous responsive interface, reusable components, and interactions that remain accessible without blocking information.",
      },
      proof: {
        fr: "Les captures du site, les contrôles de performance et les éléments de l'expérience associée permettent d'examiner la réalisation sans exposer les informations internes.",
        en: "Website screenshots, performance checks, and material from the linked experience make the achievement reviewable without exposing internal information.",
      },
    },
    tags: ["Next.js", "React", "GSAP", "TypeScript", "Tailwind CSS"],
    presentation: {
      fr: `Le site vitrine de 1UP Distribution avait été construit avec le générateur de pages d’Odoo. Il présentait mal les activités de l’entreprise aux professionnels et son affichage sur mobile manquait de souplesse. Avec la direction, j’ai cadré une refonte sous **Next.js**, séparée de l’ERP, pour donner davantage de liberté à l’intégration et à la maintenance du site.

Le projet associait graphisme, marketing et développement. J’ai audité l’existant, traduit les maquettes en composants et pris en charge les choix d’architecture et d’hébergement. Ce retour d’expérience porte sur la conception et la préproduction de la première version bilingue.

**Un affichage mobile insuffisant.** L'ancien site s'affichait mal sur les téléphones. Le responsive design désigne la capacité d'une interface à adapter sa mise en page, ses textes, ses images et ses zones interactives à la largeur de l'écran. Il ne suffit pas de réduire une page conçue pour un ordinateur — les blocs doivent se réorganiser, les boutons rester utilisables et les contenus importants conserver une hiérarchie lisible. Ce défaut pouvait dégrader l'expérience d'un prospect consultant le site depuis un appareil mobile et affaiblir la première impression donnée par l'entreprise.

**Une séparation volontaire avec l'ERP.** Le site corporate n'affiche pas de catalogue destiné à la vente et n'a donc pas besoin de lire les produits, les stocks ou les commandes d'Odoo. Il est conçu comme une application indépendante de l'ERP, ce qui réduit les dépendances techniques et évite de connecter deux systèmes sans bénéfice métier. Une intégration reste envisagée pour la réception des demandes du formulaire de contact. Cette connexion permettrait de transmettre chaque demande à l’outil utilisé pour la traiter.`,
      en: `1UP Distribution’s showcase site had been built with Odoo’s page builder. It did not explain the company’s activities clearly to business visitors, and its mobile layout lacked flexibility. I worked with management to define a **Next.js** redesign, separate from the ERP, to give us more control over implementation and maintenance.

The project brought together graphic design, marketing and development. I audited the existing site, translated mockups into components and handled architecture and hosting decisions. This case study covers design and staging of the first bilingual version.

**Insufficient mobile rendering.** The old website displayed poorly on phones. Responsive design is the ability of an interface to adapt its layout, text, images, and interactive areas to the width of the screen. It is not enough to shrink a desktop page — blocks must reorganize, buttons must remain usable, and important content must retain a readable hierarchy. This weakness could damage the experience of a prospect visiting from a mobile device and weaken the prospect's first impression of the company.

**Deliberate separation from the ERP.** The corporate website does not display a sales catalog and therefore does not need to read Odoo products, stock, or orders. It is designed as an application independent of the ERP, reducing technical dependencies and avoiding a connection between two systems without a business benefit. Integration remains under consideration for contact form submissions. In that specific case, the connection would have a clear purpose — automatically forwarding an inquiry to the tool used by the company to process it.`,
    },
    objectives: {
      fr: `**Structurer la page d'accueil autour de trois contenus essentiels.** Pour être considérée comme complète, la page d'accueil doit présenter l'entreprise, ses partenaires et ses activités. La présentation explique qui est l’entreprise. Les activités détaillent ses deux métiers, la distribution et la création de produits. Les partenaires donnent des références concrètes lorsque leur autorisation a été obtenue. Ces trois ensembles doivent former un récit cohérent conduisant vers le contact, plutôt qu'une juxtaposition de sections indépendantes.

**Évaluer la qualité des contacts plutôt que leur seul nombre.** La pertinence de la nouvelle image pourra être observée à travers le profil des entreprises qui prennent contact. Si les demandes proviennent d'organisations comparables aux clients et partenaires que 1UP accompagne déjà, le site aura mieux transmis son positionnement. Cet indicateur reste qualitatif au lancement — il ne fixe pas encore un volume cible de formulaires. Il permet néanmoins de distinguer une hausse de trafic peu utile d'une visibilité qui attire réellement le public professionnel recherché.

**Décider qui reçoit les demandes.** Au jalon présenté, le destinataire final du formulaire restait à définir. Le lancement supposait une boîte ou un outil surveillé, une responsabilité de traitement claire et un essai qui confirme la réception réelle. Une intégration à Odoo pouvait ensuite être étudiée selon le circuit retenu. L’équipe pouvait commencer avec un envoi simple dès lors que chaque demande arrivait à la bonne personne et qu’elle savait comment y répondre.`,
      en: `**Structuring the homepage around three essential types of content.** To be considered complete, the homepage must present the company, its partners, and its activities. The company introduction explains who we are. The activities section describes distribution and product creation. The partner section provides examples where approval has been obtained. These three groups must form a coherent story leading toward contact rather than a collection of unrelated sections.

**Assessing contact quality rather than volume alone.** The relevance of the new image can be observed through the profile of companies that make contact. If inquiries come from organizations similar to the customers and partners 1UP already supports, the website will have communicated its positioning more effectively. This remains a qualitative indicator at launch, with no target number of form submissions currently defined. It nevertheless distinguishes an increase in low-value traffic from visibility that genuinely attracts the intended professional audience.

**Deciding who receives inquiries.** At the milestone described here, the final recipient for the contact form still needed to be chosen. Launch depended on a monitored inbox or tool, clear ownership of incoming requests, and a test confirming actual delivery. Odoo integration could then be evaluated against the chosen workflow. The team could start with a simple email flow as long as each inquiry reached the right person and they knew how to respond.`,
    },
    risks: {
      fr: `Le principal risque de livraison venait des maquettes et des textes encore en cours de validation. Les marques et les visuels exigeaient l’accord des personnes habilitées. J’ai protégé le périmètre de la première version et utilisé des prototypes pour avancer pendant les arbitrages, en gardant les contenus provisoires hors du périmètre de publication.

**Une prise en charge des animations réduites encore hétérogène.** Le dépôt contient déjà une première prise en charge de la préférence système prefers-reduced-motion — certains composants Motion désactivent leurs effets, certaines vidéos utilisent une image fixe de remplacement et un test Playwright vérifie ce comportement sur une partie des pages corporate. Cette couverture n'est toutefois pas encore uniforme pour toutes les animations historiques, notamment celles pilotées directement par GSAP, les transitions et le défilement Lenis. La V2 devra harmoniser ces mécanismes et prévoir un comportement plus léger pour les appareils peu puissants ou les connexions lentes. Dans l'intervalle, aucune information essentielle ne doit dépendre uniquement d'un mouvement.

**Une migration susceptible d'affecter le référencement.** Le remplacement de l'ancien site peut faire perdre une partie de la visibilité déjà acquise si des pages disparaissent, si leurs adresses changent sans redirection ou si les moteurs rencontrent temporairement une version non indexable. Une redirection permanente indique aux visiteurs et aux moteurs qu'une ancienne URL a été déplacée vers une nouvelle. Avant la bascule, il faudra donc inventorier les URL utiles, conserver celles qui peuvent l'être, rediriger celles qui changent, publier un sitemap cohérent et vérifier que les règles temporaires de blocage utilisées pendant le développement ne restent pas actives.`,
      en: `The main delivery risk was that mockups and copy were still awaiting approval. Brand assets required approval from the people authorized to use them. I protected the first release’s scope and used prototypes to keep moving while decisions were pending, keeping placeholder content outside the publication scope.

**Reduced-motion support that remains inconsistent.** The repository already contains initial support for the prefers-reduced-motion system preference — some Motion components disable their effects, some videos use a still-image fallback, and a Playwright test verifies this behavior on part of the corporate pages. However, coverage is not yet consistent across every historical animation, particularly those driven directly by GSAP, page transitions, and Lenis scrolling. V2 should harmonize these mechanisms and provide lighter behavior for low-powered devices or slow connections. Until then, no essential information should depend on motion alone.

**A migration that may affect search visibility.** Replacing the old website can cause the company to lose some of its existing search visibility if pages disappear, their addresses change without redirects, or search engines temporarily encounter a non-indexable version. A permanent redirect tells visitors and search engines that an old URL has moved to a new one. Before the switch, useful URLs must therefore be inventoried, retained where possible, redirected when changed, included in a coherent sitemap, and checked to ensure temporary blocking rules used during development do not remain active.`,
    },
    steps: {
      fr: `**Formaliser le besoin dans un cahier des charges.** Les conclusions de l'audit ont été transformées en cahier des charges. Ce document sert de référence commune entre la direction, le marketing, les graphistes et le développement. Il décrit le résultat attendu, les fonctions à prévoir et les contraintes à respecter sans imposer nécessairement chaque détail d'implémentation. Cette étape évite que le projet repose uniquement sur des échanges oraux et permet de comparer les propositions de design ou les décisions techniques avec le besoin de départ.

**Transformer trois maquettes en responsive continu.** Les variantes Figma servaient de points de référence, mais le site devait fonctionner sur toutes les dimensions intermédiaires. J'ai utilisé les classes responsive de Tailwind CSS pour faire évoluer les grilles, les marges, les tailles de texte et l'ordre des éléments selon les breakpoints. Un breakpoint est une largeur à partir de laquelle la mise en page adopte une nouvelle organisation. Je vérifiais également l'absence de débordement horizontal et créais des alternatives, comme le passage d'une frise complexe à des cartes empilées sur les écrans plus étroits.

**Séparer composants serveur et composants interactifs.** Les pages et les éléments qui ne nécessitent pas d'interaction restent des Server Components, c'est-à-dire des composants rendus côté serveur sans envoyer inutilement toute leur logique au navigateur. Les composants qui utilisent une animation, un formulaire ou un état local sont déclarés comme Client Components. Cette frontière est visible dans le dépôt — les pages récupèrent les contenus et métadonnées sur le serveur, tandis que Hero, BrandCarousel, FadeIn ou ContactForm prennent en charge les interactions côté client. Cette séparation réduit le JavaScript envoyé lorsqu'une interactivité n'est pas nécessaire.

**Mettre en place une internationalisation centralisée.** Les routes utilisent un segment dynamique de langue et next-intl charge le fichier de messages correspondant. Les liens internes passent par une navigation consciente de la locale, le document HTML reçoit les attributs de langue et de direction, et les textes d'interface sont regroupés dans des fichiers JSON. Le code avait initialement été préparé pour treize locales. Au jalon présenté, la V1 avait été recentrée sur le français et l’anglais. Il restait à vérifier le routage, les variantes bilingues déclarées, le sitemap et les données structurées sur ce périmètre.

**Organiser les contenus entre fichiers de traduction et Sanity.** Au jalon présenté, les textes stables de l’interface et de l’accueil étaient lus avec next-intl depuis les fichiers de messages. Le projet intègre aussi Sanity, un CMS ou système de gestion de contenu, pour les articles, les carrières et des pages corporate plus éditoriales. Des schémas définissent notamment les pages, les marques et leurs métadonnées. Les requêtes publiques excluaient les contenus provisoires. Les pages peuvent utiliser un texte de traduction comme solution de repli lorsqu'aucun contenu Sanity publié n'est disponible. Cette architecture doit permettre au marketing de faire évoluer les contenus structurés sans modifier directement le code.

**Développer une première chaîne de contact fonctionnelle.** Le formulaire possède déjà une interface, des états d'envoi, de succès et d'erreur, ainsi qu'une case de consentement renvoyant vers la politique de confidentialité. Il transmet les données à une route API Next.js, qui vérifie les champs obligatoires et l'adresse électronique, neutralise les retours à la ligne dans l'objet puis envoie un courriel avec Resend et un modèle React Email. À ce stade, le routage séparait les essais de développement des demandes de production. Cette première version doit encore être alignée sur le besoin final — séparer nom et prénom, ajouter le téléphone optionnel, choisir définitivement les destinataires et compléter la protection contre les soumissions indésirables.

**Tester les composants, l'API et les parcours réels.** Vitest et React Testing Library couvrent des composants et des fonctions isolées, tandis que Playwright exécute des scénarios de navigateur. La configuration Playwright prévoit Chromium, Firefox et WebKit ainsi que des profils Pixel 7, iPhone 13 et iPad. Les scénarios existants vérifient notamment l'accueil, la navigation, le formulaire, l'absence de débordement horizontal, le chargement des images, les données structurées et certains comportements de réduction des mouvements. Cette combinaison permet de détecter aussi bien une erreur de logique qu'une rupture visible uniquement dans un navigateur ou une largeur particulière.`,
      en: `**Formalizing the requirement in a specification.** The audit findings were turned into a specification. This document provides a shared reference for management, marketing, graphic designers, and development. It describes the expected result, features to plan, and constraints to respect without necessarily imposing every implementation detail. This step prevents the project from relying only on verbal discussions and makes it possible to compare design proposals or technical decisions with the original requirement.

**Turning three mockups into a continuous responsive experience.** Figma variants served as reference points, but the website had to work across every intermediate dimension. I used Tailwind CSS responsive classes to evolve grids, margins, text sizes, and element order at different breakpoints. A breakpoint is a width from which the layout adopts a new organization. I also checked for horizontal overflow and created alternatives, such as replacing a complex timeline with stacked cards on narrower screens.

**Separating server and interactive components.** Pages and elements that require no interaction remain Server Components, meaning components rendered on the server without unnecessarily sending all their logic to the browser. Components using animation, a form, or local state are declared as Client Components. This boundary is visible in the repository — pages retrieve content and metadata on the server, while Hero, BrandCarousel, FadeIn, or ContactForm handle client-side interactions. This separation reduces the JavaScript sent when interactivity is not required.

**Implementing centralized internationalization.** Routes use a dynamic language segment and next-intl loads the corresponding messages file. Internal links use locale-aware navigation, the HTML document receives language and direction attributes, and interface text is grouped in JSON files. The code was initially prepared for thirteen locales. At the milestone described here, the first release had been narrowed to French and English. Routing, language variants, the sitemap and structured data still needed to be checked against that scope.

**Organizing content between translation files and Sanity.** Stable interface and homepage text is read from next-intl message files at this milestone. The project also integrates Sanity, a CMS or content management system, for articles, careers, and more editorial corporate pages. Schemas define pages, sections, brands, FAQs, settings, and SEO metadata, while public queries exclude content marked as placeholders. Pages can use translated copy as a fallback when no published Sanity content is available. This architecture is intended to let marketing evolve structured content without editing code directly.

**Developing a first functional contact workflow.** The form already has an interface, sending, success, and error states, and a consent checkbox linking to the privacy policy. It sends data to a Next.js API route that checks required fields and the email address, removes line breaks from the subject, and sends an email through Resend using a React Email template. At this stage, routing kept development inquiries separate from production inquiries. This first version still needs to be aligned with the final requirement — split first and last names, add the optional phone number, choose final recipients, and complete protection against unwanted submissions.

**Testing components, the API, and real workflows.** Vitest and React Testing Library cover isolated components and functions, while Playwright runs browser scenarios. The Playwright configuration includes Chromium, Firefox, and WebKit as well as Pixel 7, iPhone 13, and iPad profiles. Existing scenarios notably check the homepage, navigation, form, absence of horizontal overflow, image loading, structured data, and some reduced-motion behavior. This combination detects both a logic error and a break visible only in a particular browser or screen width.`,
    },
    actors: {
      fr: `Deux graphistes ont conçu les ressources visuelles. Avec le lead graphiste, je discutais des adaptations entre les maquettes et le rendu réel. Par exemple, lorsqu’une animation ne se transposait pas bien sur un écran étroit, je pouvais montrer une version simplifiée qui conservait la hiérarchie du contenu.

**Les animations comme sujet concret de compromis.** Les animations rendent le site plus vivant et participent à son identité, mais leurs bibliothèques et leurs médias consomment des ressources — elles peuvent augmenter le JavaScript téléchargé, solliciter davantage le processeur graphique ou ralentir l'affichage sur un appareil moins puissant. Mon rôle consiste à trouver un juste milieu entre richesse visuelle et performance. Cela peut signifier limiter une animation aux éléments réellement importants, employer une transformation moins coûteuse, différer son chargement ou la simplifier sur mobile et pour les personnes demandant moins de mouvement. Je présente ces arbitrages aux responsables de l'image afin que l'allègement ne soit pas perçu comme une perte inexpliquée du design.

Le marketing fournissait et validait les textes et les droits d’utilisation des visuels. Le directeur général définissait les priorités et devait valider la version à publier. Je pilotais la partie technique, du responsive à la préparation du déploiement, et je signalais les décisions pour lesquelles un arbitrage métier était nécessaire.`,
      en: `Two graphic designers created the visual assets. I worked with the lead designer on adaptations between mockups and the working site. For example, when an animation translated poorly to a narrow display, I could demonstrate a simpler version that preserved the content hierarchy.

**Animation as a concrete subject for compromise.** Animations make the website feel more alive and contribute to its identity, but their libraries and media consume resources — they can increase downloaded JavaScript, place more demand on the graphics processor, or slow rendering on a less powerful device. My role is to find an appropriate balance between visual richness and performance. This may involve limiting animation to elements that truly matter, using a less expensive transformation, deferring its loading, or simplifying it on mobile and for people requesting reduced motion. I present these trade-offs to the people responsible for the company's image so that optimization is not perceived as an unexplained loss of design.

Marketing supplied and approved the copy and cleared visual rights. The managing director set priorities and was responsible for approving the release. I led the technical work, from responsive behavior through deployment preparation, and surfaced decisions that needed business input.`,
    },
    results: {
      fr: `Au jalon présenté, l’accueil et le contact étaient consultables dans une version de travail bilingue. L’intégration répondait au défaut mobile de l’ancien site et les composants pouvaient servir aux pages suivantes. Les captures montrent notamment le positionnement de la page d’accueil et les choix d’intégration. La chaîne de contact avait une première implémentation, avec la réception finale à valider pour le lancement.

**Une compatibilité vérifiée au-delà d'un seul navigateur.** J'ai testé les parcours sur les navigateurs les plus utilisés ainsi que sur téléphone. Cette vérification croisée est importante, car deux navigateurs peuvent interpréter différemment une règle de style, une vidéo, une animation ou le comportement d'un formulaire. Les tests mobiles permettent également d'observer le site dans les contraintes réelles d'un écran tactile et d'un espace réduit, plutôt que de se limiter à diminuer la largeur d'une fenêtre sur ordinateur. Aucun test ne permet d'affirmer qu'un site fonctionnera sur tous les appareils existants, mais cette couverture réduit le risque de publier une expérience valable uniquement dans mon environnement de développement.

**Une gestion éditoriale préparée.** Au jalon observé, les modèles Sanity étaient disponibles et l’équipe marketing devait encore expérimenter la publication. La mise à disposition de l’outil constituait une première étape. L’autonomie éditoriale serait acquise quand l’équipe pourrait créer une page, fournir ses deux versions linguistiques et la publier avec les droits prévus. La maintenance du code et des modèles de contenu restait de mon ressort.

**Préparer l’indexation des pages.** J’ai préparé le référencement technique avec des métadonnées localisées, des adresses canoniques, un sitemap et des données structurées. Ces éléments donnaient aux moteurs les informations nécessaires pour identifier les pages et leurs variantes. Le résultat sur la visibilité et les recherches de marque devait être observé après la bascule.

**Un audit de la page d’accueil.** La capture Lighthouse de la version de travail affiche 99 en performance, 100 en accessibilité, 96 en bonnes pratiques et 100 en SEO. Ce relevé porte sur l’accueil. J’avais également utilisé Lighthouse pour examiner le chargement en simulation mobile et sur ordinateur. Une comparaison après mise en ligne demanderait de rejouer les mêmes parcours dans des conditions comparables.

L’amélioration de l’image et la qualité des contacts restaient des effets attendus à ce stade. Pour moi, le projet a surtout développé ma capacité à transposer un design produit par une autre équipe et à rendre visibles les conséquences de mes choix techniques.`,
      en: `At the milestone described here, the homepage and contact page were available in a bilingual working preview. The implementation addressed the old site’s mobile layout problem, and its components could be reused on subsequent pages. Screenshots show the homepage positioning and implementation choices. The contact flow had an initial implementation, with final delivery still to be confirmed for launch.

**Compatibility checked beyond a single browser.** I tested the journeys in the most widely used browsers and on phones. This cross-check matters because two browsers may interpret a styling rule, video, animation, or form behavior differently. Mobile testing also makes it possible to observe the website under the actual constraints of a touchscreen and limited space instead of merely reducing a desktop window's width. No test can prove that a website will work on every device in existence, but this coverage reduces the risk of publishing an experience that works only in my development environment.

**Content management ready for trials.** At that milestone, the Sanity models were available and marketing still needed to try the publication workflow. Making the tool available was the first step. Editorial independence would be demonstrated when the team could create a page, provide both language versions and publish it under the intended permissions. I remained responsible for maintaining the code and content models.

**Preparing pages for indexing.** I prepared the technical SEO foundations with localized metadata, canonical URLs, a sitemap and structured data. These gave search engines the information needed to identify pages and their language variants. Search visibility and branded queries would need to be assessed after cutover.

**An audit of the homepage.** The Lighthouse screenshot of the working version shows 99 for performance, 100 for accessibility, 96 for best practices and 100 for SEO. Those figures are for the homepage. I also used Lighthouse to examine loading under mobile and desktop simulation. Comparing the released site would require running the same checks under comparable conditions.

A stronger brand impression and more relevant inquiries were expected outcomes at this stage. The project helped me learn to implement another team’s design and make the consequences of my technical choices visible.`,
    },
    aftermath: {
      fr: `**Organiser une recette impliquant les acteurs du projet.** Le plan de mise en ligne prévoyait une recette finale avec les graphistes, le marketing et la direction. La recette est une phase de vérification durant laquelle les personnes responsables confirment qu'un produit correspond au besoin et peut être accepté. Elle devait couvrir le rendu visuel, les textes, les liens, le formulaire, les langues, les principaux appareils et l'image générale renvoyée par le site. Une validation explicite devait distinguer les défauts bloquant la sortie des améliorations qui peuvent être planifiées après le lancement.

**Préparer la prise en main de Sanity.** Au jalon présenté, je prévoyais de faire publier un contenu test par l’équipe marketing. L’exercice devait couvrir les champs obligatoires, les deux langues, les médias et le passage du brouillon à la publication. Le marketing devait ensuite gérer les contenus, tandis que je conserverais la maintenance du code et des modèles.

**Suivre les URL après la bascule.** Le suivi prévu portait sur l’indexation des nouvelles pages, les erreurs d’exploration et les recherches importantes autour du lancement. Je souhaitais contrôler d’abord les redirections et les pages qui avaient déjà une visibilité, puis distinguer les fluctuations habituelles des défauts techniques à corriger.`,
      en: `**Organizing acceptance testing with project participants.** The launch plan included final acceptance testing with design, marketing and management. Acceptance testing is a verification phase during which responsible participants confirm that a product meets the requirement and can be accepted. It was to cover visual rendering, copy, links, form behavior, languages, major devices, and the overall image conveyed by the website. Explicit approval was meant to distinguish defects that block launch from improvements that can be planned after it.

**Preparing marketing to use Sanity.** At that milestone, I planned to have marketing publish a test item. The exercise was to cover required fields, both languages, media and the move from draft to publication. Marketing would then manage content while I maintained the code and content models.

**Monitoring URLs after cutover.** The monitoring plan covered indexing of the new pages, crawl errors and important search queries around launch. I wanted to check redirects and already visible pages first, then distinguish routine fluctuations from technical issues that needed fixing.`,
    },
    critique: {
      fr: `J’ai eu raison de prototyper les interactions pendant les décisions graphiques. Cela nous a donné un support concret pour discuter du responsive. Avec le recul, j’aurais demandé les textes plus tôt et réuni le marketing et les graphistes autour d’une page complète, afin que les décisions de contenu et de mise en page puissent se prendre ensemble.

**Sanity utile à terme, mais non indispensable pour commencer.** La première version aurait pu être réalisée sans système de gestion de contenu, en conservant temporairement les textes dans le code. Sanity représente donc un investissement anticipé plutôt qu'une obligation technique immédiate. Son intérêt apparaîtra lorsque le marketing publiera régulièrement des articles, modifiera les pages ou gérera les offres sans intervention d'un développeur. Si cette autonomie éditoriale reste peu utilisée, la complexité de configuration et de maintenance devra être réévaluée. Un outil n'est justifié dans la durée que par l'usage qu'il permet réellement.

Sur un prochain projet, je définirais plus tôt les conditions de recette et la responsabilité de réception du formulaire. Je validerais aussi une page de bout en bout, du texte final à la mesure sur mobile, avant de multiplier les variantes d’animation. Les vérifications techniques serviraient alors un objectif de livraison partagé par les équipes.`,
      en: `Prototyping interactions while design decisions were pending gave us something concrete to discuss about responsive behavior. In hindsight, I would have requested the copy earlier and brought marketing and design together around a complete page so they could make content and layout decisions together.

**Sanity useful in the long term but not essential at the beginning.** The first release could have been built without a content management system by temporarily keeping copy in the code. Sanity is therefore an anticipatory investment rather than an immediate technical requirement. Its value will appear when marketing regularly publishes articles, changes pages, or manages job listings without developer intervention. If this editorial autonomy remains little used, configuration and maintenance complexity will need to be reassessed. A tool remains justified over time only by the usage it genuinely enables.

On a future project, I would define the acceptance criteria and ownership of form submissions earlier. I would also validate one page end to end, from final copy to mobile checks, before building multiple animation variants. The technical checks would then support a release goal shared by the teams.`,
    },
    linkedCompetences: [
      "developpement-frontend",
      "adaptabilite",
      "communication",
    ],
    contextualCompetences: {
      steps: ["devops"],
      actors: ["autonomie"],
    },
    media: [
      {
        type: "image",
        src: "/images/project-screenshots/corporate/corporate-landing-page.png",
        title: {
          fr: "Hero vidéo et positionnement",
          en: "Video hero and positioning",
        },
        description: {
          fr: "Premier écran du site corporate, conçu autour d'un fond vidéo, d'un message clair et de CTA orientés distribution/création produit.",
          en: "First viewport of the corporate site, built around a video background, clear messaging, and distribution/product-creation CTAs.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/corporate/corporate-brands-section.png",
        title: {
          fr: "Mise en avant des marques partenaires",
          en: "Partner brands showcase",
        },
        description: {
          fr: "Section interactive avec logos de marques distribuées et animation GSAP draggable.",
          en: "Interactive section with distributed brand logos and draggable GSAP animation.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/corporate/corporate-partners-section.png",
        title: {
          fr: "Preuves de distribution retail",
          en: "Retail distribution proof",
        },
        description: {
          fr: "Section de réassurance orientée partenaires retail et crédibilité commerciale.",
          en: "Trust-building section focused on retail partners and commercial credibility.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/corporate/corporate-local-hero.png",
        title: {
          fr: "Rendu local du hero",
          en: "Local hero rendering",
        },
        description: {
          fr: "Capture générée depuis le site corporate monté en local pour vérifier le rendu réel.",
          en: "Screenshot generated from the locally running corporate site to verify the real rendering.",
        },
      },
      {
        type: "image",
        src: "/images/project-screenshots/corporate/score-lighthouse-corporate.png",
        title: {
          fr: "Audit Lighthouse du site",
          en: "Website Lighthouse audit",
        },
        description: {
          fr: "Scores mesurés lors de l'audit : 99 en performance, 100 en accessibilité et 96 en bonnes pratiques.",
          en: "Measured audit scores: 99 for performance, 100 for accessibility, and 96 for best practices.",
        },
      },
    ],
  };
