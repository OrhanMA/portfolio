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
    context: string;
    role: string;
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
    { term: labels.role, description: summary.role[locale] },
    { term: labels.result, description: summary.result[locale] },
    { term: labels.proof, description: summary.proof[locale], href: proofHref },
  ];

  return (
    <section data-realisation-summary aria-labelledby="realisation-summary-heading">
      <h2 id="realisation-summary-heading">{labels.heading}</h2>
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
