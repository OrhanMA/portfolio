# Audit approfondi de qualité, architecture et maintenabilité du portfolio

> **Fiche d'archive**
> - **Date :** 8 septembre 2026.
> - **Nature :** audit technique initial de qualité, d'architecture et de maintenabilité.
> - **État :** document historique conservé avec ses constats et mesures d'origine.
> - **Suite :** [réanalyse du même jour](./code-quality-reaudit-2026-09-08.md).
> - **Avertissement :** ce rapport ne décrit pas nécessairement le checkout courant.

Date : 8 septembre 2026. Projet : racine de ce dépôt.

État analysé : copie du répertoire de travail, incluant les modifications et nouveaux fichiers présents au début de l'audit, sur une base Git `ceebfb5`. Ce rapport évalue cet état local, pas uniquement le dernier commit ni le site déployé. Les constats décrivent cette photographie initiale ; les paragraphes « Suivi réalisé » ajoutés à F22–F27 consignent les corrections effectuées ensuite dans la même copie et leurs validations.

## 1. Résumé exécutif

**Le projet constitue une base solide de portfolio professionnel, mais son état actuel n'atteint pas encore la fiabilité de livraison attendue dans une entreprise exigeante.** Le problème principal n'est pas une mauvaise architecture : c'est l'écart entre les garanties annoncées, les tests effectivement exécutés et certains comportements réels aux frontières du système.

Le découpage App Router, la préférence pour les composants serveur, le contenu typé, les mécanismes anti-spam et l'investissement dans les tests inspirent confiance. En revanche, la recherche peut rétablir une ancienne URL, les dates produisent une erreur d'hydratation dans certains fuseaux, des pannes externes échappent au traitement du formulaire, et la navigation entre langues révèle une incohérence de nonce CSP. Ces problèmes ont été reproduits. L'accessibilité est travaillée, mais certaines interactions personnalisées ne respectent pas entièrement leur contrat.

**Aucune refonte générale n'est justifiée.** Il faut stabiliser les états, les erreurs, quelques invariants de contenu et la chaîne de validation. Ajouter une architecture hexagonale, un CMS, une couche de services générique ou une bibliothèque d'état globale augmenterait ici le coût de maintenance sans résoudre les défauts observés.

### Périmètre et méthode

Inspection de l'organisation du dépôt, des configurations, des dépendances entre modules, des données éditoriales, des composants, des routes, des tests, de la CI et de la documentation. Inventaire : 118 fichiers de production TypeScript/TSX, 6 articles MDX, 32 modules marqués `use client`, 47 fichiers de tests unitaires/composants et 9 fichiers E2E. L'analyse AST n'a relevé aucun `any` explicite dans le code de production ni cycle d'import statique interne. Les imports dynamiques et les parcours principaux ont également été inspectés.

Les vérifications lourdes ont été exécutées dans une copie isolée, avec Node **22.23.2**, pnpm **10.20.0**, Next.js **16.2.11** et un serveur de production local. Aucun fichier `.env` réel n'a été copié. Une seconde compilation avec identifiants publics factices a servi à vérifier les scripts consentis sous CSP ; la requête GTM a été interceptée. Aucun email réel n'a été envoyé.

Les résultats de couverture, du navigateur, des tests et les reproductions sont conservés dans [le dossier de preuves](../reports/code-quality-audit-2026-09-08/evidence).

| Vérification | Résultat observé | Interprétation |
|---|---|---|
| TypeScript, configuration actuelle | Passe | Le typage actuel est cohérent ; cela ne garantit pas les invariants de données |
| ESLint | Échec : 5 diagnostics sur le même mock de lien | Un défaut de fixture, pas cinq défauts applicatifs distincts |
| Tests unitaires, Node 22 | 209/209, 43 fichiers | Socle réel et utile |
| Tests de composants navigateur | 21/21, 4 fichiers | Exécutés séparément du script `test` |
| Couverture unitaire | Instructions 85,64 % ; branches 76,79 % ; fonctions 83,46 % ; lignes 87,41 % | Pour le périmètre instrumenté, pas pour toute l'application |
| Compilation de production | Passe | Les routes localisées sont dynamiques, malgré le compteur de génération de Next |
| Budget de bundles existant | Passe | Contrôle par fichier, pas du coût total par route |
| E2E, 32 scénarios uniques | 28 passent, 4 échouent après reprises ciblées | 1 libellé obsolète et 3 comparaisons visuelles ; aucun scénario laissé masqué par les skips |
| Sitemap et liens internes | Les 114 URL du sitemap sont contrôlées avec succès | Bonne intégrité actuelle ; ne vérifie pas toutes les ancres ni les erreurs de console après navigation |
| Audit des dépendances | 9 avis : 6 élevés, 3 modérés ; 0 critique | Avis transitifs ; ne signifie pas neuf exploits applicatifs |
| Reproductions supplémentaires | 6 tests de caractérisation passent en affirmant les défauts | Preuves de problèmes, pas nouveaux tests de non-régression satisfaits |

Le premier lancement sous Node 26 produisait des erreurs liées à `localStorage` dans l'environnement de test. Elles ont disparu avec Node 22, utilisé par la CI : elles ne sont pas comptées comme défauts applicatifs. Un premier montage de la copie avec `node_modules` symbolique a été rejeté par Turbopack ; le build a ensuite réussi avec des dépendances locales à la copie. Ce rejet n'est pas attribué au projet.

**État de validation après les suivis F22–F27, le 8 septembre 2026 :** sous Node 22.23.2 et pnpm 10.20.0, l'installation gelée, le build, ESLint, TypeScript, `pnpm audit --audit-level=moderate`, `pnpm audit --prod`, les budgets d'assets et les budgets agrégés de routes passent. La suite Vitest compte 48 fichiers et 263 tests réussis ; Playwright compte 43 scénarios réussis, dont la sonde sans JavaScript. Aucun commit, push ou déploiement n'a été réalisé.

### Lecture des niveaux

- **Critique** : compromission ou indisponibilité majeure démontrée. Aucun constat classé ainsi.
- **Important** : défaut de comportement, de robustesse ou de validation qui affaiblit une fonction centrale ou la confiance dans une livraison.
- **Moyen** : problème localisé ou risque d'évolution crédible, à corriger sans refonte.
- **Faible** : entretien, clarification ou préférence ayant un effet limité.

Les notes sont un jugement de revue argumenté, pas une certification ni une moyenne calculée à partir du nombre de tests.

## 2. Forces du projet

### Architecture proportionnée

Le routage par locale est lisible. Les pages assemblent essentiellement des données et des sections ; les utilitaires transversaux restent identifiables dans `lib`. Les données de compétences et réalisations sont largement séparées du rendu. Les composants serveur évitent d'expédier tout le catalogue au navigateur : les parties clientes reçoivent généralement des projections utiles. Le contexte dictionnaire client est limité à un sous-ensemble de quatre groupes de données.

Les modules les plus réutilisés — utilitaires de classes, texte lié, contexte de route et métadonnées — jouent des rôles cohérents. Leur nombre d'importateurs n'est pas en soi un mauvais couplage. Aucun cycle statique n'a été trouvé. La séparation serveur/client avec `server-only`, les alias et l'enregistrement centralisé de GSAP facilitent le contrôle des dépendances.

Les principes SOLID utiles sont présents sous leur forme fonctionnelle : responsabilités relativement localisées, composition et dépendances explicites. Il n'y a aucune raison d'imposer des classes ou des interfaces de service à chaque fonction. Le point à améliorer est surtout l'unicité des données métier et des invariants, pas l'application littérale de chaque principe SOLID.

### React et Next.js utilisés avec discernement

Les frontières clientes correspondent principalement à une interaction : filtres, navigation, consentement, formulaire, thème et animations. La présence de 32 directives `use client`, composants UI inclus, ne suffit pas à conclure à un excès. Les composants serveur restent majoritaires.

Les hooks et la composition sont globalement lisibles. Les calculs de filtrage bénéficient d'une mémorisation compréhensible ; je n'ai pas trouvé d'argument pour généraliser `memo`, `useMemo` ou `useCallback`. Les fonctions inline et petits composants recréés ne sont pas un défaut sans mesure d'un coût réel. React présente d'ailleurs `useMemo` comme une optimisation de performance, pas une garantie de correction : [documentation React](https://react.dev/reference/react/useMemo).

Le chargement différé des éléments lourds ou externes, la façade vidéo, `next/image`, les polices gérées par Next et les animations chargées selon l'interaction montrent une attention au coût côté client. Les états d'erreur et de page introuvable sont présents.

### TypeScript et intégrité du contenu

Le mode strict est actif, les types de contenu fournissent des contrats utiles et les unions littérales existantes sont préférables à des chaînes arbitraires. Aucun `any` explicite de production n'a été trouvé. Les assertions recensées ne sont pas toutes suspectes : une grande partie correspond à `as const`. Il faut examiner les quelques assertions de complétude, pas les supprimer mécaniquement.

Les tests de relations éditoriales et le parcours du sitemap apportent une vraie protection. Les réalisations, compétences et expériences actuellement référencées sont cohérentes dans les parcours vérifiés.

### Sécurité construite en plusieurs couches

Validation Zod partagée et répétée côté serveur, limites de taille, honeypot, contrôle temporel, limitation atomique via Redis et vérification de reCAPTCHA constituent une défense sérieuse pour un formulaire de portfolio. La limitation en production échoue de manière restrictive quand le stockage n'est pas disponible. Les vérifications reCAPTCHA incluent score, action, hostname et ancienneté.

Les chaînes injectées dans le HTML d'email sont échappées, le sujet est nettoyé des retours à la ligne, et le JSON-LD échappe les caractères pouvant fermer prématurément une balise script. Le rendu React standard limite l'injection de HTML arbitraire. Aucun vecteur XSS exploitable n'a été démontré dans les chemins inspectés.

Le consentement conditionne GTM ; aucun iframe `noscript` ne contourne ce choix. La CSP, les nonces et les en-têtes de sécurité sont de bonnes décisions. Le défaut de cycle de vie décrit plus loin ne justifie pas d'abandonner cette protection.

### Tests et effort documentaire substantiels

Il existe de vrais tests de logique, composants, navigation, sitemap, métadonnées et présentation. Le dépôt dépasse largement le portfolio simplement « testé à la main ». README, checklist et plans de tests donnent un point de départ au prochain développeur. Le problème est leur actualité et certains angles morts, pas leur absence.

## 3. Faiblesses du projet

Chaque constat indique sa nature, son impact et une correction proportionnée. Les chemins renvoient à l'état audité ; les numéros de ligne peuvent évoluer après correction.

### F01 — Synchronisation des filtres : deux sources de vérité concurrentes

**Impact : Important. Défaut reproduit. Refactoring pertinent : oui, correction fonctionnelle.**

Dans [articles-filterable-list.tsx:58](../src/components/articles-filterable-list.tsx#L58), `query` et `activeTag` sont initialisés depuis les paramètres, puis un effet réécrit l'URL depuis cet état. Une modification ultérieure de l'URL n'est pas correctement répercutée dans l'état. Reproduction : départ avec `q=odoo`, changement de l'historique vers `q=docker`, puis retour automatique à `q=odoo`. Le problème affecte le contrat de navigation et les liens partageables.

Solution : choisir l'URL comme état canonique des filtres, ou définir explicitement une synchronisation bidirectionnelle qui distingue navigation externe et saisie locale. Une saisie temporaire peut rester locale ; la navigation ne doit pas être écrasée par un effet obsolète. Préserver les paramètres non concernés. Éviter une requête de navigation à chaque caractère si un filtrage local suffit ; un court debounce peut être justifié, sans ajouter un gestionnaire d'état global.

Validation : charger un lien filtré, modifier la recherche, naviguer arrière/avant et changer un paramètre externe. Vérifier simultanément URL, champ et résultats. Référence : [useSearchParams et navigation Next.js](https://nextjs.org/docs/app/api-reference/functions/use-search-params).

### F02 — Dates instables entre serveur et navigateur

**Impact : Important. Défaut reproduit. Refactoring pertinent : oui.**

[articles-filterable-list.tsx:187](../src/components/articles-filterable-list.tsx#L187) convertit une date éditoriale `YYYY-MM-DD` avec `new Date(...).toLocaleDateString(...)`, sans fuseau explicite. Un navigateur configuré à Los Angeles affiche le 12 mai pour une date du 13 mai et déclenche l'erreur React 418 d'hydratation.

Solution : traiter ces valeurs comme des dates calendaires, avec un formatage déterministe, par exemple `timeZone: "UTC"`, ou fournir le texte déjà formaté côté serveur. Ajouter un test entre fuseaux distincts. `suppressHydrationWarning` cacherait le symptôme sans corriger le jour affiché. Référence : [causes de l'erreur d'hydratation React 418](https://react.dev/errors/418).

### F03 — Pannes reCAPTCHA et transport du formulaire mal contenues

**Impact : Important. Défaut reproduit avec dépendance simulée en panne. Refactoring pertinent : oui.**

L'appel à `verifyRecaptcha` dans [contact.ts:81](../src/app/[locale]/actions/contact.ts#L81) précède la zone qui transforme les erreurs en résultat utilisateur. Un timeout, un rejet de `fetch` ou un JSON invalide peut donc remonter comme exception. Côté [contact-form.tsx:93](../src/components/contact-form.tsx#L93), l'appel à l'action serveur n'est pas lui-même protégé contre un rejet de transport.

La validation nominale est bonne, mais une panne d'un service externe peut aboutir à une erreur de page au lieu d'un message localisé permettant de réessayer, avec un risque de perte de saisie.

Solution : transformer les erreurs opérationnelles attendues en résultat d'action explicite, conserver les champs et proposer de réessayer. Un résultat discriminé `success` / `validation-error` / `temporarily-unavailable` est utile s'il simplifie le traitement existant ; aucune hiérarchie de classes d'erreurs n'est nécessaire. Tester timeout, rejet réseau, réponse malformée et indisponibilité de l'action. Ne pas confondre cette vérification avec l'envoi réel d'un email, non effectué.

### F04 — Le chargeur reCAPTCHA ne récupère pas après un échec

**Impact : Moyen. Défaut reproduit. Refactoring pertinent : oui.**

Dans [recaptcha-client.ts:28](../src/lib/recaptcha-client.ts#L28), la promesse est réinitialisée après échec, mais l'élément script ayant échoué reste dans le DOM. Le prochain essai le réutilise et attend des événements qui ne se reproduiront pas. Le visiteur peut rester bloqué jusqu'au rechargement complet. L'attente de `ready`/`execute` n'est pas couverte par la même limite de temps que le chargement.

Solution : nettoyer le script et les écouteurs après échec, puis recréer une tentative ; borner aussi l'exécution. Ajouter un test échec puis succès et un test d'API qui ne répond jamais. Une petite fonction avec nettoyage explicite suffit.

### F05 — Le stockage du consentement peut casser l'interface

**Impact : Important. Défaut reproduit avec stockage refusé. Refactoring pertinent : oui.**

[getStoredConsent et setStoredConsent](../src/lib/cookie-consent.ts#L85) ne protègent pas toutes les opérations : `removeItem` se trouve hors de la capture et `setItem` peut lever une exception. Comme la lecture intervient dans le chemin d'abonnement aux analytics, une restriction de stockage peut toucher un composant global.

Solution : encapsuler lecture, suppression et écriture dans une gestion cohérente des erreurs. En cas d'échec, garder une décision en mémoire pour la session et laisser les analytics désactivées tant qu'un consentement valide n'est pas disponible. Le stockage facultatif ne doit pas rendre le site inutilisable. Tester lecture interdite, suppression interdite, quota et JSON corrompu. Cela ne constitue pas une certification juridique RGPD.

### F06 — Fenêtre de consentement : sémantique modale incomplète

**Impact : Moyen. Défauts navigateur et axe reproduits. Refactoring pertinent : oui.**

[cookie-consent.tsx:145](../src/components/cookie-consent.tsx#L145) annonce `aria-modal="true"` et piège Tab, mais l'arrière-plan reste cliquable : un clic sur la navigation change de page derrière la fenêtre. Le switch des cookies nécessaires n'a pas de nom accessible ; axe le signale comme sérieux.

Solution : utiliser le composant Dialog de la bibliothèque déjà présente, avec focus initial, restitution du focus, fond inerte et noms accessibles ; ou choisir une présentation réellement non modale si telle est l'intention. Ne pas conserver un hybride dont la sémantique contredit le comportement. Référence : [contrat d'une boîte de dialogue modale WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

### F07 — Navigation clavier incomplète

**Impact : Moyen. Défaut reproduit sur desktop et mobile. Refactoring pertinent : oui.**

La navigation personnalisée dans [navbar.tsx](../src/components/navbar.tsx#L203) ne se ferme pas avec Échap dans les états testés. Le déclencheur mobile ne relie pas explicitement son panneau avec `aria-controls`. Le `aria-haspopup="true"` du menu desktop annonce une sémantique de menu alors que le contenu est une navigation ordinaire.

Solution : retenir un modèle de disclosure pour les liens du site, gérer Échap et le retour au déclencheur, relier bouton et panneau. Il n'est pas nécessaire d'implémenter tout le clavier d'un menu applicatif. Référence : [exemple officiel de navigation par disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/).

### F08 — Erreurs de formulaire insuffisamment reliées aux champs

**Impact : Moyen. Constat DOM confirmé. Refactoring pertinent : oui.**

Les champs invalides portent `aria-invalid`, mais aucun `aria-describedby` ne les relie à leur message. Le rôle d'alerte du message ne remplace pas cette association lorsque l'utilisateur revient sur le champ. Les champs nom et email n'ont pas leurs valeurs d'autocomplétion usuelles. La référence de contrôle du sélecteur mérite aussi d'être reliée au déclencheur pour fiabiliser le focus sur erreur.

Solution : donner un identifiant stable à chaque erreur et le référencer depuis le champ ; ajouter `autoComplete="name"` et `"email"` ; tester le focus après soumission invalide. Le scan axe du formulaire a passé : ce constat provient de l'inspection des interactions et du DOM, pas d'une violation automatiquement détectée.

### F09 — Réduction des mouvements et langue du contenu partiellement respectées

**Impact : Moyen. Défauts confirmés. Refactoring pertinent : oui.**

[radar-chart.tsx:82](../src/components/radar-chart.tsx#L82) anime toujours ses éléments avec GSAP. Avec `prefers-reduced-motion: reduce`, la sonde a encore mesuré une opacité intermédiaire. Les autres animations disposent de garde-fous : il faut harmoniser le radar. Son texte accessible contient également `sur 100` en anglais.

Les articles MDX restent volontairement en français sur les routes anglaises, mais le corps de l'article n'annonce pas `lang="fr"` alors que le document annonce `en`. L'avertissement de traduction ne corrige pas la prononciation d'un lecteur d'écran.

Solution : rendre immédiatement le radar visible sans animation en mode réduit, localiser sa description et marquer uniquement le corps français de l'article avec sa langue réelle. Ajouter une vérification navigateur du média et du DOM ; un mock GSAP ne peut pas la remplacer.

### F10 — Le changement de langue perd le contexte de recherche

**Impact : Moyen. Perte de query reproduite ; perte de hash visible dans le code. Refactoring pertinent : oui.**

[language-switcher.tsx:29](../src/components/language-switcher.tsx#L29) reconstruit le chemin depuis `pathname`. Passer de `/fr/articles?q=odoo` à l'anglais donne `/en/articles` et vide le filtre. Les ancres ne sont pas conservées non plus.

Solution : remplacer uniquement le segment de locale dans l'URL et conserver query/hash quand ils gardent un sens. Tester un article ancré et une liste filtrée. Coordonner cette correction avec F11 pour ne pas résoudre l'URL tout en conservant le défaut de nonce.

### F11 — Cycle de vie du nonce incompatible avec certains changements de locale

**Impact : Moyen. Violation CSP reproduite ; blocage du thème entier non observé. Refactoring pertinent : oui.**

Le [layout de locale:55](../src/app/[locale]/layout.tsx#L55) reçoit un nonce de requête. Une navigation cliente vers l'autre langue fournit un nouveau contexte au fournisseur de thème, alors que la politique CSP du document courant conserve son nonce initial. Le style temporaire injecté par `next-themes` pour désactiver les transitions est alors bloqué. Une nouvelle bascule de thème reproduit la violation ; le thème change néanmoins.

Solution : maintenir un nonce cohérent pendant la vie du document. Pour ce portfolio, une navigation complète lors du changement de langue peut être une solution simple et défendable, en conservant query/hash ; sinon, concevoir explicitement la propagation du nonce du document aux intégrations clientes. Valider la séquence chargement → navigation → langue → thème en écoutant `securitypolicyviolation`. Ne pas utiliser un nonce global fixe ni ajouter `unsafe-inline` pour faire disparaître le symptôme.

Le chargement GTM après consentement a été vérifié séparément avec des identifiants factices et une interception réseau. Il fonctionne sous `strict-dynamic`, même si l'inspection statique pouvait faire suspecter un nonce manquant sur ce chemin. **Aucun défaut GTM n'est retenu sur cette seule base.** Référence : [CSP et nonces dans Next.js](https://nextjs.org/docs/app/guides/content-security-policy).

### F12 — JSON-LD de page obsolète après navigation cliente

**Impact : Moyen pour la cohérence SEO, limité par le rendu direct correct. Défaut reproduit. Refactoring pertinent : oui.**

Le JSON-LD contextualisé par le chemin est généré dans le layout persistant. Après `/fr` → `/fr/a-propos`, la sonde conserve le `ProfilePage` de `/fr`, tandis que le chargement direct de la destination est correct. Les canoniques vérifiées restent correctes : il ne faut pas assimiler cela à une indexation globalement cassée.

Solution : laisser les entités globales `Person` et `WebSite` dans le layout et placer les données propres à la page au niveau de la route. Les layouts persistent pendant la navigation ; ce n'est pas un bon emplacement pour une valeur censée changer à chaque page. Référence : [layouts et pages Next.js](https://nextjs.org/docs/app/getting-started/layouts-and-pages).

### F13 — Traductions et locale : plusieurs modèles concurrents

**Impact : Moyen. Dette actuelle et risque d'évolution. Refactoring pertinent : oui, limité.**

Les dictionnaires ont actuellement la même structure profonde, avec 545 feuilles chacun. Toutefois, les traductions sont aussi dispersées dans le JSX d'À propos, dans les données métier et dans les textes d'email. Certains types réécrivent `{ fr, en }`, certaines props acceptent `string` au lieu de `Locale`, et le sélecteur suppose exactement deux langues. Des fragments comme la description du radar ou « Module anatomy » illustrent les oublis.

Solution : utiliser `Locale` et `Record<Locale, ...>` partout où il s'agit réellement d'une locale supportée ; regrouper les textes d'interface, tout en conservant les données éditoriales riches dans leurs modules. Ajouter un test de parité profonde des clés et des règles documentées pour les textes volontairement non traduits. Les tests actuels de dictionnaire ne remplacent pas ce contrôle complet.

Pour deux langues, ni ICU généralisé ni plateforme de traduction ne sont indispensables. Une troisième langue nécessiterait aujourd'hui des modifications de types, logique, métadonnées, contenu et tests : le guide d'ajout doit le reconnaître.

### F14 — Titres et références de contenu dupliqués

**Impact : Moyen. Dette confirmée. Refactoring pertinent : oui, sans supprimer les liens contextuels.**

Les titres et tags de projets mis en avant sur la page d'accueil doublonnent les données de réalisation. [experience-section.tsx:33](../src/components/landing/experience-section.tsx#L33) maintient deux tables manuelles de titres de réalisations et compétences. Une référence non répertoriée peut afficher son slug brut ; le catalogue évolue alors à plusieurs endroits.

Solution : résoudre les titres depuis les catalogues canoniques côté serveur et transmettre un petit tableau de liens prêts à afficher. Conserver les exceptions éditoriales explicites. Les liens de compétences de l'accueil et les liens thématiques peuvent viser des destinations différentes pour des raisons utiles : il ne faut pas les fusionner aveuglément dans une seule destination par mot.

Il existe aussi un type client de recherche proche du type d'index côté serveur. Extraire leur forme commune dans un module de types pur réduirait la dérive, sans importer un module contenant `fs` dans le client.

### F15 — Relations éditoriales supposées non vides

**Impact : Moyen. Risque d'évolution, pas panne actuelle. Refactoring pertinent : oui.**

[realisations/page.tsx:62](../src/app/[locale]/realisations/page.tsx#L62) utilise une recherche suivie de `!.id` ; [la page de détail:124](../src/app/[locale]/realisations/[slug]/page.tsx#L124) accède à `linkedExperiences[0].id`. Ajouter une réalisation sans expérience liée provoquerait une erreur au lieu d'un diagnostic éditorial compréhensible. Les données présentes passent les tests : le défaut est le contrat implicite.

Solution : décider si la relation est obligatoire. Si oui, valider tous les catalogues avant livraison avec une erreur nommant le slug fautif ; si non, rendre le lien conditionnel. Appliquer le même principe aux `Object.fromEntries` convertis en `Record` complet sans vérification. Des identifiants typés et quelques tests d'intégrité suffisent ; pas besoin de construire un moteur de graphes.

L'option exploratoire `noUncheckedIndexedAccess` révèle notamment l'accès `[0]`. Elle serait utile après correction ciblée, sans remplacer les avertissements par une série de `!`. Référence : [option TypeScript officielle](https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html).

### F16 — Lecture MDX : capture asynchrone inefficace

**Impact : Moyen. Rejet de fichier absent reproduit. Refactoring pertinent : oui.**

Dans [articles.ts:39](../src/lib/articles.ts#L39), `return readFile(...)` sans `await` à l'intérieur du `try` laisse le rejet asynchrone échapper au `catch`. La lecture d'un fichier absent rejette l'index construit avec `Promise.all`.

Solution : capturer réellement le rejet si le contrat prévoit un repli. Pour un article publié dont le fichier manque, un échec explicite de validation avant livraison est souvent préférable à une indexation silencieusement vide. Clarifier le contrat et tester fichier absent, slug invalide et contenu vide. La présence de `cache` React ne transforme pas cette erreur en succès et ne constitue pas un cache interrequêtes durable.

### F17 — Le nettoyage MDX indexe du code et fragilise les ancres

**Impact : Moyen. Pollution de recherche reproduite ; risque d'ancres identifié. Refactoring pertinent : oui.**

[stripMdxForSearch](../src/lib/articles.ts#L21) enlève certains blocs mais laisse des imports et exports MDX. Une recherche sur `getArticleMetadata` peut faire remonter les six articles : la recherche indexe une partie de l'implémentation. Le sommaire est de son côté extrait puis rapproché des titres DOM par position, avec attribution d'identifiants après hydratation.

Solution : utiliser la chaîne MDX existante pour extraire texte et titres en ignorant les nœuds de code/import, ou améliorer un nettoyage volontairement limité avec des fixtures représentatives. Générer les identifiants de titres à la compilation rendrait les liens directs fiables dès le HTML initial. Éviter deux parseurs indépendants qui réinventent la même structure. Tester titres répétés, liens, code, accents et ouverture directe d'une ancre.

### F18 — Un layout de route sert de bibliothèque partagée

**Impact : Faible à Moyen. Convention et couplage. Refactoring pertinent : oui, petit déplacement.**

Le fichier [articles/[slug]/layout.tsx](../src/app/[locale]/articles/[slug]/layout.tsx) sert de composant partagé importé par les six routes MDX explicites, alors que le segment dynamique n'a pas sa propre page. C'est fonctionnel, mais le nom réservé suggère un rôle de routage différent de l'usage réel.

Solution : déplacer le composant partagé et ses types dans un module ordinaire, laisser les routes explicites et les exports de métadonnées lisibles. Les quelques lignes répétées dans six articles ne justifient pas à elles seules un chargeur dynamique sophistiqué. Le layout d'articles qui ne fait que retourner `children` peut également être supprimé s'il ne porte aucune intention documentée.

### F19 — La commande de test générale n'exécute pas ce qu'annonce le projet

**Impact : Important. Constat de collecte confirmé. Refactoring pertinent : oui.**

`pnpm test` lance `vitest run`. La collecte effective contient 209 tests unitaires et aucun test navigateur, malgré la documentation affirmant l'exécution des deux projets. La configuration `vitest.workspace.mts` historique et les configurations séparées ne donnent plus le comportement annoncé avec Vitest 4.

Solution : utiliser une configuration racine `test.projects` adaptée à la version installée, ou faire exécuter explicitement les deux commandes par `test`. Réduire les duplications d'alias et d'options entre configurations. La CI dispose d'une étape navigateur séparée : elle n'est donc pas totalement aveugle à ces tests. Le défaut touche notamment le contrat local avant commit. Référence : [guide de migration Vitest 4](https://v4.vitest.dev/guide/migration).

### F20 — Les portes de validation sont actuellement rouges

**Impact : Important pour une livraison ou une soutenance. Échecs reproduits. Refactoring pertinent : correction et entretien des tests.**

ESLint signale cinq fois le même lien HTML brut dans [linked-text.test.tsx:26](../src/components/__tests__/linked-text.test.tsx#L26). Il faut corriger le mock ou justifier une exception strictement locale à la fixture, sans désactiver la règle pour l'application.

Le test de navigation attend « Développeur full-stack — Alternance » alors que le contenu affiche « Développeur Fullstack — Alternance ». Trois captures d'accueil ne correspondent plus aux références. Les comparaisons desktop/mobile montrent notamment des changements de hauteur de page ; cela ne prouve pas, à lui seul, une régression visuelle du produit.

Solution : comparer visuellement les changements voulus avant d'accepter de nouvelles références, puis stabiliser les assertions sémantiques. Ne pas actualiser automatiquement les images pour obtenir du vert. Des suites déclarées `serial` ont masqué des tests indépendants après le premier échec ; les reprises ciblées ont permis d'établir 28 succès et 4 échecs uniques. Supprimer cette dépendance séquentielle lorsqu'aucun état partagé ne la justifie.

### F21 — Couverture élevée mais frontières insuffisamment vérifiées

**Impact : Moyen. Lacune démontrée par les reproductions. Refactoring pertinent : tests ciblés.**

La couverture mesurée exclut des pages/layouts et des composants d'animation/UI. GSAP est simulé, y compris dans les tests de composants navigateur. Les parcours existants ne vérifient pas systématiquement les erreurs console, la CSP après changement de langue, les différents fuseaux, le refus de stockage ou les pannes externes.

Solution : ajouter les tests correspondant à F01–F11 et une poignée d'invariants de catalogue, plutôt qu'augmenter arbitrairement le seuil global. Conserver la distinction unité, composant et E2E. Un composant à 0 % de couverture unitaire peut être testé au navigateur : c'est notamment une nuance nécessaire pour le formulaire. Inversement, des mocks verts ne prouvent pas une animation accessible.

**Suivi réalisé le 8 septembre 2026 :** les contrôles existants F01–F11 ont été conservés et complétés par `e2e/runtime-boundaries.spec.ts`. Ce parcours vérifie l'absence d'erreurs `console.error`/`pageerror` sur cinq routes représentatives, le formatage d'une date éditoriale en fuseau `America/Los_Angeles` et la continuité du site lorsque `localStorage` refuse lecture, écriture et suppression. Les tests unitaires de reCAPTCHA, de l'action de contact et du consentement couvrent les pannes externes et les replis en mémoire ; les tests E2E de réduction des mouvements, de CSP après changement de locale et de formulaire restent exécutés avec le navigateur réel. `portfolio-relationships.test.ts` vérifie en plus l'unicité et la forme URL des identifiants canoniques ainsi que le format des dates d'articles. Aucune hausse artificielle de seuil de couverture n'a été ajoutée.

### F22 — Environnement de développement insuffisamment fixé

**Impact : Moyen. Divergence observée. Refactoring pertinent : oui.**

Le dépôt déclare pnpm 10.20.0 et la CI Node 22, mais ne fixe pas clairement Node pour le contributeur. L'environnement local utilisait Node 26 et pnpm global 9.14.1 ; cela a suffi à produire un résultat de tests différent. Les types Node restent sur une autre version majeure, sans que cela ait fait échouer le contrôle courant.

Solution : indiquer la version supportée avec `engines` et un fichier de version compatible avec l'outil retenu, documenter Corepack/pnpm et aligner les types Node à l'occasion d'une correction vérifiée. Ne pas ajouter plusieurs gestionnaires de versions concurrents. Un clone doit donner les mêmes commandes et résultats que la CI.

**Suivi réalisé le 8 septembre 2026 :** `.nvmrc` fixe la cible Node 22 et chaque job CI utilise désormais ce fichier via `actions/setup-node`. `package.json` déclare `node: 22.x` et `pnpm: 10.20.0`, tandis que `@types/node` est aligné sur la majeure 22 et que le lockfile a été régénéré avec pnpm 10.20.0. Le README documente `corepack enable`, `corepack pnpm install` et le démarrage local. L'installation en lockfile gelé, le typecheck, ESLint, le build, les 263 tests Vitest et les 42 E2E ont été rejoués avec Node 22.23.2 et pnpm 10.20.0.

### F23 — Dépendances transitives : avis de sécurité à traiter

**Impact : Important pour le suivi des dépendances ; exploitabilité applicative non démontrée. Refactoring pertinent : mise à jour ciblée.**

L'audit complet remonte 9 avis uniques : 6 élevés et 3 modérés. Le périmètre production ne conserve que 2 avis élevés sur `browserslist` 4.28.6, via la chaîne Next/styled-jsx/Babel. Les autres concernent notamment `fast-uri`, `qs` et `@humanfs/node` dans l'outillage. La sévérité d'un avis de package ne décrit pas automatiquement le risque d'une route exposée.

Solution : actualiser les résolutions concernées, réexaminer les overrides devenus historiques et relancer audit/build/tests. Les avis enregistrés donnent notamment des corrections à partir de browserslist 4.28.7, fast-uri 3.1.6, qs 6.16.0 et @humanfs/node 0.16.8 ; vérifier la compatibilité des chaînes effectives. Une migration majeure de Next n'est pas nécessaire pour commencer.

**Suivi réalisé le 8 septembre 2026 :** les overrides ciblent maintenant `browserslist: ^4.28.7`, `fast-uri: ^3.1.6`, `qs: ^6.16.0` et `@humanfs/node: ^0.16.8`. Le lockfile résout respectivement `browserslist` 4.28.9, `fast-uri` 3.1.7, `qs` 6.16.0 et `@humanfs/node` 0.16.8. `browserslist` apparaît dans la chaîne de production `next > styled-jsx > Babel`, tandis que `fast-uri`, `qs` et `@humanfs/node` restent dans les chaînes d'outillage (`shadcn` et ESLint). Aucune dépendance applicative directe n'a été remplacée et aucune migration majeure de Next n'a été engagée. Après installation complète du lockfile, `pnpm audit --audit-level=moderate` et `pnpm audit --prod` ne signalent plus aucun avis ; le build, les budgets, les 263 tests Vitest et les 42 E2E passent sous Node 22.23.2 et pnpm 10.20.0.

Sources : [avis browserslist, mémoire](https://github.com/advisories/GHSA-c83g-rgw3-j3cx), [avis browserslist, statistiques](https://github.com/advisories/GHSA-73wf-gq98-2v4g), [avis fast-uri](https://github.com/advisories/GHSA-5jgf-p345-68v8), [avis qs](https://github.com/advisories/GHSA-x5fp-wj9c-mxmx), [avis humanfs](https://github.com/advisories/GHSA-p498-v437-472g). Les JSON conservés donnent les autres avis et les chemins exacts au moment de l'audit.

### F24 — Performance : budget incomplet et arbitrage SSR à expliquer

**Impact : Moyen pour la mesure ; aucun ralentissement critique démontré. Refactoring pertinent : instrumenter avant d'optimiser.**

Le budget actuel limite chaque asset JS à 250 Kio et CSS à 150 Kio. Plusieurs fichiers peuvent tous respecter cette règle tout en dépassant ensemble un coût raisonnable. Les mesures suivantes proviennent d'un navigateur local sur build de production, sans limitation réseau, avec réduction des mouvements ; elles ne sont ni Lighthouse ni des Core Web Vitals de production.

| Route | JS reçu, encodé / décodé | Document encodé / décodé | Éléments DOM |
|---|---:|---:|---:|
| `/fr` | 183 / 615 Kio | 57 / 294 Kio | 950 |
| `/fr/articles` | 188 / 629 Kio | 28 / 112 Kio | 364 |
| `/fr/realisations/portfolio-professionnel` | 182 / 614 Kio | 181 / 579 Kio | 1 469 |
| `/fr/competences` | 226 / 731 Kio | 25 / 101 Kio | 322 |

Les deux polices observées représentent environ 56 Kio ; elles sont toutes deux préchargées, malgré un nom de module suggérant du différé. L'interaction charge réellement une partie supplémentaire de l'animation : le lazy loading n'est pas seulement déclaré.

Solution : compléter le budget par quelques routes représentatives et observer le coût réseau/CPU sur un appareil modeste avant tout découpage. La longue réalisation produit beaucoup de HTML et de données sérialisées ; examiner ce volume avant de multiplier les micro-optimisations React. Ne pas réduire les preuves éditoriales utiles sans décision produit.

**Suivi réalisé le 8 septembre 2026 :** `performance-budget.json` fixe des budgets agrégés pour `/fr`, `/fr/articles`, `/fr/realisations/portfolio-professionnel` et `/fr/competences` : transfert JS, document, fontes et nombre d'éléments DOM. `pnpm check:performance` compare ces seuils à la mesure Chromium datée conservée dans `evidence/performance-probes.json` et passe sur les quatre routes. Le fichier décrit explicitement la méthode et la limite de la preuve : il s'agit d'une garde de régression locale, pas d'un score Lighthouse ni d'un SLA de production. La CI exécute ce contrôle après le build.

Le nonce et `headers()` dans le layout rendent les routes localisées dynamiques. C'est un arbitrage de sécurité cohérent et documentable. Ne pas confondre la génération de paramètres avec un site entièrement statique. Le cache React déduplique les lectures dans son contexte de rendu, pas entre toutes les requêtes ; pour six articles, cela n'appelle pas Redis. La [documentation CSP Next.js](https://nextjs.org/docs/app/guides/content-security-policy) explique les contraintes de rendu liées aux nonces.

### F25 — Dégradation lorsque JavaScript est indisponible

**Impact : Moyen selon l'objectif de résilience. Observation confirmée ; correction à cadrer.**

Lors de la sonde sans JavaScript, le contenu principal visible reste « Chargement… Loading… », tandis que des segments et éléments sont masqués. Les limites de streaming et les éléments initialement invisibles rendent donc le contenu dépendant de la bonne exécution des scripts dans ce scénario.

Solution : si la lecture du portfolio doit rester possible en cas de scripts bloqués ou en échec, vérifier ensemble les limites `loading`/Suspense et l'initialisation des animations. Favoriser un contenu serveur visible dont l'animation améliore l'affichage. Ne pas promettre qu'enlever une seule classe règle tous les segments streamés. Ce point n'est pas une obligation de transformer toutes les interactions en application sans JavaScript.

**Suivi réalisé le 8 septembre 2026 :** le `loading.tsx` de `[locale]` a été retiré afin que le fallback de streaming ne remplace pas le contenu principal par « Chargement… Loading… » lorsque JavaScript est désactivé. Les cibles d'animation restent visibles sans script grâce à la règle `html:not(.js) .invisible`; `PageTransition` ajoute `js` uniquement après l'hydratation. Une sonde Playwright sur le build de production, avec `javaScriptEnabled: false`, vérifie désormais le H1, la section À propos, l'absence d'éléments masqués et l'absence de statut de chargement.

### F26 — Documentation et conventions ne décrivent plus exactement le dépôt

**Impact : Moyen. Incohérences confirmées. Refactoring pertinent : mise à jour documentaire ciblée.**

La checklist conserve une ancienne description visuelle et différents décomptes de tests ; les mentions d'audit sans vulnérabilité et de réduction des mouvements complète ne décrivent pas l'état actuel. Certains résultats de performance historiques restent utiles, mais doivent être séparés explicitement des garanties actuelles. Des instructions mentionnent `.env.local.example` alors que le modèle disponible est `.env.example`. Le guide d'ajout de langue minimise les endroits à modifier. Certaines consignes d'animation et de styles ont aussi dérivé par rapport au code.

Solution : une courte fiche d'architecture, trois ou quatre décisions documentées et des recettes de contribution suffisent : ajouter une page, compétence, réalisation, article ou langue ; déclarer leurs relations ; lancer les bons tests ; mettre à jour une référence visuelle avec revue. Expliquer l'arbitrage nonce/SSR, les frontières client/serveur, le catalogue canonique et la confiance dans les en-têtes IP. Dater les mesures et éviter les compteurs manuels dupliqués.

**Suivi réalisé le 8 septembre 2026 :** `docs/architecture.md` documente le nonce/SSR, les frontières serveur/client, la dégradation sans JavaScript, les catalogues canoniques et les deux niveaux de budgets de performance. `docs/contributing.md` donne les recettes vérifiables pour une page, une compétence, une réalisation, un article ou une langue, avec les commandes de validation. `docs/i18n.md` renvoie maintenant à cette recette et énumère les fichiers réellement concernés. Les mesures historiques restent datées ; les totaux courants sont limités aux sections de checklist et aux logs de validation.

### F27 — Entretien de forme et composants trop longs : trier au lieu de réécrire

**Impact : Faible. Entretien partiellement pertinent ; une partie relève du style.**

Certains fichiers dépassent 300–500 lignes ; le catalogue Odoo est encore plus long. Cela vient largement du JSX et du contenu éditorial, pas de fonctions algorithmiques complexes. Le besoin n'est pas de respecter une limite arbitraire de lignes.

Solution utile : extraire une section ayant son propre rôle, isoler les traductions d'À propos et, si l'édition le justifie, répartir le catalogue Odoo par module. Éviter des composants de deux lignes qui obligent à ouvrir dix fichiers pour lire une page. Supprimer le composant `section-heading` sans import ; les composants shadcn non utilisés peuvent être conservés ou retirés selon la politique du dépôt, sans prétendre qu'ils gonflent forcément le bundle exécuté.

**Suivi réalisé le 8 septembre 2026 :** le composant `src/components/landing/section-heading.tsx`, sans import dans le dépôt, a été supprimé. Aucun découpage artificiel du catalogue éditorial n'a été engagé ; les fichiers longs restent justifiés par leur contenu et peuvent être répartis lorsqu'une modification éditoriale le rend utile.

Il n'y a pas de configuration/script Prettier explicite ni de convention de formatage automatisée homogène. Ajouter un formatteur est une amélioration de collaboration, pas une correction fonctionnelle. Le choix des points-virgules ou d'une largeur de ligne est stylistique. Les constantes de délais, quotas ou scores déjà localisées ne méritent pas un fichier global de « magic numbers ».

Les liens d'action serveur et les variantes de boutons clientes entretiennent deux définitions de style proches. Une extraction de la configuration pure des variantes peut devenir utile, à condition d'aligner la règle locale qui réserve actuellement `buttonVariants()` au client. Ne pas utiliser `asChild`, non adapté à la Base UI de ce projet, ni convertir une page serveur entière en client pour partager des classes.

## 4. Dette technique

La dette dominante est **une dette de cohérence et de vérification**, pas une dette d'architecture fondamentale.

| Famille | Dette concrète | Effet à moyen terme |
|---|---|---|
| États et erreurs | Filtres à double état, erreurs réseau qui s'échappent, stockage présumé disponible | Bugs intermittents difficiles à reproduire par le prochain développeur |
| Données éditoriales | Titres dupliqués, relations supposées complètes, traductions dispersées | Une nouvelle réalisation ou langue demande trop de modifications coordonnées |
| Plateforme | Nonce de requête vs document, données de page dans un layout persistant | Comportements différents entre chargement direct et navigation cliente |
| Tests | Script général incomplet, suites serial, mocks aux frontières, références visuelles décalées | Faux sentiment de couverture et validation locale différente de la CI |
| Outillage | Version Node non fixée, overrides accumulés, avis transitifs | Reproductibilité et mises à jour plus coûteuses |
| Documentation | Décomptes et garanties devenus inexacts | Difficulté à défendre les décisions en soutenance et à intégrer un contributeur |

### Facilité d'évolution, cas par cas

| Modification | Évaluation actuelle | Amélioration minimale |
|---|---|---|
| Ajouter une page | Plutôt facile : App Router et helpers identifiables | Recette locale/métadonnées/navigation/sitemap/tests |
| Ajouter une compétence | Assez facile dans le catalogue, moins sûr pour tous les libellés et liens | Résolution canonique des titres et test des références |
| Ajouter une réalisation | Correct pour le contenu, fragile sans expérience liée | Invariant obligatoire explicite ou relation optionnelle assumée |
| Ajouter un article | Simple mais répétitif : route MDX, métadonnées, dictionnaires | Validation de présence, extraction MDX cohérente et composant partagé hors layout réservé |
| Maintenir FR/EN | Faisable, mais textes répartis entre plusieurs conventions | Types de locale uniques et règle claire de placement des traductions |
| Ajouter une troisième langue | Plus coûteux que ne le laisse penser le guide | Éliminer hypothèses binaires et inventorier réellement les contenus à traduire |

### Refactorings à ne pas entreprendre maintenant

Pas de Redux/Zustand pour ces états locaux ; pas de CMS pour résoudre quelques tables dupliquées ; pas d'architecture de services ou repositories pour des fichiers éditoriaux ; pas de `memo` systématique ; pas de conversion générale vers des composants clients ; pas de migration de toutes les animations vers un seul moteur sans défaut mesuré ; pas de recherche de 100 % de couverture sur les fichiers générés ou les données ; pas de réécriture dynamique des six routes MDX uniquement pour économiser quelques lignes.

### Limites de l'analyse de sécurité

Aucun test d'intrusion de production, audit juridique, contrôle exhaustif de l'historique Git ou envoi Resend réel n'a été effectué. Le timestamp client est une heuristique anti-spam, pas une preuve de confiance. La confiance accordée au premier `x-forwarded-for` dépend du reverse proxy et doit être documentée pour l'auto-hébergement ; aucun contournement sur le déploiement réel n'a été démontré. La désactivation de reCAPTCHA en l'absence de configuration est une décision existante à expliquer, pas une faille prouvée par sa seule présence.

Les variables nécessaires au routage des emails doivent être validées explicitement dans la procédure de déploiement : un destinataire de repli destiné au sandbox ne devrait pas masquer une configuration de production incomplète. Cela mérite une vérification de configuration, sans exposer de secrets dans les logs ni envoyer un message réel pendant un simple audit.

Les liens externes inspectés n'ont pas révélé de problème systémique justifiant un constat supplémentaire ; les protections de navigation externe doivent rester appliquées dans le composant commun. Les contenus MDX sont du contenu de confiance maintenu dans le dépôt : les traiter comme du MDX arbitraire envoyé par un visiteur serait un autre modèle de risque.

## 5. Priorités de correction

Les tailles ci-dessous expriment une portée relative, pas une promesse horaire : **S** = correction localisée et test ; **M** = plusieurs fichiers ou parcours ; **L** = changement structurel nécessitant un arbitrage. Aucun chantier L n'est requis pour obtenir un progrès significatif.

| Ordre | Action | Constats | Taille | Critère de sortie |
|---|---|---|---|---|
| 1 | Rétablir une validation fiable | F19, F20, F22 | S–M | Version documentée, lint vert, script complet, scénarios indépendants, captures revues |
| 2 | Corriger les comportements déterministes | F01, F02, F10 | M | Historique et langues conservent le contexte ; dates identiques entre fuseaux |
| 3 | Contenir les pannes attendues | F03, F04, F05 | M | Timeout/stockage bloqué/retry n'entraînent pas une erreur globale |
| 4 | Corriger les interactions accessibles et la CSP | F06–F09, F11 | M | Clavier, noms, langue, mouvement réduit et séquence locale/thème vérifiés |
| 5 | Actualiser les dépendances concernées | F23 | S–M | Audit expliqué et corrigé, build/tests conservés |
| 6 | Sécuriser les sources de contenu | F13–F18 | M | Titres canoniques, relations contrôlées, absence MDX diagnostiquée, recherche propre |
| 7 | Corriger le contexte SEO et la documentation | F12, F26 | S–M | JSON-LD après navigation correct ; guide conforme aux commandes et décisions réelles |
| 8 | Mesurer puis traiter le coût des pages | F24, F25 | M | Budget par route et décision explicite de dégradation sans scripts |
| 9 | Nettoyer la forme utile | F27 | S | Code mort évident retiré, formatage convenu, aucune fragmentation artificielle |

Avant soutenance, je viserais au minimum les cinq premières lignes et une documentation honnête des limites restantes. Ne pas présenter « build vert » comme synonyme de « projet validé ». Conserver de petits changements vérifiables : une famille de défauts, ses tests pertinents, puis la suivante.

Une validation finale crédible comprendrait typecheck, lint, unité, navigateur, E2E sans scénario masqué, audit des dépendances expliqué, build et quelques séquences navigateur ciblées. Un simple renouvellement des snapshots et un seuil de couverture élevé ne suffiraient pas.

## 6. Note de qualité : 74 / 100

Le code est globalement propre, structuré et réellement testé. Les validations, la sécurité et les utilitaires communs montrent une intention professionnelle. La note baisse à cause des erreurs opérationnelles non contenues, des défauts reproduits dans les interactions et des contrôles de livraison actuellement en échec. Ce n'est pas un code fragile de bout en bout ; ce n'est pas non plus un état prêt à être présenté comme irréprochable.

## 7. Note d'architecture : 80 / 100

L'architecture correspond à la taille du produit. App Router, composants serveur, catalogues typés et composition sont de bons choix. Aucun cycle d'import statique ni dépendance globale incontrôlée n'a été trouvé. Les retraits portent sur la donnée de page placée dans un layout persistant, le layout MDX utilisé comme bibliothèque et la duplication des sources éditoriales. Ces points se corrigent sans changement de paradigme.

## 8. Note de maintenabilité : 71 / 100

Un développeur peut comprendre rapidement les routes et les composants, mais doit découvrir plusieurs conventions implicites pour modifier le contenu ou les langues sans régression. Les titres dupliqués, les assertions sur les relations, les configurations de tests concurrentes et les documents partiellement périmés augmentent le coût de modification. Le potentiel d'amélioration est élevé avec peu d'abstractions nouvelles.

## 9. Note TypeScript : 84 / 100

Mode strict, absence de `any` explicite dans la production et contrats de données constituent de bons signaux. Les points à renforcer sont les identifiants, la locale, les types de recherche dupliqués et les assertions prétendant qu'une collection est complète ou non vide. Des unions discriminées seraient utiles aux frontières d'erreur ; elles ne sont pas nécessaires pour chaque objet de props.

## 10. Note React / Next.js : 76 / 100

Bonne répartition serveur/client, composition claire, chargements différés et APIs actuelles. La note est limitée par les défauts de synchronisation URL/état, le formatage non déterministe des dates, le contexte de page dans un layout persistant et le cycle de vie du nonce. L'accessibilité des interactions personnalisées doit progresser. Aucune mémorisation généralisée n'est recommandée.

## 11. Note de préparation pour un jury professionnel : 72 / 100

Le projet fournit une matière technique convaincante, mais les garanties actuelles doivent être consolidées. Un jury exigeant pourrait demander de lancer lint/tests, de justifier le rendu dynamique, de simuler une panne réseau ou d'ajouter une réalisation sans expérience liée. L'état audité expose alors plusieurs écarts entre intention et comportement.

Cette note évalue la défendabilité technique du dépôt aujourd'hui, pas le niveau global de la personne ni l'obtention d'une certification. Corriger les défauts prioritaires et présenter les arbitrages avec leurs preuves serait plus convaincant qu'ajouter une nouvelle fonctionnalité visible.

### Avis honnête d'un développeur senior recruteur

**Je poursuivrais l'entretien.** Le dépôt montre davantage qu'une capacité à assembler une interface : il y a une réflexion sur le serveur et le client, les validations, l'anti-spam, les traductions, les relations de contenu et les tests. C'est un signal positif pour un profil junior avancé ou en progression vers davantage d'autonomie.

Je ne conclurais toutefois pas à une maîtrise de niveau senior sur la seule complexité de la stack ou le nombre de tests. J'attendrais que le candidat explique où sont les sources de vérité, pourquoi certaines protections ont un coût de rendu, comment il traite une dépendance indisponible et ce que ses tests ne prouvent pas. La capacité à identifier ces limites, puis à les corriger simplement, pèserait beaucoup dans ma décision.

Questions probables en soutenance :

1. Quelle est la source de vérité d'un filtre, et que se passe-t-il lors d'un retour arrière ?
2. Pourquoi toutes les pages localisées sont-elles rendues dynamiquement ? Quel lien avec le nonce CSP ?
3. Qu'arrive-t-il si reCAPTCHA ou Redis ne répond pas, ou si le navigateur refuse le stockage ?
4. Comment ajouter une réalisation sans casser les liens d'expérience et les titres de l'accueil ?
5. Que lancent exactement `pnpm test` et la CI ? Que prouve le pourcentage de couverture ?
6. Pourquoi le JSON-LD propre à une page ne doit-il pas dépendre seulement d'un layout persistant ?
7. Quels avis de sécurité affectent des chemins réellement utilisés à l'exécution ?
8. Pourquoi choisir de ne pas ajouter davantage d'abstractions ou de mémorisation ?

Les réponses les plus convaincantes seraient appuyées sur un exemple du dépôt et un test, avec une limite reconnue. Affirmer « tout est sécurisé », « tout est accessible » ou « les tests couvrent tout » serait moins professionnel que défendre précisément le périmètre vérifié.

### Traçabilité des preuves

Les fichiers suivants sont conservés sous `reports/code-quality-audit-2026-09-08/evidence/` :

- `lint.log`, `typecheck.log`, `coverage.log`, `browser-tests.log`, `build.log`, `bundle.log` : validations principales.
- `e2e.log`, `e2e-skipped.log`, `e2e-dark.log`, `e2e-portrait.log` : campagne initiale et reprises ; les résultats doivent être dédupliqués par scénario, pas additionnés aveuglément.
- `default-test-list.json` : collecte réelle de la commande Vitest par défaut.
- `robustness.log` et `audit-robustness.test.tsx.txt` : six tests temporaires qui caractérisent des défauts ; ils ne font pas partie de la suite du produit.
- `browser-probes.json` : filtres, langue, formulaire, clavier, consentement, fuseau, réduction des mouvements et sonde sans-JavaScript ciblée.
- `navigation-probes.json` : état du nonce, violations CSP et JSON-LD entre navigations.
- `csp-probes.json` : contrôle spécifique de GTM consent-gated avec données factices.
- `performance-probes.json`, `interaction-performance.json` : mesures locales, sans prétention de score de production.
- `performance-budget.json` : seuils agrégés des quatre routes représentatives, contrôlés par `pnpm check:performance`.
- `security-audit.json`, `security-prod.json` : avis et chemins transitifs, datés de l'audit initial.
- `security-audit-f23-after.json`, `security-prod-f23-after.json` : résultats après mise à jour des overrides F23, sans avis modéré ou supérieur.
- `stricter-types.log` : contrôle exploratoire avec options plus strictes ; distinct du typecheck contractuel, qui passe.
- `source-metrics-summary.json`, `test-inventory.json` : inventaires auxiliaires.

Les conclusions initiales portent sur l'état capturé ; les suivis cités plus haut portent sur l'état corrigé localement. Les données réseau publiques et avis de sécurité peuvent évoluer. Les références visuelles n'ont pas été acceptées automatiquement, et aucun déploiement, commit ou push n'a été réalisé dans cette mission d'audit.
