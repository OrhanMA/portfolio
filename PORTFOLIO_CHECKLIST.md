# Portfolio Checklist — Compliance Status

Based on:
- **ISCOD/Visiplus Grille d'évaluation du Portfolio** (Expert Ingénierie du Logiciel) — 100 points
- [The Ultimate Developer Portfolio Checklist for Job Seekers](https://www.devportfoliotemplates.com/blog/the-ultimate-developer-portfolio-checklist-for-job-seekers)

Last reviewed: 2026-05-13

Legend: ✅ Done | ⚠️ Partial | ❌ Missing | ⏳ Planned | ➖ N/A

---

## État des lieux actuel — 2026-05-13

L'application est un portfolio Next.js 16 bilingue FR/EN bien avancé : page d'accueil animée, pages dédiées pour l'à-propos, les compétences, les réalisations, les projets open source Odoo, les articles MDX, le contact, les mentions légales et la politique de confidentialité. Le socle technique est solide : App Router avec segment `[locale]`, dictionnaires JSON, navbar/footer persistants, GSAP centralisé, Lenis, thème dark/light, cookie consent, GTM consent-gated, formulaire de contact avec validations et anti-spam, sitemap, robots, tests unitaires/browser/e2e et CI GitHub Actions. La homepage expose désormais une section Documents qui pointe vers le CV, le TOEIC et les titres RNCP.

Les contenus principaux de la grille ISCOD sont en place : 10 compétences, 5 réalisations détaillées, navigation circulaire compétences ↔ réalisations, frise chronologique, expérience/formation avec logos, responsabilités explicites, page contact et sous-menus dédiés pour les compétences et réalisations. Les pages réalisations ont maintenant des preuves visuelles : captures Odoo, captures corporate, captures CAP2vie et vidéos de démonstration CAP2vie. Les derniers écarts concernent surtout les métriques d'impact quand elles ne peuvent pas être déduites du code.

---

## ISCOD Grille d'évaluation (100 points)

### Prénom, Nom, Photo — sur toutes les pages (obligatoire, pas de points dédiés)

| Critère | Status | Notes |
|---------|--------|-------|
| Prénom + Nom sur toutes les pages | ✅ | Nom complet visible dans le hero, le footer et la navbar desktop persistante |
| Photo sur toutes les pages | ✅ | Avatar headshot dans la navbar |

---

### Page d'accueil — 5 pts (estimé : 5/5)

| Critère | Status | Notes |
|---------|--------|-------|
| Attrayante | ✅ | GSAP animations, gradient hero, dark/light mode |
| Convaincante | ✅ | CTAs clairs, parcours autodidacte → professionnel |
| Correctement structurée | ✅ | Hero → About → Skills → Réalisations mises en avant → Experience → Documents → CTA |

---

### Menu — 3 pts (estimé : 3/3)

| Critère | Status | Notes |
|---------|--------|-------|
| Présent sur toutes les pages | ✅ | Navbar persistante (fixed header) |
| Persistant en scrolling | ✅ | Fixed position, toujours visible |
| Mots courts, simples, significatifs | ✅ | Accueil, À propos, Compétences, Réalisations, Articles, Contact |
| Lien vers page Compétences dans le menu | ✅ | `/competences` dans la navbar |
| Lien vers page Réalisations dans le menu | ✅ | `/realisations` dans la navbar |

---

### Article de présentation générale — 15 pts (estimé : ~14/15)

| Critère | Status | Notes |
|---------|--------|-------|
| Article spécifique dans une **page dédiée** | ✅ | Page `/a-propos` créée |
| Article détaillé | ✅ | Texte riche avec parcours narratif complet |
| Article structuré (paragraphes, sous-titres, caractères gras) | ✅ | 5 sections avec sous-titres (parcours, valeurs, projet pro, qualités, intérêts) |
| Mes valeurs (ingénieur humain, conscient, responsable) | ✅ | Responsabilité, autonomie, amélioration continue |
| Mon projet professionnel / personnel | ✅ | Lead dev, spécialisation Odoo, contribution open source |
| Mes principales qualités humaines | ✅ | Persévérance, adaptabilité, communication |
| Mes principaux centres d'intérêt | ✅ | Basketball 3x3, NBA (Spurs), échecs (club Aix-les-Bains) |
| Éviter expressions introductives auto-centristes | ✅ | Ton narratif approprié |

---

### Mes compétences — page commune — 10 pts (estimé : ~9/10)

| Critère | Status | Notes |
|---------|--------|-------|
| Schéma synthétique comparatif | ✅ | Radar chart SVG animé (GSAP) |
| Accessible par le menu principal | ✅ | "Compétences" dans la navbar |
| Niveau de chaque compétence visible par rapport aux autres | ✅ | Radar chart + badges de niveau (Débutant → Expert) |
| 10 compétences (4-7 humaines + 4-6 techniques) | ✅ | 5 humaines + 5 techniques = 10 |
| Divisé en au moins 2 domaines (technique + non-technique) | ✅ | "Compétences humaines" + "Compétences techniques" |

---

### Chacune de mes compétences — articles individuels — 30 pts (estimé : ~30/30)

| Critère | Status | Notes |
|---------|--------|-------|
| Page dédiée par compétence (`/competences/[slug]`) | ✅ | 10 pages créées |
| Article structuré (paragraphes, sous-titres, caractères gras) | ✅ | Sections avec headings |
| **Définition** : définir la compétence dans un contexte pro + actualité | ✅ | Section "Définition" dans chaque article |
| **Éléments de preuve** : 1-3 anecdotes concrètes | ✅ | 1-3 anecdotes par compétence |
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
| Accessibles par un sous-menu | ✅ | Dropdown desktop + accordéon mobile dans la navbar |

---

### Mes réalisations — page commune — 5 pts (estimé : 5/5)

| Critère | Status | Notes |
|---------|--------|-------|
| Au nombre de 5 minimum, regroupées sur une page commune | ✅ | 5 réalisations sur `/realisations` |
| Accessible par le menu principal | ✅ | "Réalisations" dans le menu |
| Liste/pavés : chaque item pointe vers une réalisation spécifique | ✅ | Cards avec liens vers pages détail |
| Court descriptif par item | ✅ | shortDescription sur chaque card |

---

### Chacune de mes réalisations — articles individuels — 20 pts (estimé : ~20/20)

| Critère | Status | Notes |
|---------|--------|-------|
| Accessible depuis la page commune des réalisations | ✅ | Liens depuis `/realisations` |
| Accessible par un sous-menu | ✅ | Dropdown desktop + accordéon mobile dans la navbar |
| Nom évocateur (indépendant du contexte école/entreprise) | ✅ | Noms descriptifs (ex: "Migration Odoo v16 → v19") |
| Article spécifique, structuré, détaillé | ✅ | 7 sections par article |
| **Présentation/définition** du projet ou de la réalisation | ✅ | Section "Présentation" |
| **Objectifs, contexte, enjeu, risques** | ✅ | Section "Objectifs, contexte et enjeux" |
| **Étapes** — ce que j'ai fait | ✅ | Section "Les étapes — ce que j'ai fait" |
| **Acteurs** — les interactions | ✅ | Section "Les acteurs — les interactions" |
| **Résultats** — pour moi, pour l'entreprise | ✅ | Section "Les résultats" |
| **Lendemains** du projet (futur immédiat, à distance, aujourd'hui) | ✅ | Section "Les lendemains du projet" |
| **Regard critique** | ✅ | Section "Mon regard critique" |
| En fin d'article : liste des compétences rattachées + liens | ✅ | Section "Compétences rattachées" avec liens vers `/competences/[slug]` |

---

### Mon parcours — frise chronologique — 5 pts (estimé : 5/5)

| Critère | Status | Notes |
|---------|--------|-------|
| Matérialisé sur une frise ou un axe | ✅ | Timeline animée dans ExperienceSection (GSAP) |
| Anti-chronologique | ✅ | Du plus récent au plus ancien |
| Accessible par le menu | ✅ | Section dans la homepage, accessible via "Accueil" |

---

### Pour chacune de mes expériences — 5 pts (estimé : 5/5)

#### Expérience en entreprise — 1er niveau de lecture

| Critère | Status | Notes |
|---------|--------|-------|
| Période (du xx au xx) | ✅ | "Déc. 2025 — Présent", "Mai — Oct. 2025" |
| Poste occupé | ✅ | "Développeur Fullstack — Alternance" |
| Lieu (nom société + **LOGO**) | ✅ | Logo + nom avec lien vers le site |

#### Expérience en entreprise — 2ème niveau de lecture (survol/popup/page dédiée)

| Critère | Status | Notes |
|---------|--------|-------|
| Responsabilité (chef de projet, etc.) | ✅ | Responsabilités listées explicitement dans chaque carte |
| Statut (stagiaire, alternant) | ✅ | "Alternance", "Stagiaire" mentionnés |
| Détail des missions | ✅ | Descriptions enrichies dans les cards |
| Liens vers réalisations et compétences rattachées | ✅ | Liens croisés ajoutés depuis la timeline |

#### Formation — 1er niveau de lecture

| Critère | Status | Notes |
|---------|--------|-------|
| Période | ✅ | "2024 — Présent" |
| Diplôme/titre/niveau atteint | ✅ | DWWM RNCP 5, CDA RNCP 6, Mastère RNCP 7 |
| Lieu (nom établissement + **LOGO** pointant vers le site) | ✅ | Logo ISCOD + lien vers le site |

#### Formation — 2ème niveau de lecture

| Critère | Status | Notes |
|---------|--------|-------|
| Présentation de l'établissement / vision de la pédagogie | ✅ | Description Simplon + ISCOD ajoutée dans le 2ème niveau de lecture de la timeline |

#### Test ou certification

| Critère | Status | Notes |
|---------|--------|-------|
| Date et intitulé | ✅ | TOEIC 920/990 (Listening C1, Reading B2), formations certifiantes datées |

---

### Navigation circulaire — (critère transversal, pas de points dédiés)

| Critère | Status | Notes |
|---------|--------|-------|
| Chaque compétence → réalisations rattachées (liens) | ✅ | Liens en fin d'article compétence vers `/realisations/[slug]` |
| Chaque réalisation → compétences rattachées (liens) | ✅ | Liens en fin d'article réalisation vers `/competences/[slug]` |

---

### Espace contact — 2 pts (estimé : 2/2)

| Critère | Status | Notes |
|---------|--------|-------|
| Accessible par le menu principal | ✅ | "Contact" dans le menu |
| OU présent dans chaque page | ✅ | Email + liens sociaux dans le footer |

---

### Orthographe — Retrait d'1% toutes les 5 fautes

| Critère | Status | Notes |
|---------|--------|-------|
| Orthographe corrigée | ✅ | Contenu relu, accents français corrects |

---

## Score ISCOD estimé

| Critère | Points max | Score estimé | Status |
|---------|-----------|-------------|--------|
| Page d'accueil | 5 | 5 | ✅ |
| Menu | 3 | 3 | ✅ |
| Article de présentation générale | 15 | ~14 | ✅ |
| Mes compétences (page commune) | 10 | ~9 | ✅ |
| Chacune de mes compétences (articles) | 30 | ~30 | ✅ |
| Mes réalisations (page commune) | 5 | 5 | ✅ |
| Chacune de mes réalisations (articles) | 20 | ~20 | ✅ |
| Mon parcours (frise) | 5 | 5 | ✅ |
| Détail expériences | 5 | 5 | ✅ |
| Navigation circulaire | — | ✅ | ✅ |
| Espace contact | 2 | 2 | ✅ |
| Orthographe | -1%/5 fautes | 0 retrait | ✅ |
| **TOTAL** | **100** | **~99/100** | ✅ |

---

## Améliorations restantes

### Grille ISCOD
- Aucun manque bloquant identifié après les dernières corrections.
- Points à relire humainement avant rendu : orthographe fine, cohérence du ton, et validation que les formulations correspondent bien à ton vécu exact.

### Best practices hors grille
- Ajouter des preuves humaines si disponibles : attestations, recommandations, retours de collègues ou encadrants.
- Continuer à affiner les métriques d'impact lorsqu'elles deviennent plus précises : temps gagné réel, fréquence d'usage, réduction d'erreurs mesurée.

---

## Checklist générale (best practices, hors grille ISCOD)

### Homepage & Introduction

| Item | Status | Notes |
|------|--------|-------|
| Professional headline describing your role | ✅ | "Développeur Fullstack" via i18n |
| Brief personal summary / elevator pitch | ✅ | About section with autodidact → Simplon → ISCOD journey |
| Professional headshot or avatar | ✅ | Headshot in navbar + hero |
| Clear call-to-action for employers | ✅ | Réalisations + contact en CTA principal dans le hero |
| Social proof (awards, certifications, recognition) | ✅ | Section Documents sur la homepage + RNCP, TOEIC, CV PDF et chiffres clés disponibles dans `public/proofs` / contenus projet |

### Projects Section

| Item | Status | Notes |
|------|--------|-------|
| 4-6 highlighted projects | ✅ | 5 réalisations détaillées + 22 modules Odoo open source sur `/projects` |
| Clear descriptions and objectives | ✅ | Bilingual summary + details per project |
| Technologies used listed | ✅ | Odoo + Python badges on each card |
| GitHub repository links | ✅ | Each project links to GitHub |
| Screenshots or video demos | ✅ | Captures Odoo/corporate/CAP2vie + vidéos CAP2vie intégrées aux pages réalisations |
| Your specific role and contributions | ✅ | Explicit in `/realisations` and strengthened on Odoo module detail pages |
| Challenges solved and solutions | ✅ | Odoo module pages now include business problem, solution, technical highlight and impact |
| Measurable results and impact | ✅ | Added available metrics: 16 modules, ~10 third-party modules, 19 direct Odoo users, ~30 employees impacted, 1-month stabilization, Lighthouse score |

### Technical Skills

| Item | Status | Notes |
|------|--------|-------|
| Programming languages with proficiency levels | ✅ | Radar chart + level badges on `/competences` |
| Frameworks and libraries | ✅ | Symfony, Next.js, React, Vue.js, Odoo, etc. |
| Development tools and environments | ✅ | Git, Docker, Shell, Linux, CI/CD |
| Database technologies | ✅ | PostgreSQL, Redis |
| Cloud platforms and services | ✅ | VPS (OVH, Digital Ocean), Vercel |
| Skills categorized by expertise level | ✅ | Radar chart + Débutant/Intermédiaire/Avancé/Expert |

### Professional Experience

| Item | Status | Notes |
|------|--------|-------|
| Relevant work history | ✅ | 1UP fullstack dev (Dec 2025–Present) |
| Internships and apprenticeships | ✅ | LIG Lab internship (May–Oct 2025) |
| Open source contributions | ✅ | 22 Odoo modules on GitHub |

### Performance & Responsive Design

| Item | Status | Notes |
|------|--------|-------|
| Page load time under 3 seconds | ✅ | Static site via SSG on Vercel |
| Mobile-first approach | ✅ | Tailwind CSS mobile-first breakpoints |
| Responsive design (all breakpoints) | ✅ | sm/md/lg/xl breakpoints throughout |
| Touch-friendly navigation | ✅ | Mobile hamburger menu |

### SEO

| Item | Status | Notes |
|------|--------|-------|
| Meta titles and descriptions | ✅ | Per-page via `generateMetadata()` |
| Open Graph tags | ✅ | OG title, description, locale, dynamic OG image |
| Schema markup / JSON-LD | ✅ | Person + WebSite + ProfilePage JSON-LD in locale layout |
| XML sitemap | ✅ | `src/app/sitemap.ts` — includes all new pages |
| Robots.txt | ✅ | `src/app/robots.ts` |
| Canonical URLs | ✅ | `metadataBase` + `alternates.canonical` |
| Semantic HTML | ✅ | `<nav>`, `<main>`, `<footer>`, `<section>` |
| Clean URL structure | ✅ | Locale-prefixed (`/fr/contact`, `/en/articles`) |
| Discoverable article topics | ✅ | Tags cliquables et recherche texte sur titre, contenu MDX indexé et tags, avec filtres synchronisés dans l'URL |

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
| Unit tests | ✅ | Vitest + jsdom + React Testing Library configured, 17 unit test files, 107 tests passing |
| Browser component tests | ✅ | Vitest Browser Mode + Playwright configured with visual baselines |
| Visual regression tests | ✅ | `toMatchScreenshot()` |
| E2E tests | ✅ | Playwright infrastructure |
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
| Smooth scrolling | ✅ | Lenis + GSAP ticker |
| Scroll-triggered animations | ✅ | GSAP ScrollTrigger throughout |
| Dark/light mode | ✅ | `next-themes` with system detection |
| Page transitions | ✅ | Fade + y-translate (0.4s) |
| i18n (FR + EN) | ✅ | Dictionary-based, locale routing |
