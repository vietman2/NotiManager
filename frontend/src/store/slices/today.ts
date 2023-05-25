import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "axios";
import { RootState } from "..";

export interface DataHash {
  [date: string]: number;
}

export type AnalyticsStatus = {
  Success: DataHash;
  Failure: DataHash;
  Pending: DataHash;
  Total: DataHash;
};

function initializeData() {
  const data: DataHash = {};
  for (let i = 0; i < 24; i++) {
    const format = i < 10 ? `0${i} hr` : `${i} hr`;
    data[format] = 0;
  }

  return data;
}

export const getData = createAsyncThunk("today/getData", async () => {
  const response = await axios.get("/api/notification/metrics/", {
    params: {
      start: moment().format("YYYY-MM-DD 00:00:00"),
      end: moment().format("YYYY-MM-DD 23:59:59"),
      interval: "hour",
    },
  });
  return response.data;
});

const initialState: {
  data: AnalyticsStatus;
  successTotal: number;
  failureTotal: number;
  mostActive: { time: number; count: number };
} = {
  data: {
    Success: {},
    Failure: {},
    Pending: {},
    Total: {},
  },
  successTotal: 0,
  failureTotal: 0,
  mostActive: { time: -1, count: 0 },
};

export const todaySlice = createSlice({
  name: "today",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data.Success = initializeData();
      state.data.Failure = initializeData();
      state.data.Pending = initializeData();
      state.data.Total = initializeData();
      state.successTotal = 0;
      state.failureTotal = 0;

      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[1].substr(0, 2);
        const format = `${time} hr`;

        if (data.status === "SUCCESS") {
          state.data.Success[format] += data.count;
          state.successTotal += data.count;
        } else if (data.status === "FAILURE") {
          state.data.Failure[format] += data.count;
          state.failureTotal += data.count;
        } else {
          state.data.Pending[format] += data.count;
        }
        state.data.Total[format] += data.count;
        if (data.count > state.mostActive.count) {
          state.mostActive = { time: time, count: data.count };
        }
      }
    });
  },
});

export const todaySelect = (state: RootState) => state.today;
export default todaySlice.reducer;
