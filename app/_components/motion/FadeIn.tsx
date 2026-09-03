import { ReactNode } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion"; // Note: Corrected import from "framer-motion"

const buildFadeInVariant = (reduceMotion: boolean): Variants => ({
  hidden: {
    y: reduceMotion ? 0 : 50,
    opacity: 0
  },
  visible: (delay: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay
    }
  })
});

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number; // Viewport threshold (0-1)
  once?: boolean;
  margin?: string;
}

const FadeIn = ({
  children,
  className = "",
  delay = 0,
  amount = 0.4,
  once = true,
  margin
}: FadeInProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount , margin}}
      variants={buildFadeInVariant(!!reduceMotion)}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;