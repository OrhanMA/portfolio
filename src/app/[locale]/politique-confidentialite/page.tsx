import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import type { Locale } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { EditorialPageHeader } from "@/components/editorial-page-header";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return createLocalizedMetadata({
    locale: locale as Locale,
    pathname: "/politique-confidentialite",
    title: dict.privacy.pageTitle,
    description: dict.privacy.intro,
  });
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
    <div>
      <EditorialPageHeader
        eyebrow={dict.footer.privacyPolicy}
        title={dict.privacy.heading}
        description={dict.privacy.intro}
        titleClassName="uppercase"
        meta={
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {dict.privacy.lastUpdated}:{" "}
            {dict.privacy.lastUpdatedDate}
          </p>
        }
      />

      <section className="section-tinted px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 lg:grid-cols-2">
            {sections.map((section, index) => (
              <section
                key={section.title}
                className="premium-card grid gap-5 rounded-xl border-t-4 border-t-primary p-5 even:border-t-vermillion sm:grid-cols-[64px_1fr] sm:p-7"
              >
                <p className="editorial-index">
                  0{index + 1}
                </p>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-[-0.025em]">
                    {section.title}
                  </h2>
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
      </section>
    </div>
  );
}
