"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaProjectDiagram,
  FaEnvelope,
  FaInfoCircle,
  FaRunning,
  FaChartLine,
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
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
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
    <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            CHRISØE
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-link">
              <FaHome className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link href="/strava" className="nav-link">
              <FaRunning className="w-4 h-4" />
              <span>Strava</span>
            </Link>
            <Link href="/about" className="nav-link">
              <FaInfoCircle className="w-4 h-4" />
              <span>About</span>
            </Link>
            <Link href="/contact" className="nav-link">
              <FaEnvelope className="w-4 h-4" />
              <span>Contact</span>
            </Link>
            <Link href="/stock-tips" className="nav-link">
              <FaChartLine className="w-4 h-4" />
              <span>Stock Tips</span>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <BsSun className="w-4 h-4" />
              ) : (
                <BsMoon className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <BsSun className="w-4 h-4" />
              ) : (
                <BsMoon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={handleNav}
              className="text-gray-700 dark:text-gray-200"
            >
              {menuOpen ? (
                <AiOutlineClose className="w-6 h-6" />
              ) : (
                <AiOutlineMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900"
          >
            <div className="px-4 py-4 space-y-4">
              <Link
                href="/"
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                <FaHome className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/strava"
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                <FaRunning className="w-4 h-4" />
                <span>Strava</span>
              </Link>
              <Link
                href="/about"
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                <FaInfoCircle className="w-4 h-4" />
                <span>About</span>
              </Link>
              <Link
                href="/contact"
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                <FaEnvelope className="w-4 h-4" />
                <span>Contact</span>
              </Link>
              <Link
                href="/stock-tips"
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                <FaChartLine className="w-4 h-4" />
                <span>Stock Tips</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
