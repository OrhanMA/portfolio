import { LinkedText } from "@/components/linked-text";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/app/[locale]/dictionaries";
import { getLocalizedPageContext } from "../../route-context";
import { createLocalizedMetadata } from "@/lib/metadata";
import {
  resolveCompetenceLinks,
  resolveRealisationLinks,
} from "@/lib/portfolio-links";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { TopicLink } from "@/components/topic-link";
import { cn } from "@/lib/utils";
import { actionLinkClassName } from "@/lib/styles";
import { RouteStructuredData } from "@/components/route-structured-data";

const detailLinkClassName = cn(
  actionLinkClassName,
  "h-auto min-h-10 max-w-full whitespace-normal py-2",
);

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const dict = await getDictionary("fr");
  return dict.experience.entries.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({ params }: Params) {
  const { locale, slug } = await params;
  const { locale: loc, dictionary: dict } =
    await getLocalizedPageContext(locale);
  const entry = dict.experience.entries.find(({ id }) => id === slug);
  if (!entry) return {};
  return createLocalizedMetadata({
    locale: loc,
    pathname: `/parcours/${slug}`,
    title: `${entry.company} — ${entry.title}`,
    description: entry.description,
  });
}

export default async function ExperiencePage({ params }: Params) {
  const { locale, slug } = await params;
  const { locale: loc, dictionary: dict } =
    await getLocalizedPageContext(locale);
  const entry = dict.experience.entries.find(({ id }) => id === slug);
  if (!entry) notFound();
  const training = dict.experience.entries.find(
    ({ id }) => id === entry.trainingId,
  );
  const placements = dict.experience.entries.filter(
    (item) => item.trainingId === entry.id,
  );
  const linkedRealisationLinks = resolveRealisationLinks(
    entry.linkedRealisations,
    loc,
  );
  const linkedCompetenceLinks = resolveCompetenceLinks(
    entry.linkedCompetences,
    loc,
  );
  return (
    <>
      <RouteStructuredData locale={loc} pathname={`/${loc}/parcours/${slug}`} />
      <div>
      <EditorialPageHeader
        compact
        eyebrow={dict.experience.heading}
        title={entry.title}
        description={
          <LinkedText locale={loc} currentPath={`/parcours/${slug}`}>
            {entry.description}
          </LinkedText>
        }
        leading={
          <Link
            href={`/${loc}/#experience-${entry.id}`}
          >
            {dict.experience.backToTimeline}
          </Link>
        }
        meta={
          <div>
            <p>
              {entry.company} · {entry.period}
            </p>
            <p>{entry.location}</p>
          </div>
        }
      />
      <section>
        <div>
          {entry.tags.map((tag) => (
            <TopicLink
              key={tag}
              label={tag}
              locale={loc}
              currentPath={`/parcours/${slug}`}
            />
          ))}
        </div>
        {entry.institutions && (
          <p>
            <LinkedText locale={loc} currentPath={`/parcours/${slug}`}>
              {entry.institutions}
            </LinkedText>
          </p>
        )}
        {entry.responsibilities && (
          <section>
            <h2>
              {dict.experience.responsibilitiesLabel}
            </h2>
            <ul>
              {entry.responsibilities.map((text) => (
                <li key={text}>
                  <LinkedText locale={loc} currentPath={`/parcours/${slug}`}>
                    {text}
                  </LinkedText>
                </li>
              ))}
            </ul>
          </section>
        )}
        {(training || placements.length > 0) && (
          <section>
            <h2>
              {dict.experience.relatedEntriesLabel}
            </h2>
            <div>
              {[...(training ? [training] : []), ...placements].map((item) => (
                <Link
                  key={item.id}
                  href={`/${loc}/parcours/${item.id}`}
                >
                  {item.company} — {item.title}
                </Link>
              ))}
            </div>
          </section>
        )}
        {linkedRealisationLinks.length > 0 && (
          <section>
            <h2>
              {dict.experience.linkedRealisationsLabel}
            </h2>
            <div>
              {linkedRealisationLinks.map(({ slug: id, title }) => (
                <Link
                  key={id}
                  href={`/${loc}/realisations/${id}`}
                >
                  {title}
                </Link>
              ))}
            </div>
          </section>
        )}
        {linkedCompetenceLinks.length > 0 && (
          <section>
            <h2>
              {dict.experience.linkedCompetencesLabel}
            </h2>
            <div>
              {linkedCompetenceLinks.map(({ slug: id, title }) => (
                <Link
                  key={id}
                  href={`/${loc}/competences/${id}`}
                >
                  {title}
                </Link>
              ))}
            </div>
          </section>
        )}
        <div>
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.experience.organizationWebsite}
          </a>
          {entry.certificateUrl && (
            <a href={entry.certificateUrl}>
              {entry.certificateLabel}
            </a>
          )}
        </div>
      </section>
      </div>
    </>
  );
}
