import { ReactNode } from "react";
import { motion, Variants } from "framer-motion"; // Note: Corrected import from "framer-motion"

const fadeInVariant: Variants = {
  hidden: {
    y: 50,
    opacity: 0
  },
  visible: {
    y: 0, // Changed from 20 to 0 for actual movement
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number; // Viewport threshold (0-1)
  once?: boolean;
}

const FadeIn = ({
  children,
  className = "",
  delay = 0,
  amount = 0.8,
  once = true
}: FadeInProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={fadeInVariant}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;