import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineGithub,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="w-full py-12 mt-auto glass-effect border-t border-white/20 dark:border-slate-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-bold text-gradient mb-2">
              CHRISTIAN STENSØE
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Crafting digital experiences with precision and elegance
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end space-y-4">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>

            <div className="flex gap-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href="https://www.instagram.com/christianstensoee/"
                  className="p-3 rounded-full bg-white/20 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/20 dark:border-slate-700/30"
                  aria-label="Instagram"
                >
                  <AiOutlineInstagram size={20} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href="https://www.linkedin.com/in/christian-stens%C3%B8e/"
                  className="p-3 rounded-full bg-white/20 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/20 dark:border-slate-700/30"
                  aria-label="LinkedIn"
                >
                  <AiOutlineLinkedin size={20} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href="https://github.com/christianstensoe"
                  className="p-3 rounded-full bg-white/20 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/20 dark:border-slate-700/30"
                  aria-label="GitHub"
                >
                  <AiOutlineGithub size={20} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
