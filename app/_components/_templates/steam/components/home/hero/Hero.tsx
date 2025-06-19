import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./hero.module.scss";
import { Reveal } from "../../utils/Reveal";
import { StandardButton } from "../../buttons/StandardButton";
import { HeroSectionI } from "@/types/userData";
import { cn } from "@/lib/utils";

export const Hero = ({ hero }: { hero: HeroSectionI }) => {
  const { name, description, image, role } = hero;
  return (
    <section className={`section-wrapper ${styles.hero}`}>
      <div className={styles.heroGrid}>
        <div className={styles.copyWrapper}>
          <Reveal>
            <h1 className={styles.title}>
              Hi, I&apos;m {name.split(" ")?.[0]}
              <span>.</span>
            </h1>
          </Reveal>
          <Reveal>
            <h2 className={styles.subTitle}>
              <span>{role}</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className={styles.aboutCopy}>{description}</p>
          </Reveal>
          <Reveal>
            <StandardButton
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView()
              }
            >
              Contact me
            </StandardButton>
          </Reveal>
        </div>
        {image?.url && (
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Image
              className={cn(styles.profile, "object-cover object-center aspect-square")}
              src={image?.url}
              priority
              alt={name}
              width={250}
              height={250}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};
