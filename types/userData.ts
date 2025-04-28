// types/userData.ts
export interface HeroSection {
    name: string;
    role: string;
    description: string;
    image: string;
  }
  
  export interface AboutSection {
    aboutMe: string;
    whatIDo: string;
    techStack: techStacktype[];
  }

  export interface techStacktype{
    name : string;
    type : "Frontend" | "Backend" | "devOps" | "AI" | "Ohters"
  }

  
  export interface Project {
    id: number;
    projectName: string;
    date: string;
    description: string;
    techStack: string[];
    image: string;
    projectLink: string;
    githubLink: string;
  }
  
  export interface Experience {
    id: number;
    role: string;
    duration: string;
    company: string;
    description: string;
  }
  
  export interface Education {
    id: number;
    universityName: string;
    duration: string;
    courseName: string;
    description: string;
  }
  
  export interface Contact {
    name: string;
    link: string;
  }
  
  export interface UserData {
    hero: HeroSection;
    about: AboutSection;
    projects: Project[];
    experience: Experience[];
    education: Education[];
    contact: Contact[];
  }
  