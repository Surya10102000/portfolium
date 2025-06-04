// features/viewMode/viewModeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type ViewMode = "mobile" | "desktop";

interface ViewModeState {
  viewMode: ViewMode;
}

const initialState: ViewModeState = {
  viewMode: "mobile",
};

export const viewModeSlice = createSlice({
  name: "viewMode",
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === "mobile" ? "desktop" : "mobile";
    },
  },
});

export const selectViewMode = (state: RootState) => state.viewMode.viewMode;

export const { setViewMode, toggleViewMode } = viewModeSlice.actions;
export default viewModeSlice.reducer;
