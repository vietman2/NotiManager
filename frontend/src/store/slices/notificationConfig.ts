import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { NotificationConfigType } from "../../types";

export const fetchNotificationConfigs = createAsyncThunk(
  "notifications/fetchNotificationConfigs",
  async (projectId: number) => {
    const response = await axios.get<NotificationConfigType[]>(
      `/api/project/${projectId}/notification_config/`
    );
    return response.data;
  }
);

export const fetchAllNotificationConfigs = createAsyncThunk(
  "notifications/fetchAllNotificationConfigs",
  async () => {
    const response = await axios.get<NotificationConfigType[]>(
      `/api/notification_config/`
    );
    return response.data;
  }
);

const initialState: {
  notificationConfigs: NotificationConfigType[];
  notificationConfigs_project: NotificationConfigType[];
  selectedNotificationConfig: NotificationConfigType | null;
} = {
  notificationConfigs: [],
  notificationConfigs_project: [],
  selectedNotificationConfig: null,
};

export const notificationConfigSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotificationConfigs.fulfilled, (state, action) => {
      state.notificationConfigs_project = action.payload;
    });
    builder.addCase(fetchAllNotificationConfigs.fulfilled, (state, action) => {
      state.notificationConfigs = action.payload;
    });
  },
});

export const notificationConfigSelect = (state: RootState) =>
  state.notificationConfig;
export default notificationConfigSlice.reducer;
