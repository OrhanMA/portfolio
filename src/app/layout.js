import { Mulish, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
export const playfair = Playfair_Display({ subsets: ["latin"] });
export const mulish = Mulish({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        <Header />
        <div className="min-h-screen p-12 sm:p-24">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
