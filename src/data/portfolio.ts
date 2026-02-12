import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiDocker,
  SiPostgresql,
  SiTailwindcss,
  SiReact,
  SiLinux,
  SiHtml5,
  SiCss3,
  SiPhp,
} from "react-icons/si"

// --- KONSTANTA ---
export const GITHUB_URL = "https://github.com/0xTappen"
export const EMAIL = "erwinwijaya6510@gmail.com"
export const LINKEDIN_URL = "https://id.linkedin.com/in/erwin-wijaya-b68b112999"
export const TENESYS_URL = "https://ctftime.org/team/22044/"

// --- PROFILE TEXT ---
export const PROFILE_SUMMARY = `
I’m Erwin Wijaya, an Informatics student at Universitas Teknokrat Indonesia and a core member of Tenesys, the university’s Capture The Flag (CTF) team. I’m passionate about cybersecurity, especially in cryptography, web exploitation, and reversing. Competing in CTFs has sharpened my analytical mindset and problem-solving skills in understanding how systems can be both attacked and secured.

Beyond cybersecurity, I enjoy building full-stack applications using Next.js, focusing on creating secure and scalable solutions. I often use AI tools to boost productivity, automate tasks, and accelerate development. My goal is to combine my skills in security and development to create smarter and more reliable systems.
`

export const FOOTER_BIO = `Cybersecurity enthusiast, CTF player and fullstack developer based in Lampung, Bandar Lampung Indonesia.`

// --- PROJECTS DATA ---
export const projects = [
  {
    id: 1,
    title: "Himpunan Web (ITSB)",
    description:
      "Student organization website for member management and information, in collaboration with the Palm Oil Processing Student Association of ITSB.",
    tags: ["Web Dev", "Collaboration", "Tailwind"],
    link: "https://github.com/0xTappen/himpunan-web",
  },
  {
    id: 2,
    title: "Native CTF Platform",
    description:
      "A simple Capture The Flag (CTF) platform built using pure native PHP. Ideal for small events or educational purposes.",
    tags: ["PHP", "Security", "Web App"],
    link: "https://github.com/0xTappen/Native-CTF-Platform",
  },
  {
    id: 3,
    title: "Caesar Cipher CLI",
    description:
      "Command Line Interface (CLI) tool for Decryption/Enkripsi using the Caesar Cipher algorithm.",
    tags: ["Security", "Python", "CLI Tool"],
    link: "https://github.com/0xTappen/Caesar-Cipher-CLI",
  },
  {
    id: 4,
    title: "GZCTF Discord Webhooks",
    description:
      "Webhook implementation for Discord server notifications related to CTF events or results from GZCTF.",
    tags: ["Webhook", "Automation", "Discord"],
    link: "https://github.com/0xTappen/GZCTF-Discord-Webhooks",
  },
]

// --- SKILLS DATA ---
export const visualSkillData = {
  frontend: [
    { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
    { name: "React", Icon: SiReact, color: "#61DAFB" },
    { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
    { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", Icon: SiCss3, color: "#1572B6" },
  ],
  backend: [
    { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
    { name: "Python", Icon: SiPython, color: "#3776AB" },
    { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  ],
  infrastructure: [
    { name: "Docker", Icon: SiDocker, color: "#2496ED" },
    { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
    { name: "Linux", Icon: SiLinux, color: "#FCC624" },
  ],
}

// --- EXPERIENCE DATA ---
export const educationData = [
  {
    year: "2024 - Present",
    title: "Informatics",
    organization: "Universitas Teknokrat Indonesia",
    detail: "Focusing on software development, cyber security and system architecture.",
  },
  {
    year: "2021 - 2024",
    title: "Computer Network and Telecommunication Engineering",
    organization: "SMKN 1 Bandar Lampung",
    detail:
      "Vocational High School graduate with a strong foundation in networking and computing.",
  },
] as const

export const internshipData = [
  {
    year: "Nov 2023 - Feb 2024",
    title: "Internship Student (PKL)",
    organization: "Telkom Akses Lampung",
    detail: "Internship experience as a student.",
  },
] as const

export const organizationData = [
  {
  year: "2024 - Present",
  title: "Tenesys",
  organization: "Universitas Teknokrat Indonesia",
  detail: "Active member in Tenesys with role as a CTF Player, Challenge Developer, Infrastructure Engineer, and Mentor.",
  },
  {
    year: "2024 - Present",
    title: "Programming Teknokrat",
    organization: "Universitas Teknokrat Indonesia",
    detail: "Active member in the Programming Student Activity Unit.",
  },
  {
  year: "2022 - 2024",
  title: "Basketball Extracurricular",
  organization: "SMKN 1 Bandar Lampung",
  detail: "Active member and participant in inter-school competitions.",
  },
  {
  year: "2022 - 2023",
  title: "Organisasi Siswa Intra Sekolah",
  organization: "SMKN 1 Bandar Lampung",
  detail: "Organizational experience at the school level.",
  },
] as const

export const achievementsData = [
  {
  year: 2025,
  title: "Challenge Author at LaosCTF 2025 — Universitas Jember",
  detail: "Problem Setter / Challenge Creator in Cyber Security Field",
},
  {
    year: 2025,
    title: "1st Place CTF Event HUT Pesawaran, Lampung",
    detail: "Cyber Security Field",
  },
  {
    year: 2024,
    title: "2nd Place Gematik Teknokrat",
    detail: "Cyber Security Field",
  },
  {
    year: 2023,
    title: "1st Place LKS Lampung Province",
    detail: "Cyber Security Field",
  },
] as const

// --- POSTS DATA ---
export const dummyPosts = [
  {
    title: "Fixing the 'never' Error in Next.js & TypeScript",
    summary:
      "A quick guide on why the 'never' property appears in TypeScript array loops and how to use 'as const' to fix it.",
    link: "/blog/fixing-never-error",
  },
  {
    title: "Optimal Next.js Deployment on GitHub Pages",
    summary:
      "Step-by-step guide to configure next.config.mjs for static export and gh-pages deployment.",
    link: "/blog/github-pages-deployment",
  },
  {
    title: "Tailwind vs Styled-Components: Choosing UI Library",
    summary:
      "Comparative analysis of popular CSS-in-JS solutions and utility-first frameworks.",
    link: "/blog/tailwind-vs-styled",
  },
  {
    title: "Understanding React Hooks Deeply",
    summary:
      "Dive into the core concepts of useState, useEffect, and custom hooks for better React development.",
    link: "/blog/react-hooks",
  },
]
