// components/ColorSelector.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useUpdatePrimaryColorMutation } from "@/services/portfolioApi";
import { useEffect, useState } from "react";

const colorOptions = [
  { value: "blue", label: "Blue", colorClass: "bg-blue-500" },
  { value: "rose", label: "Rose", colorClass: "bg-rose-500" },
  { value: "emerald", label: "Emerald", colorClass: "bg-emerald-500" },
  { value: "amber", label: "Amber", colorClass: "bg-amber-500" },
  { value: "indigo", label: "Indigo", colorClass: "bg-indigo-500" },
];

export function ColorSelector({ currentColor }: { currentColor: string }) {
  const [value, setValue] = useState(currentColor);
  const [updateColor] = useUpdatePrimaryColorMutation();

  // Sync with external currentColor changes
  useEffect(() => {
    setValue(currentColor);
  }, [currentColor]);

  const handleColorChange = async (color: string) => {
    setValue(color);
    try {
      const response = await updateColor(color).unwrap();
      console.log(response)
    } catch (err) {
      console.error("Failed to update color:", err);
      // Revert on error
      setValue(currentColor);
    }
  };

  return (
    <Select value={value} onValueChange={handleColorChange}>
      <SelectTrigger className="w-[180px] mt-2">
        <SelectValue placeholder="Select color" />
      </SelectTrigger>
      <SelectContent>
        {colorOptions.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            className="flex items-center gap-2"
          >
            <div className={cn(
              "w-4 h-4 rounded-full",
              option.colorClass
            )} />
            <span>{option.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}