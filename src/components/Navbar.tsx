import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";

type NavbarProps = {
  id: number;
  name: string;
  path: string;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const navLinks: NavbarProps[] = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Browse",
      path: "/browse",
    },
    {
      id: 3,
      name: "Movies",
      path: "/movies",
    },
    {
      id: 4,
      name: "TV Shows",
      path: "/tv-shows",
    },
  ];

  return (
    <header className="relative z-[999] bg-[#131213] text-gray-50">
      <nav className="container flex items-center justify-between py-5 px-4">
        <Link to="/" className="font-bold uppercase">
          Reelspark
        </Link>
        <ul className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link to={link.path} className="font-medium transition hover:text-yellow-400">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger button */}
        <button aria-label="Open" onClick={handleIsOpen} className="md:hidden">
          <FaBars size={18} />
        </button>
      </nav>

      {/* Mobile navbar */}
      <div className={isOpen ? "fixed left-0 top-0 h-screen w-full bg-black bg-opacity-40 md:hidden" : ""}>
        <nav className={isOpen ? "nav-open" : "nav-close"}>
          <div className="flex items-center justify-between">
            <Link to="/" className="font-bold uppercase">
              Reelspark
            </Link>
            <button aria-label="Close" onClick={handleIsOpen} className="cursor-pointer">
              <MdClose size={18} />
            </button>
          </div>
          <ul className="my-12 space-y-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link to={link.path} onClick={handleIsOpen} className="text-sm font-medium transition hover:text-yellow-400">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
