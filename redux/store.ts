import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './portfolioSlice';
import { portfolioApi } from '@/services/portfolioApi';
import viewModeReducer from './viewModeSlice'
import { userApi } from '@/services/userApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
      portfolio: portfolioReducer,
      viewMode: viewModeReducer,
      [portfolioApi.reducerPath] : portfolioApi.reducer,
      [userApi.reducerPath] : userApi.reducer,
    },
    middleware: (gDM)=>gDM().concat(portfolioApi.middleware).concat(userApi.middleware)
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];