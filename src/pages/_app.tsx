import type { AppProps } from "next/app";
import "@/app/globals.css";
import { deferredFontClassName } from "@/components/deferred-fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={deferredFontClassName}>
      <Component {...pageProps} />
    </div>
  );
}
