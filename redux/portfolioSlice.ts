import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "dark" | "light";
interface PortfolioState {
  theme: Theme;
}

const initialState: PortfolioState = {
  theme: "dark"
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    }
  },
});

export const { toggleTheme, setTheme } = portfolioSlice.actions;
export default portfolioSlice.reducer;