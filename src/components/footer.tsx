import Link from "next/link";
import { Mail } from "lucide-react";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import { CookieSettingsButton } from "@/components/cookie-settings-button";

const proofLinks = [
  { key: "cv", href: "/proofs/orhan-madi-assani-cv.pdf" },
  { key: "toeic", href: "/proofs/certificate_20251030105639_toeic_filigrane.pdf" },
  { key: "cda", href: "/proofs/diplome_cda_filigrane.pdf" },
  { key: "dwwm", href: "/proofs/titre-dwwm_filigrane.pdf" },
] as const;

export function Footer({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: string;
}) {
  const secondaryLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/a-propos`, label: dict.nav.about },
    { href: `/${locale}/competences`, label: dict.nav.competences },
    { href: `/${locale}/realisations`, label: dict.nav.realisations },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/articles`, label: dict.nav.articles },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer
      data-site-footer
      className="border-t border-foreground/15 px-4 py-5 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
        <nav
          aria-label={dict.footer.navTitle}
          className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-foreground/12 pb-4"
        >
          <span className="mr-1 font-bold text-foreground">{dict.footer.navTitle}</span>
          {secondaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav
          id="documents"
          aria-label={dict.proofs.eyebrow}
          className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-foreground/12 py-4"
        >
          <span className="mr-1 font-bold text-foreground">
            {dict.proofs.eyebrow}
          </span>
          {proofLinks.map((proof) => (
            <a
              key={proof.key}
              href={proof.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              {dict.proofs.items[proof.key].title}
            </a>
          ))}
        </nav>

        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} Orhan Madi Assani · {dict.footer.copyright}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href={`/${locale}/mentions-legales`} className="hover:text-foreground">
              {dict.footer.legalNotice}
            </Link>
            <Link
              href={`/${locale}/politique-confidentialite`}
              className="hover:text-foreground"
            >
              {dict.footer.privacyPolicy}
            </Link>
            <CookieSettingsButton label={dict.cookies.manage} />
            <a href="mailto:orhan.madi.assani@gmail.com" aria-label="Email" className="hover:text-primary">
              <Mail aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/OrhanMA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/orhanmadi/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
