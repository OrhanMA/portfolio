"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteIdentity } from "@/components/site-identity";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import type { Locale } from "@/lib/i18n";

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
  locale: Locale;
  dict: NavbarDictionary;
  menus: NavbarMenus;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCompetencesOpen, setMobileCompetencesOpen] = useState(false);
  const [mobileRealisationsOpen, setMobileRealisationsOpen] = useState(false);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    function closeOnEscape(event: globalThis.KeyboardEvent) {
      if (event.key !== "Escape") return;

      event.preventDefault();
      setMobileOpen(false);
      setMobileCompetencesOpen(false);
      setMobileRealisationsOpen(false);
      mobileMenuTriggerRef.current?.focus();
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  const leadingLinks = [
    { href: `/${locale}/a-propos`, label: dict.nav.about },
    { href: `/${locale}#parcours`, label: dict.experienceHeading },
  ];

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header
      id="primary-navigation"
    >
      <nav>
        <SiteIdentity href={`/${locale}`} />

        <div data-desktop-navigation>
          {leadingLinks.map((link) => (
            <NavbarLink key={link.href} {...link} />
          ))}
          <DesktopSubmenu
            id="desktop-competences-submenu"
            href={`/${locale}/competences`}
            label={dict.skillsHeading}
            allLabel={dict.nav.allCompetences}
            items={menus.competences}
          />
          <DesktopSubmenu
            id="desktop-realisations-submenu"
            href={`/${locale}/realisations`}
            label={dict.nav.realisations}
            allLabel={dict.nav.allRealisations}
            items={menus.realisations}
          />
        </div>

        <div>
          <div>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <Link
            href={`/${locale}/contact`}
            prefetch={false}
            className={cn(buttonVariants({ size: "sm" }), "hidden px-5 text-primary-foreground md:inline-flex")}
          >
            {dict.nav.contact}
            <ArrowRight aria-hidden="true" />
          </Link>
          <Button
            ref={mobileMenuTriggerRef}
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-panel"
            aria-label={dict.nav.toggleMenu}
          >
            {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </nav>

      <div
        id="mobile-navigation-panel"
        data-mobile-navigation
        hidden={!mobileOpen}
      >
        <div>
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
          >
            {dict.nav.contact}
            <ArrowRight aria-hidden="true" />
          </Link>
          <div>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavbarLink({ href, label }: NavbarMenuItem) {
  return (
    <Link
      href={href}
      prefetch={false}
    >
      {label}
    </Link>
  );
}

function DesktopSubmenu({
  id,
  href,
  label,
  allLabel,
  items,
}: {
  id: string;
  href: string;
  label: string;
  allLabel: string;
  items: NavbarMenuItem[];
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeSubmenu = () => setOpen(false);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Escape" || !open) return;

    event.preventDefault();
    event.stopPropagation();
    triggerRef.current?.focus();
    closeSubmenu();
  }

  return (
    <div
      className="relative"
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
      onKeyDown={handleKeyDown}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        aria-expanded={open}
        aria-controls={id}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
        />
      </button>
      <div
        className="absolute top-full"
        id={id}
        data-desktop-submenu
        hidden={!open}
      >
        <div>
          <Link
            href={href}
            prefetch={false}
            onClick={closeSubmenu}
          >
            {allLabel}
            <ArrowRight aria-hidden="true" />
          </Link>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              onClick={closeSubmenu}
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
  const triggerRef = useRef<HTMLButtonElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Escape" || !open) return;

    event.preventDefault();
    event.stopPropagation();
    onToggle();
    triggerRef.current?.focus();
  }

  return (
    <div onKeyDown={handleKeyDown}>
      <div>
        <MobileLink href={href} label={label} onNavigate={onNavigate} />
        <Button
          ref={triggerRef}
          variant="ghost"
          size="icon"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          aria-label={`${toggleLabel} ${label}`}
        >
          <ChevronDown
            aria-hidden="true"
          />
        </Button>
      </div>
      <div
        id={id}
        hidden={!open}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            prefetch={false}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
