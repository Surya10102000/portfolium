// components/TemplateSelector.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TEMPLATE_UPDATE_CACHE_KEY,
  useUpdateTemplateMutation,
} from "@/services/portfolioApi";
import { useEffect, useState } from "react";

// Swatches use each template's own background/accent tokens (see the
// corresponding *-theme.css) so the preview reflects the real palette.
const templateOptions = [
  { value: "default", label: "Default", swatch: { bg: "oklch(1 0 0)", accent: "oklch(0 0 0)" } },
  { value: "luminary", label: "Luminary", swatch: { bg: "oklch(0.9853 0.0082 301.3594)", accent: "oklch(0.5232 0.1433 292.5053)" } },
  { value: "steam", label: "Steam", swatch: { bg: "rgb(17, 17, 17)", accent: "#bd5fff" } },
];

export function TemplateSelector({
  currentTemplate,
}: {
  currentTemplate: string;
}) {
  const [value, setValue] = useState(currentTemplate);
  const [updateTemplate] = useUpdateTemplateMutation({
    fixedCacheKey: TEMPLATE_UPDATE_CACHE_KEY,
  });

  // Sync with external currentTemplate changes
  useEffect(() => {
    setValue(currentTemplate);
  }, [currentTemplate]);

  const handleTemplateChange = async (template: string) => {
    const previousTemplate = value;
    try {
      setValue(template);
      await updateTemplate(template).unwrap();
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
            <span
              className="inline-block h-4 w-6 shrink-0 overflow-hidden rounded-sm border"
              style={{ background: option.swatch.bg }}
              aria-hidden="true"
            >
              <span
                className="ml-auto block h-full w-1/2"
                style={{ background: option.swatch.accent }}
              />
            </span>
            <span>{option.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
