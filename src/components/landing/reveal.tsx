import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: string;
  y?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  stagger,
  y = 28,
}: RevealProps) {
  return (
    <div
      className={cn("reveal-root", !stagger && "invisible", className)}
      data-reveal-stagger={stagger}
      data-reveal-delay={delay}
      data-reveal-y={y}
    >
      {children}
    </div>
  );
}
