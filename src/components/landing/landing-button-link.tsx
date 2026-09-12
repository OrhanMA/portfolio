"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LandingButtonLink({
  href,
  children,
  className,
  variant,
  size,
}: {
  href: string;
  children: ReactNode;
  className?: string;
} & VariantProps<typeof buttonVariants>) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </Link>
  );
}
