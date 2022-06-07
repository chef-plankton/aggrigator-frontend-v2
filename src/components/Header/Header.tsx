import React, { useState } from "react";
import logoPic from "../../assets/1inch-network-logo-vector.png";
import { Link } from "react-router-dom";
import ArrowDownFont from "../../assets/arrow-down-sign-to-navigate.png";
import ChainsDropdown from "./ChainsDropdown";
import Logo from "./Logo";
function Header() {
  const [toggle, setToggle] = useState(true);
  const toggleMenu = () => {
    setToggle(!toggle);
  };
  const [dropdown, setDropdown] = useState(false);
  return (
    <nav className="bg-white shadow-lg">
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
                to="/2"
                className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
              >
                Services
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
            <button
              onClick={() => setDropdown(!dropdown)}
              className="py-2 px-2 font-medium text-gray-500 rounded transition duration-300 flex items-center chainslistbtn"
            >
              <img
                src="https://app.1inch.io/assets/images/network-logos/ethereum.svg"
                alt=""
                className="w-5 mr-1"
              />
              Ethereum
              <img
                src={ArrowDownFont}
                alt=""
                className="w-[12px] h-[12px] ml-1 -mb-0.5"
              />
            </button>
            {dropdown ? <ChainsDropdown /> : ""}
            <Link
              to="/24"
              className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
            >
              Connect Wallet
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="outline-none mobile-menu-button"
            >
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                x-show="!showMenu"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
        </ul>
      </div>
    </nav>
  );
}

export default Header;
