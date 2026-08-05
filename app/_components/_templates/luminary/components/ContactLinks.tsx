import { Contact } from "@/types/userData";
import { Github, Linkedin, Mail, Twitter, Send } from "lucide-react";
import { motion as m, Variants } from "motion/react";
import { useState } from "react";

interface ContactLinksProps {
  contact: Contact;
  iconSize?: number;
  className?: string;
  variant?: "default" | "outline" | "glass";
}

const iconVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.15,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
      rotate: { duration: 0.3 },
    },
  },
  tap: { scale: 0.9 },
};

const tooltipVariants: Variants = {
  initial: { opacity: 0, y: -10, scale: 0.8 },
  hover: {
    opacity: 1,
    y: -8,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const socialLinks = [
  { key: "email", icon: Mail, label: "Email", color: "hover:text-blue-400" },
  {
    key: "github",
    icon: Github,
    label: "GitHub",
    color: "hover:text-gray-300",
  },
  {
    key: "linkedIn",
    icon: Linkedin,
    label: "LinkedIn",
    color: "hover:text-blue-500",
  },
  {
    key: "twitter",
    icon: Twitter,
    label: "Twitter",
    color: "hover:text-sky-400",
  },
];

const ContactLinks: React.FC<ContactLinksProps> = ({
  contact,
  iconSize = 24,
  className = "",
  variant = "default",
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleClick = (url: string, label: string) => {
    console.log(`Opening: ${label} at ${url}`);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const getButtonStyles = () => {
    switch (variant) {
      case "glass":
        return "bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/30";
      case "outline":
        return "border border-border hover:border-primary";
      default:
        return "bg-card/50 border border-border/50 hover:border-primary/30";
    }
  };

  return (
    <m.div
      className={`flex flex-wrap items-center gap-3 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {socialLinks.map(({ key, icon: Icon, label, color }, index) => {
        const url = contact[key as keyof Contact];
        if (!url) return null;

        const isHovered = hoveredIndex === index;

        return (
          <m.div
            key={key}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <m.button
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleClick(url as string, label)}
              aria-label={label}
              className={`
                relative p-3 rounded-xl transition-all duration-300
                ${getButtonStyles()}
                ${color}
                group
              `}
            >
              <Icon
                size={iconSize}
                className="transition-colors duration-300"
              />

              {/* Hover glow ring */}
              <m.span
                className="absolute inset-0 rounded-xl"
                animate={{
                  boxShadow: isHovered
                    ? `0 0 20px rgba(107, 82, 161, 0.3)`
                    : `0 0 0px rgba(107, 82, 161, 0)`,
                }}
                transition={{ duration: 0.3 }}
              />
            </m.button>

            {/* Tooltip */}
            <m.div
              variants={tooltipVariants}
              initial="initial"
              animate={isHovered ? "hover" : "initial"}
              className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium bg-foreground/90 text-background rounded-lg whitespace-nowrap pointer-events-none shadow-lg"
            >
              {label}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground/90 rotate-45" />
            </m.div>
          </m.div>
        );
      })}

      {/* Extra contact option - Quick message */}
      {contact.email && (
        <m.a
          href={`mailto:${contact.email}`}
          className="ml-2 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Message Me</span>
        </m.a>
      )}
    </m.div>
  );
};

export default ContactLinks;
