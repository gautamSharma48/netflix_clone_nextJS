/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import NavbarItems from "./navbarItems";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileMenu from "./mobileMenu";
import AccountMenu from "./accountMenu";
import { useRouter } from "next/router";
const Top_Offset = 66;

interface NavbarProps {
  setSearchValue: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setSearchValue }) => {
  const router = useRouter();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showAccountMenu, setAccountMenu] = useState(false);
  const [ShowBackground, SetShowBackground] = useState(false);
  const [showSearchInput, setShowInput] = useState(false);

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

  const navigate = useCallback(
    (to: string, blank: boolean) => {
      if (blank) return (window.location.href = to);
      router.push("/");
    },
    [router]
  );
  return (
    <nav className="w-full fixed z-40 text-white">
      <div
        className={`${
          ShowBackground ? "bg-zinc-900 bg-opacity-90" : ""
        } px-2 md:px-16 py-6 flex flex-row items-center transition duration-500`}
      >
        <img src="/images/logo.png" className="h-4 lg:h-7" alt="logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItems label="Home" onClick={() => navigate("/", false)} />
          <NavbarItems
            label="Series"
            onClick={() => navigate("/#series", true)}
          />
          <NavbarItems
            label="Films"
            onClick={() => navigate("/#movie", true)}
          />
          <NavbarItems label="New & Popular" />
          <NavbarItems label="My List" />
          <NavbarItems label="Browse by language" />
        </div>
        <div
          onClick={() => setShowMobileNav(!showMobileNav)}
          className="lg:hidden flex flex-row items-center gap-2 ml-2 md:ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`${
              showMobileNav && "-rotate-180"
            } text-white transition`}
          />
          <MobileMenu visible={showMobileNav} />
        </div>
        <div className="flex flex-row ml-auto md:gap-7 gap-3 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <div
              onClick={() => setShowInput(true)}
              className="w-full px-2 py-1 md:px-4 md:py-2 bg-zinc-800 rounded-md flex items-center transition duration-100 "
            >
              {showSearchInput && (
                <input
                  className="bg-transparent outline-none text-sm text-white h-full w-full transition duration-100"
                  type="text"
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search movie and series"
                ></input>
              )}

              <BsSearch size={18} />
            </div>
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
