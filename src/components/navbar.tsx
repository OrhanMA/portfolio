"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteIdentity } from "@/components/site-identity";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import type { Locale } from "@/lib/i18n";

export type NavbarMenuItem = {
  href: string;
  label: string;
  badge?: string;
};

export type NavbarMenuGroup = {
  label?: string;
  items: NavbarMenuItem[];
};

type NavbarDictionary = {
  nav: Dictionary["nav"];
  experienceHeading: string;
  skillsHeading: string;
};

type NavbarMenus = {
  competences: NavbarMenuGroup[];
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
  const pathname = usePathname();
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

  const homeHref = `/${locale}`;
  const isCurrentPath = (href: string) =>
    pathname === href ||
    (href !== homeHref && Boolean(pathname?.startsWith(`${href}/`)));

  const leadingLinks = [
    { href: `/${locale}/a-propos`, label: dict.nav.about },
    { href: `/${locale}/parcours`, label: dict.experienceHeading },
  ];

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header id="primary-navigation">
      <Image
        data-navbar-background
        src="/images/navbar-ivy.webp"
        alt=""
        fill
        sizes="100vw"
        quality={70}
        aria-hidden="true"
      />
      <span data-navbar-overlay aria-hidden="true" />
      <nav>
        <SiteIdentity
          href={homeHref}
          ariaCurrent={isCurrentPath(homeHref) ? "page" : undefined}
        />

        <div data-desktop-navigation>
          {leadingLinks.map((link) => (
            <NavbarLink
              key={link.href}
              {...link}
              isCurrent={isCurrentPath(link.href)}
            />
          ))}
          <DesktopSubmenu
            id="desktop-competences-submenu"
            href={`/${locale}/competences`}
            label={dict.skillsHeading}
            allLabel={dict.nav.allCompetences}
            groups={menus.competences}
            isCurrent={isCurrentPath(`/${locale}/competences`)}
          />
          <DesktopSubmenu
            id="desktop-realisations-submenu"
            href={`/${locale}/realisations`}
            label={dict.nav.realisations}
            allLabel={dict.nav.allRealisations}
            items={menus.realisations}
            isCurrent={isCurrentPath(`/${locale}/realisations`)}
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
            aria-current={isCurrentPath(`/${locale}/contact`) ? "page" : undefined}
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
              isCurrent={isCurrentPath(link.href)}
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
            groups={menus.competences}
            isCurrent={isCurrentPath(`/${locale}/competences`)}
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
            isCurrent={isCurrentPath(`/${locale}/realisations`)}
            onNavigate={closeMobileMenu}
          />
          <Link
            href={`/${locale}/contact`}
            prefetch={false}
            aria-current={isCurrentPath(`/${locale}/contact`) ? "page" : undefined}
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

function NavbarLink({
  href,
  label,
  isCurrent,
}: NavbarMenuItem & { isCurrent: boolean }) {
  return (
    <Link
      href={href}
      prefetch={false}
      aria-current={isCurrent ? "page" : undefined}
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
  groups,
  isCurrent,
}: {
  id: string;
  href: string;
  label: string;
  allLabel: string;
  items?: NavbarMenuItem[];
  groups?: NavbarMenuGroup[];
  isCurrent: boolean;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeSubmenu = () => setOpen(false);
  const menuGroups = groups ?? [{ items: items ?? [] }];

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
        onClick={() => setOpen(true)}
        aria-current={isCurrent ? "page" : undefined}
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
            data-submenu-all
          >
            {allLabel}
            <ArrowRight aria-hidden="true" />
          </Link>
          {menuGroups.map((group, groupIndex) => (
            <div key={group.label ?? "ungrouped"} data-submenu-group>
              {group.label && (
                <p data-submenu-group-label>{group.label}</p>
              )}
              {group.items.map((item, itemIndex) => {
                const badgeId = `${id}-group-${groupIndex}-item-${itemIndex}-level`;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    onClick={closeSubmenu}
                    data-submenu-item
                    aria-label={item.label}
                    aria-describedby={item.badge ? badgeId : undefined}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <>
                        <span id={badgeId} className="sr-only">
                          {item.badge}
                        </span>
                        <Badge
                          variant="secondary"
                          data-submenu-badge
                          aria-hidden="true"
                        >
                          {item.badge}
                        </Badge>
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileLink({
  href,
  label,
  isCurrent,
  onNavigate,
}: NavbarMenuItem & { isCurrent: boolean; onNavigate: () => void }) {
  return (
    <Link
      href={href}
      prefetch={false}
      aria-current={isCurrent ? "page" : undefined}
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
  groups,
  isCurrent,
  onNavigate,
}: {
  id: string;
  href: string;
  label: string;
  toggleLabel: string;
  open: boolean;
  onToggle: () => void;
  items?: NavbarMenuItem[];
  groups?: NavbarMenuGroup[];
  isCurrent: boolean;
  onNavigate: () => void;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuGroups = groups ?? [{ items: items ?? [] }];

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Escape" || !open) return;

    event.preventDefault();
    event.stopPropagation();
    onToggle();
    triggerRef.current?.focus();
  }

  return (
    <div data-mobile-submenu onKeyDown={handleKeyDown}>
      <div>
        <MobileLink
          href={href}
          label={label}
          isCurrent={isCurrent}
          onNavigate={onNavigate}
        />
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
        {menuGroups.map((group, groupIndex) => (
          <div key={group.label ?? "ungrouped"} data-submenu-group>
            {group.label && (
              <p data-submenu-group-label>{group.label}</p>
            )}
            {group.items.map((item, itemIndex) => {
              const badgeId = `${id}-group-${groupIndex}-item-${itemIndex}-level`;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  onClick={onNavigate}
                  data-submenu-item
                  aria-label={item.label}
                  aria-describedby={item.badge ? badgeId : undefined}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <>
                      <span id={badgeId} className="sr-only">
                        {item.badge}
                      </span>
                      <Badge
                        variant="secondary"
                        data-submenu-badge
                        aria-hidden="true"
                      >
                        {item.badge}
                      </Badge>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
