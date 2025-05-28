import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Project } from "@/types/userData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAddProjectMutation, useUpdateProjectMutation } from "@/services/portfolioApi";

interface ProjectFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
}

const ProjectFormDialog = ({
  open,
  onOpenChange,
  project,
}: ProjectFormDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors, isSubmitting },
    reset,
  } = useForm<Project>({
    defaultValues: project || {
      projectName: "",
      description: "",
      date: "",
      projectLink: "",
      githubLink: "",
    },
  });

  const [addProject] = useAddProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

  const onSubmit = async (formData: Project) => {
    try {
      if (project?._id) {
        await updateProject({
          projectId: project._id,
          formData
        }).unwrap();
      } else {
        await addProject(formData).unwrap();
      }
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {project ? "Edit Project" : "Add New Project"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {project ? "Edit project details" : "Add a new project"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isDirty && (
            <div className="flex justify-end absolute right-8 top-12">
              <Badge variant="secondary">Unsaved Changes</Badge>
            </div>
          )}

          <div>
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              {...register("projectName", { required: "Project name is required" })}
              placeholder="Enter project name"
              className="mt-2"
              disabled={isSubmitting}
            />
            {errors.projectName && (
              <p className="text-sm text-red-500 mt-1">{errors.projectName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", { required: "Description is required" })}
              placeholder="Project description"
              className="mt-2 h-[100px]"
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              {...register("date")}
              placeholder="May 2023"
              className="mt-2"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="projectLink">Project Link</Label>
            <Input
              id="projectLink"
              {...register("projectLink")}
              placeholder="https://example.com"
              className="mt-2"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="githubLink">Github Link</Label>
            <Input
              id="githubLink"
              {...register("githubLink")}
              placeholder="https://github.com"
              className="mt-2"
              disabled={isSubmitting}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {
              reset();
              onOpenChange(false);
            }}>
              Cancel
            </Button>
            <Button disabled={isSubmitting || !isDirty} type="submit">{isSubmitting?"Saving...":"Save Changes"}Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;