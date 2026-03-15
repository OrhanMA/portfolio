# Portfolio — Fullstack Developer

Bilingual personal portfolio built with Next.js 16, GSAP animations, shadcn/ui components, Lenis smooth scroll, and a comprehensive testing stack.

## Tech Stack

- **Framework** : Next.js 16.1.6 (App Router, Turbopack)
- **UI** : React 19, shadcn/ui (Base UI), Tailwind CSS v4
- **Animations** : GSAP 3 + @gsap/react (useGSAP, ScrollTrigger, Lenis)
- **Content** : MDX articles
- **i18n** : French (default) + English — `[locale]` dynamic segment, JSON dictionaries
- **Theme** : next-themes (dark/light mode)
- **Forms** : React Hook Form + Zod validation
- **Email** : Resend SDK (Server Action)
- **Anti-spam** : Honeypot + time check + rate limiting + reCAPTCHA v3
- **Cookie consent** : Custom GDPR-compliant banner with analytics opt-in
- **Analytics** : Google Tag Manager (consent-gated)
- **Language** : TypeScript (strict mode)
- **Fonts** : Roboto Flex (sans) + Geist Mono (mono) via `next/font/google`
- **Package manager** : pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

> See [MANUAL_CONFIGURATION.md](./MANUAL_CONFIGURATION.md) for Resend, reCAPTCHA, Google Analytics, and environment variable setup.

## Project Structure

```
src/
  app/
    layout.tsx                        # Root layout (fonts, CSS)
    not-found.tsx                     # Root 404 (bilingual fallback)
    globals.css                       # Global styles, shadcn vars, Lenis, gradient
    [locale]/
      layout.tsx                      # Locale layout (providers, navbar, footer)
      page.tsx                        # Landing page
      dictionaries.ts                 # getDictionary() loader
      dictionaries/
        fr.json                       # French translations
        en.json                       # English translations
      articles/
        page.tsx                      # Article listing
        [slug]/page.mdx               # MDX articles
      contact/
        page.tsx                      # Contact page (form + reCAPTCHA)
      actions/
        contact.ts                    # Server Action (Resend + anti-spam)
      mentions-legales/page.tsx       # Legal notice
      politique-confidentialite/      # Privacy policy
      not-found.tsx                   # Localized 404
  components/
    navbar.tsx                        # Fixed nav with theme toggle + language switcher
    footer.tsx                        # Footer (server component)
    contact-form.tsx                  # Contact form (RHF + Zod + honeypot)
    cookie-consent.tsx                # GDPR cookie consent banner
    analytics.tsx                     # Consent-gated Google Analytics
    language-switcher.tsx             # FR/EN language switcher
    dictionary-provider.tsx           # i18n React Context
    theme-provider.tsx                # next-themes provider
    theme-toggle.tsx                  # Dark/light mode toggle
    smooth-scroll.tsx                 # Lenis provider (GSAP ticker sync)
    page-transition.tsx               # GSAP page transitions
    set-lang.tsx                      # Dynamic <html lang> setter
    landing/                          # Landing page sections (hero, about, skills, etc.)
    ui/                               # shadcn/ui components
  lib/
    gsap.ts                           # Centralized GSAP plugin registration
    utils.ts                          # cn() utility + escapeHtml()
    i18n.ts                           # Locale constants
    recaptcha.ts                      # reCAPTCHA v3 helpers
    rate-limit.ts                     # In-memory IP rate limiter
    cookie-consent.ts                 # Cookie consent utilities
    schemas/
      contact.ts                      # Zod schema for contact form
  proxy.ts                            # Locale detection proxy (Next.js 16)
  test/                               # Test utilities and mocks
```

## Testing

### Unit Tests (Vitest + jsdom)

```bash
pnpm test:unit       # Watch mode
pnpm test:unit run   # Single run
```

### Browser Component Tests (Vitest + Playwright)

```bash
pnpm test:browser    # Runs in headless Chromium
```

### Visual Regression Tests

Screenshot baselines in `__screenshots__/` — uses `toMatchScreenshot()` in browser tests.

### E2E Tests (Playwright)

```bash
pnpm test:e2e        # Builds app then runs E2E suite
```

### All Tests

```bash
pnpm test            # Runs unit + browser tests via Vitest workspace
```

### Playwright Agents

Three AI-powered agents for test automation:

- **Planner** — explores the app, generates test plans in `specs/`
- **Generator** — converts plans into Playwright tests
- **Healer** — debugs and fixes failing tests

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on push/PR to `main`:

1. **Lint** — ESLint
2. **Unit Tests** — Vitest (jsdom)
3. **Browser Tests** — Vitest Browser Mode (Chromium)
4. **Build** — Next.js production build
5. **E2E Tests** — Playwright (post-build)

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_EMAIL` | Contact form recipient email |
| `FROM_EMAIL` | Sender address (verified domain) |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key (optional) |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v3 secret key (optional) |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID (optional) |

## Architecture Highlights

- **GSAP** — All imports from `@/lib/gsap`; `autoAlpha` for FOUC prevention; `useGSAP({ scope })` pattern
- **Lenis** — Driven by `gsap.ticker` for frame-perfect ScrollTrigger sync
- **i18n** — Cookie → Accept-Language → default locale; `src/proxy.ts` handles redirects
- **Anti-spam** — 4-layer defense: honeypot, time check, IP rate limiting, reCAPTCHA v3
- **Server Components** — Used where no interactivity/animation is needed
- **Cookie Consent** — Custom GDPR banner; analytics scripts load only after consent

## Deployment

The project is deployed on **Vercel** with automatic deployments:

- **Production** — push to `main` triggers a production deployment
- **Preview** — pull requests get preview deployments with unique URLs
- **Environment variables** — configured in the Vercel dashboard (Settings → Environment Variables)

GitHub Actions CI runs quality gates (lint, tests, build) in parallel with Vercel's deployment pipeline.

> See [MANUAL_CONFIGURATION.md](./MANUAL_CONFIGURATION.md) for the full environment variable list.
