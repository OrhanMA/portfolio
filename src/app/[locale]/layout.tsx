import type { Metadata } from "next";
import { headers } from "next/headers";
import "../globals.css";
import { locales } from "@/lib/i18n";
import { deferredFontClassName } from "@/components/deferred-fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { PageTransition } from "@/components/page-transition";
import { DictionaryProvider } from "@/components/dictionary-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { Analytics } from "@/components/analytics";
import { StructuredData } from "@/components/structured-data";
import { createLocalizedMetadata } from "@/lib/metadata";
import { competences } from "@/lib/competences";
import { realisations } from "@/lib/realisations";
import { getLocalizedPageContext } from "./route-context";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);
  return {
    ...createLocalizedMetadata({
      locale: loc,
      title: dict.metadata.title,
      description: dict.metadata.description,
    }),
    metadataBase: new URL("https://orhanmadiassani.com"),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);
  const requestHeaders = await headers();
  const nonce = requestHeaders.get("x-nonce") ?? undefined;
  const pathname = requestHeaders.get("x-pathname") ?? `/${loc}`;

  return (
    <html
      lang={loc}
      className={deferredFontClassName}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          nonce={nonce}
        >
          <DictionaryProvider
            dictionary={{
              cookies: dict.cookies,
              errorPage: dict.errorPage,
              notFound: dict.notFound,
              nav: dict.nav,
            }}
          >
            <StructuredData locale={loc} pathname={pathname} nonce={nonce} />
            <SmoothScroll>
              <a
                href="#main-content"
                className="fixed left-3 top-3 z-[110] -translate-y-24 rounded-md bg-background px-4 py-2 text-sm font-bold shadow-lg transition-transform focus:translate-y-0"
              >
                {locale === "fr" ? "Aller au contenu" : "Skip to content"}
              </a>
              <Navbar
                locale={locale}
                dict={{
                  nav: dict.nav,
                  experienceHeading: dict.experience.heading,
                  skillsHeading: dict.skills.heading,
                }}
                menus={{
                  competences: competences.map((competence) => ({
                    href: `/${locale}/competences/${competence.slug}`,
                    label: competence.title[loc],
                  })),
                  realisations: realisations.map((realisation) => ({
                    href: `/${locale}/realisations/${realisation.slug}`,
                    label: realisation.title[loc],
                  })),
                }}
              />
              <main id="main-content" tabIndex={-1} className="min-h-screen">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer dict={dict} locale={locale} />
            </SmoothScroll>
            <CookieConsent />
            <Analytics />
          </DictionaryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
