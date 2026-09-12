import { EB_Garamond, Forum, Geist_Mono, Roboto_Flex } from "next/font/google";

const forum = Forum({
  variable: "--font-forum",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  display: "swap",
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const deferredFontClassName = `${forum.variable} ${ebGaramond.variable} ${robotoFlex.variable} ${geistMono.variable}`;
