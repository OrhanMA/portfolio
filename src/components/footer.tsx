import Link from "next/link";
import { Mail } from "lucide-react";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import type { Locale } from "@/lib/i18n";

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
  locale: Locale;
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
    >
      <div>
        <nav
          aria-label={dict.footer.navTitle}
        >
          <span>{dict.footer.navTitle}</span>
          {secondaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav
          id="documents"
          aria-label={dict.proofs.eyebrow}
        >
          <span>
            {dict.proofs.eyebrow}
          </span>
          {proofLinks.map((proof) => (
            <a
              key={proof.key}
              href={proof.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.proofs.items[proof.key].title}
            </a>
          ))}
        </nav>

        <div>
          <p>
            © {new Date().getFullYear()} Orhan Madi Assani · {dict.footer.copyright}
          </p>

          <div>
            <Link href={`/${locale}/mentions-legales`}>
              {dict.footer.legalNotice}
            </Link>
            <Link
              href={`/${locale}/politique-confidentialite`}
            >
              {dict.footer.privacyPolicy}
            </Link>
            <CookieSettingsButton label={dict.cookies.manage} />
            <a href="mailto:orhan.madi.assani@gmail.com" aria-label="Email">
              <Mail aria-hidden="true" />
            </a>
            <a
              href="https://github.com/OrhanMA"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/orhanmadi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
