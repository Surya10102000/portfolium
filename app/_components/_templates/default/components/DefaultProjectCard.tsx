import { useState } from "react";
import { Project } from "@/types/userData";
import { cn } from "@/lib/utils";
import { GithubIcon, Link } from "lucide-react";

const DefaultProjectCard = ({
  projectName,
  description,
  date,
  image,
  githubLink,
  projectLink,
}: Project) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative aspect-square overflow-hidden cursor-pointer ${
        isExpanded ? "h-auto" : ""
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      {image ? (
        <div className="overflow-hidden">
          <img
            src={image}
            alt={projectName}
            className={cn(
              "w-full h-full object-cover transition duration-300 ease-in-out",
              isHovered ? "scale-105" : ""
            )}
          />
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
          <span className="text-gray-400 text-lg font-medium"></span>
        </div>
      )}

      <div
        className={cn(
          "absolute inset-0  flex flex-col items-center justify-end pb-6 space-y-4 p-4 transition duration-300",
          isHovered ? "lg:opacity-100" : "lg:opacity-0",
          isExpanded
            ? "bg-black/85 backdrop-blur-sm"
            : "bg-gradient-to-t from-black/80 to-transparent "
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div
          className={cn(
            "absolute transition-all duration-300",
            isExpanded ? "top-8 left-8" : "left-8 bottom-7 "
          )}
        >
          <h3 className="text-white text-3xl lg:text-4xl font-bold">{projectName}</h3>

          {isExpanded && (
            <div className="py-2">
              <p className="text-white pr-4 ">
                {description}
              </p>
            </div>
          )}
          <div className="flex  py-2 items-center space-x-4">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:scale-110 transform duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon/>
              </a>
            )}
            {projectLink && (
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:scale-105 transform duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <Link/>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultProjectCard;
