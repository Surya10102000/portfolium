import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import React from 'react';

export interface Contact {
  email?: string;
  github?: string;
  linkedIn?: string;
  twitter?: string;
}

interface ContactLinksProps {
  contact: Contact;
  iconSize?: number;
  className?: string;
}

const ContactLinks: React.FC<ContactLinksProps> = ({ 
  contact, 
  iconSize = 24,
  className = ''
}) => {
  const handleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`flex gap-4 ${className}`}>
      {contact.email && (
        <button 
          onClick={() => handleClick(`mailto:${contact.email}`)}
          aria-label="Email"
          className="p-2 rounded-full hover:bg-foreground/20 transition-all hover:scale-105"
        >
          <Mail size={iconSize} className=" dark:text-gray-300" />
        </button>
      )}

      {contact.github && (
        <button
          onClick={() => handleClick(`${contact.github}`)}
          aria-label="GitHub"
          className="p-2 rounded-full hover:bg-foreground/20 transition-all hover:scale-105"
        >
          <Github size={iconSize} className=" dark:text-gray-300" />
        </button>
      )}

      {contact.linkedIn && (
        <button
          onClick={() => handleClick(`${contact.linkedIn}`)}
          aria-label="LinkedIn"
          className="p-2 rounded-full hover:bg-foreground/20 transition-all hover:scale-105"
        >
          <Linkedin size={iconSize} className=" dark:text-gray-300" />
        </button>
      )}

      {contact.twitter && (
        <button
          onClick={() => handleClick(`${contact.twitter}`)}
          aria-label="Twitter"
          className="p-2 rounded-full hover:bg-foreground/20 transition-all hover:scale-105"
        >
          <Twitter size={iconSize} className=" dark:text-gray-300" />
        </button>
      )}
    </div>
  );
};

export default ContactLinks;