# Configuration manuelle

Ce document liste toutes les etapes de configuration necessaires apres le clonage du projet.

---

## 1. Variables d'environnement

Creer un fichier `.env.local` a la racine du projet (copier `.env.local.example` si disponible) :

```env
# Resend — Email provider
RESEND_API_KEY=re_VOTRE_CLE_API
CONTACT_EMAIL=votre-email@exemple.com
FROM_EMAIL=Contact Portfolio <onboarding@resend.dev>

# Google reCAPTCHA v3 (optionnel mais recommande en production)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=votre_cle_site
RECAPTCHA_SECRET_KEY=votre_cle_secrete
RECAPTCHA_ALLOWED_HOSTNAMES=orhanmadiassani.com,www.orhanmadiassani.com

# Upstash Redis / Vercel KV (obligatoire en production)
UPSTASH_REDIS_REST_URL=https://votre-base.upstash.io
UPSTASH_REDIS_REST_TOKEN=votre_jeton_secret

# Google Analytics (optionnel)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 2. Resend (envoi d'emails)

### Obtenir une cle API

1. Creer un compte sur [resend.com](https://resend.com)
2. Aller dans **API Keys** > **Create API Key**
3. Copier la cle dans `RESEND_API_KEY`

### Mode sandbox (developpement)

En developpement, utiliser l'adresse sandbox fournie par Resend :
```
FROM_EMAIL=Contact Portfolio <onboarding@resend.dev>
```
Les emails ne seront envoyes qu'a l'adresse email du compte Resend.

### Mode production (domaine verifie)

1. Aller dans **Domains** > **Add Domain** sur [resend.com/domains](https://resend.com/domains)
2. Ajouter votre domaine (ex: `votre-domaine.com`)
3. Configurer les enregistrements DNS demandes (MX, SPF, DKIM)
4. Attendre la verification (quelques minutes a quelques heures)
5. Mettre a jour `.env.local` :
   ```
   FROM_EMAIL=Contact <contact@votre-domaine.com>
   ```

### Limites du sandbox

- Seul le proprietaire du compte Resend peut recevoir les emails
- 100 emails/jour maximum
- L'adresse d'envoi est fixe (`onboarding@resend.dev`)

---

## 3. Google reCAPTCHA v3

### Pourquoi reCAPTCHA v3 ?

reCAPTCHA v3 est invisible pour les utilisateurs. Il attribue un score (0 a 1) a chaque interaction. Le formulaire rejette les soumissions avec un score < 0.5.

### Configuration

1. Aller sur [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. Cliquer **+** pour creer un nouveau site
3. Choisir **reCAPTCHA v3**
4. Ajouter vos domaines :
   - `localhost` (pour le developpement)
   - `votre-domaine.com` (pour la production)
   - `www.votre-domaine.com` (si applicable)
5. Copier les cles :
   - **Cle du site** → `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - **Cle secrete** → `RECAPTCHA_SECRET_KEY`

### Fonctionnement sans reCAPTCHA

Si les variables `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` et `RECAPTCHA_SECRET_KEY` ne sont pas definies :
- Le script reCAPTCHA n'est pas charge
- La mention reCAPTCHA n'apparait pas sur la page
- Les autres protections anti-spam restent actives (honeypot, time check, rate limiting)

### Monitoring

Consulter le tableau de bord reCAPTCHA pour surveiller :
- Le trafic et les scores
- Les actions suspectes
- Le taux de faux positifs

La vérification serveur contrôle également que l'action vaut `contact_form`,
que le hostname appartient à `RECAPTCHA_ALLOWED_HOSTNAMES` et que le jeton a
moins de deux minutes. Le script client n'est téléchargé qu'au premier focus
dans le formulaire ou au moment de l'envoi.

---

## 4. Google Analytics

### Configuration

1. Creer un compte sur [analytics.google.com](https://analytics.google.com)
2. Creer une propriete pour votre site
3. Copier le **Measurement ID** (format: `G-XXXXXXXXXX`)
4. Ajouter dans `.env.local` :
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### Fonctionnement avec le consentement cookies

- Google Analytics est charge uniquement apres le consentement de l'utilisateur
- Si l'utilisateur refuse les cookies analytiques, aucun script GA n'est charge
- L'option `anonymize_ip: true` est activee par defaut pour la confidentialite
- Le consentement est stocke dans le localStorage du navigateur

### Fonctionnement sans Google Analytics

Si `NEXT_PUBLIC_GA_MEASUREMENT_ID` n'est pas defini :
- Le composant Analytics ne rend rien
- Aucun script Google n'est charge
- La banniere de cookies mentionne toujours les cookies analytiques (le consentement reste fonctionnel pour un ajout futur)

---

## 5. Deploiement (Vercel)

### Variables d'environnement

Sur Vercel, ajouter les variables dans **Settings** > **Environment Variables** :

| Variable | Type | Requis |
|----------|------|--------|
| `RESEND_API_KEY` | Secret | Oui |
| `CONTACT_EMAIL` | Plain text | Oui |
| `FROM_EMAIL` | Plain text | Oui |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Plain text | Recommande |
| `RECAPTCHA_SECRET_KEY` | Secret | Recommande |
| `RECAPTCHA_ALLOWED_HOSTNAMES` | Plain text | Recommande |
| `UPSTASH_REDIS_REST_URL` | Secret | Oui |
| `UPSTASH_REDIS_REST_TOKEN` | Secret | Oui |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Plain text | Optionnel |

> Les variables `NEXT_PUBLIC_*` sont exposees cote client. Ne jamais mettre de cle secrete dans une variable `NEXT_PUBLIC_`.

### Domaine personnalise

1. Dans Vercel : **Settings** > **Domains** > Ajouter votre domaine
2. Configurer les enregistrements DNS (CNAME ou A record)
3. Mettre a jour les domaines dans :
   - La configuration reCAPTCHA
   - Les domaines Resend
   - La propriete Google Analytics

### Rate limiting en production

Le rate limiter exécute un script Redis atomique pour conserver une fenêtre de
5 tentatives par heure entre toutes les instances serverless. Créer une base
[Upstash Redis](https://upstash.com) ou Vercel KV, puis exposer ses identifiants
REST. Les alias `KV_REST_API_URL` et `KV_REST_API_TOKEN` sont également pris en
charge. En production, l'envoi échoue volontairement si aucun stockage durable
n'est configuré ; il n'existe plus de fallback in-memory trompeur.

---

## 6. MCP (Model Context Protocol)

### Serveurs configures

Le fichier `.mcp.json` configure deux serveurs MCP pour Claude Code :

```json
{
  "mcpServers": {
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "next-devtools-mcp@latest"]
    },
    "resend": {
      "command": "npx",
      "args": ["-y", "resend-mcp"],
      "env": {
        "RESEND_API_KEY": "${RESEND_API_KEY}"
      }
    }
  }
}
```

### Resend MCP

Pour que le serveur MCP Resend fonctionne, la variable `RESEND_API_KEY` doit etre definie dans votre environnement shell ou dans un fichier `.env` charge par votre terminal.

---

## 7. Internationalisation (i18n)

### Langues supportees

- **Francais** (par defaut) — `/fr/`
- **Anglais** — `/en/`

### Ajouter des traductions

Les dictionnaires se trouvent dans :
- `src/app/[locale]/dictionaries/fr.json`
- `src/app/[locale]/dictionaries/en.json`

Pour ajouter de nouvelles cles, mettre a jour **les deux fichiers** avec la meme structure.

### Articles MDX

Les articles MDX restent dans leur langue originale (francais). Les metadonnees (titre, description) sont traduites dans les dictionnaires. Pour le contenu des articles, les utilisateurs peuvent utiliser la traduction automatique de leur navigateur.

### Ajouter une nouvelle langue

1. Ajouter le code locale dans `src/lib/i18n.ts` → `locales`
2. Creer un nouveau fichier dictionnaire (ex: `es.json`)
3. Ajouter l'import dans `src/app/[locale]/dictionaries.ts`
4. La middleware detectera automatiquement la nouvelle langue via `Accept-Language`

---

## 8. Recapitulatif des etapes

- [ ] Creer un compte Resend et obtenir une cle API
- [ ] Configurer `.env.local` avec la cle Resend
- [ ] (Optionnel) Creer un projet reCAPTCHA v3 et ajouter les cles
- [ ] (Optionnel) Creer une propriete Google Analytics et ajouter le Measurement ID
- [ ] Creer une base Upstash Redis/Vercel KV et ajouter les identifiants REST
- [ ] Tester le formulaire de contact en local (`pnpm dev`)
- [ ] (Production) Verifier un domaine sur Resend
- [ ] (Production) Mettre a jour `FROM_EMAIL` avec le domaine verifie
- [ ] (Production) Ajouter les domaines de production dans reCAPTCHA
- [ ] Deployer et configurer les variables d'environnement sur la plateforme
