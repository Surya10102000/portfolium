import { Project as IProject } from "@/types/userData";
import { SectionHeader } from "../../utils/SectionHeader";
import styles from "./projects.module.scss";
import { Project } from "./Project";

export const Projects = ({projects} : {projects : IProject[]}) => {
  return (
    <section className="section-wrapper" id="project">
      <SectionHeader title="Projects" dir="r" />

      <div className={styles.projects}>
        {projects.map((project,i) => {
          return <Project key={i} {...project} />;
        })}
      </div>
    </section>
  );
};
