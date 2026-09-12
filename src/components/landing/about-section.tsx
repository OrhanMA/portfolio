import { LinkedText } from "@/components/linked-text";
import Link from "next/link";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import type { Locale } from "@/lib/i18n";

export function AboutSection({ dict, locale = "fr" }: { dict: Dictionary["about"]; locale?: Locale }) {
  const principles = [
    {
      title: dict.card1Title,
      path: "/competences/communication",
      description: dict.card1Desc,
    },
    {
      title: dict.card2Title,
      path: "/competences/developpement-backend",
      description: dict.card2Desc,
    },
    {
      title: dict.card3Title,
      path: "/competences/devops",
      description: dict.card3Desc,
    },
  ];

  return (
    <section
      id="a-propos"
    >
      <div>
        <div>
          <h2>
            {dict.heading}
          </h2>
          <p>
            {dict.statement}
          </p>
          <p>
            <LinkedText locale={locale}>{dict.text}</LinkedText>
          </p>
        </div>

        <div>
          {principles.map((principle) => {
            return (
              <article
                key={principle.title}
              >
                <div>
                  <h3><Link href={`/${locale}${principle.path}`}>{principle.title}</Link></h3>
                  <p>
                    {principle.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
