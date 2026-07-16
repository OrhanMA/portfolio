import frDictionary from "@/app/[locale]/dictionaries/fr.json";
import enDictionary from "@/app/[locale]/dictionaries/en.json";
import { StaticHomepage } from "@/components/static-homepage";

export const config = { unstable_runtimeJS: false };

export async function getStaticPaths() {
  return {
    paths: [{ params: { locale: "fr" } }, { params: { locale: "en" } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { locale: params.locale } };
}

export default function LocaleHomepage({ locale }) {
  const currentLocale = locale === "en" ? "en" : "fr";
  const dictionary = currentLocale === "en" ? enDictionary : frDictionary;

  return <StaticHomepage locale={currentLocale} dict={dictionary} />;
}
