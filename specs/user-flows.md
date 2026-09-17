# Plan des parcours utilisateurs

## Objet

Ce plan couvre les comportements publics du portfolio bilingue. Il sert de carte de recette ; les assertions exécutables se trouvent dans `e2e/*.spec.ts`.

Base locale par défaut : `http://localhost:3000`.

## 1. Navigation principale

### Objectif

Une personne peut atteindre les sections principales, les pages de synthèse et les fiches détaillées depuis la navigation adaptée à son écran.

### Scénarios

- Charger l'accueil français et vérifier le titre principal, l'identité et les destinations majeures.
- Ouvrir les sous-menus de compétences et réalisations sur desktop.
- Ouvrir et fermer la navigation mobile, y compris avec Échap et restitution du focus.
- Parcourir À propos, Parcours, Compétences, Réalisations, Projets Odoo, Articles et Contact.
- Suivre les liens vers une compétence, une réalisation, une expérience, une formation et un module Odoo.
- Utiliser les ancres du parcours depuis une navigation directe.
- Vérifier qu'une URL inconnue rend la page 404 appropriée.

### Résultat attendu

Les liens sont visibles, nommés, activables au clavier et conservent la locale. Aucun panneau ne reste ouvert après une navigation.

## 2. Internationalisation

### Objectif

Le français et l'anglais rendent le même parcours fonctionnel sans perdre le contexte utile.

### Scénarios

- Charger `/` et vérifier la redirection selon la préférence puis `Accept-Language`.
- Vérifier les contenus et l'attribut `lang` sur `/fr` et `/en`.
- Changer de langue depuis une page de synthèse, une fiche et un article.
- Préserver les paramètres `q` et `tag` de la liste d'articles.
- Préserver une ancre d'article lorsqu'un titre équivalent existe.
- Vérifier la persistance de la préférence au fil de la navigation.
- Vérifier qu'un changement complet de locale renouvelle correctement le nonce CSP.

### Résultat attendu

La destination logique, les paramètres utiles et les ancres compatibles sont conservés. Le contenu rendu et ses métadonnées utilisent la bonne langue.

## 3. Articles bilingues

### Objectif

Chaque article rend son corps localisé, sa structure éditoriale et ses outils de lecture.

### Scénarios

- Parcourir tous les articles dans les deux locales.
- Vérifier le masthead, le temps de lecture, le sommaire et les articles liés.
- Vérifier les ancres `h2` et `h3` après un changement de langue.
- Copier un lien de titre et observer le retour utilisateur.
- Filtrer par tag, saisir une recherche, effacer rapidement la recherche et naviguer dans l'historique.
- Désactiver JavaScript et vérifier que la liste conserve des liens vers les articles.

### Résultat attendu

Le corps, le temps de lecture, la recherche et les ancres correspondent à la locale. Les filtres ne constituent jamais l'unique accès aux articles.

## 4. Contact et anti-spam

### Objectif

Le formulaire reste compréhensible et validé sans exposer de donnée dans l'URL.

### Scénarios

- Charger les pages Contact française et anglaise.
- Vérifier labels, champs, sujet, compteur, liens de confidentialité et bouton d'envoi.
- Soumettre un formulaire vide et relier chaque erreur à son champ.
- Choisir le motif « Autre » et vérifier le sujet personnalisé.
- Refuser le stockage navigateur et conserver une page utilisable.
- Désactiver JavaScript et vérifier le fallback de contact sûr.
- Sur un environnement autorisé, contrôler séparément envoi valide, honeypot, délai minimal, rate limit et reCAPTCHA.

### Résultat attendu

Les erreurs sont annoncées de manière accessible, aucune donnée de message ne passe dans l'URL et les protections échouent sans révéler de secret.

## 5. Consentement et mesure d'audience

### Objectif

Aucun script Analytics ne se charge avant un consentement explicite, et le choix reste modifiable.

### Scénarios

- Vérifier l'apparition initiale de la bannière.
- Accepter, refuser puis recharger la page.
- Ouvrir les préférences depuis le footer.
- Retirer un consentement déjà accordé.
- Simuler un échec de stockage.
- Vérifier l'absence d'Analytics lorsque la catégorie est refusée ou non configurée.

### Résultat attendu

Le choix persiste lorsque le stockage fonctionne, l'interface reste utilisable lorsqu'il échoue et aucun fallback `<noscript>` ne contourne le consentement.

## 6. Thème, mouvement et rendu visuel

### Objectif

Les thèmes clair et sombre, les visuels atmosphériques et les variantes de mouvement restent lisibles.

### Scénarios

- Basculer le thème depuis plusieurs routes et vérifier sa persistance.
- Vérifier l'accueil en desktop, mobile et sombre.
- Contrôler le portrait clair/sombre et le fond vidéo avec son poster.
- Activer `prefers-reduced-motion` et vérifier la présence immédiate du contenu ainsi que le fallback statique.
- Vérifier les pages secondaires aux principaux breakpoints sans débordement horizontal.

### Résultat attendu

Le contenu reste prioritaire, le changement de thème ne produit pas d'erreur CSP et la réduction des mouvements supprime les animations non essentielles.

## 7. Accessibilité et contrôles interactifs

### Objectif

Chaque route publique et chaque contrôle respectent leurs contrats sémantiques et clavier.

### Scénarios

- Parcourir les liens, boutons, disclosures, sélecteurs, champs et contrôles média au clavier.
- Vérifier noms accessibles, états `aria-expanded`, associations label/champ, descriptions d'erreur et focus visibles.
- Exécuter Axe sur toutes les routes publiques des deux locales.
- Vérifier les variantes desktop et mobile des contrôles de navigation.
- Vérifier les contrôles de copie, recherche, thème, langue et vidéo.

### Résultat attendu

Aucune violation Axe couverte par la suite n'est présente, le focus ne se perd pas et chaque contrôle annonce correctement son rôle et son état.

## 8. Sitemap, liens et données structurées

### Objectif

Les routes déclarées, liens internes et métadonnées forment un graphe cohérent.

### Scénarios

- Charger toutes les URL du sitemap.
- Vérifier les liens internes rendus côté serveur et côté client.
- Vérifier H1, canonical, alternates FR/EN/x-default et données structurées.
- Naviguer côté client et confirmer la mise à jour du JSON-LD.
- Contrôler les liens réciproques compétences, réalisations et expériences.

### Résultat attendu

Chaque destination interne existe, conserve sa locale et expose les métadonnées attendues sans relation orpheline.

## 9. Médias et preuves

### Objectif

Les médias documentaires restent consultables, attribués et distingués des illustrations.

### Scénarios

- Vérifier les galeries de preuves Odoo pour les locales, thèmes et viewports couverts.
- Vérifier les documents publics du footer.
- Vérifier les attributions externes des photographies de projet.
- Activer les lecteurs vidéo uniquement après une action explicite.

### Résultat attendu

Les médias ne provoquent pas de débordement, les contrôles ont un nom accessible et une illustration n'est pas présentée comme preuve d'un système client.

## 10. Frontières d'exécution et robustesse

### Objectif

Le site reste stable dans les configurations dégradées couvertes.

### Scénarios

- Surveiller les erreurs navigateur non capturées sur des routes représentatives.
- Refuser le stockage navigateur.
- Désactiver JavaScript.
- Utiliser un fuseau horaire occidental et vérifier les dates calendaires.
- Exécuter une recherche rapide produisant plusieurs intentions successives.

### Résultat attendu

La page reste utilisable, les dates ne changent pas de jour, la dernière intention de recherche gagne et aucune donnée sensible n'est exposée.

## Correspondance avec les suites E2E

Les familles précédentes correspondent notamment aux specs `navigation`, `i18n`, `article-layout`, `contact`, `cookie-consent`, `homepage-visual`, `accessibility-motion`, `site-accessibility`, `interactive-controls`, `runtime-boundaries`, `secondary-pages`, `sitemap` et `odoo-evidence-media`.

Lorsqu'un fichier de test est ajouté, renommé ou découpé, mettre à jour cette correspondance sans recopier toutes ses assertions.
