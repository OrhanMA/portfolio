# Prévalidation de rendu ISCOD — 15 septembre 2026

> **Fiche d'archive**
> - **Date :** 15 septembre 2026.
> - **Nature :** prévalidation de rendu d'un candidat local précis.
> - **État :** document historique conservé avec ses commandes, résultats et limites.
> - **Suite :** aucun rapport plus récent n'est indexé.
> - **Avertissement :** ce rapport ne certifie ni les modifications postérieures, ni le déploiement actuellement accessible.

## Verdict

Le candidat local est techniquement **valide avec réserves de finalisation**.
Toutes les vérifications automatisables de ce candidat ont réussi, et les deux
corrections d'articles sont confirmées dans le rendu du build de production
local. Le rendu ne peut pas encore être qualifié de version finale traçable :
les changements ne sont pas committés et le déploiement public accessible ne
peut pas être relié à ce candidat par l'espace Vercel connecté.

Les vérifications humaines et les intégrations réelles restent volontairement
non certifiées : aucun message de formulaire n'a été envoyé, aucun téléphone
physique ni lecteur d'écran humain n'est disponible ici, et aucun aperçu de
partage n'a été publié.

## Candidat inspecté

| Élément | Valeur |
| --- | --- |
| Date | 15 septembre 2026 |
| Base Git | `08d91cf` — `test: align E2E coverage with editorial UI` |
| Modifications à figer | `src/app/[locale]/articles/docker-dangling-images/page.mdx`, `src/app/[locale]/articles/odoo-session-timeout/page.mdx`, `src/components/theme-portrait.tsx` |
| Garde-fou ajouté | `/tmp/` ignoré par Git, afin que les artefacts de préparation ne soient pas ajoutés à la livraison |
| État des espaces de diff | `git diff --check` réussi |
| Outils | Node 22.23.2, pnpm 10.20.0, Next.js 16.3.4 |

Les retouches MDX ne changent pas le fond : elles corrigent respectivement
« Dizaines de Go » en « Des dizaines de Go » et « en shell psql » en « à un
shell psql ». Les deux textes sont apparus correctement dans l'arbre
d'accessibilité du build local, avec un H1, un sommaire et les liens attendus.

## Contrôles locaux exécutés

| Contrôle | Résultat |
| --- | --- |
| `pnpm install --frozen-lockfile` | Réussi ; lockfile à jour |
| `pnpm lint` | Réussi après correction de deux avertissements `alt` sur `ThemePortrait` |
| `pnpm typecheck` | Réussi |
| `pnpm audit:security` | Aucune vulnérabilité connue |
| `pnpm test` | 57 fichiers, 306 tests réussis |
| `pnpm test:coverage` | 53 fichiers, 283 tests unitaires ; lignes 85,20 %, branches 72,18 % |
| `pnpm build` | Réussi ; 125 routes générées |
| `pnpm check:bundle` | Réussi ; budgets JS et CSS respectés |
| `pnpm check:performance` | Réussi ; quatre routes du build courant mesurées |
| `pnpm test:e2e` | 47 scénarios Chromium réussis |

`ThemePortrait` exige maintenant un texte alternatif dans son type et le passe
explicitement aux deux images clair/sombre. Cela transforme un avertissement
ESLint en contrat vérifiable, sans modifier la présentation ni le contenu.

## Production et contenu vérifiés

| Contrôle | Résultat observé |
| --- | --- |
| Domaine public | `https://orhanmadiassani.com` répond en HTTPS, servi par Vercel |
| Sitemap public | 116 URL découvertes ; 116 réponses HTTP 200 |
| Pages échantillonnées | `/fr`, `/en`, les deux versions de CAP2vie, `/fr/contact`, `/fr/a-propos` : H1 unique, canonical exacte, alternates FR/EN/x-default et quatre blocs JSON-LD |
| Sécurité HTTP | CSP à nonce, HSTS, `nosniff`, `DENY`, Referrer-Policy et Permissions-Policy observés sur `/fr` |
| Parcours public | Accueil FR, bascule EN et contact FR vérifiés dans le navigateur ; identité, portrait, navigation, 10 compétences, réalisations, parcours, documents et formulaire sont visibles |
| Liens externes visibles | 49 contrôlés ; 45 répondent en 2xx/3xx. OpenAI, LinkedIn et deux attributions Pexels retournent un refus automatisé ; aucun échec HTTP non attribuable à un blocage de robot |

Les annotations de langue sont produites par Next sous la forme `hrefLang` dans
la réponse HTML. La recherche initiale, sensible à la casse, ne les voyait pas ;
la réponse locale et la réponse publique contiennent bien les trois alternates.

## Réserves à fermer avant de déclarer « prêt à rendre »

1. **Figer et publier.** Créer le commit qui contient les trois fichiers
   retenus, déployer ce commit, puis noter l'URL Vercel, le SHA et la date dans
   le relevé de preuves. Vérifier de nouveau que les deux corrections MDX sont
   présentes sur cette URL.
2. **Tester le formulaire réel avec autorisation.** Envoyer un unique message
   de test vers la boîte cible, confirmer sa réception sans conserver son
   contenu dans Git, puis contrôler séparément les protections honeypot et
   soumission trop rapide.
3. **Faire les essais humains.** Tester un téléphone physique, VoiceOver ou
   NVDA, et trois parcours non guidés. Consigner seulement l'appareil, le
   scénario, le résultat et le correctif éventuel dans le relevé de preuves.
4. **Mesurer la performance de la version publiée.** Exécuter trois Lighthouse
   mobiles sur CAP2vie avec un protocole constant ; enregistrer les trois LCP,
   leur médiane et toute décision si la cible de 3 s n'est pas atteinte.
5. **Tester le partage.** Vérifier les aperçus LinkedIn et WhatsApp après
   déploiement. Les refus automatisés de LinkedIn ne constituent pas une
   preuve de lien cassé.
6. **Préparer le jury.** Utiliser la fiche de preuve, l'URL finale et un
   parcours de démonstration de cinq à sept minutes ; conserver des captures
   datées des routes principales comme secours hors connexion.

## Fiche jury prête à compléter

- **URL finale :** à renseigner après déploiement du commit figé.
- **Version :** à renseigner avec le SHA final.
- **Structure :** accueil, présentation, 10 compétences, 5 réalisations,
  parcours, contact et documents publics.
- **Parcours conseillé :** proposition de valeur → réalisation Odoo →
  compétence humaine → compétence technique → liens réciproques → parcours →
  contact et preuves.
- **Réserves à expliquer sans les masquer :** métriques métier non publiables,
  performance Lighthouse à confirmer en production et validations humaines en
  attente, le cas échéant.
