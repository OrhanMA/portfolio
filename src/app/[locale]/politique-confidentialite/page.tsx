import type { Metadata } from "next";
import { createLocalizedMetadata } from "@/lib/metadata";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { RouteStructuredData } from "@/components/route-structured-data";
import { getLocalizedPageContext } from "../route-context";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);
  return createLocalizedMetadata({
    locale: loc,
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
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);
  const sections = [
    {
      title: dict.privacy.dataCollected,
      body: dict.privacy.dataCollectedText,
      items: dict.privacy.dataItems,
    },
    { title: dict.privacy.purpose, body: dict.privacy.purposeText },
    { title: dict.privacy.cookiesSection, body: dict.privacy.cookiesText },
    {
      title: dict.privacy.internationalTransfers,
      body: dict.privacy.internationalTransfersText,
    },
    { title: dict.privacy.rights, body: dict.privacy.rightsText },
    { title: dict.privacy.updates, body: dict.privacy.updatesText },
  ];

  return (
    <>
      <RouteStructuredData locale={loc} pathname={`/${loc}/politique-confidentialite`} />
      <EditorialPageHeader
        eyebrow={dict.footer.privacyPolicy}
        title={dict.privacy.heading}
        description={dict.privacy.intro}
        titleClassName="uppercase"
        className="privacy-policy-header"
        meta={
          <p>
            {dict.privacy.lastUpdated}:{" "}
            {dict.privacy.lastUpdatedDate}
          </p>
        }
      />

      <section data-privacy-policy data-legal-page>
        <div>
          <div>
            {sections.map((section, index) => (
              <section
                key={section.title}
                aria-labelledby={`privacy-section-${index + 1}`}
              >
                <p aria-hidden="true">
                  0{index + 1}
                </p>
                <div>
                  <h2 id={`privacy-section-${index + 1}`}>
                    {section.title}
                  </h2>
                  <p>
                    {section.body}
                  </p>
                  {section.items && (
                    <ul>
                      {section.items.map((item: string) => (
                        <li
                          key={item}
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
    </>
  );
}
