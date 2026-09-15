**When working on this Next.js project, use the currently available
`next-devtools-mcp` tools when they are exposed. The former `init` tool is not
part of the current server: use `nextjs_index` to discover a running Next.js
dev server, `nextjs_docs` for official framework documentation, and
`nextjs_call`/`browser_eval` for runtime inspection as applicable.**

## Project Requirements

- **Package manager** : pnpm
- **Stack** : Next.js 16, React 19, shadcn/ui (base-ui), GSAP 3, Tailwind CSS v4, MDX
- **Language** : TypeScript (strict mode)
- **Fonts** : Roboto Flex (sans) + Geist Mono (mono) — via `next/font/google`

## Architecture Rules

- GSAP imports MUST come from `@/lib/gsap` (centralized plugin registration — includes GSAP, useGSAP, ScrollTrigger, Lenis)
- Animated components MUST use `"use client"` directive
- Use `useGSAP` hook with `scope` parameter for all GSAP animations
- Use `autoAlpha` instead of `opacity` in GSAP `.from()` to prevent FOUC — pair with `invisible` CSS class on animated elements
- Use `buttonVariants()` with `cn()` for Link/anchor elements styled as buttons (NOT `asChild` — Base UI Button does not support it)
- `buttonVariants()` can only be called in client components (`"use client"`) — never call it in server components
- Prefer Server Components where no interactivity/animation is needed
- Zod schemas use `import { z } from "zod/v3"` for compatibility with `@hookform/resolvers`

## Internationalization (i18n)

- **Languages** : French (default) + English
- **Pattern** : `[locale]` dynamic segment in App Router (`src/app/[locale]/`)
- **Proxy** : `src/proxy.ts` detects locale from cookie → Accept-Language → default (renamed from `middleware.ts` per Next.js 16)
- **Dictionaries** : JSON files in `src/app/[locale]/dictionaries/` (fr.json, en.json)
- **Server-side** : `getDictionary(locale)` from `src/app/[locale]/dictionaries.ts` (uses `server-only`)
- **Client-side** : `useDictionary()` hook from `src/components/dictionary-provider.tsx` (React Context)
- **Language switcher** : `<LanguageSwitcher>` next to theme toggle in navbar — stores preference in `NEXT_LOCALE` cookie
- **HTML lang** : `src/app/[locale]/layout.tsx` renders `<html lang={locale}>` server-side
- **MDX articles** : Content stays in original language (French). Translated metadata (title, description) in dictionaries. Users can use browser translation for article content.
- All internal links MUST be prefixed with `/${locale}/` (e.g., `/${locale}/contact`)
- Update BOTH dictionary files when adding new translation keys

## Smooth Scroll (Lenis)

- `<SmoothScroll>` provider wraps content in locale `layout.tsx`
- Lenis is driven by `gsap.ticker` for frame-perfect ScrollTrigger sync
- CSS rules for Lenis are in `globals.css` (`html.lenis` height overrides)
- Do NOT use `scroll-behavior: smooth` on `<html>` — Lenis handles it

## Page Transitions

- `<PageTransition>` component wraps `{children}` in `<main>` of locale `layout.tsx`
- Detects route changes via `usePathname()` and animates incoming content
- Subtle fade + y-translate animation (0.4s)

## Styling

- shadcn CSS variables (OKLCH) for all colors
- Dark mode via next-themes (attribute="class", defaultTheme="dark")
- `@tailwindcss/typography` plugin for MDX article prose styling
- Subtle background gradient via `body::before` pseudo-element (fixed, z-index -1)
  - Light mode: blue/violet radial gradients at 3-4% opacity
  - Dark mode: same hues at 5-8% opacity
  - Uses OKLCH colors matching the shadcn palette

## Contact Form & Anti-Spam

- React Hook Form + Zod validation (client + server)
- Server Action sends email via Resend SDK
- Multi-layered anti-spam:
  1. **Honeypot** field (hidden, silent success if filled)
  2. **Time check** (reject if < 3s after mount)
  3. **Rate limiting** (5/hour per hashed IP, atomic Upstash Redis/Vercel KV in production)
  4. **reCAPTCHA v3** (score >= 0.5 plus action/hostname/age checks)
- Anti-spam fields (`honeypot`, `timestamp`, `recaptchaToken`) are in the Zod schema but not shown to users
- reCAPTCHA loads only after focus/submit intent on the contact form

## Cookie Consent & Analytics

- **Cookie consent banner** : Custom built, GDPR-compliant (`src/components/cookie-consent.tsx`)
  - Shows on first visit (1.5s delay)
  - Accept All / Reject All / Manage preferences
  - Stores consent in localStorage, sets `cookie-consent-given` cookie
  - Consent is versioned, expires after 6 months, and can be reopened from the footer
  - Dispatches `cookie-consent-update` CustomEvent for reactive script loading
- **Google Tag Manager** : Via `next/script` in `src/components/analytics.tsx`
  - `<Analytics>` component loads GTM script (consent-gated, in locale layout)
  - No `<noscript>` GTM iframe: analytics must never bypass the consent gate
  - Only loaded AFTER user accepts analytics cookies
  - Listens for consent changes via CustomEvent
  - Uses `NEXT_PUBLIC_GTM_ID` env variable (format: GTM-XXXXXXX)
- **Categories** :
  - *Necessary* : Language preference (`NEXT_LOCALE`), theme — always active
  - *Analytics* : Google Tag Manager — requires consent

## Content

- MDX articles live in `src/app/[locale]/articles/[slug]/page.mdx`
- Article listing data is in dictionaries (fr.json, en.json) — update when adding articles
- Articles layout uses `prose dark:prose-invert` classes
- Article search is powered by `src/lib/articles.ts`: metadata from dictionaries plus stripped MDX content, tags and descriptions are indexed into `searchText`
- Article listing filters are URL-synced via `tag` and `q` query params
- Article pages use `<ArticleEnhancements>` for reading time, table of contents, related articles, copy link and the English notice for French article content
- Public proof documents live in `public/proofs`; their links are rendered by `src/components/footer.tsx`

## Layout Structure

- `src/app/[locale]/layout.tsx` — Locale-aware root document (`<html lang>`, fonts, ThemeProvider, DictionaryProvider, Navbar, Footer, SmoothScroll, PageTransition, CookieConsent, Analytics)
- `src/app/global-not-found.tsx` — Root 404 page (bilingual fallback, `experimental.globalNotFound`)
- `src/app/global-error.tsx` — Root error boundary
- `src/app/[locale]/not-found.tsx` — Localized 404 page

## MCP Servers

- **next-devtools** : Next.js dev server internals (indexing, routes, errors, logs, and official docs)
- **resend** : Email sending and contact management via Resend API
- **playwright-test** : Playwright browser automation for test agents (planner, generator, healer)

## Testing

- **Unit tests** : Vitest + jsdom + React Testing Library (`pnpm test:unit`)
- **Browser component tests** : Vitest Browser Mode + Playwright (`pnpm test:browser`)
- **Visual regression** : `toMatchScreenshot()` in browser tests — baselines in `__screenshots__/`
- **E2E tests** : Playwright (`pnpm test:e2e`)
- **All tests** : `pnpm test` runs both unit + browser projects via Vitest workspace
- Test files live in `__tests__/` folders colocated with source (e.g., `src/lib/__tests__/utils.test.ts`)
- Unit test files: `*.test.{ts,tsx}` — Browser test files: `*.browser.test.{ts,tsx}`
- E2E tests live in `e2e/` at the project root
- Custom render utilities:
  - `src/test/utils.tsx` — unit tests (jsdom), uses `@testing-library/react`
  - `src/test/browser-utils.tsx` — browser tests, uses `vitest-browser-react`
- GSAP is globally mocked via Vitest alias (`src/test/__mocks__/gsap.ts`)
- `server-only` is globally mocked via Vitest alias (`src/test/__mocks__/server-only.ts`)
- **When making changes to source files, always check whether tests need to be modified, created, or deleted**
- When adding new `lib/` functions, add corresponding unit tests
- When modifying component behavior, update or add component tests
- When changing server actions or API logic, update integration tests
- For article search/filter changes, keep tests covering URL synchronization, tag filtering and MDX content indexing
- For homepage proof document changes, keep tests covering the public proof links
- Run `pnpm test` before committing to verify nothing is broken

### Playwright Agents

- **Planner** : Explores the app and generates test plans in `specs/` (`.Codex/agents/playwright-test-planner.md`)
- **Generator** : Converts test plans into executable Playwright tests (`.Codex/agents/playwright-test-generator.md`)
- **Healer** : Debugs and fixes failing Playwright tests (`.Codex/agents/playwright-test-healer.md`)
- Seed test: `e2e/seed.spec.ts` — establishes base environment
- Test plans: `specs/user-flows.md` — human-readable test scenarios

## Portfolio Checklist

- When the user asks for improvements or ideas, consult `PORTFOLIO_CHECKLIST.md` at the project root
- This checklist is based on industry-standard portfolio best practices and tracks compliance status
- Use it to suggest actionable improvements prioritized by impact (quick wins first)
- After implementing improvements, update the checklist status accordingly

## Environment Variables

See `.env.local` for all required variables:
- `RESEND_API_KEY` — Resend API key
- `CONTACT_EMAIL` — Recipient email for contact form
- `FROM_EMAIL` — Sender address (must be verified domain or sandbox)
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` — reCAPTCHA v3 site key (optional)
- `RECAPTCHA_SECRET_KEY` — reCAPTCHA v3 secret key (optional)
- `NEXT_PUBLIC_GTM_ID` — Google Tag Manager container ID (optional, format: GTM-XXXXXXX)
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — Durable rate limit store (required in production)

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
