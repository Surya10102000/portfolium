import {  SquareCode } from "lucide-react";
import { Reveal } from "../../utils/Reveal";
import styles from "./stats.module.scss";

export const Stats = ({techStack} : {techStack : string[]}) => {
  return (
    <div className={styles.stats}>
      <Reveal>
        <div className={styles.statColumn}>
          <h4>
            <SquareCode size="2.4rem" color="var(--brand)" />
            <span>Use at work</span>
          </h4>
          <div className={styles.statGrid}>
            {techStack.map((tech, i )=>(
            <span key={i} className="chip">{tech}</span>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};
