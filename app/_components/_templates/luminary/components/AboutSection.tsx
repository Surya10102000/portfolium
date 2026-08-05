import { Contact, AboutSection as IAboutSection } from "@/types/userData";
import { motion as m, Variants, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { 
  Sparkles, 
  User, 
  Code, 
  Coffee, 
  Award,
  Heart,
  Star,
  Zap,
  ArrowRight,
  Briefcase,
  Send
} from "lucide-react";
import ContactLinks from "./ContactLinks";
import TechStack from "./TechStack";

// Enhanced stats data with animations
const stats = [
  { 
    label: "Projects Completed", 
    value: "15+", 
    icon: Code,
    color: "from-blue-500/20 to-blue-500/5",
    gradient: "from-blue-400 to-blue-600"
  },
  { 
    label: "Years Experience", 
    value: "5+", 
    icon: Coffee,
    color: "from-amber-500/20 to-amber-500/5",
    gradient: "from-amber-400 to-amber-600"
  },
  { 
    label: "Happy Clients", 
    value: "10+", 
    icon: User,
    color: "from-emerald-500/20 to-emerald-500/5",
    gradient: "from-emerald-400 to-emerald-600"
  },
  { 
    label: "Achievements", 
    value: "20+", 
    icon: Award,
    color: "from-violet-500/20 to-violet-500/5",
    gradient: "from-violet-400 to-violet-600"
  },
];

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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const floatingVariants: Variants = {
  animate: (i: number) => ({
    y: [0, -20, 0],
    x: [0, 10, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4 + i * 0.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.5,
    },
  }),
};

const AboutSection = ({
  about,
  contact,
}: {
  about: IAboutSection;
  contact: Contact;
}) => {
  const { techStack, whatIDo, aboutMe } = about;
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [counted, setCounted] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Count animation for stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          setCounted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [counted]);

  // Split about me text into paragraphs
  const paragraphs = aboutMe?.split('\n') || [aboutMe];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-12 overflow-hidden"
      id="about"
    >
      {/* Background Elements */}
      <m.div
        style={{ opacity, scale }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </m.div>

      {/* Floating decorative shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[
          { size: 'w-12 h-12', top: '10%', left: '5%', icon: Star, delay: 0 },
          { size: 'w-8 h-8', top: '70%', right: '8%', icon: Zap, delay: 1 },
          { size: 'w-10 h-10', bottom: '15%', left: '12%', icon: Heart, delay: 0.5 },
          { size: 'w-6 h-6', top: '40%', right: '15%', icon: Sparkles, delay: 0.3 },
        ].map((shape, i) => {
          const Icon = shape.icon;
          return (
            <m.div
              key={i}
              custom={i}
              variants={floatingVariants}
              animate="animate"
              className={`absolute ${shape.size} rounded-full bg-primary/5 backdrop-blur-sm flex items-center justify-center border border-primary/10`}
              style={{
                top: shape.top,
                left: shape.left,
                right: shape.right,
                bottom: shape.bottom,
              }}
            >
              <Icon className="w-4 h-4 text-primary/30" />
            </m.div>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <m.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex items-center gap-4 mb-12"
        >
          <m.div
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block h-px flex-1 bg-gradient-to-r from-transparent to-primary/30"
          />
          
          <div className="flex items-center gap-3 relative">
            <m.div
              className="absolute -inset-1 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-2xl font-bold text-foreground relative">
              About Me
            </span>
            <m.span
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
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

        {/* Main Content */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="lg:grid lg:grid-cols-2 gap-12 xl:gap-16"
        >
          {/* Left Column */}
          <div className="space-y-8">
            {/* What I Do */}
            <m.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Briefcase className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-mono text-primary/60 tracking-widest uppercase">
                  What I Do
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
              </div>
              <m.p 
                className="text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight text-foreground/90"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {whatIDo}
              </m.p>
            </m.div>

            {/* Tech Stack */}
            <m.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Code className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-mono text-primary/60 tracking-widest uppercase">
                  Tech Stack
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
              </div>
              <TechStack techStack={techStack!} />
            </m.div>

            {/* Connect */}
            <m.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Send className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-mono text-primary/60 tracking-widest uppercase">
                  Connect With Me
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
              </div>
              <ContactLinks contact={contact} iconSize={24} variant="glass" />
              
              {/* Quick contact option */}
              {contact.email && (
                <m.a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 mt-3 text-sm text-primary hover:text-primary/80 transition-colors group"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{contact.email}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </m.a>
              )}
            </m.div>

            {/* Stats Grid */}
            <m.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 pt-4"
            >
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <m.div
                    key={i}
                    className="group relative p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden"
                    whileHover={{ 
                      y: -6,
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <div className="relative flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} bg-opacity-10`}>
                        <Icon className={`w-4 h-4 text-${stat.gradient.split('-')[1]}-400`} />
                      </div>
                      <div>
                        <m.div 
                          className="text-xl font-bold text-foreground"
                          animate={{
                            scale: counted ? [0.5, 1] : 1,
                          }}
                          transition={{ delay: i * 0.1, type: "spring" }}
                        >
                          {stat.value}
                        </m.div>
                        <div className="text-xs text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <m.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        boxShadow: "inset 0 0 30px rgba(107, 82, 161, 0.1)",
                      }}
                    />
                  </m.div>
                );
              })}
            </m.div>
          </div>

          {/* Right Column - About Me */}
          <m.div
            variants={itemVariants}
            className="mt-8 lg:mt-0"
          >
            <div className="relative h-full">
              {/* Decorative quote mark */}
              <m.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-6 -left-4 text-7xl font-serif text-primary/10 select-none"
              >
                `&quot;`
              </m.div>

              <m.div
                className="relative bg-card/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 h-full shadow-lg shadow-primary/5 hover:shadow-primary/10"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Animated gradient overlay */}
                <m.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    opacity: isHovered ? [0, 0.5, 0] : 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />

                {/* Content */}
                <div className="relative space-y-4">
                  {paragraphs.map((paragraph, idx) => (
                    <m.p
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="text-base md:text-lg leading-relaxed text-foreground/80"
                    >
                      {paragraph}
                    </m.p>
                  ))}
                </div>

                {/* Signature line */}
                <m.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="mt-6 h-0.5 bg-gradient-to-r from-primary/60 to-transparent"
                />
                
                <m.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, type: "spring" }}
                  className="mt-3 flex items-center gap-2 text-sm text-muted-foreground font-mono"
                >
                  <span>— Passionate about building things</span>
                  <m.span
                    animate={{
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    ✦
                  </m.span>
                </m.div>

                {/* Interactive hint */}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-4 right-4 text-xs text-primary/40 font-mono"
                >
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    hover me
                  </span>
                </m.div>
              </m.div>

              {/* Floating decoration */}
              <m.div
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </m.div>
        </m.div>

        {/* Decorative bottom line */}
        <m.div
          initial={{ scaleX: 0, originX: 0.5 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        />
      </div>
    </section>
  );
};

export default AboutSection;