import type { Dictionary } from "@/app/[locale]/dictionaries";

export function AboutSection({ dict }: { dict: Dictionary["about"] }) {
  const principles = [
    {
      title: dict.card1Title,
      description: dict.card1Desc,
    },
    {
      title: dict.card2Title,
      description: dict.card2Desc,
    },
    {
      title: dict.card3Title,
      description: dict.card3Desc,
    },
  ];

  return (
    <section
      id="a-propos"
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1fr)] lg:gap-20">
        <div>
          <h2 className="about-copy invisible text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            {dict.heading}
          </h2>
          <p className="about-copy invisible mt-6 max-w-2xl text-xl font-medium leading-8">
            {dict.statement}
          </p>
          <p className="about-copy invisible mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            {dict.text}
          </p>
        </div>

        <div className="about-stamps border-t border-border">
          {principles.map((principle) => {
            return (
              <article
                key={principle.title}
                className="about-stamp invisible border-b border-border py-6"
              >
                <div>
                  <h3 className="text-base font-semibold">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
