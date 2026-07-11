export const site = {
  name: "Christian Stensøe",
  url: "https://christianstensoe.com",
  role: "MSc student in Computer Science — Artificial Intelligence at NTNU",
  description:
    "Christian Stensøe — Master's student in Computer Science, specializing in Artificial Intelligence, at the Norwegian University of Science and Technology (NTNU).",
} as const;

export type SocialLink = {
  label: "LinkedIn" | "GitHub" | "Instagram";
  handle: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    handle: "christian-stensøe",
    href: "https://www.linkedin.com/in/christian-stens%C3%B8e/",
  },
  {
    label: "GitHub",
    handle: "christianstensoe",
    href: "https://github.com/christianstensoe",
  },
  {
    label: "Instagram",
    handle: "christianstensoee",
    href: "https://www.instagram.com/christianstensoee/",
  },
];

export type CvEntry = {
  title: string;
  org: string;
  location?: string;
  period: string;
  description?: string;
};

export type CvSection = {
  id: string;
  title: string;
  entries: CvEntry[];
};

export const cvSections: CvSection[] = [
  {
    id: "experience",
    title: "Experience",
    entries: [
      {
        title: "Investment Risk Intern",
        org: "Norges Bank Investment Management",
        period: "June 2026 – Aug. 2026",
      },
      {
        title: "Intern",
        org: "Royal Norwegian Consulate General",
        location: "Shanghai, China",
        period: "Jan. 2026 – June 2026",
      },
      {
        title: "Consultant Intern",
        org: "Bekk Consulting AS",
        location: "Oslo, Norway",
        period: "June 2025 – Aug. 2025",
        description:
          "Summer internship at a leading Norwegian consultancy with over 600 specialists in strategy, technology and design.",
      },
      {
        title: "System Engineer",
        org: "Norsk Helsenett SF",
        location: "Trondheim, Norway",
        period: "Feb. 2023 – Aug. 2025",
        description:
          "Part-time. Monitoring national e-health services and following up incidents and subcontractors in a state-owned ICT company.",
      },
      {
        title: "Software Developer Intern",
        org: "NAV IT",
        location: "Oslo, Norway",
        period: "June 2024 – Aug. 2024",
        description:
          "Summer internship working on software development in the IT department of the Norwegian Labour and Welfare Administration.",
      },
      {
        title: "Summer Camp Participant",
        org: "Zedge",
        location: "Trondheim, Norway",
        period: "June 2023",
        description:
          "Gained experience with Kotlin and Android Studio during a two-week Android development camp.",
      },
      {
        title: "Various Part-Time Roles",
        org: "Retail and Childcare",
        location: "Ålesund, Norway",
        period: "Aug. 2015 – Aug. 2022",
        description:
          "Worked in customer service and sales at Intersport and Dressmann, and as a pre-school teacher at Borgund Kindergarten.",
      },
    ],
  },
  {
    id: "education",
    title: "Education",
    entries: [
      {
        title: "MSc in Computer Science, Artificial Intelligence",
        org: "Norwegian University of Science and Technology (NTNU)",
        location: "Trondheim, Norway",
        period: "Aug. 2025 – Jun. 2027",
      },
      {
        title: "Exchange Program",
        org: "Tsinghua University",
        location: "Beijing, China",
        period: "Sept. 2025 – Jun. 2026",
        description:
          "Courses in AI and Machine Learning, Business Analytics, and Economics.",
      },
      {
        title: "BSc in Computer Science",
        org: "Norwegian University of Science and Technology (NTNU)",
        location: "Trondheim, Norway",
        period: "Aug. 2022 – Jun. 2025",
        description:
          "GPA: 4.1/5.0. Courses in software development, data science, and statistics.",
      },
      {
        title: "Business Administration",
        org: "Asia European Business School",
        location: "Shanghai, China",
        period: "Aug. 2021 – Jan. 2022",
        description: "Terminated due to the pandemic.",
      },
      {
        title: "Chinese Business and Language Studies",
        org: "East China Normal University",
        location: "Shanghai, China",
        period: "Sept. 2018 – Jun. 2020",
        description:
          "Completed the first year of the Business Chinese program and an earlier Chinese language course focused on intensive Mandarin training.",
      },
      {
        title: "Specialization in Arts",
        org: "Ålesund High School",
        location: "Ålesund, Norway",
        period: "Sep. 2018 – Jan. 2020",
      },
    ],
  },
  {
    id: "volunteering",
    title: "Volunteering",
    entries: [
      {
        title: "Project Member",
        org: "START NTNU",
        location: "Trondheim, Norway",
        period: "Aug. 2023 – Jan. 2025",
        description:
          "Developed and maintained the website of START NTNU Trondheim, and helped organize NGA, Norway's largest student game development competition.",
      },
      {
        title: "Analyst",
        org: "TIHLDE Fondet",
        location: "Trondheim, Norway",
        period: "Aug. 2023 – May 2024",
        description:
          "Responsible for managing and allocating financial resources on behalf of the organization.",
      },
    ],
  },
];
