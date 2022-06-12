import React, { useEffect, useState } from "react";
import logoPic from "../../assets/mainlogo.png";
import { Link } from "react-router-dom";
import ArrowDownFont from "../../assets/arrow-down-sign-to-navigate.png";
import ChainsDropdown from "./ChainsDropdown";
import Logo from "./Logo";
import ChainsButton from "./ChainsButton";
import ConnectWalletModal from "../../Modals/ConnectWalletModal";
function Header() {
  const [walletAdress, setWalletAdress] = useState<string | null | undefined>(
    null
  );
  const [toggle, setToggle] = useState(true);
  const toggleMenu = () => {
    setToggle(!toggle);
    setDropdown(false);
  };
  const [dropdown, setDropdown] = useState(false);
  // Modal State
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openmodaaal = () => {
    setIsOpen(true);
  };
  return (
    <nav className="bg-white shadow-lg z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* Website Logo */}
              <Link to="/" className="flex items-center py-4 px-2">
                <Logo logoPic={logoPic} />
              </Link>
            </div>
            {/* Primary Navbar items */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/1"
                className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold "
              >
                Home
              </Link>
              <Link
                to="/3"
                className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
              >
                About
              </Link>
              <Link
                to="/4"
                className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
          {/* Secondary Navbar items */}
          <div className="hidden md:flex items-center space-x-3 ">
            <ChainsButton
              ArrowDownFont={ArrowDownFont}
              setDropdown={setDropdown}
              dropdown={dropdown}
              setToggle={setToggle}
            />
            {dropdown ? <ChainsDropdown /> : ""}
            <button
              onClick={openmodaaal}
              className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
            >
              {walletAdress === undefined ? "Connect Wallet" : walletAdress}
            </button>
            <ConnectWalletModal
              modalIsOpen={modalIsOpen}
              setIsOpen={setIsOpen}
            />
            {/* {active ? (
              <button
                onClick={onClickForDisconnect}
                className="py-2 px-2 font-medium text-white bg-red-500 rounded hover:bg-red-400 transition duration-300"
              >
                Disconnect
              </button>
            ) : (
              ""
            )} */}
          </div>
          {/* Mobile menu button */}

          <div className="md:hidden flex items-center">
            <div className="md:hidden flex items-center mr-5">
              <ChainsButton
                ArrowDownFont={ArrowDownFont}
                setDropdown={setDropdown}
                dropdown={dropdown}
                setToggle={setToggle}
              />
              {dropdown ? <ChainsDropdown /> : ""}
            </div>
            <button
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
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      <div className={`${toggle ? "hidden" : ""} mobile-menu`}>
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
          <li>
            <button className="block py-2 px-2 font-medium text-white bg-green-500 hover:bg-green-400 transition duration-300">
              {walletAdress === undefined ? "Connect Wallet" : walletAdress}
            </button>
            {/* {active ? (
              <button
                // onClick={onClickForDisconnect}
                className="py-2 px-2 font-medium text-white bg-red-500 rounded hover:bg-red-400 transition duration-300"
              >
                Disconnect
              </button>
            ) : (
              ""
            )} */}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
