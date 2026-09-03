import { useInView, motion as m, useReducedMotion, Variants } from "motion/react";
import { useRef } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const buildItemVariants = (reduceMotion: boolean): Variants => ({
  hidden: { opacity: 0, y: reduceMotion ? 0 : 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
});

const TechStack = ({ techStack }: { techStack: string[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const itemVariants = buildItemVariants(!!reduceMotion);
  const isInView = useInView(ref, {
    once: true,
    margin: "-30% 0px -10% 0px",
  });

  return (
    <m.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="flex flex-wrap gap-2.5"
    >
      {techStack?.map((tech, i) => (
        <m.span
          key={i}
          variants={itemVariants}
          className="px-3.5 py-1.5 rounded-full border border-border text-xs font-mono text-muted-foreground bg-accent/40 transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:border-primary/40 [@media(hover:hover)_and_(pointer:fine)]:hover:text-primary"
        >
          {tech}
        </m.span>
      ))}
    </m.div>
  );
};

export default TechStack;
