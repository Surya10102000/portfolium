import styles from "./projectmodal.module.scss";
import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, X } from "lucide-react";
import Pattern from "./Pattern";
interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  imgSrc: string;
  code: string;
  projectLink: string;
  modalContent: ReactNode;
}

export const ProjectModal = ({
  modalContent,
  projectLink,
  setIsOpen,
  imgSrc,
  isOpen,
  title,
  code,
}: Props) => {
  useEffect(() => {
    const body = document.body;

    body.style.overflowY = isOpen ? "hidden" : "scroll";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      body.style.overflowY = "scroll";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, setIsOpen]);

  const content = (
    <div className={styles.modal} onClick={() => setIsOpen(false)}>
      <button className={styles.closeModalBtn}>
        <X />
      </button>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={styles.modalCard}
      >
        {imgSrc && (
          <Image
            priority
            src={imgSrc}
            alt={`An image of the ${title} project.`}
            width={500}
            height={400}
            className={styles.modalImage}
          />
        )}
        <div className={styles.modalContent}>
          <h4>{title}</h4>
          <div className={styles.suppliedContent}>{modalContent}</div>

          <div className={styles.modalFooter}>
            <p className={styles.linksText}>
              Project Links<span>.</span>
            </p>
            <div className={styles.links}>
              {code && <Link target="_blank" rel="nofollow" href={code}>
                <Github /> source code
              </Link>}
              {projectLink &&<Link target="_blank" rel="nofollow" href={projectLink}>
                <ExternalLink /> live project
              </Link>}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  if (!isOpen) return <></>;

  // Use typeof window check for SSR and fallback to document.body
  if (typeof window === "undefined") return null;

  // Create a portal target if it doesn't exist
  let portalRoot = document.getElementById("modal-root");
  if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(portalRoot);
  }

  return ReactDOM.createPortal(content, portalRoot);
};
