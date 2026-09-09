import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface SectionsProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  isComplete?: boolean;
}

const Section: React.FC<SectionsProps> = ({
  title,
  description,
  icon,
  onClick,
  isComplete = true,
}) => {
  return (
    <div
      className="flex justify-between items-center gap-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-md cursor-pointer
                 transition-colors duration-200 ease-in-out hover:bg-muted/50
                 "
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div className="text-card-foreground">{icon}</div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium ">{title}</p>
          {!isComplete && (
            <Badge variant="outline" className="text-[10px] h-4 px-1.5 font-normal text-muted-foreground">
              Incomplete
            </Badge>
          )}
        </div>
        <p className="text-sm">{description}</p>
      </div>

      <div>
        <ArrowRightIcon className="h-5 w-5" />
      </div>
    </div>
  );
};

export default Section;
