import { useInView, motion as m, Variants } from "motion/react";
import { useRef } from "react";

const TechStack = ({ techStack }: { techStack: string[] }) => {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-50% 0px -10% 0px", // Triggers when top hits 50% of viewport
  });

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Adjust this value for stagger timing
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <m.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="flex flex-wrap gap-2"
    >
      {techStack?.map((tech, i) => (
        <m.span
          key={i}
          variants={item}
          className="inline-block px-3 py-1 text-sm tracking-wide rounded-full bg-foreground/30 "
        >
          {tech}
        </m.span>
      ))}
    </m.div>
  );
};

export default TechStack;
