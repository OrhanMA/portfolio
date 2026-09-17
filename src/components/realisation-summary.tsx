import Link from "next/link";
import { LinkedText } from "@/components/linked-text";
import type { Locale } from "@/lib/i18n";
import type { RealisationSummary as RealisationSummaryContent } from "@/lib/realisations";

type RealisationSummaryProps = {
  summary: RealisationSummaryContent;
  locale: Locale;
  currentPath: string;
  labels: {
    heading: string;
    introduction: string;
    context: string;
    challenge: string;
    role: string;
    decision: string;
    result: string;
    proof: string;
    proofLink: string;
  };
  proofHref: string;
};

export function RealisationSummary({
  summary,
  locale,
  currentPath,
  labels,
  proofHref,
}: RealisationSummaryProps) {
  const items = [
    { term: labels.context, description: summary.context[locale] },
    { term: labels.challenge, description: summary.challenge[locale] },
    { term: labels.role, description: summary.role[locale] },
    { term: labels.decision, description: summary.decision[locale] },
    { term: labels.result, description: summary.result[locale] },
    { term: labels.proof, description: summary.proof[locale], href: proofHref },
  ];

  return (
    <section data-realisation-summary aria-labelledby="realisation-summary-heading">
      <h2 id="realisation-summary-heading">{labels.heading}</h2>
      <p data-realisation-summary-introduction>{labels.introduction}</p>
      <dl>
        {items.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>
              <LinkedText locale={locale} currentPath={currentPath}>
                {item.description}
              </LinkedText>
              {item.href && (
                <Link href={item.href}>{labels.proofLink}</Link>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
