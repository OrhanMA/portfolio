import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  HeartHandshake,
  Target,
} from "lucide-react";
import { LinkedText } from "@/components/linked-text";
import { RouteStructuredData } from "@/components/route-structured-data";
import { aboutEditorialContent } from "@/lib/about";
import { createLocalizedMetadata } from "@/lib/metadata";
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
    pathname: "/a-propos",
    title: dict.aboutPage.pageTitle,
    description: dict.aboutPage.pageDescription,
  });
}

const sectionTitleClassName =
  "text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-4xl";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);
  const editorial = aboutEditorialContent[loc];
  const portfolioLinks = [
    {
      href: `/${loc}#parcours`,
      label: dict.hero.ctaParcours,
      icon: GraduationCap,
    },
    {
      href: `/${loc}/competences`,
      label: dict.nav.competences,
      icon: Target,
    },
    {
      href: `/${loc}/realisations`,
      label: dict.hero.ctaWork,
      icon: BriefcaseBusiness,
    },
  ];
  const projectCards = [
    {
      title: dict.aboutPage.professionalProjectHeading,
      icon: BriefcaseBusiness,
      content: editorial.project.slice(2, 3),
    },
    {
      title: dict.aboutPage.personalProjectHeading,
      icon: Target,
      content: editorial.project.slice(3, 4),
    },
  ];

  return (
    <LinkedText locale={loc} currentPath="/a-propos">
      <RouteStructuredData locale={loc} pathname={`/${loc}/a-propos`} />
      <div>
        <section
          data-editorial-page-header
          aria-labelledby="about-page-title"
        >
          <div>
            <div>
              <h1
                id="about-page-title"
              >
                {dict.aboutPage.heading}
              </h1>
              <p>
                {dict.aboutPage.subtext}
              </p>

              <nav
                aria-label={dict.aboutPage.exploreLabel}
              >
                {portfolioLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                  >
                    <Icon aria-hidden="true" />
                    {label}
                    <ArrowUpRight
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </nav>
            </div>

            <figure>
              <div>
                <Image
                  src="/images/coporate-headshot.webp"
                  alt={dict.aboutPage.portraitAlt}
                  width={1024}
                  height={1024}
                  sizes="(max-width: 1023px) min(100vw - 2rem, 448px), 36vw"
                  priority
                />
              </div>
              <figcaption>
                {dict.hero.availability}
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          id="parcours"
          aria-labelledby="journey-heading"
        >
          <div>
            <div>
              <figure>
                <Image
                  src="/images/dynamo-chambery-simplon.webp"
                  alt={dict.aboutPage.trainingImageAlt}
                  width={1200}
                  height={800}
                  sizes="(max-width: 1023px) 60vw, 30vw"
                />
              </figure>
              <figure>
                <Image
                  src="/images/lig-grenoble-building.webp"
                  alt={dict.aboutPage.researchImageAlt}
                  width={2000}
                  height={1233}
                  sizes="(max-width: 1023px) 40vw, 22vw"
                />
              </figure>
            </div>

            <div>
              <h2 id="journey-heading">
                {dict.aboutPage.journeyHeading}
              </h2>
              <div>
                {editorial.journey}
              </div>
              <Link
                href={`/${loc}#parcours`}
              >
                {dict.hero.ctaParcours}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section
          id="valeurs"
          aria-labelledby="values-heading"
        >
          <div>
            <div>
              <div>
                <h2 id="values-heading">
                  {dict.aboutPage.valuesHeading}
                </h2>
              </div>
              <div>
                {editorial.values.map((value, index) => (
                  <article
                    key={index}
                  >
                    <HeartHandshake
                      aria-hidden="true"
                    />
                    <div>
                      {value}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <figure>
              <Image
                src="/images/1up-building-drone-photo.webp"
                alt={dict.aboutPage.workImageAlt}
                width={640}
                height={420}
                sizes="(max-width: 1023px) 100vw, 32vw"
              />
            </figure>
          </div>
        </section>

        <section
          id="projet"
          aria-labelledby="project-heading"
        >
          <div>
            <div>
              <h2 id="project-heading">
                {dict.aboutPage.projectHeading}
              </h2>
              <div>
                {editorial.project.slice(0, 2)}
              </div>
            </div>
            <div>
              {projectCards.map(({ title, icon: Icon, content }) => (
                <article key={title}>
                  <Icon
                    aria-hidden="true"
                  />
                  <h3>
                    {title}
                  </h3>
                  <div>
                    {content}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="qualites"
          aria-labelledby="qualities-heading"
        >
          <div>
            <h2 id="qualities-heading">
              {dict.aboutPage.qualitiesHeading}
            </h2>
            <div>
              {editorial.qualities.map(({ title, content }) => (
                <article key={title}>
                  <h3>
                    {title}
                  </h3>
                  <div>
                    {content}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="interets"
          aria-labelledby="interests-heading"
        >
          <div>
            <h2 id="interests-heading">
              {dict.aboutPage.interestsHeading}
            </h2>
            <div>
              {editorial.interests}
            </div>
            <Link
              href={`/${loc}/contact`}
            >
              {dict.hero.ctaContact}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </LinkedText>
  );
}
