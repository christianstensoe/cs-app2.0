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
  FaGraduationCap,
} from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsSun, BsMoon } from "react-icons/bs";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-effect premium-shadow dark:premium-shadow-dark"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-300"
          >
            CHRISTIAN STENSØE
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="nav-link">
              <FaHome className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <Link href="/resume" className="nav-link">
              <FaGraduationCap className="w-4 h-4" />
              <span>Resume</span>
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-3 rounded-full bg-white/20 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-white/30 dark:hover:bg-slate-700/50 transition-all duration-300 backdrop-blur-sm border border-white/20 dark:border-slate-700/30"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <BsSun className="w-4 h-4" />
              ) : (
                <BsMoon className="w-4 h-4" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-3 rounded-full bg-white/20 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 backdrop-blur-sm border border-white/20 dark:border-slate-700/30"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <BsSun className="w-4 h-4" />
              ) : (
                <BsMoon className="w-4 h-4" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNav}
              className="p-3 rounded-full bg-white/20 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 backdrop-blur-sm border border-white/20 dark:border-slate-700/30"
            >
              {menuOpen ? (
                <AiOutlineClose className="w-5 h-5" />
              ) : (
                <AiOutlineMenu className="w-5 h-5" />
              )}
            </motion.button>
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
            className="lg:hidden glass-effect border-t border-white/20 dark:border-slate-700/30"
          >
            <div className="px-4 py-6 space-y-2">
              <Link
                href="/"
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                <FaHome className="w-4 h-4" />
                <span>Home</span>
              </Link>

              <Link
                href="/resume"
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                <FaGraduationCap className="w-4 h-4" />
                <span>Resume</span>
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
    </motion.nav>
  );
};
// Navbar component for the website
export default Navbar;
