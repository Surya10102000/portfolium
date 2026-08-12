import React, { useState, useEffect, MouseEvent } from 'react';
import { 
  Home, 
  Briefcase, 
  Layers, 
  Star, 
  MessageSquare, 
  HelpCircle, 
  Mail, 
  Download, 
  Menu, 
  X 
} from 'lucide-react';
import { UserData } from "@/types/userData";
import { getNonEmptySections } from "../../templateUtils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  active?: boolean;
}

const LuminaryNavbar = ({ portfolioData }: { portfolioData: UserData }) => {
  const sections = getNonEmptySections(portfolioData);
  const name = portfolioData.hero.name as string;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Map sections to nav items with icons
  const getNavItems = (): NavItem[] => {
    const iconMap: { [key: string]: React.ElementType } = {
      'hero': Home,
      'experience': Briefcase,
      'work': Layers,
      'skills': Star,
      'reviews': MessageSquare,
      'faq': HelpCircle,
      'contact': Mail,
    };

    return sections.map((sec) => ({
      label: sec.charAt(0).toUpperCase() + sec.slice(1),
      href: `#${sec}`,
      icon: iconMap[sec] || HelpCircle,
      active: activeSection === sec,
    }));
  };

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
    setMobileMenuOpen(false);
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
      if (e.key === "Escape" && mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  const navItems = getNavItems();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-center transition-all duration-300 ${
      scrolled ? 'bg-background/80 backdrop-blur-xl' : ''
    }`}>
      {/* --- DESKTOP FLOATING NAVBAR --- */}
      <nav className="hidden lg:flex items-center justify-between gap-8 px-6 py-3 bg-white/60 backdrop-blur-md rounded-full border border-white/40 shadow-lg shadow-purple-500/5 max-w-6xl w-full">
        {/* Brand Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleScroll(e, "hero")}
          className="text-xl font-serif tracking-tight text-gray-900 pr-2"
        >
          {name?.split(" ")?.[0] || 'Jonathan'} <span className="italic font-normal text-gray-600">{name?.split(" ")?.[1] || 'Whitfield'}</span>
        </a>

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href.substring(1))}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  item.active
                    ? 'bg-purple-100/80 text-purple-700 shadow-sm'
                    : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50/50'
                }`}
              >
                <Icon className="w-4 h-4 stroke-[1.75]" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* CTA Button */}
        <a
          href="/cv.pdf"
          download
          className="flex items-center gap-2 px-5 py-2.5 bg-purple-650 hover:bg-purple-700 bg-[#6C47C8] text-white rounded-full text-sm font-semibold transition-colors shadow-md shadow-purple-500/20"
        >
          <Download className="w-4 h-4" />
          <span>Download CV</span>
        </a>
      </nav>

      {/* --- MOBILE / TABLET HEADER --- */}
      <div className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-white/40 backdrop-blur-md rounded-2xl border border-white/30">
        <a 
          href="#hero" 
          onClick={(e) => handleScroll(e, "hero")}
          className="text-lg font-serif text-gray-900"
        >
          {name?.split(" ")?.[0] || 'Jonathan'} <span className="italic font-normal text-gray-600">{name?.split(" ")?.[1] || 'Whitfield'}</span>
        </a>

        <div className="flex items-center gap-3">
          <a
            href="/cv.pdf"
            download
            className="flex items-center gap-1.5 px-4 py-2 bg-[#6C47C8] text-white rounded-full text-xs font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-purple-800 hover:bg-purple-50 rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-lg rounded-2xl p-4 border border-purple-100 shadow-xl flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href.substring(1))}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                  item.active
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default LuminaryNavbar;