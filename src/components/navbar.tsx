"use client";

import { useState } from "react";
import Image from "next/image";
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
      className="nav-enter fixed inset-x-0 top-0 z-[100] border-b border-foreground/10 bg-background/95 lg:bg-background/92 lg:backdrop-blur-lg"
    >
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          prefetch={false}
          className="group flex shrink-0 items-center gap-3 text-sm font-black uppercase tracking-[-0.015em]"
        >
          <span className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-vermillion bg-background shadow-[2px_2px_0_var(--primary)] transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/coporate-headshot.webp"
              alt=""
              aria-hidden="true"
              fill
              sizes="32px"
              className="object-cover"
            />
          </span>
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
              "hidden rounded-full bg-vermillion px-5 text-vermillion-foreground hover:bg-vermillion/90 md:inline-flex",
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
        <div data-mobile-navigation className="fixed inset-x-3 top-[72px] max-h-[calc(100dvh-84px)] overflow-y-auto overscroll-contain rounded-lg border border-foreground/15 bg-background/98 p-3 shadow-2xl backdrop-blur-xl lg:hidden">
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
                "mt-2 rounded-full bg-vermillion text-vermillion-foreground hover:bg-vermillion/90",
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
      className="rounded-md px-3 py-2 text-xs font-semibold text-foreground/70 transition-colors hover:bg-primary/[0.05] hover:text-foreground"
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
  return (
    <div className="group relative">
      <Link
        href={href}
        prefetch={false}
        aria-haspopup="true"
        className="flex items-center gap-1 rounded-md px-3 py-2 text-xs font-semibold text-foreground/70 transition-colors hover:bg-primary/[0.05] hover:text-foreground"
      >
        {label}
        <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
      </Link>
      <div className="invisible absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-[opacity,visibility,transform] duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-lg border border-foreground/15 bg-background/98 p-2 shadow-2xl backdrop-blur-xl">
          <Link
            href={href}
            prefetch={false}
            className="mb-1 flex items-center justify-between rounded-md bg-primary/[0.06] px-3 py-2.5 text-xs font-black uppercase tracking-[0.08em] text-foreground transition-colors hover:bg-primary/[0.11]"
          >
            {allLabel}
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className="block rounded-md px-3 py-2 text-sm leading-5 text-foreground/70 transition-colors hover:bg-primary/[0.05] hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
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
      className="rounded-md px-4 py-3 text-sm font-bold hover:bg-primary/[0.06]"
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
              className="rounded-md px-3 py-2 text-sm text-foreground/70 transition-colors hover:bg-primary/[0.05] hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
