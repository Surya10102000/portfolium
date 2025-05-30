import {
  AboutSection,
  Contact,
  Education,
  Experience,
  HeroSectionI,
  Project,
  UserData,
} from "@/types/userData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PortfolioState {
  data: UserData;
  visibleSections: string[];
}

const initialState: PortfolioState = {
  data: {
    hero: {
      name: "Surya",
      role: "SDE",
      description:
        "I am a SDE with a passion for building scalable applications.",
      image: "",
    },
    about: {
      aboutMe: "",
      whatIDo: "",
      techStack: [],
    },
    projects: [],
    experience: [],
    education: [],
    contact: [],
  },
  visibleSections: ["hero"],
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    // Add tech to about section
    addTechToAbout: (state, action: PayloadAction<string>) => {
      if (!state.data.about.techStack) {
        state.data.about.techStack = [];
      }
      if (!state.data.about.techStack.includes(action.payload)) {
        state.data.about.techStack.push(action.payload);
      }
    },

    // Remove tech from about section
    removeTechFromAbout: (state, action: PayloadAction<string>) => {
      if (state.data.about.techStack) {
        state.data.about.techStack = state.data.about.techStack.filter(
          (tech) => tech !== action.payload
        );
      }
    },

    // Update about section
    updateAbout: (state, action: PayloadAction<AboutSection>) => {
      state.data.about = action.payload;
    },
    //add a new section to the visibleSections array
    addSection: (state, action: PayloadAction<string>) => {
      if (!state.visibleSections.includes(action.payload)) {
        state.visibleSections.push(action.payload);
      }
    },

    //remove a section from the visibleSections array
    removeSection: (state, action: PayloadAction<string>) => {
      const index = state.visibleSections.indexOf(action.payload);
      if (index !== -1) {
        state.visibleSections.splice(index, 1);
      }
    },
    // Update section data
    updateHero: (state, action: PayloadAction<HeroSectionI>) => {
      state.data.hero = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.data.projects.push(action.payload);
    },

    // Similar reducers for other sections...
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.data.experience.push(action.payload);
    },

    addEducation: (state, action: PayloadAction<Education>) => {
      state.data.education.push(action.payload);
    },

    addContact: (state, action: PayloadAction<Contact>) => {
      state.data.contact.push(action.payload);
    },

    // Reorder sections
    reorderSections: (state, action: PayloadAction<string[]>) => {
      state.visibleSections = action.payload;
    },
  },
});

export const {
  addSection,
  removeSection,
  updateHero,
  updateAbout,
  addProject,
  addExperience,
  addEducation,
  addContact,
  reorderSections,
  addTechToAbout,
  removeTechFromAbout,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
