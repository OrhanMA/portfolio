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
import { getRealisationBySlug } from "@/lib/realisations";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { TopicLink } from "@/components/topic-link";
import { RouteStructuredData } from "@/components/route-structured-data";

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
  const linkedRealisations = (entry.linkedRealisations ?? []).map(
    (realisationSlug) => {
      const realisation = getRealisationBySlug(realisationSlug);

      if (!realisation) {
        throw new Error(
          `Unknown realisation ${realisationSlug} linked from journey entry ${entry.id}`,
        );
      }

      return realisation;
    },
  );
  const organizations = entry.companies ?? [
    { name: entry.company, url: entry.url },
  ];
  return (
    <div
      data-journey-detail
      data-journey-detail-type={entry.type}
    >
      <RouteStructuredData locale={loc} pathname={`/${loc}/parcours/${slug}`} />
      <EditorialPageHeader
        className="journey-detail-header"
        eyebrow={dict.experience.heading}
        title={entry.title}
        description={
          <LinkedText locale={loc} currentPath={`/parcours/${slug}`}>
            {entry.description}
          </LinkedText>
        }
        leading={
          <Link
            className="journey-detail-back"
            href={`/${loc}/parcours#experience-${entry.id}`}
          >
            {dict.experience.backToTimeline}
          </Link>
        }
        aside={
          <div data-journey-detail-header-summary>
            <p data-journey-detail-label>
              {entry.type === "education"
                ? dict.experience.educationLabel
                : dict.experience.experienceLabel}
            </p>
            <p data-journey-detail-company>{entry.company}</p>
            <p data-journey-detail-period>{entry.period}</p>
            <p data-journey-detail-location>{entry.location}</p>
          </div>
        }
      />
      <section
        data-journey-detail-content
        aria-labelledby="journey-detail-content-heading"
      >
        <div data-journey-detail-grid>
          <div data-journey-detail-main>
            <section data-journey-detail-story>
              <p data-journey-detail-label>
                {dict.experience.detailOverviewLabel}
              </p>
              <h2 id="journey-detail-content-heading">
                {dict.experience.detailHeading}
              </h2>
              {entry.detail.map(({ heading, text }) => (
                <div data-journey-detail-story-block key={heading}>
                  <h3>{heading}</h3>
                  <p>
                    <LinkedText locale={loc} currentPath={`/parcours/${slug}`}>
                      {text}
                    </LinkedText>
                  </p>
                </div>
              ))}
            </section>

            {linkedRealisations.length > 0 && (
              <section data-journey-detail-section data-journey-case-studies>
                <p data-journey-detail-label>
                  {dict.experience.caseStudiesLabel}
                </p>
                <h2>{dict.experience.caseStudiesHeading}</h2>
                <p data-journey-case-studies-intro>
                  {dict.experience.caseStudiesIntro}
                </p>
                <div data-journey-case-study-list>
                  {linkedRealisations.map((realisation) => (
                    <article key={realisation.slug} data-journey-case-study>
                      <h3>
                        <Link
                          href={`/${loc}/realisations/${realisation.slug}`}
                        >
                          {realisation.title[loc]}
                        </Link>
                      </h3>
                      <dl>
                        <div>
                          <dt>{dict.experience.caseStudyContextLabel}</dt>
                          <dd>
                            <LinkedText
                              locale={loc}
                              currentPath={`/parcours/${slug}`}
                            >
                              {realisation.summary.context[loc]}
                            </LinkedText>
                          </dd>
                        </div>
                        <div>
                          <dt>{dict.experience.caseStudyRoleLabel}</dt>
                          <dd>
                            <LinkedText
                              locale={loc}
                              currentPath={`/parcours/${slug}`}
                            >
                              {realisation.summary.role[loc]}
                            </LinkedText>
                          </dd>
                        </div>
                        <div>
                          <dt>{dict.experience.caseStudyResultLabel}</dt>
                          <dd>
                            <LinkedText
                              locale={loc}
                              currentPath={`/parcours/${slug}`}
                            >
                              {realisation.summary.result[loc]}
                            </LinkedText>
                          </dd>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {entry.institutions && (
              <section data-journey-detail-context>
                <p data-journey-detail-label>
                  {dict.experience.institutionsLabel}
                </p>
                <p>
                  <LinkedText locale={loc} currentPath={`/parcours/${slug}`}>
                    {entry.institutions}
                  </LinkedText>
                </p>
              </section>
            )}

            {entry.responsibilities && (
              <section data-journey-detail-section>
                <p data-journey-detail-label>
                  {dict.experience.responsibilitiesLabel}
                </p>
                <h2>{dict.experience.responsibilitiesHeading}</h2>
                <ul data-journey-detail-responsibilities>
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
          </div>

          <aside data-journey-detail-aside>
            <section data-journey-detail-panel>
              <p data-journey-detail-label>
                {dict.experience.organizationsLabel}
              </p>
              <div data-journey-detail-organizations>
                {organizations.map((organization) => (
                  <a
                    key={organization.name}
                    href={organization.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {organization.name}
                  </a>
                ))}
              </div>
            </section>

            <section data-journey-detail-panel>
              <p data-journey-detail-label>
                {dict.experience.technologiesLabel}
              </p>
              <ul data-journey-detail-tags>
                {entry.tags.map((tag) => (
                  <li key={tag}>
                    <TopicLink
                      label={tag}
                      locale={loc}
                      currentPath={`/parcours/${slug}`}
                    />
                  </li>
                ))}
              </ul>
            </section>

            {(training || placements.length > 0) && (
              <section data-journey-detail-panel>
                <p data-journey-detail-label>
                  {dict.experience.relatedEntriesLabel}
                </p>
                <div data-journey-detail-links>
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
              <section data-journey-detail-panel>
                <p data-journey-detail-label>
                  {dict.experience.linkedRealisationsLabel}
                </p>
                <div data-journey-detail-links>
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
              <section data-journey-detail-panel>
                <p data-journey-detail-label>
                  {dict.experience.linkedCompetencesLabel}
                </p>
                <div data-journey-detail-links>
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

            <section data-journey-detail-panel data-journey-detail-proofs>
              <p data-journey-detail-label>
                {dict.experience.proofsLabel}
              </p>
              <div data-journey-detail-links>
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
          </aside>
        </div>
      </section>
    </div>
  );
}
