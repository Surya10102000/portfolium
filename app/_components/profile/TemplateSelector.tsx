// components/TemplateSelector.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateTemplateMutation } from "@/services/portfolioApi";
import { useEffect, useState } from "react";

const templateOptions = [
  { value: "default", label: "Default" },
  { value: "minimal", label: "Minimal" },
];

export function TemplateSelector({ currentTemplate }: { currentTemplate: string }) {
  const [value, setValue] = useState(currentTemplate);
  const [updateTemplate] = useUpdateTemplateMutation();

  // Sync with external currentTemplate changes
  useEffect(() => {
    setValue(currentTemplate);
  }, [currentTemplate]);

  const handleTemplateChange = async (template: string) => {
    const previousTemplate = value;
    try {
      setValue(template);
      const result = await updateTemplate(template).unwrap();
          console.log('Update successful:', result);
    } catch (err) {
      console.error("Failed to update Template:", err);
      // Revert on error
      setValue(previousTemplate);
    }
  };

  return (
    <Select value={value} onValueChange={handleTemplateChange}>
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="Select Template" />
      </SelectTrigger>
      <SelectContent>
        {templateOptions.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            className="flex items-center gap-2"
          >
            <span>{option.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}