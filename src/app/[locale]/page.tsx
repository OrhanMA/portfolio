import { HeroSection } from "@/components/landing/hero-section";
import { AboutSection } from "@/components/landing/about-section";
import { SkillsSection } from "@/components/landing/skills-section";
import { ExperienceSection } from "@/components/landing/experience-section";
import { CtaSection } from "@/components/landing/cta-section";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <HeroSection locale={locale} />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <CtaSection locale={locale} />
    </>
  );
}
