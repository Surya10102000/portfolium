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
import {
  useAddExperienceMutation,
  useUpdateExperienceMutation,
} from "@/services/portfolioApi";
import { Experience } from "@/types/userData";
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
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors, isSubmitting },
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
  const [updateExperience] = useUpdateExperienceMutation();

  const onSubmit = async (formData: Experience) => {
    try {
      if (experience?._id) {
        await updateExperience({
          experienceId: experience._id,
          formData,
        }).unwrap();
      } else {
        await addExperience(formData).unwrap();
      }
      reset();
      onOpenChange(false);
    } catch (error) {
      console.log("Failed to save experience:", error);
    }
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
                validate: (value) => {
                  if (!value?.trim()) {
                    return "Role Me cannot be just spaces";
                  }
                  return true;
                },
              })}
              placeholder="Enter the job role"
              disabled={isSubmitting}
              className="mt-2"
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
                },validate: (value) => {
              if (!value?.trim()) {
                return "Company cannot be just spaces";
              }
              return true;
            },
              })}
              placeholder="Enter the Company name"
              disabled={isSubmitting}
              className="mt-2"
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
                },validate: (value) => {
              if (!value?.trim()) {
                return "Description cannot be just spaces";
              }
              return true;
            },
              })}
              placeholder="A brief description of your role in the company..."
              className="mt-2 h-[100px]"
              disabled={isSubmitting}
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
                },validate: (value) => {
              if (!value?.trim()) {
                return "Duration cannot be just spaces";
              }
              return true;
            },
              })}
              placeholder="May 2020 - April 2023"
              disabled={isSubmitting}
              className="mt-2"
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
            <Button disabled={isSubmitting || !isDirty} type="submit">
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceFormDialog;
