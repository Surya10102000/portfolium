// data/userData.ts
import { UserData } from "@/types/userData";

const userData: UserData = {
  hero: {
    name: "Alex Johnson",
    role: "Full Stack Developer",
    description: "Passionate about building scalable web applications and beautiful user interfaces.",
    image: "/images/hero.jpg",
  },
  about: {
    aboutMe: "I'm a full-stack developer with 4+ years of experience building web apps, SaaS products, and internal tools. I love learning new technologies and applying them to solve real-world problems.",
    whatIDo: "I specialize in developing responsive web applications, creating backend APIs, and deploying full-stack projects to production environments.",
    techStack: [
      { name: "React", type: "Frontend" },
      { name: "Next.js", type: "Frontend" },
      { name: "Tailwind CSS", type: "Frontend" },
      { name: "Node.js", type: "Backend" },
      { name: "Express", type: "Backend" },
      { name: "MongoDB", type: "Backend" },
      { name: "PostgreSQL", type: "Backend" },
      { name: "AWS", type: "devOps" },
      { name: "Docker", type: "devOps" },
      { name: "ChatGPT API", type: "AI" },
    ],
  },
  projects: [
    {
      id: 1,
      projectName: "TaskFlow",
      date: "2024-01-15",
      description: "A project management tool to track tasks, manage teams, and monitor deadlines seamlessly.",
      techStack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      image: "/images/projects/taskflow.png",
      projectLink: "https://taskflowapp.com",
      githubLink: "https://github.com/alexjohnson/taskflow",
    },
    {
      id: 2,
      projectName: "BlogSphere",
      date: "2023-10-01",
      description: "A modern blogging platform with rich text editing, SEO optimization, and user authentication.",
      techStack: ["Next.js", "PostgreSQL", "Prisma", "Framer Motion"],
      image: "/images/projects/blogsphere.png",
      projectLink: "https://blogsphere.io",
      githubLink: "https://github.com/alexjohnson/blogsphere",
    },
    {
      id: 3,
      projectName: "FitTrack",
      date: "2023-06-12",
      description: "A fitness tracking app that helps users plan workouts, track calories, and monitor progress.",
      techStack: ["React Native", "Firebase", "Redux Toolkit"],
      image: "/images/projects/fittrack.png",
      projectLink: "https://fittrackapp.com",
      githubLink: "https://github.com/alexjohnson/fittrack",
    },
  ],
  experience: [
    {
      id: 1,
      role: "Software Engineer",
      duration: "Jan 2022 - Present",
      company: "TechNova Solutions",
      description: "Developed scalable frontend interfaces and backend APIs for SaaS platforms. Led a small team to deliver projects ahead of deadlines.",
    },
    {
      id: 2,
      role: "Frontend Developer",
      duration: "Jun 2020 - Dec 2021",
      company: "BrightSoft Technologies",
      description: "Created responsive websites and dashboards using React, improving page speed and user engagement.",
    },
  ],
  education: [
    {
      id: 1,
      universityName: "University of California, Berkeley",
      duration: "2016 - 2020",
      courseName: "Bachelor of Science in Computer Science",
      description: "Focused on Software Engineering, Web Development, and Cloud Computing courses with projects involving full-stack applications.",
    },
  ],
  contact: [
    {
      name: "Email",
      link: "mailto:alex.johnson.dev@gmail.com",
    },
    {
      name: "LinkedIn",
      link: "https://linkedin.com/in/alexjohnson",
    },
    {
      name: "GitHub",
      link: "https://github.com/alexjohnson",
    },
    {
      name: "Twitter",
      link: "https://twitter.com/alexjohnsondev",
    },
    {
      name: "Portfolio",
      link: "https://alexjohnson.dev",
    },
  ],
};

export default userData;
