import reducer, { fetchTargets, fetchTarget, createTarget } from "./target";
import { TargetType } from "../../types";

import { ThunkMiddleware } from "redux-thunk";
import { configureStore, EnhancedStore, AnyAction } from "@reduxjs/toolkit";
import axios from "axios";

describe("targetSlice", () => {
  let store: EnhancedStore<
    {
      target: { targets: TargetType[]; selectedTarget: TargetType | null };
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          target: {
            targets: TargetType[];
            selectedTarget: TargetType | null;
          };
        },
        AnyAction,
        undefined
      >
    ]
  >;

  const fakeTargets: TargetType[] = [
    {
      id: 1,
      name: "test",
      data: {},
      endpoint: "test",
      notification_type: "WEBHOOK",
    },
    {
      id: 2,
      name: "test",
      data: {},
      endpoint: "test",
      notification_type: "WEBHOOK",
    },
    {
      id: 3,
      name: "test",
      data: {},
      endpoint: "test",
      notification_type: "WEBHOOK",
    },
  ];

  beforeAll(() => {
    store = configureStore({ reducer: { target: reducer } });
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      targets: [],
      selectedTarget: null,
    });
  });

  it("should handle fetchTargets", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeTargets,
      });
    });
    await store.dispatch(fetchTargets());
    expect(store.getState().target.targets).toEqual(fakeTargets);
  });

  it("should handle fetchTarget", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeTargets[0],
      });
    });
    await store.dispatch(fetchTarget(1));
    expect(store.getState().target.selectedTarget).toEqual(fakeTargets[0]);
  });

  it("should handle createTarget", async () => {
    jest.spyOn(axios, "post").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeTargets[0],
      });
    });
    await store.dispatch(
      createTarget({
        name: "test",
        data: {},
        endpoint: "test",
        notification_type: "WEBHOOK",
      })
    );
    expect(store.getState().target.targets[0]).toEqual(fakeTargets[0]);
  });

  it("should handle createTarget: API", async () => {
    jest.spyOn(axios, "post").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeTargets[0],
      });
    });
    await store.dispatch(
      createTarget({
        name: "test",
        data: {},
        endpoint: "test",
        notification_type: "API",
      })
    );
    expect(store.getState().target.targets[0]).toEqual(fakeTargets[0]);
  });
});
