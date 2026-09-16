import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

const lightPortraitSrc = "/images/orhan-portrait.webp";
const darkPortraitSrc = "/images/orhan-portrait-dark.webp";

type ThemePortraitProps = Omit<ImageProps, "src" | "alt"> & {
  alt: string;
};

/**
 * Keeps the portrait immediately in sync with the class applied by
 * next-themes, without waiting for client-side theme state to hydrate.
 */
export function ThemePortrait({
  className,
  preload = false,
  alt,
  ...imageProps
}: ThemePortraitProps) {
  return (
    <>
      <Image
        {...imageProps}
        src={lightPortraitSrc}
        alt={alt}
        className={cn(className, "dark:hidden")}
        preload={preload}
      />
      <Image
        {...imageProps}
        src={darkPortraitSrc}
        alt={alt}
        className={cn(className, "hidden dark:block")}
        preload={preload}
      />
    </>
  );
}
