import { EllipsisVertical } from "lucide-react";
import { MouseEvent, useState } from "react";
import { AnimatePresence, motion as m, Variants } from "motion/react";
import { UserData } from "@/types/userData";

const menuVariants: Variants = {
  initial: {
    opacity: 0,
    height: 0,
  },
  animate: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.1,
      staggerChildren: 0.1, // For staggered child animations
      when: "beforeChildren", // Animate parent first
    },
  },
  exit: {
    opacity: 0.5,
    height: 0,
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

const DefaultNavbar = ({ portfolioData }: { portfolioData: UserData }) => {
  const section = ["hero", "project", "experience", "contact", "education"];
  const name = portfolioData.hero.name as string;
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
    <m.div
      initial={{ y: "-100%" }}
      animate={{
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      }}
    >
      <div className="flex justify-between items-center py-4 md:py-6 ">
        <p className="text-3xl font-bold ">{`${name?.split(" ")?.[0]}.`}</p>
        <div>
          <button onClick={() => setIsOpen(!isOpen)}>
            {<EllipsisVertical />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        <div className="relative">
          {isOpen && (
            <m.div
              variants={menuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col text-xl md:text-2xl text-right font-semibold bg-background overflow-hidden absolute right-0 p-2 capitalize"
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
        </div>
      </AnimatePresence>
    </m.div>
  );
};
export default DefaultNavbar;
