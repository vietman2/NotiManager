import reducer, { getData, AnalyticsStatus, DataHash } from "./today";
import { configureStore, EnhancedStore, AnyAction } from "@reduxjs/toolkit";
import { ThunkMiddleware } from "redux-thunk";
import axios from "axios";

describe("todaySlice", () => {
  let store: EnhancedStore<
    {
      today: {
        data: AnalyticsStatus;
        successTotal: number;
        failureTotal: number;
        mostActive: { time: number; count: number };
      };
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          today: {
            data: AnalyticsStatus;
            successTotal: number;
            failureTotal: number;
            mostActive: { time: number; count: number };
          };
        },
        AnyAction,
        undefined
      >
    ]
  >;

  const fakeData2: DataHash = {
    "00 hr": 1,
    "01 hr": 0,
    "02 hr": 0,
    "03 hr": 0,
    "04 hr": 0,
    "05 hr": 0,
    "06 hr": 0,
    "07 hr": 0,
    "08 hr": 0,
    "09 hr": 0,
    "10 hr": 0,
    "11 hr": 0,
    "12 hr": 0,
    "13 hr": 0,
    "14 hr": 0,
    "15 hr": 0,
    "16 hr": 0,
    "17 hr": 0,
    "18 hr": 0,
    "19 hr": 0,
    "20 hr": 0,
    "21 hr": 0,
    "22 hr": 0,
    "23 hr": 0,
  };
  const fakeTotalData: DataHash = {
    "00 hr": 3,
    "01 hr": 0,
    "02 hr": 0,
    "03 hr": 0,
    "04 hr": 0,
    "05 hr": 0,
    "06 hr": 0,
    "07 hr": 0,
    "08 hr": 0,
    "09 hr": 0,
    "10 hr": 0,
    "11 hr": 0,
    "12 hr": 0,
    "13 hr": 0,
    "14 hr": 0,
    "15 hr": 0,
    "16 hr": 0,
    "17 hr": 0,
    "18 hr": 0,
    "19 hr": 0,
    "20 hr": 0,
    "21 hr": 0,
    "22 hr": 0,
    "23 hr": 0,
  };

  beforeAll(() => {
    store = configureStore({ reducer: { today: reducer } });
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2022-12-01T00:00:00.000Z").getTime());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      data: {
        Success: {},
        Failure: {},
        Pending: {},
        Total: {},
      },
      successTotal: 0,
      failureTotal: 0,
      mostActive: { time: -1, count: 0 },
    });
  });

  it("should handle getData", async () => {
    const fakeResponse = [
      {
        status: "PENDING",
        time: "2022-12-01 00:00:00",
        count: 1,
      },
      {
        status: "SUCCESS",
        time: "2022-12-01 00:00:00",
        count: 1,
      },
      {
        status: "FAILURE",
        time: "2022-12-01 00:00:00",
        count: 1,
      },
    ];
    axios.get = jest.fn().mockResolvedValue({ data: fakeResponse });
    await store.dispatch(getData());
    expect(store.getState().today.data).toEqual({
      Success: fakeData2,
      Failure: fakeData2,
      Pending: fakeData2,
      Total: fakeTotalData,
    });
  });
});
