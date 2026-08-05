import { 
  ArrowUp, 
  Github, 
  Linkedin, 
  Mail, 
  Twitter, 
  Heart,
  Send,
  MessageCircle,
  ExternalLink
} from "lucide-react";
import { motion as m, Variants, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface Contact {
  email?: string;
  github?: string;
  linkedIn?: string;
  twitter?: string;
}

// Floating particles for background
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 20 + 10,
  delay: Math.random() * 10,
}));

const iconVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  }),
};

const footerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const LuminaryFooter = ({ contact }: { contact: Contact }) => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Show scroll to top button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    { key: 'email', icon: Mail, label: 'Email', url: `mailto:${contact.email}` },
    { key: 'github', icon: Github, label: 'GitHub', url: contact.github },
    { key: 'linkedIn', icon: Linkedin, label: 'LinkedIn', url: contact.linkedIn },
    { key: 'twitter', icon: Twitter, label: 'Twitter', url: contact.twitter },
  ].filter(link => link.url);

  return (
    <m.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={footerVariants}
      className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-b from-background via-primary/5 to-primary/10"
      id="contact"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {particles.map((particle) => (
          <m.div
            key={particle.id}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Decorative gradient circles */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 py-16">
        {/* Sparkle icon */}
        <m.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring", 
            stiffness: 200,
            delay: 0.2,
          }}
          className="mb-8"
        >
          <div className="relative">
            <m.div
              className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="relative p-4 rounded-full bg-primary/10 border border-primary/20">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
          </div>
        </m.div>

        {/* Heading */}
        <m.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 25,
              },
            },
          }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          
          <m.div
            initial={{ scaleX: 0, originX: 0.5 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-0.5 w-24 mx-auto bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          />

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Have a project in mind or just want to say hello?{" "}
            <span className="text-primary font-medium">I&apos;d love to hear from you!</span>
          </p>
        </m.div>

        {/* Social Links */}
        <m.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.6,
              },
            },
          }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <m.a
                key={link.key}
                variants={iconVariants}
                custom={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group relative p-4 rounded-2xl transition-all duration-300",
                  "bg-card/30 backdrop-blur-sm border border-border/50",
                  "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10",
                  "hover:scale-105"
                )}
                whileHover="hover"
                whileTap="tap"
                aria-label={link.label}
              >
                <Icon className="w-6 h-6 md:w-7 md:h-7 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                
                {/* Hover glow */}
                <m.span
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    boxShadow: `0 0 30px rgba(107, 82, 161, 0.2)`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </m.a>
            );
          })}
        </m.div>

        {/* Email CTA */}
        {contact.email && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <m.a
              href={`mailto:${contact.email}`}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
              whileHover={{ 
                scale: 1.03,
                y: -2,
                transition: { type: "spring", stiffness: 400 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              <span>{contact.email}</span>
              <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
            </m.a>
          </m.div>
        )}
      </div>

      {/* Footer Bottom */}
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="relative z-10 flex flex-col items-center gap-4 py-8 px-4 border-t border-border/20"
      >
        {/* Back to top button */}
        <m.button
          onClick={scrollToTop}
          className={cn(
            "p-3 rounded-full transition-all duration-300",
            "bg-primary/10 hover:bg-primary/20 text-primary",
            "border border-primary/20 hover:border-primary/40",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          whileHover={{ 
            scale: 1.1,
            y: -2,
            transition: { type: "spring", stiffness: 400 }
          }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <m.div
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowUp className="w-5 h-5" />
          </m.div>
        </m.button>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-muted-foreground/60">
          <span>
            © {new Date().getFullYear()} All Rights Reserved
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1">
            Made with
            <m.span
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400/20" />
            </m.span>
            using
            <span className="font-medium text-foreground/80">Portfolium</span>
          </span>
        </div>

        {/* Decorative line */}
        <m.div
          initial={{ scaleX: 0, originX: 0.5 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        />
      </m.div>

      {/* Floating "Back to Top" button for mobile */}
      <AnimatePresence>
        {isVisible && (
          <m.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </m.button>
        )}
      </AnimatePresence>
    </m.footer>
  );
};

export default LuminaryFooter;