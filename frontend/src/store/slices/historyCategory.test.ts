import reducer, {
  changeProject,
  changeStatus,
  changeTarget,
  changeType,
} from "./historyCategory";
import {
  AnyAction,
  EnhancedStore,
  ThunkMiddleware,
  configureStore,
} from "@reduxjs/toolkit";

describe("historyCategorySlice", () => {
  let store: EnhancedStore<
    {
      historyCategory: {
        project: string;
        type: string;
        target: string;
        status: string;
      };
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          historyCategory: {
            project: string;
            type: string;
            target: string;
            status: string;
          };
        },
        AnyAction,
        undefined
      >
    ]
  >;

  beforeAll(() => {
    store = configureStore({ reducer: { historyCategory: reducer } });
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      project: "All",
      type: "All",
      target: "All",
      status: "All",
    });
  });

  it("should handle changeProject", () => {
    const actual = store.dispatch(changeProject("test"));
    expect(actual).toEqual({
      payload: "test",
      type: "filter/changeProject",
    });
  });

  it("should handle changeType", () => {
    const actual = store.dispatch(changeType("test"));
    expect(actual).toEqual({
      payload: "test",
      type: "filter/changeType",
    });
  });

  it("should handle changeTarget", () => {
    const actual = store.dispatch(changeTarget("test"));
    expect(actual).toEqual({
      payload: "test",
      type: "filter/changeTarget",
    });
  });

  it("should handle changeStatus", () => {
    const actual = store.dispatch(changeStatus("test"));
    expect(actual).toEqual({
      payload: "test",
      type: "filter/changeStatus",
    });
  });
});
