import { HeroSectionI } from "@/types/userData";
import Image from "next/image";
import { motion as m, Variants } from "motion/react";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import { useState, useEffect } from "react";

// Floating particles animation variants
const floatingParticleVariants: Variants = {
  initial: { y: 0, opacity: 0 },
  animate: (i: number) => ({
    y: [0, -20, 0],
    opacity: [0, 0.3, 0],
    transition: {
      duration: 3 + i * 0.5,
      repeat: Infinity,
      delay: i * 0.3,
      ease: "easeInOut",
    },
  }),
};

// Text reveal variants with stagger
const letterVariants: Variants = {
  hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// Floating shapes for background
const shapes = [
  { size: "w-16 h-16", top: "10%", left: "5%", delay: 0 },
  { size: "w-12 h-12", top: "60%", right: "8%", delay: 0.5 },
  { size: "w-20 h-20", bottom: "20%", left: "15%", delay: 1 },
  { size: "w-8 h-8", top: "30%", right: "20%", delay: 0.3 },
];

const HeroSection = ({ hero }: { hero: HeroSectionI }) => {
  const { image, name, description, role } = hero;
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Split name into characters for staggered animation
  const nameParts = name.split(" ");

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      className="relative min-h-[90lvh] flex flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-12"
      id="hero"
    >
      {/* Background Gradient with subtle noise */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNmKSIgb3BhY2l0eT0iMC4wNSIgLz48L3N2Zz4=')] opacity-20" />
      </div>

      {/* Floating Shapes Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {shapes.map((shape, i) => (
          <m.div
            key={i}
            variants={floatingParticleVariants}
            initial="initial"
            animate="animate"
            custom={i}
            className={`absolute ${shape.size} rounded-full border border-primary/10 bg-primary/5 backdrop-blur-sm`}
            style={{
              top: shape.top,
              left: shape.left,
              right: shape.right,
              bottom: shape.bottom,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row lg:flex-row-reverse lg:justify-between items-center lg:items-start gap-8 lg:gap-12">
          {/* Avatar with Glow Effect */}
          {image?.url && (
            <m.div
              className="relative mt-8 lg:mt-0 flex-shrink-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{
                transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
              }}
            >
              {/* Glow Ring */}
              <m.div
                className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary/30 via-primary/10 to-transparent blur-2xl"
                animate={{
                  scale: isHovering ? 1.2 : 1,
                  opacity: isHovering ? 1 : 0.5,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Rotating Border Ring */}
              <m.div
                className="absolute -inset-2 rounded-full"
                animate={{ rotate: isHovering ? 360 : 0 }}
                transition={{
                  duration: 4,
                  ease: "linear",
                  repeat: isHovering ? Infinity : 0,
                }}
              >
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary/60" />
              </m.div>

              {/* Avatar Image */}
              <m.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative"
              >
                <Image
                  src={image.url}
                  className="rounded-full aspect-square object-cover w-28 h-28 sm:w-32 sm:h-32 lg:w-44 lg:h-44 ring-4 ring-primary/10 shadow-2xl"
                  alt={name}
                  width={176}
                  height={176}
                  priority
                />
                {/* Status Indicator */}
                <m.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-400 rounded-full ring-2 ring-background shadow-lg"
                >
                  <m.span
                    className="absolute inset-0 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </m.div>
              </m.div>
            </m.div>
          )}

          {/* Name with Staggered Character Animation */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="space-y-1 sm:space-y-2">
              {nameParts.map((word, wordIndex) => (
                <div
                  key={wordIndex}
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] font-bold leading-[1.1] tracking-tighter"
                >
                  <div className="overflow-hidden">
                    <m.div
                      initial="hidden"
                      animate="visible"
                      className="flex flex-wrap"
                    >
                      {word.split("").map((letter, letterIndex) => (
                        <m.span
                          key={`${wordIndex}-${letterIndex}`}
                          custom={wordIndex * 5 + letterIndex}
                          variants={letterVariants}
                          className="inline-block"
                          style={{
                            background:
                              letterIndex % 2 === 0
                                ? "linear-gradient(135deg, var(--primary), var(--primary-foreground))"
                                : "linear-gradient(135deg, var(--foreground), var(--primary))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {letter}
                        </m.span>
                      ))}
                      {wordIndex < nameParts.length - 1 && (
                        <span className="inline-block w-2" />
                      )}
                    </m.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Role with Typewriter Effect */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-4 sm:mt-6"
            >
              <div className="inline-block">
                <m.p
                  className="text-lg sm:text-xl font-medium text-muted-foreground"
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  <span className="text-primary mr-2">✦</span>
                  {role}
                </m.p>
                <m.div
                  className="h-0.5 w-full bg-gradient-to-r from-primary to-transparent mt-1"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                />
              </div>
            </m.div>

            {/* Description */}
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              {description}
            </m.p>

            {/* Social Icons & CTA */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              {/* CTA Button */}
              <m.a
                href="#contact"
                className="group relative px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get in Touch
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
                </span>
                <m.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/80 to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </m.a>

              {/* Social Icons */}
              <div className="flex items-center gap-2">
                {[
                  { Icon: Github, href: "#" },
                  { Icon: Linkedin, href: "#" },
                  { Icon: Twitter, href: "#" },
                ].map(({ Icon, href }, i) => (
                  <m.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full hover:bg-primary/10 transition-colors"
                    whileHover={{
                      scale: 1.1,
                      y: -2,
                      transition: { type: "spring", stiffness: 400 },
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                  </m.a>
                ))}
              </div>
            </m.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        >
          <m.div
            className="flex flex-col items-center gap-2 text-muted-foreground/60"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </m.div>
        </m.div>
      </div>
    </section>
  );
};

export default HeroSection;