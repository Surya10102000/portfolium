import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Contact } from "@/types/userData";
import { useForm } from "react-hook-form";

interface ContactFormProps {
  initialData: Contact;
  onSubmit: (data: Contact) => void;
  onCancel?: () => void;
}

const ContactForm = ({ initialData, onSubmit, onCancel }: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<Contact>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        {isDirty && (
          <div className="flex justify-end absolute right-8 top-12 ">
            <Badge variant="secondary">Unsaved Changes</Badge>
          </div>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          {...register("email", {
            required: "Email is required",
          })}
          placeholder="email@gmail.com"
          className="mt-2"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="github">Github</Label>
        <Input
          id="github"
          {...register("github")}
          placeholder="https://github.com/"
          className="mt-2"
          disabled={isSubmitting}
        />
        {errors.github && (
          <p className="text-sm text-red-500 mt-1">{errors.github.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="linkedIn">LinkedIn</Label>
        <Input
          id="linkedIn"
          {...register("linkedIn")}
          placeholder="https://linkedIn.com/"
          className="mt-2"
          disabled={isSubmitting}
        />
        {errors.linkedIn && (
          <p className="text-sm text-red-500 mt-1">{errors.linkedIn.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="twitter">X</Label>
        <Input
          id="twitter"
          {...register("twitter")}
          placeholder="https://x.com/"
          className="mt-2"
          disabled={isSubmitting}
        />
        {errors.twitter && (
          <p className="text-sm text-red-500 mt-1">{errors.twitter.message}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button
            disabled={isSubmitting}
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button disabled={!isDirty || isSubmitting} type="submit">
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
export default ContactForm;
