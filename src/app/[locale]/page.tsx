import Image from "next/image";
import { HeroSection } from "@/components/landing/hero-section";
import { AboutSection } from "@/components/landing/about-section";
import { SkillsSection } from "@/components/landing/skills-section";
import { ProjectsSection } from "@/components/landing/projects-section";
import { ExperienceSection } from "@/components/landing/experience-section";
import { ProofsSection } from "@/components/landing/proofs-section";
import { CtaSection } from "@/components/landing/cta-section";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <HeroSection
        locale={locale}
        headshot={
          <Image
            src="/images/coporate-headshot.webp"
            alt="Orhan Madi Assani"
            width={720}
            height={920}
            className="pointer-events-none h-full w-full object-cover"
            priority
          />
        }
      />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection locale={locale} />
      <ExperienceSection locale={locale} />
      <ProofsSection locale={locale} />
      <CtaSection locale={locale} />
    </>
  );
}
