import {
  AnyAction,
  EnhancedStore,
  ThunkMiddleware,
  configureStore,
} from "@reduxjs/toolkit";
import axios from "axios";
import reducer, {
  AnalyticsStatus,
  getDailyData,
  getDailyDataByProject,
  getDailyDataByType,
  getMonthlyData,
  getMonthlyDataByProject,
  getMonthlyDataByType,
  getWeeklyData,
  getWeeklyDataByProject,
  getWeeklyDataByType,
} from "./analytics";

describe("analytics slice", () => {
  let store: EnhancedStore<
    {
      analytics: {
        barLineDataDaily: AnalyticsStatus;
        barLineDataWeekly: AnalyticsStatus;
        barLineDataMonthly: AnalyticsStatus;
      };
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          analytics: {
            barLineDataDaily: AnalyticsStatus;
            barLineDataWeekly: AnalyticsStatus;
            barLineDataMonthly: AnalyticsStatus;
          };
        },
        AnyAction,
        undefined
      >
    ]
  >;

  beforeAll(() => {
    store = configureStore({ reducer: { analytics: reducer } });

    jest.useFakeTimers();
    jest.setSystemTime(new Date("2022-12-01T00:00:00.000Z").getTime());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const response = [
    {
      status: "FAILURE",
      time: "2022-12-01 00:00:00",
      count: 1,
    },
    {
      status: "SUCCESS",
      time: "2022-12-01 00:00:00",
      count: 1,
    },
    {
      status: "PENDING",
      time: "2022-12-01 00:00:00",
      count: 1,
    },
  ];

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
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
    });
  });

  it("should handle daily data: all", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: response });
    await store.dispatch(getDailyData());
  });

  it("should handle weekly data: all", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: response });
    await store.dispatch(getWeeklyData());
  });

  it("should handle monthly data: all", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: response });
    await store.dispatch(getMonthlyData());
  });

  it("should handle daily data: by project", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: response });
    await store.dispatch(getDailyDataByProject(1));
  });

  it("should handle weekly data: by project", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: response });
    await store.dispatch(getWeeklyDataByProject(1));
  });

  it("should handle monthly data: by project", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: response });
    await store.dispatch(getMonthlyDataByProject(1));
  });

  it("should handle daily data: by type", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: response });
    await store.dispatch(getDailyDataByType("Slack"));
  });

  it("should handle weekly data: by type", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: response });
    await store.dispatch(getWeeklyDataByType("Slack"));
  });

  it("should handle monthly data: by type", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: response });
    await store.dispatch(getMonthlyDataByType("Slack"));
  });
});
