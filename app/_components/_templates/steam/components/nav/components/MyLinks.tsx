import styles from "./headinglinks.module.scss";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Github, Linkedin, LucideIcon, Mail, Twitter } from "lucide-react";
import { Contact } from "@/types/userData";
import { useMemo } from "react";

type ContactLink = {
  name: string;
  href: string;
  icon: LucideIcon;
  ariaLabel?: string;
};

const getContactLinks = (contacts: Contact): 
ContactLink[] => {
  console.log(contacts)
  const links: ContactLink[] = [
    {
      name: "email",
      href: `mailto:${contacts?.email as string}` || "",
      icon: Mail,
      ariaLabel: "Send email",
    },
    {
      name: "github",
      href: contacts?.github || "",
      icon: Github,
      ariaLabel: "GitHub profile",
    },
    {
      name: "linkedIn",
      href: contacts?.linkedIn || "",
      icon: Linkedin,
      ariaLabel: "LinkedIn profile",
    },
    {
      name: "twitter",
      href: contacts?.twitter || "",
      icon: Twitter,
      ariaLabel: "Twitter profile",
    },
  ];

  return links.filter((link) => link.href);
};

const spanVariant: Variants = {
  hidden: { y: -30, opacity: 0 },
  visible: (index) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: index * 0.1,
    },
  }),
};

export const MyLinks = ({ contact : contacts }: { contact: Contact }) => {
  const contactLinks = useMemo(
    () => getContactLinks(contacts),
    [contacts] 
  );
  return (
    <div className={styles.links}>
      {contactLinks.map(({ href, icon: Icon, ariaLabel }, index) => (
        <motion.span
          key={`${href}-${index}`}
          variants={spanVariant}
          initial="hidden"
          animate="visible"
          custom={index}
        >
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
          >
            <Icon
              size="2.4rem"
              className="hover:scale-110 transition-transform"
            />
          </Link>
        </motion.span>
      ))}
    </div>
  );
};
