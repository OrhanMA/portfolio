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
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Avatar size="sm">
            <AvatarImage src="/images/coporate-headshot.webp" alt="Orhan Madi Assani" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {plainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-muted-foreground hover:text-foreground",
                isActive(link.href) && "text-foreground bg-accent"
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
                "text-muted-foreground hover:text-foreground",
                isActive(link.href) && "text-foreground bg-accent"
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="ml-2 flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {plainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "justify-start text-muted-foreground hover:text-foreground",
                  isActive(link.href) && "text-foreground bg-accent"
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
                  "justify-start text-muted-foreground hover:text-foreground",
                  isActive(link.href) && "text-foreground bg-accent"
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
          "text-muted-foreground hover:text-foreground gap-1",
          active && "text-foreground bg-accent"
        )}
      >
        {label}
        <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
      </Link>

      {/* Dropdown panel */}
      <div className="invisible absolute left-0 top-full z-50 pt-1 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
        <div className="w-64 rounded-lg border border-border/60 bg-background/95 p-2 shadow-xl backdrop-blur-md">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
            "flex-1 justify-start text-muted-foreground hover:text-foreground",
            active && "text-foreground bg-accent"
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
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
