# Configuration locale et production

Ce guide décrit les paramètres nécessaires après le clonage du dépôt. Les valeurs secrètes restent dans `.env.local` en local et dans le gestionnaire de variables de la plateforme en production.

## Préparer l'environnement

Depuis la racine du dépôt :

```bash
nvm use
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
```

Le modèle `.env.example` est la référence des variables prises en charge. Ne jamais committer `.env.local`, une clé, un jeton ni une adresse privée.

## Variables d'environnement

| Variable | Exposition | Nécessité | Usage |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | serveur, secrète | requise pour envoyer | Authentifie l'appel à Resend. |
| `CONTACT_EMAIL` | serveur | requise pour envoyer | Reçoit les messages du formulaire. |
| `FROM_EMAIL` | serveur | requise pour envoyer | Adresse d'expédition autorisée par Resend. |
| `UPSTASH_REDIS_REST_URL` | serveur, secrète | requise en production | URL REST de la base Upstash utilisée par le rate limit. |
| `UPSTASH_REDIS_REST_TOKEN` | serveur, secrète | requise en production | Jeton REST de la base Upstash utilisée par le rate limit. |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | navigateur, publique | optionnelle | Charge reCAPTCHA v3 à l'intention. |
| `RECAPTCHA_SECRET_KEY` | serveur, secrète | optionnelle avec la clé publique | Vérifie le jeton reCAPTCHA. |
| `RECAPTCHA_ALLOWED_HOSTNAMES` | serveur | recommandée avec reCAPTCHA | Liste les hôtes autorisés, séparés par des virgules. |
| `NEXT_PUBLIC_GTM_ID` | navigateur, publique | optionnelle | Configure le conteneur Google Tag Manager. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | navigateur, publique | optionnelle | Configure GA4 directement lorsqu'aucun GTM n'est utilisé. |

Le formulaire applique une limite partagée par empreinte d'adresse IP dans Upstash Redis. Elle complète reCAPTCHA, le honeypot et le contrôle temporel, et reste cohérente entre les instances serverless. Si Redis est absent ou indisponible, le formulaire échoue fermé : aucun e-mail n'est envoyé.

## Resend

1. Créer ou ouvrir un compte sur [Resend](https://resend.com).
2. Créer une clé API et la placer dans `RESEND_API_KEY`.
3. Définir `CONTACT_EMAIL` avec l'adresse autorisée à recevoir les messages.
4. En développement, utiliser l'adresse sandbox recommandée par Resend dans `FROM_EMAIL`.
5. En production, ajouter le domaine d'envoi, publier les enregistrements DNS demandés et attendre sa validation avant d'utiliser une adresse de ce domaine.

Les limitations et quotas des offres évoluent : consulter la documentation et le tableau de bord Resend au moment de la configuration au lieu de se fier à une valeur figée dans ce dépôt.

## Google reCAPTCHA v3

1. Créer un site reCAPTCHA v3 depuis la [console d'administration](https://www.google.com/recaptcha/admin).
2. Déclarer `localhost` pour les essais locaux et chaque hostname de production réellement servi.
3. Copier la clé publique dans `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` et le secret dans `RECAPTCHA_SECRET_KEY`.
4. Définir `RECAPTCHA_ALLOWED_HOSTNAMES` avec les hostnames attendus, sans protocole ni chemin.

Le formulaire charge le script uniquement après un focus ou une tentative d'envoi. Le serveur exige l'action `contact_form`, un hostname autorisé, un jeton récent et un score d'au moins `0.5`. Si les deux clés ne sont pas configurées, reCAPTCHA et sa mention ne sont pas rendus ; le honeypot, le contrôle temporel et le rate limit restent actifs.

## Limitation durable du formulaire

1. Créer une base Redis dans [Upstash](https://console.upstash.com/redis), idéalement dans une région proche du déploiement Vercel.
2. Ajouter `UPSTASH_REDIS_REST_URL` et `UPSTASH_REDIS_REST_TOKEN` dans les environnements Vercel Preview et Production. Ne jamais les préfixer par `NEXT_PUBLIC_`.
3. La limite est de cinq tentatives par heure et par empreinte IP hachée, selon une fenêtre glissante stockée dans Redis.
4. En cas de variable manquante, d'erreur réseau ou d'erreur Upstash, le formulaire répond temporairement indisponible et n'appelle pas Resend.

L'intégration Upstash installée depuis Vercel peut fournir les mêmes secrets sous les noms `UPSTASH_REDIS_REST_KV_REST_API_URL` et `UPSTASH_REDIS_REST_KV_REST_API_TOKEN`. Le code accepte aussi ces noms générés ; il ne faut ni les afficher ni les recopier dans le dépôt.

Après configuration, vérifier au minimum :

- qu'une requête normale peut atteindre l'action serveur ;
- que cinq tentatives successives depuis la même IP épuisent la fenêtre Redis partagée ;
- qu'une indisponibilité Redis empêche réellement l'appel à Resend ;
- que les secrets n'apparaissent ni dans le bundle client ni dans les journaux publiés.

## Mesure d'audience et consentement

Deux modes sont pris en charge :

- `NEXT_PUBLIC_GTM_ID` pour Google Tag Manager ;
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` pour GA4 direct lorsqu'aucun identifiant GTM n'est fourni.

Les scripts de mesure restent désactivés tant que la personne n'a pas accepté la catégorie Analytics. Le consentement est versionné, expire après six mois, peut être réouvert depuis le footer et peut être retiré. Aucun iframe `<noscript>` ne contourne ce choix.

Si aucune variable Analytics n'est définie, aucun script de mesure n'est chargé.

## Déploiement Vercel

1. Relier le projet au dépôt Git approprié.
2. Configurer les variables dans les environnements Vercel concernés : Preview et Production au minimum.
3. Vérifier le domaine personnalisé et ses enregistrements DNS.
4. Reporter le domaine final dans Resend et reCAPTCHA.
5. Construire la version candidate et exécuter les contrôles de qualité avant la promotion.
6. Après déploiement, vérifier les routes FR/EN, le formulaire, le consentement, les en-têtes de sécurité, le sitemap et les services externes.

Les variables préfixées `NEXT_PUBLIC_` sont intégrées au code client pendant le build. Elles ne doivent jamais contenir de secret.

## Outils MCP du dépôt

Le fichier `.mcp.json` déclare les deux serveurs actuellement versionnés :

- `next-devtools`, pour l'inspection d'un serveur Next.js et la documentation officielle disponible par le serveur ;
- `playwright-test`, pour les outils de planification, génération ou diagnostic Playwright lorsqu'ils sont exposés par l'environnement.

Ces outils complètent les commandes du dépôt ; ils ne remplacent ni les tests exécutables ni la vérification du diff. Aucun serveur Resend MCP n'est configuré dans `.mcp.json`.

## Checklist de mise en service

- [ ] `.env.local` a été créé depuis `.env.example` sans être ajouté à Git.
- [ ] L'installation utilise Node.js 22 et pnpm 10.20.0.
- [ ] Resend envoie depuis une adresse autorisée vers le destinataire prévu.
- [ ] Upstash Redis est configuré dans Preview et Production ; une panne du service bloque l'envoi du formulaire.
- [ ] Le domaine de production est validé par Resend.
- [ ] reCAPTCHA accepte uniquement les hostnames attendus, s'il est activé.
- [ ] GTM ou GA4 reste absent avant consentement, s'il est activé.
- [ ] Les routes `/fr` et `/en`, le sitemap et les pages légales répondent sur le déploiement final.
- [ ] Un envoi de contact autorisé et les principaux rejets anti-spam ont été vérifiés sans exposer de données privées.
- [ ] Le SHA du commit, l'URL du déploiement et la date de recette sont consignés dans un rapport daté.
