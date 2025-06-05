import { AboutSection, Education, Experience, Project } from "@/types/userData";
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
