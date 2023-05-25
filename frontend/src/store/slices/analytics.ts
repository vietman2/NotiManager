import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "axios";
import { RootState } from "..";

interface DataHash {
  [date: string]: number;
}

export type AnalyticsStatus = {
  Success: DataHash;
  Failure: DataHash;
  Pending: DataHash;
  Total: DataHash;
};

function initializeDailyData() {
  const dailyData: DataHash = {};
  for (let i = 14; i >= 0; i--) {
    const date = moment().subtract(i, "days").format("YYYY-MM-DD");
    dailyData[date] = 0;
  }

  return dailyData;
}

function initializeWeeklyData() {
  const weeklyData: DataHash = {};
  for (let i = 15; i >= 0; i--) {
    //TODO: fix this to YYYY-MM-(firstdayofweek)
    const today = moment();
    const date = moment()
      .subtract(i, "weeks")
      .subtract(today.weekday() - 1, "days")
      .format("YYYY-MM-DD");
    weeklyData[date] = 0;
  }

  return weeklyData;
}

function initializeMonthlyData() {
  const monthlyData: DataHash = {};
  for (let i = 12; i >= 0; i--) {
    const date = moment().subtract(i, "months").format("YYYY-MM-01");
    monthlyData[date] = 0;
  }

  return monthlyData;
}

export const getDailyData = createAsyncThunk(
  "analytics/getDailyData",
  async () => {
    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start: moment().subtract(14, "days").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
        interval: "day",
      },
    });
    return response.data;
  }
);

export const getWeeklyData = createAsyncThunk(
  "analytics/getWeeklyData",
  async () => {
    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start: moment().subtract(15, "weeks").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
        interval: "week",
      },
    });
    return response.data;
  }
);

export const getMonthlyData = createAsyncThunk(
  "analytics/getMonthlyData",
  async () => {
    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start: moment().subtract(12, "months").format("YYYY-MM-01"),
        end: moment().format("YYYY-MM-DD"),
        interval: "month",
      },
    });
    return response.data;
  }
);

export const getDailyDataByProject = createAsyncThunk(
  "analytics/getDailyDataByProject",
  async (projectId: number) => {
    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start: moment().subtract(14, "days").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
        interval: "day",
        projectId: projectId,
      },
    });
    return response.data;
  }
);

export const getWeeklyDataByProject = createAsyncThunk(
  "analytics/getWeeklyDataByProject",
  async (projectId: number) => {
    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start: moment().subtract(15, "weeks").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
        interval: "week",
        projectId: projectId,
      },
    });
    return response.data;
  }
);

export const getMonthlyDataByProject = createAsyncThunk(
  "analytics/getMonthlyDataByProject",
  async (projectId: number) => {
    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start: moment().subtract(12, "months").format("YYYY-MM-01"),
        end: moment().format("YYYY-MM-DD"),
        interval: "month",
        projectId: projectId,
      },
    });
    return response.data;
  }
);

export const getDailyDataByType = createAsyncThunk(
  "analytics/getDailyDataByType",
  async (type: string) => {
    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start: moment().subtract(14, "days").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
        interval: "day",
        type: type,
      },
    });
    return response.data;
  }
);

export const getWeeklyDataByType = createAsyncThunk(
  "analytics/getWeeklyDataByType",
  async (type: string) => {
    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start: moment().subtract(15, "weeks").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
        interval: "week",
        type: type,
      },
    });
    return response.data;
  }
);

export const getMonthlyDataByType = createAsyncThunk(
  "analytics/getMonthlyDataByType",
  async (type: string) => {
    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start: moment().subtract(12, "months").format("YYYY-MM-01"),
        end: moment().format("YYYY-MM-DD"),
        interval: "month",
        type: type,
      },
    });
    return response.data;
  }
);

const initialState: {
  barLineDataDaily: AnalyticsStatus;
  barLineDataWeekly: AnalyticsStatus;
  barLineDataMonthly: AnalyticsStatus;
} = {
  barLineDataDaily: {
    Success: {},
    Failure: {},
    Pending: {},
    Total: {},
  },
  barLineDataWeekly: {
    Success: {},
    Failure: {},
    Pending: {},
    Total: {},
  },
  barLineDataMonthly: {
    Success: {},
    Failure: {},
    Pending: {},
    Total: {},
  },
};

export const AnalyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDailyData.fulfilled, (state, action) => {
      state.barLineDataDaily.Success = initializeDailyData();
      state.barLineDataDaily.Failure = initializeDailyData();
      state.barLineDataDaily.Pending = initializeDailyData();
      state.barLineDataDaily.Total = initializeDailyData();
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[0];
        if (data.status === "SUCCESS") {
          state.barLineDataDaily.Success[time] += data.count;
        } else if (data.status === "FAILURE") {
          state.barLineDataDaily.Failure[time] += data.count;
        } else {
          state.barLineDataDaily.Pending[time] += data.count;
        }
        state.barLineDataDaily.Total[time] += data.count;
      }
    });
    builder.addCase(getDailyDataByProject.fulfilled, (state, action) => {
      state.barLineDataDaily.Success = initializeDailyData();
      state.barLineDataDaily.Failure = initializeDailyData();
      state.barLineDataDaily.Pending = initializeDailyData();
      state.barLineDataDaily.Total = initializeDailyData();
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[0];
        if (data.status === "SUCCESS") {
          state.barLineDataDaily.Success[time] += data.count;
        } else if (data.status === "FAILURE") {
          state.barLineDataDaily.Failure[time] += data.count;
        } else {
          state.barLineDataDaily.Pending[time] += data.count;
        }
        state.barLineDataDaily.Total[time] += data.count;
      }
    });
    builder.addCase(getDailyDataByType.fulfilled, (state, action) => {
      state.barLineDataDaily.Success = initializeDailyData();
      state.barLineDataDaily.Failure = initializeDailyData();
      state.barLineDataDaily.Pending = initializeDailyData();
      state.barLineDataDaily.Total = initializeDailyData();
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[0];
        if (data.status === "SUCCESS") {
          state.barLineDataDaily.Success[time] += data.count;
        } else if (data.status === "FAILURE") {
          state.barLineDataDaily.Failure[time] += data.count;
        } else {
          state.barLineDataDaily.Pending[time] += data.count;
        }
        state.barLineDataDaily.Total[time] += data.count;
      }
    });
    builder.addCase(getWeeklyData.fulfilled, (state, action) => {
      state.barLineDataWeekly.Success = initializeWeeklyData();
      state.barLineDataWeekly.Failure = initializeWeeklyData();
      state.barLineDataWeekly.Pending = initializeWeeklyData();
      state.barLineDataWeekly.Total = initializeWeeklyData();
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[0];
        if (data.status === "SUCCESS") {
          state.barLineDataWeekly.Success[time] += data.count;
        } else if (data.status === "FAILURE") {
          state.barLineDataWeekly.Failure[time] += data.count;
        } else {
          state.barLineDataWeekly.Pending[time] += data.count;
        }
        state.barLineDataWeekly.Total[time] += data.count;
      }
    });
    builder.addCase(getWeeklyDataByProject.fulfilled, (state, action) => {
      state.barLineDataWeekly.Success = initializeWeeklyData();
      state.barLineDataWeekly.Failure = initializeWeeklyData();
      state.barLineDataWeekly.Pending = initializeWeeklyData();
      state.barLineDataWeekly.Total = initializeWeeklyData();
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[0];
        if (data.status === "SUCCESS") {
          state.barLineDataWeekly.Success[time] += data.count;
        } else if (data.status === "FAILURE") {
          state.barLineDataWeekly.Failure[time] += data.count;
        } else {
          state.barLineDataWeekly.Pending[time] += data.count;
        }
        state.barLineDataWeekly.Total[time] += data.count;
      }
    });
    builder.addCase(getWeeklyDataByType.fulfilled, (state, action) => {
      state.barLineDataWeekly.Success = initializeWeeklyData();
      state.barLineDataWeekly.Failure = initializeWeeklyData();
      state.barLineDataWeekly.Pending = initializeWeeklyData();
      state.barLineDataWeekly.Total = initializeWeeklyData();
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[0];
        if (data.status === "SUCCESS") {
          state.barLineDataWeekly.Success[time] += data.count;
        } else if (data.status === "FAILURE") {
          state.barLineDataWeekly.Failure[time] += data.count;
        } else {
          state.barLineDataWeekly.Pending[time] += data.count;
        }
        state.barLineDataWeekly.Total[time] += data.count;
      }
    });
    builder.addCase(getMonthlyData.fulfilled, (state, action) => {
      state.barLineDataMonthly.Success = initializeMonthlyData();
      state.barLineDataMonthly.Failure = initializeMonthlyData();
      state.barLineDataMonthly.Pending = initializeMonthlyData();
      state.barLineDataMonthly.Total = initializeMonthlyData();
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[0];
        if (data.status === "SUCCESS") {
          state.barLineDataMonthly.Success[time] += data.count;
        } else if (data.status === "FAILURE") {
          state.barLineDataMonthly.Failure[time] += data.count;
        } else {
          state.barLineDataMonthly.Pending[time] += data.count;
        }
        state.barLineDataMonthly.Total[time] += data.count;
      }
    });
    builder.addCase(getMonthlyDataByProject.fulfilled, (state, action) => {
      state.barLineDataMonthly.Success = initializeMonthlyData();
      state.barLineDataMonthly.Failure = initializeMonthlyData();
      state.barLineDataMonthly.Pending = initializeMonthlyData();
      state.barLineDataMonthly.Total = initializeMonthlyData();
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[0];
        if (data.status === "SUCCESS") {
          state.barLineDataMonthly.Success[time] += data.count;
        } else if (data.status === "FAILURE") {
          state.barLineDataMonthly.Failure[time] += data.count;
        } else {
          state.barLineDataMonthly.Pending[time] += data.count;
        }
        state.barLineDataMonthly.Total[time] += data.count;
      }
    });
    builder.addCase(getMonthlyDataByType.fulfilled, (state, action) => {
      state.barLineDataMonthly.Success = initializeMonthlyData();
      state.barLineDataMonthly.Failure = initializeMonthlyData();
      state.barLineDataMonthly.Pending = initializeMonthlyData();
      state.barLineDataMonthly.Total = initializeMonthlyData();
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[0];
        if (data.status === "SUCCESS") {
          state.barLineDataMonthly.Success[time] += data.count;
        } else if (data.status === "FAILURE") {
          state.barLineDataMonthly.Failure[time] += data.count;
        } else {
          state.barLineDataMonthly.Pending[time] += data.count;
        }
        state.barLineDataMonthly.Total[time] += data.count;
      }
    });
  },
});

export const analyticsSelector = (state: RootState) => state.analytics;
export default AnalyticsSlice.reducer;
