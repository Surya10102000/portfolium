import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './portfolioSlice';
import { portfolioApi } from '@/services/portfolioApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
      portfolio: portfolioReducer,
      [portfolioApi.reducerPath] : portfolioApi.reducer
    },
    middleware: (gDM)=>gDM().concat(portfolioApi.middleware)
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];