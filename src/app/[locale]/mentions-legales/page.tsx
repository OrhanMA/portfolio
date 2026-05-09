import type { Metadata } from "next";
import Link from "next/link";
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
    title: dict.legal.pageTitle,
  };
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const sections = [
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
    <div className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
              Legal document
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.95] tracking-normal sm:text-6xl">
              {dict.legal.heading}
            </h1>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Orhan Madi Assani · Chambéry, France
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
                  <div className="mt-3 space-y-1 leading-7 text-muted-foreground">
                    {section.content}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
