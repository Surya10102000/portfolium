import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AboutSection } from "@/types/userData";
import { useForm } from "react-hook-form";

interface AboutFormProps {
  initialData: AboutSection;
  onSubmit: (data: AboutSection) => void;
  onCancel?: () => void;
}

const AboutForm = ({ initialData, onSubmit, onCancel }: AboutFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AboutSection>({ defaultValues: initialData });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* About me field */}
      <div>
        <Label htmlFor="aboutMe">About Yourself</Label>
        <Textarea 
        id="aboutMe" 
        {...register("aboutMe")}
        placeholder="I am Frontend expert..." 
        className="mt-1 h-[100px]"/>
      </div>
      {/* What I do field */}
      <div>
        <Label htmlFor="whatIDo">About Yourself</Label>
        <Textarea 
        id="whatIDo" 
        {...register("whatIDo")}
        placeholder="Working on creating ..." 
        className="mt-1 h-[100px] "/>
      </div>

      {/* Techstack field */}
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
