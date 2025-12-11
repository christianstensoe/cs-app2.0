"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ContactPage = () => {
  return (
    <div className="min-h-screen py-20">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-20" variants={fadeInUp}>
          <h1 className="text-5xl lg:text-7xl font-bold mb-8">
            Follow My <span className="text-gradient">Journey</span>
          </h1>
          <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Connect with me on social media to stay updated with my latest
            projects, insights, and professional journey in technology and
            development.
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div className="max-w-2xl mx-auto" variants={fadeInUp}>
          <div className="glass-effect rounded-3xl p-12 premium-shadow">
            <h3 className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white">
              Let&apos;s Connect
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 text-center leading-relaxed">
              Follow me on social media to see my latest work, insights, and
              behind-the-scenes of my development journey.
            </p>

            <div className="flex justify-center gap-6">
              <motion.a
                href="https://www.linkedin.com/in/christian-stens%C3%B8e/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white hover:shadow-2xl transition-all duration-300 group"
              >
                <FaLinkedin
                  size={32}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </motion.a>
              <motion.a
                href="https://github.com/christianstensoe"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-6 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl text-white hover:shadow-2xl transition-all duration-300 group"
              >
                <FaGithub
                  size={32}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/christianstensoee/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl text-white hover:shadow-2xl transition-all duration-300 group"
              >
                <FaInstagram
                  size={32}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </motion.a>
            </div>

            <div className="mt-8 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                Stay tuned for updates on my latest projects and insights!
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
