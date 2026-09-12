import type { Metadata } from "next";
import Link from "next/link";
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
    pathname: "/mentions-legales",
    title: dict.legal.pageTitle,
    description: dict.legal.heading,
  });
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);
  const sections = [
    {
      title: dict.legal.status,
      content: <p>{dict.legal.statusText}</p>,
    },
    {
      title: dict.legal.editor,
      content: (
        <>
          <p>{dict.legal.editorName}</p>
          <p>{dict.legal.editorLocation}</p>
          <p>
            <a
              href={`mailto:${dict.legal.editorEmail}`}
            >
              {dict.legal.editorEmail}
            </a>
          </p>
        </>
      ),
    },
    {
      title: dict.legal.hosting,
      content: (
        <>
          <p>{dict.legal.hostingProvider}</p>
          <p>{dict.legal.hostingAddress}</p>
          <p>
            <a
              href={dict.legal.hostingWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.legal.hostingWebsite}
            </a>
          </p>
        </>
      ),
    },
    {
      title: dict.legal.intellectualProperty,
      content: <p>{dict.legal.intellectualPropertyText}</p>,
    },
    {
      title: dict.legal.contact,
      content: (
        <p>
          {dict.legal.contactText}{" "}
          <Link
            href={`/${locale}/contact`}
          >
            {dict.nav.contact}
          </Link>
        </p>
      ),
    },
  ];

  return (
    <>
      <RouteStructuredData locale={loc} pathname={`/${loc}/mentions-legales`} />
      <div>
      <EditorialPageHeader
        eyebrow={dict.footer.legalNotice}
        title={dict.legal.heading}
        description="Orhan Madi Assani · Chambéry, France"
        titleClassName="uppercase"
      />

      <section>
        <div>
          <div>
            {sections.map((section, index) => (
              <section
                key={section.title}
              >
                <p>
                  0{index + 1}
                </p>
                <div>
                  <h2>
                    {section.title}
                  </h2>
                  <div>
                    {section.content}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
