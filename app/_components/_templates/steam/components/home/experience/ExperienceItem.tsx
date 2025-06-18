import { Experience } from "@/types/userData";
import { Reveal } from "../../utils/Reveal";
import styles from "./experience.module.scss";
import { motion } from "framer-motion";

export const ExperienceItem = ({
  company,
  duration,
  role,
  description,
}: Experience) => {
  return (
    <motion.div 
      className={styles.experience}
      whileHover={{ 
        backgroundColor: "rgba(189, 95, 255, 0.05)",
        borderLeft: "2px solid var(--brand)"
      }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.heading}>
        <Reveal>
          <motion.span 
            className={styles.title}
            whileHover={{ color: "var(--brand)" }}
            transition={{ duration: 0.2 }}
          >
            {company}
          </motion.span>
        </Reveal>
        <Reveal>
          <motion.span
            className={styles.duration}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {duration}
          </motion.span>
        </Reveal>
      </div>

      <div className={styles.heading}>
        <Reveal>
          <motion.span 
            className={styles.position}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {role}
          </motion.span>
        </Reveal>
      </div>
      
      <Reveal>
        <motion.p 
          className={styles.description}
        >
          {description}
        </motion.p>
      </Reveal>
    </motion.div>
  );
};