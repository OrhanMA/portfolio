import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type PageEndCtaLink = {
  href: string;
  label: string;
};

export function PageEndCta({
  id,
  title,
  description,
  links,
}: {
  id: string;
  title: string;
  description: string;
  links: PageEndCtaLink[];
}) {
  return (
    <section
      data-page-end-cta
      aria-labelledby={`${id}-heading`}
    >
      <div>
        <div>
          <h2 id={`${id}-heading`}>{title}</h2>
          <p>{description}</p>
        </div>

        <nav aria-label={title}>
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              data-page-end-cta-primary={index === 0 ? "true" : undefined}
            >
              {link.label}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
