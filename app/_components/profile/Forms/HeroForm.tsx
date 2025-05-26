"use client";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HeroSectionI } from "@/types/userData";
import { Badge } from "@/components/ui/badge";

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
    formState: { errors, isDirty, isSubmitting },
  } = useForm<HeroSectionI>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
      <div>
        {isDirty && <div className="flex justify-end absolute right-8 top-12 "><Badge variant='secondary'>Unsaved Changes</Badge></div>}
      </div>
        <Label htmlFor="name">Full Name*</Label>
        <Input
          id="name"
          {...register("name",{required : "Name is required",})}
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
          {...register("role",{required : "Role is required"})}
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
          {...register("description",{required : "Description is required"})}
          placeholder="A passionate developer with..."
          className="mt-2 h-[100px] "  
          disabled={isSubmitting}     
        />
        {errors.description && (
          <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button disabled={isSubmitting} type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button disabled={!isDirty || isSubmitting} type="submit">{isSubmitting ? "Saving..." : "Save Changes"}</Button>
      </div>
    </form>
  );
};
