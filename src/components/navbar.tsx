"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export type NavbarMenuItem = {
  href: string;
  label: string;
};

type NavbarDictionary = {
  nav: Dictionary["nav"];
  experienceHeading: string;
  skillsHeading: string;
};

type NavbarMenus = {
  competences: NavbarMenuItem[];
  realisations: NavbarMenuItem[];
};

export function Navbar({
  locale,
  dict,
  menus,
}: {
  locale: string;
  dict: NavbarDictionary;
  menus: NavbarMenus;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCompetencesOpen, setMobileCompetencesOpen] = useState(false);
  const [mobileRealisationsOpen, setMobileRealisationsOpen] = useState(false);

  const leadingLinks = [
    { href: `/${locale}/a-propos`, label: dict.nav.about },
    { href: `/${locale}#parcours`, label: dict.experienceHeading },
  ];

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header
      id="primary-navigation"
      className="nav-enter fixed inset-x-0 top-0 z-[100] border-b border-border bg-background/95 backdrop-blur-sm"
    >
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          prefetch={false}
          className="shrink-0 text-sm font-semibold tracking-[-0.01em]"
        >
          <span>
            Orhan<span className="hidden sm:inline"> Madi Assani</span>
          </span>
        </Link>

        <div data-desktop-navigation className="hidden items-center gap-1 lg:flex">
          {leadingLinks.map((link) => (
            <NavbarLink key={link.href} {...link} />
          ))}
          <DesktopSubmenu
            href={`/${locale}/competences`}
            label={dict.skillsHeading}
            allLabel={dict.nav.allCompetences}
            items={menus.competences}
          />
          <DesktopSubmenu
            href={`/${locale}/realisations`}
            label={dict.nav.realisations}
            allLabel={dict.nav.allRealisations}
            items={menus.realisations}
          />
        </div>

        <div className="flex items-center gap-1.5">
          <div className="hidden items-center sm:flex">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <Link
            href={`/${locale}/contact`}
            prefetch={false}
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden px-5 md:inline-flex",
            )}
          >
            {dict.nav.contact}
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={dict.nav.toggleMenu}
          >
            {mobileOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <div data-mobile-navigation className="fixed inset-x-3 top-[72px] max-h-[calc(100dvh-84px)] overflow-y-auto overscroll-contain border border-border bg-background p-3 shadow-lg lg:hidden">
          <div className="grid gap-1">
            {leadingLinks.map((link) => (
              <MobileLink
                key={link.href}
                {...link}
                onNavigate={closeMobileMenu}
              />
            ))}
            <MobileSubmenu
              id="mobile-competences-submenu"
              href={`/${locale}/competences`}
              label={dict.skillsHeading}
              toggleLabel={dict.nav.showSubmenu}
              open={mobileCompetencesOpen}
              onToggle={() => setMobileCompetencesOpen((open) => !open)}
              items={menus.competences}
              onNavigate={closeMobileMenu}
            />
            <MobileSubmenu
              id="mobile-realisations-submenu"
              href={`/${locale}/realisations`}
              label={dict.nav.realisations}
              toggleLabel={dict.nav.showSubmenu}
              open={mobileRealisationsOpen}
              onToggle={() => setMobileRealisationsOpen((open) => !open)}
              items={menus.realisations}
              onNavigate={closeMobileMenu}
            />
            <Link
              href={`/${locale}/contact`}
              prefetch={false}
              onClick={closeMobileMenu}
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-2",
              )}
            >
              {dict.nav.contact}
              <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
            </Link>
            <div className="mt-2 flex items-center justify-center gap-2 border-t border-foreground/10 pt-3 sm:hidden">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavbarLink({ href, label }: NavbarMenuItem) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="rounded-sm px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {label}
    </Link>
  );
}

function DesktopSubmenu({
  href,
  label,
  allLabel,
  items,
}: {
  href: string;
  label: string;
  allLabel: string;
  items: NavbarMenuItem[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={(event) => {
        if (!event.currentTarget.contains(document.activeElement)) {
          setOpen(false);
        }
      }}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <Link
        href={href}
        prefetch={false}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1 rounded-sm px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
        />
      </Link>
      {open && (
        <div
          data-desktop-submenu
          className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3"
        >
          <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto border border-border bg-background p-2 shadow-lg">
            <Link
              href={href}
              prefetch={false}
              className="mb-1 flex items-center justify-between rounded-sm bg-muted px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors hover:bg-accent"
            >
              {allLabel}
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className="block rounded-sm px-3 py-2 text-sm leading-5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileLink({
  href,
  label,
  onNavigate,
}: NavbarMenuItem & { onNavigate: () => void }) {
  return (
    <Link
      href={href}
      prefetch={false}
      onClick={onNavigate}
      className="rounded-sm px-4 py-3 text-sm font-semibold hover:bg-muted"
    >
      {label}
    </Link>
  );
}

function MobileSubmenu({
  id,
  href,
  label,
  toggleLabel,
  open,
  onToggle,
  items,
  onNavigate,
}: {
  id: string;
  href: string;
  label: string;
  toggleLabel: string;
  open: boolean;
  onToggle: () => void;
  items: NavbarMenuItem[];
  onNavigate: () => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-1">
        <MobileLink href={href} label={label} onNavigate={onNavigate} />
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          aria-label={`${toggleLabel} ${label}`}
        >
          <ChevronDown
            aria-hidden="true"
            className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          />
        </Button>
      </div>
      {open && (
        <div id={id} className="ml-4 grid gap-0.5 border-l border-foreground/15 pl-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              onClick={onNavigate}
              className="rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
