import Head from "next/head";
import Image from "next/image";
import { ArrowRight, ChevronDown, Moon, Sun } from "lucide-react";

import type { Dictionary } from "@/app/[locale]/dictionaries";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";
import { AboutSection } from "@/components/landing/about-section";
import { CtaSection } from "@/components/landing/cta-section";
import { ExperienceSection } from "@/components/landing/experience-section";
import { HeroSection } from "@/components/landing/hero-section";
import { ProjectsSection } from "@/components/landing/projects-section";
import { SkillsSection } from "@/components/landing/skills-section";
import { competences } from "@/lib/competences";
import type { Locale } from "@/lib/i18n";
import { realisations } from "@/lib/realisations";

type StaticMenuItem = {
  href: string;
  label: string;
};

const featuredProjects = {
  fr: [
    {
      slug: "migration-odoo-v16-v19" as const,
      title: "Migration d'un ERP d'entreprise de Odoo 16 vers Odoo 19",
      tags: ["Odoo", "Python", "PostgreSQL", "Migration"],
    },
    {
      slug: "modules-metier-odoo" as const,
      title: "Développement de modules métier pour un ERP",
      tags: ["Odoo", "Python", "PostgreSQL", "API"],
    },
    {
      slug: "refonte-site-corporate" as const,
      title: "Refonte d'un site corporate Next.js",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
    },
  ],
  en: [
    {
      slug: "migration-odoo-v16-v19" as const,
      title: "Enterprise ERP migration from Odoo 16 to Odoo 19",
      tags: ["Odoo", "Python", "PostgreSQL", "Migration"],
    },
    {
      slug: "modules-metier-odoo" as const,
      title: "Business module development for an ERP",
      tags: ["Odoo", "Python", "PostgreSQL", "API"],
    },
    {
      slug: "refonte-site-corporate" as const,
      title: "Next.js corporate website redesign",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
    },
  ],
};

function StaticDesktopSubmenu({
  href,
  label,
  allLabel,
  items,
}: {
  href: string;
  label: string;
  allLabel: string;
  items: StaticMenuItem[];
}) {
  return (
    <div className="group relative">
      <a
        href={href}
        aria-haspopup="true"
        className="flex items-center gap-1 rounded-md px-3 py-2 text-xs font-semibold text-foreground/70 transition-colors hover:bg-primary/[0.05] hover:text-foreground"
      >
        {label}
        <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
      </a>
      <div className="invisible absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-[opacity,visibility,transform] duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-lg border border-foreground/15 bg-background/98 p-2 shadow-2xl backdrop-blur-xl">
          <a
            href={href}
            className="mb-1 flex items-center justify-between rounded-md bg-primary/[0.06] px-3 py-2.5 text-xs font-black uppercase tracking-[0.08em] text-foreground transition-colors hover:bg-primary/[0.11]"
          >
            {allLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm leading-5 text-foreground/70 transition-colors hover:bg-primary/[0.05] hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function StaticMobileSubmenu({
  href,
  label,
  allLabel,
  items,
}: {
  href: string;
  label: string;
  allLabel: string;
  items: StaticMenuItem[];
}) {
  return (
    <details className="group/submenu">
      <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-4 py-3 text-sm font-bold hover:bg-primary/[0.06]">
        {label}
        <ChevronDown className="h-4 w-4 transition-transform group-open/submenu:rotate-180" />
      </summary>
      <div className="ml-3 grid gap-1 border-l border-foreground/10 py-1 pl-3">
        <a
          href={href}
          className="flex items-center justify-between rounded-md bg-primary/[0.05] px-3 py-2 text-xs font-black uppercase tracking-[0.06em]"
        >
          {allLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm leading-5 text-foreground/70 hover:bg-primary/[0.05] hover:text-foreground"
          >
            {item.label}
          </a>
        ))}
      </div>
    </details>
  );
}

export function StaticNavbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const alternateLocale = locale === "fr" ? "en" : "fr";
  const leadingLinks = [
    { href: `/${locale}/a-propos`, label: dict.nav.about },
    { href: `/${locale}#parcours`, label: dict.experience.heading },
  ];
  const competenceItems = competences.map((competence) => ({
    href: `/${locale}/competences/${competence.slug}`,
    label: competence.title[locale],
  }));
  const realisationItems = realisations.map((realisation) => ({
    href: `/${locale}/realisations/${realisation.slug}`,
    label: realisation.title[locale],
  }));

  return (
    <header
      id="primary-navigation"
      className="nav-enter fixed inset-x-0 top-0 z-[100] border-b border-foreground/10 bg-background/95 lg:bg-background/92 lg:backdrop-blur-lg"
    >
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href={`/${locale}`}
          className="group flex shrink-0 items-center gap-3 text-sm font-black uppercase tracking-[-0.015em]"
        >
          <span className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-vermillion bg-background shadow-[2px_2px_0_var(--primary)] transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/coporate-headshot.webp"
              alt=""
              aria-hidden="true"
              fill
              sizes="32px"
              className="object-cover"
            />
          </span>
          Orhan Madi Assani
        </a>

        <div
          data-static-desktop-navigation
          className="hidden items-center gap-1 lg:flex"
        >
          {leadingLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-xs font-semibold text-foreground/70 transition-colors hover:bg-primary/[0.05] hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <StaticDesktopSubmenu
            href={`/${locale}/competences`}
            label={dict.skills.heading}
            allLabel={dict.nav.allCompetences}
            items={competenceItems}
          />
          <StaticDesktopSubmenu
            href={`/${locale}/realisations`}
            label={dict.nav.realisations}
            allLabel={dict.nav.allRealisations}
            items={realisationItems}
          />
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={`/${alternateLocale}`}
            data-language-switcher
            className="hidden h-9 w-9 items-center justify-center rounded-md text-xs font-bold transition-colors hover:bg-primary/[0.06] sm:inline-flex"
            aria-label={alternateLocale === "en" ? "Switch to English" : "Passer en français"}
          >
            {alternateLocale.toUpperCase()}
          </a>
          <button
            type="button"
            data-theme-toggle
            className="relative hidden h-9 w-9 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-primary/[0.06] sm:inline-flex"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="hidden h-5 w-5 dark:block" />
          </button>
          <a
            href={`/${locale}/contact`}
            className="hidden h-9 items-center justify-center rounded-full bg-vermillion px-5 text-sm font-bold text-white transition-colors hover:bg-vermillion/90 md:inline-flex"
          >
            {dict.nav.contact}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <details className="relative lg:hidden">
            <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-md text-xl font-black hover:bg-primary/[0.06]">
              <span aria-hidden="true">≡</span>
              <span className="sr-only">Menu</span>
            </summary>
            <div className="fixed inset-x-3 top-[72px] grid max-h-[calc(100dvh-84px)] gap-1 overflow-y-auto rounded-lg border border-foreground/15 bg-background/98 p-3 shadow-2xl backdrop-blur-xl">
              {leadingLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-4 py-3 text-sm font-bold hover:bg-primary/[0.06]"
                >
                  {link.label}
                </a>
              ))}
              <StaticMobileSubmenu
                href={`/${locale}/competences`}
                label={dict.skills.heading}
                allLabel={dict.nav.allCompetences}
                items={competenceItems}
              />
              <StaticMobileSubmenu
                href={`/${locale}/realisations`}
                label={dict.nav.realisations}
                allLabel={dict.nav.allRealisations}
                items={realisationItems}
              />
              <a
                href={`/${locale}/contact`}
                className="mt-2 flex h-11 items-center justify-center rounded-full bg-vermillion px-6 text-sm font-bold text-white"
              >
                {dict.nav.contact}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <div className="mt-2 flex items-center justify-center gap-2 border-t border-foreground/10 pt-3 sm:hidden">
                <a
                  href={`/${alternateLocale}`}
                  data-language-switcher
                  className="flex h-9 w-9 items-center justify-center rounded-md text-xs font-bold"
                >
                  {alternateLocale.toUpperCase()}
                </a>
                <button
                  type="button"
                  data-theme-toggle
                  className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-md"
                  aria-label="Toggle theme"
                >
                  <Sun className="h-5 w-5 dark:hidden" />
                  <Moon className="hidden h-5 w-5 dark:block" />
                </button>
              </div>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}

function CookieBanner({ dict }: { dict: Dictionary["cookies"] }) {
  return (
    <div data-cookie-banner className="fixed bottom-0 left-0 right-0 z-[120] hidden p-4 sm:p-6">
      <div className="mx-auto max-w-lg rounded-xl border border-border bg-card p-4 shadow-2xl sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold">{dict.title}</h2>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {dict.description}
            </p>
          </div>
          <button type="button" data-consent="reject" className="cursor-pointer text-lg" aria-label={dict.close}>×</button>
        </div>
        <div data-cookie-preferences className="mt-3 hidden space-y-3 border-t border-border pt-3 text-xs">
          <div>
            <p className="font-semibold">{dict.necessary}</p>
            <p className="text-muted-foreground">{dict.necessaryDesc}</p>
          </div>
          <label className="flex cursor-pointer items-start justify-between gap-3">
            <span>
              <span className="block font-semibold">{dict.analytics}</span>
              <span className="text-muted-foreground">{dict.analyticsDesc}</span>
            </span>
            <input data-analytics-consent type="checkbox" className="mt-1 h-4 w-4" />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" data-consent="accept" className="h-8 cursor-pointer rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground">{dict.accept}</button>
          <button type="button" data-consent="reject" className="h-8 cursor-pointer rounded-md border border-border px-3 text-xs font-semibold">{dict.reject}</button>
          <button type="button" data-consent-manage className="h-8 cursor-pointer rounded-md px-3 text-xs font-semibold hover:bg-muted">{dict.manage}</button>
          <button type="button" data-consent="save" className="hidden h-8 cursor-pointer rounded-md px-3 text-xs font-semibold hover:bg-muted">{dict.save}</button>
        </div>
      </div>
    </div>
  );
}

function NativeEnhancements({ locale }: { locale: Locale }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "";
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
  const script = `(function(){
    var d=document,w=window;
    d.documentElement.lang=${JSON.stringify(locale)};
    function reveal(root, selector){
      var targets=selector?root.querySelectorAll(selector):[root];
      targets.forEach(function(el,i){el.classList.remove('invisible');if(!w.matchMedia('(prefers-reduced-motion: reduce)').matches){el.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,delay:i*70,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});}});
    }
    var observer='IntersectionObserver' in w?new IntersectionObserver(function(entries){entries.forEach(function(entry){if(!entry.isIntersecting)return;var root=entry.target,selector=root.getAttribute('data-reveal-stagger');reveal(root,selector);observer.unobserve(root);});},{rootMargin:'0px 0px -12% 0px'}):null;
    d.querySelectorAll('.reveal-root').forEach(function(root){if(observer)observer.observe(root);else reveal(root,root.getAttribute('data-reveal-stagger'));});
    var groups=[['#a-propos','.about-copy,.about-stamp,.about-ninja'],['#parcours','.journey-row,.journey-marker,.journey-samurai,.journey-hanging-ninja'],['#contact','.contact-copy,.contact-circle,.contact-petals,.contact-samurai,.contact-sakura']];
    groups.forEach(function(group){var root=d.querySelector(group[0]);if(!root)return;var show=function(){reveal(root,group[1]);};if(w.location.hash===group[0]){show();return;}if(observer){var io=new IntersectionObserver(function(entries){if(entries[0]&&entries[0].isIntersecting){show();io.disconnect();}},{rootMargin:'0px 0px -12% 0px'});io.observe(root);}else show();});
    function setTheme(dark){d.documentElement.classList.toggle('dark',dark);try{localStorage.setItem('theme',dark?'dark':'light');}catch(e){}}
    d.querySelectorAll('[data-theme-toggle]').forEach(function(button){button.addEventListener('click',function(){setTheme(!d.documentElement.classList.contains('dark'));});});
    d.querySelectorAll('[data-language-switcher]').forEach(function(link){link.addEventListener('click',function(){d.cookie='NEXT_LOCALE=${locale === "fr" ? "en" : "fr"};path=/;max-age=31536000;SameSite=Lax';});});
    var banner=d.querySelector('[data-cookie-banner]'),preferences=d.querySelector('[data-cookie-preferences]'),save=d.querySelector('[data-consent="save"]');
    function loadAnalytics(){
      var gtm=${JSON.stringify(gtmId)},ga=${JSON.stringify(gaId)};
      if(gtm&&!d.querySelector('[data-native-gtm]')){w.dataLayer=w.dataLayer||[];w.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});var s=d.createElement('script');s.async=true;s.dataset.nativeGtm='';s.src='https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(gtm);d.head.appendChild(s);}
      if(ga&&!d.querySelector('[data-native-ga]')){var s2=d.createElement('script');s2.async=true;s2.dataset.nativeGa='';s2.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(ga);d.head.appendChild(s2);w.dataLayer=w.dataLayer||[];w.gtag=function(){w.dataLayer.push(arguments)};w.gtag('js',new Date());w.gtag('config',ga);}
    }
    function store(analytics){try{localStorage.setItem('cookie-consent',JSON.stringify({necessary:true,analytics:analytics}));}catch(e){}d.cookie='cookie-consent-given=true;path=/;max-age=31536000;SameSite=Lax';banner&&banner.classList.add('hidden');if(analytics)loadAnalytics();}
    var stored=null;try{stored=JSON.parse(localStorage.getItem('cookie-consent'));}catch(e){}
    if(stored&&stored.analytics)loadAnalytics();else if(!stored&&banner)w.setTimeout(function(){banner.classList.remove('hidden');},4000);
    d.querySelectorAll('[data-consent]').forEach(function(button){button.addEventListener('click',function(){var value=button.getAttribute('data-consent');if(value==='save'){var checkbox=d.querySelector('[data-analytics-consent]');store(!!(checkbox&&checkbox.checked));}else store(value==='accept');});});
    var manage=d.querySelector('[data-consent-manage]');if(manage)manage.addEventListener('click',function(){preferences&&preferences.classList.remove('hidden');save&&save.classList.remove('hidden');manage.classList.add('hidden');});
  })();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export function StaticHomepage({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const title = dict.metadata.title;
  const description = dict.metadata.description;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/icon1.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/icon2.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        <link rel="canonical" href={`https://orhanmadiassani.com/${locale}`} />
        <link rel="alternate" hrefLang="fr" href="https://orhanmadiassani.com/fr" />
        <link rel="alternate" hrefLang="en" href="https://orhanmadiassani.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://orhanmadiassani.com/fr" />
        <link rel="preload" href="/images/decorative/hero-portrait-jinbei-mobile.avif" as="image" type="image/avif" media="(min-width: 640px) and (max-width: 1023px)" />
        <link rel="preload" href="/images/decorative/hero-portrait-jinbei-desktop.avif" as="image" type="image/avif" media="(min-width: 1024px)" />
      </Head>
      <script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))}catch(e){}" }} />
      <noscript><style>{`.invisible{visibility:visible!important}`}</style></noscript>
      <StructuredData locale={locale} />
      <a href="#main-content" className="fixed left-3 top-3 z-[110] -translate-y-24 rounded-md bg-background px-4 py-2 text-sm font-bold shadow-lg transition-transform focus:translate-y-0">
        {locale === "fr" ? "Aller au contenu" : "Skip to content"}
      </a>
      <StaticNavbar locale={locale} dict={dict} />
      <main id="main-content" tabIndex={-1} className="min-h-screen">
        <HeroSection
          locale={locale}
          dict={dict.hero}
          headshot={
            <picture className="block h-full w-full">
              <source media="(min-width: 1024px)" type="image/avif" srcSet="/images/decorative/hero-portrait-jinbei-desktop.avif" />
              <source media="(min-width: 640px) and (max-width: 1023px)" type="image/avif" srcSet="/images/decorative/hero-portrait-jinbei-mobile.avif" />
              <source media="(min-width: 1024px)" type="image/webp" srcSet="/images/decorative/hero-portrait-jinbei-desktop.webp" />
              <source media="(min-width: 640px) and (max-width: 1023px)" type="image/webp" srcSet="/images/decorative/hero-portrait-jinbei-mobile.webp" />
              <img src="/images/decorative/hero-portrait-jinbei-mobile.webp" alt="Orhan Madi Assani" width={512} height={768} fetchPriority="high" decoding="async" className="pointer-events-none h-full w-full object-contain object-bottom" />
            </picture>
          }
        />
        <AboutSection dict={dict.about} />
        <ExperienceSection locale={locale} dict={dict.experience} />
        <SkillsSection locale={locale} dict={dict.skills} />
        <ProjectsSection locale={locale} projects={featuredProjects[locale]} dict={dict.featuredProjects} />
        <CtaSection locale={locale} dict={dict.cta} />
      </main>
      <Footer dict={dict} locale={locale} />
      <CookieBanner dict={dict.cookies} />
      <NativeEnhancements locale={locale} />
    </>
  );
}
