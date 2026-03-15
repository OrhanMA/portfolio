import { Roboto_Flex, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GTMNoscript } from "@/components/analytics";

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${robotoFlex.className} ${geistMono.variable} antialiased`}
      >
        <GTMNoscript />
        {children}
      </body>
    </html>
  );
}
