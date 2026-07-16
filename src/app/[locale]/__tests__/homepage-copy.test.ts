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

  it("uses short, verifiable hero proofs in both languages", () => {
    expect(frDict.hero.proofs.map((proof) => proof.value)).toEqual([
      "22",
      "920/990",
    ]);
    expect(enDict.hero.proofs.map((proof) => proof.value)).toEqual([
      "22",
      "920/990",
    ]);
    expect(frDict.hero.proofs[0].label).toContain("open source");
    expect(enDict.hero.proofs[1].label).toContain("August 7, 2025");
  });
});
