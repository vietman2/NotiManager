import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "..";
import { NotificationType } from "../../types";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (projectId: number) => {
    const response = await axios.get<NotificationType[]>(
      `/api/project/${projectId}/notification/`
    );
    return response.data;
  }
);

export const getTotal = createAsyncThunk("notifications/getTotal", async () => {
  const response = await axios.get<NotificationType[]>("/api/notification/");
  return response.data;
});

const initialState: {
  totalNumber: number;
  totalSuccess: number;
  totalFailure: number;
  selectedNotification: NotificationType | null;
  notifications_selectedProject: NotificationType[] | null;
} = {
  totalNumber: 0,
  totalSuccess: 0,
  totalFailure: 0,
  selectedNotification: null,
  notifications_selectedProject: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications_selectedProject = action.payload;
    });
    builder.addCase(getTotal.fulfilled, (state, action) => {
      state.totalNumber = action.payload.length;
      state.totalSuccess = action.payload.filter(
        (notification) => notification.status === "SUCCESS"
      ).length;
      state.totalFailure = action.payload.filter(
        (notification) => notification.status === "FAILURE"
      ).length;
    });
  },
});

export const notificationSelect = (state: RootState) => state.notification;
export default notificationSlice.reducer;
