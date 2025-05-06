"use client";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HeroSectionI } from "@/types/userData";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<HeroSectionI>({
    defaultValues: initialData,
  });

  const imageUrl = watch("image");

  const handleImageUpload = (url: string) => {
    setValue("image", url, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <Label htmlFor="name">Full Name*</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="John Doe"
          className="mt-1"
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
          {...register("role")}
          placeholder="Frontend Developer"
          className="mt-1"
        />
      </div>

      {/* Description Field */}
      <div>
        <Label htmlFor="description">Brief Introduction</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="A passionate developer with..."
          className="mt-1 h-[100px] "       
        />
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
