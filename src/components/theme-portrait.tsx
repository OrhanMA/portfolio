import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

const lightPortraitSrc = "/images/orhan-portrait.webp";
const darkPortraitSrc = "/images/orhan-portrait-dark.webp";

type ThemePortraitProps = Omit<ImageProps, "src">;

/**
 * Keeps the portrait immediately in sync with the class applied by
 * next-themes, without waiting for client-side theme state to hydrate.
 */
export function ThemePortrait({
  className,
  preload = false,
  ...imageProps
}: ThemePortraitProps) {
  return (
    <>
      <Image
        {...imageProps}
        src={lightPortraitSrc}
        className={cn(className, "dark:hidden")}
        preload={preload}
      />
      <Image
        {...imageProps}
        src={darkPortraitSrc}
        className={cn(className, "hidden dark:block")}
        preload={preload}
      />
    </>
  );
}
