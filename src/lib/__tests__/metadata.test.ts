import { describe, expect, it } from "vitest";
import {
  createLocalizedMetadata,
  localizedAlternates,
  localizedUrl,
} from "@/lib/metadata";

describe("localizedAlternates", () => {
  it("builds canonical and language URLs for a localized route", () => {
    expect(localizedAlternates("fr", "/competences/backend/")).toEqual({
      canonical: "/fr/competences/backend",
      languages: {
        fr: "/fr/competences/backend",
        en: "/en/competences/backend",
        "x-default": "/fr/competences/backend",
      },
    });
  });

  it("supports locale homepages", () => {
    expect(localizedAlternates("en")).toEqual({
      canonical: "/en",
      languages: { fr: "/fr", en: "/en", "x-default": "/fr" },
    });
  });
});

describe("localized metadata", () => {
  it("builds an absolute localized social URL", () => {
    expect(localizedUrl("en", "/articles/example/")).toBe(
      "https://orhanmadiassani.com/en/articles/example",
    );
  });

  it("keeps canonical, Open Graph and Twitter metadata in sync", () => {
    const metadata = createLocalizedMetadata({
      locale: "fr",
      pathname: "/contact",
      title: "Contact",
      description: "Échangeons.",
    });

    expect(metadata.alternates).toEqual({
      canonical: "/fr/contact",
      languages: {
        fr: "/fr/contact",
        en: "/en/contact",
        "x-default": "/fr/contact",
      },
    });
    expect(metadata.openGraph).toMatchObject({
      title: "Contact",
      description: "Échangeons.",
      url: "https://orhanmadiassani.com/fr/contact",
      locale: "fr_FR",
      images: [expect.objectContaining({ url: "/fr/opengraph-image" })],
    });
    expect(metadata.twitter).toMatchObject({
      title: "Contact",
      description: "Échangeons.",
      images: ["/fr/opengraph-image"],
    });
  });
});
