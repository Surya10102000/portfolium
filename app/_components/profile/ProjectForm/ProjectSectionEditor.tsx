import { Project } from "@/types/userData";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
  useDeleteProjectMutation,
  useGetPortfolioQuery,
} from "@/services/portfolioApi";
import ProjectFormDialog from "./ProjectFormDialog";
import ProjectCard from "./ProjectCard";

interface ProjectSectionEditorProps {
  onCancel: () => void;
}

const ProjectSectionEditor = ({ onCancel }: ProjectSectionEditorProps) => {
  const [activeForm, setActiveForm] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const { data } = useGetPortfolioQuery();
  const [deleteProject, { isLoading }] = useDeleteProjectMutation();

  const handleEditClick = (project: Project) => {
    setCurrentProject(project);
    setActiveForm(true);
  };

  const handleAddClick = () => {
    setCurrentProject(null);
    setActiveForm(true);
  };

  const handleDeleteClick = (project: Project) => {
    setCurrentProject(project);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async (projectId: string) => {
    try {
      await deleteProject(projectId).unwrap();
      setDeleteDialogOpen(false);
      setActiveForm(false);
    } catch (error) {
      console.log("Failed to delete project:", error);
    }
  };

  return (
    <div>
      {/* Projects Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-scroll h-[400px]">
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

        {data?.projects?.map((project: Project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onEdit={() => handleEditClick(project)}
            onDelete={() => handleDeleteClick(project)}
          />
        ))}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        {onCancel && <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>}
      </div>

      {/* Edit/Add Project Dialog */}
      {activeForm && (
        <ProjectFormDialog
          open={activeForm}
          onOpenChange={setActiveForm}
          project={currentProject}
        />
      )}

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
              onClick={() => handleConfirmDelete(currentProject?._id || "")}
              className="bg-destructive hover:bg-destructive/90"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProjectSectionEditor;
