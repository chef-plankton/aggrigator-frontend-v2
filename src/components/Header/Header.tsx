import React, { useEffect, useState } from "react";
import logoPic from "../../assets/mainlogo.png";
import { Link } from "react-router-dom";
import ArrowDownFont from "../../assets/arrow-down-sign-to-navigate.png";
import ChainsDropdown from "./ChainsDropdown";
import Logo from "./Logo";
import ChainsButton from "./ChainsButton";
import ConnectWalletModal from "../Modals/ConnectWalletModal";
import ConnectWalletButton from "./ConnectWalletButton";
import ConnectingToWalletModal from "./../Modals/ConnectingToWalletModal";
import { hooks, metaMask } from "../../connectors/metaMask";
function Header() {
  const [toggle, setToggle] = useState(true);
  const toggleMenu = () => {
    setToggle(!toggle);
    setDropdown(false);
  };
  const [dropdown, setDropdown] = useState(false);
  // ConnectWalletModal State
  const [connectWalletModalIsOpen, setConnectWalletModalIsOpen] =
    useState(false);
  // ConnectingWalletModal State
  const {
    useChainId,
    useAccounts,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
  } = hooks;
  const isActivating = useIsActivating();
  const [connectingWalletModalIsOpen, setConnectingWalletModalIsOpen] =
    useState(false);
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
            <ConnectWalletButton
              setConnectWalletModalIsOpen={setConnectWalletModalIsOpen}
            />
            <ConnectWalletModal
              connectWalletModalIsOpen={connectWalletModalIsOpen}
              setConnectWalletModalIsOpen={setConnectWalletModalIsOpen}
            />
          </div>
          {isActivating ? (
            <ConnectingToWalletModal
              connectingWalletModalIsOpen={connectingWalletModalIsOpen}
              setConnectingWalletModalIsOpen={setConnectingWalletModalIsOpen}
            />
          ) : (
            ""
          )}

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
          <li></li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
