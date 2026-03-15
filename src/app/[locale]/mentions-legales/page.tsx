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

  return (
    <div className="mx-auto max-w-3xl py-16 px-6">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {dict.legal.heading}
      </h1>

      <div className="mt-10 space-y-8">
        {/* Editor */}
        <section>
          <h2 className="text-xl font-semibold">{dict.legal.editor}</h2>
          <div className="mt-3 space-y-1 text-muted-foreground">
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
          </div>
        </section>

        {/* Hosting */}
        <section>
          <h2 className="text-xl font-semibold">{dict.legal.hosting}</h2>
          <div className="mt-3 space-y-1 text-muted-foreground">
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
          </div>
        </section>

        {/* Intellectual Property */}
        <section>
          <h2 className="text-xl font-semibold">
            {dict.legal.intellectualProperty}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {dict.legal.intellectualPropertyText}
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold">{dict.legal.contact}</h2>
          <p className="mt-3 text-muted-foreground">
            {dict.legal.contactText}{" "}
            <Link
              href={`/${locale}/contact`}
              className="text-primary hover:underline"
            >
              {dict.nav.contact}
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
