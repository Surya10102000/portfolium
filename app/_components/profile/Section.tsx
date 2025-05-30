import { ArrowRightIcon } from "lucide-react";
import React from "react";

interface SectionsProps{
    title : string;
    description : string;
    icon : React.ReactNode;
    onClick : () => void;
}

const Section : React.FC<SectionsProps> = ({title, description , icon, onClick}) => {
  return (
    <div className="flex justify-between items-center gap-4 border p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" onClick={onClick}>
      <div>
        {icon}
      </div>
      <div className="flex-1 ">
        <p>{title}</p>
        <p>{description}</p>
      </div>
      <div>
        <ArrowRightIcon />
      </div>
    </div>
  );
};
export default Section;
