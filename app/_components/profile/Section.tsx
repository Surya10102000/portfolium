import { ArrowRightIcon } from "lucide-react";
import React from "react";

interface SectionsProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const Section: React.FC<SectionsProps> = ({
  title,
  description,
  icon,
  onClick,
}) => {
  return (
    <div
      className="flex justify-between items-center gap-4 border p-4 rounded-md cursor-pointer
                 transition-colors duration-200 ease-in-out
                 "
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div className="text-card-foreground">{icon}</div>

      <div className="flex-1">
        <p className="font-medium ">{title}</p>
        <p className="text-sm">{description}</p>
      </div>

      <div>
        <ArrowRightIcon className="h-5 w-5" />
      </div>
    </div>
  );
};

export default Section;
