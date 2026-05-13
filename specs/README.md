# Specs

This directory stores human-readable test plans for Playwright agents and manual QA.

Current quality gates for the portfolio:

- `pnpm lint`
- `pnpm test:unit run`
- `pnpm test:browser`
- `pnpm exec next build --webpack`

Recent coverage additions:

- article filters synchronized with `tag` and `q` URL params
- article search indexing real MDX content
- article reading time, table of contents, related articles and copy-link feedback
- homepage proof document links
- neutral homepage/contact availability wording
