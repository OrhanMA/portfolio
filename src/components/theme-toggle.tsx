"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/components/dictionary-provider";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const { nav } = useDictionary();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={nav.toggleTheme}
    >
      <Sun aria-hidden="true" className="dark:hidden" />
      <Moon aria-hidden="true" className="hidden dark:block" />
    </Button>
  );
}
