import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices/index";

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
