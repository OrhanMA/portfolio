import { describe, expect, it } from "vitest";
import frDict from "@/app/[locale]/dictionaries/fr.json";
import enDict from "@/app/[locale]/dictionaries/en.json";

const unavailableAvailabilityTerms = [
  "disponible pour",
  "ouvert aux",
  "opportunités de collaboration",
  "open to",
  "collaboration opportunities",
  "interested in my profile",
  "intéressé par mon profil",
];

function collectHomeCopy(dictionary: typeof frDict) {
  return [
    dictionary.hero.availabilityLabel,
    dictionary.hero.availability,
    dictionary.hero.ctaContact,
    ...dictionary.hero.proofs.flatMap((proof) => [proof.value, proof.label]),
    dictionary.cta.heading,
    dictionary.cta.text,
    dictionary.contact.pageDescription,
    dictionary.contact.subtext,
  ]
    .join(" ")
    .toLowerCase();
}

describe("homepage positioning copy", () => {
  it("keeps availability wording neutral in French and English", () => {
    const copy = [collectHomeCopy(frDict), collectHomeCopy(enDict)].join(" ");

    for (const term of unavailableAvailabilityTerms) {
      expect(copy).not.toContain(term);
    }
  });

  it("uses general hero proof cards instead of specific metrics", () => {
    expect(frDict.hero.proofs.map((proof) => proof.value)).toEqual([
      "ERP",
      "Web",
      "Produit",
    ]);
    expect(enDict.hero.proofs.map((proof) => proof.value)).toEqual([
      "ERP",
      "Web",
      "Product",
    ]);
  });
});
