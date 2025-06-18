import Image from "next/image";
import { useAnimation, useInView, motion } from "framer-motion";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ProjectModal } from "./ProjectModal";
import styles from "./projects.module.scss";
import { Reveal } from "../../utils/Reveal";
import { ExternalLinkIcon, Github } from "lucide-react";
import { Project as IProject } from "@/types/userData";
import Pattern from "./Pattern";

export const Project = ({
  description,
  projectName,
  _id,
  date,
  githubLink,
  image,
  projectLink,
}: IProject) => {
  const [hovered, setHovered] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const controls = useAnimation();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <>
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.75 }}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setIsOpen(true)}
          className={styles.projectImage}
        >
          {image?.url ? (
            <Image
              priority
              src={image?.url!}
              alt={`An image of the ${projectName} project.`}
              width={1000}
              height={0}
              className="scale-105 object-cover h-full w-full"
              style={{
                width: hovered ? "90% !important" : "85% !important",
                rotate: hovered ? "2deg" : "0deg",
              }}
            />
          ) : (
            <Pattern className="scale-110 hover:rotate-2 transition-transform duration-300" />
          )}
        </div>
        <div className={styles.projectCopy}>
          <Reveal width="100%">
            <div className={styles.projectTitle}>
              <h4 className="capitalize">{projectName}</h4>
              <div className={styles.projectTitleLine} />

              {githubLink && (
                <Link href={githubLink} target="_blank" rel="nofollow">
                  <Github size="2.8rem" />
                </Link>
              )}

              {projectLink && (
                <Link href={projectLink} target="_blank" rel="nofollow">
                  <ExternalLinkIcon size="2.8rem" />
                </Link>
              )}
            </div>
          </Reveal>
          <Reveal>
            <div className={styles.projectDescription}>
              <p className="line-clamp-3">{description}</p>
              <br />
              <span onClick={() => setIsOpen(true)}>Learn more {">"}</span>
            </div>
          </Reveal>
        </div>
      </motion.div>
      <ProjectModal
        modalContent={description}
        projectLink={projectLink!}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        imgSrc={image?.url!}
        title={projectName}
        code={githubLink!}
      />
    </>
  );
};
