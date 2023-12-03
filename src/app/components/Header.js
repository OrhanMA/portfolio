import Link from "next/link";
import React from "react";

function Header() {
  const pages = [
    {
      name: "À propos",
      route: "/",
    },
    {
      name: "Projets",
      route: "/projets",
    },
    {
      name: "Contact",
      route: "/contact",
    },
  ];
  return (
    <nav className="flex justify-center items-center sticky top-0 px-12 py-4 bg-white">
      {pages.map((page) => {
        return (
          <Link
            className="w-1/3 sm:w-1/6 text-center"
            key={page.name}
            href={page.route}
          >
            {page.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default Header;
