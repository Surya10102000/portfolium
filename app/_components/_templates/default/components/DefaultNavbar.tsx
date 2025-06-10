import { mockHeroData } from "@/public/mockData";
import { EllipsisVertical } from "lucide-react";
import { MouseEvent, useState } from "react";
import { AnimatePresence, motion as m, Variants } from "motion/react";

const menuVariants: Variants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      staggerChildren: 0.1, // For staggered child animations
      when: "beforeChildren", // Animate parent first
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.15,
    },
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
  exit: { opacity: 0, x: 20 },
};

const DefaultNavbar = () => {
  const section = ["hero", "project", "experience", "contact", "education"];
  const { name } = mockHeroData;
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="flex justify-between items-center p-4 md:p-6">
      <p className="text-3xl md:text-4xl font-bold">{name?.split(" ")?.[0]}</p>
      <div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {<EllipsisVertical />}
        </button>
        <AnimatePresence>
          {isOpen && (
            <m.div
              variants={menuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col text-xl md:text-2xl text-right font-semibold absolute bg-background right-4 p-2 capitalize"
            >
              {section.map((sec, i) => (
                <m.a
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  onClick={(e) => {
                    handleScroll(e, sec);
                    setIsOpen(!isOpen);
                  }}
                  key={i}
                  href={`#${sec}`}
                >
                  {sec}
                </m.a>
              ))}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default DefaultNavbar;
