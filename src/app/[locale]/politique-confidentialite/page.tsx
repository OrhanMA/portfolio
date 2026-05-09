import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.privacy.pageTitle,
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const sections = [
    {
      title: dict.privacy.dataCollected,
      body: dict.privacy.dataCollectedText,
      items: dict.privacy.dataItems,
    },
    { title: dict.privacy.purpose, body: dict.privacy.purposeText },
    { title: dict.privacy.cookiesSection, body: dict.privacy.cookiesText },
    { title: dict.privacy.rights, body: dict.privacy.rightsText },
    { title: dict.privacy.updates, body: dict.privacy.updatesText },
  ];

  return (
    <div className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
              Privacy
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.95] tracking-normal sm:text-6xl">
              {dict.privacy.heading}
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
              {dict.privacy.intro}
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {dict.privacy.lastUpdated}: {new Date().toLocaleDateString(
                locale === "fr" ? "fr-FR" : "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </p>
          </aside>

          <div className="grid gap-3">
            {sections.map((section, index) => (
              <section
                key={section.title}
                className="premium-card grid gap-5 rounded-lg p-5 sm:grid-cols-[88px_1fr] sm:p-7"
              >
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                  0{index + 1}
                </p>
                <div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {section.body}
                  </p>
                  {section.items && (
                    <ul className="mt-4 grid gap-2 text-muted-foreground sm:grid-cols-2">
                      {section.items.map((item: string) => (
                        <li
                          key={item}
                          className="rounded-md border border-border/70 bg-background/50 px-3 py-2 text-sm"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
