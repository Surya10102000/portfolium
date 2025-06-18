import { Education } from "@/types/userData";
import styles from './Education.module.scss';
import { Reveal } from "../../utils/Reveal";
import { Book, Calendar, University } from "lucide-react";

const EducationItem = ({ courseName, universityName, description, duration }: Education) => {
  return (
    <div className={styles.educationItem}>
      <Reveal>
        <div className={styles.header}>
          <Book className={styles.icon} />
          <h3 className={styles.courseName}>{courseName}</h3>
        </div>
      </Reveal>

      <Reveal>
        <div className={styles.subheader}>
          <University className={styles.icon} />
          <p className={styles.university}>{universityName}</p>
        </div>
      </Reveal>

      <Reveal>
        <div className={styles.duration}>
          <Calendar className={styles.icon} />
          <span>{duration}</span>
        </div>
      </Reveal>

      <Reveal>
        <p className={styles.description}>{description}</p>
      </Reveal>
    </div>
  );
};

export default EducationItem;