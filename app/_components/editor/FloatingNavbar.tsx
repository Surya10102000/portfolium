"use client";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sun, Moon, Save, Upload } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export function FloatingNavbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center ">
      <div className="flex items-center gap-4 rounded-full border bg-background/95 backdrop-blur px-8 py-3 shadow-sm">
        {/* Divider */}
        <Avatar>
          <AvatarImage className="w-12 rounded-full" src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="h-6 w-px bg-border" />
        {/* Save Button */}
        <Button variant="ghost" size="sm" className="gap-2">
          <Save className="h-4 w-4" />
          Save
        </Button>

        {/* Publish Button */}
        <Button variant="default" size="sm" className="gap-2">
          <Upload className="h-4 w-4" />
          Publish
        </Button>
        {/* Dark Mode Toggle */}
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4" />
          <Switch
            id="dark-mode"
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
          <Moon className="h-4 w-4" />
          <Label htmlFor="dark-mode" className="sr-only">
            Dark Mode
          </Label>
        </div>
      </div>
    </div>
  );
}
