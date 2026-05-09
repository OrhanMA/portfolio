"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useDictionary } from "@/components/dictionary-provider";
import { cn } from "@/lib/utils";
import { competences } from "@/lib/competences";
import { realisations } from "@/lib/realisations";
import type { Locale } from "@/lib/i18n";

export function Navbar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const container = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCompOpen, setMobileCompOpen] = useState(false);
  const [mobileRealOpen, setMobileRealOpen] = useState(false);
  const dict = useDictionary();

  const plainLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/a-propos`, label: dict.nav.about },
    { href: `/${locale}/projects`, label: dict.nav.projects },
  ];

  const trailingLinks = [
    { href: `/${locale}/articles`, label: dict.nav.articles },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname.startsWith(href);

  useGSAP(
    () => {
      gsap.from(container.current, {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  const competenceItems = competences.map((c) => ({
    href: `/${locale}/competences/${c.slug}`,
    label: c.title[locale as Locale],
  }));

  const realisationItems = realisations.map((r) => ({
    href: `/${locale}/realisations/${r.slug}`,
    label: r.title[locale as Locale],
  }));

  return (
    <header
      ref={container}
      className="fixed left-0 right-0 top-0 z-[100] px-3 py-3"
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between rounded-lg border border-border/70 bg-background/78 px-3 shadow-2xl shadow-background/10 backdrop-blur-xl sm:px-4">
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <Avatar size="sm">
            <AvatarImage src="/images/coporate-headshot.webp" alt="Orhan Madi Assani" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <span className="hidden leading-none sm:block">
            <span className="block text-sm font-semibold tracking-normal">
              Orhan Madi
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Fullstack
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {plainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "rounded-md px-3 text-muted-foreground hover:text-foreground",
                isActive(link.href) && "bg-muted text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Compétences dropdown */}
          <DesktopDropdown
            href={`/${locale}/competences`}
            label={dict.nav.competences}
            active={isActive(`/${locale}/competences`)}
            items={competenceItems}
          />

          {/* Réalisations dropdown */}
          <DesktopDropdown
            href={`/${locale}/realisations`}
            label={dict.nav.realisations}
            active={isActive(`/${locale}/realisations`)}
            items={realisationItems}
          />

          {trailingLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "rounded-md px-3 text-muted-foreground hover:text-foreground",
                isActive(link.href) && "bg-muted text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}

        </div>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-x-3 top-[76px] overflow-hidden rounded-lg border border-border/70 bg-background/96 shadow-2xl backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 p-3">
            {plainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "h-11 justify-start rounded-md px-3 text-muted-foreground hover:text-foreground",
                  isActive(link.href) && "bg-muted text-foreground"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Compétences accordion */}
            <MobileAccordion
              href={`/${locale}/competences`}
              label={dict.nav.competences}
              active={isActive(`/${locale}/competences`)}
              open={mobileCompOpen}
              onToggle={() => setMobileCompOpen(!mobileCompOpen)}
              items={competenceItems}
              onNavigate={() => setMobileOpen(false)}
            />

            {/* Mobile Réalisations accordion */}
            <MobileAccordion
              href={`/${locale}/realisations`}
              label={dict.nav.realisations}
              active={isActive(`/${locale}/realisations`)}
              open={mobileRealOpen}
              onToggle={() => setMobileRealOpen(!mobileRealOpen)}
              items={realisationItems}
              onNavigate={() => setMobileOpen(false)}
            />

            {trailingLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "h-11 justify-start rounded-md px-3 text-muted-foreground hover:text-foreground",
                  isActive(link.href) && "bg-muted text-foreground"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ─── Desktop hover dropdown ─── */

function DesktopDropdown({
  href,
  label,
  active,
  items,
}: {
  href: string;
  label: string;
  active: boolean;
  items: { href: string; label: string }[];
}) {
  return (
    <div className="group relative">
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "gap-1 rounded-md px-3 text-muted-foreground hover:text-foreground",
          active && "bg-muted text-foreground"
        )}
      >
        {label}
        <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
      </Link>

      {/* Dropdown panel */}
      <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
        <div className="w-72 rounded-lg border border-border/70 bg-background/96 p-2 shadow-2xl backdrop-blur-xl">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2.5 text-sm leading-5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile accordion ─── */

function MobileAccordion({
  href,
  label,
  active,
  open,
  onToggle,
  items,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  open: boolean;
  onToggle: () => void;
  items: { href: string; label: string }[];
  onNavigate: () => void;
}) {
  return (
    <div>
      <div className="flex items-center">
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "h-11 flex-1 justify-start rounded-md px-3 text-muted-foreground hover:text-foreground",
            active && "bg-muted text-foreground"
          )}
          onClick={onNavigate}
        >
          {label}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onToggle}
        >
          <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            open && "rotate-180"
            )}
          />
        </Button>
      </div>
      {open && (
        <div className="ml-4 flex flex-col gap-0.5 border-l border-border/50 pl-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
