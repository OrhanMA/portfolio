import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export function Footer({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: string;
}) {
  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/a-propos`, label: dict.nav.about },
    { href: `/${locale}/competences`, label: dict.nav.competences },
    { href: `/${locale}/realisations`, label: dict.nav.realisations },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/articles`, label: dict.nav.articles },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="border-t border-border/70 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
              Orhan Madi Assani
            </p>
            <h2 className="mt-4 max-w-3xl text-balance text-5xl font-semibold leading-[0.92] tracking-normal sm:text-6xl lg:text-7xl">
              {dict.footer.pitch}
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">
              {dict.footer.about}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">
                {dict.footer.navTitle}
              </h3>
              <ul className="mt-4 grid gap-2 text-sm">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-8">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">
                  {dict.footer.linksTitle}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href="mailto:orhan.madi.assani@gmail.com"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/70 text-muted-foreground transition-colors hover:border-primary/70 hover:text-foreground"
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  <a
                    href="https://github.com/OrhanMA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/70 text-muted-foreground transition-colors hover:border-primary/70 hover:text-foreground"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/orhanmadi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/70 text-muted-foreground transition-colors hover:border-primary/70 hover:text-foreground"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">
                  {dict.footer.legalTitle}
                </h3>
                <ul className="mt-4 grid gap-2 text-sm">
                  <li>
                    <Link
                      href={`/${locale}/mentions-legales`}
                      className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {dict.footer.legalNotice}
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/politique-confidentialite`}
                      className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {dict.footer.privacyPolicy}
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-border/70 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Orhan Madi Assani.{" "}
            {dict.footer.copyright}
          </p>
          <p>{dict.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
