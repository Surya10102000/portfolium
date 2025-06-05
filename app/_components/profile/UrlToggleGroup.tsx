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
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      username: "",
    },
  });

  const { displayUrl, fullUrl } = useMemo(() => {
    try {
      const baseUrl =
        typeof window !== "undefined" ? window.location.origin : "";
      const url = `${baseUrl}/${currentUsername}`;
      return {
        displayUrl: `/${currentUsername}`,
        fullUrl: url,
      };
    } catch (err) {
      console.error( err)
      return {
        displayUrl: `${currentUsername}`,
        fullUrl: `https://example.com/${currentUsername}`,
      };
    }
  }, [currentUsername]);

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        await updateUsername(data).unwrap();
        setOpen(false);
        reset();
      } catch (err) {
        console.error("Failed to update username:", err);
      }
    },
    [updateUsername, reset]
  );

  return (
    <ToggleGroup type="single" variant="outline">
      {/* A: Change Username (Dialog) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <ToggleGroupItem value="a">
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
              <Label htmlFor="username"></Label>
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
                })}
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.username.message}
                </p>
              )}
              <Button
                className="mt-2"
                type="submit"
                disabled={isSubmitting || !isDirty}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* B: Show Truncated URL */}
      <ToggleGroupItem value="b" className="max-w-[250px] truncate">
        {displayUrl}
      </ToggleGroupItem>

      {/* C: Open URL in New Tab */}
      {fullUrl && (
        <ToggleGroupItem
          value="c"
          onClick={() => window.open(fullUrl, "_blank")}
        >
          <ExternalLink />
        </ToggleGroupItem>
      )}
    </ToggleGroup>
  );
}
