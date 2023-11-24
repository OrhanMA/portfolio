"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiGithubLogoLight } from "react-icons/pi";
import { PiLinkedinLogoLight } from "react-icons/pi";
import { PiEnvelopeLight } from "react-icons/pi";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const routes = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/projects",
      name: "Projects",
    },
    {
      path: "/info",
      name: "Info",
    },
    {
      path: "mailto:orhan.madi.assani@gmail.com",
      name: "Contact",
    },
  ];
  const pathname = usePathname();
  return (
    <html lang="en">
      <body
        className={`p-12 lg:p-24 min-h-screen text-slate-50 ${inter.className} bg-no-repeat bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-300 via-red-200 to-indigo-200`}
      >
        <div>
          <div className="mb-12">
            <h1 className="text-7xl text-violet-400 font-bold mb-6 md:mb-2">
              Orhan Madi Assani
            </h1>
            <h2 className="text-3xl font-semibold">Front-End Developer</h2>
          </div>
          <ul className="flex flex-col gap-2">
            {routes.map((route, index) => {
              return (
                <li key={index}>
                  <Link
                    className="hover:text-violet-400 font-semibold duration-150 text-2xl"
                    href={route.path}
                    hidden={pathname == route.path && true}
                  >
                    {route.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="w-full flex md:justify-end mt-6 mb-12">
            <div className="bg-white w-min flex md:flex-col items-center p-2 rounded-lg">
              <Link target="_blank" href={"https://github.com/OrhanMA"}>
                <PiGithubLogoLight
                  size={30}
                  color="gray"
                  className="hover:cursor-pointer"
                />
              </Link>
              <Link
                target="_blank"
                href={"https://www.linkedin.com/in/orhanmadi/"}
              >
                <PiLinkedinLogoLight
                  size={30}
                  color="gray"
                  className="hover:cursor-pointer"
                />
              </Link>
              <Link href={"mailto:orhan.madi.assani@gmail.com"}>
                <PiEnvelopeLight
                  size={30}
                  color="gray"
                  className="hover:cursor-pointer"
                />
              </Link>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
