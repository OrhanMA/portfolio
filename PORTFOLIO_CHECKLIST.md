# Portfolio Checklist — Compliance Status

Based on:
- **ISCOD/Visiplus Grille d'évaluation du Portfolio** (Expert Ingénierie du Logiciel) — 100 points
- [The Ultimate Developer Portfolio Checklist for Job Seekers](https://www.devportfoliotemplates.com/blog/the-ultimate-developer-portfolio-checklist-for-job-seekers)

Last reviewed: 2026-09-12

Legend: ✅ Done | ⚠️ Partial | ❌ Missing | ⏳ Planned | ➖ N/A

---

## État des lieux historique — 2026-07-16

L'application est un portfolio Next.js 16 bilingue FR/EN : toutes les routes utilisent l'App Router et le segment `[locale]`. Le socle technique couvre les dictionnaires JSON, une navbar et un footer persistants, GSAP centralisé, Lenis chargé à l'interaction, thème dark/light, consentement cookies versionné, GTM conditionné au consentement, formulaire de contact avec validation et anti-spam multicouche, sitemap, robots, tests unitaires/browser/E2E et CI GitHub Actions. Un nonce CSP est généré par requête : le rendu est donc dynamique par choix de sécurité, sans script non sécurisé. Le footer donne accès au CV, au TOEIC et aux titres RNCP sans alourdir la homepage.

La direction éditoriale actuelle associe une architecture romaine contemporaine à une palette ivoire, charbon et rouge profond. Cinq fonds fixes optimisés différencient l'accueil, la présentation, le parcours, les compétences et les réalisations sans capturer les interactions. Forum structure les grands titres, EB Garamond porte les contenus longs et Roboto Flex reste réservé aux contrôles. La homepage conserve son portrait et ses sections de preuve ; les pages secondaires utilisent un en-tête éditorial commun et des surfaces de lecture suffisamment opaques. La frise verticale est accompagnée de logos réels, les compétences sont comparées dans un radar, les réalisations sont organisées en lignes éditoriales, et le contact expose aussi une adresse email de secours. Les documents publics sont regroupés dans le footer. Les animations disposent d'une variante `prefers-reduced-motion` et les fonds mobiles sont fortement atténués.

Les contenus principaux de la grille ISCOD sont en place : 10 compétences, 5 réalisations détaillées, navigation circulaire compétences ↔ réalisations, frise chronologique ouverte, expérience/formation avec logos et page contact. La navbar mène directement aux pages À propos, Compétences et Réalisations, tout en conservant l'ancre Parcours de la homepage ; ses sous-menus donnent aussi accès aux 10 compétences et aux 5 réalisations sur desktop comme sur mobile. Les pages réalisations ont des preuves visuelles : captures Odoo, captures corporate, captures CAP2vie et vidéos de démonstration CAP2vie. Les relations compétences ↔ réalisations sont réciproques et protégées par un test automatique. Le TOEIC est daté du 7 août 2025 et son certificat public est lié depuis le footer.

La page de présentation expose désormais explicitement le projet professionnel et personnel : devenir développeur confirmé et référent technique Odoo, élargir le profil aux intégrations ERP par API, progresser vers la gestion de projet, la décision produit et l'architecture, et construire un outil de business intelligence auto-hébergé connecté à Odoo. Les cinq réalisations sont désormais entièrement développées dans toutes leurs rubriques et isolées dans cinq modules de contenu distincts derrière un index public léger. Pour le portfolio professionnel, la présentation, les objectifs, les risques, les 32 étapes, les interactions, les résultats, les lendemains et le regard critique s'appuient sur les réponses, le code, l'historique Git et l'audit Lighthouse de production du 16 juillet 2026, réalisé sur les 100 URL du sitemap. Les dix compétences ont été réécrites en français et en anglais à partir de ces études de cas : chacune possède trois preuves développées, des résultats explicites, une autocritique argumentée et une trajectoire d'évolution. Chaque définition reste reliée à une actualité datée, contextualisée et renvoyant vers une source officielle distincte.

---

## ISCOD Grille d'évaluation (100 points)

### Prénom, Nom, Photo — critère transversal obligatoire (sans points dédiés)

| Critère | Status | Notes |
|---------|--------|-------|
| Prénom + Nom sur toutes les pages | ✅ | Signature texte discrète visible en haut à gauche dans la navbar persistante, sur desktop comme sur mobile |
| Photo sur toutes les pages | ✅ | Portrait présent dans l'identité persistante du bandeau sur toutes les pages, avec une version plus grande dans le hero de l'accueil |

---

### Page d'accueil — 5 pts (estimé : 5/5)

| Critère | Status | Notes |
|---------|--------|-------|
| Attrayante | ✅ | Direction éditoriale romaine distinctive : hero monumental, portrait, composition typographique, lumière animée légère et dark/light mode |
| Convaincante | ✅ | CTA contact persistant, mosaïque de cas avec métriques vérifiées et documents publics accessibles dans le footer |
| Correctement structurée | ✅ | Hero → About → Experience → Skills → Réalisations mises en avant → CTA, avec niveaux de lecture détaillés sur les pages dédiées |

---

### Menu — 3 pts (estimé : 3/3)

| Critère | Status | Notes |
|---------|--------|-------|
| Présent sur toutes les pages | ✅ | Navbar persistante (fixed header) |
| Persistant en scrolling | ✅ | Fixed position, toujours visible |
| Mots courts, simples, significatifs | ✅ | À propos, Parcours, Compétences, Réalisations, Contact |
| Lien vers page Compétences dans le menu | ✅ | La navbar pointe directement vers `/${locale}/competences` |
| Lien vers page Réalisations dans le menu | ✅ | La navbar pointe directement vers `/${locale}/realisations` |

---

### Article de présentation générale — 15 pts (estimé : 15/15)

| Critère | Status | Notes |
|---------|--------|-------|
| Article spécifique dans une **page dédiée** | ✅ | Page `/a-propos` créée |
| Article détaillé | ✅ | Texte riche avec parcours narratif complet |
| Article structuré (paragraphes, sous-titres, caractères gras) | ✅ | 5 sections distinctes avec sous-titres, paragraphes et éléments importants en gras |
| Mes valeurs (ingénieur humain, conscient, responsable) | ✅ | Responsabilité, autonomie, amélioration continue |
| Mon projet professionnel / personnel | ✅ | Objectifs à 2-5 ans, environnement recherché, responsabilités visées, autoformations et projet BI auto-hébergé connecté à Odoo |
| Mes principales qualités humaines | ✅ | Persévérance, adaptabilité, communication |
| Mes principaux centres d'intérêt | ✅ | Basketball 3x3, NBA (Spurs), échecs (club Aix-les-Bains) |
| Éviter expressions introductives auto-centristes | ✅ | Ton narratif approprié |

---

### Mes compétences — page commune — 10 pts (estimé : ~9/10)

| Critère | Status | Notes |
|---------|--------|-------|
| Schéma synthétique comparatif | ✅ | Radar chart SVG animé (GSAP) |
| Accessible par le menu principal | ✅ | "Compétences" dans la navbar |
| Chaque élément de la section Compétences de l’accueil est cliquable | ✅ | 36 liens internes localisés FR/EN vers les fiches et projets associés, soulignés avec une flèche et un focus clavier visible |
| Niveau de chaque compétence visible par rapport aux autres | ✅ | Radar chart + badges de niveau (Débutant → Expert) |
| 10 compétences (4-7 humaines + 4-6 techniques) | ✅ | 5 humaines + 5 techniques = 10 |
| Divisé en au moins 2 domaines (technique + non-technique) | ✅ | "Compétences humaines" + "Compétences techniques" |

---

### Chacune de mes compétences — articles individuels — 30 pts (estimé : 30/30)

| Critère | Status | Notes |
|---------|--------|-------|
| Page dédiée par compétence (`/competences/[slug]`) | ✅ | 10 pages créées |
| Article structuré (paragraphes, sous-titres, caractères gras) | ✅ | Sommaire responsive, cinq sections ancrées, paragraphes éditoriaux et hiérarchie de titres |
| **Définition** : définir la compétence dans un contexte pro + actualité | ✅ | Chaque définition est suivie d'une actualité datée, contextualisée et liée à une source officielle distincte |
| **Éléments de preuve** : 1-3 anecdotes concrètes | ✅ | 3 anecdotes développées par compétence, toutes reliées à une réalisation documentée |
| Résultat énoncé + valeur ajoutée mise en avant | ✅ | Résultat dans chaque anecdote |
| Lien vers la réalisation évoquée dans l'anecdote | ✅ | Liens cliquables vers `/realisations/[slug]` |
| **Autocritique** : niveau de maîtrise | ✅ | Barres de progression + labels |
| Autocritique : place/importance/priorité dans le profil | ✅ | "Importance dans mon profil" |
| Autocritique : vitesse d'acquisition (si remarquable) | ✅ | "Vitesse d'acquisition" |
| Autocritique : recul / conseils | ✅ | "Recul et conseils" |
| **Évolution** : situer dans le projet pro, niveau souhaité à moyen terme | ✅ | "Objectif à moyen terme" |
| Évolution : formations/autoformations en cours ou à venir | ✅ | "Formations en cours ou à venir" |
| En fin d'article : liste des réalisations rattachées + liens | ✅ | Section "Réalisations rattachées" avec liens |
| Accessibles depuis la page commune des compétences | ✅ | Liens "Lire l'article" sur chaque card |
| Accessibles par un sous-menu | ✅ | Sous-menu exhaustif des 10 compétences sur desktop et accordéon complet sur mobile |

---

### Mes réalisations — page commune — 5 pts (estimé : 5/5)

| Critère | Status | Notes |
|---------|--------|-------|
| Au nombre de 5 minimum, regroupées sur une page commune | ✅ | 5 réalisations sur `/realisations` |
| Accessible par le menu principal | ✅ | "Réalisations" dans le menu |
| Liste/pavés : chaque item pointe vers une réalisation spécifique | ✅ | Cards avec liens vers pages détail |
| Court descriptif par item | ✅ | shortDescription sur chaque card |

---

### Chacune de mes réalisations — articles individuels — 20 pts (estimé : 20/20)

| Critère | Status | Notes |
|---------|--------|-------|
| Accessible depuis la page commune des réalisations | ✅ | Liens depuis `/realisations` |
| Accessible par un sous-menu | ✅ | Sous-menu exhaustif des 5 réalisations sur desktop et accordéon complet sur mobile |
| Nom évocateur (indépendant du contexte école/entreprise) | ✅ | Noms descriptifs (ex: "Migration Odoo v16 → v19") |
| Article spécifique, structuré, détaillé | ✅ | 8 sections communes ; les cinq réalisations sont entièrement développées et disposent d'un sommaire responsive, de sous-titres numérotés et d'une largeur de lecture maîtrisée |
| **Présentation/définition** du projet ou de la réalisation | ✅ | Les cinq réalisations disposent désormais d'une présentation détaillée |
| **Objectifs, contexte, enjeu, risques** | ✅ | Les cinq réalisations détaillent désormais leurs objectifs, enjeux et risques |
| **Étapes** — ce que j'ai fait | ✅ | Les cinq réalisations sont détaillées ; le portfolio décrit 32 étapes vérifiées à partir du code et de l'historique Git |
| **Acteurs** — les interactions | ✅ | Les cinq réalisations sont détaillées ; le portfolio distingue porteur, learning coach, testeurs informels, publics cibles, DG approbateur et assistance IA |
| **Résultats** — pour moi, pour l'entreprise | ✅ | Résultats détaillés pour les cinq réalisations ; le portfolio distingue métriques prouvées, retours qualitatifs et validations encore absentes |
| **Lendemains** du projet (futur immédiat, à distance, aujourd'hui) | ✅ | Les cinq réalisations sont détaillées ; le portfolio distingue finalisation en août 2026, maintenance événementielle et rôles durables |
| **Regard critique** | ✅ | Les cinq réalisations sont détaillées ; erreurs, dettes, limites des tests, arbitrages et décisions à conserver sont explicités |
| En fin d'article : liste des compétences rattachées + liens | ✅ | Section "Compétences rattachées" avec liens vers `/competences/[slug]` |

---

### Mon parcours — frise chronologique — 5 pts (estimé : 5/5)

| Critère | Status | Notes |
|---------|--------|-------|
| Matérialisé sur une frise ou un axe | ✅ | Axe vertical continu et un marqueur par entrée, visibles sur mobile comme sur desktop |
| Antéchronologique | ✅ | Fin « Présent » d’abord, puis date de fin décroissante ; à fin égale, date de début décroissante |
| Accessible par le menu | ✅ | Section dans la homepage, accessible via "Accueil" |

---

### Pour chacune de mes expériences — 5 pts (estimé : 5/5)

#### Expérience en entreprise — 1er niveau de lecture

| Critère | Status | Notes |
|---------|--------|-------|
| Période (du xx au xx) | ✅ | "Déc. 2024 — Présent", "Mai — oct. 2024" |
| Poste occupé | ✅ | "Développeur Fullstack — Alternance" |
| Lieu (nom société + **LOGO**) | ✅ | Logo + nom avec lien vers le site |

#### Expérience en entreprise — 2ème niveau de lecture (survol/popup/page dédiée)

| Critère | Status | Notes |
|---------|--------|-------|
| Responsabilité (chef de projet, etc.) | ✅ | Détail repliable par entrée avec les responsabilités explicites |
| Statut (stagiaire, alternant) | ✅ | "Alternance", "Stagiaire" mentionnés |
| Détail des missions | ✅ | Descriptions synthétiques visibles directement dans la frise ouverte |
| Liens vers réalisations et compétences rattachées | ✅ | Liens localisés présents dans le détail repliable de chaque entrée |

#### Formation — 1er niveau de lecture

| Critère | Status | Notes |
|---------|--------|-------|
| Période | ✅ | Entrées séparées : 2023 (DWWM), janv.–déc. 2024 (CDA), 2025–2027 (Mastère) |
| Diplôme/titre/niveau atteint | ✅ | DWWM RNCP 5, CDA RNCP 6, Mastère RNCP 7 |
| Lieu (nom établissement + **LOGO** pointant vers le site) | ✅ | Logos ISCOD, Simplon et USMB affichés avec liens institutionnels |

#### Formation — 2ème niveau de lecture

| Critère | Status | Notes |
|---------|--------|-------|
| Présentation de l'établissement / vision de la pédagogie | ✅ | Présentation spécifique de Simplon et de l'ISCOD dans le deuxième niveau de chaque formation |

#### Test ou certification

| Critère | Status | Notes |
|---------|--------|-------|
| Date et intitulé | ✅ | TOEIC passé le 7 août 2025 : 920/990 (Listening C1, Reading B2), certificat PDF lié |

---

### Navigation circulaire — (critère transversal, pas de points dédiés)

| Critère | Status | Notes |
|---------|--------|-------|
| Chaque compétence → réalisations rattachées (liens) | ✅ | Liens réciproques contrôlés automatiquement |
| Chaque réalisation → compétences rattachées (liens) | ✅ | Test unitaire garantissant la symétrie des deux sens |
| Chaque réalisation → expériences et formations associées | ✅ | Liens FR/EN dans le bloc Contexte vers les entrées précises du Parcours, à partir des relations existantes |
| Navigation interne des expériences, réalisations, compétences et technologies | ✅ | Titres, logos du Parcours, images de réalisations, badges, radar et mentions textuelles reliés aux pages internes ; 7 fiches Parcours en FR/EN ; destinations des sujets centralisées et contrôlées par les tests |

---

### Espace contact — 2 pts (estimé : 2/2)

| Critère | Status | Notes |
|---------|--------|-------|
| Accessible par le menu principal | ✅ | "Contact" dans le menu |
| OU présent dans chaque page | ✅ | Email + liens sociaux dans le footer |

---

### Orthographe — Retrait de 1 % toutes les 5 fautes

| Critère | Status | Notes |
|---------|--------|-------|
| Orthographe corrigée | ✅ | Fautes identifiées corrigées, accents de la page 404 rétablis et anglicismes les plus visibles reformulés |

---

## Score ISCOD estimé

| Critère | Points max | Score estimé | Status |
|---------|-----------|-------------|--------|
| Prénom, nom, photo | — | Obligatoire | ✅ |
| Page d'accueil | 5 | 5 | ✅ |
| Menu | 3 | 3 | ✅ |
| Article de présentation générale | 15 | 15 | ✅ |
| Mes compétences (page commune) | 10 | 10 | ✅ |
| Chacune de mes compétences (articles) | 30 | 30 | ✅ |
| Mes réalisations (page commune) | 5 | 5 | ✅ |
| Chacune de mes réalisations (articles) | 20 | 20 | ✅ |
| Mon parcours (frise) | 5 | 5 | ✅ |
| Détail expériences | 5 | 5 | ✅ |
| Navigation circulaire | — | ✅ | ✅ |
| Espace contact | 2 | 2 | ✅ |
| Orthographe | −1 % toutes les 5 fautes | 0 retrait | ✅ |
| **TOTAL** | **100** | **100/100 documentaire** | ⚠️ |

---

## Audit technique historique du 2026-07-16

- Build Next.js 16 de production réussi, avec génération de 109 pages. Toutes les routes du portfolio sont dans l'App Router ; le nonce CSP rend les pages dynamiques par conception.
- Lighthouse 13.4.0 lancé avec le profil mobile de Chrome sur les **100 URL** de production du sitemap, une fois par URL : moyennes de **94,3/100** en performance, **99,8/100** en accessibilité, **99,9/100** en bonnes pratiques et **100/100** en SEO. Les 100 pages ont un CLS de **0**, 98 pages atteignent au moins 90 en performance, le FCP médian est de 1,08 s, le LCP médian de 2,49 s et le TBT médian de 44 ms. L’audit antérieur relevait 57/100 sur les variantes App Trajectoires de vie à cause de quatre lecteurs YouTube créés dès le chargement. Ils sont désormais remplacés par une façade sans requête tierce, qui ne crée le lecteur `youtube-nocookie` qu’après une action explicite. Rejouer Lighthouse sur la production reste nécessaire pour consigner le nouveau score. Voir le rapport historique dans [`reports/lighthouse-production-2026-07-16.md`](./reports/lighthouse-production-2026-07-16.md).
- 100/100 URL du sitemap répondent en HTTP 200, possèdent un H1 unique et exposent la bonne URL canonical localisée.
- Aucun lien interne cassé détecté lors du crawl des routes du sitemap et des preuves publiques.
- Aucun saut de niveau dans la hiérarchie des titres sur les 100 routes du sitemap.
- Audit Playwright des pages secondaires réussi en 1280 × 900 et 390 × 844, en français et en anglais, sans débordement horizontal.
- Suite Vitest réussie : 36 fichiers, 191 tests. Suite E2E Playwright : 30 scénarios réussis sur le build de production.
- Régressions visuelles homepage desktop et mobile inspectées, actualisées après les changements intentionnels, puis rejouées avec succès.

---

## Revue de livraison — 2026-08-23

Le détail vérifiable de cette revue est consigné dans [`reports/portfolio-delivery-audit-2026-08-14.md`](./reports/portfolio-delivery-audit-2026-08-14.md). Le relevé des preuves humaines, mesures et essais externes est prêt dans [`reports/portfolio-evidence-collection-template.md`](./reports/portfolio-evidence-collection-template.md). Les états ci-dessous remplacent les affirmations globales de l'audit historique lorsqu'ils divergent.

| Domaine | État | Vérification effectuée |
| --- | --- | --- |
| Contenu, grille et relations compétences ↔ réalisations | ✅ | 10 compétences et 5 réalisations, liens réciproques et rubriques attendues contrôlés par les tests. Nom, portrait, menu fixe, frise et contact sont présents dans le rendu. |
| PDFs et données documentées | ✅ | TOEIC 920/990 du 7 août 2025, DWWM délivré le 21 décembre 2023 et CDA délivré le 24 décembre 2024 vérifiés visuellement. Le CV public a été aligné le 23 août 2026 avec les dates confirmées du site : 1UP depuis décembre 2024, LIG de mai à octobre 2024, CDA de janvier à décembre 2024 et DWWM en 2023. |
| Métriques d'impact | ⚠️ | Les valeurs documentées restent distinguées : 16 modules internes personnalisés, 20 modules open source présentés sur `/projects` et 20 utilisateurs Odoo directs. Les effectifs externes, la durée d'interruption et le gain estimé restent exclus faute de source publiable. |
| Liens | ⚠️ | 44 liens externes publics contrôlés : 42 répondent, 1 lien ETS cassé a été corrigé dans le code, LinkedIn et OpenAI bloquent les robots mais correspondent aux URL attendues. Les liens internes, CV, TOEIC et titres sont couverts par le crawl et les E2E. |
| Mobile, navigation, thèmes, langues et retours arrière | ✅ en émulation | E2E vert sur build de production : desktop 1280 × 900 et mobile 390 × 844, FR/EN, menu, sous-menus, formulaires, ancres, dark/light, 404 et absence de débordement horizontal. Un téléphone physique reste à essayer. |
| Accessibilité | ✅ localement | Un H1 par route, `lang`, `alt`, labels, erreurs de formulaire, focus visibles et réduction des mouvements sont vérifiés par code et E2E. Un essai VoiceOver/NVDA réel reste requis. |
| SEO et partage | ✅ structurellement | Métadonnées localisées, canonical, hreflang, OG, JSON-LD, robots et sitemap sont présents. Le crawl de production couvre 100/100 URL (200, H1 unique, canonical exacte). Les aperçus LinkedIn/WhatsApp ne peuvent être validés qu'après publication de la version courante. |
| Performance | ⚠️ | Les vidéos CAP2vie restent différées jusqu'au clic ; l'image décorative de l'en-tête est allégée dans le code. Les deux passages Lighthouse production du 14 août donnent un LCP de 3,5 s puis 4,5 s sur CAP2vie, contre 2,2 s pour le build local : la cible < 3 s n'est pas confirmée en production. |
| Sécurité et conformité | ✅ localement / ⚠️ production | CSP, HTTPS, anti-spam, validation, cookies, politique de confidentialité et absence de secret suivi dans le code sont vérifiés. Next.js est en 16.2.11 et `pnpm audit` ne remonte aucune vulnérabilité. La réception réelle d'un e-mail et la configuration des variables Vercel restent à confirmer par le propriétaire. |
| Tests et livraison | ✅ localement / ✅ production | `pnpm lint` et `pnpm typecheck` réussis ; `pnpm test` : 37 fichiers, 175 tests ; build : 109 routes ; `pnpm test:e2e` : 31 scénarios réussis. La version publiée sur `main` a été déployée par Vercel ; les pages FR/EN, les métriques, l'article de migration et le CV public ont été contrôlés le 23 août 2026. |

### Bloquants externes à lever avant une validation finale

1. Fournir 1 à 3 recommandations, attestations ou retours nominatifs autorisés à publier ; aucun ne doit être inventé.
2. Relever sur une période définie les temps de traitement, utilisateurs et erreurs avant/après afin de publier des métriques mesurées.
3. Après le déploiement, refaire au moins trois Lighthouse mobiles sur CAP2vie et ramener son LCP sous 3 s.
4. Envoyer un message réel vers la boîte de réception cible, puis effectuer un essai non guidé avec 2 à 3 personnes et un téléphone physique.

---

## Améliorations restantes

### Grille ISCOD
- Séparer davantage les formations dans la frise si les périodes exactes de chaque cursus peuvent être confirmées.

### Best practices hors grille
- Ajouter des preuves humaines si disponibles : attestations, recommandations, retours de collègues ou encadrants.
- Continuer à affiner les métriques d'impact lorsqu'elles deviennent plus précises : temps gagné réel, fréquence d'usage, réduction d'erreurs mesurée.

---

## Checklist générale (best practices, hors grille ISCOD)

### Homepage & Introduction

| Item | Status | Notes |
|------|--------|-------|
| Professional headline describing your role | ✅ | "Développeur full-stack" via i18n |
| Brief personal summary / elevator pitch | ✅ | About section with autodidact → Simplon → ISCOD journey |
| Professional headshot or avatar | ✅ | Headshot in navbar + hero |
| Clear call-to-action for employers | ✅ | CTA contact persistant dans la navbar et section de contact en fin de homepage |
| Social proof (awards, certifications, recognition) | ✅ | Mosaïque avec métriques vérifiées et liens de footer vers le TOEIC 920/990, les titres RNCP et le CV |

### Projects Section

| Item | Status | Notes |
|------|--------|-------|
| 4-6 highlighted projects | ✅ | 5 réalisations détaillées + 20 modules Odoo open source sur `/projects` |
| Clear descriptions and objectives | ✅ | Bilingual summary + details per project |
| Technologies used listed | ✅ | Odoo + Python badges on each card |
| GitHub repository links | ✅ | Each project links to GitHub |
| Screenshots or video demos | ✅ | Captures Odoo/corporate/CAP2vie + vidéos CAP2vie intégrées aux pages réalisations |
| Your specific role and contributions | ✅ | Explicit in `/realisations` and strengthened on Odoo module detail pages |
| Challenges solved and solutions | ✅ | Odoo module pages now include business problem, solution, technical highlight and impact |
| Measurable results and impact | ✅ | Added available metrics: 16 internal modules, 20 open-source modules, ~10 third-party modules, 20 direct Odoo users, and Lighthouse score |

### Technical Skills

| Item | Status | Notes |
|------|--------|-------|
| Programming languages with proficiency levels | ✅ | Radar chart + level badges on `/competences` |
| Frameworks and libraries | ✅ | Symfony, Next.js, React, Vue.js, Odoo, etc. |
| Development tools and environments | ✅ | Git, Docker, Shell, Linux, CI/CD |
| Database technologies | ✅ | PostgreSQL, Redis |
| Cloud platforms and services | ✅ | VPS (OVH, DigitalOcean), Vercel |
| Skills categorized by expertise level | ✅ | Radar chart + Débutant/Intermédiaire/Avancé/Expert |

### Professional Experience

| Item | Status | Notes |
|------|--------|-------|
| Relevant work history | ✅ | 1UP full-stack developer (Dec. 2024–Present) |
| Internships and apprenticeships | ✅ | LIG Lab internship (May–Oct. 2024) |
| Open source contributions | ✅ | 20 Odoo modules on GitHub |

### Performance & Responsive Design

| Item | Status | Notes |
|------|--------|-------|
| Page load time under 3 seconds | ⚠️ | Audit Lighthouse mobile de production sur 100 URL : LCP médian 2,49 s. Les quatre lecteurs YouTube responsables des LCP à 9,53 s et 12,24 s sont maintenant différés derrière une façade activée au clic ; une nouvelle collecte de production est requise pour confirmer la cible. |
| Mobile-first approach | ✅ | Tailwind CSS mobile-first breakpoints |
| Responsive design (all breakpoints) | ✅ | Audit Playwright sur 18 routes représentatives en 390 px et 1280 px, sans débordement horizontal |
| Touch-friendly navigation | ✅ | Mobile hamburger menu |

### SEO

| Item | Status | Notes |
|------|--------|-------|
| Meta titles and descriptions | ✅ | Métadonnées localisées par page et par article MDX via `generateMetadata()` |
| Open Graph tags | ✅ | OG title, description, locale, URL localisée et image dynamique |
| Schema markup / JSON-LD | ✅ | Person + WebSite + ProfilePage JSON-LD in locale layout |
| XML sitemap | ✅ | `src/app/sitemap.ts` — includes all new pages |
| Robots.txt | ✅ | `src/app/robots.ts` |
| Canonical URLs | ✅ | 100/100 routes du sitemap contrôlées avec canonical FR/EN exacte |
| Semantic HTML | ✅ | 100/100 routes avec un H1 unique et sans saut de niveau dans la hiérarchie des titres |
| Clean URL structure | ✅ | Locale-prefixed (`/fr/contact`, `/en/articles`) |
| Discoverable article topics | ✅ | Tags cliquables et recherche texte sur titre, contenu MDX indexé et tags, avec filtres synchronisés dans l'URL |

### Accessibility

| Item | Status | Notes |
|------|--------|-------|
| Langue du document | ✅ | Attribut `lang` contrôlé au runtime sur les pages représentatives FR/EN ; les 100 routes partagent le même layout localisé |
| Audit Lighthouse mobile | ⚠️ | Moyenne historique 99,8/100. Les contrastes des petits liens et du sommaire sont contrôlés localement avec Axe ; les tags cliquables font 28 px et exposent leur état `aria-pressed`. Une collecte de production reste à rejouer pour mettre à jour le score. |
| Textes alternatifs des images | ✅ | Aucun `<img>` sans attribut `alt` dans l'audit Playwright |
| Structure des titres | ✅ | H1 unique et hiérarchie sans saut sur les 100 routes du sitemap |
| Identifiants DOM uniques | ✅ | Aucun doublon détecté sur les pages représentatives desktop/mobile |
| Réduction des animations | ✅ | Variantes statiques `prefers-reduced-motion` pour CSS/Web Animations et GSAP ; tests E2E exécutés en mouvement réduit |

### Security

| Item | Status | Notes |
|------|--------|-------|
| SSL certificate | ✅ | Auto via Vercel |
| Form validation (client + server) | ✅ | Zod schemas |
| XSS protection | ✅ | `escapeHtml()` + React auto-escape |
| Anti-spam (honeypot, time check, rate limit, reCAPTCHA) | ✅ | Multi-layered |
| GDPR cookie consent | ✅ | Custom banner with Accept/Reject/Manage |
| Privacy policy | ✅ | `/politique-confidentialite` |
| Security headers | ✅ | CSP, Referrer-Policy, X-Content-Type-Options, X-Frame-Options, Permissions-Policy in `next.config.mjs` |

### Testing

| Item | Status | Notes |
|------|--------|-------|
| Unit tests | ✅ | Suite Vitest : 45 fichiers et 245 tests réussis |
| Browser component tests | ✅ | Vitest Browser Mode + Playwright : 4 fichiers et 23 tests réussis |
| Visual regression tests | ✅ | Deux références homepage desktop/mobile inspectées, mises à jour et rejouées avec succès |
| E2E tests | ✅ | 45/45 scénarios Playwright réussis sur le build de production : navigation, accès direct à la frise, i18n, consentement, contact, fuseaux horaires, stockage refusé, erreurs navigateur, fallback sans JavaScript, recherche rapide, responsive, pages secondaires, homepage et audit sitemap/CSP/structure |
| CI/CD pipeline | ✅ | GitHub Actions: lint → tests → build → e2e |

### Deployment

| Item | Status | Notes |
|------|--------|-------|
| Version control (Git) | ✅ | GitHub |
| Automated deployment | ✅ | Vercel auto-deploys |
| Custom domain | ✅ | `orhanmadiassani.com` |
| CDN | ✅ | Vercel Edge Network |
| Rollback capability | ✅ | Vercel instant rollbacks |

### Interactive Elements

| Item | Status | Notes |
|------|--------|-------|
| Smooth scrolling | ✅ | Lenis + GSAP ticker, initialisés uniquement après une interaction utilisateur pertinente |
| Scroll-triggered animations | ✅ | IntersectionObserver + Web Animations sur la homepage ; GSAP ScrollTrigger sur les composants interactifs secondaires |
| Dark/light mode | ✅ | `next-themes` with system detection |
| Page transitions | ✅ | Fade + y-translate (0.4s) |
| i18n (FR + EN) | ✅ | Dictionary-based, locale routing |
