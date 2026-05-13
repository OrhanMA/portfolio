import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { PageTransition } from "@/components/page-transition";
import { DictionaryProvider } from "@/components/dictionary-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SetLang } from "@/components/set-lang";
import { CookieConsent } from "@/components/cookie-consent";
import { Analytics } from "@/components/analytics";
import { StructuredData } from "@/components/structured-data";
import { SpeedInsights } from "@vercel/speed-insights/next";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    metadataBase: new URL("https://orhanmadiassani.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
      },
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      siteName: "Orhan Madi Assani",
      url: `https://orhanmadiassani.com/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
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
  const dict = await getDictionary(locale as Locale);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <DictionaryProvider dictionary={dict}>
        <StructuredData locale={locale as Locale} />
        <SetLang locale={locale} />
        <SmoothScroll>
          <Navbar locale={locale} />
          <main className="min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer dict={dict} locale={locale} />
        </SmoothScroll>
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </DictionaryProvider>
    </ThemeProvider>
  );
}
