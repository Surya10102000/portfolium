import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AboutSection } from "@/types/userData";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AboutFormProps {
  initialData: AboutSection;
  onSubmit: (data: AboutSection) => void;
  onCancel?: () => void;
}

const AboutForm = ({ initialData, onSubmit, onCancel }: AboutFormProps) => {
  const [techInput, setTechInput] = useState("");
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<AboutSection>({ 
    defaultValues: {
      ...initialData,
      techStack: initialData.techStack || [] // Ensure techStack is always an array
    }
  });

  // TypeScript now knows techStack will always be an array
  const techStack: string[] = watch("techStack") || [];

  const handleAddTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      const newTechStack = [...techStack, techInput.trim()];
      setValue("techStack", newTechStack);
      setTechInput("");
    }
  };

  const handleRemoveTech = (index: number) => {
    const newTechStack = techStack.filter((_, i) => i !== index);
    setValue("techStack", newTechStack);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTech();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* About me field */}
      <div>
        {isDirty && <div className="flex justify-end absolute right-8 "><Badge variant='destructive'>Unsaved Changes</Badge></div>}
      </div>
      <div>
        <Label htmlFor="aboutMe">About Yourself</Label>
        <Textarea
          id="aboutMe"
          {...register("aboutMe")}
          placeholder="I am Frontend expert..."
          className="mt-2 h-[100px]"
        />
      </div>

      {/* What I do field */}
      <div>
        <Label htmlFor="whatIDo">What do You do?</Label>
        <Textarea
          id="whatIDo"
          {...register("whatIDo")}
          placeholder="Working on creating ..."
          className="mt-2 h-[100px]"
        />
      </div>

      {/* TechStack field */}
      <div>
        <Label>Tech Stack</Label>
        <div className="flex flex-wrap gap-2 mt-2">
            {techStack.map((tech, index) => (
              <Badge
                variant='secondary'
                key={index}
                className="flex items-center gap-1"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => handleRemoveTech(index)}
                  className="text-gray-500 hover:text-red-400"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>

        <div className="mt-2 space-y-3">
          <div className="flex gap-2">
            <Input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add technology (e.g., React, Node.js)"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddTech}
            >
              Add
            </Button>
          </div>

          
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
};

export default AboutForm;