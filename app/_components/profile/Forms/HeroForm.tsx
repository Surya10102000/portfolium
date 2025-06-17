"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HeroSectionI } from "@/types/userData";
import { Badge } from "@/components/ui/badge";
import { ImagePlus, ImagePlusIcon, Trash } from "lucide-react";
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
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  clearImageState,
  setPublicIdToDelete,
  setUploadStatus,
} from "@/redux/imageUploadSlice";
import Image from "next/image";

interface HeroFormProps {
  initialData: HeroSectionI;
  onSubmit: (data: HeroSectionI) => void;
  onCancel?: () => void;
}

export const HeroForm = ({
  initialData,
  onSubmit,
  onCancel,
}: HeroFormProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialData.image?.url || null
  );
  const dispatch = useDispatch<AppDispatch>();
  const { previewUrl, publicIdToDelete, status } = useSelector(
    (state: RootState) => state.imageUpload
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<HeroSectionI>({
    defaultValues: initialData,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    setValue(
      "image",
      {
        url: URL.createObjectURL(file),
        publicId: "pending-upload",
      },
      { shouldDirty: true }
    );
  };

  const handleRemoveImage = () => {
    if (
      watch("image")?.publicId &&
      watch("image")?.publicId !== "pending-upload"
    ) {
      dispatch(setPublicIdToDelete(watch("image")?.publicId as string));
    }

    setValue("image", undefined, { shouldDirty: true });
  };

  const onSubmitHandler = async (data: HeroSectionI) => {
    try {
      dispatch(setUploadStatus("uploading"));

      // Handle image upload if a new file was selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);

        const response = await fetch("/api/hero-image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const result = await response.json();
        if (!result.success || !result.url) {
          throw new Error("Upload failed");
        }

        data.image = {
          url: result.url,
          publicId: result.publicId,
        };
      }
      // Handle image deletion if requested
      else if (publicIdToDelete) {
        const response = await fetch(
          `/api/hero-image?publicId=${publicIdToDelete}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Delete failed");
        }

        data.image = undefined;
      }

      // Submit the form data
      onSubmit(data);

      // Clear image state after successful submission
      dispatch(clearImageState());
    } catch (error) {
      console.error("Form submission error:", error);
      // Revert the preview if there was an error
      setValue(
        "image",
        initialData.image ? { ...initialData.image } : undefined,
        { shouldDirty: true }
      );
    } finally {
      dispatch(setUploadStatus("idle"));
      setSelectedFile(null);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      dispatch(clearImageState());
      if (selectedFile && previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [dispatch, selectedFile, previewUrl]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
        {/* Image Upload Field */}
        <div>
          <Label htmlFor="image">Profile Image</Label>
          <div className="mt-2 flex items-center gap-4">
            {previewImage || watch("image")?.url ? (
              <div className="relative">
                <Image
                width={100}
                height={100}
                priority={false}
                  src={previewImage || watch("image")?.url || ""}
                  alt="Preview"
                  className="h-24 w-24 rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                  className="rounded-full bg-primary p-1 text-primary-foreground"
                  disabled={
                    status === "uploading" ||
                    status === "deleting" ||
                    isSubmitting
                  }
                >
                  <ImagePlusIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteDialogOpen(true)}
                  className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                  disabled={
                    status === "uploading" ||
                    status === "deleting" ||
                    isSubmitting
                  }
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="image-upload"
                className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed"
              >
                <ImagePlus className="h-6 w-6" />
                <span className="text-xs">Upload</span>
              </label>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={
                status === "uploading" || status === "deleting" || isSubmitting
              }
            />
          </div>
        </div>

        {/* Name Field */}
        <div>
          {isDirty && (
            <div className="flex justify-end absolute right-8 top-12">
              <Badge variant="secondary">Unsaved Changes</Badge>
            </div>
          )}
          <Label htmlFor="name">Full Name*</Label>
          <Input
            id="name"
            {...register("name", {
              required: "Name is required",
              validate: (value) => {
                if (!value.trim()) {
                  return "Name cannot be just spaces";
                }
                return true;
              },
            })}
            placeholder="John Doe"
            className="mt-2"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Role Field */}
        <div>
          <Label htmlFor="role">Professional Role</Label>
          <Input
            id="role"
            {...register("role", {
              required: "Role is required",
              validate: (value) => {
                if (!value?.trim()) {
                  return "Role cannot be just spaces";
                }
                return true;
              },
            })}
            placeholder="Frontend Developer"
            className="mt-2"
            disabled={isSubmitting}
          />
          {errors.role && (
            <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <Label htmlFor="description">Brief Introduction</Label>
          <Textarea
            id="description"
            {...register("description", {
              required: "Description is required",
              validate: (value) => {
                if (!value?.trim()) {
                  return "Description cannot be just spaces";
                }
                return true;
              },
            })}
            placeholder="A passionate developer with..."
            className="mt-2 h-[100px]"
            disabled={isSubmitting}
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4">
          {onCancel && (
            <Button
              disabled={status !== "idle" || isSubmitting}
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button
            disabled={
              (!isDirty && !previewUrl && !publicIdToDelete) ||
              status !== "idle" ||
              isSubmitting
            }
            type="submit"
          >
            {status !== "idle" || isSubmitting ? "Saving..." : "Save Changes"}{" "}
          </Button>
        </div>
      </form>
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              profile image.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleRemoveImage();
                setDeleteDialogOpen(false);
              }}
              className="bg-destructive hover:bg-destructive/90"
              disabled={status !== "idle" || isSubmitting}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
