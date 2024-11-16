"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaHome,
  FaProjectDiagram,
  FaEnvelope,
  FaInfoCircle,
  FaRunning,
} from "react-icons/fa";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
} from "react-icons/ai";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const navbarOpacity = Math.max(1 - scrollY / 200, 0.5);

  return (
    <nav
      className={`fixed top-0 w-full h-20 shadow-md transition-all duration-700 ${
        loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}
      style={{ backgroundColor: `rgba(0, 0, 0, ${navbarOpacity})`, zIndex: 50 }}
    >
      <div className="max-w-6xl mx-auto px-4 h-full flex justify-between items-center">
        <h1
          className="text-xl font-semibold"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "1.5rem", // Adjust font size here
            fontWeight: "900", // Adjust font thickness here
            color: "white",
          }}
        >
          CHRISTIANSTENSØE
        </h1>
        <ul
          className="hidden md:flex gap-8 items-center"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.25rem" }} // Adjust font size here
        >
          <li className="text-white hover:text-black transition-colors duration-300">
            <Link href="/">
              <span className="flex items-center space-x-1 cursor-pointer">
                <span>Home</span>
              </span>
            </Link>
          </li>
          <li className="text-white hover:text-black transition-colors duration-300">
            <Link href="/strava">
              <span className="flex items-center space-x-1 cursor-pointer">
                <FaRunning />
                <span>Strava</span>
              </span>
            </Link>
          </li>
          <li className="text-white hover:text-black transition-colors duration-300">
            <Link href="/about">
              <span className="flex items-center space-x-1 cursor-pointer">
                <span>About</span>
              </span>
            </Link>
          </li>
          <li className="text-white hover:text-black transition-colors duration-300">
            <Link href="/contact">
              <span className="flex items-center space-x-1 cursor-pointer ">
                <span>Contact</span>
              </span>
            </Link>
          </li>
        </ul>
        <AiOutlineMenu
          size={25}
          onClick={handleNav}
          className="md:hidden cursor-pointer"
        />
        <div
          className={`fixed inset-0 bg-black p-5 md:hidden transition-all duration-500 ${
            menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          style={{ zIndex: 50 }}
        >
          <AiOutlineClose
            size={25}
            onClick={handleNav}
            className="cursor-pointer"
          />
          <ul
            className="flex flex-col mt-4 space-y-4 bg-gray-900 opacity-90 p-4 rounded-lg"
            style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.25rem" }} // Adjust font size here
          >
            <li className="text-white hover:text-gray-300 transition-colors duration-300">
              <Link href="/">
                <span
                  onClick={() => setMenuOpen(false)}
                  className="cursor-pointer"
                >
                  Home
                </span>
              </Link>
            </li>
            <li className="text-white hover:text-gray-300 transition-colors duration-300">
              <Link href="/strava">
                <span
                  onClick={() => setMenuOpen(false)}
                  className="cursor-pointer"
                >
                  Strava
                </span>
              </Link>
            </li>
            <li className="text-white hover:text-gray-300 transition-colors duration-300">
              <Link href="/about">
                <span
                  onClick={() => setMenuOpen(false)}
                  className="cursor-pointer"
                >
                  About
                </span>
              </Link>
            </li>
            <li className="text-white hover:text-gray-300 transition-colors duration-300">
              <Link href="/contact">
                <span
                  onClick={() => setMenuOpen(false)}
                  className="cursor-pointer"
                >
                  Contact
                </span>
              </Link>
            </li>
            <div className="flex justify-around pt-4">
              <Link href="https://www.instagram.com/christianstensoee/">
                <AiOutlineInstagram
                  size={30}
                  className="cursor-pointer text-white hover:text-gray-300"
                />
              </Link>
              <Link href="https://www.linkedin.com/in/christian-stens%C3%B8e/">
                <AiOutlineLinkedin
                  size={30}
                  className="cursor-pointer text-white hover:text-gray-300"
                />
              </Link>
              <Link href="#">
                <AiOutlineFacebook
                  size={30}
                  className="cursor-pointer text-white hover:text-gray-300"
                />
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
