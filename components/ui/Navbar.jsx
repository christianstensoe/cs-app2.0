"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
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
import { BsSun, BsMoon } from "react-icons/bs";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setLoaded(true);
    setMounted(true);
  }, []);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-0 w-full transition-all duration-300 ${
        loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      } bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm z-50`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          CHRISTIANSTENSØE
        </Link>

        <ul className="hidden md:flex gap-8 items-center">
          <li>
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <FaHome className="text-sm" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/strava"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <FaRunning className="text-sm" />
              <span>Strava</span>
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <FaInfoCircle className="text-sm" />
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <FaEnvelope className="text-sm" />
              <span>Contact</span>
            </Link>
          </li>
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <BsSun size={18} /> : <BsMoon size={18} />}
            </button>
          </li>
        </ul>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <BsSun size={18} /> : <BsMoon size={18} />}
          </button>
          <button
            onClick={handleNav}
            className="text-gray-700 dark:text-gray-200"
          >
            {menuOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-white dark:bg-gray-900 z-50 md:hidden transition-all duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="p-4 flex justify-end">
          <button
            onClick={handleNav}
            className="text-gray-700 dark:text-gray-200"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
        <ul className="flex flex-col items-center space-y-6 p-4">
          <li>
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors text-xl"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/strava"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors text-xl"
            >
              Strava
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors text-xl"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors text-xl"
            >
              Contact
            </Link>
          </li>
          <div className="flex justify-center gap-6 pt-6">
            <Link
              href="https://www.instagram.com/christianstensoee/"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <AiOutlineInstagram size={24} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/christian-stens%C3%B8e/"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <AiOutlineLinkedin size={24} />
            </Link>
            <Link
              href="#"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <AiOutlineFacebook size={24} />
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
