import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export function Footer({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: string;
}) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold">Orhan Madi Assani</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {dict.footer.about}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold">{dict.footer.navTitle}</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/a-propos`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/competences`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {dict.nav.competences}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/realisations`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {dict.nav.realisations}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/articles`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {dict.nav.articles}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold">{dict.footer.linksTitle}</h3>
            <div className="mt-2 flex gap-4">
              <a
                href="https://github.com/OrhanMA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/orhanmadi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold">{dict.footer.legalTitle}</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/mentions-legales`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {dict.footer.legalNotice}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/politique-confidentialite`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {dict.footer.privacyPolicy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
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
