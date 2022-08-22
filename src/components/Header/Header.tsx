import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import ArrowDownFont from "../../assets/arrow-down-sign-to-navigate.png";
import lightlogoPic from "../../assets/lightlogo2.png";
import logoPic from "../../assets/mainlogo.png";
import ChainsButton from "./ChainsButton";
import ChainsDropdown from "./ChainsDropdown";
import ConnectWalletButton from "./ConnectWalletButton";
import Logo from "./Logo/Logo";

function Header() {
  const [toggle, setToggle] = useState(true);
  const toggleMenu = () => {
    setToggle(!toggle);
    setDropdown(false);
  };
  const [dropdown, setDropdown] = useState(false);
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  const [hidden, setHidden] = useState<boolean>(false);

  return (
    <nav
      className={`${
        themeMode === "light" ? "bg-[#22223d]" : "bg-[#22223d]"
      } bg-white shadow-lg z-10 pt-[6px] px-[50px] `}
    >
      <div className='max-w-full mx-auto border-b-[1px] border-b-[#FFFFFF] border-opacity-[0.1]'>
        <div className='flex justify-between'>
          <div className='flex space-x-7'>
            <div>
              <Link to='/' className='flex items-center py-4 px-2'>
                {/* Main Menu Logo */}
                <Logo
                  logoPic={themeMode === "light" ? lightlogoPic : lightlogoPic}
                />
              </Link>
            </div>
            {/* Primary Navbar items */}
            {/* <Menu /> */}
          </div>
          {/* Secondary Navbar items */}
          <div
            className={`hidden md:${
              hidden ? "hidden" : "flex"
            } items-center space-x-3 `}
          >
            {/* Chains Button Dropdown */}
            <ChainsButton
              ArrowDownFont={ArrowDownFont}
              setDropdown={setDropdown}
              dropdown={dropdown}
              setToggle={setToggle}
            />
            {/* Check showing dropdown */}
            {dropdown ? (
              <ChainsDropdown setDropdown={setDropdown} setHidden={setHidden} />
            ) : (
              ""
            )}

            {/* Connect wallet button */}
            <ConnectWalletButton />

            {/* change theme button */}
            {/* <ChangeThemeButton /> */}
          </div>
          {/* Mobile menu button */}
          <div className='md:hidden flex items-center'>
            <div className='md:hidden flex items-center md:mr-5'>
              <ChainsButton
                ArrowDownFont={ArrowDownFont}
                setDropdown={setDropdown}
                dropdown={dropdown}
                setToggle={setToggle}
              />
              {dropdown ? (
                <ChainsDropdown
                  setDropdown={setDropdown}
                  setHidden={setHidden}
                />
              ) : (
                ""
              )}
            </div>
            {/* <button
              onClick={toggleMenu}
              className="outline-none mobile-menu-button"
            >
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button> */}
          </div>
        </div>
      </div>
      {/* mobile menu */}
      {/* <div className={`${toggle ? "hidden" : ""} mobile-menu`}>
        <ul className="">
          <li className="active">
            <a
              href="index.html"
              className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
            >
              Contact Us
            </a>
          </li>
          <li></li>
        </ul>
      </div> */}
    </nav>
  );
}

export default Header;
