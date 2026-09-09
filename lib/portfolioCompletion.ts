import { UserData } from "@/types/userData";

export type PortfolioSectionId = "hero" | "about" | "project" | "experience" | "contact";

const SECTION_IDS: PortfolioSectionId[] = ["hero", "about", "project", "experience", "contact"];

export function isSectionComplete(id: PortfolioSectionId, data?: UserData | null): boolean {
  if (!data) return false;

  switch (id) {
    case "hero":
      return Boolean(data.hero?.name?.trim() && data.hero?.role?.trim() && data.hero?.description?.trim());
    case "about":
      return Boolean(data.about?.aboutMe?.trim() && data.about?.whatIDo?.trim());
    case "project":
      return (data.projects?.length ?? 0) > 0;
    case "experience":
      return (data.experience?.length ?? 0) > 0;
    case "contact":
      return Object.values(data.contact ?? {}).some((value) => Boolean(value?.trim()));
  }
}

export function hasIncompleteSections(data?: UserData | null): boolean {
  if (!data) return false;
  return SECTION_IDS.some((id) => !isSectionComplete(id, data));
}
