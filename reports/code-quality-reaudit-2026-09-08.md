# Réanalyse complète du portfolio — 8 septembre 2026

## Résultat

**Le projet a nettement progressé, mais le bilan « tout est corrigé » était trop large.** Le build, le typage, le lint et les suites existantes passent. L'audit des dépendances ne remonte plus d'avis. Les défauts restants concernent surtout les transitions d'état, le fonctionnement dégradé et la validité des contrôles de livraison.

Cette nouvelle analyse relève **10 constats**, dont deux prioritaires : le retrait du consentement peut être perdu lorsque l'écriture du stockage échoue, et le formulaire sans JavaScript place les données saisies dans l'URL. Une course de navigation subsiste dans les filtres. La configuration de couverture et le budget agrégé de performance ne contrôlent pas ce qu'ils prétendent contrôler.

L'architecture reste adaptée à un portfolio riche : aucune réécriture générale, migration de framework ou couche d'abstraction supplémentaire n'est justifiée par ces résultats. Le travail utile consiste à corriger les contrats observables et à rendre les vérifications fiables.

## Périmètre et méthode

État évalué : répertoire de travail local, incluant les corrections précédentes, sur base Git `ceebfb5b167a7205a6b1568d6618d88a3deeb0ec`. Ce n'est ni une analyse du seul commit, ni une validation du site déployé. L'ancien rapport reste historique ; les résultats ci-dessous font foi pour cette nouvelle photographie.

Relecture du routage Next.js, des frontières serveur/client, des données et liens éditoriaux, des composants interactifs, du formulaire, du consentement, de la CSP, de la recherche MDX, des configurations, de la CI et des guides. Exécution des vérifications statiques et des tests, puis sondes ciblées dans Chromium sur un build de production isolé. Les scénarios supplémentaires reproduisent des défauts ; leurs réussites ne doivent pas être confondues avec des tests attestant leur correction.

Environnement : Node **22.23.2**, pnpm **10.20.0**, Next.js **16.2.11**, React **19.2.7**, Vitest **4.1.10**, macOS. Le build et les E2E ont été exécutés dans `/tmp/portfolio-reaudit-20260908`, servi sur le port 3318. Aucun `.env` réel n'a été copié. Les identifiants nécessaires étaient factices ; GTM était intercepté par un script inerte pour observer son chargement. Aucun email réel n'a été envoyé. Le serveur `next-devtools` n'était pas disponible dans les outils de cette session ; le build, Playwright, les logs et l'inspection des sources ont servi à vérifier l'application.

Une comparaison SHA-256 finale de **241 fichiers** présents dans le dépôt et dans la copie initiale n'a trouvé aucune différence : [empreintes et périmètre comparé](code-quality-reaudit-2026-09-08/evidence/source-snapshot.json). Cette réanalyse ajoute un rapport et des preuves, sans correction des sources applicatives. Les modifications préexistantes sont conservées.

## Vérifications exécutées

| Vérification | Résultat | Portée réelle |
|---|---|---|
| Installation gelée dans la copie | Réussie | Cohérence du lockfile et de l'environnement local |
| ESLint | Réussi | Aucun diagnostic bloquant |
| TypeScript | Réussi | Configuration actuelle ; le fichier Vitest `.mts` est exclu du périmètre TypeScript |
| Tests unitaires avec couverture | **240/240**, 44 fichiers | Logique et composants jsdom |
| Tests de composants navigateur | **23/23**, 4 fichiers | Soit **263 tests Vitest** au total, exécutés ici en deux commandes |
| E2E existants | **43/43** | Build de production local, Chromium et baselines macOS |
| Build de production | Réussi | Compilation et génération conformes dans la copie isolée |
| Budget par asset | Réussi | JS ≤ 250 KiB et CSS ≤ 150 KiB par fichier ; ne mesure pas une route entière |
| Audit des dépendances | **0 avis**, toutes sévérités | Photographie du registre au moment de la commande ; ne couvre pas les erreurs applicatives |
| Axe | 23 états, 9 routes, desktop/mobile | Violations localisées détaillées ci-dessous ; pas de certification d'accessibilité |
| Console et débordement horizontal | Aucun relevé dans ces 23 états | Ne couvre pas tous les composants, appareils et transitions |
| Sondes sans JavaScript | 7 routes | Accueil lisible ; liste d'articles vide et formulaire problématique |
| Reproductions supplémentaires | Consentement, filtres, formulaire, MDX, contrôles qualité | Preuves des défauts décrits ci-dessous |

Les E2E comprennent le contrôle structurel des URL du sitemap, des liens internes, des métadonnées, des layouts d'articles, des changements de langue, du nonce, des dates et de plusieurs interactions clavier. Leur réussite ne signifie pas que chaque variante de comportement est couverte.

Preuves : [qualité, tests et dépendances](code-quality-reaudit-2026-09-08/evidence/quality.log), [build](code-quality-reaudit-2026-09-08/evidence/build.log), [E2E](code-quality-reaudit-2026-09-08/evidence/e2e.log), [résultats E2E détaillés](code-quality-reaudit-2026-09-08/evidence/e2e.json).

## Constats prioritaires

Les niveaux indiquent l'ordre de correction proposé : **P1** = traiter avant de considérer la livraison fiable ; **P2** = correction fonctionnelle ou de validation importante ; **P3** = entretien ou robustesse d'évolution. Aucun défaut critique de compromission n'a été démontré.

### R01 — P1 : un retrait de consentement peut réactiver les analytics

Source : [cookie-consent.ts:94](/Users/orhan/Developer/projects/portfolio/src/lib/cookie-consent.ts:94), fonctions `getStoredConsent` et `setStoredConsent`.

`setStoredConsent` conserve une nouvelle décision en mémoire si `localStorage.setItem` échoue. Mais `getStoredConsent` relit une ancienne décision valide et remplace ce choix en mémoire, même si `persistenceWriteFailed` vaut `true`. Le rechargement prévu lors du retrait retrouve aussi l'ancienne acceptation persistée.

Reproduction réelle : accepter les analytics, faire échouer les écritures du stockage avec `QuotaExceededError` tout en laissant les lectures possibles, rouvrir les préférences puis refuser. Après rechargement, la valeur stockée reste `analytics: true` et le script GTM factice est chargé de nouveau. Une caractérisation unitaire démontre également la priorité erronée donnée à l'ancienne valeur.

**Correction proposée :** donner priorité à la décision explicite de session après un échec de persistance, invalider l'ancienne acceptation lorsque cela est possible et définir un retrait sûr avant tout rechargement. Ne pas se contenter d'un `catch` qui préserve une ancienne autorisation. Tester le cas « lecture possible, écriture impossible, acceptation ancienne présente », puis le rechargement.

Preuves : [sonde consentement](code-quality-reaudit-2026-09-08/evidence/browser-probes.json), [caractérisations](code-quality-reaudit-2026-09-08/evidence/regressions.test.ts.txt). L'échec d'écriture est un comportement documenté de [Storage.setItem](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem). Il s'agit ici d'un défaut technique du choix utilisateur ; cet audit ne constitue pas une analyse juridique.

### R02 — P1 : le formulaire sans JavaScript met le message et l'email dans l'URL

Source : [contact-form.tsx:149](/Users/orhan/Developer/projects/portfolio/src/components/contact-form.tsx:149).

Le `<form>` déclare seulement `onSubmit`, sans `action` ni `method`. Sans hydratation, le navigateur effectue donc une soumission GET native vers la page courante. Le bouton reste utilisable et `noValidate` est présent.

Reproduction avec données synthétiques : la soumission ouvre `/fr/contact?honeypot=&name=Audit+Fictif&email=audit%40example.invalid&message=Message+synthetique+audit+uniquement`. L'action serveur d'envoi n'est pas appelée. Les données figurent dans l'URL, donc dans l'historique et dans la requête reçue ; leur conservation effective dans des journaux de production n'a pas été inspectée.

**Correction proposée :** empêcher la soumission tant que le formulaire n'est pas hydraté et exposer clairement le contact par email, ou implémenter une véritable soumission POST progressive avec le traitement et l'anti-spam correspondants. Ajouter uniquement `method="post"` ne suffit pas à garantir un parcours fonctionnel. Vérifier aussi une hydratation retardée ou interrompue.

Preuve : [requête capturée](code-quality-reaudit-2026-09-08/evidence/browser-probes.json), entrée `noJSForm`. Le comportement GET par défaut est documenté pour [l'élément form](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form).

### R03 — P2 : effacer rapidement une recherche laisse une ancienne URL

Source : [articles-filterable-list.tsx:67](/Users/orhan/Developer/projects/portfolio/src/components/articles-filterable-list.tsx:67), notamment le retour anticipé `nextSearch === currentSearch` et le suivi des navigations en attente.

Reproduction : ouvrir `/fr/articles`, ralentir de 600 ms les requêtes de navigation de cette page, saisir `odoo` puis effacer immédiatement. Après stabilisation, le champ est vide et les six articles s'affichent, mais l'URL contient `?q=odoo`. Le résultat a été reproduit **3 fois sur 3**. Un rechargement ou le partage de cette URL ne représente donc pas l'état visible.

La correction précédente traite des navigations externes, mais pas le retour à l'URL courante pendant qu'une ancienne modification reste en vol. La comparaison avec la seule URL courante ne suffit pas à annuler une intention précédente.

**Correction proposée :** suivre la dernière intention de filtre et garantir sa convergence avec l'URL après les navigations en cours, ou employer un mécanisme de synchronisation adapté à un filtrage local. Conserver arrière/avant et les paramètres non concernés. Ajouter un test navigateur avec navigation retardée, effacement et assertion conjointe URL/champ/résultats.

Preuves : [trois reproductions](code-quality-reaudit-2026-09-08/evidence/filter-race.json), [script](code-quality-reaudit-2026-09-08/evidence/reaudit-filters.mjs).

### R04 — P2 : les seuils et le périmètre de couverture sont ignorés

Source : [vitest.config.mts:33](/Users/orhan/Developer/projects/portfolio/vitest.config.mts:33).

La configuration `coverage` est placée dans `test.projects[0].test`. Vitest 4 traite la couverture comme une option globale. L'inspection de sa configuration effectivement résolue montre l'absence des `include` et `thresholds` attendus à la racine, ainsi que les exclusions par défaut. Des mocks et des composants UI pourtant explicitement exclus apparaissent dans le rapport.

Les chiffres obtenus — instructions **86,64 %**, branches **76,60 %**, fonctions **86,47 %**, lignes **88,85 %** — sont réels pour les fichiers instrumentés. Ils ne valident toutefois ni le périmètre voulu, ni les seuils déclarés de 65/60/65/65. La CI peut rester verte sans appliquer cette politique.

**Correction proposée :** déplacer la couverture dans le `test` racine, vérifier le périmètre recalculé et vérifier qu'un seuil volontairement impossible échoue réellement. Inclure les configurations dans une vérification de type appropriée. Ne pas préserver artificiellement l'ancien pourcentage si son dénominateur change.

Preuves : [configuration résolue](code-quality-reaudit-2026-09-08/evidence/resolved-coverage.json), [script d'inspection](code-quality-reaudit-2026-09-08/evidence/resolve-coverage.mjs), [rapport de couverture](code-quality-reaudit-2026-09-08/evidence/quality.log). Référence : [configuration globale des projets Vitest](https://vitest.dev/guide/projects).

### R05 — P2 : le budget de performance agrégé relit toujours une ancienne mesure

Source : [check-performance-budget.mjs:4](/Users/orhan/Developer/projects/portfolio/scripts/check-performance-budget.mjs:4), et son appel après le build dans la CI.

Le script lit un chemin fixe vers `reports/code-quality-audit-2026-09-08/evidence/performance-probes.json`. Il ne mesure pas le build courant et ne vérifie aucun identifiant de build ou empreinte de source. Ajouter du JavaScript aux routes ne change donc pas les chiffres contrôlés.

Reproduction : le script réussit dans un dossier minimal contenant uniquement ce script, le budget et l'ancienne preuve, sans source ni `.next`. Le contrôle par asset est bien exécuté sur les fichiers construits, mais ce second contrôle ne protège pas l'agrégat de route contre une nouvelle régression.

**Correction proposée :** produire les mesures depuis le build testé avant la comparaison ; enregistrer l'identité du build, le protocole et les routes ; rejeter les données manquantes, périmées ou non numériques. Si les mesures restent manuelles, présenter cette commande comme une comparaison de photographie historique, sans prétendre à une protection CI contre une régression courante.

Preuve : [réussite sans build](code-quality-reaudit-2026-09-08/evidence/budget-no-build.log). Les nouvelles mesures de cet audit sont conservées séparément et ne remplacent pas silencieusement l'ancien fichier.

### R06 — P2 : la liste des articles disparaît sans JavaScript

Source : [articles/page.tsx:51](/Users/orhan/Developer/projects/portfolio/src/app/[locale]/articles/page.tsx:51).

Sur le build de production avec JavaScript désactivé, `/fr/articles` affiche le titre et le sous-titre, mais **zéro lien vers un article** dans `<main>`. Le composant de filtrage se trouve dans une frontière Suspense sans contenu de repli utile. Le résultat visible est établi ; il ne faut pas généraliser à toutes les utilisations de Suspense ou `useSearchParams`.

Les pages d'articles directes et l'accueil restent lisibles dans les sondes effectuées. Le test sans JavaScript existant ne porte que sur l'accueil et ne protège pas cette liste.

**Correction proposée :** rendre une liste initiale utilisable côté serveur puis enrichir les filtres, en vérifiant aussi les URL filtrées. La recherche interactive peut nécessiter JavaScript ; l'accès aux articles ne devrait pas en dépendre.

Preuves : [sept routes sans JavaScript](code-quality-reaudit-2026-09-08/evidence/browser-probes.json), [comptage explicite des liens](code-quality-reaudit-2026-09-08/evidence/followup.json).

### R07 — P2 : certains petits textes n'atteignent pas le contraste attendu en thème clair

Sources : liens technologiques du parcours sur l'accueil ; [article-enhancements.tsx:125](/Users/orhan/Developer/projects/portfolio/src/components/article-enhancements.tsx:125), opacité des sous-titres du sommaire.

Axe relève **4,36:1** pour les liens d'expérience tels que « Odoo 16+ » sur l'accueil, et **4,35:1** pour des sous-entrées du sommaire de l'article Docker, alors que ces textes de 12 px requièrent 4,5:1 dans la règle contrôlée. Ces résultats ont été revérifiés après défilement des éléments dans la fenêtre. Les mêmes cibles ne présentent pas ces violations dans le contrôle sombre complémentaire.

**Correction proposée :** ajuster la couleur composée ou supprimer l'atténuation concernée, puis mesurer le contraste réel sur chaque fond. Éviter de conclure à partir de la couleur nominale si une opacité intervient.

Preuves : [audit de 23 états](code-quality-reaudit-2026-09-08/evidence/accessibility.json), [vérifications ciblées clair/sombre](code-quality-reaudit-2026-09-08/evidence/followup.json).

### R08 — P2 : les blocs de code défilants n'exposent pas de focus explicite

Source : [article-code-block.tsx:78](/Users/orhan/Developer/projects/portfolio/src/components/article-code-block.tsx:78).

Dans l'article Docker à 390 px, plusieurs `<pre>` dépassent horizontalement leur zone : un exemple mesure 460 px de contenu pour 356 px disponibles. Ils ont `tabIndex: -1` et aucun descendant focusable. Le bouton de copie est un frère du `<pre>` ; il n'apporte pas de cible clavier à la zone défilante. Axe relève `scrollable-region-focusable` en clair et en sombre, y compris après défilement.

**Correction proposée :** prévoir une zone défilante focusable, avec indicateur de focus et libellé adapté si nécessaire, puis vérifier le défilement au clavier et avec les navigateurs ciblés. Certains navigateurs peuvent rendre automatiquement des conteneurs défilants accessibles : le contrôle automatique ne remplace pas cette validation inter-navigateurs.

Preuves : [mesures des blocs](code-quality-reaudit-2026-09-08/evidence/followup.json), [audit axe](code-quality-reaudit-2026-09-08/evidence/accessibility.json).

### R09 — P3 : le parseur MDX reste fragile pour de nouveaux contenus

Source : [article-headings.ts:14](/Users/orhan/Developer/projects/portfolio/src/lib/article-headings.ts:14), `stripMdxEsm` et `createHeadingIdResolver`.

Deux cas caractérisés : une instruction `import` sans point-virgule peut absorber le texte suivant lors du nettoyage ; les titres successifs `Titre`, `Titre`, `Titre 2` produisent les identifiants `titre`, `titre-2`, `titre-2`. Le compteur est tenu par base de titre sans réservation globale des identifiants déjà produits.

**Aucun de ces deux cas n'est présenté comme une panne actuelle des six articles publiés.** Les contrôles des routes et ancres existantes passent. Le risque porte sur l'ajout de contenus MDX pourtant valides ou sur une nouvelle combinaison de titres.

**Correction proposée :** garantir l'unicité sur l'ensemble des identifiants et traiter la syntaxe MDX avec un parseur adapté si sa variété augmente. À défaut, imposer et valider explicitement un sous-ensemble éditorial pris en charge. Ajouter les deux cas comme tests de non-régression après correction.

Preuves : [caractérisations exécutées](code-quality-reaudit-2026-09-08/evidence/regressions.test.ts.txt), [résultats](code-quality-reaudit-2026-09-08/evidence/regressions.log).

### R10 — P3 : la documentation contient encore des promesses et procédures périmées

Sources : [PORTFOLIO_CHECKLIST.md](/Users/orhan/Developer/projects/portfolio/PORTFOLIO_CHECKLIST.md), [docs/contributing.md:16](/Users/orhan/Developer/projects/portfolio/docs/contributing.md:16), [docs/architecture.md:24](/Users/orhan/Developer/projects/portfolio/docs/architecture.md:24), README et MANUAL_CONFIGURATION.

La checklist décrit encore une identité « Japan Pop » avec vermillon, Fuji et sakura alors que l'interface actuelle et les tests visuels imposent une composition neutre. Le guide d'ajout d'article n'explique pas le petit layout par article qui appelle `ArticlePageLayout`. Le document d'architecture attribue à la mesure historique de performance une détection des nouvelles régressions. Le nom du fichier d'exemple d'environnement et la discussion des iframes vidéo dans le README méritent également d'être réalignés.

**Correction proposée :** vérifier chaque procédure contre un exemple actuel, documenter le layout d'article et la réelle portée des vérifications. Préciser aussi la frontière de confiance du proxy pour `x-forwarded-for` lors d'un hébergement hors Vercel. Ce dernier point est une condition d'exploitation à documenter, pas un contournement démontré en production.

## Architecture, qualité du code et maintenabilité

### Ce qui fonctionne bien

Le routage par locale, le contexte localisé partagé, les dictionnaires et les utilitaires de métadonnées rendent les pages plus cohérentes. Les composants de route assemblent des données typées et des sections ; les composants clients correspondent généralement à une interaction ou à une animation. La centralisation GSAP et l'utilisation de `server-only` aux frontières pertinentes sont des conventions utiles.

L'extraction du rendu d'email et du layout éditorial partagé réduit les responsabilités des actions et des routes. La lecture MDX est asynchrone, les slugs sont validés et les fichiers absents remontent une erreur explicite. Les tests de relations éditoriales et des layouts protègent des invariants métier plus utiles qu'une simple couverture de lignes.

Les améliorations de navigation clavier, de gestion des erreurs de formulaire, de mouvement réduit, de langue des articles et de renouvellement du document lors d'un changement de locale sont soutenues par les suites réussies. Le JSON-LD de page est vérifié après navigation cliente. Les liens entre expériences, compétences, réalisations et preuves constituent un atout du produit.

### Refactoring proportionné

Les modules de données longs ne nécessitent pas automatiquement une fragmentation : leur longueur reflète aussi la richesse éditoriale. De même, un composant client ou un calcul non mémorisé n'est pas en soi une faute de performance. Les abstractions prioritaires sont celles qui simplifient les états du consentement et des filtres, ou rendent les contrôles mesurables.

L'i18n reste une convention à maintenir : ajouter une langue exige les métadonnées, les catalogues, le routage et les tests, pas seulement un nouveau JSON. Les procédures doivent conserver cette vision complète. L'ajout d'un CMS ou d'un gestionnaire d'état global ne résoudrait aucun des défauts prioritaires reproduits.

## Sécurité et intégrations

L'action de contact valide les données côté serveur, applique le honeypot et la temporisation, vérifie reCAPTCHA lorsqu'il est configuré, utilise un quota Redis atomique en production et traduit les indisponibilités connues en résultat utilisateur. Les chaînes d'email sont échappées et le sujet est nettoyé. La limitation échoue de manière restrictive en production si le stockage requis manque.

La CSP avec nonce demeure une protection utile. Le rendu dynamique associé est désormais documenté et les scénarios de changement de langue passent. Ce compromis est cohérent avec les contraintes décrites par [Next.js pour les nonces CSP](https://nextjs.org/docs/app/guides/content-security-policy) ; le compteur de pages générées pendant le build ne permet pas de promettre un site entièrement statique.

L'action prend la première valeur de `x-forwarded-for`. La [documentation des en-têtes Vercel](https://vercel.com/docs/headers/request-headers) décrit la réécriture de cet en-tête par la plateforme. Pour un autre déploiement, le proxy de confiance doit être explicitement défini et empêcher les valeurs arbitraires fournies par le client. Aucun exploit de cette hypothèse n'a été démontré sur le site déployé.

Le bilan dépendances est désormais vert, mais il ne neutralise pas R01 et R02. Les sondes n'ont pas validé une livraison réelle Resend, des clés reCAPTCHA de production, le comportement d'un conteneur GTM réel, ni Redis déployé. Les protections ont été examinées et testées localement ; les intégrations externes restent à valider dans leur environnement.

## Performance : nouvelles mesures indépendantes

Chromium, fenêtre mobile 390 × 844, DPR 1, contexte neuf par route, consentement analytics refusé, mouvement réduit, sans interaction. Deux profils : local sans limitation, puis CPU ralenti ×4 avec latence de 150 ms, téléchargement 1,6 Mbit/s et envoi 0,75 Mbit/s. Une seule mesure par route et profil : les chiffres ne sont ni Lighthouse, ni un percentile terrain, ni un engagement de service.

| Route | JavaScript transféré | Document transféré, profil local | LCP local | LCP contraint | Tâches longues contraintes |
|---|---:|---:|---:|---:|---:|
| `/fr` | 211 163 octets | 58 671 octets | 72 ms | 1 080 ms | 2 |
| `/fr/articles` | 214 424 octets | 27 618 octets | 52 ms | 1 020 ms | 3 |
| `/fr/realisations/portfolio-professionnel` | 210 834 octets | 185 415 octets | 68 ms | 1 080 ms | 2 |
| `/fr/competences` | 255 649 octets | 26 658 octets | 44 ms | 960 ms | 2 |

Les octets JavaScript agrègent les scripts chargés dans la fenêtre de mesure, pas seulement le fichier le plus lourd. Le LCP très bas en local reflète notamment le contenu initial et ce protocole ; il ne permet pas de déduire la vitesse ressentie de toutes les interactions.

La route compétences ne dispose que de **351 octets de marge** sous son budget JavaScript actuel de 256 000 octets, pour cette photographie. La réalisation longue conserve un document plus volumineux. Cela justifie de mesurer les effets de futures modifications avant d'alléger le contenu éditorial ou de déplacer davantage de rendu au navigateur. Les profils avec animations normales, autres routes et scripts consentis peuvent charger davantage de ressources.

Preuves : [mesures détaillées](code-quality-reaudit-2026-09-08/evidence/performance.json), [synthèse](code-quality-reaudit-2026-09-08/evidence/performance.log), [protocole exécutable](code-quality-reaudit-2026-09-08/evidence/reaudit-performance.mjs).

## Accessibilité, interface et limites des sondes

Les 23 états couvrent neuf routes en clair sur desktop 1280 × 900 et mobile 390 × 844, puis formulaire invalide, préférences de cookies et menu mobile. Les erreurs de formulaire et le dialogue de consentement ne produisent pas de violation axe dans ces états. Les contrôles ciblés supplémentaires comparent les cibles problématiques en clair et en sombre après défilement.

L'accueil observé présente une hiérarchie lisible, un portrait, une proposition de valeur et des accès directs aux réalisations et au contact : [capture sans dialogue](code-quality-reaudit-2026-09-08/evidence/homepage-without-dialog.png). Ce jugement visuel ne remplace pas les mesures de contraste.

Axe signale aussi des cibles tactiles partiellement masquées sur l'accueil mobile. Un signal disparaît après défilement ; celui du lien « VPS » persiste malgré une boîte CSS de 24 px de haut. Ces résultats sont conservés comme **point à confirmer par inspection du hit testing et des recouvrements**, sans compter chaque signal comme un défaut acquis. Les constats R07 et R08 disposent d'une vérification ciblée plus solide.

Un menu desktop ouvert au survol se ferme au premier clic puis se rouvre au second. Ce comportement observé peut relever d'une convention d'interaction à harmoniser ; il n'est pas classé ici comme une panne démontrée.

Pas de test sur téléphone physique, de session VoiceOver/NVDA, de matrice Safari/Firefox complète, ni d'audit exhaustif de tous les contrastes en sombre. Les comparaisons visuelles Linux de la CI n'ont pas été exécutées dans cette réanalyse macOS. Les exclusions conditionnelles de tests visuels en CI doivent rester visibles dans les promesses de couverture.

## Réévaluation des anciens constats F01–F27

« Validé sur le périmètre actuel » signifie que la modification et ses tests ont été revus et que les suites correspondantes passent ; cela ne promet pas l'absence de toute variante future. Les lignes partielles ne doivent pas être présentées comme closes.

| Ancien constat | État de cette réanalyse |
|---|---|
| F01 — Filtres et URL | **Partiel** : navigation courante améliorée, course reproduite en R03 |
| F02 — Dates et fuseaux | Validé sur les cas actuels, dont le scénario de fuseau ouest-américain |
| F03 — Pannes du formulaire et reCAPTCHA | Gestion des erreurs testée ; intégrations réelles non exercées ; nouveau défaut sans JS en R02 |
| F04 — Nouvelle tentative reCAPTCHA | Correctif et tests unitaires passent ; pas de validation avec des clés réelles |
| F05 — Stockage du consentement | **Partiel** : panne de stockage traitée dans certains cas, retrait perdu en R01 |
| F06 — Dialogue de consentement | Comportements testés et sonde axe du dialogue passent |
| F07 — Navigation clavier | Scénarios de menu et Escape passent ; ne couvre pas toutes les régions défilantes, voir R08 |
| F08 — Erreurs et champs | Tests de composants et état axe invalide passent |
| F09 — Mouvement réduit et langue | Scénarios radar et langue du corps MDX passent |
| F10 — Langue et contexte de recherche | Conservation des paramètres et de l'ancre vérifiée en E2E |
| F11 — Nonce et changement de langue | Renouvellement et changement de thème après navigation vérifiés |
| F12 — JSON-LD après navigation | Scénario de mise à jour après navigation cliente réussi |
| F13 — Modèles de locale | Centralisation revue ; l'ajout d'une troisième langue reste un chantier transversal |
| F14 — Titres et références dupliqués | Centralisation et invariants actuels revus ; pas de nouvelle rupture observée |
| F15 — Relations supposées non vides | Contrôles des données et routes actuelles passent |
| F16 — Lecture MDX | Lecture asynchrone et erreurs explicites revues ; tests réussis |
| F17 — Nettoyage MDX et ancres | **Partiel** : contenus actuels sains, limites de syntaxe et collision en R09 |
| F18 — Layout utilisé comme bibliothèque | Composant partagé extrait ; layouts des articles FR/EN vérifiés |
| F19 — Commande générale de tests | Projets unit/browser déclarés ; **configuration de couverture encore erronée**, R04 |
| F20 — Vérifications rouges | Lint, typage, build et suites passent localement ; CI Linux non exécutée ici |
| F21 — Frontières insuffisamment testées | Couverture fonctionnelle enrichie, mais R01–R03 et R06 montrent des scénarios manquants |
| F22 — Environnement | Node/pnpm fixés ; installation gelée et exécutions réussies sous ces versions |
| F23 — Avis transitifs | Audit du registre à zéro avis dans cette réanalyse |
| F24 — Performance et SSR | Arbitrage SSR documenté et mesures renouvelées ; **contrôle agrégé invalide pour un nouveau build**, R05 |
| F25 — Sans JavaScript | **Partiel** : accueil lisible, liste vide et formulaire GET, R02/R06 |
| F26 — Documentation | **Partiel** : guides ajoutés, contradictions et procédure incomplète, R10 |
| F27 — Forme et grands composants | Extractions utiles revues ; aucun argument pour une fragmentation générale supplémentaire |

## Ordre de correction recommandé

1. **R01 et R02** : garantir le respect du retrait et empêcher la soumission GET involontaire ; reproductions navigateur en tests de non-régression.
2. **R04 et R05** : rendre les contrôles de couverture et de performance effectifs avant de s'appuyer sur leur résultat vert.
3. **R03 et R06** : stabiliser le contrat URL/filtre et conserver l'accès initial aux articles sans JavaScript.
4. **R07 et R08** : corriger contrastes et accès aux zones de code ; confirmer séparément les recouvrements de cibles mobiles.
5. **R09 et R10** : renforcer les invariants MDX et réaligner les guides sur les conventions effectivement testées.

La priorité n'est pas d'augmenter le nombre de tests ou de réorganiser davantage de fichiers. Elle est de convertir les défauts reproduits en garanties vérifiables, puis de distinguer clairement validation locale, CI et intégrations déployées.
