import { AboutSection, Education, Experience, Project, UserData } from "@/types/userData";
type ArrayI = Education[] | Experience[] | Project[];

export const aboutIsEmpty = (about: AboutSection) => {
  return (
    about.aboutMe === "" &&
    about.whatIDo === "" &&
    (!about.techStack || about.techStack.length === 0)
  );
};

export const arrayIsEmpty = (array: ArrayI): boolean => {
  return !array || array.length === 0;
};


export const getNonEmptySections = (userData: UserData): string[] => {
  const nonEmptySections: string[] = [];

  // Check hero section
  if (
    userData.hero.name || 
    userData.hero.role || 
    userData.hero.description || 
    userData.hero.image
  ) {
    nonEmptySections.push('hero');
  }

  // Check about section
  if (
    userData.about.aboutMe || 
    userData.about.whatIDo || 
    (userData.about.techStack && userData.about.techStack.length > 0)
  ) {
    nonEmptySections.push('about');
  }

  // Check projects
  if (userData.projects && userData.projects.length > 0) {
    nonEmptySections.push('project');
  }

  // Check experience
  if (userData.experience && userData.experience.length > 0) {
    nonEmptySections.push('experience');
  }

  // Check education
  if (userData.education && userData.education.length > 0) {
    nonEmptySections.push('education');
  }

  // Check contact
  if (
    userData.contact.email || 
    userData.contact.github || 
    userData.contact.linkedIn || 
    userData.contact.twitter
  ) {
    nonEmptySections.push('contact');
  }

  return nonEmptySections;
};