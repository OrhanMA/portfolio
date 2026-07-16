import Document, { Head, Html, Main, NextScript } from "next/document";

export default function PortfolioDocument({ locale }) {
  return (
    <Html lang={locale} suppressHydrationWarning>
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

PortfolioDocument.getInitialProps = async (context) => {
  const initialProps = await Document.getInitialProps(context);
  return {
    ...initialProps,
    locale: context.query?.locale === "en" ? "en" : "fr",
  };
};
