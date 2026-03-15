# Portfolio — User Flow Test Plan

## Application Overview

A bilingual (FR/EN) portfolio website built with Next.js 16. Features include:
- Homepage with hero section and project showcase
- Article listing and detail pages (MDX content)
- Contact form with multi-layer anti-spam (honeypot, time check, rate limiting, reCAPTCHA)
- Language switcher (FR ↔ EN) with cookie persistence
- Dark/light theme toggle
- Cookie consent banner (GDPR-compliant)
- Smooth scroll animations (GSAP + Lenis)

Base URL: `http://localhost:3000`
Default locale: French (`/fr`)

---

## Test Scenarios

### 1. Navigation
**Seed:** `e2e/seed.spec.ts`

#### 1.1 Navigate to all pages from navbar
**Steps:**
1. Go to `/fr`
2. Click each navbar link (Articles, Contact)
3. Verify correct page loads with expected heading

**Expected Results:**
- Each page renders without errors
- URL matches expected path (`/fr/articles`, `/fr/contact`)
- Page heading is visible

#### 1.2 Navigate to article detail
**Steps:**
1. Go to `/fr/articles`
2. Click on the first article card
3. Verify article page loads

**Expected Results:**
- Article page renders with title and content
- Back navigation works

#### 1.3 Footer links work
**Steps:**
1. Go to `/fr`
2. Scroll to footer
3. Click legal notice link
4. Verify legal page loads

**Expected Results:**
- Footer links navigate to correct pages (`/fr/mentions-legales`, `/fr/politique-confidentialite`)

---

### 2. Internationalization (i18n)
**Seed:** `e2e/seed.spec.ts`

#### 2.1 Switch language FR → EN
**Steps:**
1. Go to `/fr`
2. Click the language switcher button (shows "EN")
3. Verify page reloads in English

**Expected Results:**
- URL changes to `/en`
- Page content is in English
- Language switcher now shows "FR"

#### 2.2 Switch language EN → FR
**Steps:**
1. Go to `/en`
2. Click the language switcher button (shows "FR")
3. Verify page reloads in French

**Expected Results:**
- URL changes to `/fr`
- Page content is in French

#### 2.3 Language preference persists
**Steps:**
1. Go to `/fr`
2. Switch to English
3. Navigate to another page
4. Verify page is still in English

**Expected Results:**
- Language preference is maintained across navigation
- `NEXT_LOCALE` cookie is set

---

### 3. Contact Form
**Seed:** `e2e/seed.spec.ts`

#### 3.1 Submit valid contact form
**Steps:**
1. Go to `/fr/contact`
2. Fill in name: "Jean Dupont"
3. Fill in email: "jean@example.com"
4. Select reason: "Offre"
5. Fill in message (at least 20 characters)
6. Click "Envoyer"

**Expected Results:**
- Form submits (loading state appears)
- Success message is displayed
- Form resets or shows confirmation

#### 3.2 Validation errors on empty submit
**Steps:**
1. Go to `/fr/contact`
2. Click "Envoyer" without filling any fields

**Expected Results:**
- Validation errors appear for required fields
- Form is not submitted

#### 3.3 Custom subject appears for "Autre" reason
**Steps:**
1. Go to `/fr/contact`
2. Select reason "Autre" from dropdown

**Expected Results:**
- A custom subject input field appears

#### 3.4 Character counter shows message length
**Steps:**
1. Go to `/fr/contact`
2. Type text in the message textarea

**Expected Results:**
- Character counter updates (e.g., "15/5000")

---

### 4. Cookie Consent
**Seed:** `e2e/seed.spec.ts`

#### 4.1 Banner appears on first visit
**Steps:**
1. Clear all cookies and localStorage
2. Go to `/fr`
3. Wait 2 seconds

**Expected Results:**
- Cookie consent banner appears with "Cookies" heading
- Accept, Reject, and Manage buttons are visible

#### 4.2 Accept all cookies
**Steps:**
1. Trigger the cookie consent banner
2. Click "Accepter"

**Expected Results:**
- Banner disappears
- Consent is stored in localStorage
- Banner does not reappear on next page load

#### 4.3 Reject all cookies
**Steps:**
1. Trigger the cookie consent banner
2. Click "Refuser"

**Expected Results:**
- Banner disappears
- Analytics cookies are not set

#### 4.4 Manage cookie preferences
**Steps:**
1. Trigger the cookie consent banner
2. Click "Gérer" (Manage) button
3. Verify preference panel expands
4. Toggle analytics off
5. Save preferences

**Expected Results:**
- Preference panel shows "Nécessaires" (always on) and "Analytiques" (toggleable)
- Saving preferences closes the banner

---

### 5. Theme Toggle
**Seed:** `e2e/seed.spec.ts`

#### 5.1 Toggle dark/light mode
**Steps:**
1. Go to `/fr`
2. Click the theme toggle button
3. Verify theme changes

**Expected Results:**
- `<html>` element class toggles between "dark" and "light"
- Visual appearance changes accordingly

#### 5.2 Theme persists across pages
**Steps:**
1. Switch to light mode
2. Navigate to another page
3. Verify theme is still light mode

**Expected Results:**
- Theme preference is maintained across navigation

---

### 6. 404 Page
**Seed:** `e2e/seed.spec.ts`

#### 6.1 Non-existent page shows 404
**Steps:**
1. Navigate to `/fr/this-page-does-not-exist`

**Expected Results:**
- 404 page is displayed
- Page shows appropriate "not found" message
- Navigation back to homepage is available
