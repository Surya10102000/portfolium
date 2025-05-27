// TODO: add functionality to add, edit, and delete projects

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { RootState } from "@/redux/store";
import { PlusCircle, ExternalLink, Trash2, Edit } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Project } from "@/types/userData";

interface ProjectSectionEditorProps {
  onCancel?: () => void;
}

const ProjectSectionEditor = ({ onCancel }: ProjectSectionEditorProps) => {
  const [activeForm, setActiveForm] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const projects = useSelector(
    (state: RootState) => state.portfolio.data.projects
  );

  const handleEditClick = (project: Project) => {
    setCurrentProject(project);
    setActiveForm(true);
  };

  const handleAddClick = () => {
    setCurrentProject(null);
    setActiveForm(true);
  };

  return (
    <div>
      {/* Projects Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-scroll h-[400px]">
        {projects?.map((project: Project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={() => handleEditClick(project)}
            onDelete={() => {
              setCurrentProject(project);
              setDeleteDialogOpen(true);
            }}
          />
        ))}

        {/* Add New Project Card */}
        <Card
          className="hover:bg-accent/50 transition-colors cursor-pointer flex flex-col items-center justify-center h-full min-h-[200px]"
          onClick={handleAddClick}
        >
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <PlusCircle className="w-8 h-8 text-muted-foreground" />
            <span className="text-muted-foreground">Add New Project</span>
          </CardContent>
        </Card>
      </div>

      h
      {/* Edit/Add Project Dialog */}
      <ProjectFormDialog
        open={activeForm}
        onOpenChange={setActiveForm}
        project={currentProject}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                // Handle delete logic here
                console.log("Deleting project:", currentProject?.id);
                setDeleteDialogOpen(false);
              }}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}

const ProjectCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      {/* Project Content */}
      <CardHeader>
        <div className="flex flex-col">
          <CardTitle className="text-xl">{project.projectName}</CardTitle>
          {project.date && <CardDescription>{project.date}</CardDescription>}
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <CardDescription className="line-clamp-2 sr-only">
          {project.description}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3 pt-0">
        {/* Links */}
        <div className="flex gap-3 w-full">
          {project.projectLink && (
            <Button variant="link" size="sm" className="px-0" asChild>
              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
                Link
              </a>
            </Button>
          )}
        </div>

        <div className="flex gap-2 w-full">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="text-destructive hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

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
  const { register, handleSubmit } = useForm<Project>({
    defaultValues: project || {
      projectName: "",
      description: "",
      date: "",
      projectLink: "",
      image: "",
    },
  });

  const onSubmit = (data: Project) => {
    console.log("Form submitted:", data);
    // Handle form submission (create or update)
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {project ? "Edit Project" : "Add New Project"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {project
              ? "Edit your project details"
              : "Add a new project to your portfolio"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              {...register("projectName", { required: true })}
              placeholder="My Awesome Project"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", { required: true })}
              placeholder="A brief description of your project..."
              className="min-h-[100px]"
            />
          </div>

          <div>
            <Label htmlFor="projectLink">Project URL</Label>
            <Input
              id="projectLink"
              {...register("projectLink")}
              placeholder="https://example.com"
            />
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" {...register("date")} placeholder="2023" />
          </div>

          {/* Tech Stack input would go here */}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectSectionEditor;
