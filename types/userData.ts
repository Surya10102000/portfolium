// types/userData.ts
export interface HeroSectionI {
    name: string;
    role?: string;
    description?: string;
    image?: string;
  }
  
  export interface AboutSection {
    aboutMe: string;
    whatIDo: string;
    techStack?: string[];
  }

  
  export interface Project {
    id: number;
    projectName: string;
    description: string;
    date?: string;
    image?: string;
    projectLink?: string;
  }
  
  export interface Experience {
    id: number;
    role: string;
    duration: string;
    company: string;
    description?: string;
  }
  
  export interface Education {
    id: number;
    universityName: string;
    courseName: string;
    description?: string;
    duration?: string;
  }
  
  export interface Contact {
    name: string;
    link: string;
  }
  
  export interface UserData {
    hero: HeroSectionI;
    about: AboutSection;
    projects: Project[];
    experience: Experience[];
    education: Education[];
    contact: Contact[];
  }
  