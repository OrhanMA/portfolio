import React from "react";
import { playfair, mulish } from "./layout";
import Image from "next/image";
function Page() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 mb-6">
        <h1 className={`${playfair.className} text-4xl font-bold mb-2`}>
          Bienvenue !
        </h1>
        <p>
          Je suis Orhan Madi Assani, développeur web junior basé à Chambéry, en
          Savoie.
        </p>
        <p>
          J&apos;ai fait ce site pour quiconque serait intéressé d&apos;en
          apprendre plus sur mon profil et mes réalisations.
        </p>
        <p className="mb-6">
          N&apos;hésitez pas à me contacter, je suis ouvert à toute opportunité
          !
        </p>
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <h2 className={`${playfair.className} text-2xl font-semibold mb-2`}>
          Mon parcours
        </h2>
        <p>
          En 2022, j&apos;ai quitté ma deuxième année de licence pour me
          réorienter vers un domaine qui me plaisait mais que je n&apos;avais
          jamais osé essayer d&apos;apprendre : la programmation.
        </p>
        <p>
          Je commence alors à apprendre le développement web en autodidacte
          grâce à YouTube, Udemy et surtout The Odin Project.
        </p>
        <p>
          Après 5 mois d&apos;apprentissage en autodidacte, je décide de
          m&apos;inscrire à une formation en développement web et web mobile à
          Simplon (DWWM - BAC+2).
        </p>
        <p>
          Cette formation m&apos;a permis de fortifier mes bases, tout en
          continuant ma montée en progression. Je me rends compte ici que
          développer est ce que je veux faire et que cela me plaît vraiment.
        </p>
        <p>
          Après 7 mois de formation et 3 mois de stage, la formation se termine
          et je décide de continuer pour un an de plus en Conception et
          développement d&apos;applications (CDA - BAC+3/4) à Grenoble,
          formation dans laquelle je suis jusqu&apos;à fin 2024.
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <h2 className={`${playfair.className} text-2xl font-semibold mb-4`}>
          Ma stack
        </h2>
        <div className="flex flex-col gap-4 items-center mb-6">
          <h3 className={`${playfair.className} text-xl font-semibold mb-2`}>
            Principale
          </h3>
          <div className="flex gap-6">
            {stack_principale.map((tech) => {
              return (
                <Image
                  key={tech.name}
                  alt={tech.name}
                  src={`https://img.icons8.com/${tech.src}`}
                  width={"50"}
                  height={"50"}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center mb-6">
          <h3 className={`${playfair.className} text-xl font-semibold mb-2`}>
            Secondaire
          </h3>
          <div className="flex gap-6">
            {stack_secondaire.map((tech) => {
              return (
                <Image
                  key={tech.name}
                  alt={tech.name}
                  src={`https://img.icons8.com/${tech.src}`}
                  width={"50"}
                  height={"50"}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center mb-6">
          <h3 className={`${playfair.className} text-xl font-semibold mb-2`}>
            Tranversale
          </h3>
          <div className="flex gap-6">
            {transversale.map((tech) => {
              return (
                <Image
                  key={tech.name}
                  alt={tech.name}
                  src={`https://img.icons8.com/${tech.src}`}
                  width={"50"}
                  height={"50"}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <h2 className={`${playfair.className} text-2xl font-semibold mb-2`}>
          Mes objectifs
        </h2>
        <ul className="flex flex-col gap-1 list-disc pl-2">
          <li>Gagner en compétences et en expérience</li>
          <li>Décrocher mon premier emploi en tant que développeur</li>
          <li>M&apos;épanouir!</li>
        </ul>
      </div>
    </div>
  );
}

export default Page;

const stack_principale = [
  {
    name: "React",
    src: "office/40/react.png",
  },
  {
    name: "Next.js",
    src: "fluency/48/nextjs.png",
  },
  {
    name: "MySQL",
    src: "color/50/mysql-logo.png",
  },
  {
    name: "Tailwind CSS",
    src: "color/50/tailwind_css.png",
  },
];
const stack_secondaire = [
  {
    name: "Express.js",
    src: "ios/50/express-js.png",
  },
  {
    name: "Laravel",
    src: "fluency/50/laravel.png",
  },
  {
    name: "MongoDB",
    src: "external-tal-revivo-color-tal-revivo/50/external-mongodb-a-cross-platform-document-oriented-database-program-logo-color-tal-revivo.png",
  },
];
const transversale = [
  {
    name: "Git",
    src: "color/50/git.png",
  },
  {
    name: "Jest",
    src: "external-tal-revivo-color-tal-revivo/50/external-jest-can-collect-code-coverage-information-from-entire-projects-logo-color-tal-revivo.png",
  },
  {
    name: "Postgre",
    src: "external-tal-revivo-color-tal-revivo/50/external-postgre-sql-a-free-and-open-source-relational-database-management-system-logo-color-tal-revivo.png",
  },
  {
    name: "Digital Ocean",
    src: "windows/50/digital-ocean.png",
  },
  {
    name: "Prisma",
    src: "ios/50/prisma-orm.png",
  },
];
