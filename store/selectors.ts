// selectors.ts

import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";


// Select entire about section
export const selectAboutSection = (state: RootState) => state.portfolio.data.about;
 

