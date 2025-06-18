import { ChevronRight } from "lucide-react";
import { Reveal } from "../../utils/Reveal";
import { SectionHeader } from "../../utils/SectionHeader";
import styles from "./about.module.scss";
import { Stats } from "./Stats";
import { MyLinks } from "../../nav/components/MyLinks";
import { AboutSection, Contact } from "@/types/userData";
import { cn } from "@/lib/utils";

export const About = ({
  about,
  contact,
}: {
  about: AboutSection;
  contact: Contact;
}) => {
  const {aboutMe,whatIDo,techStack} = about;
  return (
    <section id="about" className="section-wrapper">
      <SectionHeader title="About" dir="l" />
      <div className={styles.about}>
        <div>
          <Reveal>
            <p className={`${styles.aboutText} ${styles.highlightFirstLetter}`}>
              {aboutMe}
            </p>
          </Reveal>
          <Reveal>
            <p className={styles.aboutText}>
              {whatIDo}
            </p>
          </Reveal>
          <Reveal>
            <div className={styles.links}>
              <div className={cn(styles.linksText, "mt-4")}>
                <span>My links</span>
                <ChevronRight />
              </div>
              <MyLinks contact={contact} />
            </div>
          </Reveal>
        </div>
        {techStack?.length !== 0 && <Stats techStack={techStack!}/>}
      </div>
    </section>
  );
};
