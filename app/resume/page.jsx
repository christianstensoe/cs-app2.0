"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaArrowLeft,
  FaGraduationCap,
  FaBriefcase,
  FaHeart,
  FaGlobe,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDownload,
  FaExternalLinkAlt,
  FaCode,
  FaDatabase,
  FaChartLine,
  FaUsers,
  FaLaptopCode,
  FaServer,
  FaMobile,
  FaPalette,
  FaRocket,
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

const timelineData = [
  {
    id: 1,
    type: "education",
    title: "Tsinghua University",
    subtitle: "Exchange Program – Beijing, China",
    description:
      "Courses in AI and Machine Learning, Business Analytics, and Economics",
    period: "Sept. 2025 – Jun. 2026",
    icon: FaGlobe,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    type: "education",
    title: "Norwegian University of Science and Technology",
    subtitle: "MSc in Computer Science, AI – Trondheim, Norway",
    description: "",
    period: "Aug. 2025 – Jun. 2027",
    icon: FaGraduationCap,
    color: "from-primary-500 to-accent-500",
  },
  {
    id: 3,
    type: "education",
    title: "Norwegian University of Science and Technology",
    subtitle: "BSc in Computer Science — Trondheim, Norway",
    description:
      "GPA: 4.1/5.0 • Courses in software development, data science, and statistics",
    period: "Aug. 2022 – Jun. 2025",
    icon: FaGraduationCap,
    color: "from-primary-500 to-accent-500",
  },
  {
    id: 4,
    type: "experience",
    title: "Consultant Intern",
    subtitle: "Bekk Consulting AS – Oslo, Norway",
    description:
      "Summer internship at a leading Norwegian consultancy with over 600 specialists in strategy, technology and design",
    period: "June 2025 – Aug. 2025",
    icon: FaBriefcase,
    color: "from-accent-500 to-red-500",
  },
  {
    id: 5,
    type: "experience",
    title: "System Engineer",
    subtitle: "Norsk Helsenett SF – Trondheim, Norway",
    description:
      "Part-time. Monitoring national e-health services and following up incidents and subcontractors in a state-owned ICT company",
    period: "Feb. 2023 – Present",
    icon: FaServer,
    color: "from-accent-500 to-red-500",
  },
  {
    id: 6,
    type: "experience",
    title: "Software Developer Intern",
    subtitle: "NAV IT – Oslo, Norway",
    description:
      "Summer internship working on software development in the IT department of the Norwegian Labour and Welfare Administration",
    period: "June 2024 – Aug. 2024",
    icon: FaLaptopCode,
    color: "from-accent-500 to-red-500",
  },
  {
    id: 7,
    type: "experience",
    title: "Summer Camp Participant",
    subtitle: "Zedge – Trondheim, Norway",
    description:
      "Gained experience with Kotlin and Android Studio during a two-week Android development camp",
    period: "June 2023",
    icon: FaMobile,
    color: "from-accent-500 to-red-500",
  },
  {
    id: 8,
    type: "volunteer",
    title: "START NTNU",
    subtitle: "Project Member – Trondheim, Norway",
    description:
      "Developing and maintaining the website of Start NTNU Trondheim • Organize NGA, Norway's largest student game development competition",
    period: "Aug. 2023 – Jan. 2025",
    icon: FaHeart,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 9,
    type: "volunteer",
    title: "TIHLDE Fondet",
    subtitle: "Analyst – Trondheim, Norway",
    description:
      "Responsible for managing and allocating financial resources on behalf of the organization",
    period: "Aug. 2023 – May 2024",
    icon: FaHeart,
    color: "from-green-500 to-emerald-500",
  },
];

const skills = [
  {
    name: "Web Development",
    icon: FaCode,
    level: 90,
    color: "from-primary-500 to-accent-500",
  },
  {
    name: "Data Science",
    icon: FaDatabase,
    level: 85,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Machine Learning",
    icon: FaChartLine,
    level: 80,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Software Engineering",
    icon: FaLaptopCode,
    level: 88,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "System Administration",
    icon: FaServer,
    level: 75,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Mobile Development",
    icon: FaMobile,
    level: 70,
    color: "from-indigo-500 to-purple-500",
  },
];

export default function ResumePage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center px-6 py-3 glass-effect text-slate-700 dark:text-slate-300 font-semibold rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                <FaArrowLeft className="mr-3 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Home
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-2xl hover:shadow-2xl transition-all duration-300"
            >
              <FaDownload className="mr-3 group-hover:scale-110 transition-transform duration-300" />
              Download PDF
            </motion.button>
          </div>

          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              My <span className="text-gradient">Resume</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              A comprehensive overview of my academic journey, professional
              experience, and technical expertise
            </p>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.section
          className="mb-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Technical <span className="text-gradient">Skills</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Expertise across various technologies and domains
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="group"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <div className="glass-effect rounded-3xl p-8 h-full premium-shadow">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${skill.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <skill.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                    {skill.name}
                  </h3>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-4">
                    <motion.div
                      className={`h-3 bg-gradient-to-r ${skill.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {skill.level}% proficiency
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Interactive Timeline */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Professional <span className="text-gradient">Timeline</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              My journey through education, work experience, and volunteer
              activities
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-accent-500 to-green-500 rounded-full"></div>

            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="relative pl-20"
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-6 top-0 w-4 h-4 bg-gradient-to-r ${item.color} rounded-full shadow-lg`}
                  ></div>

                  {/* Content Card */}
                  <motion.div
                    className="glass-effect rounded-3xl p-8 premium-shadow hover:premium-shadow-dark transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mr-4`}
                        >
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="text-lg text-slate-600 dark:text-slate-400">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-medium text-slate-600 dark:text-slate-400">
                          <FaCalendarAlt className="w-3 h-3 mr-2" />
                          {item.period}
                        </div>
                      </div>
                    </div>

                    {item.description && (
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Additional Education Details */}
        <motion.section
          className="mt-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="glass-effect rounded-3xl p-8 premium-shadow">
            <h3 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
              Additional <span className="text-gradient">Education</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Asia European Business School
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Bachelor&apos;s degree in Business Administration – Shanghai,
                  China
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500 mb-1">
                  Terminated due to the pandemic
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-600">
                  Aug. 2021 – Jan. 2022
                </p>
              </motion.div>

              <motion.div
                className="p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                  East China Normal University
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Chinese Business and Language Studies – Shanghai, China
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500 mb-1">
                  Completed the first year of the Business Chinese program and
                  an earlier Chinese language course focused on intensive
                  Mandarin training
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-600">
                  Sept. 2018 – Jun. 2020
                </p>
              </motion.div>

              <motion.div
                className="p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Ålesund High School
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Specialization in Arts – Ålesund, Norway
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-600">
                  Sep. 2018 – Jan. 2020
                </p>
              </motion.div>

              <motion.div
                className="p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Various Part-Time Roles
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Retail and Childcare – Ålesund, Norway
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500 mb-1">
                  Worked in customer service and sales at Intersport and
                  Dressmann, and as a pre-school teacher at Borgund Kindergarten
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-600">
                  Aug. 2015 – Aug. 2022
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="mt-20 text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            Ready to <span className="text-gradient">Collaborate</span>?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto">
            Let&apos;s work together to bring your ideas to life with
            cutting-edge technology and innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-2xl hover:shadow-2xl transition-all duration-300"
              >
                Get In Touch
                <FaExternalLinkAlt className="ml-3 group-hover:scale-110 transition-transform duration-300" />
              </motion.button>
            </Link>

            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center px-8 py-4 glass-effect text-slate-700 dark:text-slate-300 font-semibold rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                View Projects
                <FaRocket className="ml-3 group-hover:scale-110 transition-transform duration-300" />
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
