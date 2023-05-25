import {
  combineReducers,
  PreloadedState,
  configureStore,
} from "@reduxjs/toolkit";

import projectReducer from "./project";
import notificationReducer from "./notifications";
import targetReducer from "./target";
import messageReducer from "./message";
import notificationConfigReducer from "./notificationConfig";
import authReducer from "./auth";
import analyticsReducer from "./analytics";
import todayReducer from "./today";
import filterReducer from "./historyCategory";
import { RootState } from "../index";

const rootReducer = combineReducers({
  project: projectReducer,
  notification: notificationReducer,
  notificationConfig: notificationConfigReducer,
  target: targetReducer,
  message: messageReducer,
  auth: authReducer,
  analytics: analyticsReducer,
  today: todayReducer,
  filter: filterReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export default rootReducer;
