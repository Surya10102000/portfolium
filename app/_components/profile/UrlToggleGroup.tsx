// components/UrlToggleGroup.tsx
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useUpdateUsernameMutation } from "@/services/userApi";
import { useForm } from "react-hook-form";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ExternalLink, SquarePen } from "lucide-react";

type FormData = {
  username: string;
};

export function UrlToggleGroup({
  currentUsername,
}: {
  currentUsername: string;
}) {
  const [updateUsername] = useUpdateUsernameMutation();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      username: "",
    },
  });
  const [existError, setExistError] = useState("");

  // Transform input to lowercase and remove spaces in real-time
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const transformed = value.toLowerCase().replace(/\s/g, '');
    setValue("username", transformed, { shouldDirty: true });
  };

  const { displayUrl, fullUrl } = useMemo(() => {
    try {
      const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
      const url = `${baseUrl}/${currentUsername.toLowerCase()}`;
      return {
        displayUrl: `/${currentUsername.toLowerCase()}`,
        fullUrl: url,
      };
    } catch (err) {
      return {
        displayUrl: `${currentUsername.toLowerCase()}`,
        fullUrl: `https://example.com/${currentUsername.toLowerCase()}`,
      };
    }
  }, [currentUsername]);

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        // Ensure final validation before submission
        const finalUsername = data.username.toLowerCase().trim();
        const result = await updateUsername({ username: finalUsername }).unwrap();  
        setOpen(false);
        reset();
      } catch (err) {
        console.error("Failed to update username:", err);
      }
    },
    [updateUsername, reset]
  );

  // Additional validation for spaces
  const validateNoSpaces = (value: string) => {
    return !/\s/.test(value) || "Username cannot contain spaces";
  };

  return (
    <ToggleGroup type="single" variant="outline">
      {/* Change Username Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <ToggleGroupItem value="edit" aria-label="Edit username">
            <SquarePen />
          </ToggleGroupItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change your Username</DialogTitle>
            <DialogDescription className="sr-only">
              Change Username
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="username">New Username</Label>
              <Input
                id="username"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Username must be less than 50 characters",
                  },
                  validate: {
                    noSpaces: validateNoSpaces,
                    notEmpty: (value) => 
                      value.trim().length > 0 || "Username cannot be empty",
                  },
                  pattern: {
                    value: /^[a-z0-9_-]+$/,
                    message: "Only lowercase letters, numbers, - and _ allowed"
                  }
                })}
                onChange={handleInputChange}
                value={watch("username")}
                className="mt-2"
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.username.message}
                </p>
              )}
              <div className="mt-2 text-sm text-muted-foreground">
                <p>Your URL will be: {window.location.origin}/{watch("username") || "username"}</p>
                <p className="mt-1">Allowed characters: a-z, 0-9, -, _</p>
              </div>
              <Button
                className="mt-4 w-full"
                type="submit"
                disabled={isSubmitting || !isDirty}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Display URL */}
      <ToggleGroupItem value="url" className="max-w-[250px] truncate">
        {displayUrl}
      </ToggleGroupItem>

      {/* Open URL */}
      {fullUrl && (
        <ToggleGroupItem
          value="open"
          onClick={() => window.open(fullUrl, "_blank")}
          aria-label="Open profile in new tab"
        >
          <ExternalLink />
        </ToggleGroupItem>
      )}
    </ToggleGroup>
  );
}