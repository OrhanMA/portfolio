import { Geist_Mono, Roboto_Flex } from "next/font/google";

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

export const deferredFontClassName = `${robotoFlex.variable} ${geistMono.variable}`;
