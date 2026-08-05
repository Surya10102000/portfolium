import { Menu, X, Sparkles } from "lucide-react";
import { MouseEvent, useState, useEffect } from "react";
import { AnimatePresence, motion as m, Variants } from "motion/react";
import { UserData } from "@/types/userData";
import { getNonEmptySections } from "../../templateUtils";

const menuVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: -10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for smooth spring-like feel
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const itemVariants: Variants = {
  initial: { 
    opacity: 0, 
    x: 20,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: { 
    opacity: 0, 
    x: 20,
    filter: "blur(4px)",
    transition: {
      duration: 0.15,
    },
  },
};

const indicatorVariants: Variants = {
  initial: { scaleX: 0, originX: 0 },
  animate: { 
    scaleX: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    }
  },
  exit: { scaleX: 0 }
};

const LuminaryNavbar = ({ portfolioData }: { portfolioData: UserData }) => {
  const sections = getNonEmptySections(portfolioData);
  const name = portfolioData.hero.name as string;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Handle scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sectionElements = sections.map(id => document.getElementById(id));
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <m.nav
      initial={{ y: "-100%" }}
      animate={{
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-xl shadow-sm border-b border-border/50" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo / Name with Sparkle Icon */}
          <m.a
            href="#hero"
            onClick={(e) => handleScroll(e, "hero")}
            className="group flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {`${name?.split(" ")?.[0]}.`}
              </span>
              <m.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -top-1 -right-3"
              >
                <Sparkles className="w-3 h-3 text-primary/60" />
              </m.span>
            </div>
          </m.a>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map((sec, i) => (
              <m.a
                key={i}
                href={`#${sec}`}
                onClick={(e) => handleScroll(e, sec)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                  activeSection === sec
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
                {activeSection === sec && (
                  <m.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-primary/40 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </m.a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <m.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <m.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </m.div>
              ) : (
                <m.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </m.div>
              )}
            </AnimatePresence>
          </m.button>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Glassmorphism */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="md:hidden absolute top-full left-0 right-0 mx-4 mt-2 p-2 bg-background/95 backdrop-blur-xl rounded-2xl border border-border/50 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col py-2">
              {sections.map((sec, i) => (
                <m.a
                  key={i}
                  variants={itemVariants}
                  href={`#${sec}`}
                  onClick={(e) => handleScroll(e, sec)}
                  className={`relative px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    activeSection === sec
                      ? "text-primary bg-primary/5"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/30"
                  }`}
                  whileHover={{ 
                    x: 8,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                    {sec.charAt(0).toUpperCase() + sec.slice(1)}
                  </span>
                  {activeSection === sec && (
                    <m.span
                      variants={indicatorVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-gradient-to-b from-primary to-primary/40 rounded-full"
                    />
                  )}
                </m.a>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.nav>
  );
};

export default LuminaryNavbar;