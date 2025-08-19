"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCode,
  FaRunning,
  FaChartLine,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaGraduationCap,
  FaBriefcase,
  FaHeart,
  FaGlobe,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

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

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/50 dark:from-slate-900/50 dark:via-transparent dark:to-slate-800/50"></div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={fadeInUp}
          >
            <motion.h1
              className="text-5xl lg:text-7xl font-bold mb-8 text-balance"
              variants={fadeInUp}
            >
              Crafting Digital <span className="text-gradient">Excellence</span>
            </motion.h1>

            <motion.p
              className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed text-balance"
              variants={fadeInUp}
            >
              AI and ML enthusiast with a passion for business and global
              industries. Specializing in the shipping industry, bringing
              innovative technology solutions to maritime challenges from my
              roots in Ålesund.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              variants={fadeInUp}
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-2xl hover:shadow-2xl transition-all duration-300"
                >
                  Get In Touch
                  <FaEnvelope className="ml-3 group-hover:scale-110 transition-transform duration-300" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Resume Section */}
      <section className="py-20 lg:py-32">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              My <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              A blend of academic excellence and professional experience across
              technology and business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education Timeline */}
            <motion.div variants={fadeInUp}>
              <div className="glass-effect rounded-3xl p-8 premium-shadow">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mr-4">
                    <FaGraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Education
                  </h3>
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="relative pl-8 border-l-2 border-primary-200 dark:border-primary-700"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
                    <div className="mb-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        Tsinghua University
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Exchange Program – Beijing, China
                      </p>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mb-1">
                      AI, Machine Learning, Business Analytics, Economics
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-600">
                      Sept. 2025 – Jun. 2026
                    </p>
                  </motion.div>

                  <motion.div
                    className="relative pl-8 border-l-2 border-primary-200 dark:border-primary-700"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
                    <div className="mb-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        NTNU
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        MSc in Computer Science, AI – Trondheim, Norway
                      </p>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-600">
                      Aug. 2025 – Jun. 2027
                    </p>
                  </motion.div>

                  <motion.div
                    className="relative pl-8 border-l-2 border-primary-200 dark:border-primary-700"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
                    <div className="mb-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        NTNU
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        BSc in Computer Science — Trondheim, Norway
                      </p>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mb-1">
                      GPA: 4.1/5.0 • Software Development, Data Science,
                      Statistics
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-600">
                      Aug. 2022 – Jun. 2025
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Experience Timeline */}
            <motion.div variants={fadeInUp}>
              <div className="glass-effect rounded-3xl p-8 premium-shadow">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-red-500 rounded-2xl flex items-center justify-center mr-4">
                    <FaBriefcase className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Experience
                  </h3>
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="relative pl-8 border-l-2 border-accent-200 dark:border-accent-700"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gradient-to-r from-accent-500 to-red-500 rounded-full"></div>
                    <div className="mb-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        Consultant Intern
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Bekk Consulting AS – Oslo, Norway
                      </p>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mb-1">
                      Leading Norwegian consultancy with 600+ specialists
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-600">
                      June 2025 – Aug. 2025
                    </p>
                  </motion.div>

                  <motion.div
                    className="relative pl-8 border-l-2 border-accent-200 dark:border-accent-700"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gradient-to-r from-accent-500 to-red-500 rounded-full"></div>
                    <div className="mb-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        System Engineer
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Norsk Helsenett SF – Trondheim, Norway
                      </p>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mb-1">
                      Monitoring national e-health services, incident management
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-600">
                      Feb. 2023 – Present (Part-time)
                    </p>
                  </motion.div>

                  <motion.div
                    className="relative pl-8 border-l-2 border-accent-200 dark:border-accent-700"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gradient-to-r from-accent-500 to-red-500 rounded-full"></div>
                    <div className="mb-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        Software Developer Intern
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        NAV IT – Oslo, Norway
                      </p>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mb-1">
                      Norwegian Labour and Welfare Administration IT department
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-600">
                      June 2024 – Aug. 2024
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Volunteer Experience */}
          <motion.div className="mt-12" variants={fadeInUp}>
            <div className="glass-effect rounded-3xl p-8 premium-shadow">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-4">
                  <FaHeart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Volunteer Experience
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="group p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                    START NTNU
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Project Member – Trondheim, Norway
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">
                    Website development, NGA game development competition
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-600 mt-2">
                    Aug. 2023 – Jan. 2025
                  </p>
                </motion.div>

                <motion.div
                  className="group p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                    TIHLDE Fondet
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Analyst – Trondheim, Norway
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">
                    Financial resource management and allocation
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-600 mt-2">
                    Aug. 2023 – May 2024
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div className="text-center mt-12" variants={fadeInUp}>
            <Link href="/resume">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center px-8 py-4 glass-effect text-slate-700 dark:text-slate-300 font-semibold rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                View Full Resume
                <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <motion.div
          className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            Ready to Build Something{" "}
            <span className="text-gradient">Amazing</span>?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed">
            Let&apos;s collaborate to bring your vision to life with
            cutting-edge technology and exceptional design.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/contact">
              <button className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-2xl hover:shadow-2xl transition-all duration-300 text-lg">
                Start a Project
                <FaArrowRight className="ml-3" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
