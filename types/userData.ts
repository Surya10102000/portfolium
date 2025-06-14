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
    _id?: string;
    projectName: string;
    description: string;
    date?: string;
    image?: string;
    projectLink?: string;
    githubLink?: string;
  }
  
  export interface Experience {
    _id?: string;
    role: string;
    duration: string;
    company: string;
    description?: string;
  }
  
  export interface Education {
    _id?: string;
    universityName: string;
    courseName: string;
    description?: string;
    duration?: string;
  }
  
  export interface Contact {
    email?: string;
    github?: string;
    linkedIn?:string;
    twitter?:string;

  }
  
  export interface UserData {
    template : string;
    primaryColor: string;
    hero: HeroSectionI;
    about: AboutSection;
    projects: Project[];
    experience: Experience[];
    education: Education[];
    contact: Contact;
  }
  