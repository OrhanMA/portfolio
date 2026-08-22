import type { Metadata } from "next";
import Link from "next/link";
import { createLocalizedMetadata } from "@/lib/metadata";
import { EditorialPageHeader } from "@/components/editorial-page-header";
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
  const { dictionary: dict } = await getLocalizedPageContext(locale);
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
              className="text-primary hover:underline"
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
              className="text-primary hover:underline"
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
            className="text-primary hover:underline"
          >
            {dict.nav.contact}
          </Link>
        </p>
      ),
    },
  ];

  return (
    <div>
      <EditorialPageHeader
        eyebrow={dict.footer.legalNotice}
        title={dict.legal.heading}
        description="Orhan Madi Assani · Chambéry, France"
        titleClassName="uppercase"
      />

      <section className="bg-muted/35 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 lg:grid-cols-2">
            {sections.map((section, index) => (
              <section
                key={section.title}
                className="grid gap-5 border border-border bg-card p-5 sm:grid-cols-[64px_1fr] sm:p-7"
              >
                <p className="editorial-index">
                  0{index + 1}
                </p>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-[-0.025em]">
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-1 leading-7 text-muted-foreground">
                    {section.content}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
