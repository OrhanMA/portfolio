"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useDictionary } from "@/components/dictionary-provider";
import { cn } from "@/lib/utils";

export function Navbar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const container = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dict = useDictionary();

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/articles`, label: dict.nav.articles },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/#competences`, label: dict.nav.skills },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

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
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-muted-foreground hover:text-foreground",
                pathname === link.href && "text-foreground bg-accent"
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
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "justify-start text-muted-foreground hover:text-foreground",
                  pathname === link.href && "text-foreground bg-accent"
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
