# UX/UI Audit

Audit réalisé le 13 septembre 2026 sur le build de production local courant, servi sur un port d'audit séparé. Cette phase est volontairement **sans modification du code applicatif**. Les constats décrivent le rendu observé de la branche de travail actuelle ; ils ne jugent pas les changements non commités comme des régressions sans vérifier leur impact réel.

## Méthode et périmètre de preuve

- Build courant : Next.js 16.3.4, Node 22.23.2 et pnpm 10.20.0 ; `pnpm build` a réussi et généré 125 routes.
- Parcours réel au clavier et à la souris simulée sur l'accueil, À propos, Parcours, Compétences, Réalisations, Projets Odoo, Articles et Contact, plus des pages de détail représentatives.
- Captures observées à 1440×900, 1280×800, 768×1024 et 390×844, en thèmes clair et sombre, avec `prefers-reduced-motion` activé lorsque pertinent.
- Contrôles automatisés exécutés : `pnpm test` (53 fichiers, 293 tests réussis), `pnpm test:e2e` contre le build courant (42/47 réussis), `pnpm lint`, `pnpm check:bundle` et `pnpm check:performance`.
- Les 4 documents téléchargeables ont répondu `200` localement. GitHub a répondu `200`. LinkedIn (`999`) et Pexels (`403`) ont refusé la sonde automatisée ; cela reflète leurs protections anti-bot et **ne constitue pas une preuve de lien cassé**.

Limites : aucun test Lighthouse ou données terrain Core Web Vitals n'ont été produits. Les ratios de contraste ont été vérifiés sur les couleurs rendues majeures (texte de corps, navigation, accent et CTA) ; les contrastes sur chaque zone de photographie restent à valider avec un outil d'audit automatisé complet avant une déclaration formelle de conformité WCAG AA.

## 1. Executive Summary

Le portfolio est déjà une base très solide pour un jury : l'identité visuelle est distinctive sans être décorative au détriment du contenu, les preuves sont riches, les liens croisés compétence ↔ réalisation ↔ expérience sont exceptionnellement bien reliés, et les comportements principaux sont robustes. La direction romano-éditoriale fonctionne particulièrement bien : la photographie, le décor architectural atténué, la typographie de titre et l'accent rouge forment une signature mémorable tout en conservant une lisibilité confortable dans les deux thèmes.

Le risque principal n'est pas esthétique : c'est le coût de lecture. Un évaluateur comprend immédiatement le nom, les technologies et une promesse de valeur, mais il doit encore déduire le métier visé. Puis, sur les trois études de cas centrales, il rencontre une masse de texte qui peut atteindre 63 854 à 90 232 caractères et 41 000 à 59 997 px de hauteur sur mobile. Les résultats, le rôle précis et les preuves existent, mais ne sont pas tous synthétisés au premier écran de l'étude de cas. Cette richesse doit être conservée, mais hiérarchisée en couches.

Les autres risques sont structurels et maîtrisables : absence d'état actif dans la navigation globale, faible découvrabilité de la collection des 20 modules open source, budget CSS dépassé et baselines de régression visuelle devenues obsolètes après le rafraîchissement graphique. Aucun défaut critique empêchant l'accès à une information essentielle n'a été observé.

| Dimension | Score /10 | Justification |
| --- | ---: | --- |
| Information architecture | 7 | Excellent graphe compétence ↔ preuve ↔ réalisation ↔ expérience ; le chemin vers les modules Odoo et le statut de page doivent être plus explicites. |
| Navigation | 7 | Navigation cohérente, menus clavier et menu mobile solides ; pas d'état actif ni de point d'entrée principal vers « Projets Odoo ». |
| Hiérarchie visuelle | 8 | Hero, titres, métriques et CTA sont bien hiérarchisés ; le rôle professionnel manque dans la première lecture et les longues études de cas perdent leur priorité interne. |
| Lisibilité | 8 | Texte de corps confortable, contraste majeur élevé, lignes et espacements agréables ; la quantité de texte des études de cas réduit la vitesse de lecture. |
| Cohérence | 7 | Le rendu partagé est cohérent, mais quatre baselines visuelles et un sélecteur de test ne correspondent plus au rendu ; plusieurs interfaces de style/props sont devenues mortes. |
| Accessibilité | 8 | Landmarks, skip link, langues, alt, clavier, focus, dialogue et reduced motion sont bien traités ; une cible « API » mesurée à 21×20 px est sous le minimum WCAG 2.2 et une validation exhaustive de contraste reste à faire. |
| Responsive UX | 8 | Aucun overflow dans les parcours testés ; les menus mobiles et le reflow tiennent. Le problème restant est la longueur verticale de certaines études de cas, pas la largeur. |
| Interaction design | 8 | Formulaire, recherche d'articles, menus, thème, langue et consentement donnent un retour clair. La modale de consentement est correctement modale mais nécessite une isolation explicite dans les tests qui veulent cliquer derrière elle. |
| Scannabilité | 6 | Les listings et l'accueil soutiennent bien le scan ; les études de cas et la liste de 20 modules demandent trop de lecture/défilement avant la sélection utile. |
| Crédibilité professionnelle | 8 | Les résultats sont chiffrés et nuancés, les preuves visibles et les liens publics nombreux. La crédibilité gagnerait encore avec un résumé « rôle / résultat / preuve » systématique au sommet des cas. |
| Cohérence du design system | 6 | Tokens de couleur et primitives partagées existent ; double couches typographiques/styles, 65 avertissements ESLint et budget CSS dépassé annoncent une dette de maintenance. |
| UX globale | 7 | Très convaincant pour explorer, moins optimal pour décider en cinq minutes. |
| UI globale | 8 | Direction visuelle assumée, lisible et professionnelle dans les deux thèmes ; l'assurance visuelle doit être remise sous test. |

## 2. Critical Issues

Aucun problème **CRITICAL** observé.

Les parcours essentiels restent disponibles : navigation, bascule FR/EN, thème, recherche d'articles, ouverture/fermeture du menu mobile, formulaire avec erreurs, liens internes, téléchargements et retours depuis les pages profondes.

## 3. High Priority Issues

### H-01 — Le premier écran ne nomme pas clairement le métier visé

- **Pages / viewports :** `/fr` et `/en`, observé à 1440×900 et 390×844.
- **Composant :** `src/components/landing/hero-section.tsx` ; contenu disponible dans `src/app/[locale]/dictionaries/fr.json` et `en.json`.
- **Principe :** content-first UX, hiérarchie, reconnaissance plutôt que rappel, question primaire d'un jury : « Qui est cette personne et quel métier vise-t-elle ? »
- **Comportement observé :** le hero communique très bien le nom, « Odoo · Symfony · Next.js », une promesse (« Je transforme des besoins métier… »), Chambéry et « En alternance chez 1UP ». Il ne rend toutefois pas visible une formulation directe telle que « Développeur full-stack » dans le contenu du premier écran. Les clés `title1`, `title2` et `availability` existent dans le dictionnaire mais ne sont pas utilisées par ce composant.
- **Pourquoi c'est un problème :** un recruteur pressé doit reconstruire le rôle depuis la stack, le statut d'alternance et la phrase de valeur. L'objectif professionnel, l'une des six réponses attendues du jury, ne doit pas dépendre d'une inférence.
- **Impact :** perte de quelques secondes dans le moment de lecture le plus important ; risque que le portfolio soit perçu d'abord comme un objet esthétique/personnel plutôt que comme un dossier professionnel précis.
- **Correction recommandée :** ajouter sous ou au-dessus du nom une ligne sémantique et visuellement secondaire mais explicite, par exemple « Développeur full-stack · ingénierie logicielle » puis conserver la promesse et la stack. Réemployer les clés existantes plutôt que créer un nouveau texte non localisé.
- **Sévérité :** **HIGH**.

### H-02 — Les études de cas majeures ne hiérarchisent pas assez le rôle, le résultat et le détail

- **Pages / viewports :** les cinq `/[locale]/realisations/[slug]`, particulièrement `migration-odoo-v16-v19`, `modules-metier-odoo` et `refonte-site-corporate`, sur desktop et mobile.
- **Composants :** `src/app/[locale]/realisations/[slug]/page.tsx`, `src/components/realisation-article-content.tsx`, données de `src/lib/realisations/`.
- **Principe :** progressive disclosure, charge cognitive, scannabilité, reconnaissance, parcours jury « Projet → contribution → résultat ».
- **Comportement observé :** le contexte, le stack, les expériences associées, des preuves visuelles, un sommaire à neuf entrées et les retours vers ce sommaire sont bien présents. En revanche, les résultats sont la section 6, après les visuels, la présentation, les objectifs, les risques, les étapes et les acteurs. Les trois cas principaux mesurent environ 63 854 / 70 536 / 90 232 caractères ; sur 390 px de large, leur hauteur atteint respectivement 41 000 / 46 475 / 59 997 px.
- **Pourquoi c'est un problème :** la page demande une lecture exhaustive avant de répondre au bénéfice professionnel principal. Un sommaire est une aide, mais sur mobile il n'est pas persistant et apparaît après les preuves visuelles. Il ne remplace pas un résumé décisionnel immédiat.
- **Impact :** le jury peut voir qu'il existe beaucoup de travail sans extraire rapidement la contribution exacte, la mesure obtenue, la preuve consultable et la leçon critique. Le contenu fort est alors sous-exploité.
- **Correction recommandée :** au sommet de chaque cas, avant les médias, ajouter un bloc compact et stable « Contexte / Mon rôle / Résultat vérifiable / Preuves », avec 1–3 métriques et liens directs vers Résultats, preuve et expérience. Conserver ensuite l'intégralité du récit dans les sections actuelles. Sur mobile, garder ce résumé ou des ancres de section immédiatement accessibles après le header.
- **Sévérité :** **HIGH**.

## 4. Medium Priority Issues

### M-01 — La navigation globale ne révèle pas la page ou la section courante

- **Pages :** `/fr/a-propos`, `/fr/competences/developpement-odoo`, `/fr/realisations/migration-odoo-v16-v19`, `/fr/projects/account_invoice_context`, et équivalents EN.
- **Composant :** `src/components/navbar.tsx`.
- **Principe :** visibilité de l'état système, wayfinding, cohérence et standards.
- **Comportement observé :** aucun lien de `header#primary-navigation` ne porte `aria-current`, sur aucune des quatre pages profondes contrôlées ; aucun état visuel actif n'est visible dans la barre globale. La page est reconnaissable grâce à son `h1`, son retour contextuel et son header éditorial, mais pas depuis la navigation persistante.
- **Pourquoi c'est un problème :** un visiteur qui arrive par lien direct ou traverse plusieurs fiches doit comparer le titre et les menus au lieu de recevoir une indication immédiate de son emplacement.
- **Impact :** friction modérée dans l'orientation, particulièrement entre Compétences, Réalisations et leurs détails.
- **Correction recommandée :** dériver le chemin courant dans un petit sous-composant client de navigation, appliquer une différence visuelle non fondée sur la couleur seule et `aria-current="page"` au lien de premier niveau ou au lien enfant correspondant. Pour les détails, marquer au minimum la famille (« Compétences », « Réalisations »).
- **Sévérité :** **MEDIUM**.

### M-02 — Les 20 modules open source sont difficiles à découvrir puis à réduire

- **Pages / viewports :** `/fr/projects`, surtout 390×844 ; même constat pour `/en/projects`.
- **Composants :** `src/app/[locale]/projects/page.tsx`, `src/lib/odoo-projects.ts`, `src/components/navbar.tsx`.
- **Principe :** Hick's Law, flexibilité/efficacité, architecture de l'information, navigation circulaire.
- **Comportement observé :** « Projets Odoo » n'est pas une entrée de la navigation principale ; il apparaît dans le footer et via certains liens internes. Une fois sur la page, les 20 cartes sont présentées en une longue liste sur mobile (10 020 px), avec les mêmes étiquettes Odoo/Python et sans recherche, filtres, regroupement fonctionnel ou mise en avant d'une sélection.
- **Pourquoi c'est un problème :** cette collection est une preuve technique importante (GitHub, modules publiés), mais un jury ne peut pas rapidement répondre « quels sont les trois modules les plus représentatifs de ses capacités ? » ni atteindre la liste sans déjà connaître son existence.
- **Impact :** une partie du travail open source risque d'être ignorée ; le choix parmi 20 fiches similaires génère de la charge décisionnelle inutile.
- **Correction recommandée :** rendre la collection visible comme « Modules open source (20) » sous Compétences ou Réalisations, puis ajouter une entrée éditoriale courte : sélection de 3–6 modules représentatifs, recherche ou filtres par domaine métier (facturation, stock, CRM, ventes…), et bouton explicite pour afficher les 20. Ne pas supprimer les cartes ni les liens GitHub.
- **Sévérité :** **MEDIUM**.

### M-03 — La protection contre les régressions visuelles ne correspond plus au rendu approuvé actuel

- **Pages :** accueil FR desktop, mobile et dark ; test de thème/i18n.
- **Fichiers :** `e2e/homepage-visual.spec.ts`, `e2e/homepage-visual.spec.ts-snapshots/`, `e2e/i18n.spec.ts`, composants du hero actuels.
- **Principe :** cohérence, prévention d'erreurs, qualité perçue.
- **Comportement observé :** `pnpm test:e2e` a produit 42 succès sur 47. Trois snapshots de composition de l'accueil diffèrent au-delà du seuil de 2 %, et un test cherche encore l'ancien asset `coporate-headshot` alors que le rendu courant utilise `orhan-portrait.webp`. Le test i18n de navigation complète a aussi expiré car la modale de consentement, légitimement modale, interceptait le clic sur le sélecteur de langue.
- **Pourquoi c'est un problème :** ces échecs ne prouvent pas que le nouveau rendu est mauvais — la capture auditée est cohérente et professionnelle — mais ils empêchent de détecter la prochaine vraie dérive visuelle et rendent le signal CI ambigu.
- **Impact :** risque moyen de régression silencieuse lors du prochain changement de CSS, thème, image ou navigation.
- **Correction recommandée :** après validation humaine du design courant, remplacer les baselines par des captures réalisées depuis ce build, mettre à jour le contrat de portrait, et isoler le test i18n en stockant/refusant le consentement avant d'interagir avec la navigation.
- **Sévérité :** **MEDIUM** (dette de vérification ; pas une condamnation esthétique du nouveau rendu).

### M-04 — Le budget CSS de performance est dépassé

- **Pages :** effet transversal, plus sensible sur première visite mobile.
- **Fichiers :** `src/app/globals.css`, `scripts/check-bundle-budget.mjs`, `performance-budget.json`.
- **Principe :** performance comme UX, prévention de régression.
- **Comportement observé :** `pnpm check:bundle` échoue : le chunk CSS courant pèse 183,9 KiB pour un budget de 175 KiB. Le contrôle de performance local de quatre routes respecte néanmoins ses budgets réseau/DOM et n'a relevé aucune erreur navigateur.
- **Pourquoi c'est un problème :** le dépassement est faible (8,9 KiB) mais il brise le garde-fou prévu et peut devenir perceptible sur réseau mobile si la feuille continue de croître, notamment avec des règles décoratives globales.
- **Impact :** risque progressif sur le chargement initial et sur la capacité à maîtriser le coût du système visuel ; pas de dégradation de LCP démontrée dans cet audit.
- **Correction recommandée :** profiler les règles du système éditorial global et les utilitaires générés, supprimer les doublons/règles mortes, puis conserver un budget réaliste et vérifié. Ne pas retirer l'atmosphère, les thèmes ou les styles d'accessibilité sans mesure.
- **Sévérité :** **MEDIUM**.

## 5. Low Priority / Polish

### L-01 — Une étiquette de compétence ne respecte pas la cible minimale de 24×24 px

- **Pages :** `/fr/realisations` et `/en/realisations`, desktop et mobile.
- **Composant probable :** `src/components/topic-link.tsx` et styles de badges/liens.
- **Principe :** WCAG 2.2, critère 2.5.8 Target Size (Minimum), Fitts's Law.
- **Comportement observé :** le lien « API » a une boîte mesurée de 21×20 px. Les autres contrôles observés (boutons, menu, contact, champs) sont plus grands et aucun autre petit contrôle non-inline n'a été détecté dans l'échantillon.
- **Impact :** cible un peu difficile à toucher, surtout sur mobile, pour un lien secondaire.
- **Correction recommandée :** garantir au minimum 24×24 px pour les tags cliquables, par padding ou min-size, sans gonfler inutilement les liens de prose inline.
- **Sévérité :** **LOW**.

### L-02 — Les avertissements de lint et interfaces de style inutilisées créent une dérive du système

- **Pages :** transversal ; pas de défaut rendu démontré.
- **Fichiers représentatifs :** `src/app/globals.css`, `src/components/ui/*`, `src/components/landing/projects-section.tsx`, `src/components/editorial-page-header.tsx`.
- **Principe :** cohérence du design system, prévention de régressions.
- **Comportement observé :** `pnpm lint` termine sans erreur mais remonte 65 avertissements, notamment des `className`, `compact`, `imageOnRight`, `cn` et `buttonVariants` inutilisés. Le CSS comporte aussi des couches historiques et éditoriales qui se superposent.
- **Impact :** faible aujourd'hui, mais la prochaine évolution visuelle devient plus difficile à attribuer et à tester ; ces signaux peuvent masquer un avertissement utile.
- **Correction recommandée :** après les corrections UX prioritaires, réconcilier les APIs de composants avec les styles réellement rendus et décider explicitement des polices éditoriales Forum/EB Garamond par rapport au socle Roboto Flex/Geist documenté. Ne pas interpréter ce constat comme une demande de retirer la typographie éditoriale : le rendu est bon ; il faut rendre sa propriété technique claire.
- **Sévérité :** **LOW**.

## 6. Accessibility Audit

| État | Résultats |
| --- | --- |
| **Pass** | Un seul `main` sur les routes contrôlées ; `header`, `nav`, `footer` présents ; skip link visible au focus ; document `lang=fr` / `lang=en` correct ; aucun `img` sans attribut `alt` dans les parcours échantillonnés ; les images décoratives sont correctement `alt=""` ; ordre de titres cohérent (un seul `h1`) ; formulaire exposant les noms accessibles « Nom complet », « Adresse email », « Raison du contact », « Message » ; erreurs de formulaire annoncées et focus replacé sur `#name` ; menu mobile ferme avec Échap et rend le focus à son déclencheur ; les liens/menus parcourus ne sont pas masqués par la barre fixe ; contrastes mesurés majeurs élevés (texte de corps ~16:1 clair / ~15,7:1 sombre, navigation et texte secondaire ~7,6:1 / ~8,1:1, accent de hero ~6,9:1 / ~6,2:1) ; reduced motion rend le radar immédiatement ; aucune fonctionnalité essentielle ne dépend du hover. |
| **Partial** | Les tests n'établissent pas un contraste exhaustif sur toutes les surfaces image/overlay ni une audit axe complet ; les ancres de table des matières sont utiles mais ne sont pas persistantes sur mobile ; aucun `aria-current` dans le header (orientation, plus qu'un échec WCAG direct). |
| **Fail** | La cible de tag « API » mesure 21×20 px, sous le minimum WCAG 2.2 2.5.8 de 24×24 px, sans exception clairement démontrée. |
| **Not applicable** | Aucun carousel, glisser-déposer ou interaction à mouvement de glissement observé : le critère WCAG 2.5.7 Dragging Movements n'appelle pas de correctif. |
| **Needs manual validation** | Lecture par lecteur d'écran sur macOS/VoiceOver ou NVDA, contraste pixel-à-pixel des textes sur les images de toutes les familles de pages, zoom 200 % et 400 %, navigation à faible vision avec mode contraste forcé, et tests sur appareil tactile réel. |

Le dialogue de cookies mérite une note positive : il présente un titre/description, masque le contenu arrière à l'arbre d'accessibilité, place le focus dans la modale et offre accepter, refuser, gérer et fermer/refuser. Le fait qu'il bloque les clics derrière lui est le comportement attendu d'une décision de consentement modale ; le test i18n doit préparer cet état, pas contourner ce comportement produit.

## 7. Nielsen Heuristic Evaluation

| Heuristique | Statut | Constats principaux | Sévérité |
| --- | --- | --- | --- |
| 1. Visibilité de l'état système | Partial | États de formulaire, dialogue, recherche, langue/thème et menu donnent du feedback. La navigation globale ne marque pas la page/famille active. | MEDIUM |
| 2. Correspondance avec le monde réel | Pass | « Parcours », « Compétences », « Réalisations », contexte, rôle, résultats et preuves correspondent au modèle mental d'un jury. Les noms de modules anglais sont des noms techniques plausibles. | — |
| 3. Contrôle et liberté | Pass | Retour aux listings, table des matières, liens de retour, Échap pour le menu mobile et fermeture/refus du consentement sont présents ; aucun piège clavier observé. | — |
| 4. Cohérence et standards | Partial | Primitives visuelles et comportements principaux cohérents ; baselines de test périmées, 65 avertissements et pas d'état courant de navigation. | MEDIUM / LOW |
| 5. Prévention des erreurs | Pass | Validation avant envoi, honeypot, confirmation/gestion consentement, routes 404 et liens internes contrôlés. | — |
| 6. Reconnaissance plutôt que rappel | Partial | Le graphe de liens et les contextes répétés sont très bons. Le rôle manque dans le hero ; les résultats de cas sont loin dans le récit. | HIGH |
| 7. Flexibilité et efficacité | Partial | Recherche d'articles, menus et raccourcis par liens fonctionnent. Les 20 projets Odoo ne sont ni filtrables ni prioritaires. | MEDIUM |
| 8. Esthétique et design minimaliste | Pass | Le design est riche mais cognitivement lisible ; image, rouge et typographie renforcent l'identité. Le seul excès tangible est la densité documentaire des cas, pas le décor. | HIGH pour la hiérarchie des cas |
| 9. Reconnaître, diagnostiquer, récupérer | Pass | Formulaire : messages explicites et focus ; 404 rendue ; aucun crash runtime observé sur les routes testées. | — |
| 10. Aide et documentation | Pass | Les interactions sont auto-explicatives. La table des matières rend le long contenu navigable sans manuel ; elle doit seulement devenir une aide plus immédiate sur mobile. | MEDIUM |

## 8. Page-by-page Audit

| Routes significatives | Objectif principal du visiteur | Ce qui fonctionne | Problèmes observés | Recommandation |
| --- | --- | --- | --- | --- |
| `/fr`, `/en` | Comprendre identité, spécialisation et prochaine action. | Hero très soigné, deux CTA clairs, promesse de valeur, stack, lieu, statut, trois réalisations et métriques ; aucun overflow. | Le métier/titre visé reste implicite ; le mobile place le portrait avant le nom, ce qui reste acceptable mais renforce le besoin d'une ligne de rôle explicite. | Rendre « Développeur full-stack / ingénierie logicielle » visible dans le hero. |
| `/[locale]/a-propos` | Comprendre trajectoire, valeurs et projet. | Titres informatifs, structure éditoriale lisible, personnalisation crédible, liens internes ; un `h1`. | Le nav global ne confirme pas « À propos » comme section active. | Ajouter l'état courant partagé. |
| `/[locale]/parcours` | Visualiser chronologie, expériences et formations. | Chronologie facile à scanner, détails accessibles, liens vers fiches, aucune largeur cassée sur mobile. | Pas d'état global actif ; les réalisations liées ne sont pas visibles comme preuve au premier scan de chaque entrée sans ouvrir le détail. | État actif ; envisager un compteur/lien de réalisations liées directement sur les expériences majeures. |
| `/[locale]/parcours/[slug]` (7 fiches) | Comprendre un rôle précis et relier responsabilités, compétences et réalisations. | Très bon enchaînement « Responsabilités → Réalisations liées → Compétences liées », hauteur raisonnable sur la fiche échantillonnée. | L'orientation globale dépend du header de page plutôt que de la navigation. | État actif de famille ; conserver cette architecture de liens. |
| `/[locale]/competences` | Voir l'étendue et choisir une compétence à examiner. | Radar, séparation humaine/technique, cartes concises, liens « Lire l'article », bonne lisibilité mobile. | Le radar est une vue secondaire pertinente mais ne remplace pas une priorisation des compétences les plus probantes. | Garder le radar ; mettre en avant 2–3 compétences avec une réalisation chiffrée en entrée ou dans les cartes. |
| `/[locale]/competences/[slug]` (10 fiches) | Vérifier la définition, les preuves et l'autocritique d'une compétence. | Sommaire, preuves, autocritique, évolution et réalisations liées ; excellent lien vers l'évidence. | La fiche Odoo mesurée atteint 13 461 px sur mobile ; le sommaire n'est plus sticky hors desktop. | Réutiliser le résumé « preuve principale / résultat » et les ancres compactes sur mobile si la densité augmente. |
| `/[locale]/realisations` | Choisir une réalisation majeure. | Cinq cartes seulement, contexte professionnel, tags et lien de détail ; décision simple. | Petit tag API à 21×20 px ; pas d'état nav actif. | Corriger la taille minimale ; état actif. |
| `/[locale]/realisations/[slug]` (5 études) | Évaluer contexte, rôle, méthode, résultat et regard critique. | Preuves visuelles, sommaire, contexte, liens vers expérience/compétences, résultats nuancés et regard critique très crédibles. | Rôle/résultat trop peu synthétisés au sommet ; 41–60 k px sur mobile pour les trois cas principaux ; résultats loin sous la ligne de flottaison. | Bloc de synthèse au sommet, résultats/ancres immédiatement accessibles, récit complet conservé. |
| `/[locale]/projects` (20 modules) | Trouver un module open source pertinent et accéder à la fiche/GitHub. | Chaque carte offre détail + GitHub, données homogènes, aucun overflow. | Collection peu découvrable depuis le nav ; 20 choix équivalents, 10 020 px mobile, tags peu discriminants. | Entrée nav secondaire et sélection/filtres par domaine. |
| `/[locale]/projects/[slug]` (20 fiches) | Comprendre un module et accéder au dépôt. | Problème, solution, impact, éléments techniques et GitHub sont clairement présentés ; fiche échantillonnée compacte. | Peu de liens de retour vers compétence/réalisation associée, si cette relation existe dans le contenu. | Ajouter les relations pertinentes progressivement, sans inventer de correspondances. |
| `/[locale]/articles` et articles MDX | Chercher une ressource technique. | Recherche URL-synchronisée : « odoo » donne 3 résultats, puis retour propre à 6 ; structure d'article et notice FR dans l'interface EN fonctionnent. | Aucun problème important observé. | Maintenir le contrat de recherche et la notice linguistique. |
| `/[locale]/contact` | Contacter rapidement le candidat. | Champs nommés, validation claire, focus sur le premier champ invalide, solution sans JavaScript et informations RGPD. | Aucun problème significatif observé. | Conserver ; refaire test tactile et lecteur d'écran avant publication. |
| Navbar, footer, consentement, 404/légal | Se repérer, télécharger preuves, régler consentement, récupérer d'une erreur. | Skip link, liens de preuve 200, footer complet, menu mobile Échap/focus, dialogue de consentement accessible, 404 testée. | Nav sans état actif ; la modale légitime demande une préparation dans les tests d'interaction derrière elle. | État courant ; isoler l'état de consentement dans les scénarios E2E. |

## 9. Responsive Audit

### Desktop — 1440×900

Le premier écran de l'accueil est très convaincant : le nom, le portrait, les CTA et l'atmosphère se hiérarchisent sans collision. La navigation reste respirante, les contenus sont dans des largeurs de lecture saines et aucun débordement n'a été observé. Les études de cas profitent du sommaire sticky desktop, mais leur volume reste trop élevé pour une lecture rapide.

### Laptop — 1280×800

L'accueil conserve sa composition et ses actions. Aucun overflow observé. La barre de navigation reste fonctionnelle. À cette hauteur plus faible, l'absence de titre professionnel explicite est encore plus sensible car le premier écran concentre visuellement le nom et le portrait.

### Tablet — 768×1024

Le reflow observé est propre sur l'accueil ; le portrait et le texte restent séparés et le contenu ne déborde pas. Les listes changent de colonne sans tronquer les cartes. Validation tactile sur appareil réel reste recommandée pour les menus et le défilement Lenis.

### Mobile — 390×844

Les contrôles importants sont utilisables : menu ouvert/fermé par Échap avec focus restauré, recherche, validation de contact et theme/locale fonctionnent. Aucun overflow horizontal n'a été relevé dans les routes de test. Les contraintes réelles sont verticales : accueil 11 610 px, projets 10 020 px, compétence Odoo 13 461 px et études de cas jusqu'à 59 997 px. Il faut donc traiter la priorisation, pas compacter arbitrairement les textes ni diminuer la taille de police.

## 10. Visual Design System Audit

| Domaine | État observé | Décision d'audit |
| --- | --- | --- |
| Typographie | Titres Forum très distinctifs, texte EB Garamond agréable à lire, contrôles Roboto Flex et code mono. Les titres longs se replient correctement. | **Préserver** la voix éditoriale ; documenter/réconcilier la décision avec le socle typographique déclaré et supprimer les couches inutilisées. |
| Couleurs | Palette papier/charbon/rouge cohérente. Le rouge est principalement réservé au CTA, aux repères, états et détails de preuve ; les contrastes-clés testés passent largement. | **Préserver** le rouge ; ne l'étendre qu'à des états sémantiques ou interactifs. |
| Espacement | Grilles, bordures fines et grands intervalles de section produisent une lecture calme. | Conserver les tokens, puis réduire les duplications CSS plutôt que « resserrer » visuellement. |
| Composants | Cartes, headers éditoriaux, tags, CTA, footer et dialog partagent un langage reconnaissable. | Maintenir les primitives ; remettre sous contrôle les props/classes désormais inactives. |
| États | Focus visible, hover rouge cohérent, message d'erreur, menu déployé et consentement sont observables. | Ajouter l'état actif/`aria-current` de navigation. |
| Grille | Très bonne au desktop ; reflow propre. | La grille n'est pas le problème. Ajouter une couche de sélection/filtres aux 20 modules plutôt que multiplier les colonnes. |
| Iconographie | Lucide est discrète et accompagnée de texte/aria-label quand nécessaire. | Préserver. |
| Images | Portrait authentique, photographies de cas et fond architectural réellement subordonnés au contenu grâce aux scrims ; alt décoratifs bien gérés. | Préserver les assets, les crédits Pexels et les scrims ; refaire captures après validation. |
| Motion | Atmosphère légère, transitions et radar ne bloquent pas l'information ; reduced motion réduit les animations. | Préserver le mouvement discret et continuer à tester la préférence réduite. |

## 11. Jury Journey Evaluation

### Simulation en cinq minutes

1. **0:00–0:20 — Arrivée.** Le jury voit immédiatement une identité forte, un nom, un portrait, une stack, une promesse de transformation métier et deux actions explicites. Cela fonctionne. Il ne lit toutefois pas une profession précise en une seule phrase ; « développeur full-stack » doit être inféré.
2. **0:20–1:00 — Crédibilité et direction.** Le CTA « Voir les réalisations », les métriques 20 / 16 / 99 et la section Parcours donnent rapidement des signaux de production réelle. Le lien d'alternance vers 1UP et les choix visuels calmes renforcent la crédibilité.
3. **1:00–2:00 — Compétences et preuves.** Le visiteur peut ouvrir Compétences, choisir Odoo/Python/Backend, puis suivre les réalisations associées. C'est l'un des meilleurs aspects du site : les relations ne sont pas seulement narratives, elles sont cliquables dans les deux sens.
4. **2:00–3:30 — Étude de cas.** Une fiche de réalisation confirme le contexte, les images et l'existence d'un sommaire. Le visiteur commence à chercher « quel était exactement son rôle, que s'est-il passé, quel résultat ? ». Ces réponses existent, mais demandent soit une lecture longue, soit un choix conscient dans un sommaire non persistant mobile.
5. **3:30–5:00 — Approfondissement.** Le jury peut trouver les responsabilités, le regard critique et les compétences reliées. Il peut en revanche manquer la collection des modules open source, car « Projets Odoo » n'est pas dans la navigation principale et apparaît comme une longue liste sans première sélection éditoriale.

| Question du jury | Réponse actuelle | Niveau |
| --- | --- | --- |
| Qui est ce candidat ? | Nom, lieu, alternance, parcours et portrait très clairs. | Bon, mais rôle à expliciter. |
| Que sait-il faire ? | Compétences et stack fortement visibles, avec détails. | Très bon. |
| Où sont les preuves ? | Réalisations, captures, documents, GitHub, liens internes et résultats nuancés. | Très bon. |
| Quelle a été sa contribution ? | Très détaillée dans étapes, responsabilités et cas. | Bonne, mais trop enterrée. |
| Quels résultats a-t-il obtenus ? | Métriques honnêtes et résultats dédiés. | Bonne, mais trop tardive dans le récit. |
| Qu'est-ce qui le différencie ? | Passage métier ↔ technique, Odoo en production, regard critique, qualité de présentation. | Très bon. |

Conclusion de parcours : le portfolio répond à toutes les questions importantes, mais ne les répond pas encore dans l'ordre optimal de décision. Une couche de synthèse sur le hero et chaque étude de cas le ferait passer d'un excellent dossier à explorer à un dossier immédiatement défendable devant un jury pressé.

## 12. Top 10 Improvements

| Rang | Amélioration | Impact | Effort | Raison | Fichiers / composants probables |
| ---: | --- | --- | --- | --- | --- |
| 1 | Nommer le rôle professionnel dans le hero. | High | Low | Répond instantanément à la question centrale « qui / quel métier ? ». | `hero-section.tsx`, `fr.json`, `en.json`. |
| 2 | Ajouter un résumé « Contexte / Mon rôle / Résultat / Preuve » avant les médias des études de cas. | High | Medium | Rend la contribution et l'issue visibles avant la narration. | `realisations/[slug]/page.tsx`, `src/lib/realisations/*`, renderer partagé. |
| 3 | Rendre les résultats et le sommaire immédiatement atteignables sur mobile. | High | Medium | Réduit le coût de navigation des pages de 41–60 k px. | `realisations/[slug]/page.tsx`, `globals.css`. |
| 4 | Ajouter l'état actif visuel et `aria-current` à la navigation globale. | Medium | Low | Améliore orientation et visibilité de l'état. | `navbar.tsx`, styles navbar, tests navigation. |
| 5 | Donner aux 20 modules une entrée « Modules open source (20) » et une sélection/filtre par domaine. | Medium | Medium | Rend une preuve technique forte découvrable et décisionnelle. | `navbar.tsx`, `projects/page.tsx`, `odoo-projects.ts`, composant de filtre/test. |
| 6 | Réconcilier les snapshots de l'accueil et le contrat du portrait après validation visuelle humaine. | Medium | Low | Rétablit une alerte fiable contre les prochaines régressions. | `homepage-visual.spec.ts`, snapshots, tests associés. |
| 7 | Réduire ou justifier le CSS de 183,9 KiB à ≤175 KiB. | Medium | Medium | Réactive le garde-fou performance sans compromettre l'identité. | `globals.css`, composants/styles générés, budget. |
| 8 | Porter les tags cliquables à 24×24 px minimum. | Low | Low | Corrige WCAG 2.5.8 et améliore le toucher mobile. | `topic-link.tsx`, styles tags, test ciblé. |
| 9 | Isoler l'état de consentement dans les scénarios E2E qui testent la navigation. | Low | Low | Évite un faux échec causé par une modale volontairement bloquante. | `e2e/i18n.spec.ts`, helpers E2E. |
| 10 | Nettoyer les props/classes de style mortes et documenter la typographie éditoriale. | Low | Medium | Réduit la dérive et rend le prochain changement visuel plus sûr. | `globals.css`, `components/ui/*`, `editorial-page-header.tsx`, `projects-section.tsx`. |

## 13. UX Debt

1. **Absence de modèle partagé de priorité de preuve.** Les relations sont centralisées et excellentes, mais chaque page de cas ne dispose pas d'un objet de synthèse commun « rôle / résultat / preuve / métriques ». Sans ce modèle, la même information risque d'être enterrée ou formulée différemment page par page.
2. **Navigation sans état de route.** La navbar est partagée mais ignore le chemin actuel. C'est une correction systémique, non cinq correctifs de page.
3. **Architecture « modules open source » insuffisamment éditorialisée.** `odooProjects` est une collection technique homogène ; elle a besoin d'une taxonomie métier et d'une sélection, pas uniquement d'un meilleur espacement de cartes.
4. **Système de styles à réconcilier.** Les tokens de couleur sont bons, mais des couches historiques/Tailwind et romano-éditoriales coexistent, avec 65 avertissements de lint. Il faut réduire la dette à la source avant de multiplier les ajustements ponctuels.
5. **Contrats de qualité visuelle hors synchronisation.** Les tests visuels et la nouvelle identité ne doivent pas évoluer indépendamment. Une baseline explicite approuvée est une partie du système de design, pas un artefact optionnel.

## 14. Things That Should NOT Be Changed

- **La direction romano-éditoriale.** Le décor architectural est atténué, fixe et non cliquable ; il soutient une impression de dossier soigné au lieu de concurrencer le contenu.
- **Le portrait authentique.** Il humanise immédiatement le portfolio sans donner l'impression d'une image générée ou d'un visuel gadget. Conserver son traitement simple et professionnel.
- **La typographie de titrage éditoriale.** Les grands titres Forum et le texte EB Garamond donnent une identité distinctive et restent lisibles ; la recommandation est de stabiliser techniquement ce choix, pas de revenir à un portfolio SaaS générique.
- **Le rouge comme accent.** Dans le rendu observé, il guide les CTA, repères, liens et éléments actifs avec parcimonie ; il ne doit pas être remplacé par une palette neutre sans nécessité d'accessibilité démontrée.
- **La richesse factuelle des études de cas.** Risques, décisions, limites, autocritique et résultats non sur-vendus distinguent ce portfolio. Il faut les mettre en couches, jamais les supprimer pour « faire plus court ».
- **Le graphe de navigation des preuves.** Les liens compétence ↔ réalisation ↔ parcours, les documents publics, les liens GitHub et les crédits média visibles sont des atouts majeurs à préserver dans les deux langues.
- **Les garde-fous d'accessibilité déjà présents.** Skip link, focus visible, reduced motion, modal de consentement et formulaire accessible sont des fondations à conserver pendant toute évolution visuelle.

## 15. Final implementation plan

### Phase 1 — Critical usability/accessibility defects

Il n'y a pas de défaut critique bloquant à corriger. Cette phase peut se limiter à un correctif WCAG ciblé avant toute évolution plus large.

| Tâche | Problème | Solution | Bénéfice utilisateur | Fichiers probables | Dépendances | Risque | Complexité |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Garantir les 24×24 px des tags interactifs | Lien API à 21×20 px. | Ajouter un min-size/padding ciblé aux TopicLink hors prose et écrire un test de taille. | Touche et accessibilité plus fiables. | `topic-link.tsx`, styles, E2E/accessibilité. | Aucune. | Faible : surveiller les retours à la ligne. | Faible. |

### Phase 2 — Information architecture and hierarchy

| Tâche | Problème | Solution | Bénéfice utilisateur | Fichiers probables | Dépendances | Risque | Complexité |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Clarifier le métier dans le hero | Rôle visé implicite. | Réemployer les clés localisées existantes pour afficher le titre métier près du nom. | Compréhension immédiate du profil. | `hero-section.tsx`, dictionnaires FR/EN, tests homepage. | Décision de formulation courte. | Faible. | Faible. |
| Créer une synthèse de cas commune | Rôle/résultat dispersés dans un récit long. | Étendre le modèle de réalisation avec résumé de jury, métriques, rôle et liens de preuve ; rendre un bloc partagé en tête. | Chemin « projet → contribution → résultat » visible sans lecture exhaustive. | `src/lib/realisations/*`, types, `realisations/[slug]/page.tsx`, tests. | Validation factuelle des résumés. | Moyen : ne pas introduire de chiffres non sourcés. | Moyen. |
| Donner des raccourcis de cas aux mobiles | Sommaire non persistant et résultats loin. | Ancres/CTA « Résultats », « Mon rôle », « Preuves » après le header ; conserver le sommaire complet ensuite. | Navigation rapide dans les très longues pages. | Détail réalisation, CSS responsive. | Synthèse de cas. | Faible. | Moyen. |
| Editorialiser les modules Odoo | 20 modules peu découvrables et difficiles à sélectionner. | Ajouter entrée secondaire, sélection éditoriale et taxonomie/filtre par domaine métier. | Meilleure visibilité du travail open source et moins de charge de choix. | Navbar, projects, données modules, dictionnaires, tests. | Taxonomie validée. | Moyen : préserver les routes et GitHub actuels. | Moyen. |

### Phase 3 — Cross-page consistency/design system

| Tâche | Problème | Solution | Bénéfice utilisateur | Fichiers probables | Dépendances | Risque | Complexité |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Ajouter l'état de route | Aucun repère actif dans la navbar. | Sous-composant client qui calcule famille/route, applique `aria-current` et style actif accessible. | Orientation constante, notamment sur les détails. | `navbar.tsx`, styles, E2E navigation. | Règles de correspondance route/famille. | Faible. | Faible. |
| Réconcilier système de styles | 65 warnings et API de styles partiellement inactives. | Supprimer imports/props morts, décider/formaliser les polices éditoriales, réduire doublons sans changer le rendu approuvé. | Évolutions visuelles plus sûres et cohérentes. | `globals.css`, composants UI/éditoriaux, lint tests. | Baseline visuelle approuvée. | Moyen : régression visuelle possible. | Moyen. |
| Réparer les contrats de régression visuelle | Baselines et portrait attendus obsolètes. | Générer et valider nouvelles baselines, mettre à jour sélecteurs, isoler le consentement des tests non liés. | Signal CI fiable contre la dérive UI. | E2E, snapshots, helpers. | Validation visuelle finale. | Faible. | Faible. |

### Phase 4 — Responsive improvements

| Tâche | Problème | Solution | Bénéfice utilisateur | Fichiers probables | Dépendances | Risque | Complexité |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Vérifier la synthèse de cas aux quatre breakpoints | Longues pages particulièrement coûteuses à 390 px. | Ajouter captures ciblées desktop/laptop/tablet/mobile de cas et assertions d'accès immédiat aux sections essentielles. | Hiérarchie conservée, plutôt que simple réduction de taille. | Tests Playwright, styles responsive de cas. | Phase 2. | Faible. | Moyen. |
| Auditer tactile et zoom | Audit actuel principalement Chromium desktop/headless. | Vérifier iOS/Android réel ou émulation, zoom 200/400 %, focus fixe et contraste image par image. | Réduit les risques non visibles dans le test de largeur. | E2E et protocole QA. | Accès appareils si disponible. | Faible. | Faible à moyen. |

### Phase 5 — Visual polish and motion

| Tâche | Problème | Solution | Bénéfice utilisateur | Fichiers probables | Dépendances | Risque | Complexité |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Revenir sous budget CSS par mesure | CSS 8,9 KiB au-dessus du seuil. | Mesurer les règles générées et communes, retirer les doublons/morts, conserver les effets qui contribuent réellement à l'identité. | Chargement plus maîtrisé sans banaliser le portfolio. | `globals.css`, composants/styles générés, script budget. | Baselines de Phase 3. | Moyen. | Moyen. |
| Finaliser une matrice visuelle de thèmes | Le rendu clair/sombre est bon mais la couverture visuelle est rouge. | Capturer les pages critiques dans les deux thèmes, documenter contrastes et valider les scrims. | Préserve la qualité dans tout environnement. | E2E screenshots, CSS atmosphère. | Phase 3. | Faible. | Moyen. |

## Résultats de vérification à conserver

| Contrôle | Résultat | Interprétation |
| --- | --- | --- |
| `pnpm build` | Réussi, 125 routes | Build de production actuel exploitable pour l'audit. |
| `pnpm test` | 53 fichiers, 293 tests réussis | Couverture unitaire/browser actuelle verte. Les erreurs console prévues des tests de formulaire ne sont pas des erreurs applicatives de production. |
| `pnpm test:e2e` | 42/47 réussis | Navigation, pages secondaires desktop/mobile, formulaire, accessibilité/motion, runtime, sitemap, no-JS et cookies passent. 5 échecs décrits en M-03. |
| `pnpm lint` | 0 erreur, 65 avertissements | Qualité bloquante verte, dette de maintenance visible. |
| `pnpm check:performance` | Réussi, 4 routes mesurées | Budgets locaux réseau/DOM respectés ; ce n'est pas une mesure Lighthouse ou terrain. |
| `pnpm check:bundle` | Échec : CSS 183,9 KiB > 175 KiB | Garde-fou performance à restaurer. |
| Parcours DOM/rendu | Pas d'erreur runtime sur les routes échantillonnées ; pas d'overflow horizontal | La responsivité de base et les frontières d'exécution sont bonnes. |
