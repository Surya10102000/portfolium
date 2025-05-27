import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addExperience } from "@/redux/portfolioSlice";
import { useAddExperienceMutation } from "@/services/portfolioApi";
import { Experience } from "@/types/userData";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface ExperienceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience: Experience | null;
}

const ExperienceFormDialog = ({
  open,
  onOpenChange,
  experience,
}: ExperienceFormDialogProps) => {

  console.log("child");
 
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
  } = useForm<Experience>({
    defaultValues: experience || {
      role: "",
      duration: "",
      company: "",
      description: "",
    },
  });

  const [addExperience] = useAddExperienceMutation();

  const onSubmit = async (data: Experience) => {
    // add data to the db and revalidate the global state.
    const response = await addExperience(data).unwrap();
    console.log(response);
    onOpenChange(false);
    reset();
  };

  const handleCancel = () => {
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {experience ? "Edit Experience" : "Add New Experience"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {experience
              ? "Edit your experience details"
              : "Add a new experience to your portfolio"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            {isDirty && (
              <div className="flex justify-end absolute right-8 top-12">
                <Badge variant="secondary">Unsaved Changes</Badge>
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              {...register("role", {
                required: "Role is required",
                minLength: {
                  value: 2,
                  message: "Role must be at least 2 characters",
                },
              })}
              placeholder="Enter the job role"
            />
            {errors.role && (
              <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              {...register("company", {
                required: "Company name is required",
                minLength: {
                  value: 2,
                  message: "Company name must be at least 2 characters",
                },
              })}
              placeholder="Enter the Company name"
            />
            {errors.company && (
              <p className="text-sm text-red-500 mt-1">
                {errors.company.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
              placeholder="A brief description of your role in the company..."
              className="min-h-[100px]"
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              {...register("duration", {
                required: "Duration is required",
                pattern: {
                  value: /^[a-zA-Z0-9\s-–—]+$/,
                  message:
                    "Enter a valid duration format (e.g., May 2020 - April 2023)",
                },
              })}
              placeholder="May 2020 - April 2023"
            />
            {errors.duration && (
              <p className="text-sm text-red-500 mt-1">
                {errors.duration.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceFormDialog;
