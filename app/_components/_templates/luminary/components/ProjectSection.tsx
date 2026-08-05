import { Project } from "@/types/userData";
import { motion as m, Variants } from "motion/react";
import LuminaryProjectCard from "./LuminaryProjectCard";
import { Sparkles } from "lucide-react";

// Stagger children variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const ProjectSection = ({ projects }: { projects: Project[] }) => {
  return (
    <section className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-12" id="project">
      {/* Section Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-12"
        >
          {/* Decorative Line */}
          <m.div
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block h-px flex-1 bg-gradient-to-r from-transparent to-primary/30"
          />
          
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-foreground">
              Featured Projects
            </span>
            <m.span
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </m.span>
          </div>
          
          <m.div
            initial={{ scaleX: 0, originX: 1 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block h-px flex-1 bg-gradient-to-l from-transparent to-primary/30"
          />
        </m.div>

        {/* Projects Grid */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <m.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full"
            >
              <LuminaryProjectCard {...project} index={i} />
            </m.div>
          ))}
        </m.div>

        {/* View All Projects Link */}
        {projects.length > 6 && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <m.a
              href="#all-projects"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              whileHover={{ gap: "0.75rem" }}
            >
              View All Projects
              <m.span
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </m.span>
            </m.a>
          </m.div>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;