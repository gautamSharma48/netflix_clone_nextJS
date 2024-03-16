/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import NavbarItems from "./navbarItems";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileMenu from "./mobileMenu";
import AccountMenu from "./accountMenu";
const Top_Offset = 66;

const Navbar = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showAccountMenu, setAccountMenu] = useState(false);
  const [ShowBackground, SetShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY, 123);
      if (window.scrollY >= Top_Offset) {
        SetShowBackground(true);
      } else {
        SetShowBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useCallback((to: string, blank: boolean) => {
    if (blank) window.location.href = to;
  }, []);
  return (
    <nav className="w-full fixed z-40 text-white">
      <div
        className={`${
          ShowBackground ? "bg-zinc-900 bg-opacity-90" : ""
        } px-4 md:px-16 py-6 flex flex-row items-center transition duration-500`}
      >
        <img src="/images/logo.png" className="h-4 lg:h-7" alt="logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItems label="Home" onClick={() => navigate("/#movie", true)} />
          <NavbarItems
            label="Series"
            onClick={() => navigate("/#series", true)}
          />
          <NavbarItems label="Films" />
          <NavbarItems label="New & Popular" />
          <NavbarItems label="My List" />
          <NavbarItems label="Browse by language" />
        </div>
        <div
          onClick={() => setShowMobileNav(!showMobileNav)}
          className="lg:hidden flex flex-wor items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`${
              showMobileNav && "-rotate-180"
            } text-white transition`}
          />
          <MobileMenu visible={showMobileNav} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div
            onClick={() => setAccountMenu(!showAccountMenu)}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="avatar" />
            </div>
            <BsChevronDown
              className={`${
                showAccountMenu && "-rotate-180"
              } text-white transition`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
