import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail, Twitter } from "lucide-react";

export interface Contact {
  email?: string;
  github?: string;
  linkedIn?: string;
  twitter?: string;
}

const DefaultFooter = ({ contact }: { contact: Contact }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.footer
      className="min-h-screen w-full bg-foreground text-background flex flex-col"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex-grow flex flex-col items-center justify-center p-8 gap-12">
        <h2 className="text-4xl md:text-5xl font-bold text-center">
          Let's Connect
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="p-4 rounded-full bg-background/10 hover:bg-background/20 transition-all"
              aria-label="Email"
            >
              <Mail className="h-8 w-8" />
            </a>
          )}

          {contact.github && (
            <a
              href={`https://github.com/${contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-background/10 hover:bg-background/20 transition-all"
              aria-label="GitHub"
            >
              <Github className="h-8 w-8" />
            </a>
          )}

          {contact.linkedIn && (
            <a
              href={`https://linkedin.com/in/${contact.linkedIn}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-background/10 hover:bg-background/20 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-8 w-8" />
            </a>
          )}

          {contact.twitter && (
            <a
              href={`https://twitter.com/${contact.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-background/10 hover:bg-background/20 transition-all"
              aria-label="Twitter"
            >
              <Twitter className="h-8 w-8" />
            </a>
          )}
        </div>

        <div className="text-center max-w-2xl">
          <p className="text-lg opacity-80">
            Feel free to reach out for collaborations or just to say hello!
          </p>
          {contact.email && (
            <p className="mt-4 text-xl font-medium">{contact.email}</p>
          )}
        </div>
      </div>

      <div className="py-6 border-t border-background/20 flex flex-col items-center">
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-background/10 hover:bg-background/20 mb-4 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </motion.footer>
  );
};

export default DefaultFooter;
