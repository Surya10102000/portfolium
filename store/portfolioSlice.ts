import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Section {
  id: string;
  type: "about" | "projects" | "skills" | "contact";
  content: any;
  isEditing?: boolean;
}

interface PortfolioState {
  sections: Section[];
  isPreviewMode: boolean;
  primaryColor: string;
  activeSectionId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PortfolioState = {
  sections: [
    {
      id: "about-section",
      type: "about",
      content: {
        title: "About Me",
        description: "",
        image: "",
      },
    },
    {
      id: "projects-section",
      type: "projects",
      content: {
        items: [],
      },
    },
    {
      id: "skills-section",
      type: "skills",
      content: {
        items: [],
      },
    },
    {
      id: "contact-section",
      type: "contact",
      content: {
        email: "",
        socials: [],
      },
    },
  ],
  isPreviewMode: false,
  primaryColor: "#4f46e5",
  activeSectionId: null,
  isLoading: false,
  error: null,
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    moveSection: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedSection = state.sections[dragIndex];

      // Create new array without dragged item
      const updatedSections = [...state.sections];
      updatedSections.splice(dragIndex, 1);

      // Insert dragged item at new position
      updatedSections.splice(hoverIndex, 0, draggedSection);

      state.sections = updatedSections;
    },
    updateSectionContent: (
      state,
      action: PayloadAction<{ id: string; content: any }>
    ) => {
      const section = state.sections.find((s) => s.id === action.payload.id);
      if (section) {
        section.content = { ...section.content, ...action.payload.content };
      }
    },
    togglePreviewMode: (state) => {
      state.isPreviewMode = !state.isPreviewMode;
    },
    setSections: (state, action: PayloadAction<Section[]>) => {
      state.sections = action.payload;
    },
    toggleSectionEdit: (state, action: PayloadAction<string>) => {
      const section = state.sections.find((s) => s.id === action.payload);
      if (section) {
        section.isEditing = !section.isEditing;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload;
    },
    setActiveSection: (state, action: PayloadAction<string | null>) => {
      state.activeSectionId = action.payload;
    },
    savePortfolio: (state) => {
      // This would typically involve an async thunk in real implementation
      state.isLoading = true;
    },
    publishPortfolio: (state) => {
      state.isLoading = true;
    },
  },
});

export const {
  moveSection,
  updateSectionContent,
  togglePreviewMode,
  setSections,
  toggleSectionEdit,
  setLoading,
  setError,
  setPrimaryColor,
  setActiveSection,
  savePortfolio,
  publishPortfolio,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
