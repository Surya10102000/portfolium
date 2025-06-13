"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HeroSectionI } from "@/types/userData";
import { Badge } from "@/components/ui/badge";
import { ImagePlus, Trash } from "lucide-react";

interface CloudinaryUploadResult {
  url: string;
  publicId: string;
}

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
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<HeroSectionI>({
    defaultValues: initialData,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = (await response.json()) as {
        success: boolean;
        url: string;
        publicId: string;
      };

      if (!result.success || !result.url) {
        throw new Error("Upload failed");
      }

      setValue(
        "image",
        {
          url: result.url,
          publicId: result.publicId,
        },
        { shouldDirty: true }
      );
    } catch (error) {
      console.error("Upload error:", error);
      setPreviewImage(null);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = async () => {
    if (!window.confirm("Are you sure you want to remove this image?")) return;

    try {
      setIsUploading(true);

      // Only attempt deletion if we have a publicId
      if (watch("image")?.publicId) {
        const response = await fetch(
          `/api/upload-image?publicId=${watch("image")?.publicId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(await response.text());
        }
      }

      setPreviewImage(null);
      setValue("image", undefined, { shouldDirty: true });
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Image Upload Field */}
      <div>
        <Label htmlFor="image">Profile Image</Label>
        <div className="mt-2 flex items-center gap-4">
          {previewImage || watch("image")?.url ? (
            <div className="relative">
              <img
                src={previewImage || watch("image")?.url || ""}
                alt="Preview"
                className="h-24 w-24 rounded-full object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                disabled={isUploading}
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
            disabled={isUploading || isSubmitting}
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
            disabled={isSubmitting || isUploading}
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          disabled={(!isDirty && !previewImage) || isSubmitting || isUploading}
          type="submit"
        >
          {isSubmitting || isUploading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
