import { useEffect, useState } from "react";
import styles from "./sidebar.module.scss";
import { motion } from "framer-motion";
import { UserData } from "@/types/userData";
import { getNonEmptySections } from "../../../templateUtils";
import { cn } from "@/lib/utils";

export const SideBar = ({ portfolioData }: { portfolioData: UserData }) => {
  const sectionOption = getNonEmptySections(portfolioData).filter(
    (a) => a !== "hero"
  );
  const name = portfolioData.hero.name as string;
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll(".section-wrapper");

    const options = {
      threshold: 0.3,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setSelected(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    sections.forEach((section) => observer.observe(section));
  }, []);

  return (
    <div style={{ background: "var(--background-dark)" }}>
      <motion.nav
        initial={{ x: -70 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.sideBar}
      >
        <span
          className={styles.logo}
          onClick={() => {
            if (document.location.hash) {
              document.getElementById("main")?.scrollIntoView();
            }
          }}
        >
          {name.slice(0, 2)}
          <span>.</span>
        </span>

        {sectionOption.map((sec, i) => (
          <motion.a
            key={i}
            initial={{ x: -70 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            href={`#${sec}`}
            onClick={() => {
              setSelected(sec);
            }}
            className={cn(
              "capitalize",
              selected === sec ? styles.selected : ""
            )}
          >
            {sec}
          </motion.a>
        ))}
      </motion.nav>
    </div>
  );
};
