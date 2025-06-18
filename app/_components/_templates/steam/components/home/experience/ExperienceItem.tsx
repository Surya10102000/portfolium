import { Experience } from "@/types/userData";
import { Reveal } from "../../utils/Reveal";
import styles from "./experience.module.scss";

export const ExperienceItem = ({
  company,
  duration,
  role,
  description,
}: Experience) => {
  return (
    <div className={styles.experience}>
      <div className={styles.heading}>
        <Reveal>
          <span className={styles.title}>{company}</span>
        </Reveal>
        <Reveal>
          <span>{duration}</span>
        </Reveal>
      </div>

      <div className={styles.heading}>
        <Reveal>
          <span className={styles.position}>{role}</span>
        </Reveal>
        {/* <Reveal>
          <span>{location}</span>
        </Reveal> */}
      </div>
      <Reveal>
        <p className={styles.description}>{description}</p>
      </Reveal>
      {/* <Reveal>
        <div className={styles.tech}>
          {tech.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
      </Reveal> */}
    </div>
  );
};
