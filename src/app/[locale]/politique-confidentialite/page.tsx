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

  return (
    <div className="mx-auto max-w-3xl py-16 px-6">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {dict.privacy.heading}
      </h1>

      <p className="mt-4 text-muted-foreground">{dict.privacy.intro}</p>

      <div className="mt-10 space-y-8">
        {/* Data Collected */}
        <section>
          <h2 className="text-xl font-semibold">
            {dict.privacy.dataCollected}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {dict.privacy.dataCollectedText}
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1 text-muted-foreground">
            {dict.privacy.dataItems.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Purpose */}
        <section>
          <h2 className="text-xl font-semibold">{dict.privacy.purpose}</h2>
          <p className="mt-3 text-muted-foreground">
            {dict.privacy.purposeText}
          </p>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="text-xl font-semibold">
            {dict.privacy.cookiesSection}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {dict.privacy.cookiesText}
          </p>
        </section>

        {/* Rights */}
        <section>
          <h2 className="text-xl font-semibold">{dict.privacy.rights}</h2>
          <p className="mt-3 text-muted-foreground">
            {dict.privacy.rightsText}
          </p>
        </section>

        {/* Updates */}
        <section>
          <h2 className="text-xl font-semibold">{dict.privacy.updates}</h2>
          <p className="mt-3 text-muted-foreground">
            {dict.privacy.updatesText}
          </p>
        </section>

        {/* Last Updated */}
        <p className="text-sm text-muted-foreground">
          {dict.privacy.lastUpdated}: {new Date().toLocaleDateString(
            locale === "fr" ? "fr-FR" : "en-US",
            { year: "numeric", month: "long", day: "numeric" }
          )}
        </p>
      </div>
    </div>
  );
}
