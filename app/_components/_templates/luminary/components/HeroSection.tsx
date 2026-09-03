import React, { useEffect } from 'react';
import { Contact, HeroSectionI } from "@/types/userData";
import Image from "next/image";
import {
  motion as m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  Variants,
} from "motion/react";
import ContactLinks from "./ContactLinks";
import { EASE_OUT } from "../motionTokens";

interface HeroProps {
  hero: HeroSectionI;
  contact: Contact;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const buildItemVariants = (reduceMotion: boolean): Variants => ({
  hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
});

const HeroSection = ({ hero, contact }: HeroProps) => {
  const { image, name, description, role } = hero;
  const reduceMotion = useReducedMotion();
  const itemVariants = buildItemVariants(!!reduceMotion);

  // Split name into parts for display
  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  // Subtle parallax on the profile image, driven by motion values so
  // mouse movement never triggers a React re-render.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(rawY, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (reduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      rawX.set((clientX / window.innerWidth - 0.5) * 16);
      rawY.set((clientY / window.innerHeight - 0.5) * 16);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduceMotion, rawX, rawY]);

  // Get status text from hero or default
  const statusText = "Available for new work";

  return (
    <section
      className="relative min-h-screen w-full bg-background text-foreground flex items-center justify-center px-6 py-16 md:py-24 overflow-hidden"
      id="hero"
    >
      {/* Background Dot Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)'
        }}
      />

      <m.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
      >
        {/* Left Column: Content */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">

          {/* Section Subtitle */}
          <m.div variants={itemVariants} className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-primary inline-block"></span>
            <span className="text-xs md:text-sm font-semibold tracking-widest text-primary uppercase">
              Portfolio & Resume
            </span>
          </m.div>

          {/* Hero Name */}
          <m.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight text-foreground leading-[0.95]"
          >
            {firstName} <span className="italic font-normal block sm:inline font-serif text-muted-foreground">{lastName}</span>
          </m.h1>

          {/* Role Pill Badge */}
          <m.div
            variants={itemVariants}
            className="inline-flex items-center bg-primary text-primary-foreground rounded-full p-1.5 pr-5 shadow-sm text-sm md:text-base font-medium"
          >
            <span className="flex items-center gap-2 bg-primary/30 px-3.5 py-1.5 rounded-full font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-foreground animate-pulse" />
              {role || 'Designer'}
            </span>
            <span className="ml-3 border-l border-primary-foreground/30 pl-3 italic font-serif text-primary-foreground/90 font-normal">
              {description?.split(' ').slice(-3).join(' ') || 'interaction & motion'}
            </span>
          </m.div>

          {/* Bio Description */}
          <m.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-lg font-normal leading-relaxed">
            {description || 'I design expressive interfaces and craft motion-led web experiences that feel as good as they look.'}
          </m.p>

          {/* Social Links */}
          <m.div variants={itemVariants} className="pt-2">
            <ContactLinks contact={contact} iconSize={20} />
          </m.div>
        </div>

        {/* Right Column: Hero Image Container */}
        <m.div variants={itemVariants} className="lg:col-span-5 flex justify-center lg:justify-end">
          <m.div
            className="relative w-full max-w-md lg:max-w-none aspect-[4/5] rounded-[32px] overflow-hidden bg-muted shadow-2xl shadow-primary/10 border border-white/50"
            style={{
              x: reduceMotion ? 0 : springX,
              y: reduceMotion ? 0 : springY,
            }}
          >

            {/* Status Pill Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-background/90 backdrop-blur-md px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-foreground shadow-sm border border-border/60">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              {statusText}
            </div>

            {/* Profile Image */}
            {image?.url ? (
              <Image
                src={image.url}
                alt={name}
                width={1000}
                height={1250}
                className="w-full h-full object-cover object-center"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <span className="text-4xl font-serif text-muted-foreground">{firstName[0]}{lastName[0]}</span>
              </div>
            )}
          </m.div>
        </m.div>

      </m.div>
    </section>
  );
};

export default HeroSection;
